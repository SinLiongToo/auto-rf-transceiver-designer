"""
SPICE / Spectre Netlist Exporter for CMOS RF Power Amplifiers.
Generates complete simulation deck including core amplifier subcircuit,
bias network, neutralization capacitors, transformer balun, and testbench.
"""

from typing import Dict, Any

def generate_spice_netlist(design_dict: Dict[str, Any], dialect: str = "ngspice") -> str:
    """
    Generate a complete executable SPICE netlist from the synthesized PA parameters.
    
    Args:
        design_dict: Dictionary containing synthesized parameters
        dialect: 'ngspice', 'spectre', or 'ltspice'
    """
    freq_ghz = design_dict["freq_ghz"]
    vdd = design_dict["vdd"]
    pout_target_dbm = design_dict["pout_target_dbm"]
    process_name = design_dict["process_name"]
    op_class = design_dict["op_class"]
    w_tot_um = design_dict["w_total_um"]
    l_gate_um = design_dict["l_gate_um"]
    num_fingers = design_dict["num_fingers"]
    rg_ohm = design_dict["rg_ohm"]
    c_neu_ff = design_dict.get("c_neu_ff", 0.0)
    
    # Matching network parameters
    lp_nh = design_dict["balun_lp_nh"]
    ls_nh = design_dict["balun_ls_nh"]
    k_balun = design_dict["balun_k"]
    cp_pf = design_dict["balun_cp_pf"]
    cs_pf = design_dict["balun_cs_pf"]
    
    # IMN parameters
    imn_l_nh = design_dict["imn_l_nh"]
    imn_c_pf = design_dict["imn_c_pf"]
    
    period_ns = 1.0 / freq_ghz
    sim_tstop_ns = round(period_ns * 30.0, 2)
    sim_tstep_ns = round(period_ns / 100.0, 4)
    
    # Bias voltage based on class
    vth = design_dict.get("vth", 0.35)
    if op_class == "A":
        v_bias = vth + 0.35
    elif op_class == "AB":
        v_bias = vth + 0.12
    elif op_class == "B":
        v_bias = vth
    elif op_class == "C":
        v_bias = vth - 0.10
    else: # Switching
        v_bias = vth + 0.10

    netlist = f"""* ==============================================================================
* AutoPA-RF Generated CMOS Power Amplifier Simulation Deck
* Target: {freq_ghz} GHz | Target Pout: {pout_target_dbm} dBm | Process: {process_name}
* Operation Class: {op_class} | Differential Cascode with Cross-Neutralization
* ==============================================================================

.title CMOS RF Power Amplifier Simulation Deck ({freq_ghz} GHz, {pout_target_dbm} dBm)

* --- Global DC Supplies & Ground ---
.param VDD_VAL = {vdd}
.param VBIAS_VAL = {round(v_bias, 3)}
.param FREQ_RF = {freq_ghz}G

VDD    vdd_node 0  DC {{VDD_VAL}}
VBIAS  vbias_dc 0  DC {{VBIAS_VAL}}

* --- RF Input Source (Differential Drive 50-Ohm source) ---
* Vin amplitude calculated for ~0 dBm input drive
VINP   rf_inp_raw 0  SIN(0 0.35 {{FREQ_RF}} 0 0)
VINN   rf_inn_raw 0  SIN(0 0.35 {{FREQ_RF}} 0 0 180)
RS_P   rf_inp_raw rf_inp 25.0
RS_N   rf_inn_raw rf_inn 25.0

* --- Input Matching Network (IMN) ---
L_IMN_P rf_inp    gate_p_dc {{ {imn_l_nh}n }}
C_IMN_P gate_p_dc 0         {{ {imn_c_pf}p }}
L_IMN_N rf_inn    gate_n_dc {{ {imn_l_nh}n }}
C_IMN_N gate_n_dc 0         {{ {imn_c_pf}p }}

* DC Bias Feeds to Gates (Isolated with large RFC / Resistor)
R_BIAS_P vbias_dc gate_p_dc 5k
R_BIAS_N vbias_dc gate_n_dc 5k

* Gate Poly Series Resistance
R_GATE_P gate_p_dc gate_p_core {{ {rg_ohm} }}
R_GATE_N gate_n_dc gate_n_core {{ {rg_ohm} }}

* --- Differential Core Transistors (CS or Cascode) ---
* M_CS_P: Differential Positive Main FET
M_CS_P drain_p gate_p_core 0 0 CMOS_RF_NMOS W={w_tot_um}u L={l_gate_um}u M=1 NF={num_fingers}
* M_CS_N: Differential Negative Main FET
M_CS_N drain_n gate_n_core 0 0 CMOS_RF_NMOS W={w_tot_um}u L={l_gate_um}u M=1 NF={num_fingers}

* --- Differential Cross-Coupled Neutralization Capacitors (Cneu = Cgd) ---
* Eliminates Miller capacitance, guarantees unconditional stability (k > 1)
C_NEU_1 gate_p_core drain_n {{ {c_neu_ff}f }}
C_NEU_2 gate_n_core drain_p {{ {c_neu_ff}f }}

* --- Output Matching Network: On-Chip Transformer Balun ---
* Primary split coils with center-tap tied to VDD (Dual-feed RFC)
L_PRI_P drain_p  vdd_node {{ {round(lp_nh / 2.0, 3)}n }}
L_PRI_N drain_n  vdd_node {{ {round(lp_nh / 2.0, 3)}n }}

* Primary Tuning Capacitor (absorbs Cds + resonates leakage)
C_PRI   drain_p  drain_n  {{ {cp_pf}p }}

* Secondary Output Coil
L_SEC   rf_out_p rf_out_n {{ {ls_nh}n }}
C_SEC   rf_out_p rf_out_n {{ {cs_pf}p }}

* Mutual Magnetic Couplings (Coupling factor k = {k_balun})
K_PRI_SEC1 L_PRI_P L_SEC {{ {k_balun} }}
K_PRI_SEC2 L_PRI_N L_SEC {{ {k_balun} }}
K_PRI_PRI  L_PRI_P L_PRI_N 0.85

* Single-Ended 50-Ohm Load Termination
R_LOAD  rf_out_p rf_out_n 50.0

* --- Realistic Scalable CMOS RF Model Card ---
.model CMOS_RF_NMOS NMOS (
+ LEVEL = 3
+ VTO   = {vth}
+ KP    = {design_dict.get('kp', 380.0)}u
+ THETA = 0.15
+ VMAX  = 1.2e5
+ ETA   = 0.05
+ TOX   = 2.2n
+ CGSO  = {design_dict.get('c_ov', 0.35)}n
+ CGDO  = {design_dict.get('c_ov', 0.35)}n
+ CJ    = {design_dict.get('cj0', 1.1)}m
+ CJSW  = {design_dict.get('cjsw', 0.4)}n
+ RSH   = 10.0
+ PB    = 0.85
)

* --- Simulation Commands ---
.tran {sim_tstep_ns}n {sim_tstop_ns}n {round(sim_tstop_ns - 5.0 * period_ns, 2)}n
.control
  run
  meas tran vout_pk_pk PP v(rf_out_p, rf_out_n)
  meas tran idc_tot AVG i(vdd_node)
  let pout_w = (vout_pk_pk / (2 * sqrt(2)))^2 / 50.0
  let pout_dbm = 10 * log(pout_w * 1000.0) / log(10)
  print pout_dbm
.endc

.end
"""
    return netlist

