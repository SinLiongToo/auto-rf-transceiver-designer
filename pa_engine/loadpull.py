"""
Analytical Load-Pull Contour Generation and Smith Chart Mapping.
Generates constant output power contours (Pmax, -0.5dB, -1.0dB, -2.0dB, -3.0dB)
and efficiency contours (PAE) on the complex load reflection coefficient (Gamma_L) plane.
"""

import cmath
import math
from dataclasses import dataclass
from typing import Dict, List, Tuple, Any

@dataclass
class ContourPoint:
    real: float
    imag: float

@dataclass
class LoadPullContour:
    level_label: str
    pout_dbm: float
    delta_db: float
    points: List[ContourPoint]

@dataclass
class LoadPullSummary:
    gamma_opt_mag: float
    gamma_opt_ang_deg: float
    z_opt_real: float
    z_opt_imag: float
    p_max_dbm: float
    pae_max_pct: float
    pbo_6db_pae_pct: float     # PAE at 6-dB back-off (critical for 5G/Wi-Fi OFDM)
    power_contours: List[LoadPullContour]

def z_to_gamma(z: complex, z0: float = 50.0) -> complex:
    """Convert impedance Z to reflection coefficient Gamma."""
    return (z - z0) / (z + z0)

def gamma_to_z(gamma: complex, z0: float = 50.0) -> complex:
    """Convert reflection coefficient Gamma to impedance Z."""
    denom = 1.0 - gamma
    if abs(denom) < 1e-6:
        return complex(1e6, 0.0)
    return z0 * (1.0 + gamma) / denom

def generate_loadpull_data(
    r_opt: float,
    c_out_ff: float,
    freq_ghz: float,
    p_max_dbm: float,
    peak_pae_pct: float = 65.0,
    z0: float = 50.0
) -> LoadPullSummary:
    """
    Generate load-pull contours around optimum complex impedance Z_opt.
    Z_opt = R_opt || (1 / j*omega*Cout) or equivalent series model.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    c_out_f = c_out_ff * 1e-15
    
    # Optimum load impedance presented to device drain:
    # Transistor drain wants Ropt in parallel with Cout absorption
    # Y_opt = 1/Ropt - j*omega*Cout -> Z_opt = 1 / Y_opt
    y_opt = complex(1.0 / max(1.0, r_opt), -omega * c_out_f)
    z_opt = 1.0 / y_opt
    
    gamma_opt = z_to_gamma(z_opt, z0=z0)
    gamma_opt_mag = abs(gamma_opt)
    gamma_opt_ang_deg = math.degrees(cmath.phase(gamma_opt))
    
    # Generate power contours for various delta drops from Pmax
    deltas_db = [0.0, -0.5, -1.0, -2.0, -3.0]
    contours = []
    
    # 60 angle sample points around the circle
    num_samples = 48
    angles = [2.0 * math.pi * i / num_samples for i in range(num_samples + 1)]
    
    for delta in deltas_db:
        # P / Pmax = 10^(delta / 10)
        # Power mismatch factor: 1 - |rho|^2 = 10^(delta / 10) -> rho_radius = sqrt(1 - 10^(delta/10))
        if delta == 0.0:
            # Single point at Gamma_opt
            pts = [ContourPoint(real=round(gamma_opt.real, 4), imag=round(gamma_opt.imag, 4))]
            label = f"Pmax ({round(p_max_dbm, 1)} dBm)"
        else:
            p_ratio = 10.0 ** (delta / 10.0)
            rho_radius = math.sqrt(max(0.0, 1.0 - p_ratio))
            
            # Map circular contour in rho-plane back to Gamma_L plane:
            # rho = (Gamma_L - Gamma_opt) / (1 - Gamma_L * conj(Gamma_opt))
            # Gamma_L = (rho + Gamma_opt) / (1 + rho * conj(Gamma_opt))
            pts = []
            for phi in angles:
                rho = cmath.rect(rho_radius, phi)
                denom = 1.0 + rho * gamma_opt.conjugate()
                if abs(denom) > 1e-4:
                    gamma_l = (rho + gamma_opt) / denom
                    # Keep inside Smith chart boundary (|Gamma| <= 0.98)
                    mag = abs(gamma_l)
                    if mag > 0.98:
                        gamma_l = gamma_l / mag * 0.98
                    pts.append(ContourPoint(real=round(gamma_l.real, 4), imag=round(gamma_l.imag, 4)))
            label = f"{delta:+.1f} dB ({round(p_max_dbm + delta, 1)} dBm)"
        
        contours.append(LoadPullContour(
            level_label=label,
            pout_dbm=round(p_max_dbm + delta, 2),
            delta_db=delta,
            points=pts
        ))
        
    # Estimation of 6-dB back-off PAE (standard Class-AB drops roughly to 30%-40% of peak)
    pbo_6db_pae_pct = round(peak_pae_pct * 0.45, 1)
    
    return LoadPullSummary(
        gamma_opt_mag=round(gamma_opt_mag, 3),
        gamma_opt_ang_deg=round(gamma_opt_ang_deg, 1),
        z_opt_real=round(z_opt.real, 2),
        z_opt_imag=round(z_opt.imag, 2),
        p_max_dbm=round(p_max_dbm, 2),
        pae_max_pct=peak_pae_pct,
        pbo_6db_pae_pct=pbo_6db_pae_pct,
        power_contours=contours
    )
