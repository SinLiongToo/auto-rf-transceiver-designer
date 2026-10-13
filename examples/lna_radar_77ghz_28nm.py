"""
Example 5: 72 GHz - 79 GHz Automotive FMCW Radar Low-Noise Amplifier (LNA).
Technology: TSMC 28nm HPC+ RF CMOS (Vdd = 0.9V, fT = 240 GHz, fmax = 300 GHz)
Topology: Inductively Degenerated Cascode LNA (SNIM)
"""

import sys
from pathlib import Path

# Ensure UTF-8 output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedLNADesigner

def main():
    print("=" * 70)
    print(" AutoPA-RF Example 5: 72 GHz - 79 GHz Automotive Radar LNA (TSMC 28nm) ")
    print("=" * 70)

    freq_center = 76.5 # Center of 72-79 GHz automotive band
    designer = AutomatedLNADesigner("28nm_hpc")
    out = designer.synthesize(
        freq_ghz=freq_center,
        target_gain_db=15.0,
        target_nf_db=2.5,
        i_dc_ma=5.5
    )

    print(f"\n[1] 77 GHz RADAR LNA SPECIFICATIONS:")
    print(f"    Frequency Band         : 72.0 GHz - 79.0 GHz (Center: {out.freq_ghz} GHz)")
    print(f"    Noise Figure (NF)      : {out.nf_db} dB (NFmin: {out.nf_min_db} dB)")
    print(f"    Power Gain (S21)       : {out.gain_s21_db} dB")
    print(f"    Input Return Loss (S11): {out.s11_db} dB")
    print(f"    Reverse Isolation (S12): {out.s12_isolation_db} dB")
    print(f"    Rollett Stability K    : {out.k_factor} (Unconditionally Stable: {out.is_unconditionally_stable})")

    print(f"\n[2] LINEARITY & DC POWER:")
    print(f"    Input IP3 (IIP3)       : {out.iip3_dbm} dBm")
    print(f"    Input P1dB (IP1dB)     : {out.p1db_in_dbm} dBm")
    print(f"    DC Supply / Current    : {out.vdd} V / {out.i_dc_ma} mA")
    print(f"    DC Power Consumption   : {out.p_dc_mw} mW")

    print(f"\n[3] TRANSISTOR SIZING (M1 Core & M2 Cascode):")
    print(f"    Channel Width W        : {out.w_main_um} μm ({out.num_fingers} fingers x 2.0 μm)")
    print(f"    Gate Length L          : {out.l_gate_um} μm")
    print(f"    Transconductance gm    : {out.gm_ms} mS")
    print(f"    Parasitics (Cgs/Cgd)   : {out.cgs_ff} fF / {out.cgd_ff} fF")
    print(f"    Gate Poly Resistance Rg: {out.rg_ohm} Ω")

    print(f"\n[4] PASSIVE NOISE MATCHING COMPONENTS (77 GHz):")
    print(f"    Source Degeneration Ls : {out.source_inductor_ls_nh * 1000:.1f} pH ({out.source_inductor_ls_nh} nH)")
    print(f"    Gate Resonant Inductor Lg: {out.gate_inductor_lg_nh * 1000:.1f} pH ({out.gate_inductor_lg_nh} nH)")
    print(f"    Drain Tank Inductor Ld : {out.drain_inductor_ld_nh * 1000:.1f} pH ({out.drain_inductor_ld_nh} nH)")
    print(f"    Drain Tuning Cap Cd    : {out.drain_cap_cd_pf * 1000:.1f} fF ({out.drain_cap_cd_pf} pF)")
    print(f"    Output Coupling Cap Cout: {out.out_cap_cout_pf * 1000:.1f} fF ({out.out_cap_cout_pf} pF)")
    print("=" * 70)

    # Export SPICE netlist
    export_sp = Path(__file__).parent / "radar_lna_77ghz_28nm.sp"
    export_sp.write_text(out.spice_netlist, encoding="utf-8")
    print(f"\n[+] Exported LNA SPICE Deck: {export_sp.resolve()}")

if __name__ == "__main__":
    main()
