"""
Example 2: 5.2 GHz Wi-Fi 6 / 6E Power Amplifier (TSMC 40nm RF CMOS).
Target Output Power: 22 dBm (160 mW)
Architecture: Differential Cascode with Cross-Coupled Neutralization + On-Chip Balun
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedPADesigner

def main():
    print("=== AutoPA-RF Example 2: 5.2 GHz Wi-Fi 6 PA (TSMC 40nm RF) ===")
    
    designer = AutomatedPADesigner("40nm_rf")
    output = designer.synthesize(
        freq_ghz=5.2,
        pout_dbm=22.0,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=16.0
    )
    
    print(f"Target Frequency       : {output.freq_ghz} GHz")
    print(f"Output Power           : {output.pout_load_dbm} dBm ({output.pout_load_mw} mW)")
    print(f"Total Gate Width Wtot  : {output.w_total_um} um")
    print(f"Power Added Eff (PAE)  : {output.pae_pct} %")
    print(f"Power Gain S21         : {output.gain_db} dB")
    print(f"Balun Pri/Sec L        : {output.balun_lp_nh} nH / {output.balun_ls_nh} nH")
    print(f"Neutralization Cap Cneu: {output.c_neu_ff} fF")
    
    export_file = Path(__file__).parent / "wifi6_5g2_40nm_netlist.sp"
    export_file.write_text(output.spice_netlist, encoding="utf-8")
    print(f"-> Generated SPICE deck: {export_file.resolve()}")

if __name__ == "__main__":
    main()
