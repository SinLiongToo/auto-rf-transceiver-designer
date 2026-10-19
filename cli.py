"""
AutoPA-RF Command Line Interface.
Automated CMOS RF Power Amplifier Design, Sizing, Matching & Netlist Generator.
"""

import argparse
import json
import sys
from pathlib import Path

# Ensure UTF-8 output in Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from pa_engine import (
    AutomatedPADesigner,
    AutomatedLNADesigner,
    AutomatedVCODesigner,
    AutomatedMixerDesigner,
    AutomatedSwitchDesigner,
    AutomatedAntennaDesigner,
    AutomatedFilterDesigner,
    PDK_LIBRARY,
    analyze_linearity_and_thermal,
)
from pa_engine.spice_exporter import generate_touchstone_s2p

def print_banner():
    banner = r"""
  ___         _        ___   _           ___  ___ 
 / _ \  _  _ | |_  ___| _ \ /_\   ___   | _ \| __|
| (_) || || ||  _|/ _ \  _// _ \ |___|  |   /| _| 
 \___/  \_,_| \__|\___/_| /_/ \_\       |_|_\|_|  
 Automated RF & mmWave Front-End Transceiver Synthesis Suite (v1.5.0)
"""
    print(banner)

def main():
    parser = argparse.ArgumentParser(
        description="AutoRF: Automated RF & mmWave Front-End Transceiver Design & Sizing Tool"
    )
    parser.add_argument(
        "--module", type=str, default="pa",
        choices=["pa", "lna", "vco", "mixer", "switch", "antenna", "filter", "all"],
        help="RF module to synthesize (pa, lna, vco, mixer, switch, antenna, filter, all). Default: pa"
    )
    parser.add_argument(
        "--freq", type=float, default=2.4,
        help="Carrier / cutoff frequency in GHz (e.g., 2.4, 5.2, 28.0, 77.0). Default: 2.4"
    )
    parser.add_argument(
        "--pout", type=float, default=24.0,
        help="Target PA output power in dBm (e.g., 20.0, 24.0, 28.0). Default: 24.0"
    )
    parser.add_argument(
        "--node", type=str, default="65nm_rf",
        choices=list(PDK_LIBRARY.keys()),
        help=f"Semiconductor PDK node. Options: {', '.join(PDK_LIBRARY.keys())}. Default: 65nm_rf"
    )
    parser.add_argument(
        "--vdd", type=float, default=None,
        help="Supply voltage in Volts (defaults to PDK nominal)"
    )
    parser.add_argument(
        "--op-class", type=str, default="AB",
        choices=["A", "AB", "B", "C", "E", "F"],
        help="Amplifier operation class (A, AB, B, C, E, F). Default: AB"
    )
    parser.add_argument(
        "--topology", type=str, default="differential_cascode",
        choices=["differential_cascode", "differential_cs", "single_ended"],
        help="PA architecture topology. Default: differential_cascode"
    )
    parser.add_argument(
        "--inductor-q", type=float, default=None,
        help="On-chip inductor quality factor Q (defaults to PDK default)"
    )
    parser.add_argument(
        "--modulation", type=str, default="256-QAM",
        choices=["QPSK", "16-QAM", "64-QAM", "256-QAM", "1024-QAM"],
        help="Modulation scheme for EVM / ACLR / DPD evaluation. Default: 256-QAM"
    )
    parser.add_argument(
        "--filter-type", type=str, default="LP",
        choices=["LP", "HP", "BPF", "BSF"],
        help="Filter response type: LP (Low-Pass/LF), HP (High-Pass), BPF (Band-Pass), BSF (Band-Stop). Default: LP"
    )
    parser.add_argument(
        "--filter-order", type=int, default=3,
        choices=[1, 2, 3, 4, 5, 6, 7],
        help="LC Ladder Filter order N (1 to 7). Default: 3"
    )
    parser.add_argument(
        "--export-spice", type=str, default=None,
        help="Path to export SPICE netlist (.sp / .cir)"
    )
    parser.add_argument(
        "--export-s2p", type=str, default=None,
        help="Path to export Touchstone S-parameter file (.s2p)"
    )
    parser.add_argument(
        "--export-json", type=str, default=None,
        help="Path to export full design results (.json)"
    )

    args = parser.parse_args()
    print_banner()

    print(f"[*] Initializing synthesizer for PDK Node: {args.node} | Module: {args.module.upper()}...")
    designer = AutomatedPADesigner(args.node)

    out = designer.synthesize(
        freq_ghz=args.freq,
        pout_dbm=args.pout,
        vdd=args.vdd,
        op_class=args.op_class,
        topology=args.topology,
        inductor_q=args.inductor_q
    )

    lin_therm = analyze_linearity_and_thermal(
        pout_dbm=out.pout_load_dbm,
        gain_db=out.gain_db,
        p_dc_w=out.p_dc_w,
        op_class=args.op_class,
        is_differential="diff" in args.topology,
        modulation=args.modulation,
        dpd_enabled=True,
    )

    if args.module in ("pa", "all"):
        print("\n" + "=" * 68)
        print("           [PA] POWER AMPLIFIER SYNTHESIS & SIZING SUMMARY          ")
        print("=" * 68)
        print("\n[1] LOADLINE & DC PERFORMANCE:")
        print(f"    Supply Voltage Vdd    : {out.vdd} V ({out.process_name})")
        print(f"    Total DC Current Idc  : {round(out.i_dc_tot_a * 1000, 1)} mA")
        print(f"    Total DC Power Pdc    : {round(out.p_dc_w * 1000, 1)} mW")
        print(f"    Optimum Load Ropt     : {out.r_opt_per_branch} Ohm (Branch) | {out.r_opt_diff} Ohm (Diff)")
        print(f"    Peak RF Current Imax  : {round(out.i_max_peak_a * 1000, 1)} mA")

        print("\n[2] TRANSISTOR SIZING (PER BRANCH CORE):")
        print(f"    Total Gate Width Wtot : {out.w_total_um} um ({out.num_fingers} fingers x {out.w_finger_um} um)")
        print(f"    Gate Length L         : {out.l_gate_um} um | Cells M: {out.num_cells_m}")
        print(f"    Transconductance gm   : {out.gm_ms} mS")
        print(f"    Parasitics (Cgs/Cgd/Cds): {out.cgs_ff} fF / {out.cgd_ff} fF / {out.cds_ff} fF")
        print(f"    Transit Freq fT / fmax: {out.ft_ghz} GHz / {out.fmax_ghz} GHz")
        print(f"    Neutralization Cneu   : {out.c_neu_ff} fF (Diff Cross-Coupled)")

        print("\n[3] MATCHING NETWORKS & PASSIVES:")
        print(f"    Transformer Balun Lp/Ls: {out.balun_lp_nh} nH / {out.balun_ls_nh} nH (k={out.balun_k}, IL={out.balun_loss_db} dB)")
        print(f"    Tuning Caps Cp / Cs   : {out.balun_cp_pf} pF / {out.balun_cs_pf} pF")
        print(f"    Input Match L_imn/C_imn: {out.imn_l_nh} nH / {out.imn_c_pf} pF")

        print("\n[4] RF METRICS, LINEARITY (DPD) & THERMAL RELIABILITY:")
        print(f"    Rollett Stability K   : {out.k_factor} ({'[PASS] UNCONDITIONAL' if out.is_unconditionally_stable else '[WARN] CONDITIONAL'})")
        print(f"    Power Gain S21 / S12  : {out.gain_db} dB / {out.s12_isolation_db} dB")
        print(f"    DE / Peak PAE / 6dB-PBO: {out.drain_efficiency_pct}% / {out.pae_pct}% / {out.pbo_6db_pae_pct}%")
        print(f"    P1dB / Psat / OIP3    : {out.p1db_estimated_dbm} dBm / {out.psat_estimated_dbm} dBm / {lin_therm.oip3_dbm} dBm")
        print(f"    {args.modulation} EVM (Raw/DPD) : {lin_therm.evm_raw_pct}% -> {lin_therm.evm_dpd_pct}% (Spec Limit: {lin_therm.evm_spec_limit_pct}%)")
        print(f"    ACLR1 (Raw -> w/ DPD) : {lin_therm.aclr_raw_dbc} dBc -> {lin_therm.aclr_dpd_dbc} dBc")
        print(f"    Junction Temp Tj / MTTF: {lin_therm.junction_temp_c} C (Margin: {lin_therm.thermal_margin_c} C) | MTTF: {lin_therm.mttf_years} yrs")

    if args.module in ("lna", "all"):
        lna = AutomatedLNADesigner(args.node).synthesize(freq_ghz=args.freq)
        print("\n" + "=" * 68)
        print("           [LNA] LOW-NOISE AMPLIFIER SYNTHESIS SUMMARY              ")
        print("=" * 68)
        print(f"    Noise Figure NF / NFmin: {lna.nf_db} dB / {lna.nf_min_db} dB")
        print(f"    Power Gain S21 / S11   : {lna.gain_s21_db} dB / {lna.s11_db} dB")
        print(f"    Input IIP3 / Pdc       : {lna.iip3_dbm} dBm / {lna.p_dc_mw} mW")
        print(f"    Inductors Ls / Lg / Ld : {lna.source_inductor_ls_nh} nH / {lna.gate_inductor_lg_nh} nH / {lna.drain_inductor_ld_nh} nH")

    if args.module in ("vco", "all"):
        vco = AutomatedVCODesigner(args.node).synthesize(freq_ghz=args.freq)
        print("\n" + "=" * 68)
        print("           [VCO] LC VOLTAGE-CONTROLLED OSCILLATOR SUMMARY           ")
        print("=" * 68)
        print(f"    Phase Noise @1MHz / FOM: {vco.phase_noise_1mhz_dbc} dBc/Hz / {vco.fom_dbc_per_hz} dBc/Hz")
        print(f"    Tank Ltank / Cvar      : {vco.l_tank_nh} nH / {vco.c_tank_pf} pF (Startup Margin: {vco.startup_safety_factor}x)")

    if args.module in ("mixer", "all"):
        mixer = AutomatedMixerDesigner(args.node).synthesize(rf_freq_ghz=args.freq, lo_freq_ghz=max(0.5, args.freq - 0.5))
        print("\n" + "=" * 68)
        print("           [MIXER] DOUBLE-BALANCED GILBERT MIXER SUMMARY            ")
        print("=" * 68)
        print(f"    Conversion Gain / SSB NF: {mixer.conversion_gain_db} dB / {mixer.nf_ssb_db} dB")
        print(f"    IIP3 / LO-RF Isolation  : {mixer.iip3_dbm} dBm / {mixer.lo_rf_isolation_db} dB")

    if args.module in ("switch", "all"):
        sw = AutomatedSwitchDesigner(args.node).synthesize(freq_ghz=args.freq)
        print("\n" + "=" * 68)
        print("           [SWITCH] SERIES-SHUNT SPDT T/R SWITCH SUMMARY            ")
        print("=" * 68)
        print(f"    Insertion Loss / ISO   : {sw.insertion_loss_db} dB / {sw.isolation_db} dB")
        print(f"    FET Stack / Ron*Coff   : {sw.num_stacked_fets}-Stack (W={sw.w_series_um} um) / {sw.switch_fom_fs} fs")

    if args.module in ("antenna", "all"):
        ant = AutomatedAntennaDesigner("aip_organic").synthesize(freq_ghz=args.freq)
        print("\n" + "=" * 68)
        print("           [ANTENNA] INSET-FED MICROSTRIP PATCH AiP SUMMARY         ")
        print("=" * 68)
        print(f"    Patch W x L (Inset y0) : {ant.patch_width_um} um x {ant.patch_length_um} um (y0={ant.inset_feed_depth_um} um)")
        print(f"    Antenna Gain / BW      : {ant.gain_dbi} dBi (Eff: {ant.radiation_efficiency_pct}%) / {ant.bandwidth_mhz} MHz")

    if args.module in ("filter", "all"):
        flt = AutomatedFilterDesigner(z0_ohm=50.0, inductor_q=args.inductor_q or 20.0).synthesize(
            cutoff_freq_ghz=args.freq,
            filter_type=args.filter_type,
            order_n=args.filter_order,
        )
        print("\n" + "=" * 68)
        print(f"           [FILTER] {flt.order_n}-ORDER {flt.filter_type} FILTER & SIGNAL I/O SUMMARY     ")
        print("=" * 68)
        print(f"    Filter Type / Cutoff fc: {flt.filter_type} ({flt.approximation.title()}) / fc = {flt.cutoff_freq_ghz} GHz")
        print(f"    Passband IL / Stopband : {flt.passband_il_db} dB / -{flt.stopband_atten_2fc_db} dB (Roll-off: -{flt.rolloff_db_per_dec} dB/dec)")
        for sc in flt.signal_components:
            print(f"    Signal [{sc.label} @ {sc.freq_ghz} GHz]: Vin={sc.vin_amp_v:.2f}V -> Vout={sc.vout_amp_v:.3f}V ({sc.gain_db:+.1f} dB, Δφ={sc.phase_deg:+.1f} deg)")
        print(f"    Interference Ratio (In -> Out): {flt.thd_or_interference_in_pct}% -> {flt.thd_or_interference_out_pct}%")

    print("=" * 68 + "\n")

    # Exports
    if args.export_spice:
        spice_path = Path(args.export_spice)
        spice_path.write_text(out.spice_netlist, encoding="utf-8")
        print(f"[+] SPICE netlist exported to: {spice_path.resolve()}")

    if args.export_s2p:
        s2p_str = generate_touchstone_s2p(
            freq_center_ghz=args.freq,
            s11_mag=0.3,
            s21_gain_db=out.gain_db,
            s12_isolation_db=out.s12_isolation_db,
            s22_mag=0.35
        )
        s2p_path = Path(args.export_s2p)
        s2p_path.write_text(s2p_str, encoding="utf-8")
        print(f"[+] Touchstone S-parameter file exported to: {s2p_path.resolve()}")

    if args.export_json:
        data = {
            "freq_ghz": out.freq_ghz,
            "pout_target_dbm": out.pout_target_dbm,
            "vdd": out.vdd,
            "process_name": out.process_name,
            "op_class": out.op_class,
            "topology": out.topology,
            "w_total_um": out.w_total_um,
            "l_gate_um": out.l_gate_um,
            "num_fingers": out.num_fingers,
            "gain_db": out.gain_db,
            "pae_pct": out.pae_pct,
            "drain_efficiency_pct": out.drain_efficiency_pct,
            "k_factor": out.k_factor,
            "balun_lp_nh": out.balun_lp_nh,
            "balun_ls_nh": out.balun_ls_nh,
            "balun_cp_pf": out.balun_cp_pf,
            "balun_cs_pf": out.balun_cs_pf,
            "c_neu_ff": out.c_neu_ff,
            "oip3_dbm": lin_therm.oip3_dbm,
            "evm_raw_pct": lin_therm.evm_raw_pct,
            "evm_dpd_pct": lin_therm.evm_dpd_pct,
            "aclr_dpd_dbc": lin_therm.aclr_dpd_dbc,
            "junction_temp_c": lin_therm.junction_temp_c,
            "mttf_years": lin_therm.mttf_years,
        }
        json_path = Path(args.export_json)
        json_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(f"[+] JSON summary exported to: {json_path.resolve()}")

if __name__ == "__main__":
    main()
