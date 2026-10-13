"""
Automated CMOS RF Mixer Synthesis Engine.
Topology:
  - Gilbert Cell Double-Balanced Active Mixer (Transconductance RF stage + LO Switching Quad + IF Load)
Physics & Theory:
  - Conversion Gain: G_c = (2 / π) * g_m,rf * R_L
  - Noise Figure (DSB / SSB): NF_SSB = NF_DSB + 3 dB (Gilbert cell typical NF ~ 8 - 14 dB)
  - Linearity & 1-dB Compression: IP1dB ≈ V_ov,rf - 1 dB, IIP3 ≈ IP1dB + 9.6 dB
  - Port-to-Port Isolation: Double-balanced quad cancels LO-to-RF, LO-to-IF, and RF-to-IF feedthrough
  - LO Drive Requirement: V_lo,diff >= sqrt(2) * V_ov,sw (fast current commutation to minimize noise)
"""

import math
from dataclasses import dataclass
from typing import Optional, Dict, Any
from .process_pdk import CMOSProcess, PDK_LIBRARY, get_process

@dataclass
class MixerDesignOutput:
    rf_freq_ghz: float
    lo_freq_ghz: float
    if_freq_ghz: float
    vdd: float
    i_dc_ma: float
    p_dc_mw: float
    
    # Gain & Noise
    conversion_gain_db: float
    voltage_gain_linear: float
    nf_ssb_db: float
    nf_dsb_db: float
    
    # Linearity & Dynamic Range
    iip3_dbm: float
    ip1db_dbm: float
    lo_power_req_dbm: float
    
    # Port-to-Port Isolation
    lo_rf_isolation_db: float
    lo_if_isolation_db: float
    rf_if_isolation_db: float
    
    # Transistor Sizing & Passive Components
    w_rf_um: float
    w_lo_quad_um: float
    num_fingers_rf: int
    num_fingers_lo: int
    r_load_if_ohm: float
    c_if_filter_pf: float
    gm_rf_ms: float
    
    # SPICE Netlist
    spice_netlist: str

