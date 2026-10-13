"""
Automated CMOS RF Switch (T/R SPDT / SP4T) Synthesis Engine.
Topologies:
  - Series-Shunt SPDT (Single-Pole Double-Throw) RF Switch
  - Traveling-Wave / Quarter-Wave Resonant Shunt Switch for mmWave
Physics & Theory:
  - Ron * Coff Figure-of-Merit: FOM_switch = Ron * Coff (typical 100 ~ 200 fs in advanced CMOS)
  - Insertion Loss (IL): IL ≈ 10 * log10( 1 + 2 * Ron / Z0 ) + Shunt loss
  - Isolation (ISO): ISO ≈ 10 * log10( 1 + (1 / (2 * ω * Coff * Z0))^2 )
  - Linearity (P1dB & IIP3): Voltage handling determined by stacked FETs (N-stack) to avoid body diode turn-on
  - Body-Floating Resistors: Rb >= 10 kΩ connected to substrate/well to prevent RF signal leakage into lossy substrate
"""

import math
from dataclasses import dataclass
from typing import Optional, Dict, Any
from .process_pdk import CMOSProcess, PDK_LIBRARY, get_process

@dataclass
class SwitchDesignOutput:
    freq_ghz: float
    vdd: float
    control_voltage_high: float
    control_voltage_low: float
    
    # RF Performance
    insertion_loss_db: float
    isolation_db: float
    return_loss_db: float
    p1db_power_handling_dbm: float
    iip3_dbm: float
    
    # Transistor Sizing & Stacking
    num_stacked_fets: int
    w_series_um: float
    w_shunt_um: float
    num_fingers_series: int
    num_fingers_shunt: int
    r_on_series_ohm: float
    c_off_shunt_ff: float
    r_body_floating_kohm: float
    switch_fom_fs: float  # Ron * Coff in femtoseconds
    
    # SPICE Netlist
    spice_netlist: str

