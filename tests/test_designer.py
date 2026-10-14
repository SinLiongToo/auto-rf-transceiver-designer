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

if __name__ == "__main__":
    unittest.main()


