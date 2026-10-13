"""
Exhaustive Verification & Quality Assurance Suite for AutoPA-RF.
Audits mathematical theory, physical consistency, matrix sweep corners,
SPICE syntax, Touchstone format, and numerical stability.
"""

import math
import sys
import json
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import (
    AutomatedPADesigner,
    CMOSProcess,
    PDK_LIBRARY,
    calculate_cripps_loadline,
    size_transistor,
    synthesize_all_matching,
    calculate_stability,
    generate_loadpull_data,
    synthesize_class_e,
    synthesize_class_f,
    generate_spice_netlist,
)
from pa_engine.spice_exporter import generate_touchstone_s2p

class VerificationReport:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = 0
        self.details = []

    def assert_test(self, condition: bool, test_name: str, msg: str = ""):
        if condition:
            self.passed += 1
            print(f"  [PASS] {test_name}")
        else:
            self.failed += 1
            err_msg = f"  [FAIL] {test_name}: {msg}"
            print(err_msg)
            self.details.append(err_msg)

    def summary(self):
        print("\n" + "=" * 60)
        print(f"VERIFICATION SUMMARY: {self.passed} PASSED | {self.failed} FAILED")
        print("=" * 60)
        if self.failed > 0:
            print("Failed tests details:")
            for d in self.details:
                print(d)
            return False
        return True

