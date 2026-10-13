"""
Example 3: 28 GHz 5G mmWave Power Amplifier (TSMC 28nm HPC+ RF CMOS).
Target Output Power: 18 dBm (63 mW)
Architecture: Differential Cascode with Cross-Coupled Neutralization + mmWave Balun
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from pa_engine import AutomatedPADesigner

def main():
    print("=== AutoPA-RF Example 3: 28 GHz 5G mmWave PA (TSMC 28nm HPC+ RF) ===")
    
    designer = AutomatedPADesigner("28nm_hpc")
    output = designer.synthesize(
        freq_ghz=28.0,
        pout_dbm=18.0,
        op_class="AB",
        topology="differential_cascode",
        inductor_q=18.0
    )
    
    print(f"Target Frequency       : {output.freq_ghz} GHz (5G mmWave Band n257/n258)")
    print(f"Output Power           : {output.pout_load_dbm} dBm ({output.pout_load_mw} mW)")
    print(f"Total Gate Width Wtot  : {output.w_total_um} um")
    print(f"Transit Freq fT / fmax : {output.ft_ghz} GHz / {output.fmax_ghz} GHz")
    print(f"Power Added Eff (PAE)  : {output.pae_pct} %")
    print(f"Power Gain S21         : {output.gain_db} dB")
    print(f"mmWave Balun Lp / Ls   : {output.balun_lp_nh} nH / {output.balun_ls_nh} nH")
    print(f"mmWave Tuning Cap Cp/Cs: {output.balun_cp_pf} pF / {output.balun_cs_pf} pF")
    print(f"Neutralization Cneu    : {output.c_neu_ff} fF")
    
    export_file = Path(__file__).parent / "mmwave_28g_28nm_netlist.sp"
    export_file.write_text(output.spice_netlist, encoding="utf-8")
    print(f"-> Generated SPICE deck: {export_file.resolve()}")

if __name__ == "__main__":
    main()
