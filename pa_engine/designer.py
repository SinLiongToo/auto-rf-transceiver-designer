"""
AutoPA-RF Unified Power Amplifier Design & Synthesis Orchestrator.
Performs end-to-end synthesis from RF specs to transistor dimensions,
matching networks, stability networks, load-pull contours, and SPICE netlist.
"""

from dataclasses import dataclass, asdict
from typing import Dict, Any, Optional
import json
import math

from .process_pdk import get_process, CMOSProcess, PDK_LIBRARY
from .cripps import calculate_cripps_loadline, LoadlineResult
from .transistor_sizing import size_transistor, TransistorDimension
from .matching_network import synthesize_all_matching, MatchingResult
from .stability import calculate_stability, StabilityMetrics
from .loadpull import generate_loadpull_data, LoadPullSummary
from .class_e_f import synthesize_class_e, synthesize_class_f
from .spice_exporter import generate_spice_netlist

@dataclass
class PADesignOutput:
    # Inputs
    freq_ghz: float
    pout_target_dbm: float
    vdd: float
    process_name: str
    op_class: str
    topology: str
    
    # Loadline
    r_opt_per_branch: float
    r_opt_diff: float
    i_max_peak_a: float
    i_dc_tot_a: float
    p_dc_w: float
    theoretical_drain_eff_pct: float
    
    # Transistor Dimensions
    w_total_um: float
    l_gate_um: float
    num_fingers: int
    w_finger_um: float
    num_cells_m: int
    gm_ms: float
    cgs_ff: float
    cgd_ff: float
    cds_ff: float
    rg_ohm: float
    ft_ghz: float
    fmax_ghz: float
    c_neu_ff: float
    
    # Matching Networks
    balun_lp_nh: float
    balun_ls_nh: float
    balun_k: float
    balun_turns_ratio_n: float
    balun_cp_pf: float
    balun_cs_pf: float
    balun_loss_db: float
    imn_l_nh: float
    imn_c_pf: float
    harmonic_2nd_trap_l_nh: float
    harmonic_2nd_trap_c_pf: float
    
    # Stability
    k_factor: float
    delta_mag: float
    mu_factor: float
    is_unconditionally_stable: bool
    s21_gain_db: float
    s12_isolation_db: float
    
    # Net PA Performance Figures
    pout_load_dbm: float
    pout_load_mw: float
    gain_db: float
    drain_efficiency_pct: float
    pae_pct: float
    p1db_estimated_dbm: float
    psat_estimated_dbm: float
    pbo_6db_pae_pct: float
    
    # Detailed Objects
    spice_netlist: str
    loadpull_summary: LoadPullSummary

