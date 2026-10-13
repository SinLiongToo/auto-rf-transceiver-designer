"""
Cripps Loadline Analysis and Fundamental PA Sizing Equations.
Calculates optimum load impedance, peak RF voltage/current swings,
and DC power for various operation classes (A, AB, B, C, E, F).
"""

import math
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class LoadlineResult:
    pout_target_dbm: float
    pout_target_mw: float
    vdd: float
    v_knee: float
    v_swing_pk: float          # Peak RF voltage swing (V)
    i_max_pk: float            # Peak RF current (A)
    r_opt: float               # Optimum load resistance (Ohms)
    conduction_angle_deg: float # Conduction angle (degrees)
    i_dc: float                # DC supply current (A)
    p_dc: float                # DC power consumption (W)
    theoretical_drain_eff: float # Drain efficiency (%)
    operation_class: str
    topology: str              # 'single_ended', 'differential', 'cascode', 'stacked_2'

def calculate_cripps_loadline(
    pout_dbm: float,
    vdd: float,
    v_knee: float = 0.2,
    op_class: str = "AB",
    topology: str = "differential",
    stack_count: int = 1,
    loss_omn_db: float = 0.8
) -> LoadlineResult:
    """
    Compute Cripps optimum loadline parameters for given Pout, Vdd, Class and Topology.
    
    Args:
        pout_dbm: Target output power at the antenna/load in dBm
        vdd: DC supply voltage in Volts
        v_knee: Knee / saturation voltage in Volts
        op_class: 'A', 'AB', 'B', 'C', 'E', 'F'
        topology: 'single_ended', 'differential', 'cascode'
        stack_count: 1 for standard CS, 2 for 2-stacked FET, etc.
        loss_omn_db: Output matching network estimated insertion loss in dB
    """
    # Required internal transistor power compensating for OMN loss
    pout_load_mw = 10.0 ** (pout_dbm / 10.0)
    pout_device_mw = pout_load_mw * (10.0 ** (loss_omn_db / 10.0))
    pout_device_w = pout_device_mw / 1000.0

    # Effective DC voltage swing
    effective_vdd = vdd * stack_count
    v_swing_pk = max(0.1, effective_vdd - v_knee)

    op_class_upper = op_class.upper()

    if op_class_upper == "A":
        cond_angle_deg = 360.0
        # For Class A, Pout = 0.5 * V_pk * I_pk, with I_dc = I_max / 2
        # If differential, each side delivers Pout / 2, or differential Ropt = 2 * Ropt_se
        if "diff" in topology.lower():
            # Differential: Vswing_diff_pk = 2 * v_swing_pk
            # Pout = 0.5 * V_diff_pk * (I_pk / 2) -> Ropt_diff = 2 * (v_swing_pk)^2 / (Pout/2) = 4 * v_swing_pk^2 / Pout
            r_opt = (2.0 * (v_swing_pk ** 2)) / (pout_device_w / 2.0) # per branch Ropt
            i_max_pk = (2.0 * (pout_device_w / 2.0)) / v_swing_pk
            i_dc = (i_max_pk / 2.0) * 2.0 # two branches
        else:
            r_opt = (v_swing_pk ** 2) / (2.0 * pout_device_w)
            i_max_pk = (2.0 * pout_device_w) / v_swing_pk
            i_dc = i_max_pk / 2.0

        p_dc = effective_vdd * i_dc
        eff_theory = 50.0

    elif op_class_upper == "B":
        cond_angle_deg = 180.0
        # Class B: I_dc = I_max / pi, I_fund = I_max / 2
        if "diff" in topology.lower():
            r_opt = (2.0 * (v_swing_pk ** 2)) / (pout_device_w / 2.0)
            i_max_pk = (2.0 * (pout_device_w / 2.0)) / v_swing_pk
            i_dc = (i_max_pk / math.pi) * 2.0
        else:
            r_opt = (v_swing_pk ** 2) / (2.0 * pout_device_w)
            i_max_pk = (2.0 * pout_device_w) / v_swing_pk
            i_dc = i_max_pk / math.pi

        p_dc = effective_vdd * i_dc
        eff_theory = 78.5

    elif op_class_upper == "E":
        # Class E ZVS/ZDS switching amplifier
        # R_opt = 0.5768 * (Vdd - Vknee)^2 / Pout
        cond_angle_deg = 180.0
        branch_pout_w = (pout_device_w / 2.0) if "diff" in topology.lower() else pout_device_w
        r_opt = 0.5768 * ((v_swing_pk) ** 2) / branch_pout_w
        i_max_pk = 2.86 * branch_pout_w / v_swing_pk
        i_dc = (branch_pout_w / v_swing_pk) * (2.0 if "diff" in topology.lower() else 1.0)
        p_dc = effective_vdd * i_dc
        eff_theory = 90.0 # Realistic switching efficiency factoring knee

    elif op_class_upper == "F":
        # Class F with 3rd harmonic peaking: V_fund = (4 / pi) * Vdd
        # Theoretical efficiency = 88.4%
        cond_angle_deg = 180.0
        v_fund_pk = (4.0 / math.pi) * v_swing_pk
        branch_pout_w = (pout_device_w / 2.0) if "diff" in topology.lower() else pout_device_w
        r_opt = (v_fund_pk ** 2) / (2.0 * branch_pout_w)
        i_max_pk = (2.0 * branch_pout_w) / (v_fund_pk * 0.5)
        i_dc = (i_max_pk / math.pi) * (2.0 if "diff" in topology.lower() else 1.0)
        p_dc = effective_vdd * i_dc
        eff_theory = 85.0

    else: # Default Class AB (conduction angle ~ 200 - 220 deg)
        cond_angle_deg = 210.0
        theta_rad = math.radians(cond_angle_deg)
        # Class AB Fourier coefficients
        # i_dc_factor = (sin(theta/2) - (theta/2)*cos(theta/2)) / (pi * (1 - cos(theta/2)))
        # i_fund_factor = ((theta) - sin(theta)) / (2*pi * (1 - cos(theta/2)))
        half_theta = theta_rad / 2.0
        denom = 1.0 - math.cos(half_theta)
        alpha_dc = (math.sin(half_theta) - half_theta * math.cos(half_theta)) / (math.pi * denom)
        alpha_fund = (theta_rad - math.sin(theta_rad)) / (2.0 * math.pi * denom)

        if "diff" in topology.lower():
            branch_pout_w = pout_device_w / 2.0
            # Pout_branch = 0.5 * V_pk * (alpha_fund * I_max)
            i_max_pk = (2.0 * branch_pout_w) / (v_swing_pk * alpha_fund)
            r_opt = v_swing_pk / (alpha_fund * i_max_pk)
            i_dc = (alpha_dc * i_max_pk) * 2.0
        else:
            i_max_pk = (2.0 * pout_device_w) / (v_swing_pk * alpha_fund)
            r_opt = v_swing_pk / (alpha_fund * i_max_pk)
            i_dc = alpha_dc * i_max_pk

        p_dc = effective_vdd * i_dc
        drain_eff_internal = (pout_device_w / p_dc) * 100.0 if p_dc > 0 else 65.0
        eff_theory = min(72.0, max(55.0, drain_eff_internal))

    return LoadlineResult(
        pout_target_dbm=pout_dbm,
        pout_target_mw=pout_load_mw,
        vdd=vdd,
        v_knee=v_knee,
        v_swing_pk=v_swing_pk,
        i_max_pk=i_max_pk,
        r_opt=r_opt,
        conduction_angle_deg=cond_angle_deg,
        i_dc=i_dc,
        p_dc=p_dc,
        theoretical_drain_eff=eff_theory,
        operation_class=op_class_upper,
        topology=topology
    )
