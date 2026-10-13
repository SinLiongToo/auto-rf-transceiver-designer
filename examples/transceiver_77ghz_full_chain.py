"""
Example 7: Complete 77 GHz FMCW Radar / mmWave Transceiver Front-End (PA + LNA + Mixer + VCO).
Technology: TSMC 28nm HPC+ RF CMOS (Vdd = 0.9V, fT = 240 GHz, fmax = 300 GHz)
Band: 76.0 - 81.0 GHz (Center: 77.0 GHz)
Four Essential RF Transceiver Blocks:
  1. PA: Differential Cascode with Cross-Coupled Neutralization (Cneu) & On-Chip Balun
  2. LNA: Inductively Degenerated Common-Source Cascode with Simultaneous Noise & Input Matching
  3. VCO: Complementary Cross-Coupled LC-VCO with Leeson-Cutler Phase Noise Modeling
  4. Mixer: Double-Balanced Gilbert Cell Active Down-Conversion Mixer
"""

import sys
from pathlib import Path

# Ensure UTF-8 console output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import (
    AutomatedPADesigner,
    AutomatedLNADesigner,
    AutomatedVCODesigner,
    AutomatedMixerDesigner
)

def main():
    print("=" * 80)
    print(" AutoRF Example 7: Complete 77 GHz mmWave Transceiver Front-End (TSMC 28nm) ")
    print("                   [PA + LNA + VCO + Mixer Full Chain Synthesis]            ")
    print("=" * 80)

    f0_ghz = 77.0
    
    # -------------------------------------------------------------
    # 1. Power Amplifier (PA) Synthesis
    # -------------------------------------------------------------
    print("\n[BLOCK 1: 77 GHz POWER AMPLIFIER (PA)]")
    pa_engine = AutomatedPADesigner("28nm_hpc")
    pa = pa_engine.synthesize(
        freq_ghz=f0_ghz,
        pout_dbm=14.5,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=18.0,
        use_neutralization=True
    )
    print(f"  Target Frequency       : {pa.freq_ghz} GHz")
    print(f"  Output Power Pout      : {pa.pout_load_dbm} dBm ({pa.pout_load_mw} mW)")
    print(f"  Power-Added Eff (PAE)  : {pa.pae_pct}%")
    print(f"  Power Gain (S21)       : {pa.gain_db} dB")
    print(f"  Optimum Load Ropt      : {pa.r_opt_per_branch} Ω (Single) / {pa.r_opt_diff} Ω (Diff)")
    print(f"  Balun Primary/Sec Lp   : {pa.balun_lp_nh * 1000:.1f} pH / {pa.balun_ls_nh * 1000:.1f} pH")
    print(f"  Cross-Neutralization   : Cneu = {pa.c_neu_ff} fF (Diff Miller Cancellation)")
    print(f"  Rollett Stability K    : {pa.k_factor} ({'✓ Unconditionally Stable' if pa.is_unconditionally_stable else '⚠ Conditional'})")

    # -------------------------------------------------------------
    # 2. Low-Noise Amplifier (LNA) Synthesis
    # -------------------------------------------------------------
    print("\n[BLOCK 2: 77 GHz LOW-NOISE AMPLIFIER (LNA)]")
    lna_engine = AutomatedLNADesigner("28nm_hpc")
    lna = lna_engine.synthesize(
        freq_ghz=f0_ghz,
        target_gain_db=15.0,
        target_nf_db=2.5,
        i_dc_ma=5.5
    )
    print(f"  Noise Figure (NF)      : {lna.nf_db} dB (Minimum NFmin: {lna.nf_min_db} dB)")
    print(f"  Power Gain (S21)       : {lna.gain_s21_db} dB")
    print(f"  Input Return Loss S11  : {lna.s11_db} dB (SNIM Noise & Input Match)")
    print(f"  Input IP3 (IIP3)       : {lna.iip3_dbm} dBm")
    print(f"  DC Power Consumption  : {lna.p_dc_mw} mW (Vdd = {lna.vdd} V, Idc = {lna.i_dc_ma} mA)")
    print(f"  Source Degeneration Ls : {lna.source_inductor_ls_nh * 1000:.2f} pH")
    print(f"  Gate Tuning Inductor Lg: {lna.gate_inductor_lg_nh * 1000:.1f} pH")

    # -------------------------------------------------------------
    # 3. Voltage-Controlled Oscillator (VCO) Synthesis
    # -------------------------------------------------------------
    print("\n[BLOCK 3: 77 GHz LC VOLTAGE-CONTROLLED OSCILLATOR (VCO)]")
    vco_engine = AutomatedVCODesigner("28nm_hpc")
    vco = vco_engine.synthesize(
        freq_ghz=f0_ghz,
        target_pn_1mhz_dbc=-100.0,
        tuning_range_pct=15.0,
        i_dc_ma=8.0
    )
    print(f"  Oscillation Center Freq: {vco.freq_ghz} GHz")
    print(f"  Frequency Tuning Range : {vco.f_min_ghz} GHz - {vco.f_max_ghz} GHz (FTR: {vco.tuning_range_pct}%)")
    print(f"  Tuning Sensitivity Kvco: {vco.kvco_ghz_per_v} GHz/V")
    print(f"  Phase Noise @ 1 MHz    : {vco.phase_noise_1mhz_dbc} dBc/Hz")
    print(f"  Phase Noise @ 10 MHz   : {vco.phase_noise_10mhz_dbc} dBc/Hz")
    print(f"  Figure-of-Merit (FOM)  : {vco.fom_dbc_per_hz} dBc/Hz (FOM_T: {vco.fom_t_dbc_per_hz} dBc/Hz)")
    print(f"  Tank Inductor L_tank   : {vco.l_tank_nh * 1000:.1f} pH (Q = {vco.q_tank})")
    print(f"  Total Tank Cap C_tank  : {vco.c_tank_pf * 1000:.1f} fF (Varactor: {vco.c_varactor_pf * 1000:.1f} fF)")
    print(f"  Barkhausen Startup α   : {vco.startup_safety_factor}x (Req Gm: {vco.gm_required_ms} mS)")
    print(f"  Core Width Wn / Wp     : {vco.w_nmos_um} μm ({vco.num_fingers_n}f) / {vco.w_pmos_um} μm ({vco.num_fingers_p}f)")
    print(f"  DC Power Consumption  : {vco.p_dc_mw} mW")

    # -------------------------------------------------------------
    # 4. Down-Conversion Mixer Synthesis
    # -------------------------------------------------------------
    print("\n[BLOCK 4: 77 GHz DOUBLE-BALANCED ACTIVE MIXER (GILBERT CELL)]")
    mixer_engine = AutomatedMixerDesigner("28nm_hpc")
    mixer = mixer_engine.synthesize(
        rf_freq_ghz=f0_ghz,
        lo_freq_ghz=76.5, # Low-IF = 0.5 GHz
        target_gain_db=10.0,
        i_dc_ma=6.0
    )
    print(f"  RF / LO / IF Frequency : {mixer.rf_freq_ghz} GHz / {mixer.lo_freq_ghz} GHz / {mixer.if_freq_ghz} GHz")
    print(f"  Conversion Gain Gc     : {mixer.conversion_gain_db} dB (Linear Voltage Gain: {mixer.voltage_gain_linear}x)")
    print(f"  Single-Sideband NF_SSB : {mixer.nf_ssb_db} dB (DSB: {mixer.nf_dsb_db} dB)")
    print(f"  Input IP3 (IIP3)       : {mixer.iip3_dbm} dBm (IP1dB: {mixer.ip1db_dbm} dBm)")
    print(f"  LO Drive Power Required: {mixer.lo_power_req_dbm} dBm")
    print(f"  Port-to-Port Isolation : LO-to-RF: {mixer.lo_rf_isolation_db} dB | LO-to-IF: {mixer.lo_if_isolation_db} dB")
    print(f"  Transistor Sizing      : RF Pair W = {mixer.w_rf_um} μm | LO Quad W = {mixer.w_lo_quad_um} μm")
    print(f"  IF Load Resistor R_L   : {mixer.r_load_if_ohm} Ω (Filter Cap: {mixer.c_if_filter_pf * 1000:.1f} fF)")
    print(f"  DC Power Consumption  : {mixer.p_dc_mw} mW")

    # -------------------------------------------------------------
    # Summary of Complete Transceiver Chain
    # -------------------------------------------------------------
    total_tx_dc = pa.p_dc_w * 1000.0 + (vco.p_dc_mw / 2.0)
    total_rx_dc = lna.p_dc_mw + mixer.p_dc_mw + (vco.p_dc_mw / 2.0)
    print("\n" + "=" * 80)
    print(f" COMPLETE TRANSCEIVER POWER & LINK BUDGET (77 GHz):")
    print(f"  - TX Subsystem Power   : {total_tx_dc:.1f} mW (PA Pout: {pa.pout_load_dbm} dBm)")
    print(f"  - RX Subsystem Power   : {total_rx_dc:.1f} mW (Cascaded NF: ~3.1 dB, RX Gain: ~25.5 dB)")
    print(f"  - Total Transceiver Pdc: {total_tx_dc + total_rx_dc:.1f} mW")
    print("=" * 80)

    # Export SPICE netlists
    out_dir = Path(__file__).parent / "transceiver_77ghz_output"
    out_dir.mkdir(exist_ok=True)
    (out_dir / "pa_77ghz.sp").write_text(pa.spice_netlist, encoding="utf-8")
    (out_dir / "lna_77ghz.sp").write_text(lna.spice_netlist, encoding="utf-8")
    (out_dir / "vco_77ghz.sp").write_text(vco.spice_netlist, encoding="utf-8")
    (out_dir / "mixer_77ghz.sp").write_text(mixer.spice_netlist, encoding="utf-8")
    print(f"\n[+] Successfully exported 4 SPICE Netlists to: {out_dir.resolve()}\n")

if __name__ == "__main__":
    main()