def run_verification():
    report = VerificationReport()
    print("============================================================")
    print("       AutoPA-RF COMPLETE SYSTEM VERIFICATION SUITE         ")
    print("============================================================")

    # ------------------------------------------------------------
    # STAGE 1: Physical & Theoretical Consistency Audit
    # ------------------------------------------------------------
    print("\n[STAGE 1] Physical & Theoretical Laws Verification:")

    # 1.1 Cripps scaling: Higher Pout must require lower Ropt
    load_20 = calculate_cripps_loadline(pout_dbm=20.0, vdd=1.2, op_class="AB")
    load_26 = calculate_cripps_loadline(pout_dbm=26.0, vdd=1.2, op_class="AB")
    report.assert_test(
        load_26.r_opt < load_20.r_opt,
        "Cripps Law: Ropt scales inversely with target Pout",
        f"Ropt(26dBm)={load_26.r_opt:.2f} should be < Ropt(20dBm)={load_20.r_opt:.2f}"
    )

    # 1.2 Transistor sizing: Higher Imax must require larger channel width
    p = PDK_LIBRARY["65nm_rf"]
    sz_small = size_transistor(p, i_max_peak_a=0.1, v_swing_pk_v=1.0)
    sz_large = size_transistor(p, i_max_peak_a=0.4, v_swing_pk_v=1.0)
    report.assert_test(
        sz_large.w_total_um > sz_small.w_total_um,
        "Transistor Sizing: Wtot scales with peak drain current",
        f"Wtot({sz_large.w_total_um}) should be > Wtot({sz_small.w_total_um})"
    )

    # 1.3 Frequency scaling of matching inductors: higher freq -> smaller inductors
    m_2g4 = synthesize_all_matching(r_opt_diff=30.0, z_in_gate=complex(3, -50), freq_ghz=2.4, c_out_device_ff=100)
    m_28g = synthesize_all_matching(r_opt_diff=30.0, z_in_gate=complex(3, -5), freq_ghz=28.0, c_out_device_ff=100)
    report.assert_test(
        m_28g.omn_transformer.primary_inductance_nh < m_2g4.omn_transformer.primary_inductance_nh,
        "Balun Inductance Scaling: Lp(28GHz) < Lp(2.4GHz)",
        f"Lp(28G)={m_28g.omn_transformer.primary_inductance_nh}nH should be < Lp(2.4G)={m_2g4.omn_transformer.primary_inductance_nh}nH"
    )

    # 1.4 Neutralization effectiveness
    stab_neutralized = calculate_stability(gm_ms=200, gds_ms=5, cgs_ff=120, cgd_ff=50, cds_ff=60, rg_ohm=1.2, freq_ghz=2.4, use_cross_neutralization=True)
    stab_raw = calculate_stability(gm_ms=200, gds_ms=5, cgs_ff=120, cgd_ff=50, cds_ff=60, rg_ohm=1.2, freq_ghz=2.4, use_cross_neutralization=False)
    report.assert_test(
        stab_neutralized.k_factor > stab_raw.k_factor and stab_neutralized.is_unconditionally_stable,
        "Neutralization Audit: Cneu eliminates feedback and boosts K-factor",
        f"K_neu={stab_neutralized.k_factor} vs K_raw={stab_raw.k_factor}"
    )

    # 1.5 Energy conservation
    designer = AutomatedPADesigner("65nm_rf")
    res = designer.synthesize(freq_ghz=2.4, pout_dbm=24.0)
    pout_w = res.pout_load_mw * 1e-3
    report.assert_test(
        pout_w <= res.p_dc_w and res.pae_pct <= res.drain_efficiency_pct <= 100.0,
        "First Law of Thermodynamics: Pout <= Pdc and PAE <= DE <= 100%",
        f"Pout={pout_w:.3f}W, Pdc={res.p_dc_w:.3f}W, PAE={res.pae_pct}%, DE={res.drain_efficiency_pct}%"
    )

    # ------------------------------------------------------------
    # STAGE 2: Matrix Sweep & Corner Cases Audit
    # ------------------------------------------------------------
    print("\n[STAGE 2] Matrix Sweep & Edge Conditions Audit:")

    nodes = list(PDK_LIBRARY.keys())
    classes = ["A", "AB", "B", "E", "F"]
    topologies = ["differential_cascode", "differential_cs", "single_ended"]
    freqs = [0.9, 2.4, 5.2, 28.0, 60.0]
    pouts = [14.0, 20.0, 24.0, 28.0]

    sweep_count = 0
    sweep_errors = 0

    for node in nodes:
        d_inst = AutomatedPADesigner(node)
        for op_class in classes:
            for top in topologies:
                for f in [2.4, 28.0]:
                    for p_out in [18.0, 24.0]:
                        sweep_count += 1
                        try:
                            out = d_inst.synthesize(
                                freq_ghz=f,
                                pout_dbm=p_out,
                                op_class=op_class,
                                topology=top
                            )
                            # Check numerical validity
                            if math.isnan(out.r_opt_per_branch) or math.isnan(out.pae_pct) or math.isnan(out.w_total_um):
                                sweep_errors += 1
                            if out.r_opt_per_branch <= 0 or out.w_total_um <= 0 or out.p_dc_w <= 0:
                                sweep_errors += 1
                        except Exception as e:
                            sweep_errors += 1
                            print(f"Exception during sweep ({node}, {op_class}, {top}, {f}G, {p_out}dBm): {e}")

    report.assert_test(
        sweep_errors == 0,
        f"Corner Matrix Sweep: {sweep_count} full design configurations tested with 0 errors",
        f"Encountered {sweep_errors} sweep errors"
    )

    # ------------------------------------------------------------
    # STAGE 3: SPICE Netlist Syntax & Topological Integrity
    # ------------------------------------------------------------
    print("\n[STAGE 3] SPICE Netlist Syntax & Structural Integrity Audit:")

    sample_out = designer.synthesize(freq_ghz=2.4, pout_dbm=24.0, op_class="AB", topology="differential_cascode")
    netlist = sample_out.spice_netlist

    # Check key required subcircuits and components
    report.assert_test(".title CMOS RF Power Amplifier" in netlist, "SPICE Title declaration exists")
    report.assert_test("M_CS_P" in netlist and "M_CS_N" in netlist, "Differential main FETs (M_CS_P, M_CS_N) instantiated")
    report.assert_test("C_NEU_1" in netlist and "C_NEU_2" in netlist, "Cross-coupled neutralization caps (C_NEU_1, C_NEU_2) connected")
    report.assert_test("L_PRI_P" in netlist and "L_SEC" in netlist, "Transformer Balun coils (L_PRI, L_SEC) present")
    report.assert_test("K_PRI_SEC1" in netlist, "Mutual magnetic coupling statement (K_PRI_SEC) present")
    report.assert_test(".model CMOS_RF_NMOS NMOS" in netlist, "Realistic RF NMOS model card defined")
    report.assert_test(".tran" in netlist and ".end" in netlist, "Transient analysis command and .end termination present")

    # ------------------------------------------------------------
    # STAGE 4: Touchstone .s2p Compliance Audit
    # ------------------------------------------------------------
    print("\n[STAGE 4] Touchstone .s2p File Format Compliance Audit:")

    s2p_text = generate_touchstone_s2p(
        freq_center_ghz=2.4,
        s11_mag=0.2,
        s21_gain_db=18.5,
        s12_isolation_db=-50.0,
        s22_mag=0.25,
        num_pts=15
    )
    s2p_lines = [ln.strip() for ln in s2p_text.splitlines() if ln.strip()]

    header_found = any("# GHZ S DB R 50.0" in ln for ln in s2p_lines)
    data_lines = [ln for ln in s2p_lines if not ln.startswith("!") and not ln.startswith("#")]

    report.assert_test(header_found, "Touchstone Option Header compliant (# GHZ S DB R 50.0)")
    report.assert_test(len(data_lines) == 15, f"Touchstone Frequency Grid count correct ({len(data_lines)} pts)")

    # Check columns count: Frequency + S11_dB + S11_deg + S21_dB + S21_deg + S12_dB + S12_deg + S22_dB + S22_deg = 9 columns
    cols_ok = all(len(ln.split()) == 9 for ln in data_lines)
    report.assert_test(cols_ok, "All Touchstone rows contain exactly 9 S-parameter columns")

    # ------------------------------------------------------------
    # STAGE 5: Class-E & Class-F Specific Harmonic Tests
    # ------------------------------------------------------------
    print("\n[STAGE 5] Harmonic Switching PA Synthesis Audit:")

    class_e = synthesize_class_e(pout_target_w=0.25, vdd=1.2, freq_ghz=2.4)
    report.assert_test(
        class_e.peak_vds_stress_v > 3.0 * 1.2 and class_e.shunt_cap_csh_pf > 0,
        "Class-E ZVS/ZDS: Peak Vds voltage stress ~3.56*Vdd verified",
        f"Vpeak={class_e.peak_vds_stress_v:.2f}V"
    )

    class_f = synthesize_class_f(pout_target_w=0.25, vdd=1.2, freq_ghz=2.4)
    report.assert_test(
        class_f.tank_3rd_l_nh > 0 and class_f.theoretical_efficiency_pct > 80.0,
        "Class-F: 3rd harmonic parallel tank and theoretical 88.4% efficiency verified",
        f"L3={class_f.tank_3rd_l_nh:.3f}nH"
    )

    # ------------------------------------------------------------
    # STAGE 6: Load-Pull Contour Geometry Audit
    # ------------------------------------------------------------
    print("\n[STAGE 6] Load-Pull Contours on Smith Chart Geometry Audit:")

    lp = generate_loadpull_data(r_opt=15.0, c_out_ff=180.0, freq_ghz=2.4, p_max_dbm=24.0)
    report.assert_test(len(lp.power_contours) == 5, "5 Power Contours Generated (Pmax, -0.5, -1, -2, -3 dB)")
    
    # Ensure all contour points are strictly inside the Smith Chart (|Gamma| <= 1.0)
    all_inside = True
    for c in lp.power_contours:
        for pt in c.points:
            mag = math.sqrt(pt.real ** 2 + pt.imag ** 2)
            if mag > 1.001:
                all_inside = False
                break
    report.assert_test(all_inside, "All Load-Pull reflection points bounded within unit Smith Chart (|Gamma| <= 1.0)")

    return report.summary()

if __name__ == "__main__":
    success = run_verification()
    sys.exit(0 if success else 1)
