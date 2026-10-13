"""
Example 4: 72 GHz - 79 GHz (77 GHz Center) Automotive FMCW Radar Power Amplifier.
Technology: TSMC 28nm HPC+ RF CMOS (Vdd = 0.9V, fT = 240 GHz, fmax = 300 GHz)
Band: 72.0 GHz to 79.0 GHz (7 GHz Bandwidth for High Range Resolution Automotive Radar)
Architecture: Differential Cascode with Cross-Coupled Neutralization + On-Chip mmWave Balun
"""

import sys
from pathlib import Path

# Ensure UTF-8 output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedPADesigner
from pa_engine.spice_exporter import generate_touchstone_s2p

def main():
    print("=" * 70)
    print(" AutoPA-RF Example 4: 72 GHz - 79 GHz Automotive Radar PA (TSMC 28nm) ")
    print("=" * 70)

    freq_center = 76.5 # Center of 72 - 79 GHz band
    pout_target = 14.5 # 14.5 dBm (~28 mW) typical FMCW TX output power

    designer = AutomatedPADesigner("28nm_hpc")
    out = designer.synthesize(
        freq_ghz=freq_center,
        pout_dbm=pout_target,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=18.0,
        use_neutralization=True
    )

    print(f"\n[1] 77 GHz RADAR SPECIFICATIONS & LOADLINE:")
    print(f"    Frequency Band         : 72.0 GHz - 79.0 GHz (Center: {out.freq_ghz} GHz)")
    print(f"    Fractional Bandwidth   : ~9.2% (7 GHz BW)")
    print(f"    Output Power Pout      : {out.pout_load_dbm} dBm ({out.pout_load_mw} mW)")
    print(f"    Supply Voltage Vdd     : {out.vdd} V")
    print(f"    Total DC Power Pdc     : {round(out.p_dc_w * 1000, 1)} mW")
    print(f"    Optimum Load Ropt      : {out.r_opt_per_branch} Ω (Single) | {out.r_opt_diff} Ω (Diff)")

    print(f"\n[2] TRANSISTOR SIZING (PER BRANCH CORE):")
    print(f"    Total Gate Width Wtot  : {out.w_total_um} μm ({out.num_fingers} fingers x {out.w_finger_um} μm)")
    print(f"    Gate Length L          : {out.l_gate_um} μm (28nm)")
    print(f"    Transconductance gm    : {out.gm_ms} mS")
    print(f"    Parasitics (Cgs/Cgd/Cds): {out.cgs_ff} fF / {out.cgd_ff} fF / {out.cds_ff} fF")
    print(f"    Gate Resistance Rg     : {out.rg_ohm} Ω")
    print(f"    Cross-Neutralization   : Cneu = {out.c_neu_ff} fF (Diff Cross-Coupled)")

    print(f"\n[3] MILLIMETER-WAVE PASSIVES & BALUN (77 GHz):")
    print(f"    Balun Primary Lp       : {out.balun_lp_nh * 1000:.1f} pH ({out.balun_lp_nh} nH)")
    print(f"    Balun Secondary Ls     : {out.balun_ls_nh * 1000:.1f} pH ({out.balun_ls_nh} nH)")
    print(f"    Balun Coupling factor k: {out.balun_k} (Loss: {out.balun_loss_db} dB)")
    print(f"    Primary Tuning Cap Cp  : {out.balun_cp_pf * 1000:.1f} fF ({out.balun_cp_pf} pF)")
    print(f"    Secondary Tuning Cap Cs: {out.balun_cs_pf * 1000:.1f} fF ({out.balun_cs_pf} pF)")
    print(f"    Input Match L_imn/C_imn: {out.imn_l_nh * 1000:.1f} pH / {out.imn_c_pf * 1000:.1f} fF")

    print(f"\n[4] RF FIGURES OF MERIT & STABILITY:")
    print(f"    Rollett Stability K    : {out.k_factor} (Unconditionally Stable: {out.is_unconditionally_stable})")
    print(f"    Reverse Isolation S12  : {out.s12_isolation_db} dB")
    print(f"    Power Gain S21         : {out.gain_db} dB")
    print(f"    Drain Efficiency (DE)  : {out.drain_efficiency_pct} %")
    print(f"    Power Added Eff (PAE)  : {out.pae_pct} %")
    print(f"    P1dB / Psat            : {out.p1db_estimated_dbm} dBm / {out.psat_estimated_dbm} dBm")
    print("=" * 70)

    # Export SPICE netlist and Touchstone .s2p
    export_sp = Path(__file__).parent / "radar_77ghz_28nm_netlist.sp"
    export_sp.write_text(out.spice_netlist, encoding="utf-8")
    print(f"\n[+] Exported SPICE Netlist: {export_sp.resolve()}")

    s2p_content = generate_touchstone_s2p(
        freq_center_ghz=freq_center,
        s11_mag=0.25,
        s21_gain_db=out.gain_db,
        s12_isolation_db=out.s12_isolation_db,
        s22_mag=0.28,
        num_pts=29, # sweep from 72 GHz to 79 GHz with fine resolution
        span_factor=0.065 # covers ~ 71.5 to 81.5 GHz
    )
    export_s2p = Path(__file__).parent / "radar_77ghz_28nm.s2p"
    export_s2p.write_text(s2p_content, encoding="utf-8")
    print(f"[+] Exported Touchstone .s2p: {export_s2p.resolve()}")

if __name__ == "__main__":
    main()
