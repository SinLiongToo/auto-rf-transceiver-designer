/**
 * AutoRF: Integrated CMOS RF Front-End (PA & LNA) Synthesis Suite
 * Dual-Session Architecture: Power Amplifier (PA) & Low-Noise Amplifier (LNA)
 */

// --- 1. Bilingual i18n Translation Dictionary ---
const i18nData = {
  zh: {
    appTitle: "AutoRF 射頻前端積體電路自動化設計系統",
    appSubtitle: "整合式 CMOS 功率放大器 (PA) 與低雜訊放大器 (LNA) 端到端合成與模擬引擎",
    circuitSession: "設計模組",
    sessionPa: "功率放大器 (PA Session)",
    sessionLna: "低雜訊放大器 (LNA Session)",
    presetWifi24: "⚡ 經典 Wi-Fi 2.4 GHz (65nm)",
    presetWifi5: "⚡ Wi-Fi 6 5.2 GHz (40nm)",
    presetMmwave28: "⚡ 5G 毫米波 28 GHz (28nm)",
    presetMmwave39: "⚡ 39 GHz 5G 高頻段與衛星通訊 (28nm)",
    presetVband60: "⚡ 60 GHz WiGig / 無線高畫質傳輸 (28nm)",
    presetEband73: "🌐 73 GHz 5G/6G E-Band 骨幹回傳與通訊 (28nm)",
    presetRadar77: "🚗 車用雷達 77 GHz (72-79 GHz, 28nm)",
    presetImaging77: "🔬 77 GHz 工業物位感測與無損成像 (28nm)",
    presetSubGhz: "⚡ Sub-1 GHz IoT (180nm)",
    specTitle: "設計規格與製程設定",
    btnReset: "重置",
    lblFreq: "工作中心頻率 (GHz)",
    lblPout: "目標輸出功率 Pout (dBm)",
    lblLnaGain: "目標功率增益 Gain (dB)",
    lblLnaIdc: "直流偏置電流 Idc (mA)",
    lblProcess: "CMOS 製程技術節點",
    lblVdd: "供電電壓 Vdd (V)",
    lblClass: "工作模式放大器類別 (Operation Class)",
    lblTopology: "電路架構拓樸",
    topDiffCascode: "差動疊接 (Differential Cascode) - 推薦",
    topDiffCs: "差動共源極 (Differential CS)",
    topSingleCs: "單端共源極 (Single-Ended CS)",
    lblIndQ: "晶片上電感品質因子 Inductor Q",
    lblNeu: "差動交叉中和電容 (Cneu)",
    descNeu: "抵消 Cgd 彌勒效應，確保 k > 1 絕對穩定",
    tabLoadpull: "🎯 史密斯圖與等高線 (Smith Chart)",
    tabWaveforms: "🌊 暫態響應與頻寬 (Response)",
    tabSchematic: "📐 晶片電路圖與架構 (Schematic)",
    tabSpice: "💻 SPICE 網表與導出 (Export)",
    // PA labels
    fomPout: "輸出功率 Pout",
    fomPae: "功率附加效率 PAE",
    fomGain: "功率增益 Gain (S21)",
    fomRopt: "最佳阻抗 Ropt",
    fomWtot: "總電晶體寬度 Wtot",
    fomStability: "穩定度 Rollett K",
    stabUnconditional: "✓ 絕對無條件穩定",
    stabConditional: "⚠ 條件穩定 (需加強阻尼)",
    smithTitle: "複數負載牽引等功率等高線 (Smith Chart Load-Pull Contours)",
    smithSubtitle: "展示輸出端最佳阻抗 ZL,opt 與 -0.5dB, -1.0dB, -2.0dB 功率失配等高線",
    smithOptZ: "最佳阻抗 Zopt",
    smithOptGamma: "最佳反射係數 Γopt",
    smithPbo: "6-dB 功率回退效率",
    smith1dB: "1-dB 壓縮點 P1dB",
    waveTitle: "RF 暫態時域波形與動態負載線 (Vds(t) & Ids(t))",
    waveSubtitle: "根據導通角 (Conduction Angle) 與膝電壓 (Knee Voltage) 即時解析之大型訊號波形",
    waveTime: "時域時鐘波形 (2 個 RF 週期)",
    waveLoadline: "動態 I-V 負載線軌跡 (Ids vs Vds)",
    schTitle: "差動疊接中和型 CMOS PA 拓樸電路圖",
    schSubtitle: "內含交叉中和電容 (Cneu)、輸入匹配 (IMN) 與晶片內建變壓器 Balun 輸出匹配",
    // LNA labels
    fomLnaNf: "雜訊指數 (NF)",
    fomLnaNfMin: "最小雜訊 (NFmin)",
    fomLnaS11: "輸入回波損耗 (S11)",
    fomLnaIip3: "三階截波點 (IIP3)",
    fomLnaPdc: "直流總功耗 (Pdc)",
    smithLnaTitle: "史密斯圖雜訊阻抗等高圓 (Noise Circles on Smith Chart)",
    smithLnaSubtitle: "展示最佳雜訊源阻抗 Zopt,noise 與 +0.3dB, +0.6dB, +1.0dB 雜訊指數圓",
    smithLnaOptZ: "最佳雜訊源阻抗 Zopt",
    smithLnaGamma: "雜訊反射係數 Γopt",
    smithLnaRn: "等效雜訊電阻 Rn",
    smithLnaP1db: "輸入壓縮點 IP1dB",
    waveLnaTitle: "S 參數與雜訊指數頻率響應 (S21, S11 & NF Frequency Response)",
    waveLnaSubtitle: "展示帶內功率增益滾降、輸入匹配共振點與最低雜訊頻帶",
    waveLnaS21S11: "增益 S21 與反射 S11 (dB vs Freq)",
    waveLnaNfCurve: "雜訊指數 NF 曲線 (dB vs Freq)",
    schLnaTitle: "電感源極退化疊接 CMOS LNA 拓樸電路圖",
    schLnaSubtitle: "具備源極退化 Ls (無雜訊 50Ω 輸入實部) 與閘極微調電感 Lg 同步匹配",
    // Common BOM
    bomComp: "元件名稱",
    bomType: "類型",
    bomParam: "尺寸 / 參數",
    bomDesc: "設計作用說明",
    spiceTitle: "自動生成之 SPICE / Spectre 模擬電路網表",
    spiceSubtitle: "包含交流增益 (.ac)、雜訊分析 (.noise) 與高頻電晶體模型",
    btnCopy: "📋 複製網表",
    btnDownloadSp: "⬇️ 下載 .sp",
    btnDownloadS2p: "⬇️ 下載 .s2p",
    btnDownloadJson: "⬇️ 下載 .json",
    footerEngine: "AutoRF 核心射頻積體電路演算法則與工程規範",
    footCol1Title: "1. 功率放大器 (PA): 負載線與最大功率轉移",
    footCol1Desc: "依據 Cripps 準則，在有限的電源電壓與膝電壓拘束下，合成出汲極端最佳等效負載電阻 Ropt，並由輸出匹配網路予以吸收 Cds 寄生電容。",
    footCol2Title: "2. 低雜訊放大器 (LNA): 電感源極退化與同步雜訊匹配",
    footCol2Desc: "源極退化電感 Ls 產生無熱雜訊的等效實數輸入阻抗 50Ω，搭配閘極電感 Lg 諧振 Cgs，在最低雜訊指數 NF 下實現極佳的 S11 輸入匹配。",
    footCol3Title: "3. 壓控振盪器 (VCO): 負電導與 Leeson 雜訊",
    footCol3Desc: "互補交叉耦合對 (NMOS+PMOS) 提供負電導抵消 LC 諧振腔損耗，依據 Barkhausen 準則提供 3x 啟振裕度與 Leeson 相位雜訊最佳化。",
    footCol4Title: "4. 混頻器 (Mixer): 雙平衡 Gilbert 乘法單元",
    footCol4Desc: "吉爾伯特雙平衡架構提供天然的 LO-RF 與 LO-IF 隔離度，高速電流切換開關實現轉換增益 Gc 與高線性度 IIP3。"
  },
  en: {
    appTitle: "AutoRF Integrated CMOS RF PA & LNA Design Suite",
    appSubtitle: "End-to-End Synthesis & Simulation Engine for CMOS Power Amplifiers & Low-Noise Amplifiers",
    circuitSession: "Circuit Session",
    sessionPa: "Power Amplifier (PA)",
    sessionLna: "Low-Noise Amplifier (LNA)",
    presetWifi24: "⚡ Wi-Fi 2.4 GHz (65nm)",
    presetWifi5: "⚡ Wi-Fi 6 5.2 GHz (40nm)",
    presetMmwave28: "⚡ 5G mmWave 28 GHz (28nm)",
    presetMmwave39: "⚡ 39 GHz 5G High-Band & Satcom (28nm)",
    presetVband60: "⚡ 60 GHz WiGig / Wireless HDMI (28nm)",
    presetEband73: "🌐 73 GHz 5G/6G E-Band Backhaul & Telecom (28nm)",
    presetRadar77: "🚗 Automotive Radar 77 GHz (72-79 GHz, 28nm)",
    presetImaging77: "🔬 77 GHz Industrial Imaging & Level Sensing (28nm)",
    presetSubGhz: "⚡ Sub-1 GHz IoT (180nm)",
    specTitle: "Design Specs & PDK Setup",
    btnReset: "Reset",
    lblFreq: "Carrier Frequency (GHz)",
    lblPout: "Target Output Power Pout (dBm)",
    lblLnaGain: "Target Power Gain Gain (dB)",
    lblLnaIdc: "DC Drain Current Idc (mA)",
    lblProcess: "CMOS Technology Node",
    lblVdd: "Supply Voltage Vdd (V)",
    lblClass: "Operation Class",
    lblTopology: "Circuit Topology",
    topDiffCascode: "Differential Cascode (Recommended)",
    topDiffCs: "Differential Common-Source",
    topSingleCs: "Single-Ended Common-Source",
    lblIndQ: "On-Chip Inductor Q",
    lblNeu: "Cross-Coupled Neutralization (Cneu)",
    descNeu: "Cancels Cgd Miller feedback, guarantees k > 1 stability",
    tabLoadpull: "🎯 Smith Chart & Contours",
    tabWaveforms: "🌊 Transient & Frequency Response",
    tabSchematic: "📐 Circuit Schematic & BOM",
    tabSpice: "💻 SPICE Deck & Export",
    // PA
    fomPout: "Output Power Pout",
    fomPae: "Power Added Eff. (PAE)",
    fomGain: "Power Gain (S21)",
    fomRopt: "Optimum Load Ropt",
    fomWtot: "Total Gate Width Wtot",
    fomStability: "Rollett Stability K",
    stabUnconditional: "✓ Unconditionally Stable",
    stabConditional: "⚠ Conditionally Stable",
    smithTitle: "Smith Chart Load-Pull Contours",
    smithSubtitle: "Optimum load impedance ZL,opt and constant power mismatch contours (-0.5dB, -1dB, -2dB)",
    smithOptZ: "Optimum Zopt",
    smithOptGamma: "Optimum Γopt",
    smithPbo: "6-dB Back-off PAE",
    smith1dB: "1-dB Compression P1dB",
    waveTitle: "RF Transient Waveforms & Dynamic Load-Line",
    waveSubtitle: "Large-signal waveforms resolved from conduction angle and knee voltage limits",
    waveTime: "Time Domain Waveforms (2 RF Cycles)",
    waveLoadline: "Dynamic I-V Load-Line Trajectory",
    schTitle: "Differential Neutralized Cascode CMOS PA Topology",
    schSubtitle: "Featuring cross-neutralization Cneu, input match, and integrated on-chip transformer balun",
    // LNA
    fomLnaNf: "Noise Figure (NF)",
    fomLnaNfMin: "Minimum NF (NFmin)",
    fomLnaS11: "Input Return Loss (S11)",
    fomLnaIip3: "Input IP3 (IIP3)",
    fomLnaPdc: "DC Power Dissipation",
    smithLnaTitle: "Noise Circles on Smith Chart",
    smithLnaSubtitle: "Optimum source noise impedance Zopt,noise and constant noise figure circles (+0.3dB, +0.6dB, +1.0dB)",
    smithLnaOptZ: "Optimum Noise Zopt",
    smithLnaGamma: "Noise Reflection Γopt",
    smithLnaRn: "Noise Resistance Rn",
    smithLnaP1db: "Input P1dB",
    waveLnaTitle: "S-Parameters & Noise Figure vs Frequency",
    waveLnaSubtitle: "Gain peaking, input impedance matching resonance dip, and minimum noise frequency window",
    waveLnaS21S11: "Gain S21 & Return Loss S11 (dB vs Freq)",
    waveLnaNfCurve: "Noise Figure NF (dB vs Freq)",
    schLnaTitle: "Inductively Degenerated Cascode CMOS LNA Topology",
    schLnaSubtitle: "Featuring source degeneration Ls (noiseless 50Ω input match) and gate inductor Lg",
    // Common BOM
    bomComp: "Component",
    bomType: "Type",
    bomParam: "Dimension / Value",
    bomDesc: "Design Function",
    spiceTitle: "Generated SPICE / Spectre Simulation Deck",
    spiceSubtitle: "Includes AC gain (.ac), noise analysis (.noise), and scalable RF transistor models",
    btnCopy: "📋 Copy SPICE",
    btnDownloadSp: "⬇️ Download .sp",
    btnDownloadS2p: "⬇️ Download .s2p",
    btnDownloadJson: "⬇️ Download .json",
    footerEngine: "AutoRF Core Design Foundations",
    footCol1Title: "1. Power Amplifier (PA): Load-Line & Max Power Transfer",
    footCol1Desc: "Based on Cripps theory under supply voltage and knee voltage limits, optimum Ropt is synthesized and parasitic Cds is absorbed by matching network.",
    footCol2Title: "2. Low-Noise Amplifier (LNA): Inductive Degeneration & SNIM",
    footCol2Desc: "Source degeneration inductor Ls provides a noiseless 50Ω real input impedance, resonating with Lg and Cgs for simultaneous noise and power matching.",
    footCol3Title: "3. Voltage-Controlled Oscillator (VCO): Leeson Phase Noise & Tank",
    footCol3Desc: "Complementary cross-coupled pair (NMOS+PMOS) generates negative gm to cancel LC tank loss, providing 3x startup margin and Leeson phase noise optimization.",
    footCol4Title: "4. Down-Conversion Mixer: Double-Balanced Gilbert Cell",
    footCol4Desc: "Double-balanced topology delivers intrinsic LO-to-RF and LO-to-IF isolation with fast current commutation for conversion gain and high IIP3 linearity."
  }
};

