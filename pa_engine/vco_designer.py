"""
Automated CMOS LC-VCO (Voltage-Controlled Oscillator) Synthesis Engine.
Topologies:
  - Complementary Cross-Coupled LC-VCO (NMOS + PMOS negative resistance -gm)
  - NMOS-only Cross-Coupled LC-VCO
Physics & Theory:
  - Leeson-Cutler Phase Noise Equation: L(Δf) = 10*log10( (2*F*k*T / Psig) * (1 + (f0 / (2*Q*Δf))^2) * (1 + f_1_over_f / Δf) )
  - Barkhausen Oscillation Criterion: |g_m,core * R_p| >= α_startup (typical startup safety factor α >= 2.5 ~ 3.0)
  - Equivalent Tank Parallel Resistance: R_p = Q_tank * ω0 * L_tank
  - Tuning Range & Varactor Sizing: C_tank = 1 / (ω0^2 * L), C_var = C_tank - C_par
  - FOM (Figure of Merit): FOM = -L(Δf) + 20*log10(f0 / Δf) - 10*log10(Pdc / 1mW)
"""

import math
from dataclasses import dataclass
from typing import Optional, Dict, Any
from .process_pdk import CMOSProcess, PDK_LIBRARY, get_process

@dataclass
class VCODesignOutput:
    freq_ghz: float
    tuning_range_pct: float
    f_min_ghz: float
    f_max_ghz: float
    vdd: float
    i_dc_ma: float
    p_dc_mw: float
    p_rf_out_dbm: float
    
    # Tank Resonator
    l_tank_nh: float
    c_tank_pf: float
    q_tank: float
    r_tank_parallel_ohm: float
    c_varactor_pf: float
    c_fixed_pf: float
    kvco_ghz_per_v: float
    
    # Negative-Gm Core Sizing
    gm_required_ms: float
    startup_safety_factor: float
    w_nmos_um: float
    w_pmos_um: float
    num_fingers_n: int
    num_fingers_p: int
    
    # Phase Noise & Metrics
    phase_noise_1mhz_dbc: float
    phase_noise_10mhz_dbc: float
    fom_dbc_per_hz: float
    fom_t_dbc_per_hz: float
    
    # SPICE Netlist
    spice_netlist: str

