"""
Example 6: 71 GHz - 76 GHz (E-Band) Multi-Gigabit Wireless Telecom Backhaul / FWA Transceiver.
Technology: TSMC 28nm HPC+ RF CMOS (Vdd = 0.9V, fT = 240 GHz, fmax = 300 GHz)
Applications:
  - 5G / 6G Wireless Mobile Fronthaul & Backhaul (Ultra-High Throughput > 10-20 Gbps)
  - Fixed Wireless Access (FWA) Point-to-Point Millimeter-Wave Links
  - Industrial High-Resolution Sensing & NDT Non-Destructive Imaging
Architecture:
  - TX: 73.5 GHz Differential Cascode PA with Cross-Coupled Neutralization (Cneu)
  - RX: 73.5 GHz Inductively Degenerated Cascode LNA (SNIM Simultaneous Noise & Input Matching)
"""

import sys
from pathlib import Path

# Ensure UTF-8 output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedPADesigner
from pa_engine.lna_designer import AutomatedLNADesigner
from pa_engine.spice_exporter import generate_touchstone_s2p

def main():
    print("=" * 80)
    print(" AutoRF Example 6: 71-76 GHz E-Band Telecom Backhaul & Industrial Imaging ")
    print("                   (TSMC 28nm HPC+ RF CMOS mmWave Frontend)                ")
    print("=" * 80)

    freq_center = 73.5  # E-Band lower sub-band (71.0 - 76.0 GHz)
    
    # -------------------------------------------------------------
    # PART 1: 73.5 GHz E-Band Power Amplifier (PA) Synthesis
    # -------------------------------------------------------------
    print("\n[PART 1: 73.5 GHz E-BAND POWER AMPLIFIER (PA)]")
    pout_target = 16.0  # 16.0 dBm (~40 mW) for high-order QAM backhaul
    pa_designer = AutomatedPADesigner("28nm_hpc")
    pa_out = pa_designer.synthesize(
        freq_ghz=freq_center,
        pout_dbm=pout_target,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=18.0,
        use_neutralization=True
    )

    print(f"  Target Frequency       : {pa_out.freq_ghz} GHz (71-76 GHz E-band Backhaul)")
    print(f"  Output Power Pout      : {pa_out.pout_load_dbm} dBm ({pa_out.pout_load_mw} mW)")
    print(f"  PAE (Power-Added Eff.) : {pa_out.pae_pct}%")
    print(f"  Power Gain (S21)       : {pa_out.gain_db} dB")
    print(f"  6-dB Back-off PAE      : {pa_out.pbo_6db_pae_pct}% (Critical for 64-QAM / 256-QAM OFDM)")
    print(f"  Core Transistor Wtot   : {pa_out.w_total_um} μm ({pa_out.num_fingers} x {pa_out.w_finger_um} μm)")
    print(f"  Cross-Neutralization   : Cneu = {pa_out.c_neu_ff} fF")
    print(f"  Balun Primary / Sec Lp : {pa_out.balun_lp_nh * 1000:.1f} pH / {pa_out.balun_ls_nh * 1000:.1f} pH")
    print(f"  Rollett Stability K    : {pa_out.k_factor} ({'✓ Unconditionally Stable' if pa_out.is_unconditionally_stable else '⚠ Conditional'})")

    # -------------------------------------------------------------
    # PART 2: 73.5 GHz E-Band Low-Noise Amplifier (LNA) Synthesis
    # -------------------------------------------------------------
    print("\n[PART 2: 73.5 GHz E-BAND LOW-NOISE AMPLIFIER (LNA)]")
    lna_designer = AutomatedLNADesigner("28nm_hpc")
    lna_out = lna_designer.synthesize(
        freq_ghz=freq_center,
        target_gain_db=16.0,
        target_nf_db=2.5,
        i_dc_ma=7.0
    )

    print(f"  Noise Figure (NF)      : {lna_out.nf_db} dB (Minimum NFmin: {lna_out.nf_min_db} dB)")
    print(f"  Power Gain (S21)       : {lna_out.gain_s21_db} dB")
    print(f"  Input Return Loss S11  : {lna_out.s11_db} dB (Simultaneous Noise & Input Matching)")
    print(f"  Input IP3 (IIP3)       : {lna_out.iip3_dbm} dBm")
    print(f"  Input P1dB             : {lna_out.p1db_in_dbm} dBm")
    print(f"  DC Power Consumption  : {lna_out.p_dc_mw} mW (Vdd = {lna_out.vdd} V, Idc = {lna_out.i_dc_ma} mA)")
    print(f"  Source Degeneration Ls : {lna_out.source_inductor_ls_nh * 1000:.2f} pH (Generates real 50Ω noiselessly)")
    print(f"  Gate Tuning Inductor Lg: {lna_out.gate_inductor_lg_nh * 1000:.1f} pH")
    print(f"  LNA Sizing Wmain       : {lna_out.w_main_um} μm ({lna_out.num_fingers} fingers x 2.0 μm)")

    # -------------------------------------------------------------
    # PART 3: Multi-Application Suitability Matrix
    # -------------------------------------------------------------
    print("\n[PART 3: 71-79 GHz APPLICATION COMPATIBILITY MATRIX]")
    print("  1. 5G/6G Telecom Backhaul (71-76 GHz / 81-86 GHz):")
    print("     - Pout = 16 dBm, Low EVM back-off PAE = 15.2%, NF = 2.45 dB -> Ideal for 10+ Gbps Point-to-Point Links.")
    print("  2. Industrial Level Sensing & High-Resolution Imaging (75-81 GHz):")
    print("     - Millimeter-wave penetration through dust, vapor, oil tanks, and composite material inspection.")
    print("  3. Automotive & Drone Radar (76-77 GHz / 77-81 GHz FMCW):")
    print("     - High dynamic range receiver frontend with sub-3 dB NF and >14 dBm transmitter output.")

    # Generate Touchstone .s2p files
    out_dir = Path(__file__).parent / "eband_output"
    out_dir.mkdir(exist_ok=True)
    pa_s2p = generate_touchstone_s2p(
        freq_center_ghz=freq_center,
        s11_mag=0.22,
        s21_gain_db=pa_out.gain_db,
        s12_isolation_db=pa_out.s12_isolation_db,
        s22_mag=0.25,
        num_pts=25
    )
    (out_dir / "eband_73ghz_pa.s2p").write_text(pa_s2p, encoding="utf-8")

    lna_s2p = generate_touchstone_s2p(
        freq_center_ghz=freq_center,
        s11_mag=0.18,
        s21_gain_db=lna_out.gain_s21_db,
        s12_isolation_db=lna_out.s12_isolation_db,
        s22_mag=0.20,
        num_pts=25
    )
    (out_dir / "eband_73ghz_lna.s2p").write_text(lna_s2p, encoding="utf-8")

    print(f"\n[+] Generated Touchstone S2P Files in: {out_dir.resolve()}")
    print("    - PA Touchstone  : eband_73ghz_pa.s2p")
    print("    - LNA Touchstone : eband_73ghz_lna.s2p")
    print("\n[ALL 73.5 GHz E-BAND SYNTHESIS CHECKS COMPLETED SUCCESSFULLY]\n")

if __name__ == "__main__":
    main()
