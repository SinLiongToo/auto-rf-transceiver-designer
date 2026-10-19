"""
RF Linearity (AM-AM, AM-PM, IMD3, EVM, ACLR, DPD) & Thermal Reliability (Tj, SOA, Black's Law MTTF) Engine.
Provides behavioral modeling of large-signal distortion, OFDM modulation fidelity, digital predistortion,
and electro-thermal package dissipation for CMOS / SiGe RF Front-End ICs.
"""

import math
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class LinearityThermalResult:
    # Linearity & Modulation Metrics
    op_class: str
    modulation: str
    papr_db: float
    oip3_dbm: float
    iip3_dbm: float
    imd3_at_backoff_dbc: float
    am_pm_at_p1db_deg: float
    evm_raw_pct: float
    evm_dpd_pct: float
    evm_spec_limit_pct: float
    aclr_raw_dbc: float
    aclr_dpd_dbc: float
    harm_h2_dbc: float
    harm_h3_dbc: float
    dpd_enabled: bool

    # Electro-Thermal & Reliability Metrics
    package_type: str
    theta_ja_c_per_w: float
    ambient_temp_c: float
    p_diss_mw: float
    junction_temp_c: float
    thermal_margin_c: float
    mttf_years: float
    is_thermally_safe: bool


MODULATION_SPECS: Dict[str, Dict[str, float]] = {
    "QPSK":     {"papr_db": 5.5, "evm_limit_pct": 17.5},
    "16-QAM":   {"papr_db": 6.5, "evm_limit_pct": 12.5},
    "64-QAM":   {"papr_db": 7.5, "evm_limit_pct": 8.0},
    "256-QAM":  {"papr_db": 8.5, "evm_limit_pct": 3.5},
    "1024-QAM": {"papr_db": 9.5, "evm_limit_pct": 1.8},
}

PACKAGE_THERMAL_MODELS: Dict[str, float] = {
    "flip_chip_bga": 28.0,  # Flip-Chip BGA / AiP Substrate with thermal vias (C/W)
    "qfn_exposed":   38.0,  # QFN with Exposed Ground Paddle (C/W)
    "wlcsp":         52.0,  # Wafer-Level Chip-Scale Package (C/W)
}


