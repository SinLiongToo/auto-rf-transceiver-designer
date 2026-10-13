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

from pa_engine import AutomatedPADesigner, PDK_LIBRARY
from pa_engine.spice_exporter import generate_touchstone_s2p

def print_banner():
    banner = r"""
  ___         _        ___   _           ___  ___ 
 / _ \  _  _ | |_  ___| _ \ /_\   ___   | _ \| __|
| (_) || || ||  _|/ _ \  _// _ \ |___|  |   /| _| 
 \___/  \_,_| \__|\___/_| /_/ \_\       |_|_\|_|  
 Automated CMOS RF Power Amplifier Synthesis Suite
"""
    print(banner)

def main():
    parser = argparse.ArgumentParser(
        description="AutoPA-RF: Automated CMOS RF Power Amplifier Design & Sizing Tool"
    )
    parser.add_argument(
        "--freq", type=float, default=2.4,
        help="Carrier frequency in GHz (e.g., 2.4, 5.2, 28.0). Default: 2.4"
    )
    parser.add_argument(
        "--pout", type=float, default=24.0,
        help="Target output power in dBm (e.g., 20.0, 24.0, 28.0). Default: 24.0"
    )
    parser.add_argument(
        "--node", type=str, default="65nm_rf",
        choices=list(PDK_LIBRARY.keys()),
        help=f"CMOS PDK node. Options: {', '.join(PDK_LIBRARY.keys())}. Default: 65nm_rf"
    )
    parser.add_argument(
        "--vdd", type=float, default=None,
        help="Supply voltage in Volts (defaults to PDK nominal)"
    )
    parser.add_argument(
        "--op-class", type=str, default="AB",
        choices=["A", "AB", "B", "E", "F"],
        help="Amplifier operation class (A, AB, B, E, F). Default: AB"
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

    print(f"[*] Initializing synthesizer for PDK Node: {args.node}...")
    designer = AutomatedPADesigner(args.node)

    print(f"[*] Running synthesis with specifications:")
    print(f"    - Frequency       : {args.freq} GHz")
    print(f"    - Output Power    : {args.pout} dBm ({round(10.0 ** (args.pout / 10.0), 1)} mW)")
    print(f"    - Operation Class : Class-{args.op_class}")
    print(f"    - Topology        : {args.topology}")
    
    out = designer.synthesize(
        freq_ghz=args.freq,
        pout_dbm=args.pout,
        vdd=args.vdd,
        op_class=args.op_class,
        topology=args.topology,
        inductor_q=args.inductor_q
    )

    print("\n" + "=" * 64)
    print("                SYNTHESIS RESULTS & SIZING SUMMARY               ")
    print("=" * 64)
    
    print("\n[1] LOADLINE & DC PERFORMANCE:")
    print(f"    Supply Voltage Vdd    : {out.vdd} V")
    print(f"    Total DC Current Idc  : {round(out.i_dc_tot_a * 1000, 1)} mA")
    print(f"    Total DC Power Pdc    : {round(out.p_dc_w * 1000, 1)} mW")
    print(f"    Optimum Load Ropt     : {out.r_opt_per_branch} Ohm (Single branch) | {out.r_opt_diff} Ohm (Diff)")
    print(f"    Peak RF Current Imax  : {round(out.i_max_peak_a * 1000, 1)} mA")

    print("\n[2] TRANSISTOR SIZING (PER BRANCH CORE):")
    print(f"    Total Gate Width Wtot : {out.w_total_um} um ({out.num_fingers} fingers x {out.w_finger_um} um)")
    print(f"    Gate Length L         : {out.l_gate_um} um")
    print(f"    Standard Cells M      : {out.num_cells_m} cells")
    print(f"    Transconductance gm   : {out.gm_ms} mS")
    print(f"    Parasitics (Cgs/Cgd/Cds): {out.cgs_ff} fF / {out.cgd_ff} fF / {out.cds_ff} fF")
    print(f"    Gate Poly Resistance  : {out.rg_ohm} Ohm")
    print(f"    Transit Freq fT / fmax: {out.ft_ghz} GHz / {out.fmax_ghz} GHz")
    print(f"    Neutralization Cneu   : {out.c_neu_ff} fF (Diff Cross-Coupled)")

    print("\n[3] MATCHING NETWORKS & PASSIVES:")
    print(f"    Transformer Balun Lp  : {out.balun_lp_nh} nH (Primary)")
    print(f"    Transformer Balun Ls  : {out.balun_ls_nh} nH (Secondary)")
    print(f"    Balun Coupling factor : {out.balun_k} (Loss: {out.balun_loss_db} dB)")
    print(f"    Primary Tuning Cap Cp : {out.balun_cp_pf} pF")
    print(f"    Secondary Tuning Cs   : {out.balun_cs_pf} pF")
    print(f"    Input Match L_imn/C_imn: {out.imn_l_nh} nH / {out.imn_c_pf} pF")

    print("\n[4] RF METRICS & STABILITY:")
    print(f"    Rollett Stability K   : {out.k_factor} (Delta: {out.delta_mag}, Mu: {out.mu_factor})")
    print(f"    Stability Status      : {'[PASS] UNCONDITIONALLY STABLE' if out.is_unconditionally_stable else '[WARN] CONDITIONAL'}")
    print(f"    Reverse Isolation S12 : {out.s12_isolation_db} dB")
    print(f"    Power Gain S21        : {out.gain_db} dB")
    print(f"    Drain Efficiency (DE) : {out.drain_efficiency_pct} %")
    print(f"    Power Added Eff (PAE) : {out.pae_pct} %")
    print(f"    6-dB Back-off PAE     : {out.pbo_6db_pae_pct} % (for high PAPR OFDM)")
    print(f"    P1dB / Psat           : {out.p1db_estimated_dbm} dBm / {out.psat_estimated_dbm} dBm")
    print("=" * 64 + "\n")

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
        # Convert output to serializable dict
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
        }
        json_path = Path(args.export_json)
        json_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(f"[+] JSON summary exported to: {json_path.resolve()}")

if __name__ == "__main__":
    main()
