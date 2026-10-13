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
    closePath: () => {}
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
  documentElement: { getAttribute: () => 'dark', setAttribute: () => {} }
};
global.window = { addEventListener: () => {} };

const vm = require('vm');

// Run app.js in global context
try {
  vm.runInThisContext(appJsContent);
  console.log('[PASS] app.js evaluated successfully without syntax or execution errors.');

  // Test runSynthesis across classes
  const classesToTest = ['A', 'AB', 'B', 'E', 'F'];
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

  console.log('\n[ALL FRONTEND PA & LNA CHECKS PASSED]');
} catch (e) {
  console.error('[FAIL] Frontend verification failed:', e);
  process.exit(1);
}
