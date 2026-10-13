"""
Process Design Kit (PDK) Models for CMOS RF Power Amplifier Design.
Includes parameters for TSMC 65nm, 40nm, 28nm, 180nm and custom technology nodes.
"""

from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class CMOSProcess:
    name: str
    node_nm: int
    vdd_nom: float          # Nominal supply voltage (V)
    vdd_max: float          # Safe max drain voltage (V) without stacking
    vth: float              # Threshold voltage (V)
    v_knee: float           # Knee voltage (V)
    kp: float               # Transconductance parameter mu_n * Cox (uA / V^2)
    j_max: float            # Maximum safe current density (mA / um)
    cox: float              # Oxide capacitance (fF / um^2)
    c_ov: float             # Overlap capacitance (fF / um)
    cj0: float              # Junction capacitance per area (fF / um^2)
    cjsw: float             # Junction sidewall capacitance (fF / um)
    r_poly_sheet: float     # Poly gate sheet resistance (Ohm / sq)
    ft_peak_ghz: float      # Peak transit frequency fT (GHz)
    fmax_peak_ghz: float    # Peak maximum oscillation frequency fmax (GHz)
    l_min_um: float         # Minimum gate length (um)
    lambda_ch: float        # Channel length modulation parameter (1/V)
    default_inductor_q: float # On-chip inductor Q at typical RF band

# Standard CMOS Process Library
PDK_LIBRARY: Dict[str, CMOSProcess] = {
    "65nm_rf": CMOSProcess(
        name="TSMC 65nm RF CMOS (Core/Low-Vt)",
        node_nm=65,
        vdd_nom=1.2,
        vdd_max=1.8,
        vth=0.35,
        v_knee=0.20,
        kp=380.0,            # uA/V^2
        j_max=0.85,          # mA/um
        cox=14.5,            # fF/um^2
        c_ov=0.35,           # fF/um
        cj0=1.1,
        cjsw=0.4,
        r_poly_sheet=10.0,
        ft_peak_ghz=160.0,
        fmax_peak_ghz=210.0,
        l_min_um=0.065,
        lambda_ch=0.08,
        default_inductor_q=15.0
    ),
    "40nm_rf": CMOSProcess(
        name="TSMC 40nm RF LP/GP",
        node_nm=40,
        vdd_nom=1.1,
        vdd_max=1.6,
        vth=0.32,
        v_knee=0.18,
        kp=450.0,
        j_max=0.95,
        cox=16.0,
        c_ov=0.30,
        cj0=1.0,
        cjsw=0.35,
        r_poly_sheet=12.0,
        ft_peak_ghz=190.0,
        fmax_peak_ghz=250.0,
        l_min_um=0.040,
        lambda_ch=0.10,
        default_inductor_q=16.0
    ),
    "28nm_hpc": CMOSProcess(
        name="TSMC 28nm HPC+ RF",
        node_nm=28,
        vdd_nom=0.9,
        vdd_max=1.4,
        vth=0.28,
        v_knee=0.15,
        kp=520.0,
        j_max=1.10,
        cox=18.0,
        c_ov=0.25,
        cj0=0.95,
        cjsw=0.30,
        r_poly_sheet=15.0,
        ft_peak_ghz=240.0,
        fmax_peak_ghz=300.0,
        l_min_um=0.028,
        lambda_ch=0.12,
        default_inductor_q=18.0
    ),
    "180nm_rf": CMOSProcess(
        name="TSMC 0.18um RF CMOS",
        node_nm=180,
        vdd_nom=1.8,
        vdd_max=3.3,
        vth=0.48,
        v_knee=0.30,
        kp=270.0,
        j_max=0.60,
        cox=8.5,
        c_ov=0.40,
        cj0=1.2,
        cjsw=0.45,
        r_poly_sheet=7.0,
        ft_peak_ghz=55.0,
        fmax_peak_ghz=75.0,
        l_min_um=0.180,
        lambda_ch=0.05,
        default_inductor_q=12.0
    ),
}

def get_process(name: str = "65nm_rf") -> CMOSProcess:
    """Retrieve process by key name, falling back to 65nm_rf."""
    key = name.lower()
    if key in PDK_LIBRARY:
        return PDK_LIBRARY[key]
    for k, p in PDK_LIBRARY.items():
        if key in k or key in p.name.lower():
            return p
    return PDK_LIBRARY["65nm_rf"]
