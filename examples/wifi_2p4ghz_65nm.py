"""
Example 1: 2.4 GHz Wi-Fi / Bluetooth Class-AB Power Amplifier (TSMC 65nm RF CMOS).
Target Output Power: 24 dBm (250 mW)
Architecture: Differential Cascode with Cross-Coupled Neutralization + On-Chip Balun
"""

import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedPADesigner
from pa_engine.spice_exporter import generate_touchstone_s2p

def main():
    print("=== AutoPA-RF Example 1: 2.4 GHz Wi-Fi PA (TSMC 65nm RF) ===")
    
    designer = AutomatedPADesigner("65nm_rf")
    output = designer.synthesize(
        freq_ghz=2.4,
        pout_dbm=24.0,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=15.0
    )
    
    print(f"Target Frequency       : {output.freq_ghz} GHz")
    print(f"Output Power           : {output.pout_load_dbm} dBm ({output.pout_load_mw} mW)")
    print(f"Total Gate Width Wtot  : {output.w_total_um} um ({output.num_fingers} x {output.w_finger_um} um)")
    print(f"Power Added Eff (PAE)  : {output.pae_pct} %")
    print(f"Power Gain S21         : {output.gain_db} dB")
    print(f"Stability Factor K     : {output.k_factor} (Unconditionally Stable: {output.is_unconditionally_stable})")
    print(f"Balun Pri/Sec L        : {output.balun_lp_nh} nH / {output.balun_ls_nh} nH")
    print(f"Neutralization Cap Cneu: {output.c_neu_ff} fF")
    
    # Export netlist
    export_file = Path(__file__).parent / "wifi_2p4g_65nm_netlist.sp"
    export_file.write_text(output.spice_netlist, encoding="utf-8")
    print(f"-> Generated SPICE deck: {export_file.resolve()}")

if __name__ == "__main__":
    main()