def analyze_linearity_and_thermal(
    pout_dbm: float,
    gain_db: float,
    p_dc_w: float,
    op_class: str = "AB",
    is_differential: bool = True,
    modulation: str = "256-QAM",
    dpd_enabled: bool = True,
    package_type: str = "flip_chip_bga",
    ambient_temp_c: float = 25.0,
    j_current_density_ma_um: float = 0.65,
) -> LinearityThermalResult:
    """
    Evaluate large-signal Rapp/Saleh AM-AM & AM-PM distortion, two-tone IMD3,
    OFDM EVM / ACLR (with and without DPD), harmonic suppression, and junction temperature Tj.
    """
    op_cls = op_class.upper()
    mod_info = MODULATION_SPECS.get(modulation, MODULATION_SPECS["256-QAM"])
    papr_db = mod_info["papr_db"]
    evm_limit = mod_info["evm_limit_pct"]

    # Class-dependent smoothness factor (Rapp parameter s) and AM-PM conversion
    if op_cls == "A":
        oip3_offset = 10.8
        am_pm_deg = 2.8
    elif op_cls == "AB":
        oip3_offset = 9.6
        am_pm_deg = 5.2
    elif op_cls == "B":
        oip3_offset = 8.2
        am_pm_deg = 7.5
    elif op_cls == "C":
        oip3_offset = 6.0
        am_pm_deg = 12.0
    else:  # Class E / F switching
        oip3_offset = 5.2
        am_pm_deg = 14.5

    p1db_dbm = pout_dbm - 1.2
    oip3_dbm = p1db_dbm + oip3_offset
    iip3_dbm = oip3_dbm - gain_db

    # Operating at average power backed off by PAPR
    p_avg_dbm = pout_dbm - papr_db
    imd3_dbc = -2.0 * (oip3_dbm - p_avg_dbm)
    imd3_dbc = max(-68.0, min(-15.0, imd3_dbc))

    # ACLR and EVM without and with Digital Predistortion (DPD)
    aclr_raw_dbc = imd3_dbc + 3.5
    aclr_dpd_dbc = aclr_raw_dbc - (13.5 if op_cls in ("A", "AB", "B") else 9.5)

    # Convert distortion power + AM-PM phase error into EVM (%)
    snr_linear_inv = 10.0 ** (imd3_dbc / 10.0)
    phase_err_rad = math.radians(am_pm_deg * 0.45)
    evm_raw_pct = math.sqrt(snr_linear_inv + (phase_err_rad ** 2)) * 100.0
    evm_raw_pct = round(max(0.6, min(35.0, evm_raw_pct)), 2)

    evm_dpd_pct = round(max(0.45, evm_raw_pct * 0.28), 2)

    # Harmonic levels after transformer balun & LC matching network
    harm_h2_dbc = -46.0 if is_differential else -28.0
    harm_h3_dbc = -44.0 if op_cls == "F" else (-36.0 if is_differential else -26.0)

    # Electro-Thermal Dissipation
    theta_ja = PACKAGE_THERMAL_MODELS.get(package_type, 28.0)
    pout_w = (10.0 ** (pout_dbm / 10.0)) * 1e-3
    # At peak RF or CW operation, dissipated heat is P_dc - P_out
    p_diss_w = max(0.005, p_dc_w - pout_w * 0.65)
    p_diss_mw = round(p_diss_w * 1000.0, 1)

    junction_temp_c = round(ambient_temp_c + p_diss_w * theta_ja, 1)
    max_safe_tj_c = 125.0
    thermal_margin_c = round(max_safe_tj_c - junction_temp_c, 1)
    is_thermally_safe = junction_temp_c <= max_safe_tj_c

    # Black's Equation for Electromigration MTTF (Years)
    # MTTF ~ A * J^(-2) * exp(Ea / (k_B * T_K))
    k_b_ev = 8.617333e-5
    ea_ev = 0.70  # Copper / AlCu interconnect activation energy
    t_kelvin = junction_temp_c + 273.15
    t_ref_k = 373.15  # 100 C reference
    j_ratio = max(0.2, j_current_density_ma_um / 1.0)
    mttf_years = 15.0 * (1.0 / (j_ratio ** 2)) * math.exp((ea_ev / k_b_ev) * (1.0 / t_kelvin - 1.0 / t_ref_k))
    mttf_years = round(max(1.0, min(150.0, mttf_years)), 1)

    return LinearityThermalResult(
        op_class=op_cls,
        modulation=modulation,
        papr_db=papr_db,
        oip3_dbm=round(oip3_dbm, 1),
        iip3_dbm=round(iip3_dbm, 1),
        imd3_at_backoff_dbc=round(imd3_dbc, 1),
        am_pm_at_p1db_deg=round(am_pm_deg, 1),
        evm_raw_pct=evm_raw_pct,
        evm_dpd_pct=evm_dpd_pct,
        evm_spec_limit_pct=evm_limit,
        aclr_raw_dbc=round(aclr_raw_dbc, 1),
        aclr_dpd_dbc=round(aclr_dpd_dbc, 1),
        harm_h2_dbc=round(harm_h2_dbc, 1),
        harm_h3_dbc=round(harm_h3_dbc, 1),
        dpd_enabled=dpd_enabled,
        package_type=package_type,
        theta_ja_c_per_w=theta_ja,
        ambient_temp_c=ambient_temp_c,
        p_diss_mw=p_diss_mw,
        junction_temp_c=junction_temp_c,
        thermal_margin_c=thermal_margin_c,
        mttf_years=mttf_years,
        is_thermally_safe=is_thermally_safe,
    )
