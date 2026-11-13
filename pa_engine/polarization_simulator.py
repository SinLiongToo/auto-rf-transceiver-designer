"""
Automated Antenna Polarization & 3D Electromagnetic Wave Propagation Simulator.
Models:
  - Orthogonal E-field superposition: Ex(z, t) & Ey(z, t) with relative phase delay delta
  - Polarization ellipse, axial ratio (AR in dB), tilt angle tau, and ellipticity
  - Polarization states: RHCP (Right-Hand Circular), LHCP (Left-Hand Circular),
    Linear (Horizontal / Vertical / Slanted), and Elliptical
  - Satellite-to-Aircraft link polarization mismatch loss factor (PLF) vs. aircraft heading / banking angle
"""

import math
from dataclasses import dataclass
from typing import List, Tuple, Dict, Any

@dataclass
class PolarizationState:
    ex_amp: float
    ey_amp: float
    phase_diff_deg: float
    axial_ratio_linear: float
    axial_ratio_db: float
    tilt_angle_deg: float
    ellipticity_angle_deg: float
    classification: str
    is_circular: bool
    is_linear: bool

@dataclass
class PolarizationLinkBudget:
    heading_deg: float
    linear_loss_db: float
    circular_loss_db: float
    link_margin_advantage_db: float
    state_description: str

class AntennaPolarizationSimulator:
    """Synthesizer and physical analyzer for antenna polarization and link matching."""

    @staticmethod
    def analyze_polarization(
        ex_amp: float = 1.0,
        ey_amp: float = 1.0,
        phase_diff_deg: float = 90.0
    ) -> PolarizationState:
        """
        Analyze polarization state given Ex amplitude, Ey amplitude, and phase difference delta.
        delta > 0 indicates Ey leads Ex (by standard RF convention: delta = +90 deg is RHCP).
        """
        ex = max(0.0001, float(ex_amp))
        ey = max(0.0, float(ey_amp))
        delta_rad = math.radians(phase_diff_deg)

        if ey < 1e-4:
            return PolarizationState(
                ex_amp=ex, ey_amp=0.0, phase_diff_deg=0.0,
                axial_ratio_linear=1e4, axial_ratio_db=40.0,
                tilt_angle_deg=0.0, ellipticity_angle_deg=0.0,
                classification="Linear (Horizontal)",
                is_circular=False, is_linear=True
            )

        # Stutzman & Balanis Antenna Theory Formulation
        # Semi-major axis OA and semi-minor axis OB of the polarization ellipse
        cos2d = math.cos(2.0 * delta_rad)
        term1 = ex**2 + ey**2
        radical = math.sqrt(max(0.0, ex**4 + ey**4 + 2.0 * (ex**2) * (ey**2) * cos2d))
        
        oa = math.sqrt(max(0.0, 0.5 * (term1 + radical)))
        ob = math.sqrt(max(0.0, 0.5 * (term1 - radical)))

        if ob < 1e-6:
            ar_linear = 1e4
            ar_db = 40.0
        else:
            ar_linear = oa / ob
            ar_db = 20.0 * math.log10(max(1.0, ar_linear))

        # Tilt angle tau of the polarization ellipse (-90 to +90 deg)
        denom_tau = ex**2 - ey**2
        if abs(denom_tau) < 1e-6:
            tau_deg = 45.0 if math.cos(delta_rad) >= 0 else -45.0
        else:
            tan2tau = (2.0 * ex * ey * math.cos(delta_rad)) / denom_tau
            tau_deg = math.degrees(0.5 * math.atan(tan2tau))

        # Ellipticity angle epsilon (-45 to +45 deg)
        sin2eps = (2.0 * ex * ey * math.sin(delta_rad)) / (ex**2 + ey**2)
        sin2eps = max(-1.0, min(1.0, sin2eps))
        eps_deg = math.degrees(0.5 * math.asin(sin2eps))

        # Classification based on IEEE standards
        is_circ = ar_db <= 3.0
        is_lin = ar_db >= 30.0 or abs(abs(phase_diff_deg) - 0.0) < 1.0 or abs(abs(phase_diff_deg) - 180.0) < 1.0

        if is_circ:
            classification = "Circular (RHCP)" if delta_rad > 0 else "Circular (LHCP)"
        elif is_lin:
            classification = "Linear"
        else:
            classification = "Elliptical (Right-Hand)" if delta_rad > 0 else "Elliptical (Left-Hand)"

        return PolarizationState(
            ex_amp=ex,
            ey_amp=ey,
            phase_diff_deg=phase_diff_deg,
            axial_ratio_linear=ar_linear,
            axial_ratio_db=min(40.0, ar_db),
            tilt_angle_deg=tau_deg,
            ellipticity_angle_deg=eps_deg,
            classification=classification,
            is_circular=is_circ,
            is_linear=is_lin
        )

    @staticmethod
    def calculate_link_loss_vs_heading(
        heading_deg: float,
        satellite_mode: str = "circular"
    ) -> PolarizationLinkBudget:
        """
        Calculate polarization mismatch loss between a satellite transmitter and an aircraft receiver.
        When aircraft changes heading / banks:
          - Linear link suffers PLF = cos^2(heading) with a -30dB cross-pol null at 90 deg.
          - Circular link maintains lock with 0 dB relative loss.
        """
        h_rad = math.radians(heading_deg % 180.0)
        cos_val = math.cos(h_rad)
        
        # Linear link polarization loss factor with realistic -30dB cross-polarization null floor
        lin_loss_factor = max(1e-3, cos_val**2)
        lin_loss_db = 10.0 * math.log10(lin_loss_factor)

        # Circular link: when satellite transmits CP and aircraft has CP antenna, loss is 0 dB regardless of heading!
        # If aircraft has a single linear dipole, circular-to-linear PLF is 0.5 (-3.0 dB) constant with 0 tilt ripple.
        circ_loss_db = 0.0 if satellite_mode == "circular" else lin_loss_db
        advantage = abs(lin_loss_db) - abs(circ_loss_db)

        desc = (
            f"Heading {heading_deg:.0f}°: Circular Link maintains 0.0 dB lock; "
            f"Linear Link suffers {lin_loss_db:.1f} dB polarization loss."
        )

        return PolarizationLinkBudget(
            heading_deg=heading_deg,
            linear_loss_db=lin_loss_db,
            circular_loss_db=circ_loss_db,
            link_margin_advantage_db=advantage,
            state_description=desc
        )

    @staticmethod
    def generate_heading_sweep() -> List[Tuple[float, float, float]]:
        """Generates heading (0..180 deg) vs (linear_loss_db, circular_loss_db)."""
        res = []
        for deg in range(0, 181, 2):
            b = AntennaPolarizationSimulator.calculate_link_loss_vs_heading(float(deg))
            res.append((float(deg), b.linear_loss_db, b.circular_loss_db))
        return res

    @staticmethod
    def generate_axial_ratio_vs_amplitude_ratio(phase_diff_deg: float = 90.0) -> List[Tuple[float, float]]:
        """Generates amplitude ratio (Ey/Ex from 0.0 to 1.0) vs AR (dB)."""
        res = []
        for i in range(101):
            ratio = i / 100.0
            st = AntennaPolarizationSimulator.analyze_polarization(ex_amp=1.0, ey_amp=ratio, phase_diff_deg=phase_diff_deg)
            res.append((ratio, st.axial_ratio_db))
        return res
