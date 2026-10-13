"""
Output, Interstage, and Input Matching Network Synthesis for CMOS RF Power Amplifiers.
Supports Integrated On-Chip Transformers (Baluns), Lumped L-Section, Pi-Section,
Harmonic Traps, and Finite-Q Passive Insertion Loss Modeling.
"""

import math
from dataclasses import dataclass
from typing import Dict, Any, Tuple

@dataclass
class TransformerBalun:
    primary_inductance_nh: float    # Lp (nH)
    secondary_inductance_nh: float  # Ls (nH)
    coupling_k: float               # Magnetic coupling factor k (typically 0.7 - 0.85)
    turns_ratio_n: float            # Turns ratio n = sqrt(Ls / Lp)
    primary_cap_tuning_pf: float    # Cp tuning cap (pF) to cancel leakage/absorb Cds
    secondary_cap_tuning_pf: float  # Cs tuning cap (pF) for 50-ohm output resonance
    insertion_loss_db: float        # Insertion loss in dB
    center_tap_bias: bool           # True: Center tap provides Vdd bias
    efficiency_pct: float           # Passive efficiency (%)

@dataclass
class LumpedMatch:
    topology: str                   # 'Low-Pass-L', 'High-Pass-L', 'Pi-Match'
    series_inductance_nh: float     # Series L (nH)
    shunt_capacitance_pf: float     # Shunt C (pF)
    network_q: float                # Loaded Q
    loss_db: float                  # Insertion loss with finite inductor Q (dB)
    harmonic_2nd_rejection_dbc: float # 2nd harmonic suppression (dBc)

@dataclass
class MatchingResult:
    omn_transformer: TransformerBalun
    omn_lumped: LumpedMatch
    imn_match: LumpedMatch
    harmonic_2nd_trap_l_nh: float
    harmonic_2nd_trap_c_pf: float
    harmonic_3rd_trap_l_nh: float
    harmonic_3rd_trap_c_pf: float

def synthesize_transformer_balun(
    r_opt_diff: float,
    r_load: float = 50.0,
    freq_ghz: float = 2.4,
    c_out_device_ff: float = 200.0,
    coupling_k: float = 0.78,
    q_primary: float = 14.0,
    q_secondary: float = 15.0
) -> TransformerBalun:
    """
    Synthesize on-chip integrated transformer (Balun) matching network.
    Transforms single-ended 50-Ohm load to differential optimum load R_opt_diff.
    
    Args:
        r_opt_diff: Optimum differential load resistance (Ohms)
        r_load: Antenna / load resistance (Ohms, default 50)
        freq_ghz: Carrier frequency (GHz)
        c_out_device_ff: Device differential output capacitance (fF)
        coupling_k: Mutual magnetic coupling coefficient k
        q_primary: Quality factor of primary winding
        q_secondary: Quality factor of secondary winding
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    
    # Target turns ratio n = sqrt(R_load / R_opt_diff)
    turns_ratio_n = math.sqrt(max(0.1, r_load / r_opt_diff))
    
    # Primary inductance chosen such that omega * Lp is on the order of R_opt_diff / 1.5 to 2
    lp_h = (r_opt_diff * 0.75) / omega
    ls_h = lp_h * (turns_ratio_n ** 2)
    
    lp_nh = lp_h * 1e9
    ls_nh = ls_h * 1e9
    
    # Parallel tuning capacitors to resonate with leakage inductances
    # Primary side absorbs Cds:
    c_res_p_f = 1.0 / ((omega ** 2) * lp_h * (1.0 - coupling_k ** 2))
    c_device_f = c_out_device_ff * 1e-15
    cp_tuning_f = max(0.0, c_res_p_f - c_device_f)
    cp_tuning_pf = cp_tuning_f * 1e12
    
    # Secondary side tuning capacitor
    cs_tuning_f = 1.0 / ((omega ** 2) * ls_h)
    cs_tuning_pf = cs_tuning_f * 1e12
    
    # Insertion loss analytical model for transformer:
    # IL approx = 10 * log10(1 + 2 / (k * sqrt(Qp * Qs)))
    q_geom = math.sqrt(q_primary * q_secondary)
    loss_factor = 1.0 + (2.0 / (coupling_k * q_geom))
    insertion_loss_db = 10.0 * math.log10(loss_factor)
    efficiency_pct = (10.0 ** (-insertion_loss_db / 10.0)) * 100.0
    
    return TransformerBalun(
        primary_inductance_nh=round(lp_nh, 3),
        secondary_inductance_nh=round(ls_nh, 3),
        coupling_k=coupling_k,
        turns_ratio_n=round(turns_ratio_n, 2),
        primary_cap_tuning_pf=round(cp_tuning_pf, 3),
        secondary_cap_tuning_pf=round(cs_tuning_pf, 3),
        insertion_loss_db=round(insertion_loss_db, 2),
        center_tap_bias=True,
        efficiency_pct=round(efficiency_pct, 1)
    )

def synthesize_l_match(
    r_source: float,
    r_load: float,
    freq_ghz: float,
    inductor_q: float = 15.0
) -> LumpedMatch:
    """
    Synthesize an L-section matching network between R_source and R_load.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    r_high = max(r_source, r_load)
    r_low = min(r_source, r_load)
    
    q_match = math.sqrt(max(0.01, (r_high / r_low) - 1.0))
    
    # Low-pass configuration (series L with R_low, shunt C across R_high)
    x_l = q_match * r_low
    x_c = r_high / q_match
    
    l_match_h = x_l / omega
    c_match_f = 1.0 / (omega * x_c)
    
    # Insertion loss estimation: IL ~ 4.34 * (Q_match / Q_ind)
    loss_db = 4.34 * (q_match / max(1.0, inductor_q))
    
    # 2nd harmonic rejection for low pass filter: ~ 20 * log10(1 + (2*Q)^2)
    rejection_2nd = 10.0 * math.log10(1.0 + (2.0 * q_match) ** 2)
    
    return LumpedMatch(
        topology="Low-Pass-L",
        series_inductance_nh=round(l_match_h * 1e9, 3),
        shunt_capacitance_pf=round(c_match_f * 1e12, 3),
        network_q=round(q_match, 2),
        loss_db=round(loss_db, 2),
        harmonic_2nd_rejection_dbc=round(rejection_2nd, 1)
    )