class AutomatedPADesigner:
    """End-to-End CMOS RF Power Amplifier Design Automation Engine."""
    
    def __init__(self, process_node: str = "65nm_rf"):
        self.process: CMOSProcess = get_process(process_node)

    def synthesize(
        self,
        freq_ghz: float = 2.4,
        pout_dbm: float = 24.0,
        vdd: Optional[float] = None,
        op_class: str = "AB",
        topology: str = "differential_cascode",
        inductor_q: Optional[float] = None,
        use_neutralization: bool = True
    ) -> PADesignOutput:
        """
        Synthesize complete CMOS RF PA according to specifications.
        """
        vdd_val = vdd if vdd is not None else self.process.vdd_nom
        ind_q = inductor_q if inductor_q is not None else self.process.default_inductor_q
        
        # 1. Output Matching Network insertion loss pre-estimate (~0.8 - 1.2 dB)
        loss_omn_db = 0.85 if "diff" in topology else 1.10
        
        # 2. Cripps Loadline
        is_diff = "diff" in topology.lower()
        loadline: LoadlineResult = calculate_cripps_loadline(
            pout_dbm=pout_dbm,
            vdd=vdd_val,
            v_knee=self.process.v_knee,
            op_class=op_class,
            topology="differential" if is_diff else "single_ended",
            stack_count=2 if "cascode" in topology.lower() or "stack" in topology.lower() else 1,
            loss_omn_db=loss_omn_db
        )
        
        # 3. Transistor Sizing
        # For differential, each side carries half power, so sizing is for single branch
        transistor: TransistorDimension = size_transistor(
            process=self.process,
            i_max_peak_a=loadline.i_max_pk / (2.0 if is_diff else 1.0),
            v_swing_pk_v=loadline.v_swing_pk,
            target_freq_ghz=freq_ghz,
            preferred_finger_w_um=2.0
        )
        
        # 4. Stability & Neutralization
        stab: StabilityMetrics = calculate_stability(
            gm_ms=transistor.gm_ms,
            gds_ms=transistor.gds_ms,
            cgs_ff=transistor.cgs_ff,
            cgd_ff=transistor.cgd_ff,
            cds_ff=transistor.cds_ff,
            rg_ohm=transistor.rg_ohm,
            freq_ghz=freq_ghz,
            use_cross_neutralization=use_neutralization,
            r_stab_shunt_ohm=150.0 if freq_ghz > 30.0 else 500.0
        )
        
        # 5. Matching Networks Synthesis
        r_opt_diff = loadline.r_opt * (2.0 if is_diff else 1.0)
        z_in_gate = complex(transistor.rg_ohm + 2.0, -1.0 / (2.0 * 3.14159 * freq_ghz * 1e9 * transistor.cgs_ff * 1e-15))
        
        matching: MatchingResult = synthesize_all_matching(
            r_opt_diff=r_opt_diff,
            z_in_gate=z_in_gate,
            freq_ghz=freq_ghz,
            c_out_device_ff=transistor.cds_ff * 2.0 if is_diff else transistor.cds_ff,
            inductor_q=ind_q
        )
        
        # 6. High-Frequency Load-Pull Contours
        loadpull: LoadPullSummary = generate_loadpull_data(
            r_opt=loadline.r_opt,
            c_out_ff=transistor.cds_ff,
            freq_ghz=freq_ghz,
            p_max_dbm=pout_dbm + matching.omn_transformer.insertion_loss_db,
            peak_pae_pct=loadline.theoretical_drain_eff - 5.0
        )
        
        # 7. Final Net System Performance Calculations
        actual_loss_omn = matching.omn_transformer.insertion_loss_db if is_diff else matching.omn_lumped.loss_db
        pout_load_dbm = pout_dbm
        pout_load_mw = 10.0 ** (pout_load_dbm / 10.0)
        
        # Realistic gain considering device fmax, matching, parasitics
        max_available_gain = 20.0 * 0.434 * (self.process.fmax_peak_ghz / max(1.0, freq_ghz))
        gain_db = min(18.5, max(8.0, 10.0 * 0.434 * math.log(max(1.0, (self.process.fmax_peak_ghz / freq_ghz) ** 2)) - actual_loss_omn))
        
        # Power Added Efficiency (PAE)
        p_in_w = (pout_load_mw * 1e-3) / (10.0 ** (gain_db / 10.0))
        drain_eff_pct = (pout_load_mw * 1e-3) / loadline.p_dc * 100.0 if loadline.p_dc > 0 else 50.0
        drain_eff_pct = min(loadline.theoretical_drain_eff * 0.90, drain_eff_pct)
        pae_pct = ((pout_load_mw * 1e-3 - p_in_w) / loadline.p_dc) * 100.0 if loadline.p_dc > 0 else 45.0
        pae_pct = min(drain_eff_pct - 3.0, max(20.0, pae_pct))
        
        # Compression and Saturation Points
        p1db = round(pout_load_dbm - 1.2, 1)
        psat = round(pout_load_dbm + 0.8, 1)
        
        # 8. SPICE Deck Preparation
        design_dict = {
            "freq_ghz": freq_ghz,
            "vdd": vdd_val,
            "pout_target_dbm": pout_dbm,
            "process_name": self.process.name,
            "op_class": op_class,
            "w_total_um": transistor.w_total_um,
            "l_gate_um": transistor.l_gate_um,
            "num_fingers": transistor.num_fingers,
            "rg_ohm": transistor.rg_ohm,
            "c_neu_ff": transistor.c_neu_ff if use_neutralization else 0.0,
            "balun_lp_nh": matching.omn_transformer.primary_inductance_nh,
            "balun_ls_nh": matching.omn_transformer.secondary_inductance_nh,
            "balun_k": matching.omn_transformer.coupling_k,
            "balun_cp_pf": matching.omn_transformer.primary_cap_tuning_pf,
            "balun_cs_pf": matching.omn_transformer.secondary_cap_tuning_pf,
            "imn_l_nh": matching.imn_match.series_inductance_nh,
            "imn_c_pf": matching.imn_match.shunt_capacitance_pf,
            "vth": self.process.vth,
            "kp": self.process.kp,
            "c_ov": self.process.c_ov,
            "cj0": self.process.cj0,
            "cjsw": self.process.cjsw
        }
        spice_code = generate_spice_netlist(design_dict)
        
        return PADesignOutput(
            freq_ghz=freq_ghz,
            pout_target_dbm=pout_dbm,
            vdd=vdd_val,
            process_name=self.process.name,
            op_class=op_class,
            topology=topology,
            
            r_opt_per_branch=round(loadline.r_opt, 2),
            r_opt_diff=round(r_opt_diff, 2),
            i_max_peak_a=round(loadline.i_max_pk, 3),
            i_dc_tot_a=round(loadline.i_dc, 3),
            p_dc_w=round(loadline.p_dc, 3),
            theoretical_drain_eff_pct=round(loadline.theoretical_drain_eff, 1),
            
            w_total_um=transistor.w_total_um,
            l_gate_um=transistor.l_gate_um,
            num_fingers=transistor.num_fingers,
            w_finger_um=transistor.w_finger_um,
            num_cells_m=transistor.num_cells_m,
            gm_ms=transistor.gm_ms,
            cgs_ff=transistor.cgs_ff,
            cgd_ff=transistor.cgd_ff,
            cds_ff=transistor.cds_ff,
            rg_ohm=transistor.rg_ohm,
            ft_ghz=transistor.ft_ghz,
            fmax_ghz=transistor.fmax_ghz,
            c_neu_ff=transistor.c_neu_ff,
            
            balun_lp_nh=matching.omn_transformer.primary_inductance_nh,
            balun_ls_nh=matching.omn_transformer.secondary_inductance_nh,
            balun_k=matching.omn_transformer.coupling_k,
            balun_turns_ratio_n=matching.omn_transformer.turns_ratio_n,
            balun_cp_pf=matching.omn_transformer.primary_cap_tuning_pf,
            balun_cs_pf=matching.omn_transformer.secondary_cap_tuning_pf,
            balun_loss_db=matching.omn_transformer.insertion_loss_db,
            imn_l_nh=matching.imn_match.series_inductance_nh,
            imn_c_pf=matching.imn_match.shunt_capacitance_pf,
            harmonic_2nd_trap_l_nh=matching.harmonic_2nd_trap_l_nh,
            harmonic_2nd_trap_c_pf=matching.harmonic_2nd_trap_c_pf,
            
            k_factor=stab.k_factor,
            delta_mag=stab.delta_mag,
            mu_factor=stab.mu_factor,
            is_unconditionally_stable=stab.is_unconditionally_stable,
            s21_gain_db=round(gain_db, 1),
            s12_isolation_db=stab.s12_isolation_db,
            
            pout_load_dbm=pout_load_dbm,
            pout_load_mw=round(pout_load_mw, 1),
            gain_db=round(gain_db, 1),
            drain_efficiency_pct=round(drain_eff_pct, 1),
            pae_pct=round(pae_pct, 1),
            p1db_estimated_dbm=p1db,
            psat_estimated_dbm=psat,
            pbo_6db_pae_pct=loadpull.pbo_6db_pae_pct,
            
            spice_netlist=spice_code,
            loadpull_summary=loadpull
        )