let currentLang = "zh";

// --- 2. CMOS Technology PDK Models ---
const PDK_LIBRARY = {
  "65nm_rf": {
    name: "TSMC 65nm RF CMOS",
    node_nm: 65,
    vdd_nom: 1.2,
    vth: 0.35,
    v_knee: 0.20,
    kp: 380.0,
    j_max: 0.85,
    cox: 14.5,
    c_ov: 0.35,
    cj0: 1.1,
    cjsw: 0.4,
    r_poly_sheet: 10.0,
    ft_peak: 160.0,
    fmax_peak: 210.0,
    l_min: 0.065,
    lambda: 0.08,
    def_q: 15.0
  },
  "40nm_rf": {
    name: "TSMC 40nm RF LP",
    node_nm: 40,
    vdd_nom: 1.1,
    vth: 0.32,
    v_knee: 0.18,
    kp: 450.0,
    j_max: 0.95,
    cox: 16.0,
    c_ov: 0.30,
    cj0: 1.0,
    cjsw: 0.35,
    r_poly_sheet: 12.0,
    ft_peak: 190.0,
    fmax_peak: 250.0,
    l_min: 0.040,
    lambda: 0.10,
    def_q: 16.0
  },
  "28nm_hpc": {
    name: "TSMC 28nm HPC+ RF",
    node_nm: 28,
    vdd_nom: 0.9,
    vth: 0.28,
    v_knee: 0.15,
    kp: 520.0,
    j_max: 1.10,
    cox: 18.0,
    c_ov: 0.25,
    cj0: 0.95,
    cjsw: 0.30,
    r_poly_sheet: 15.0,
    ft_peak: 240.0,
    fmax_peak: 300.0,
    l_min: 0.028,
    lambda: 0.12,
    def_q: 18.0
  },
  "180nm_rf": {
    name: "TSMC 0.18μm RF CMOS",
    node_nm: 180,
    vdd_nom: 1.8,
    vth: 0.48,
    v_knee: 0.30,
    kp: 270.0,
    j_max: 0.60,
    cox: 8.5,
    c_ov: 0.40,
    cj0: 1.2,
    cjsw: 0.45,
    r_poly_sheet: 7.0,
    ft_peak: 55.0,
    fmax_peak: 75.0,
    l_min: 0.180,
    lambda: 0.05,
    def_q: 12.0
  }
};

// Global App State
const state = {
  session: "pa", // "pa" or "lna"
  freq_ghz: 2.4,
  node_key: "65nm_rf",
  vdd: 1.2,
  inductor_q: 15.0,
  activeTab: "tab1",

  // PA Specific
  pout_dbm: 24.0,
  op_class: "AB",
  topology: "diff_cascode",
  use_neutralization: true,

  // LNA Specific
  lna_gain_db: 18.0,
  lna_idc_ma: 6.0
};

let currentDesign = null;

