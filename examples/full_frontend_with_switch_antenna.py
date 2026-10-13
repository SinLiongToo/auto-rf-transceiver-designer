"""
Example 8: Complete 77 GHz FMCW mmWave Radar Frontend with T/R Switch & AiP Antenna.
Full RF Front-End Chain:
  [Antenna] <---> [T/R Switch] <---> [PA (TX)] & [LNA (RX)]
                                       ^             |
                                    [VCO] -------> [Mixer]
Technology: TSMC 28nm HPC+ RF CMOS + High-Density Organic AiP (Antenna-in-Package)
Band: 76.0 - 81.0 GHz (Center: 77.0 GHz)
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
    AutomatedMixerDesigner,
    AutomatedSwitchDesigner,
    AutomatedAntennaDesigner
)

def main():
    print("=" * 85)
    print(" AutoRF Example 8: Complete 77 GHz mmWave Front-End with Switch & AiP Antenna ")
    print("                   [PA + LNA + VCO + Mixer + T/R Switch + Antenna]             ")
    print("=" * 85)

    f0_ghz = 77.0

    # 1. Antenna Synthesis
    print("\n[STAGE 1: 77 GHz ANTENNA-IN-PACKAGE (AiP) SYNTHESIS]")
    ant_engine = AutomatedAntennaDesigner("aip_organic")
    ant = ant_engine.synthesize(freq_ghz=f0_ghz, target_z0_ohm=50.0)
    print(f"  Substrate Technology   : {ant.substrate_type} (εr = {ant.dielectric_er}, h = {ant.substrate_height_um} μm)")
    print(f"  Free-Space Wavelength  : λ0 = {ant.lambda_free_space_mm} mm (Guided λg = {ant.lambda_guided_mm} mm)")
    print(f"  Resonant Patch Width W : {ant.patch_width_um} μm ({ant.patch_width_um/1000.0:.3f} mm)")
    print(f"  Resonant Patch Length L: {ant.patch_length_um} μm ({ant.patch_length_um/1000.0:.3f} mm)")
    print(f"  Inset Feed Notch Depth : {ant.inset_feed_depth_um} μm (Feed Line: {ant.feed_line_width_um} μm for 50Ω)")
    print(f"  Antenna Gain & Efficiency: Gain = {ant.gain_dbi} dBi (Directivity: {ant.directivity_dbi} dBi, η = {ant.radiation_efficiency_pct}%)")
    print(f"  Impedance Bandwidth    : {ant.bandwidth_mhz} MHz (Fractional BW: {ant.fractional_bandwidth_pct}%)")
    print(f"  HPBW Beamwidths        : E-Plane: {ant.beamwidth_e_plane_deg}° | H-Plane: {ant.beamwidth_h_plane_deg}°")

    # 2. T/R SPDT Switch Synthesis
    print("\n[STAGE 2: 77 GHz T/R SPDT TRANSMIT/RECEIVE SWITCH SYNTHESIS]")
    sw_engine = AutomatedSwitchDesigner("28nm_hpc")
    sw = sw_engine.synthesize(freq_ghz=f0_ghz, target_p1db_dbm=18.0)
    print(f"  Topology               : Series-Shunt SPDT with {sw.num_stacked_fets} Stacked NMOS FETs")
    print(f"  Insertion Loss (IL)    : {sw.insertion_loss_db} dB")
    print(f"  TX-to-RX Isolation (ISO): {sw.isolation_db} dB")
    print(f"  Return Loss (S11)      : {sw.return_loss_db} dB")
    print(f"  Power Handling P1dB    : {sw.p1db_power_handling_dbm} dBm (IIP3: {sw.iip3_dbm} dBm)")
    print(f"  Series FET Sizing      : W_ser = {sw.w_series_um} μm (Ron = {sw.r_on_series_ohm} Ω)")
    print(f"  Shunt FET Sizing       : W_shu = {sw.w_shunt_um} μm (Coff = {sw.c_off_shunt_ff} fF)")
    print(f"  Switch Figure-of-Merit : Ron * Coff = {sw.switch_fom_fs} fs")

    # 3. Power Amplifier (PA)
    print("\n[STAGE 3: 77 GHz POWER AMPLIFIER (PA)]")
    pa = AutomatedPADesigner("28nm_hpc").synthesize(freq_ghz=f0_ghz, pout_dbm=14.5, op_class="AB")
    print(f"  PA Output Power Pout   : {pa.pout_load_dbm} dBm ({pa.pout_load_mw} mW) | PAE: {pa.pae_pct}%")
    print(f"  EIRP Radiated by Ant   : {pa.pout_load_dbm - sw.insertion_loss_db + ant.gain_dbi:.2f} dBm (EIRP)")

    # 4. Low-Noise Amplifier (LNA)
    print("\n[STAGE 4: 77 GHz LOW-NOISE AMPLIFIER (LNA)]")
    lna = AutomatedLNADesigner("28nm_hpc").synthesize(freq_ghz=f0_ghz, target_gain_db=15.0, target_nf_db=2.5)
    print(f"  LNA Noise Figure (NF)  : {lna.nf_db} dB | Gain: {lna.gain_s21_db} dB")
    print(f"  System Noise Figure    : NF_sys = {sw.insertion_loss_db + lna.nf_db:.2f} dB (including T/R Switch IL)")

    # 5. VCO & Mixer
    print("\n[STAGE 5: 77 GHz VCO & GILBERT MIXER]")
    vco = AutomatedVCODesigner("28nm_hpc").synthesize(freq_ghz=f0_ghz, target_pn_1mhz_dbc=-105.0)
    mixer = AutomatedMixerDesigner("28nm_hpc").synthesize(rf_freq_ghz=f0_ghz, lo_freq_ghz=76.5)
    print(f"  VCO Phase Noise @ 1MHz : {vco.phase_noise_1mhz_dbc} dBc/Hz (Tuning Range: {vco.tuning_range_pct}%)")
    print(f"  Mixer Conversion Gain  : {mixer.conversion_gain_db} dB (IIP3: {mixer.iip3_dbm} dBm)")

    # 6. Complete Link Budget
    print("\n" + "=" * 85)
    print(" COMPLETE TRANSCEIVER SYSTEM LINK BUDGET WITH SWITCH & ANTENNA:")
    print(f"  • Transmitter EIRP    : {pa.pout_load_dbm - sw.insertion_loss_db + ant.gain_dbi:.2f} dBm")
    print(f"  • Receiver Total NF   : {sw.insertion_loss_db + lna.nf_db + 0.6:.2f} dB (Switch + LNA + Mixer)")
    print(f"  • Total DC Power Pdc  : {pa.p_dc_w*1000 + lna.p_dc_mw + vco.p_dc_mw + mixer.p_dc_mw:.1f} mW")
    print(f"  • AiP Footprint Size  : {ant.ground_plane_size_mm:.2f} mm x {ant.ground_plane_size_mm:.2f} mm")
    print("=" * 85)
    print("\n[ALL FRONT-END MODULES SYNTHESIZED SUCCESSFULLY]\n")

if __name__ == "__main__":
    main()
