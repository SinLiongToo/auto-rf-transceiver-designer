"""
CMOS Transistor Sizing and High-Frequency Parasitic Extraction.
Calculates multi-finger transistor layout geometry (W_tot, Nf, Wf, M),
small-signal parameters (gm, gds), RF parasitics (Cgs, Cgd, Cds, Rg),
and figures of merit (fT, fmax).
"""

import math
from dataclasses import dataclass
from typing import Dict, Any
from .process_pdk import CMOSProcess

@dataclass
class TransistorDimension:
    w_total_um: float          # Total channel width in micrometers
    l_gate_um: float           # Gate length in micrometers
    w_finger_um: float         # Width per finger in micrometers
    num_fingers: int           # Total number of fingers
    num_cells_m: int           # Number of parallel standard layout cells
    fingers_per_cell: int      # Fingers per cell
    
    # Small-signal parameters
    gm_ms: float               # Transconductance (mS)
    gds_ms: float              # Output conductance (mS)
    ro_ohm: float              # Output resistance (Ohms)
    
    # High frequency parasitics
    cgs_ff: float              # Gate-to-source capacitance (fF)
    cgd_ff: float              # Gate-to-drain overlap/capacitance (fF)
    cds_ff: float              # Drain-to-source / drain junction capacitance (fF)
    rg_ohm: float              # Gate poly & contact resistance (Ohms)
    
    # Calculated RF metrics
    ft_ghz: float              # Transit frequency fT (GHz)
    fmax_ghz: float            # Maximum oscillation frequency fmax (GHz)
    c_neu_ff: float            # Recommended cross-coupled neutralization capacitance (fF)

def size_transistor(
    process: CMOSProcess,
    i_max_peak_a: float,
    v_swing_pk_v: float,
    target_freq_ghz: float = 2.4,
    preferred_finger_w_um: float = 2.0,
    double_sided_gate_contact: bool = True
) -> TransistorDimension:
    """
    Synthesize transistor sizing and estimate RF parasitic parameters.
    
    Args:
        process: CMOSProcess specification object
        i_max_peak_a: Peak RF drain current in Amperes
        v_swing_pk_v: Peak drain voltage swing
        target_freq_ghz: Operating frequency in GHz
        preferred_finger_w_um: Unit finger width in um (typically 1.0 - 2.5 um)
        double_sided_gate_contact: Whether gate poly is contacted on both sides
    """
    # 1. Calculate required total channel width based on safe current density
    # i_max in mA:
    i_max_ma = i_max_peak_a * 1000.0
    w_total_um = max(10.0, i_max_ma / process.j_max)
    
    # 2. Multi-finger layout decomposition
    w_finger_um = preferred_finger_w_um
    num_fingers = max(2, int(math.ceil(w_total_um / w_finger_um)))
    # Ensure even number of fingers for shared drain/source layout
    if num_fingers % 2 != 0:
        num_fingers += 1
    w_total_um = num_fingers * w_finger_um

    # Number of parallel multi-finger cells (e.g. 2 to 8 cells for layout symmetry)
    fingers_per_cell = 16 if num_fingers >= 32 else (8 if num_fingers >= 16 else num_fingers)
    num_cells_m = max(1, int(math.ceil(num_fingers / fingers_per_cell)))
    num_fingers = num_cells_m * fingers_per_cell
    w_total_um = num_fingers * w_finger_um
    l_gate_um = process.l_min_um

    # 3. Transconductance gm and output conductance gds
    # In saturation / peak current regime:
    # gm ~ sqrt(2 * kp * (W/L) * Id) or approximately 2 * Id / Vov
    v_ov = max(0.12, (process.vdd_nom - process.vth) * 0.7)
    gm_a_per_v = (i_max_peak_a * 0.6) / (v_ov * 0.5) # approximate effective large-signal gm
    gm_ms = gm_a_per_v * 1000.0
    gds_ms = (process.lambda_ch * (i_max_peak_a * 0.5)) * 1000.0
    ro_ohm = 1000.0 / max(1e-4, gds_ms)

    # 4. Parasitic Capacitances
    # Cgs = (2/3) * W * L * Cox + W * Cov
    cgs_intrinsic = (2.0 / 3.0) * w_total_um * l_gate_um * process.cox
    cgs_overlap = w_total_um * process.c_ov
    cgs_ff = cgs_intrinsic + cgs_overlap

    # Cgd = W * Cov (plus fringing)
    cgd_ff = w_total_um * (process.c_ov * 1.05)

    # Cds (drain junction capacitance with shared drain fingers: N_drain = num_fingers / 2)
    diff_length_um = 0.25 # typical contacted diffusion pitch
    area_drain_um2 = (num_fingers / 2.0) * diff_length_um * w_finger_um
    perim_drain_um = (num_fingers / 2.0) * (2.0 * diff_length_um + w_finger_um)
    cds_ff = area_drain_um2 * process.cj0 + perim_drain_um * process.cjsw

    # 5. Distributed Gate Resistance Rg
    # Single-side contacted: Rg = (Rsh * Wf) / (3 * L * Nf)
    # Double-side contacted: Rg = (Rsh * Wf) / (12 * L * Nf)
    contact_factor = 12.0 if double_sided_gate_contact else 3.0
    rg_ohm = (process.r_poly_sheet * w_finger_um) / (contact_factor * l_gate_um * num_fingers)
    # Add metal contact routing overhead (approx 0.5 - 1.5 ohm)
    rg_ohm += max(0.5, 5.0 / math.sqrt(num_fingers))

    # 6. Figures of merit: fT and fmax
    c_tot_f = (cgs_ff + cgd_ff) * 1e-15
    gm_siemens = gm_ms * 1e-3
    ft_hz = gm_siemens / (2.0 * math.pi * max(1e-18, c_tot_f))
    ft_ghz = ft_hz / 1e9

    # fmax = fT / (2 * sqrt(Rg * (gds + 2*pi*fT*Cgd)))
    cgd_f = cgd_ff * 1e-15
    denom_fmax = 2.0 * math.sqrt(max(1e-12, rg_ohm * (gds_ms * 1e-3 + 2.0 * math.pi * ft_hz * cgd_f)))
    fmax_hz = ft_hz / max(1e-6, denom_fmax)
    fmax_ghz = fmax_hz / 1e9

    # Recommended neutralization capacitor Cneu to nullify differential Cgd
    c_neu_ff = cgd_ff

    return TransistorDimension(
        w_total_um=round(w_total_um, 2),
        l_gate_um=l_gate_um,
        w_finger_um=w_finger_um,
        num_fingers=num_fingers,
        num_cells_m=num_cells_m,
        fingers_per_cell=fingers_per_cell,
        gm_ms=round(gm_ms, 2),
        gds_ms=round(gds_ms, 2),
        ro_ohm=round(ro_ohm, 2),
        cgs_ff=round(cgs_ff, 2),
        cgd_ff=round(cgd_ff, 2),
        cds_ff=round(cds_ff, 2),
        rg_ohm=round(rg_ohm, 2),
        ft_ghz=round(min(process.ft_peak_ghz, ft_ghz), 1),
        fmax_ghz=round(min(process.fmax_peak_ghz, fmax_ghz), 1),
        c_neu_ff=round(c_neu_ff, 2)
    )
