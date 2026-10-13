"""
Class-E and Class-F Harmonic Switched Power Amplifier Synthesis.
Implements Sokal analytical formulas for Class-E ZVS/ZDS and
Harmonic termination / wave-shaping for Class-F and Inverse Class-F (F^-1).
"""

import math
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class ClassEDesign:
    r_load_optimal: float           # Optimum fundamental load resistance (Ohms)
    shunt_cap_csh_pf: float         # Shunt capacitance Csh (pF)
    absorbed_device_cds_pf: float   # Device Cds absorbed in Csh (pF)
    external_csh_add_pf: float      # Additional external Csh required (pF)
    series_inductance_l0_nh: float  # Series tuning inductance L0 (nH)
    series_capacitance_c0_pf: float # Series DC-block / resonant cap C0 (pF)
    choke_inductance_nh: float      # DC feed RFC inductance (nH)
    peak_vds_stress_v: float        # Peak drain voltage stress: ~3.56 * Vdd
    peak_ids_stress_a: float        # Peak switch current: ~2.86 * Idc
    q_loaded: float                 # Loaded quality factor QL

@dataclass
class ClassFDesign:
    mode: str                       # 'Class-F' (Odd open, Even short) or 'Inverse-Class-F'
    r_load_fund_optimal: float      # Fundamental load resistance (Ohms)
    harmonic_2nd_impedance: str     # Short (0 Ohm) or Open (> 1 kOhm)
    harmonic_3rd_impedance: str     # Open (> 1 kOhm) or Short (0 Ohm)
    tank_3rd_l_nh: float            # Parallel resonant tank inductor (nH)
    tank_3rd_c_pf: float            # Parallel resonant tank capacitor (pF)
    tank_2nd_trap_l_nh: float       # Series shorting trap inductor (nH)
    tank_2nd_trap_c_pf: float       # Series shorting trap capacitor (pF)
    peak_vds_stress_v: float        # Peak drain voltage (Class F: 2.0*Vdd, Class F^-1: pi*Vdd)
    theoretical_efficiency_pct: float

def synthesize_class_e(
    pout_target_w: float,
    vdd: float,
    freq_ghz: float,
    device_cds_ff: float = 150.0,
    q_loaded: float = 5.0
) -> ClassEDesign:
    """
    Synthesize Class-E ZVS/ZDS amplifier based on Nathan Sokal equations.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    
    # Sokal formula: R = 0.5768 * (Vdd^2) / Pout (assuming 100% ideal efficiency)
    r_opt = 0.5768 * (vdd ** 2) / max(1e-3, pout_target_w)
    
    # Shunt capacitor Csh = 0.1836 / (omega * R)
    c_sh_total_f = 0.1836 / (omega * r_opt)
    c_sh_total_pf = c_sh_total_f * 1e12
    
    device_cds_pf = device_cds_ff * 1e-3
    external_csh_pf = max(0.0, c_sh_total_pf - device_cds_pf)
    
    # Series inductive reactance X = 1.1525 * R
    x_extra = 1.1525 * r_opt
    
    # Choose resonant tank components for loaded Q:
    # QL = omega * L0 / R
    l0_h = (q_loaded * r_opt + x_extra) / omega
    c0_f = 1.0 / ((omega ** 2) * (q_loaded * r_opt / omega))
    
    # DC Choke inductance: L_choke >= 10 * R / omega
    l_choke_h = (15.0 * r_opt) / omega
    
    # Voltage and current stress
    v_peak = 3.562 * vdd
    i_dc = pout_target_w / vdd
    i_peak = 2.862 * i_dc
    
    return ClassEDesign(
        r_load_optimal=round(r_opt, 2),
        shunt_cap_csh_pf=round(c_sh_total_pf, 3),
        absorbed_device_cds_pf=round(device_cds_pf, 3),
        external_csh_add_pf=round(external_csh_pf, 3),
        series_inductance_l0_nh=round(l0_h * 1e9, 3),
        series_capacitance_c0_pf=round(c0_f * 1e12, 3),
        choke_inductance_nh=round(l_choke_h * 1e9, 2),
        peak_vds_stress_v=round(v_peak, 2),
        peak_ids_stress_a=round(i_peak, 3),
        q_loaded=q_loaded
    )

def synthesize_class_f(
    pout_target_w: float,
    vdd: float,
    freq_ghz: float,
    inverse_mode: bool = False
) -> ClassFDesign:
    """
    Synthesize Class-F or Inverse Class-F harmonic wave-shaping network.
    """
    omega = 2.0 * math.pi * (freq_ghz * 1e9)
    
    if not inverse_mode: # Standard Class-F (voltage square wave, current half-sine)
        # R_opt = (4/pi) * (Vdd^2) / (2 * Pout) = (2/pi) * (Vdd^2) / Pout
        r_opt = (8.0 / (math.pi ** 2)) * (vdd ** 2) / max(1e-3, pout_target_w)
        v_peak = 2.0 * vdd
        harm_2 = "Short (< 1 Ohm, zero 2nd harmonic voltage)"
        harm_3 = "Open (> 500 Ohm, 3rd harmonic voltage peaking)"
        eff = 88.4
        
        # 3rd harmonic parallel tank (resonant at 3*f0)
        omega_3 = 3.0 * omega
        c3_f = 0.4e-12 # 0.4 pF
        l3_h = 1.0 / ((omega_3 ** 2) * c3_f)
        
        # 2nd harmonic short trap (series LC to ground at 2*f0)
        omega_2 = 2.0 * omega
        c2_f = 0.6e-12 # 0.6 pF
        l2_h = 1.0 / ((omega_2 ** 2) * c2_f)
        mode_str = "Class-F (3rd Harmonic Peaking)"
    else: # Inverse Class-F (voltage half-sine, current square wave)
        r_opt = (math.pi ** 2 / 8.0) * (vdd ** 2) / max(1e-3, pout_target_w)
        v_peak = math.pi * vdd
        harm_2 = "Open (> 500 Ohm, 2nd harmonic voltage peaking)"
        harm_3 = "Short (< 1 Ohm, zero 3rd harmonic voltage)"
        eff = 88.4
        
        omega_2 = 2.0 * omega
        c2_f = 0.5e-12
        l2_h = 1.0 / ((omega_2 ** 2) * c2_f)
        
        omega_3 = 3.0 * omega
        c3_f = 0.5e-12
        l3_h = 1.0 / ((omega_3 ** 2) * c3_f)
        mode_str = "Inverse Class-F (F^-1, 2nd Harmonic Peaking)"

    return ClassFDesign(
        mode=mode_str,
        r_load_fund_optimal=round(r_opt, 2),
        harmonic_2nd_impedance=harm_2,
        harmonic_3rd_impedance=harm_3,
        tank_3rd_l_nh=round(l3_h * 1e9, 3),
        tank_3rd_c_pf=round(c3_f * 1e12, 3),
        tank_2nd_trap_l_nh=round(l2_h * 1e9, 3),
        tank_2nd_trap_c_pf=round(c2_f * 1e12, 3),
        peak_vds_stress_v=round(v_peak, 2),
        theoretical_efficiency_pct=eff
    )
