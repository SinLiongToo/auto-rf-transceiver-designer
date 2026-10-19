/**
 * Front-end JS Mathematical Engine Verification Script
 */

const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'web', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Mock browser environment for headless verification
const mockCanvas = {
  width: 400,
  height: 260,
  getContext: () => ({
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    arc: () => {},
    fill: () => {},
    fillText: () => {},
    setLineDash: () => {},
    save: () => {},
    restore: () => {},
    clip: () => {},
    closePath: () => {},
    quadraticCurveTo: () => {},
    bezierCurveTo: () => {}
  })
};

global.document = {
  getElementById: (id) => {
    if (id.includes('Canvas')) return mockCanvas;
    return {
      innerText: '',
      innerHTML: '',
      value: '2.4',
      className: '',
      classList: { add: () => {}, remove: () => {} },
      addEventListener: () => {}
    };
  },
  querySelectorAll: () => [],
  createElement: () => ({ href: '', download: '', click: () => {} }),
  body: { appendChild: () => {}, removeChild: () => {} },
  documentElement: { getAttribute: () => 'dark', setAttribute: () => {} }
};
global.window = { addEventListener: () => {} };
global.URL = { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} };
global.Blob = class Blob { constructor(content, opts) {} };

const vm = require('vm');

// Run app.js in global context
try {
  vm.runInThisContext(appJsContent);
  console.log('[PASS] app.js evaluated successfully without syntax or execution errors.');

  // Test runSynthesis across classes
  const classesToTest = ['A', 'AB', 'B', 'C', 'E', 'F'];
  classesToTest.forEach(c => {
    state.op_class = c;
    runSynthesis();
    if (!currentDesign || isNaN(currentDesign.rOpt) || isNaN(currentDesign.paePct)) {
      throw new Error(`Synthesis failed for Class ${c}`);
    }
    console.log(`[PASS] Front-end synthesis for Class ${c}: Ropt=${currentDesign.rOpt.toFixed(2)}Ω, PAE=${currentDesign.paePct.toFixed(1)}%`);
  });

  // Verify waveform rendering for all classes
  classesToTest.forEach(c => {
    state.op_class = c;
    runSynthesis();
    drawWaveforms();
    console.log(`[PASS] drawWaveforms() executed cleanly for Class ${c}`);
  });

  // Verify new PDK nodes (22nm FD-SOI & 130nm SiGe)
  ['22nm_fdsoi', '130nm_sige'].forEach(nk => {
    state.node_key = nk;
    state.vdd = PDK_LIBRARY[nk].vdd_nom;
    runSynthesis();
    console.log(`[PASS] PDK Node ${nk} (${PDK_LIBRARY[nk].name}): fT=${PDK_LIBRARY[nk].ft}GHz, PAE=${currentDesign.paePct.toFixed(1)}%`);
  });

  // Verify LNA session synthesis
  state.session = 'lna';
  state.freq_ghz = 2.4;
  state.lna_gain_db = 18.0;
  state.lna_idc_ma = 6.0;
  runSynthesis();
  if (!currentDesign || isNaN(currentDesign.nfDb) || isNaN(currentDesign.gainDb)) {
    throw new Error('Synthesis failed for LNA session');
  }
  console.log(`[PASS] LNA Session Synthesis (2.4GHz): NF=${currentDesign.nfDb.toFixed(2)}dB, Gain=${currentDesign.gainDb.toFixed(1)}dB, Ls=${currentDesign.lsNh.toFixed(3)}nH, Lg=${currentDesign.lgNh.toFixed(2)}nH`);

  drawSmithChart();
  drawWaveforms();
  drawSchematicSvg();
  console.log('[PASS] LNA Visualizations (Noise Circles, Freq Response, Schematic SVG) rendered cleanly');

  // Verify 77GHz LNA
  state.freq_ghz = 76.5;
  state.node_key = '28nm_hpc';
  runSynthesis();
  console.log(`[PASS] LNA Session Synthesis (77GHz Radar): NF=${currentDesign.nfDb.toFixed(2)}dB, Gain=${currentDesign.gainDb.toFixed(1)}dB, Ls=${(currentDesign.lsNh*1000).toFixed(1)}pH`);

  // Verify VCO session synthesis
  state.session = 'vco';
  state.freq_ghz = 76.5;
  state.node_key = '28nm_hpc';
  runSynthesis();
  if (!currentDesign || isNaN(currentDesign.pn1MDbc) || isNaN(currentDesign.lTankNh)) {
    throw new Error('Synthesis failed for VCO session');
  }
  console.log(`[PASS] VCO Session Synthesis (77GHz): PN=${currentDesign.pn1MDbc.toFixed(1)}dBc/Hz, Ltank=${currentDesign.lTankNh.toFixed(3)}nH, FOM=${currentDesign.fomDbc.toFixed(1)}dBc`);
  drawSchematicSvg();
  updateBomTable();
  console.log(`[PASS] VCO Schematic SVG and BOM rendered cleanly`);

  // Verify Mixer session synthesis
  state.session = 'mixer';
  state.freq_ghz = 76.5;
  runSynthesis();
  if (!currentDesign || isNaN(currentDesign.gainDb) || isNaN(currentDesign.iip3Dbm)) {
    throw new Error('Synthesis failed for Mixer session');
  }
  console.log(`[PASS] Mixer Session Synthesis (77GHz): Gc=${currentDesign.gainDb.toFixed(1)}dB, IIP3=${currentDesign.iip3Dbm.toFixed(1)}dBm, NF=${currentDesign.nfSsbDb.toFixed(1)}dB`);
  drawSchematicSvg();
  updateBomTable();
  console.log(`[PASS] Mixer Schematic SVG and BOM rendered cleanly`);

  // Verify Switch session synthesis
  state.session = 'switch';
  state.freq_ghz = 76.5;
  state.switch_p1db_dbm = 24.0;
  runSynthesis();
  if (!currentDesign || isNaN(currentDesign.ilDb) || isNaN(currentDesign.isoDb)) {
    throw new Error('Synthesis failed for Switch session');
  }
  console.log(`[PASS] Switch Session Synthesis (77GHz): IL=${currentDesign.ilDb.toFixed(2)}dB, ISO=${currentDesign.isoDb.toFixed(1)}dB, Stacks=${currentDesign.numStack}`);
  drawSchematicSvg();
  updateBomTable();
  console.log(`[PASS] Switch Schematic SVG and BOM rendered cleanly`);

  // Verify Antenna session synthesis
  state.session = 'antenna';
  state.freq_ghz = 76.5;
  state.antenna_substrate = 'aip_organic';
  runSynthesis();
  if (!currentDesign || isNaN(currentDesign.gainDbi) || isNaN(currentDesign.wPatchUm)) {
    throw new Error('Synthesis failed for Antenna session');
  }
  console.log(`[PASS] Antenna Session Synthesis (77GHz): Gain=${currentDesign.gainDbi.toFixed(1)}dBi, BW=${currentDesign.bwMhz.toFixed(0)}MHz, Patch W=${currentDesign.wPatchUm.toFixed(0)}um, L=${currentDesign.lPatchUm.toFixed(0)}um`);
  drawSchematicSvg();
  updateBomTable();
  console.log(`[PASS] Antenna Schematic SVG and BOM rendered cleanly`);

  // Verify Advanced Features: Link Budget & Phased Array
  drawLinkBudget();
  console.log(`[PASS] Cascaded Link Budget & Phased Array Beamforming rendered cleanly`);

  // Verify Linearity, DPD & Thermal SOA (Tab 9)
  state.session = 'pa';
  state.modulation = '256-QAM';
  state.dpd_enabled = true;
  drawLinearityAndThermal();
  console.log(`[PASS] Linearity (AM-AM/AM-PM/DPD), Two-Tone Spectrum & Thermal SOA rendered cleanly`);

  // Verify Matching Synthesizer
  state.match_rs = 50; state.match_rl = 15.8;
  drawMatchingSynthesizer();
  console.log(`[PASS] Interactive Matching Synthesizer rendered cleanly`);

  // Verify Die Area & Floorplan
  drawDieAreaFloorplan();
  console.log(`[PASS] Die Area & Floorplan estimator rendered cleanly`);

  // Verify PVT Corners
  drawPvtCorners();
  console.log(`[PASS] PVT Corners sensitivity matrix rendered cleanly`);

  // Verify Full Engineering Spec Report
  downloadFullReport();
  console.log(`[PASS] 1-Click Full Engineering Spec Report generated cleanly`);

  // Verify RF & Analog Filter (LP / HP / BPF / BSF) & Input/Output Signal Simulator (Tab 10)
  state.session = 'filter';
  ['LP', 'HP', 'BPF', 'BSF'].forEach(ft => {
    state.filter_type = ft;
    ['lf_plus_hf', 'lf_vs_hf_dual', 'square_pulse', 'pa_harmonics'].forEach(sm => {
      state.filter_sig_mode = sm;
      updateUI();
      drawFilterAndSignalSimulator();
    });
    const hLf = evaluateFilterTransferJS(0.6, 2.4, ft, 'butterworth', 3, 15);
    const hHf = evaluateFilterTransferJS(7.2, 2.4, ft, 'butterworth', 3, 15);
    console.log(`[PASS] Filter & Signal I/O Simulator (${ft}, N=3): LF_Gain=${hLf.magDb.toFixed(1)}dB, HF_Gain=${hHf.magDb.toFixed(1)}dB`);
  });

  console.log('\n[ALL FRONTEND 7-SESSION & 8-ADVANCED-FEATURE CHECKS PASSED]');
} catch (e) {
  console.error('[FAIL] Frontend verification failed:', e);
  process.exit(1);
}