class AutomatedMixerDesigner:
    """Automated synthesizer for CMOS Double-Balanced Gilbert Cell Mixers."""

    def __init__(self, process_node: str = "28nm_hpc"):
        self.process: CMOSProcess = get_process(process_node)

    def synthesize(
        self,
        rf_freq_ghz: float,
        lo_freq_ghz: Optional[float] = None,
        target_gain_db: float = 10.0,
        i_dc_ma: float = 6.0,
        r_load_ohm: float = 250.0
    ) -> MixerDesignOutput:
        """
        Synthesize CMOS Gilbert Cell mixer for given RF frequency and conversion gain.
        """
        # Default IF = 0.5 GHz for heterodyne or low-IF
        if lo_freq_ghz is None:
            if_freq_ghz = 0.5
            lo_freq_ghz = abs(rf_freq_ghz - if_freq_ghz)
        else:
            if_freq_ghz = abs(rf_freq_ghz - lo_freq_ghz)
            
        p_dc_mw = self.process.vdd_nom * i_dc_ma
        
        # 1. Transconductance Stage (RF Input Differential Pair)
        # Target Conversion Gain G_c = (2 / pi) * gm_rf * R_load
        target_gc_lin = 10.0 ** (target_gain_db / 20.0)
        gm_rf_req = (math.pi / 2.0) * (target_gc_lin / max(50.0, r_load_ohm))
        
        # Sizing RF Transistors (M1, M2)
        # Current per branch = Idc / 2
        i_branch_ma = i_dc_ma / 2.0
        v_ov_rf = max(0.12, (2.0 * i_branch_ma * 1e-3) / gm_rf_req)
        
        # gm = kp * (W/L) * Vov => W_um = gm * L_um / (kp * 1e-6 * Vov)
        w_rf_calc_um = (gm_rf_req * self.process.l_min_um) / ((self.process.kp * 1e-6) * v_ov_rf)
        w_rf_um = max(8.0, min(120.0, w_rf_calc_um))
        
        w_finger = 1.0 if rf_freq_ghz > 30.0 else 2.0
        n_fingers_rf = max(4, int(math.ceil(w_rf_um / w_finger)))
        if n_fingers_rf % 2 != 0: n_fingers_rf += 1
        w_rf_um = n_fingers_rf * w_finger
        
        # Recomputed actual gm
        gm_actual_ms = ((self.process.kp * 1e-6) * (w_rf_um / self.process.l_min_um) * v_ov_rf) * 1e3
        
        # 2. LO Switching Quad Sizing (M3, M4, M5, M6)
        # Switching quad requires small Vov to switch rapidly with moderate LO power
        # Typical W_lo ≈ 0.6 ~ 0.8 * W_rf to reduce LO gate parasitic capacitance and feedthrough
        w_lo_um = max(6.0, w_rf_um * 0.7)
        n_fingers_lo = max(4, int(math.ceil(w_lo_um / w_finger)))
        if n_fingers_lo % 2 != 0: n_fingers_lo += 1
        w_lo_um = n_fingers_lo * w_finger
        
        # LO drive power required
        # V_lo,peak ≈ 250 ~ 350 mV
        lo_power_dbm = 0.0 if rf_freq_ghz < 30.0 else 2.0
        
        # 3. IF Low-Pass Filter
        # Corner frequency at 2.5 * f_IF to attenuate LO and RF feedthrough
        f_corner_ghz = max(1.5, if_freq_ghz * 2.5)
        c_if_pf = 1.0 / (2.0 * math.pi * f_corner_ghz * 1e9 * (r_load_ohm / 2.0)) * 1e12
        
        # Actual Conversion Gain
        gc_lin = (2.0 / math.pi) * (gm_actual_ms * 1e-3) * r_load_ohm
        conversion_gain_db = 20.0 * math.log10(max(0.1, gc_lin))
        
        # 4. Noise Figure (SSB & DSB)
        # Analytical Gilbert Cell Noise Model (Darabi & Abidi)
        # NF_DSB ≈ 10*log10( 1 + gamma + gamma*(4*I_tail*R_L / (pi*V_lo)) + 2/(gm_rf * R_L) )
        gamma = 1.33  # Sub-micron CMOS thermal noise parameter
        nf_dsb_lin = 1.0 + gamma + (0.5 * gamma) + (2.0 / max(0.5, (gm_actual_ms * 1e-3) * r_load_ohm))
        # Add frequency degradation for mmWave switching imperfections
        if rf_freq_ghz > 30.0:
            nf_dsb_lin += (rf_freq_ghz / 50.0)
        nf_dsb = 10.0 * math.log10(max(1.0, nf_dsb_lin))
        nf_ssb = nf_dsb + 3.01  # SSB is 3 dB higher due to image band noise fold
        
        # 5. Linearity (IIP3 and IP1dB)
        # For differential pair without source degeneration: IIP3 ≈ sqrt(32/3) * V_ov
        # In dBm into 50 Ohm:
        v_iip3_peak = math.sqrt(32.0 / 3.0) * v_ov_rf
        p_iip3_w = (v_iip3_peak**2) / (2.0 * 50.0)
        iip3_dbm = 10.0 * math.log10(max(1e-6, p_iip3_w * 1000.0))
        ip1db_dbm = iip3_dbm - 9.6
        
        # 6. Isolation (Double balanced structure benefits)
        lo_rf_iso = min(55.0, 48.0 - (0.15 * rf_freq_ghz))
        lo_if_iso = min(50.0, 45.0 - (0.12 * rf_freq_ghz))
        rf_if_iso = min(45.0, 40.0 - (0.10 * rf_freq_ghz))
        
        # 7. SPICE Deck Generator
        spice_deck = self._generate_mixer_spice(
            rf_freq_ghz=rf_freq_ghz,
            lo_freq_ghz=lo_freq_ghz,
            if_freq_ghz=if_freq_ghz,
            vdd=self.process.vdd_nom,
            i_dc_ma=i_dc_ma,
            w_rf_um=w_rf_um,
            w_lo_um=w_lo_um,
            r_load_ohm=r_load_ohm,
            c_if_pf=c_if_pf
        )
        
        return MixerDesignOutput(
            rf_freq_ghz=round(rf_freq_ghz, 2),
            lo_freq_ghz=round(lo_freq_ghz, 2),
            if_freq_ghz=round(if_freq_ghz, 2),
            vdd=self.process.vdd_nom,
            i_dc_ma=round(i_dc_ma, 2),
            p_dc_mw=round(p_dc_mw, 2),
            conversion_gain_db=round(conversion_gain_db, 2),
            voltage_gain_linear=round(gc_lin, 2),
            nf_ssb_db=round(nf_ssb, 2),
            nf_dsb_db=round(nf_dsb, 2),
            iip3_dbm=round(iip3_dbm, 2),
            ip1db_dbm=round(ip1db_dbm, 2),
            lo_power_req_dbm=round(lo_power_dbm, 1),
            lo_rf_isolation_db=round(lo_rf_iso, 1),
            lo_if_isolation_db=round(lo_if_iso, 1),
            rf_if_isolation_db=round(rf_if_iso, 1),
            w_rf_um=round(w_rf_um, 1),
            w_lo_quad_um=round(w_lo_um, 1),
            num_fingers_rf=n_fingers_rf,
            num_fingers_lo=n_fingers_lo,
            r_load_if_ohm=round(r_load_ohm, 1),
            c_if_filter_pf=round(c_if_pf, 4),
            gm_rf_ms=round(gm_actual_ms, 2),
            spice_netlist=spice_deck
        )

    def _generate_mixer_spice(
        self,
        rf_freq_ghz: float,
        lo_freq_ghz: float,
        if_freq_ghz: float,
        vdd: float,
        i_dc_ma: float,
        w_rf_um: float,
        w_lo_um: float,
        r_load_ohm: float,
        c_if_pf: float
    ) -> str:
        """Generate SPICE simulation deck for double-balanced Gilbert cell active mixer."""
        t_period_if_ns = 1.0 / max(0.01, if_freq_ghz)
        
        return f"""* =================================================================
* AutoRF Automated CMOS Double-Balanced Gilbert Cell Mixer SPICE Deck
* RF Freq: {rf_freq_ghz} GHz | LO Freq: {lo_freq_ghz} GHz | IF Freq: {if_freq_ghz} GHz
* Technology Node: {self.process.name} ({self.process.node_nm}nm)
* =================================================================

.title CMOS Double-Balanced Active Down-Conversion Mixer Deck

* --- Power Supply & Tail Current ---
V_DD VDD 0 DC {vdd}
I_TAIL V_TAIL 0 DC {i_dc_ma}m

* --- RF Input Port (Differential AC Sources) ---
V_RF_P RF_IN_P 0 DC {self.process.vth + 0.15:.2f} SIN(0 20m {rf_freq_ghz}G)
V_RF_N RF_IN_N 0 DC {self.process.vth + 0.15:.2f} SIN(0 20m {rf_freq_ghz}G 0 0 180)

* --- LO Switching Quad Port (Differential AC Sources) ---
V_LO_P LO_IN_P 0 DC {vdd*0.65:.2f} SIN(0 300m {lo_freq_ghz}G)
V_LO_N LO_IN_N 0 DC {vdd*0.65:.2f} SIN(0 300m {lo_freq_ghz}G 0 0 180)

* --- RF Transconductance Stage (M1, M2) ---
M_RF_P COMM_P RF_IN_P V_TAIL 0 CMOS_RF_NMOS W={w_rf_um:.1f}u L={self.process.l_min_um:.3f}u
M_RF_N COMM_N RF_IN_N V_TAIL 0 CMOS_RF_NMOS W={w_rf_um:.1f}u L={self.process.l_min_um:.3f}u

* --- LO Switching Quad (M3, M4, M5, M6) ---
M_LO_1 IF_OUT_P LO_IN_P COMM_P 0 CMOS_RF_NMOS W={w_lo_um:.1f}u L={self.process.l_min_um:.3f}u
M_LO_2 IF_OUT_N LO_IN_N COMM_P 0 CMOS_RF_NMOS W={w_lo_um:.1f}u L={self.process.l_min_um:.3f}u
M_LO_3 IF_OUT_N LO_IN_P COMM_N 0 CMOS_RF_NMOS W={w_lo_um:.1f}u L={self.process.l_min_um:.3f}u
M_LO_4 IF_OUT_P LO_IN_N COMM_N 0 CMOS_RF_NMOS W={w_lo_um:.1f}u L={self.process.l_min_um:.3f}u

* --- IF Load Resistors & Low-Pass Filtering Capacitors ---
R_LOAD_P VDD IF_OUT_P {r_load_ohm/2.0:.1f}
R_LOAD_N VDD IF_OUT_N {r_load_ohm/2.0:.1f}
C_LPF_P IF_OUT_P 0 {c_if_pf/2.0:.4f}p
C_LPF_N IF_OUT_N 0 {c_if_pf/2.0:.4f}p

* --- Compact BSIM RF Model Card ---
.model CMOS_RF_NMOS NMOS (LEVEL=54 VTO={self.process.vth} KP={self.process.kp}u LAMBDA={self.process.lambda_ch} CGSO={self.process.c_ov}p CGDO={self.process.c_ov}p)

* --- Transient Mixed-Frequency Analysis ---
.tran 0.01n {t_period_if_ns*10.0:.2f}n
.four {if_freq_ghz}G V(IF_OUT_P, IF_OUT_N)

.end
"""