class AutomatedVCODesigner:
    """Automated synthesizer for CMOS LC Voltage-Controlled Oscillators."""

    def __init__(self, process_node: str = "28nm_hpc"):
        self.process: CMOSProcess = get_process(process_node)

    def synthesize(
        self,
        freq_ghz: float,
        target_pn_1mhz_dbc: float = -105.0,
        tuning_range_pct: float = 15.0,
        i_dc_ma: float = 8.0,
        inductor_q: Optional[float] = None
    ) -> VCODesignOutput:
        """
        Synthesize cross-coupled CMOS LC-VCO for given carrier frequency and specs.
        """
        omega0 = 2.0 * math.pi * freq_ghz * 1e9
        q_tank = inductor_q if inductor_q is not None else self.process.default_inductor_q
        
        # 1. Optimal Tank Inductance Sizing
        # For mmWave / RF, optimal L is chosen to maximize Rp = Q * omega * L while keeping C_tank > C_parasitics
        # Characteristic impedance Z0 = omega * L approx 25 ~ 50 Ohm at f0
        z0 = max(15.0, min(60.0, 150.0 / math.sqrt(freq_ghz)))
        l_tank_h = z0 / omega0
        l_tank_nh = l_tank_h * 1e9
        
        # Total resonant capacitance required: omega0 = 1 / sqrt(L * C)
        c_tank_f = 1.0 / (omega0**2 * l_tank_h)
        c_tank_pf = c_tank_f * 1e12
        
        # Parallel tank loss resistance Rp = Q * omega0 * L
        r_p_ohm = q_tank * omega0 * l_tank_h
        
        # 2. Barkhausen Startup Criterion & Negative-Gm Core
        # To guarantee reliable oscillation startup: gm_core >= alpha_startup / (Rp / 2) (differential tank)
        alpha_startup = 3.0  # Safe oscillation startup margin
        gm_req_core = (2.0 * alpha_startup) / r_p_ohm  # Total gm required
        gm_req_ms = gm_req_core * 1e3
        
        # Transistor width sizing
        # Using current density and core transconductance:
        # At RF/mmWave, gm/Id ≈ 8 ~ 12 mS/mA in moderate/strong inversion
        # w_n = Idc / (j_max * factor), ensuring gm_req is met
        v_ov = max(0.12, self.process.vdd_nom * 0.22)
        # Complementary topology: gm_core = gm_n + gm_p
        gm_n = gm_req_core * 0.6
        gm_p = gm_req_core * 0.4
        
        # Required W to deliver gm: gm = (kp * 1e-6) * (W/L) * Vov
        w_n_calc_um = (gm_n * self.process.l_min_um) / ((self.process.kp * 1e-6) * v_ov)
        w_n_um = max(6.0, min(80.0, w_n_calc_um))
        w_p_um = max(10.0, min(160.0, w_n_um * 2.0))  # PMOS hole mobility ratio
        
        w_finger = 1.0 if freq_ghz > 30.0 else 2.0
        n_fingers_n = max(4, int(math.ceil(w_n_um / w_finger)))
        if n_fingers_n % 2 != 0: n_fingers_n += 1
        w_n_um = n_fingers_n * w_finger
        
        n_fingers_p = max(4, int(math.ceil(w_p_um / w_finger)))
        if n_fingers_p % 2 != 0: n_fingers_p += 1
        w_p_um = n_fingers_p * w_finger
        
        # Parasitic gate & drain capacitances of core
        c_core_par_f = (w_n_um + w_p_um) * 1e-6 * (self.process.c_ov * 1e-9 + self.process.cj0 * 1e-9 * 0.5)
        c_core_par_pf = c_core_par_f * 1e12
        
        # 3. Varactor & Frequency Tuning Range Sizing
        # Tuning range = (f_max - f_min) / f0
        delta_f_ratio = tuning_range_pct / 100.0
        f_min_ghz = freq_ghz * (1.0 - delta_f_ratio / 2.0)
        f_max_ghz = freq_ghz * (1.0 + delta_f_ratio / 2.0)
        
        # C_ratio = (f_max / f_min)^2
        c_ratio = (f_max_ghz / f_min_ghz)**2
        c_var_pf = max(0.01, c_tank_pf * (c_ratio - 1.0) / c_ratio)
        c_fixed_pf = max(0.01, c_tank_pf - c_var_pf - c_core_par_pf)
        
        # Kvco tuning sensitivity (GHz/V)
        v_tune_range = self.process.vdd_nom * 0.8
        kvco_ghz_per_v = (f_max_ghz - f_min_ghz) / max(0.1, v_tune_range)
        
        # 4. RF Output Power & DC Power
        p_dc_mw = self.process.vdd_nom * i_dc_ma
        # Current-limited regime vs voltage-limited regime
        v_diff_swing = min(self.process.vdd_nom * 1.8, (4.0 / math.pi) * (i_dc_ma * 1e-3) * r_p_ohm)
        p_rf_w = (v_diff_swing**2) / (2.0 * r_p_ohm)
        p_rf_out_dbm = 10.0 * math.log10(max(1e-6, p_rf_w * 1000.0))
        
        # 5. Leeson-Cutler Phase Noise Model
        # L(Δf) = 10*log10( (2*F*k*T / Psig) * (1 + (f0 / (2*Q*Δf))^2) )
        k_b = 1.38e-23
        temp_k = 300.0
        f_noise_factor = 2.5 + (0.015 * freq_ghz)  # Excess noise factor F
        
        delta_f_1mhz = 1e6
        delta_f_10mhz = 10e6
        
        pn_term_1mhz = (2.0 * f_noise_factor * k_b * temp_k / max(1e-5, p_rf_w)) * ((freq_ghz * 1e9) / (2.0 * q_tank * delta_f_1mhz))**2
        pn_1mhz = 10.0 * math.log10(max(1e-18, pn_term_1mhz))
        
        pn_term_10mhz = (2.0 * f_noise_factor * k_b * temp_k / max(1e-5, p_rf_w)) * ((freq_ghz * 1e9) / (2.0 * q_tank * delta_f_10mhz))**2
        pn_10mhz = 10.0 * math.log10(max(1e-18, pn_term_10mhz))
        
        # FOM = -L(Δf) + 20*log10(f0 / Δf) - 10*log10(Pdc/1mW)
        fom = -pn_1mhz + 20.0 * math.log10((freq_ghz * 1e9) / delta_f_1mhz) - 10.0 * math.log10(p_dc_mw)
        # FOM_T = FOM + 20*log10(FTR / 10%)
        fom_t = fom + 20.0 * math.log10(tuning_range_pct / 10.0)
        
        # 6. SPICE Deck Generator
        spice_deck = self._generate_vco_spice(
            freq_ghz=freq_ghz,
            vdd=self.process.vdd_nom,
            i_dc_ma=i_dc_ma,
            l_tank_nh=l_tank_nh,
            c_tank_pf=c_tank_pf,
            c_var_pf=c_var_pf,
            w_n_um=w_n_um,
            w_p_um=w_p_um,
            q_tank=q_tank
        )
        
        return VCODesignOutput(
            freq_ghz=round(freq_ghz, 2),
            tuning_range_pct=round(tuning_range_pct, 1),
            f_min_ghz=round(f_min_ghz, 2),
            f_max_ghz=round(f_max_ghz, 2),
            vdd=self.process.vdd_nom,
            i_dc_ma=round(i_dc_ma, 2),
            p_dc_mw=round(p_dc_mw, 2),
            p_rf_out_dbm=round(p_rf_out_dbm, 1),
            l_tank_nh=round(l_tank_nh, 4),
            c_tank_pf=round(c_tank_pf, 4),
            q_tank=round(q_tank, 1),
            r_tank_parallel_ohm=round(r_p_ohm, 1),
            c_varactor_pf=round(c_var_pf, 4),
            c_fixed_pf=round(c_fixed_pf, 4),
            kvco_ghz_per_v=round(kvco_ghz_per_v, 3),
            gm_required_ms=round(gm_req_ms, 2),
            startup_safety_factor=round(alpha_startup, 1),
            w_nmos_um=round(w_n_um, 1),
            w_pmos_um=round(w_p_um, 1),
            num_fingers_n=n_fingers_n,
            num_fingers_p=n_fingers_p,
            phase_noise_1mhz_dbc=round(pn_1mhz, 1),
            phase_noise_10mhz_dbc=round(pn_10mhz, 1),
            fom_dbc_per_hz=round(fom, 1),
            fom_t_dbc_per_hz=round(fom_t, 1),
            spice_netlist=spice_deck
        )

    def _generate_vco_spice(
        self,
        freq_ghz: float,
        vdd: float,
        i_dc_ma: float,
        l_tank_nh: float,
        c_tank_pf: float,
        c_var_pf: float,
        w_n_um: float,
        w_p_um: float,
        q_tank: float
    ) -> str:
        """Generate SPICE simulation deck for cross-coupled LC-VCO."""
        r_series = (2.0 * math.pi * freq_ghz * 1e9 * l_tank_nh * 1e-9) / max(1.0, q_tank)
        t_period_ns = 1.0 / freq_ghz
        
        return f"""* =================================================================
* AutoRF Automated CMOS Cross-Coupled LC-VCO SPICE Netlist
* Frequency: {freq_ghz} GHz | Supply: {vdd} V | Current: {i_dc_ma} mA
* Technology Node: {self.process.name} ({self.process.node_nm}nm)
* =================================================================

.title CMOS LC Voltage-Controlled Oscillator Simulation Deck

* --- DC Supply & Bias ---
V_DD VDD 0 DC {vdd}
I_TAIL VDD V_TAIL_P DC {i_dc_ma}m

* --- Differential LC Resonator Tank ---
* Center-tapped inductor with finite Q series loss
L_TANK_P V_OUT_P VDD {l_tank_nh/2.0:.4f}n
R_LOSS_P V_OUT_P V_INT_P {r_series/2.0:.3f}
L_TANK_N V_OUT_N VDD {l_tank_nh/2.0:.4f}n
R_LOSS_N V_OUT_N V_INT_N {r_series/2.0:.3f}
K_TANK L_TANK_P L_TANK_N 0.45

* Tuning Varactors (Controlled by V_TUNE)
V_TUNE VTUNE 0 DC {vdd/2.0:.2f}
C_VAR_P V_OUT_P VTUNE {c_var_pf/2.0:.4f}p
C_VAR_N V_OUT_N VTUNE {c_var_pf/2.0:.4f}p
C_FIXED V_OUT_P V_OUT_N {(c_tank_pf - c_var_pf):.4f}p

* --- Complementary Negative-Gm Cross-Coupled Pair ---
* NMOS Cross-Coupled Pair (W={w_n_um:.1f}um, L={self.process.l_min_um:.3f}um)
M_N1 V_OUT_P V_OUT_N 0 0 CMOS_RF_NMOS W={w_n_um:.1f}u L={self.process.l_min_um:.3f}u
M_N2 V_OUT_N V_OUT_P 0 0 CMOS_RF_NMOS W={w_n_um:.1f}u L={self.process.l_min_um:.3f}u

* PMOS Cross-Coupled Pair (W={w_p_um:.1f}um, L={self.process.l_min_um:.3f}um)
M_P1 V_OUT_P V_OUT_N V_TAIL_P V_TAIL_P CMOS_RF_PMOS W={w_p_um:.1f}u L={self.process.l_min_um:.3f}u
M_P2 V_OUT_N V_OUT_P V_TAIL_P V_TAIL_P CMOS_RF_PMOS W={w_p_um:.1f}u L={self.process.l_min_um:.3f}u

* Transient Startup Perturbation
I_KICK V_OUT_P 0 PULSE(0 1m 0.1n 0.05n 0.05n 0.2n 100n)

* --- Compact BSIM RF Model Cards ---
.model CMOS_RF_NMOS NMOS (LEVEL=54 VTO={self.process.vth} KP={self.process.kp}u LAMBDA={self.process.lambda_ch} CGSO={self.process.c_ov}p CGDO={self.process.c_ov}p)
.model CMOS_RF_PMOS PMOS (LEVEL=54 VTO=-{self.process.vth} KP={self.process.kp*0.4:.1f}u LAMBDA={self.process.lambda_ch*1.2:.2f} CGSO={self.process.c_ov*1.2:.2f}p CGDO={self.process.c_ov*1.2:.2f}p)

* --- Analyses ---
.tran {t_period_ns/40.0:.4f}n {t_period_ns*150.0:.2f}n UIC
.noise V(V_OUT_P, V_OUT_N) V_TUNE dec 10 10k 100meg

.end
"""