def generate_touchstone_s2p(
    freq_center_ghz: float,
    s11_mag: float,
    s21_gain_db: float,
    s12_isolation_db: float,
    s22_mag: float,
    num_pts: int = 21,
    span_factor: float = 0.4
) -> str:
    """
    Generate standard Touchstone .s2p file (format: Frequency (GHz), S11 (DB/ANG), S21, S12, S22).
    """
    f_start = freq_center_ghz * (1.0 - span_factor)
    f_stop = freq_center_ghz * (1.0 + span_factor)
    step = (f_stop - f_start) / max(1, num_pts - 1)
    
    s21_mag = 10.0 ** (s21_gain_db / 20.0)
    s12_mag = 10.0 ** (s12_isolation_db / 20.0)
    
    lines = [
        f"! AutoPA-RF Touchstone S-Parameter File (.s2p)",
        f"! Center Frequency: {freq_center_ghz} GHz | System Z0: 50 Ohm",
        "# GHZ S DB R 50.0",
        "! Freq       S11_dB   S11_deg   S21_dB   S21_deg   S12_dB   S12_deg   S22_dB   S22_deg"
    ]
    
    s11_db = 20.0 * 0.434 * (0.0 if s11_mag <= 0 else -0.5) # approx return loss
    s22_db = 20.0 * 0.434 * (0.0 if s22_mag <= 0 else -0.5)
    
    for i in range(num_pts):
        f = f_start + i * step
        # Add slight realistic frequency roll-off away from center
        delta_f_norm = abs(f - freq_center_ghz) / freq_center_ghz
        roll_off_db = 12.0 * (delta_f_norm ** 2)
        cur_s21_db = round(s21_gain_db - roll_off_db, 2)
        cur_s11_db = round(-15.0 + roll_off_db * 2.0, 2)
        cur_s22_db = round(-14.0 + roll_off_db * 2.0, 2)
        cur_s12_db = round(s12_isolation_db, 2)
        
        deg = round(-180.0 * (f / freq_center_ghz), 1)
        lines.append(
            f"{f:8.4f}   {cur_s11_db:7.2f}   {deg:7.1f}   {cur_s21_db:7.2f}   {deg:7.1f}   {cur_s12_db:7.2f}   {deg:7.1f}   {cur_s22_db:7.2f}   {deg:7.1f}"
        )
        
    return "\n".join(lines)
