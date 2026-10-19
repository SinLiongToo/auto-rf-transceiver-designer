"""
Unit tests for AutoPA-RF CMOS Power Amplifier Automated Design Suite.
"""

import unittest
from pa_engine import (
    AutomatedPADesigner,
    CMOSProcess,
    PDK_LIBRARY,
    calculate_cripps_loadline,
    synthesize_class_e,
    synthesize_class_f,
    generate_loadpull_data,
)

class TestPADesigner(unittest.TestCase):
    
    def test_pdk_library(self):
        self.assertIn("65nm_rf", PDK_LIBRARY)
        self.assertIn("28nm_hpc", PDK_LIBRARY)
        p = PDK_LIBRARY["65nm_rf"]
        self.assertEqual(p.node_nm, 65)
        self.assertGreater(p.ft_peak_ghz, 100)

    def test_cripps_loadline_class_ab(self):
        res = calculate_cripps_loadline(
            pout_dbm=24.0,
            vdd=1.2,
            v_knee=0.2,
            op_class="AB",
            topology="differential"
        )
        self.assertGreater(res.r_opt, 0.0)
        self.assertGreater(res.i_max_pk, 0.1)
        self.assertGreater(res.p_dc, 0.1)
        self.assertGreater(res.theoretical_drain_eff, 50.0)

    def test_synthesis_wifi_2p4g(self):
        designer = AutomatedPADesigner("65nm_rf")
        out = designer.synthesize(
            freq_ghz=2.4,
            pout_dbm=24.0,
            op_class="AB",
            topology="differential_cascode"
        )
        self.assertEqual(out.freq_ghz, 2.4)
        self.assertEqual(out.pout_target_dbm, 24.0)
        self.assertGreater(out.w_total_um, 20.0)
        self.assertGreater(out.gain_db, 10.0)
        self.assertGreater(out.pae_pct, 40.0)
        self.assertTrue(out.is_unconditionally_stable)
        self.assertGreater(out.balun_lp_nh, 0.1)
        self.assertIn(".title CMOS RF Power Amplifier", out.spice_netlist)

    def test_synthesis_mmwave_28g(self):
        designer = AutomatedPADesigner("28nm_hpc")
        out = designer.synthesize(
            freq_ghz=28.0,
            pout_dbm=18.0,
            op_class="AB",
            topology="differential_cascode"
        )
        self.assertEqual(out.freq_ghz, 28.0)
        self.assertGreater(out.balun_lp_nh, 0.01)
        self.assertLess(out.balun_lp_nh, 2.0) # mmWave transformer inductance is in pico-henry / low nano-henry
        self.assertGreater(out.pae_pct, 25.0)

    def test_class_e_synthesis(self):
        res_e = synthesize_class_e(
            pout_target_w=0.25,
            vdd=1.2,
            freq_ghz=2.4
        )
        self.assertGreater(res_e.r_load_optimal, 1.0)
        self.assertGreater(res_e.shunt_cap_csh_pf, 0.01)
        self.assertGreater(res_e.series_inductance_l0_nh, 0.1)

    def test_class_f_synthesis(self):
        res_f = synthesize_class_f(
            pout_target_w=0.25,
            vdd=1.2,
            freq_ghz=2.4
        )
        self.assertGreater(res_f.r_load_fund_optimal, 1.0)
        self.assertGreater(res_f.tank_3rd_l_nh, 0.01)

    def test_loadpull_generation(self):
        summary = generate_loadpull_data(
            r_opt=15.0,
            c_out_ff=200.0,
            freq_ghz=2.4,
            p_max_dbm=24.0
        )
        self.assertGreater(len(summary.power_contours), 2)
        self.assertLessEqual(summary.gamma_opt_mag, 1.0)

    def test_lna_synthesis(self):
        from pa_engine import AutomatedLNADesigner
        lna = AutomatedLNADesigner("65nm_rf")
        res = lna.synthesize(freq_ghz=2.4, target_gain_db=18.0, target_nf_db=2.0)
        self.assertLess(res.nf_db, 2.5)
        self.assertGreater(res.gain_s21_db, 14.0)
        self.assertGreater(res.source_inductor_ls_nh, 0.01)
        self.assertGreater(res.gate_inductor_lg_nh, 0.1)
    def test_vco_synthesis(self):
        from pa_engine import AutomatedVCODesigner
        vco = AutomatedVCODesigner("28nm_hpc")
        res = vco.synthesize(freq_ghz=77.0, target_pn_1mhz_dbc=-100.0, tuning_range_pct=15.0)
        self.assertLess(res.phase_noise_1mhz_dbc, -90.0)
        self.assertGreater(res.fom_dbc_per_hz, 175.0)
        self.assertGreater(res.l_tank_nh, 0.005)
        self.assertGreater(res.c_tank_pf, 0.01)
        self.assertGreaterEqual(res.startup_safety_factor, 2.5)
        self.assertIn("M_N1", res.spice_netlist)

    def test_mixer_synthesis(self):
        from pa_engine import AutomatedMixerDesigner
        mixer = AutomatedMixerDesigner("28nm_hpc")
        res = mixer.synthesize(rf_freq_ghz=77.0, lo_freq_ghz=76.5, target_gain_db=12.0)
        self.assertGreater(res.conversion_gain_db, 5.0)
        self.assertGreater(res.iip3_dbm, 0.0)
        self.assertIn("M_LO_1", res.spice_netlist)

    def test_switch_synthesis(self):
        from pa_engine import AutomatedSwitchDesigner
        sw = AutomatedSwitchDesigner("28nm_hpc")
        res = sw.synthesize(freq_ghz=77.0, target_p1db_dbm=20.0)
        self.assertLess(res.insertion_loss_db, 2.5)
        self.assertGreater(res.isolation_db, 18.0)
        self.assertGreater(res.w_series_um, 10.0)
        self.assertIn("M_SER_TX1", res.spice_netlist)

    def test_antenna_synthesis(self):
        from pa_engine import AutomatedAntennaDesigner
        ant = AutomatedAntennaDesigner("aip_organic")
        res = ant.synthesize(freq_ghz=77.0)
        self.assertGreater(res.gain_dbi, 4.0)
        self.assertGreater(res.patch_width_um, 500.0)
        self.assertGreater(res.patch_length_um, 500.0)
        self.assertGreater(res.bandwidth_mhz, 500.0)

    def test_new_pdks_and_class_c(self):
        self.assertIn("22nm_fdsoi", PDK_LIBRARY)
        self.assertIn("130nm_sige", PDK_LIBRARY)
        self.assertEqual(PDK_LIBRARY["22nm_fdsoi"].ft_peak_ghz, 350.0)
        self.assertEqual(PDK_LIBRARY["130nm_sige"].fmax_peak_ghz, 450.0)

        res_c = calculate_cripps_loadline(
            pout_dbm=20.0,
            vdd=0.8,
            v_knee=0.11,
            op_class="C",
            topology="differential"
        )
        self.assertEqual(res_c.conduction_angle_deg, 120.0)
        self.assertGreater(res_c.theoretical_drain_eff, 65.0)

        designer = AutomatedPADesigner("22nm_fdsoi")
        out_c = designer.synthesize(freq_ghz=29.5, pout_dbm=19.5, op_class="C")
        self.assertGreater(out_c.pae_pct, 35.0)

    def test_linearity_and_thermal_soa(self):
        from pa_engine import analyze_linearity_and_thermal
        lin_raw = analyze_linearity_and_thermal(
            pout_dbm=18.0,
            gain_db=14.5,
            p_dc_w=0.145,
            op_class="AB",
            is_differential=True,
            modulation="64-QAM",
            dpd_enabled=False,
            package_type="qfn_exposed",
            ambient_temp_c=25.0,
        )
        lin_dpd = analyze_linearity_and_thermal(
            pout_dbm=18.0,
            gain_db=14.5,
            p_dc_w=0.145,
            op_class="AB",
            is_differential=True,
            modulation="64-QAM",
            dpd_enabled=True,
            package_type="qfn_exposed",
            ambient_temp_c=25.0,
        )
        self.assertGreater(lin_raw.oip3_dbm, 20.0)
        self.assertLess(lin_dpd.evm_dpd_pct, lin_raw.evm_raw_pct)
        self.assertLess(lin_dpd.aclr_dpd_dbc, lin_raw.aclr_raw_dbc)
        self.assertGreater(lin_raw.junction_temp_c, 25.0)
        self.assertGreater(lin_raw.mttf_years, 1.0)

    def test_filter_and_signal_io_simulator(self):
        from pa_engine import AutomatedFilterDesigner
        flt_designer = AutomatedFilterDesigner()

        # 1. Low-Pass (LP) Filter: LF passes, HF is strongly attenuated
        lp_out = flt_designer.synthesize(
            cutoff_freq_ghz=2.4,
            filter_type="LP",
            approximation="butterworth",
            order_n=3,
            vin_lf_v=0.80,
            vin_hf_v=0.60,
        )
        self.assertEqual(lp_out.filter_type, "LP")
        self.assertEqual(len(lp_out.elements), 3)
        lf_comp_lp = next(c for c in lp_out.signal_components if "LF" in c.label)
        hf_comp_lp = next(c for c in lp_out.signal_components if "HF" in c.label)
        self.assertGreater(lf_comp_lp.vout_amp_v, 0.70)
        self.assertLess(hf_comp_lp.vout_amp_v, 0.10)
        self.assertLess(hf_comp_lp.gain_db, -25.0)

        # 2. High-Pass (HP) Filter: LF is blocked, HF passes
        hp_out = flt_designer.synthesize(
            cutoff_freq_ghz=2.4,
            filter_type="HP",
            approximation="chebyshev_05",
            order_n=3,
            vin_lf_v=0.80,
            vin_hf_v=0.60,
        )
        lf_comp_hp = next(c for c in hp_out.signal_components if "LF" in c.label)
        hf_comp_hp = next(c for c in hp_out.signal_components if "HF" in c.label)
        self.assertLess(lf_comp_hp.vout_amp_v, 0.10)
        self.assertGreater(hf_comp_hp.vout_amp_v, 0.50)

        # 3. Band-Pass (BPF) & Band-Stop (BSF)
        bpf_out = flt_designer.synthesize(cutoff_freq_ghz=28.0, filter_type="BPF", order_n=3)
        bsf_out = flt_designer.synthesize(cutoff_freq_ghz=28.0, filter_type="BSF", order_n=3)
        f0_bpf = next(c for c in bpf_out.signal_components if "f0" in c.label)
        f0_bsf = next(c for c in bsf_out.signal_components if "f0" in c.label)
        self.assertGreater(f0_bpf.gain_db, -2.0)
        self.assertLess(f0_bsf.gain_db, -25.0)

if __name__ == "__main__":
    unittest.main()