class AutomatedSwitchDesigner:
    """Automated synthesizer for CMOS T/R SPDT RF Switches."""

    def __init__(self, process_node: str = "28nm_hpc"):
        self.process: CMOSProcess = get_process(process_node)

    def synthesize(
        self,
        freq_ghz: float,
        target_p1db_dbm: float = 24.0,
        z0_ohm: float = 50.0
    ) -> SwitchDesignOutput:
        """
        Synthesize Series-Shunt CMOS SPDT T/R switch for given frequency and power handling.
        """
        omega = 2.0 * math.pi * freq_ghz * 1e9
        
        # 1. Power Handling & Transistor Stacking
        # Peak RF voltage swing for target P1dB:
        # P = V_peak^2 / (2 * Z0) => V_peak = sqrt(2 * Z0 * P_watts)
        p_target_w = 10.0 ** ((target_p1db_dbm - 30.0) / 10.0)
        v_peak_rf = math.sqrt(2.0 * z0_ohm * p_target_w)
        
        # Each FET channel can safely withstand ~ Vdd_max without breakdown or turning on parasitics
        v_max_per_fet = self.process.vdd_nom * 0.9
        num_stack = max(1, int(math.ceil(v_peak_rf / v_max_per_fet)))
        if freq_ghz > 40.0 and num_stack > 2:
            num_stack = 2  # At mmWave, excessive stacking increases IL severely
            
        # 2. Series FET Sizing (M_SER)
        # Insertion loss tradeoff: IL requires small R_on => Large W_ser
        # But larger W_ser increases parasitic Coff to ground, degrading isolation.
        # Ron = num_stack * (1 / (kp * (W/L) * (Vctrl - Vth)))
        v_ctrl_h = self.process.vdd_nom
        v_ctrl_l = 0.0
        v_ov_on = v_ctrl_h - self.process.vth
        
        # Target series resistance: ~ 1.5 - 3.5 Ohm total for low IL (< 1 dB)
        r_on_target = max(1.2, min(4.0, 1.8 + (freq_ghz / 50.0)))
        
        # W_ser per stack: R_on_single = r_on_target / num_stack
        # Ron_single = L / (kp * 1e-6 * W * Vov) => W = L * num_stack / (kp * 1e-6 * Ron_target * Vov)
        w_ser_um = (self.process.l_min_um * num_stack) / ((self.process.kp * 1e-6) * r_on_target * v_ov_on)
        w_ser_um = max(20.0, min(350.0, w_ser_um))
        
        w_finger = 1.5 if freq_ghz > 30.0 else 2.5
        n_fingers_ser = max(4, int(math.ceil(w_ser_um / w_finger)))
        if n_fingers_ser % 2 != 0: n_fingers_ser += 1
        w_ser_um = n_fingers_ser * w_finger
        
        # Actual Ron series
        r_on_actual = num_stack * ((self.process.l_min_um) / ((self.process.kp * 1e-6) * w_ser_um * v_ov_on))
        
        # Coff series
        c_off_single_ff = (self.process.c_ov * w_ser_um) + (self.process.cj0 * w_ser_um * self.process.l_min_um * 0.5)
        c_off_ser_total_ff = c_off_single_ff / num_stack
        
        # 3. Shunt FET Sizing (M_SHU)
        # Shunt FET improves isolation when branch is OFF by dumping signal to GND.
        # W_shu is typically ~ 0.35 - 0.5 * W_ser
        w_shu_um = max(10.0, w_ser_um * 0.4)
        n_fingers_shu = max(4, int(math.ceil(w_shu_um / w_finger)))
        if n_fingers_shu % 2 != 0: n_fingers_shu += 1
        w_shu_um = n_fingers_shu * w_finger
        
        r_on_shu = num_stack * ((self.process.l_min_um) / ((self.process.kp * 1e-6) * w_shu_um * v_ov_on))
        c_off_shu_single_ff = (self.process.c_ov * w_shu_um) + (self.process.cj0 * w_shu_um * self.process.l_min_um * 0.5)
        c_off_shu_total_ff = c_off_shu_single_ff / num_stack
        
        # Switch FOM = Ron * Coff (fs)
        fom_fs = (r_on_actual * c_off_ser_total_ff * 1e-15) * 1e15
        
        # 4. Insertion Loss (IL) Calculation
        # IL_series = 20 * log10( 1 + Ron / (2 * Z0) )
        # Plus capacitive shunt loading from Coff_shu
        y_shunt_loss = omega * (c_off_shu_total_ff * 1e-15)
        il_lin = 1.0 + (r_on_actual / (2.0 * z0_ohm)) + 0.5 * (y_shunt_loss * z0_ohm)**2
        # High frequency loss factor
        if freq_ghz > 40.0:
            il_lin += (freq_ghz / 120.0)
        il_db = 10.0 * math.log10(max(1.01, il_lin))
        
        # 5. Isolation (ISO) Calculation
        # ISO from open series capacitor:
        x_c_ser = 1.0 / max(1e-12, omega * (c_off_ser_total_ff * 1e-15))
        iso_ser_lin = (x_c_ser / (2.0 * z0_ohm))**2
        # Plus attenuation from turned-ON shunt branch: Ron_shu in parallel with Z0
        shunt_div = (z0_ohm / (2.0 * max(0.5, r_on_shu)))**2
        iso_lin = iso_ser_lin * shunt_div
        iso_raw_db = 10.0 * math.log10(max(10.0, iso_lin))
        # Cap realistic isolation for mmWave layout substrate coupling (series-shunt topology achieves 22-38 dB)
        iso_db = min(42.0, max(22.0, iso_raw_db - (0.12 * freq_ghz)))
        
        # Return loss (S11)
        s11_db = -min(28.0, max(12.0, 24.0 - (0.12 * freq_ghz)))
        
        # Linearity (IIP3)
        actual_p1db = 10.0 * math.log10(max(1e-3, (num_stack * v_max_per_fet)**2 / (2.0 * z0_ohm) * 1000.0))
        iip3_dbm = actual_p1db + 11.5
        
        # Body-floating resistance
        r_body_kohm = 25.0
        
        # 6. SPICE Deck Generator
        spice_deck = self._generate_switch_spice(
            freq_ghz=freq_ghz,
            v_ctrl_h=v_ctrl_h,
            w_ser_um=w_ser_um,
            w_shu_um=w_shu_um,
            num_stack=num_stack,
            r_body_kohm=r_body_kohm
        )
        
        return SwitchDesignOutput(
            freq_ghz=round(freq_ghz, 2),
            vdd=self.process.vdd_nom,
            control_voltage_high=round(v_ctrl_h, 2),
            control_voltage_low=round(v_ctrl_l, 2),
            insertion_loss_db=round(il_db, 2),
            isolation_db=round(iso_db, 1),
            return_loss_db=round(s11_db, 1),
            p1db_power_handling_dbm=round(actual_p1db, 1),
            iip3_dbm=round(iip3_dbm, 1),
            num_stacked_fets=num_stack,
            w_series_um=round(w_ser_um, 1),
            w_shunt_um=round(w_shu_um, 1),
            num_fingers_series=n_fingers_ser,
            num_fingers_shunt=n_fingers_shu,
            r_on_series_ohm=round(r_on_actual, 2),
            c_off_shunt_ff=round(c_off_shu_total_ff, 1),
            r_body_floating_kohm=r_body_kohm,
            switch_fom_fs=round(fom_fs, 1),
            spice_netlist=spice_deck
        )

    def _generate_switch_spice(
        self,
        freq_ghz: float,
        v_ctrl_h: float,
        w_ser_um: float,
        w_shu_um: float,
        num_stack: int,
        r_body_kohm: float
    ) -> str:
        """Generate SPICE netlist for Series-Shunt SPDT RF switch."""
        return f"""* =================================================================
* AutoRF Automated CMOS T/R SPDT RF Switch SPICE Deck
* Frequency: {freq_ghz} GHz | Stacking Factor: {num_stack} FETs
* Technology Node: {self.process.name} ({self.process.node_nm}nm)
* =================================================================

.title CMOS Series-Shunt T/R SPDT Switch Testbench

* --- RF Ports (50 Ohm System) ---
R_ANT ANT 0 50.0
R_TX  TX_PORT 0 50.0
R_RX  RX_PORT 0 50.0

* RF Source at Antenna (or TX)
V_RF_IN TX_IN TX_PORT DC 0 AC 1.0 SIN(0 0.5 {freq_ghz}G)

* --- Digital Control Logic ---
* V_CTRL_TX = High (TX ON), V_CTRL_RX = Low (RX Isolated)
V_TX_EN CTRL_TX 0 DC {v_ctrl_h}
V_RX_EN CTRL_RX 0 DC 0.0

* --- Series-Shunt TX Branch ---
* Series Switch FETs (Stacked for High RF Voltage Handling)
M_SER_TX1 ANT CTRL_TX INT_TX1 0 CMOS_RF_NMOS W={w_ser_um}u L={self.process.l_min_um}u
M_SER_TX2 INT_TX1 CTRL_TX TX_PORT 0 CMOS_RF_NMOS W={w_ser_um}u L={self.process.l_min_um}u
* Shunt Switch FETs (Controlled by CTRL_RX to shunt when TX is OFF)
M_SHU_TX TX_PORT CTRL_RX 0 0 CMOS_RF_NMOS W={w_shu_um}u L={self.process.l_min_um}u

* --- Series-Shunt RX Branch ---
* Series Switch FETs
M_SER_RX1 ANT CTRL_RX INT_RX1 0 CMOS_RF_NMOS W={w_ser_um}u L={self.process.l_min_um}u
M_SER_RX2 INT_RX1 CTRL_RX RX_PORT 0 CMOS_RF_NMOS W={w_ser_um}u L={self.process.l_min_um}u
* Shunt Switch FETs (Controlled by CTRL_TX to shunt when TX is ON)
M_SHU_RX RX_PORT CTRL_TX 0 0 CMOS_RF_NMOS W={w_shu_um}u L={self.process.l_min_um}u

* --- Body-Floating Substrate Resistors ---
R_BODY_TX1 INT_TX1 0 {r_body_kohm}k
R_BODY_RX1 INT_RX1 0 {r_body_kohm}k

* --- Compact BSIM RF Model Card ---
.model CMOS_RF_NMOS NMOS (LEVEL=54 VTO={self.process.vth} KP={self.process.kp}u LAMBDA={self.process.lambda_ch} CGSO={self.process.c_ov}p CGDO={self.process.c_ov}p)

* --- S-Parameter Frequency Sweep ---
.ac lin 51 {freq_ghz*0.5:.2f}G {freq_ghz*1.5:.2f}G

.end
"""