def synthesize_all_matching(
    r_opt_diff: float,
    z_in_gate: complex,
    freq_ghz: float,
    c_out_device_ff: float,
    inductor_q: float = 15.0
) -> MatchingResult:
    """
    Calculate complete matching networks: OMN (Balun + Lumped), IMN, and harmonic traps.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    
    # OMN: Transformer Balun
    balun = synthesize_transformer_balun(
        r_opt_diff=r_opt_diff,
        r_load=50.0,
        freq_ghz=freq_ghz,
        c_out_device_ff=c_out_device_ff,
        coupling_k=0.78,
        q_primary=inductor_q,
        q_secondary=inductor_q + 2.0
    )
    
    # OMN alternative: Lumped L
    lumped_omn = synthesize_l_match(
        r_source=r_opt_diff / 2.0,
        r_load=50.0,
        freq_ghz=freq_ghz,
        inductor_q=inductor_q
    )
    
    # IMN: Match 50 Ohm RF source to transistor gate Rin = real(z_in_gate)
    r_in_real = max(2.0, z_in_gate.real)
    imn = synthesize_l_match(
        r_source=50.0,
        r_load=r_in_real,
        freq_ghz=freq_ghz,
        inductor_q=inductor_q
    )
    
    # Harmonic Traps (Series LC shunt trap resonant at 2*f0 and 3*f0)
    omega_2f = 2.0 * omega
    omega_3f = 3.0 * omega
    
    # 2nd harmonic trap (choose reasonable C = 0.5 pF -> L = 1 / (omega_2f^2 * C))
    c_trap_2f = 0.5e-12
    l_trap_2f = 1.0 / ((omega_2f ** 2) * c_trap_2f)
    
    # 3rd harmonic trap (choose C = 0.3 pF -> L = 1 / (omega_3f^2 * C))
    c_trap_3f = 0.3e-12
    l_trap_3f = 1.0 / ((omega_3f ** 2) * c_trap_3f)
    
    return MatchingResult(
        omn_transformer=balun,
        omn_lumped=lumped_omn,
        imn_match=imn,
        harmonic_2nd_trap_l_nh=round(l_trap_2f * 1e9, 3),
        harmonic_2nd_trap_c_pf=round(c_trap_2f * 1e12, 3),
        harmonic_3rd_trap_l_nh=round(l_trap_3f * 1e9, 3),
        harmonic_3rd_trap_c_pf=round(c_trap_3f * 1e12, 3)
    )
