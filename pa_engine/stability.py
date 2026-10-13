"""
RF Stability Analysis and Stabilization Techniques.
Implements Rollett's K-factor, Delta, Mu-factor,
Differential Cross-Coupled Capacitive Neutralization (Cneu),
and Resistive Gate/Drain Damping Stabilization.
"""

import cmath
import math
from dataclasses import dataclass
from typing import Dict, Any, Tuple

@dataclass
class StabilityMetrics:
    k_factor: float
    delta_mag: float
    mu_factor: float
    is_unconditionally_stable: bool
    s11_mag: float
    s21_gain_db: float
    s12_isolation_db: float
    s22_mag: float
    c_neutralization_ff: float
    stabilization_resistor_ohm: float
    stabilization_type: str

def compute_s_parameters_from_y(
    y11: complex, y12: complex, y21: complex, y22: complex, z0: float = 50.0
) -> Tuple[complex, complex, complex, complex]:
    """Convert two-port Y-parameters to S-parameters with reference impedance z0."""
    y0 = 1.0 / z0
    delta_y = (y11 + y0) * (y22 + y0) - y12 * y21
    
    s11 = ((y0 - y11) * (y0 + y22) + y12 * y21) / delta_y
    s12 = (-2.0 * y12 * y0) / delta_y
    s21 = (-2.0 * y21 * y0) / delta_y
    s22 = ((y0 + y11) * (y0 - y22) + y12 * y21) / delta_y
    
    return s11, s12, s21, s22

def calculate_stability(
    gm_ms: float,
    gds_ms: float,
    cgs_ff: float,
    cgd_ff: float,
    cds_ff: float,
    rg_ohm: float,
    freq_ghz: float,
    use_cross_neutralization: bool = True,
    r_stab_shunt_ohm: float = 500.0
) -> StabilityMetrics:
    """
    Compute RF two-port S-parameters and Rollett stability factors.
    Evaluates effect of differential neutralization capacitor Cneu = Cgd.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    gm = gm_ms * 1e-3
    gds = gds_ms * 1e-3
    cgs = cgs_ff * 1e-15
    # Differential cross-neutralization cancels 90-95% of Cgd feedback
    cgd_eff = (cgd_ff * 0.05 if use_cross_neutralization else cgd_ff) * 1e-15
    cds = cds_ff * 1e-15
    
    # Intrinsic gate input impedance: Rg + channel charging Ri (Ri ~ 1/(5*gm)) + 1/(j*omega*Cgs)
    r_channel_i = 1.0 / max(1e-4, 5.0 * gm)
    r_gate_series = rg_ohm + r_channel_i
    z_gate_series = complex(r_gate_series, -1.0 / max(1e-18, omega * cgs))
    
    # Gate parallel stabilization resistor (typically 200 - 500 Ohm for PA stability)
    r_stab = max(100.0, r_stab_shunt_ohm)
    y_gate = (1.0 / z_gate_series) + (1.0 / r_stab)
    
    # Small-signal two-port Y-parameters
    y11 = y_gate + complex(0.0, omega * cgd_eff)
    y12 = complex(0.0, -omega * cgd_eff)
    y21 = complex(gm, -omega * cgd_eff)
    y22 = complex(gds, omega * (cds + cgd_eff))
    
    s11, s12, s21, s22 = compute_s_parameters_from_y(y11, y12, y21, y22, z0=50.0)
    
    # S-param magnitudes
    s11_mag = abs(s11)
    s12_mag = max(1e-6, abs(s12))
    s21_mag = abs(s21)
    s22_mag = abs(s22)
    
    # Delta
    delta = s11 * s22 - s12 * s21
    delta_mag = abs(delta)
    
    # Rollett K-factor
    k_num = 1.0 - (s11_mag ** 2) - (s22_mag ** 2) + (delta_mag ** 2)
    k_den = 2.0 * s12_mag * s21_mag
    k_factor = k_num / k_den if k_den > 0 else 999.0
    
    # Mu-factor: mu = (1 - |s11|^2) / (|s22 - delta*conj(s11)| + |s12*s21|)
    mu_den = abs(s22 - delta * s11.conjugate()) + (s12_mag * s21_mag)
    mu_factor = (1.0 - s11_mag ** 2) / mu_den if mu_den > 0 else 1.0
    
    is_stable = (k_factor > 1.0) and (delta_mag < 1.0) and (mu_factor > 1.0)
    
    s21_gain_db = 20.0 * math.log10(max(1e-3, s21_mag))
    s12_isolation_db = 20.0 * math.log10(s12_mag)
    
    stab_type = "Differential Cross-Neutralization (Cneu)" if use_cross_neutralization else "Uncompensated (Potential Instability)"
    
    return StabilityMetrics(
        k_factor=round(k_factor, 2),
        delta_mag=round(delta_mag, 3),
        mu_factor=round(mu_factor, 2),
        is_unconditionally_stable=is_stable,
        s11_mag=round(s11_mag, 3),
        s21_gain_db=round(s21_gain_db, 2),
        s12_isolation_db=round(s12_isolation_db, 2),
        s22_mag=round(s22_mag, 3),
        c_neutralization_ff=round(cgd_ff, 2) if use_cross_neutralization else 0.0,
        stabilization_resistor_ohm=round(r_stab_shunt_ohm, 1),
        stabilization_type=stab_type
    )
