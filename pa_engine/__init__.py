"""
AutoPA-RF: Automated CMOS RF Power Amplifier Design Suite.
"""

from .process_pdk import CMOSProcess, PDK_LIBRARY, get_process
from .cripps import calculate_cripps_loadline, LoadlineResult
from .transistor_sizing import size_transistor, TransistorDimension
from .matching_network import synthesize_all_matching, MatchingResult, TransformerBalun
from .stability import calculate_stability, StabilityMetrics
from .loadpull import generate_loadpull_data, LoadPullSummary
from .class_e_f import synthesize_class_e, synthesize_class_f
from .spice_exporter import generate_spice_netlist
from .designer import AutomatedPADesigner, PADesignOutput
from .lna_designer import AutomatedLNADesigner, LNADesignOutput
from .vco_designer import AutomatedVCODesigner, VCODesignOutput
from .mixer_designer import AutomatedMixerDesigner, MixerDesignOutput
from .switch_designer import AutomatedSwitchDesigner, SwitchDesignOutput
from .antenna_designer import AutomatedAntennaDesigner, AntennaDesignOutput

__all__ = [
    "CMOSProcess",
    "PDK_LIBRARY",
    "get_process",
    "calculate_cripps_loadline",
    "LoadlineResult",
    "size_transistor",
    "TransistorDimension",
    "synthesize_all_matching",
    "MatchingResult",
    "TransformerBalun",
    "calculate_stability",
    "StabilityMetrics",
    "generate_loadpull_data",
    "LoadPullSummary",
    "synthesize_class_e",
    "synthesize_class_f",
    "generate_spice_netlist",
    "AutomatedPADesigner",
    "PADesignOutput",
    "AutomatedLNADesigner",
    "LNADesignOutput",
    "AutomatedVCODesigner",
    "VCODesignOutput",
    "AutomatedMixerDesigner",
    "MixerDesignOutput",
    "AutomatedSwitchDesigner",
    "SwitchDesignOutput",
    "AutomatedAntennaDesigner",
    "AntennaDesignOutput",
]