// --- 3. Power Amplifier (PA) Synthesis Engine ---
function runPaSynthesis() {
  const pdk = PDK_LIBRARY[state.node_key];
  const freq = state.freq_ghz;
  const pout = state.pout_dbm;
  const vdd = state.vdd;
  const isDiff = state.topology.includes("diff");
  const isCascode = state.topology.includes("cascode");
  const stackCount = isCascode ? 2 : 1;
  const lossOmnDb = isDiff ? 0.75 : 1.10;

  const poutLoadMw = Math.pow(10, pout / 10);
  const poutDevMw = poutLoadMw * Math.pow(10, lossOmnDb / 10);
  const poutDevW = poutDevMw / 1000;

  const effectiveVdd = vdd * stackCount;
  const vSwingPk = Math.max(0.1, effectiveVdd - pdk.v_knee);
  let rOpt = 0, iMaxPk = 0, iDc = 0, effTheory = 65;

  const branchPoutW = isDiff ? poutDevW / 2 : poutDevW;

  if (state.op_class === "A") {
    rOpt = (vSwingPk * vSwingPk) / (2 * branchPoutW);
    iMaxPk = (2 * branchPoutW) / vSwingPk;
    iDc = (iMaxPk / 2) * (isDiff ? 2 : 1);
    effTheory = 50.0;
  } else if (state.op_class === "B") {
    rOpt = (vSwingPk * vSwingPk) / (2 * branchPoutW);
    iMaxPk = (2 * branchPoutW) / vSwingPk;
    iDc = (iMaxPk / Math.PI) * (isDiff ? 2 : 1);
    effTheory = 78.5;
  } else if (state.op_class === "E") {
    rOpt = (0.5768 * vSwingPk * vSwingPk) / branchPoutW;
    iMaxPk = 2.86 * (branchPoutW / vSwingPk);
    iDc = (branchPoutW / vSwingPk) * (isDiff ? 2 : 1);
    effTheory = 88.0;
  } else if (state.op_class === "F") {
    const vFund = (4 / Math.PI) * vSwingPk;
    rOpt = (vFund * vFund) / (2 * branchPoutW);
    iMaxPk = (2 * branchPoutW) / (vFund * 0.5);
    iDc = (iMaxPk / Math.PI) * (isDiff ? 2 : 1);
    effTheory = 85.0;
  } else { // Class AB
    const theta = (210 * Math.PI) / 180;
    const half = theta / 2;
    const denom = 1 - Math.cos(half);
    const alphaDc = (Math.sin(half) - half * Math.cos(half)) / (Math.PI * denom);
    const alphaFund = (theta - Math.sin(theta)) / (2 * Math.PI * denom);
    iMaxPk = (2 * branchPoutW) / (vSwingPk * alphaFund);
    rOpt = vSwingPk / (alphaFund * iMaxPk);
    iDc = alphaDc * iMaxPk * (isDiff ? 2 : 1);
    effTheory = 68.0;
  }

  const pDcW = effectiveVdd * iDc;
  const rOptDiff = rOpt * (isDiff ? 2 : 1);

  const branchImaxA = iMaxPk / (isDiff ? 2 : 1);
  const wFingerUm = 2.0;
  let wTotalUm = Math.max(12, (branchImaxA * 1000) / pdk.j_max);
  let numFingers = Math.max(4, Math.ceil(wTotalUm / wFingerUm));
  if (numFingers % 2 !== 0) numFingers++;
  wTotalUm = numFingers * wFingerUm;
  const numCellsM = Math.max(1, Math.ceil(numFingers / 16));

  const lGateUm = pdk.l_min;
  const gmMs = ((branchImaxA * 0.6) / 0.15) * 1000;
  const gdsMs = pdk.lambda * branchImaxA * 0.5 * 1000;

  const cgsFf = (2 / 3) * wTotalUm * lGateUm * pdk.cox + wTotalUm * pdk.c_ov;
  const cgdFf = wTotalUm * pdk.c_ov * 1.05;
  const cdsFf = (numFingers / 2) * 0.25 * wFingerUm * pdk.cj0 + (numFingers / 2) * (0.5 + wFingerUm) * pdk.cjsw;
  const rgOhm = (pdk.r_poly_sheet * wFingerUm) / (12 * lGateUm * numFingers) + Math.max(0.4, 4 / Math.sqrt(numFingers));
  const cNeuFf = state.use_neutralization ? cgdFf : 0;

  const omega = 2 * Math.PI * freq * 1e9;
  const turnsRatioN = Math.sqrt(Math.max(0.1, 50.0 / rOptDiff));
  const lpH = (rOptDiff * 0.75) / omega;
  const lsH = lpH * turnsRatioN * turnsRatioN;
  const kBalun = 0.78;

  const lpNh = lpH * 1e9;
  const lsNh = lsH * 1e9;
  const cResPf = (1 / (omega * omega * lpH * (1 - kBalun * kBalun))) * 1e12;
  const cpTuningPf = Math.max(0.01, cResPf - (cdsFf * 2 * 1e-3));
  const csTuningPf = Math.max(0.01, (1 / (omega * omega * lsH)) * 1e12);

  const rinReal = rgOhm + 1.0 / (5.0 * (gmMs * 1e-3));
  const qImn = Math.sqrt(Math.max(0.1, 50.0 / Math.max(1, rinReal) - 1));
  const limnNh = ((qImn * rinReal) / omega) * 1e9;
  const cimnPf = (1 / (omega * (50.0 / qImn))) * 1e12;

  const drainEffPct = Math.min(effTheory * 0.90, (poutLoadMw * 1e-3 / pDcW) * 100);
  const maxGain = 10 * 0.434 * Math.log(Math.pow(pdk.fmax_peak / Math.max(1, freq), 2)) - lossOmnDb;
  const gainDb = Math.min(19.0, Math.max(7.0, maxGain));
  const pinMw = poutLoadMw / Math.pow(10, gainDb / 10);
  const paePct = Math.min(drainEffPct - 2.5, Math.max(15, ((poutLoadMw - pinMw) / (pDcW * 1000)) * 100));

  const kFactor = state.use_neutralization ? 1.82 : 0.72;

  currentDesign = {
    session: "pa",
    freq,
    pout,
    poutMw: poutLoadMw,
    vdd,
    op_class: state.op_class,
    pdk,
    topology: state.topology,
    rOpt,
    rOptDiff,
    iMaxPk,
    iDc,
    pDcW,
    wTotalUm,
    numFingers,
    wFingerUm,
    numCellsM,
    lGateUm,
    gmMs,
    gdsMs,
    cgsFf,
    cgdFf,
    cdsFf,
    rgOhm,
    cNeuFf,
    lpNh,
    lsNh,
    kBalun,
    turnsRatioN,
    cpTuningPf,
    csTuningPf,
    lossOmnDb,
    limnNh,
    cimnPf,
    drainEffPct,
    gainDb,
    paePct,
    pboPae: Math.round(paePct * 0.45 * 10) / 10,
    p1db: Math.round((pout - 1.2) * 10) / 10,
    psat: Math.round((pout + 0.8) * 10) / 10,
    kFactor,
    isStable: state.use_neutralization && (kFactor > 1.0)
  };

  updateUI();
}

// --- 4. Low-Noise Amplifier (LNA) Synthesis Engine ---
function runLnaSynthesis() {
  const pdk = PDK_LIBRARY[state.node_key];
  const freq = state.freq_ghz;
  const vdd = state.vdd;
  const targetGain = state.lna_gain_db;
  const idcMa = state.lna_idc_ma;
  const omega = 2 * Math.PI * freq * 1e9;
  const rSource = 50.0;

  // Sizing via Power-Constrained Simultaneous Noise Matching (PCSNIM)
  const lGateUm = pdk.l_min;
  const coxFarad = pdk.cox * 1e-15;
  const wOptTheory = (1.0 / (3.0 * omega * (lGateUm * 1e-6) * (coxFarad * 1e12) * rSource)) * 1e6;
  const wIdc = idcMa / (pdk.j_max * 0.15);

  let wMainUm = Math.max(16.0, Math.min(240.0, 0.6 * wOptTheory + 0.4 * wIdc));
  let numFingers = Math.max(4, Math.ceil(wMainUm / 2.0));
  if (numFingers % 2 !== 0) numFingers++;
  wMainUm = numFingers * 2.0;

  const vov = Math.max(0.12, 0.22 - 0.05 * (pdk.node_nm / 65.0));
  const gmMs = (2.0 * idcMa) / vov;
  const gmSiemens = gmMs * 1e-3;

  const cgsFf = (2.0 / 3.0) * wMainUm * lGateUm * pdk.cox + wMainUm * pdk.c_ov;
  const cgsFarad = cgsFf * 1e-15;
  const cgdFf = wMainUm * pdk.c_ov * 1.05;
  const cdsFf = (numFingers / 2.0) * 0.25 * 2.0 * pdk.cj0;
  const rgOhm = (pdk.r_poly_sheet * 2.0) / (12.0 * lGateUm * numFingers) + 0.8;

  const ftGhz = (gmSiemens / (2.0 * Math.PI * cgsFarad)) / 1e9;

  // Source degeneration inductor Ls (Noiseless 50 Ohm real input impedance)
  const lsH = (rSource * cgsFarad) / Math.max(1e-4, gmSiemens);
  const lsNh = lsH * 1e9;

  // Gate resonance inductor Lg
  const lTotH = 1.0 / (omega * omega * cgsFarad);
  const lgH = Math.max(0.02e-9, lTotH - lsH);
  const lgNh = lgH * 1e9;

  // Drain tuned tank Ld || Cd
  const vGainLin = Math.pow(10, targetGain / 20.0);
  const rLoadNeeded = Math.min(800.0, vGainLin / Math.max(1e-3, gmSiemens));
  const ldH = rLoadNeeded / (state.inductor_q * omega);
  const ldNh = ldH * 1e9;
  const cdPf = (1.0 / (omega * omega * ldH)) * 1e12;
  const coutPf = Math.max(0.1, (1.0 / (omega * 50.0)) * 1e12);

  // Noise Figure (Shaeffer & Lee Model)
  const gammaCh = pdk.node_nm <= 65 ? 1.25 : 0.88;
  const fRatio = freq / Math.max(1.0, ftGhz);
  const nfMinLin = 1.0 + 2.4 * gammaCh * fRatio;
  const nfMinDb = 10.0 * Math.log10(nfMinLin);

  // Finite Inductor Q & Rg noise penalty
  const fIndLoss = (rgOhm + (omega * lgH / state.inductor_q)) / rSource;
  const nfRealLin = nfMinLin + fIndLoss;
  const nfDb = 10.0 * Math.log10(nfRealLin);

  const rnOhm = (gammaCh / gmSiemens) + rgOhm;
  const gammaOptMag = Math.min(0.85, 0.35 + 0.3 * fRatio);
  const gammaOptDeg = 180.0 * (1.0 - fRatio);

  const gainRealizedDb = targetGain - 10.0 * Math.log10(1.0 + 2.0 / state.inductor_q);
  const iip3Dbm = -12.0 + 20.0 * Math.log10(vov / 0.15) + 3.0 * (idcMa / 5.0);
  const p1dbInDbm = iip3Dbm - 9.6;
  const pDcMw = vdd * idcMa;

  currentDesign = {
    session: "lna",
    freq,
    vdd,
    pdk,
    targetGain,
    idcMa,
    pDcMw,
    wMainUm,
    wCascodeUm: wMainUm,
    lGateUm,
    numFingers,
    gmMs,
    cgsFf,
    cgdFf,
    cdsFf,
    rgOhm,
    ftGhz,
    lsNh,
    lgNh,
    ldNh,
    cdPf,
    coutPf,
    nfDb,
    nfMinDb,
    rnOhm,
    gammaOptMag,
    gammaOptDeg,
    gainDb: gainRealizedDb,
    s11Db: -18.5,
    s12Db: -45.0,
    kFactor: 2.6,
    isStable: true,
    iip3Dbm,
    p1dbInDbm
  };

  updateUI();
}

function runSynthesis() {
  if (state.session === "lna") {
    runLnaSynthesis();
  } else {
    runPaSynthesis();
  }
}

// --- 5. UI Updating & Rendering ---
function updateUI() {
  if (!currentDesign) return;
  const d = currentDesign;
  const t = i18nData[currentLang];
  const isLna = state.session === "lna";

  // Sliders and Badges
  document.getElementById("valFreq").innerText = `${d.freq.toFixed(1)} GHz`;
  document.getElementById("valVdd").innerText = `${d.vdd.toFixed(2)} V`;
  document.getElementById("valIndQ").innerText = `${state.inductor_q}`;

  if (!isLna) {
    document.getElementById("valPout").innerText = `${d.pout.toFixed(1)} dBm (${d.poutMw.toFixed(0)} mW)`;

    // Top Cards for PA
    document.getElementById("fomLabel1").innerText = t.fomPout;
    document.getElementById("fomVal1").innerText = `${d.pout.toFixed(1)} dBm`;
    document.getElementById("fomSub1").innerText = `${d.poutMw.toFixed(1)} mW`;

    document.getElementById("fomLabel2").innerText = t.fomPae;
    document.getElementById("fomVal2").innerText = `${d.paePct.toFixed(1)} %`;
    document.getElementById("fomSub2").innerText = `${t.fomPae}: ${d.drainEffPct.toFixed(1)}%`;

    document.getElementById("fomLabel3").innerText = t.fomGain;
    document.getElementById("fomVal3").innerText = `${d.gainDb.toFixed(1)} dB`;
    document.getElementById("fomSub3").innerText = `Isolation: -50 dB`;

    document.getElementById("fomLabel4").innerText = t.fomRopt;
    document.getElementById("fomVal4").innerText = `${d.rOpt.toFixed(1)} Ω`;
    document.getElementById("fomSub4").innerText = `Diff Ropt: ${d.rOptDiff.toFixed(1)} Ω`;

    document.getElementById("fomLabel5").innerText = t.fomWtot;
    document.getElementById("fomVal5").innerText = `${d.wTotalUm.toFixed(0)} μm`;
    document.getElementById("fomSub5").innerText = `${d.numFingers} NF (${d.numCellsM} Cells)`;

    document.getElementById("fomLabel6").innerText = t.fomStability;
    document.getElementById("fomVal6").innerText = `${d.kFactor.toFixed(2)}`;
    document.getElementById("fomSub6").innerText = d.isStable ? t.stabUnconditional : t.stabConditional;
    document.getElementById("fomSub6").className = d.isStable ? "text-xs text-green-400 font-semibold" : "text-xs text-rose-400 font-semibold";

    // Tab Header Texts
    document.getElementById("smithCardTitle").innerText = t.smithTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveTime;
    document.getElementById("canvas2Title").innerText = t.waveLoadline;
    document.getElementById("schCardTitle").innerText = t.schTitle;
    document.getElementById("schCardSubtitle").innerText = t.schSubtitle;

    document.getElementById("smithSubLabel1").innerText = t.smithOptZ;
    document.getElementById("smithStat1").innerText = `${d.rOpt.toFixed(1)} Ω`;
    document.getElementById("smithSubLabel2").innerText = t.smithOptGamma;
    document.getElementById("smithStat2").innerText = `0.52 ∠ 168°`;
    document.getElementById("smithSubLabel3").innerText = t.smithPbo;
    document.getElementById("smithStat3").innerText = `${d.pboPae.toFixed(1)} % PAE`;
    document.getElementById("smithSubLabel4").innerText = t.smith1dB;
    document.getElementById("smithStat4").innerText = `${d.p1db.toFixed(1)} dBm`;
  } else {
    // LNA Mode UI Updates
    document.getElementById("valLnaGain").innerText = `${state.lna_gain_db.toFixed(1)} dB`;
    document.getElementById("valLnaIdc").innerText = `${state.lna_idc_ma.toFixed(1)} mA`;

    // Top Cards for LNA
    document.getElementById("fomLabel1").innerText = t.fomLnaNf;
    document.getElementById("fomVal1").innerText = `${d.nfDb.toFixed(2)} dB`;
    document.getElementById("fomSub1").innerText = `NFmin: ${d.nfMinDb.toFixed(2)} dB`;

    document.getElementById("fomLabel2").innerText = t.fomGain;
    document.getElementById("fomVal2").innerText = `${d.gainDb.toFixed(1)} dB`;
    document.getElementById("fomSub2").innerText = `S11: ${d.s11Db.toFixed(1)} dB`;

    document.getElementById("fomLabel3").innerText = t.fomLnaIip3;
    document.getElementById("fomVal3").innerText = `${d.iip3Dbm.toFixed(1)} dBm`;
    document.getElementById("fomSub3").innerText = `IP1dB: ${d.p1dbInDbm.toFixed(1)} dBm`;

    document.getElementById("fomLabel4").innerText = t.fomLnaPdc;
    document.getElementById("fomVal4").innerText = `${d.pDcMw.toFixed(1)} mW`;
    document.getElementById("fomSub4").innerText = `${d.idcMa.toFixed(1)} mA @ ${d.vdd}V`;

    document.getElementById("fomLabel5").innerText = t.fomWtot;
    document.getElementById("fomVal5").innerText = `${d.wMainUm.toFixed(0)} μm`;
    document.getElementById("fomSub5").innerText = `${d.numFingers} NF (L=${d.lGateUm}μm)`;

    document.getElementById("fomLabel6").innerText = t.fomStability;
    document.getElementById("fomVal6").innerText = `${d.kFactor.toFixed(2)}`;
    document.getElementById("fomSub6").innerText = t.stabUnconditional;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";

    // Tab Header Texts
    document.getElementById("smithCardTitle").innerText = t.smithLnaTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithLnaSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveLnaTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveLnaSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveLnaS21S11;
    document.getElementById("canvas2Title").innerText = t.waveLnaNfCurve;
    document.getElementById("schCardTitle").innerText = t.schLnaTitle;
    document.getElementById("schCardSubtitle").innerText = t.schLnaSubtitle;

    document.getElementById("smithSubLabel1").innerText = t.smithLnaOptZ;
    document.getElementById("smithStat1").innerText = `50 - j${(d.rnOhm * 0.4).toFixed(1)} Ω`;
    document.getElementById("smithSubLabel2").innerText = t.smithLnaGamma;
    document.getElementById("smithStat2").innerText = `${d.gammaOptMag.toFixed(2)} ∠ ${d.gammaOptDeg.toFixed(0)}°`;
    document.getElementById("smithSubLabel3").innerText = t.smithLnaRn;
    document.getElementById("smithStat3").innerText = `${d.rnOhm.toFixed(1)} Ω`;
    document.getElementById("smithSubLabel4").innerText = t.smithLnaP1db;
    document.getElementById("smithStat4").innerText = `${d.p1dbInDbm.toFixed(1)} dBm`;
  }

  // Draw Visualizations
  drawSmithChart();
  drawWaveforms();
  drawSchematicSvg();
  updateBomTable();
  updateSpiceDeck();
}

// --- 6. Interactive Smith Chart Canvas ---
function drawSmithChart() {
  const canvas = document.getElementById("smithCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const R = (w / 2) - 25;

  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = "#090d16";
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, 2 * Math.PI);
  ctx.fill();

  // Outer boundary
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Horizontal axis
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(cx - R, cy);
  ctx.lineTo(cx + R, cy);
  ctx.stroke();

  function gammaToCanvas(re, im) {
    return { x: cx + re * R, y: cy - im * R };
  }

  // Resistance circles
  const rValues = [0.2, 0.5, 1.0, 2.0, 5.0];
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.9;
  rValues.forEach(r => {
    const cRe = r / (r + 1);
    const rad = (1 / (r + 1)) * R;
    const pt = gammaToCanvas(cRe, 0);
    ctx.beginPath();
    ctx.arc(pt.x, cy, rad, 0, 2 * Math.PI);
    ctx.stroke();
  });

  // Reactance arcs
  const xValues = [0.5, 1.0, 2.0, -0.5, -1.0, -2.0];
  xValues.forEach(x => {
    const rad = (1 / Math.abs(x)) * R;
    const pt = gammaToCanvas(1.0, 1.0 / x);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.clip();
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, rad, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  });

  // Center (50 Ohm)
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
  ctx.fill();

  const d = currentDesign;
  if (!d) return;

  if (d.session === "pa") {
    // PA: Draw Load-Pull Contours
    const z0 = 50.0;
    const gammaOptRe = (d.rOpt - z0) / (d.rOpt + z0);
    const gammaOptIm = 0.18;

    const contourLevels = [
      { delta: 0.0, color: "#38bdf8", lw: 3, label: "Pmax" },
      { delta: -0.5, color: "#34d399", lw: 1.8, label: "-0.5dB" },
      { delta: -1.0, color: "#fbbf24", lw: 1.5, label: "-1.0dB" },
      { delta: -2.0, color: "#f87171", lw: 1.2, label: "-2.0dB" }
    ];

    contourLevels.forEach(lvl => {
      if (lvl.delta === 0) {
        const pt = gammaToCanvas(gammaOptRe, gammaOptIm);
        ctx.fillStyle = lvl.color;
        ctx.shadowColor = lvl.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(`ZL,opt (${d.rOpt.toFixed(1)}Ω)`, pt.x + 8, pt.y - 6);
      } else {
        const pRatio = Math.pow(10, lvl.delta / 10);
        const rhoRad = Math.sqrt(Math.max(0, 1 - pRatio));
        ctx.strokeStyle = lvl.color;
        ctx.lineWidth = lvl.lw;
        ctx.beginPath();
        const nPts = 48;
        for (let i = 0; i <= nPts; i++) {
          const phi = (2 * Math.PI * i) / nPts;
          const rhoRe = rhoRad * Math.cos(phi);
          const rhoIm = rhoRad * Math.sin(phi);
          const gRe = gammaOptRe + rhoRe * (1 - gammaOptRe * gammaOptRe) * 0.9;
          const gIm = gammaOptIm + rhoIm * (1 - gammaOptIm * gammaOptIm) * 0.9;
          const pt = gammaToCanvas(gRe, gIm);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    });
  } else {
    // LNA: Draw Noise Circles (NFmin, +0.3dB, +0.6dB, +1.0dB)
    const gOptRe = d.gammaOptMag * Math.cos((d.gammaOptDeg * Math.PI) / 180);
    const gOptIm = d.gammaOptMag * Math.sin((d.gammaOptDeg * Math.PI) / 180);

    // Draw Optimum Noise Point (Zopt)
    const optPt = gammaToCanvas(gOptRe, gOptIm);
    ctx.fillStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(optPt.x, optPt.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText(`Γopt (${d.nfMinDb.toFixed(2)} dB)`, optPt.x + 8, optPt.y - 6);

    // Draw Noise Circles around Gamma_opt
    const noiseLevels = [
      { dNf: 0.3, color: "#34d399", label: "+0.3 dB" },
      { dNf: 0.6, color: "#fbbf24", label: "+0.6 dB" },
      { dNf: 1.0, color: "#f87171", label: "+1.0 dB" }
    ];

    noiseLevels.forEach(lvl => {
      // Noise parameter delta: N = (|Gamma_s - Gamma_opt|^2) / (1 - |Gamma_s|^2)
      const radFactor = Math.sqrt(lvl.dNf * 0.25);
      ctx.strokeStyle = lvl.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      const nPts = 48;
      for (let i = 0; i <= nPts; i++) {
        const phi = (2 * Math.PI * i) / nPts;
        const gRe = gOptRe + radFactor * Math.cos(phi) * (1 - gOptRe * gOptRe);
        const gIm = gOptIm + radFactor * Math.sin(phi) * (1 - gOptIm * gOptIm);
        const pt = gammaToCanvas(gRe, gIm);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.stroke();
    });
  }
}

// --- 7. Time Domain Waveforms / Frequency Response Canvas ---
function drawWaveforms() {
  const d = currentDesign;
  if (!d) return;

  if (d.session === "pa") {
    // PA: Draw Time domain Vds(t) and Ids(t) + Dynamic Load-Line
    const opClass = (d.op_class || "AB").toUpperCase();
    const twCanvas = document.getElementById("timeWaveCanvas");
    if (twCanvas) {
      const ctx = twCanvas.getContext("2d");
      const w = twCanvas.width, h = twCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      let vScalePeak = d.vdd * 2.2;
      if (opClass === "E") vScalePeak = d.vdd * 3.8;
      else if (opClass === "F") vScalePeak = d.vdd * 2.4;

      function getVds(phase) {
        if (opClass === "A" || opClass === "AB" || opClass === "B") {
          return d.vdd + (d.vdd - d.pdk.v_knee) * Math.sin(phase);
        } else if (opClass === "E") {
          const modPhase = (phase + Math.PI / 2) % (2 * Math.PI);
          return modPhase < Math.PI ? d.pdk.v_knee * 0.3 : d.pdk.v_knee * 0.3 + (3.56 * d.vdd) * Math.pow(Math.sin(modPhase - Math.PI), 1.8);
        } else if (opClass === "F") {
          const sq = (4.0 / Math.PI) * (Math.sin(phase) + (1.0 / 3.0) * Math.sin(3 * phase));
          return Math.max(d.pdk.v_knee, d.vdd + (d.vdd - d.pdk.v_knee) * sq * 0.85);
        }
        return d.vdd + (d.vdd - d.pdk.v_knee) * Math.sin(phase);
      }

      function getIds(phase) {
        if (opClass === "A") return Math.max(0.05, 0.5 + 0.45 * (-Math.sin(phase)));
        if (opClass === "AB") return Math.max(0, -Math.sin(phase) + 0.18) / 1.18;
        if (opClass === "B") return Math.max(0, -Math.sin(phase));
        if (opClass === "E") {
          const modPhase = (phase + Math.PI / 2) % (2 * Math.PI);
          return modPhase < Math.PI ? Math.sin(modPhase) : 0;
        }
        return Math.max(0, -Math.sin(phase));
      }

      ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const phase = (x / w) * (4 * Math.PI);
        const y = h - (getVds(phase) / vScalePeak) * (h - 45) - 20;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const phase = (x / w) * (4 * Math.PI);
        const y = h - getIds(phase) * (h - 55) - 20;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#38bdf8"; ctx.fillText("— Vds(t) 汲極電壓", 15, 20);
      ctx.fillStyle = "#f59e0b"; ctx.fillText("— Ids(t) 汲極電流", 150, 20);
    }

    // Dynamic Load-Line
    const llCanvas = document.getElementById("loadlineCanvas");
    if (llCanvas) {
      const ctx = llCanvas.getContext("2d");
      const w = llCanvas.width, h = llCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      let vScalePeak = d.vdd * 2.2;
      if (opClass === "E") vScalePeak = d.vdd * 3.8;
      else if (opClass === "F") vScalePeak = d.vdd * 2.4;

      const xKnee = (d.pdk.v_knee / vScalePeak) * (w - 40) + 25;
      ctx.strokeStyle = "#ef4444"; ctx.setLineDash([4, 4]); ctx.beginPath();
      ctx.moveTo(xKnee, 15); ctx.lineTo(xKnee, h - 25); ctx.stroke();
      ctx.setLineDash([]); ctx.fillStyle = "#ef4444"; ctx.font = "10px sans-serif";
      ctx.fillText(`Vknee (${d.pdk.v_knee}V)`, xKnee + 4, 30);

      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 2.5; ctx.beginPath();
      const nPts = 120;
      for (let i = 0; i <= nPts; i++) {
        const phase = (2 * Math.PI * i) / nPts;
        let vVal = 0, iVal = 0;
        if (opClass === "A") {
          vVal = d.vdd + (d.vdd - d.pdk.v_knee) * Math.cos(phase);
          iVal = (0.5 - 0.45 * Math.cos(phase)) * d.iMaxPk;
        } else if (opClass === "E") {
          const modPhase = (phase + Math.PI / 2) % (2 * Math.PI);
          vVal = modPhase < Math.PI ? d.pdk.v_knee * 0.3 : (3.56 * d.vdd) * Math.pow(Math.sin(modPhase - Math.PI), 1.8);
          iVal = modPhase < Math.PI ? Math.sin(modPhase) * d.iMaxPk : 0;
        } else {
          vVal = Math.max(d.pdk.v_knee, d.vdd + (d.vdd - d.pdk.v_knee) * Math.cos(phase));
          iVal = Math.max(0, (-Math.cos(phase) + 0.18) / 1.18) * d.iMaxPk;
        }
        const px = (vVal / vScalePeak) * (w - 50) + 25;
        const py = h - (iVal / Math.max(0.01, d.iMaxPk)) * (h - 55) - 25;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = "#34d399"; ctx.font = "bold 10px sans-serif";
      ctx.fillText(`Class-${opClass} 動態負載線`, w - 160, 20);
    }
  } else {
    // LNA: Draw Frequency Response Curves (S21, S11 & NF vs Frequency)
    const c1 = document.getElementById("timeWaveCanvas");
    if (c1) {
      const ctx = c1.getContext("2d");
      const w = c1.width, h = c1.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Draw S21 Gain Curve (Cyan peak at f0)
      ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const normF = (x / w) * 0.8 + 0.6; // 0.6 to 1.4 f0
        const delta = Math.abs(normF - 1.0);
        const gain = d.gainDb - 25.0 * (delta * delta);
        const y = h - ((gain + 10) / 40.0) * (h - 40) - 15;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw S11 Return Loss Curve (Emerald dip at f0)
      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 2.0; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const normF = (x / w) * 0.8 + 0.6;
        const delta = Math.abs(normF - 1.0);
        const s11 = -18.5 + 40.0 * (delta * delta);
        const y = h - ((s11 + 30) / 35.0) * (h - 40) - 15;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#38bdf8"; ctx.fillText(`— 增益 S21 (${d.gainDb.toFixed(1)} dB)`, 15, 20);
      ctx.fillStyle = "#10b981"; ctx.fillText(`— 回波損耗 S11 (${d.s11Db.toFixed(1)} dB)`, 180, 20);
    }

    // NF vs Frequency
    const c2 = document.getElementById("loadlineCanvas");
    if (c2) {
      const ctx = c2.getContext("2d");
      const w = c2.width, h = c2.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      ctx.strokeStyle = "#f43f5e"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const normF = (x / w) * 0.8 + 0.6;
        const delta = Math.abs(normF - 1.0);
        const nfVal = d.nfDb + 4.0 * (delta * delta);
        const y = h - (nfVal / 8.0) * (h - 40) - 20;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#f43f5e"; ctx.fillText(`— 雜訊指數 NF (${d.nfDb.toFixed(2)} dB)`, 15, 20);
      ctx.fillStyle = "#94a3b8"; ctx.font = "10px sans-serif";
      ctx.fillText(`中心頻率: ${d.freq.toFixed(1)} GHz`, w - 130, 20);
    }
  }
}

// --- 8. Circuit Topology SVG Schematic ---
function drawSchematicSvg() {
  const d = currentDesign;
  if (!d) return;
  const svg = document.getElementById("schematicSvg");
  if (!svg) return;

  if (d.session === "pa") {
    // PA Differential Cascode Schematic
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="32" fill="#38bdf8" font-size="13" font-weight="bold">CMOS Differential Neutralized PA Architecture (${d.freq} GHz)</text>
      <text x="510" y="32" fill="#94a3b8" font-size="11">Ropt_diff = ${d.rOptDiff.toFixed(1)} Ω | Pout = ${d.pout} dBm</text>

      <circle cx="45" cy="110" r="4" fill="#38bdf8" /><text x="20" y="105" fill="#38bdf8" font-size="10" font-weight="bold">RFIN+</text><path d="M49 110 L90 110" stroke="#38bdf8" stroke-width="1.8" />
      <circle cx="45" cy="230" r="4" fill="#38bdf8" /><text x="20" y="245" fill="#38bdf8" font-size="10" font-weight="bold">RFIN-</text><path d="M49 230 L90 230" stroke="#38bdf8" stroke-width="1.8" />

      <rect x="90" y="98" width="55" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" /><text x="96" y="114" fill="#cbd5e1" font-size="9">Limn ${d.limnNh.toFixed(2)}n</text>
      <rect x="90" y="218" width="55" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" /><text x="96" y="234" fill="#cbd5e1" font-size="9">Limn ${d.limnNh.toFixed(2)}n</text>

      <path d="M145 110 L190 110" stroke="#cbd5e1" stroke-width="1.8" />
      <path d="M145 230 L190 230" stroke="#cbd5e1" stroke-width="1.8" />

      <!-- Transistors M1 & M2 -->
      <path d="M190 95 L190 125" stroke="#a855f7" stroke-width="3" /><path d="M198 90 L198 130" stroke="#a855f7" stroke-width="2" />
      <path d="M198 95 L225 95 L225 80" stroke="#cbd5e1" stroke-width="1.8" /><path d="M198 125 L225 125 L225 140" stroke="#cbd5e1" stroke-width="1.8" />
      <text x="180" y="85" fill="#c084fc" font-size="11" font-weight="bold">M1 (W=${d.wTotalUm}μm)</text>

      <path d="M190 215 L190 245" stroke="#a855f7" stroke-width="3" /><path d="M198 210 L198 250" stroke="#a855f7" stroke-width="2" />
      <path d="M198 215 L225 215 L225 200" stroke="#cbd5e1" stroke-width="1.8" /><path d="M198 245 L225 245 L225 260" stroke="#cbd5e1" stroke-width="1.8" />
      <text x="180" y="278" fill="#c084fc" font-size="11" font-weight="bold">M2 (W=${d.wTotalUm}μm)</text>

      <!-- Neutralization Caps -->
      <path d="M185 110 L185 150 L310 150 L310 200" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.5" />
      <text x="230" y="145" fill="#f472b6" font-size="9" font-weight="bold">Cneu (${d.cNeuFf.toFixed(1)}fF)</text>
      <path d="M185 230 L185 190 L310 190 L310 80" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.5" />

      <!-- Balun Primary & Secondary -->
      <path d="M225 80 L350 80" stroke="#34d399" stroke-width="2" /><path d="M225 200 L350 200" stroke="#34d399" stroke-width="2" />
      <circle cx="410" cy="140" r="4" fill="#f59e0b" /><text x="420" y="144" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>
      <rect x="360" y="70" width="30" height="140" rx="6" fill="#047857" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5" />
      <rect x="415" y="70" width="30" height="140" rx="6" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.5" />
      <text x="390" y="65" fill="#94a3b8" font-size="9">k=${d.kBalun}</text>

      <!-- Load -->
      <rect x="540" y="125" width="40" height="30" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="2" /><text x="546" y="144" fill="#fb7185" font-size="10" font-weight="bold">50 Ω</text>
      <text x="600" y="144" fill="#fb7185" font-size="12" font-weight="bold">RFOUT</text><text x="600" y="160" fill="#94a3b8" font-size="10">${d.pout} dBm</text>
    `;
  } else {
    // LNA Inductively Degenerated Cascode Schematic
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="32" fill="#38bdf8" font-size="13" font-weight="bold">CMOS Inductively Degenerated Cascode LNA (${d.freq} GHz)</text>
      <text x="490" y="32" fill="#94a3b8" font-size="11">NF = ${d.nfDb.toFixed(2)} dB | Gain = ${d.gainDb.toFixed(1)} dB</text>

      <!-- RF Input Port -->
      <circle cx="45" cy="180" r="4" fill="#38bdf8" />
      <text x="20" y="175" fill="#38bdf8" font-size="11" font-weight="bold">RFIN</text>
      <path d="M49 180 L90 180" stroke="#38bdf8" stroke-width="2" />

      <!-- Gate Inductor Lg Box -->
      <rect x="90" y="168" width="70" height="25" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="96" y="184" fill="#38bdf8" font-size="10" font-weight="bold">Lg ${d.lgNh.toFixed(2)}nH</text>
      <path d="M160 180 L220 180" stroke="#cbd5e1" stroke-width="2" />

      <!-- Main Transistor M1 -->
      <path d="M220 165 L220 195" stroke="#a855f7" stroke-width="3" />
      <path d="M228 160 L228 200" stroke="#a855f7" stroke-width="2" />
      <text x="180" y="160" fill="#c084fc" font-size="11" font-weight="bold">M1 (W=${d.wMainUm}μm)</text>

      <!-- Source Degeneration Ls -->
      <path d="M228 195 L255 195 L255 230" stroke="#cbd5e1" stroke-width="2" />
      <rect x="235" y="230" width="40" height="35" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
      <text x="240" y="252" fill="#34d399" font-size="9" font-weight="bold">Ls ${d.lsNh.toFixed(3)}n</text>
      <path d="M255 265 L255 285 M248 285 L262 285" stroke="#64748b" stroke-width="1.5" />
      <text x="270" y="280" fill="#94a3b8" font-size="9">GND (Noiseless 50Ω)</text>

      <!-- Connection from M1 drain to M2 source (Cascode) -->
      <path d="M228 165 L255 165 L255 130" stroke="#cbd5e1" stroke-width="2" />

      <!-- Cascode Transistor M2 -->
      <path d="M220 100 L220 130" stroke="#a855f7" stroke-width="3" />
      <path d="M228 95 L228 135" stroke="#a855f7" stroke-width="2" />
      <text x="180" y="100" fill="#c084fc" font-size="11" font-weight="bold">M2 (Cascode)</text>

      <!-- Cascode Gate Bias & AC Bypass -->
      <path d="M220 115 L170 115" stroke="#cbd5e1" stroke-width="1.5" />
      <circle cx="165" cy="115" r="3" fill="#f59e0b" />
      <text x="120" y="118" fill="#fbbf24" font-size="9">Vbias,cas</text>

      <!-- M2 Drain to Tuned Tank Ld || Cd -->
      <path d="M228 100 L255 100 L255 60 L380 60" stroke="#cbd5e1" stroke-width="2" />

      <!-- Tank: Ld and Cd in parallel -->
      <rect x="380" y="45" width="60" height="28" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
      <text x="386" y="62" fill="#fbbf24" font-size="9" font-weight="bold">Ld ${d.ldNh.toFixed(2)}n</text>

      <rect x="380" y="85" width="60" height="28" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="386" y="102" fill="#38bdf8" font-size="9" font-weight="bold">Cd ${d.cdPf.toFixed(2)}p</text>

      <path d="M360 60 L360 99 L380 99" stroke="#cbd5e1" stroke-width="1.5" />
      <path d="M440 60 L460 60 L460 99 L440 99" stroke="#cbd5e1" stroke-width="1.5" />

      <!-- DC Supply VDD connection -->
      <circle cx="475" cy="60" r="4" fill="#f59e0b" />
      <text x="485" y="64" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>

      <!-- Output Coupling Cap Cout -->
      <path d="M460 60 L460 120 L520 120" stroke="#cbd5e1" stroke-width="2" />
      <line x1="520" y1="112" x2="520" y2="128" stroke="#38bdf8" stroke-width="2.5" />
      <line x1="526" y1="112" x2="526" y2="128" stroke="#38bdf8" stroke-width="2.5" />
      <text x="510" y="105" fill="#38bdf8" font-size="9">Cout ${d.coutPf.toFixed(2)}p</text>

      <!-- Output 50 Ohm Load -->
      <path d="M526 120 L570 120" stroke="#38bdf8" stroke-width="2" />
      <circle cx="575" cy="120" r="4" fill="#f43f5e" />
      <text x="585" y="124" fill="#fb7185" font-size="12" font-weight="bold">RFOUT (50Ω)</text>
      <text x="585" y="140" fill="#94a3b8" font-size="10">Gain = ${d.gainDb.toFixed(1)} dB</text>
    `;
  }
}

// --- 9. BOM Table & SPICE Deck ---
function updateBomTable() {
  const d = currentDesign;
  if (!d) return;
  const tbody = document.getElementById("bomTableBody");
  if (!tbody) return;

  let rows = [];
  if (d.session === "pa") {
    rows = [
      { name: "M1, M2", type: "Core RF NMOS", val: `W=${d.wTotalUm}μm, L=${d.lGateUm}μm, NF=${d.numFingers}`, desc: "差動主放大核心電晶體 (對稱多指狀佈局)" },
      { name: "Cneu1, Cneu2", type: "MIM / MOM 電容", val: `${d.cNeuFf.toFixed(1)} fF`, desc: "差動交叉中和電容 (抵消 Cgd，確保 k > 1)" },
      { name: "Balun_Pri (Lp)", type: "晶片頂層厚金屬線圈", val: `${d.lpNh.toFixed(2)} nH`, desc: "變壓器初級線圈 (含 VDD 中心抽頭偏壓)" },
      { name: "Balun_Sec (Ls)", type: "晶片頂層厚金屬線圈", val: `${d.lsNh.toFixed(2)} nH`, desc: "變壓器次級輸出線圈 (轉換為 50Ω 單端)" },
      { name: "Cp, Cs", type: "MIM 電容", val: `Cp=${d.cpTuningPf.toFixed(2)}pF, Cs=${d.csTuningPf.toFixed(2)}pF`, desc: "變壓器諧振微調電容 (吸收 Cds 寄生與漏感)" },
      { name: "Limn, Cimn", type: "輸入匹配 LC 元件", val: `L=${d.limnNh.toFixed(2)}nH, C=${d.cimnPf.toFixed(2)}pF`, desc: "輸入 50Ω 共軛阻抗匹配網路 (IMN)" }
    ];
  } else {
    rows = [
      { name: "M1 (Core)", type: "Input RF NMOS", val: `W=${d.wMainUm}μm, L=${d.lGateUm}μm, NF=${d.numFingers}`, desc: "共源極主放大電晶體 (雜訊最佳化尺寸)" },
      { name: "M2 (Cascode)", type: "Shielding RF NMOS", val: `W=${d.wCascodeUm}μm, L=${d.lGateUm}μm, NF=${d.numFingers}`, desc: "疊接電晶體 (消除 Cgd 米勒效應，高隔離度)" },
      { name: "Ls (Degeneration)", type: "晶片頂層高Q電感", val: `${(d.lsNh * 1000).toFixed(1)} pH (${d.lsNh.toFixed(3)} nH)`, desc: "源極退化電感 (無熱雜訊產生實數 50Ω 輸入阻抗)" },
      { name: "Lg (Gate Inductor)", type: "高Q平面螺旋電感", val: `${d.lgNh.toFixed(2)} nH`, desc: "閘極輸入電感 (與 Cgs 串聯諧振，抵消虛部抗性)" },
      { name: "Ld, Cd", type: "LC 諧振負載", val: `Ld=${d.ldNh.toFixed(2)}nH, Cd=${d.cdPf.toFixed(2)}pF`, desc: "汲極調諧負載槽 (決定峰值增益與帶寬)" },
      { name: "Cout", type: "MIM 耦合電容", val: `${d.coutPf.toFixed(2)} pF`, desc: "輸出隔直電容 (直接耦合至 50Ω 負載)" }
    ];
  }

  tbody.innerHTML = rows.map(r => `
    <tr class="hover:bg-slate-800/50">
      <td class="p-2.5 font-bold text-cyan-300">${r.name}</td>
      <td class="p-2.5 text-slate-300">${r.type}</td>
      <td class="p-2.5 font-mono text-emerald-300">${r.val}</td>
      <td class="p-2.5 text-slate-400">${r.desc}</td>
    </tr>
  `).join("");
}

function generateSpiceString() {
  const d = currentDesign;
  if (!d) return "";

  if (d.session === "lna") {
    return `* ==============================================================================
* AutoRF CMOS Low-Noise Amplifier (LNA) Simulation Deck
* Topology: Inductively Degenerated Cascode LNA (SNIM)
* Center Freq: ${d.freq} GHz | NF: ${d.nfDb.toFixed(2)} dB | Gain: ${d.gainDb.toFixed(1)} dB
* Technology: ${d.pdk.name} | Vdd: ${d.vdd} V | Idc: ${d.idcMa} mA
* ==============================================================================

.title CMOS Inductively Degenerated Cascode LNA (${d.freq} GHz)

VDD    vdd_node 0  DC ${d.vdd}
VBG1   vbias_m1 0  DC ${(d.pdk.vth + 0.18).toFixed(3)}
VBG2   vbias_m2 0  DC ${(d.pdk.vth + 0.50).toFixed(3)}

VIN    rf_in_gen 0  DC 0 AC 1.0
RS_IN  rf_in_gen rf_in 50.0

L_GATE rf_in     gate_ext { ${d.lgNh.toFixed(3)}n }
C_BLK  gate_ext  gate_dc  5.0p
R_BIAS vbias_m1  gate_dc  10k
R_GATE gate_dc   gate_m1  { ${d.rgOhm.toFixed(2)} }

M1     drain_m1 gate_m1 source_m1 0 CMOS_RF_NMOS W=${d.wMainUm}u L=${d.lGateUm}u NF=${d.numFingers}
L_SRC  source_m1 0 { ${d.lsNh.toFixed(4)}n }

M2     drain_m2 gate_m2 drain_m1 0 CMOS_RF_NMOS W=${d.wCascodeUm}u L=${d.lGateUm}u NF=${d.numFingers}
C_BP2  gate_m2   0 10.0p
R_BG2  vbias_m2  gate_m2 5k

L_DRAIN vdd_node drain_m2 { ${d.ldNh.toFixed(3)}n }
C_DRAIN vdd_node drain_m2 { ${d.cdPf.toFixed(3)}p }

C_OUT  drain_m2  rf_out { ${d.coutPf.toFixed(3)}p }
R_LOAD rf_out    0      50.0

.model CMOS_RF_NMOS NMOS (
+ LEVEL = 3
+ VTO   = ${d.pdk.vth}
+ KP    = ${d.pdk.kp}u
+ CGSO  = ${d.pdk.c_ov}n
+ CGDO  = ${d.pdk.c_ov}n
+ CJ    = ${d.pdk.cj0}m
+ CJSW  = ${d.pdk.cjsw}n
+ RSH   = ${d.pdk.r_poly_sheet}
)

.ac lin 51 ${(d.freq * 0.7).toFixed(2)}G ${(d.freq * 1.3).toFixed(2)}G
.noise v(rf_out) VIN lin 51 ${(d.freq * 0.7).toFixed(2)}G ${(d.freq * 1.3).toFixed(2)}G

.control
  run
  meas ac gain_max MAX vdb(rf_out)
  print gain_max
.endc
.end
`;
  } else {
    // PA SPICE Deck
    const periodNs = 1.0 / d.freq;
    const simStopNs = (periodNs * 30).toFixed(2);
    const simStepNs = (periodNs / 100).toFixed(4);
    return `* ==============================================================================
* AutoRF CMOS Power Amplifier Simulation Deck
* Carrier Freq: ${d.freq} GHz | Pout: ${d.pout} dBm | Technology: ${d.pdk.name}
* ==============================================================================

.title AutoRF CMOS PA (${d.freq} GHz, ${d.pout} dBm)

.param VDD_VAL = ${d.vdd}
.param FREQ_RF = ${d.freq}G

VDD    vdd_node 0  DC {VDD_VAL}
VBIAS  vbias_dc 0  DC ${(d.pdk.vth + 0.12).toFixed(3)}

VINP   rf_inp_raw 0  SIN(0 0.35 {FREQ_RF} 0 0)
VINN   rf_inn_raw 0  SIN(0 0.35 {FREQ_RF} 0 0 180)
RS_P   rf_inp_raw rf_inp 25.0
RS_N   rf_inn_raw rf_inn 25.0

L_IMN_P rf_inp    gate_p_dc ${d.limnNh.toFixed(3)}n
C_IMN_P gate_p_dc 0         ${d.cimnPf.toFixed(3)}p
L_IMN_N rf_inn    gate_n_dc ${d.limnNh.toFixed(3)}n
C_IMN_N gate_n_dc 0         ${d.cimnPf.toFixed(3)}p

M_CS_P drain_p gate_p_dc 0 0 CMOS_RF_NMOS W=${d.wTotalUm}u L=${d.lGateUm}u NF=${d.numFingers}
M_CS_N drain_n gate_n_dc 0 0 CMOS_RF_NMOS W=${d.wTotalUm}u L=${d.lGateUm}u NF=${d.numFingers}

C_NEU_1 gate_p_dc drain_n ${d.cNeuFf.toFixed(1)}f
C_NEU_2 gate_n_dc drain_p ${d.cNeuFf.toFixed(1)}f

L_PRI_P drain_p  vdd_node ${(d.lpNh / 2).toFixed(3)}n
L_PRI_N drain_n  vdd_node ${(d.lpNh / 2).toFixed(3)}n
C_PRI   drain_p  drain_n  ${d.cpTuningPf.toFixed(3)}p

L_SEC   rf_out_p rf_out_n ${d.lsNh.toFixed(3)}n
C_SEC   rf_out_p rf_out_n ${d.csTuningPf.toFixed(3)}p

K_PRI_SEC1 L_PRI_P L_SEC ${d.kBalun}
K_PRI_SEC2 L_PRI_N L_SEC ${d.kBalun}
K_PRI_PRI  L_PRI_P L_PRI_N 0.85

R_LOAD  rf_out_p rf_out_n 50.0

.model CMOS_RF_NMOS NMOS (
+ LEVEL = 3
+ VTO   = ${d.pdk.vth}
+ KP    = ${d.pdk.kp}u
+ CGSO  = ${d.pdk.c_ov}n
+ CGDO  = ${d.pdk.c_ov}n
+ CJ    = ${d.pdk.cj0}m
+ CJSW  = ${d.pdk.cjsw}n
+ RSH   = ${d.pdk.r_poly_sheet}
)

.tran ${simStepNs}n ${simStopNs}n ${(simStopNs - 5 * periodNs).toFixed(2)}n
.end
`;
  }
}

function updateSpiceDeck() {
  const codeEl = document.getElementById("spiceCodeBlock");
  if (codeEl) codeEl.innerText = generateSpiceString();
}

function downloadFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// --- 10. Initialization & Event Listeners ---
function initApp() {
  // Session Switch Buttons
  const paBtn = document.getElementById("sessionPaBtn");
  const lnaBtn = document.getElementById("sessionLnaBtn");
  const logo = document.getElementById("headerLogo");
  const statusBadge = document.getElementById("sessionStatusBadge");

  // Groups to toggle
  const paGroups = ["groupPaPout", "groupPaClass", "groupPaTopology", "groupPaNeu"];
  const lnaGroups = ["groupLnaGain", "groupLnaIdc"];

  function setSession(sessionName) {
    state.session = sessionName;
    if (sessionName === "pa") {
      paBtn.className = "session-btn flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm flex items-center justify-center gap-2 transition-all";
      lnaBtn.className = "session-btn flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 border border-transparent flex items-center justify-center gap-2 transition-all";
      logo.innerText = "PA";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: CMOS POWER AMPLIFIER (PA)";
      paGroups.forEach(id => document.getElementById(id)?.classList.remove("hidden"));
      lnaGroups.forEach(id => document.getElementById(id)?.classList.add("hidden"));
    } else {
      lnaBtn.className = "session-btn flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm flex items-center justify-center gap-2 transition-all";
      paBtn.className = "session-btn flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 border border-transparent flex items-center justify-center gap-2 transition-all";
      logo.innerText = "LNA";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: CMOS LOW-NOISE AMPLIFIER (LNA)";
      paGroups.forEach(id => document.getElementById(id)?.classList.add("hidden"));
      lnaGroups.forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    }
    runSynthesis();
  }

  paBtn.addEventListener("click", () => setSession("pa"));
  lnaBtn.addEventListener("click", () => setSession("lna"));

  // Inputs
  const freqInput = document.getElementById("inputFreq");
  freqInput.addEventListener("input", e => {
    state.freq_ghz = parseFloat(e.target.value);
    runSynthesis();
  });

  const poutInput = document.getElementById("inputPout");
  poutInput.addEventListener("input", e => {
    state.pout_dbm = parseFloat(e.target.value);
    runSynthesis();
  });

  const lnaGainInput = document.getElementById("inputLnaGain");
  lnaGainInput.addEventListener("input", e => {
    state.lna_gain_db = parseFloat(e.target.value);
    runSynthesis();
  });

  const lnaIdcInput = document.getElementById("inputLnaIdc");
  lnaIdcInput.addEventListener("input", e => {
    state.lna_idc_ma = parseFloat(e.target.value);
    runSynthesis();
  });

  const nodeSelect = document.getElementById("selectNode");
  nodeSelect.addEventListener("change", e => {
    state.node_key = e.target.value;
    state.vdd = PDK_LIBRARY[state.node_key].vdd_nom;
    document.getElementById("inputVdd").value = state.vdd;
    runSynthesis();
  });

  const vddInput = document.getElementById("inputVdd");
  vddInput.addEventListener("input", e => {
    state.vdd = parseFloat(e.target.value);
    runSynthesis();
  });

  const indqInput = document.getElementById("inputIndQ");
  indqInput.addEventListener("input", e => {
    state.inductor_q = parseFloat(e.target.value);
    runSynthesis();
  });

  // Class Buttons
  const classBtns = document.querySelectorAll(".class-btn");
  classBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      classBtns.forEach(b => b.className = "class-btn p-2 rounded border border-slate-700 bg-slate-800 text-slate-400 text-center");
      btn.className = "class-btn p-2 rounded border border-cyan-500 bg-cyan-500/20 text-cyan-400 font-bold text-center";
      state.op_class = btn.getAttribute("data-class");
      runSynthesis();
    });
  });

  document.getElementById("selectTopology").addEventListener("change", e => {
    state.topology = e.target.value;
    runSynthesis();
  });

  document.getElementById("checkNeu").addEventListener("change", e => {
    state.use_neutralization = e.target.checked;
    runSynthesis();
  });

  // Presets
  document.getElementById("presetSelect").addEventListener("change", e => {
    const val = e.target.value;
    if (val === "wifi24") {
      state.freq_ghz = 2.4; state.pout_dbm = 24.0; state.node_key = "65nm_rf"; state.vdd = 1.2;
    } else if (val === "wifi5") {
      state.freq_ghz = 5.2; state.pout_dbm = 22.0; state.node_key = "40nm_rf"; state.vdd = 1.1;
    } else if (val === "mmwave28") {
      state.freq_ghz = 28.0; state.pout_dbm = 18.0; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "mmwave39") {
      state.freq_ghz = 39.0; state.pout_dbm = 17.0; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "vband60") {
      state.freq_ghz = 60.0; state.pout_dbm = 15.5; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "eband73") {
      state.freq_ghz = 73.5; state.pout_dbm = 16.0; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "radar77") {
      state.freq_ghz = 76.5; state.pout_dbm = 14.5; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "imaging77") {
      state.freq_ghz = 78.0; state.pout_dbm = 15.0; state.node_key = "28nm_hpc"; state.vdd = 0.9;
    } else if (val === "subghz") {
      state.freq_ghz = 0.9; state.pout_dbm = 27.0; state.node_key = "180nm_rf"; state.vdd = 1.8;
    }
    freqInput.value = state.freq_ghz;
    poutInput.value = state.pout_dbm;
    nodeSelect.value = state.node_key;
    vddInput.value = state.vdd;
    runSynthesis();
  });

  // Reset
  document.getElementById("resetBtn").addEventListener("click", () => {
    state.freq_ghz = 2.4; state.pout_dbm = 24.0; state.node_key = "65nm_rf"; state.vdd = 1.2;
    state.op_class = "AB"; state.topology = "diff_cascode"; state.inductor_q = 15.0;
    state.use_neutralization = true; state.lna_gain_db = 18.0; state.lna_idc_ma = 6.0;
    freqInput.value = 2.4; poutInput.value = 24; nodeSelect.value = "65nm_rf";
    vddInput.value = 1.2; indqInput.value = 15;
    runSynthesis();
  });

  // Tabs
  const navTabs = document.querySelectorAll(".nav-tab");
  const tabContents = {
    tab1: document.getElementById("tabContent1"),
    tab2: document.getElementById("tabContent2"),
    tab3: document.getElementById("tabContent3"),
    tab4: document.getElementById("tabContent4")
  };

  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      state.activeTab = target;
      navTabs.forEach(t => t.className = "nav-tab px-4 py-2 rounded-xl font-medium text-slate-400 hover:text-slate-200 whitespace-nowrap");
      tab.className = "nav-tab px-4 py-2 rounded-xl font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 whitespace-nowrap";
      Object.keys(tabContents).forEach(k => {
        if (k === target) tabContents[k].classList.remove("hidden");
        else tabContents[k].classList.add("hidden");
      });
      if (target === "tab1") drawSmithChart();
      else if (target === "tab2") drawWaveforms();
      else if (target === "tab3") drawSchematicSvg();
    });
  });

  // Theme Toggle
  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    document.getElementById("themeToggleBtn").innerText = isDark ? "☀️" : "🌙";
    drawSmithChart(); drawWaveforms();
  });

  // Language Toggle
  document.getElementById("langToggleBtn").addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    applyLanguage();
  });

  // Copy & Download
  document.getElementById("copySpiceBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(generateSpiceString()).then(() => {
      alert(currentLang === "zh" ? "SPICE 網表已成功複製至剪貼簿！" : "SPICE deck copied to clipboard!");
    });
  });

  document.getElementById("downloadSpiceBtn").addEventListener("click", () => {
    const prefix = state.session === "lna" ? "autorf_lna" : "autorf_pa";
    downloadFile(`${prefix}_${state.freq_ghz}ghz.sp`, generateSpiceString());
  });

  document.getElementById("downloadS2pBtn").addEventListener("click", () => {
    const d = currentDesign;
    const prefix = state.session === "lna" ? "autorf_lna" : "autorf_pa";
    const s2p = `! AutoRF Touchstone S-Parameter File (${state.session.toUpperCase()})
! Center: ${d.freq} GHz | Z0 = 50 Ohm
# GHZ S DB R 50.0
! Freq       S11_dB   S11_deg   S21_dB   S21_deg   S12_dB   S12_deg   S22_dB   S22_deg
${(d.freq * 0.8).toFixed(3)}   -12.50   -144.0     ${(d.gainDb - 2.5).toFixed(2)}    -144.0   -45.00    -144.0   -11.20   -144.0
${d.freq.toFixed(3)}   -18.50   -180.0     ${d.gainDb.toFixed(2)}    -180.0   -45.00    -180.0   -15.00   -180.0
${(d.freq * 1.2).toFixed(3)}   -12.80   -216.0     ${(d.gainDb - 2.8).toFixed(2)}    -216.0   -45.00    -216.0   -11.80   -216.0
`;
    downloadFile(`${prefix}_${state.freq_ghz}ghz.s2p`, s2p);
  });

  document.getElementById("downloadJsonBtn").addEventListener("click", () => {
    downloadFile(`autorf_${state.session}_${state.freq_ghz}ghz.json`, JSON.stringify(currentDesign, null, 2));
  });

  // First run
  runSynthesis();
}

function applyLanguage() {
  const dict = i18nData[currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerText = dict[key];
  });
  updateUI();
}

window.addEventListener("DOMContentLoaded", initApp);
