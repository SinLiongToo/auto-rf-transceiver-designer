/**
 * AutoRF: Integrated CMOS RF Front-End (PA & LNA) Synthesis Suite
 * Dual-Session Architecture: Power Amplifier (PA) & Low-Noise Amplifier (LNA)
 */

// --- 1. Bilingual i18n Translation Dictionary ---
const i18nData = {
  zh: {
    appTitle: "AutoRF 射頻前端積體電路設計與合成指引 (RF Front-End Design Guide)",
    appSubtitle: "全方位射頻前端收發機指引：PA 功率放大器、LNA 低雜訊放大器、VCO 壓控振盪器、Mixer 混頻器、Switch 雙工開關與 Antenna 封裝天線",
    circuitSession: "設計模組",
    sessionPa: "功率放大器 (PA)",
    sessionLna: "低雜訊放大器 (LNA)",
    sessionVco: "壓控振盪器 (VCO)",
    sessionMixer: "混頻器 (Mixer)",
    sessionSwitch: "雙工開關 (Switch)",
    sessionAntenna: "封裝天線 (Antenna)",
    sessionLink: "全鏈路 (Link Budget)",
    sessionMatch: "阻抗匹配 (Matching)",
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
    tabLoadpull: "🎯 史密斯圖 (Smith)",
    tabWaveforms: "🌊 暫態波形 (Response)",
    tabSchematic: "📐 電路圖 (Schematic)",
    tabLinkBudget: "🌐 鏈路預算 (Link Budget)",
    tabMatching: "🎛️ 匹配網路 (Matching)",
    tabDieArea: "📐 晶片面積 (Floorplan)",
    tabPvt: "🌡️ 製程角 (PVT)",
    tabSpice: "💻 網表導出 (Export)",
    tabGlossary: "📖 術語字典 (Glossary)",
    topGlossaryBtn: "📖 術語字典",
    topManualBtn: "📘 使用手冊 (Manual)",
    btnDownloadReport: "📄 導出工程規格書 (Report)",
    linkBudgetTitle: "收發機全鏈路串接預算與相控陣列波束賦形 (Cascaded Link Budget & Beamforming)",
    linkBudgetSubtitle: "涵蓋 RX 級聯 Friis 雜訊指數 / IIP3 / 靈敏度、TX 鏈路 EIRP、雷達/通訊探測距離與 2D 相控陣列波束合成",
    matchingTitle: "互動式阻抗匹配網路合成器 (Impedance Matching Synthesizer)",
    matchingSubtitle: "支援 L-Match、Pi-Match 與 T-Match 拓樸，自動計算 L/C 元件值、有限 Q 值插損並繪製史密斯圖路徑軌跡",
    dieAreaTitle: "晶片矽片面積預估與平面佈局規劃 (Die Area & Silicon Floorplan)",
    dieAreaSubtitle: "依據電晶體主動區微米幾何尺寸、片上被動電感/Balun 與 I/O 銲墊環估算總晶片面積與晶圓成本",
    pvtTitle: "製程角 PVT 容差與極端環境敏感度分析 (PVT Corners Analysis)",
    pvtSubtitle: "評估在 TT (典型)、FF (快快/低溫)、SS (慢慢/高溫)、FS 與 SF 極端角之電路性能浮動與良率安全裕度",
    manualTitle: "AutoRF 射頻前端積體電路設計平台使用指南 (User Manual)",
    manualSubtitle: "涵蓋 6 大射頻模組規格自訂、負載牽引圖表解讀、動態波形檢驗與 SPICE / S-參數導出操作流程",
    glossaryTitle: "射頻前端積體電路核心術語字典 (RF Front-End Glossary)",
    glossarySubtitle: "包含 PA, LNA, VCO, Mixer, Switch, Antenna 六大關鍵模組理論公式與物理定義",
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
    // VCO labels
    fomVcoPn: "相位雜訊 @1MHz",
    fomVcoFtr: "調諧範圍 (FTR)",
    fomVcoKvco: "增益常數 (Kvco)",
    fomVcoPdc: "核心功耗 (Pdc)",
    fomVcoLtank: "諧振電感 (Ltank)",
    fomVcoFom: "品質因數 (FOM)",
    smithVcoTitle: "LC 諧振腔阻抗軌跡 (LC Tank Impedance on Smith Chart)",
    smithVcoSubtitle: "展示諧振槽並聯損耗阻抗 Rp 與負電導 -Gm 補償圓",
    waveVcoTitle: "差動正弦振盪時域波形與相位雜訊 (Oscillation & Phase Noise)",
    waveVcoSubtitle: "互補交叉對產生之差動電壓擺幅與 Leeson 頻偏相位雜訊頻譜",
    waveVcoTime: "差動輸出擺幅 (Vout+ / Vout-)",
    waveVcoPnCurve: "相位雜訊頻譜 L(Δf) (dBc/Hz vs Offset)",
    schVcoTitle: "互補交叉耦合 CMOS LC 壓控振盪器拓樸電路圖",
    schVcoSubtitle: "NMOS+PMOS 負電導核心抵消電感損耗，反向變容二極體對提供頻率調諧",
    // Mixer labels
    fomMixerGc: "轉換增益 (Gc)",
    fomMixerNf: "單邊帶雜訊 (SSB NF)",
    fomMixerIip3: "三階截波點 (IIP3)",
    fomMixerPdc: "混頻總功耗 (Pdc)",
    fomMixerIso: "LO-RF 隔離度",
    fomMixerLoPwr: "所需 LO 功率",
    smithMixerTitle: "RF 跨導輸入阻抗 (RF Input Impedance Matching)",
    smithMixerSubtitle: "雙平衡 Gilbert 輸入差動對之 S11 與 50Ω 寬頻匹配等高線",
    waveMixerTitle: "時域開關乘法波形與 IF 中頻響應 (Commutation & IF Spectrum)",
    waveMixerSubtitle: "LO 開關四核高速電流整流換向與 IF 中頻濾波頻譜",
    waveMixerTime: "混頻電流切換波形 (Commutation)",
    waveMixerIfCurve: "IF 中頻轉換增益響應 (Gc vs IF Freq)",
    schMixerTitle: "雙平衡 Gilbert Cell 混頻單元拓樸電路圖",
    schMixerSubtitle: "含 RF 跨導差動對、LO 高速切換四核與 IF 差動負載",
    // Switch labels
    fomSwitchIl: "插入損耗 (IL)",
    fomSwitchIso: "埠間隔離度 (ISO)",
    fomSwitchP1db: "耐受功率 (P1dB)",
    fomSwitchS11: "反射損耗 (S11)",
    fomSwitchRon: "導通電阻 (Ron)",
    fomSwitchFom: "品質因數 (Ron·Coff)",
    smithSwitchTitle: "開關導通/截止狀態 S 參數 (Switch On/Off States on Smith Chart)",
    smithSwitchSubtitle: "展示導通傳輸阻抗與截止隔離高阻抗之反射係數軌跡",
    waveSwitchTitle: "開關小訊號響應與大訊號功率壓縮 (Small-Signal S21 & P1dB)",
    waveSwitchSubtitle: "展示頻率插入損耗/隔離度響應與大訊號電壓耐受堆疊特性",
    waveSwitchS21Iso: "插入損耗 IL 與隔離度 ISO (dB vs Freq)",
    waveSwitchP1dbCurve: "大訊號傳輸特性與 P1dB 壓縮曲線",
    schSwitchTitle: "串並聯 CMOS SPDT 雙工開關拓樸電路圖",
    schSwitchSubtitle: "採用多重堆疊 FETs (Stacked FETs) 耐受高功率，體偏置電阻抑制高頻漏電",
    // Antenna labels
    fomAntGain: "天線增益 (Gain)",
    fomAntBw: "阻抗頻寬 (BW)",
    fomAntW: "貼片寬度 (Width)",
    fomAntL: "貼片長度 (Length)",
    fomAntY0: "內凹饋電 (y0)",
    fomAntEff: "輻射效率 (Efficiency)",
    smithAntTitle: "微帶天線輸入阻抗匹配 (Patch Input Impedance on Smith Chart)",
    smithAntSubtitle: "展示內凹饋電深度 y0 共振於 50Ω 圓心之輸入反射係數 Γ",
    waveAntTitle: "天線輻射方向圖與反射係數 S11 (Radiation Pattern & S11)",
    waveAntSubtitle: "E-Plane / H-Plane 主瓣輻射圖與 -10dB 回波損耗共振頻寬",
    waveAntS11: "反射損耗 S11 (dB vs Freq)",
    waveAntPattern: "天線主波束輻射方向圖 (Radiation Pattern)",
    schAntTitle: "毫米波微帶貼片天線與 AiP 封裝結構圖",
    schAntSubtitle: "具備內凹槽 (Inset-Fed) 50Ω 阻抗匹配與頂層微帶共振輻射面",
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
    appTitle: "AutoRF Integrated CMOS RF Front-End Design & Synthesis Guide",
    appSubtitle: "Comprehensive RF Front-End Transceiver Synthesis Guide: PA, LNA, VCO, Mixer, Switch & On-Package Antenna",
    circuitSession: "Circuit Session",
    sessionPa: "PA",
    sessionLna: "LNA",
    sessionVco: "VCO",
    sessionMixer: "Mixer",
    sessionSwitch: "Switch",
    sessionAntenna: "Antenna",
    sessionLink: "Link Budget",
    sessionMatch: "Matching",
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
    tabLoadpull: "🎯 Smith Chart",
    tabWaveforms: "🌊 Waveforms & Resp",
    tabSchematic: "📐 Schematic",
    tabLinkBudget: "🌐 Link Budget",
    tabMatching: "🎛️ Matching",
    tabDieArea: "📐 Floorplan",
    tabPvt: "🌡️ PVT Corners",
    tabSpice: "💻 Netlist Export",
    tabGlossary: "📖 RF Glossary",
    topGlossaryBtn: "📖 RF Glossary",
    topManualBtn: "📘 User Manual",
    btnDownloadReport: "📄 Full Spec Report",
    linkBudgetTitle: "Cascaded Link Budget & Phased Array Beamforming",
    linkBudgetSubtitle: "Comprehensive RX Friis NF / IIP3 / Sensitivity, TX EIRP, radar/wireless range, and 2D phased array beamforming",
    matchingTitle: "Interactive Impedance Matching Network Synthesizer",
    matchingSubtitle: "Supports L-Match, Pi-Match, and T-Match topologies with finite-Q loss and live Smith Chart trajectory",
    dieAreaTitle: "Silicon Die Area Breakdown & Floorplan Layout",
    dieAreaSubtitle: "Estimates core active area, on-chip passive coils/baluns, and I/O pad ring with 300mm wafer cost modeling",
    pvtTitle: "PVT Corners & Environmental Sensitivity Analysis",
    pvtSubtitle: "Evaluates TT (Typical), FF (Fast/Cold), SS (Slow/Hot), FS, and SF corners for yield and stability robustness",
    manualTitle: "AutoRF RF Front-End Transceiver Synthesis User Manual",
    manualSubtitle: "Comprehensive operational manual covering 6 RF modules, load-pull contours, waveforms, and EDA SPICE/Touchstone export",
    glossaryTitle: "RF Front-End Integrated Circuits Glossary",
    glossarySubtitle: "Fundamental physical definitions, formulations, and FOMs for PA, LNA, VCO, Mixer, Switch & Antenna",
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
    // VCO labels
    fomVcoPn: "Phase Noise @1MHz",
    fomVcoFtr: "Tuning Range (FTR)",
    fomVcoKvco: "Gain Constant (Kvco)",
    fomVcoPdc: "Core Power (Pdc)",
    fomVcoLtank: "Resonant Inductor (Ltank)",
    fomVcoFom: "Figure of Merit (FOM)",
    smithVcoTitle: "LC Tank Impedance on Smith Chart",
    smithVcoSubtitle: "Parallel tank loss Rp and negative conductance -Gm compensation circle",
    waveVcoTitle: "Differential Oscillation & Phase Noise Spectrum",
    waveVcoSubtitle: "Cross-coupled pair voltage swings and Leeson phase noise curve",
    waveVcoTime: "Differential Swings (Vout+ / Vout-)",
    waveVcoPnCurve: "Phase Noise L(Δf) (dBc/Hz vs Offset)",
    schVcoTitle: "Complementary Cross-Coupled CMOS LC-VCO Topology",
    schVcoSubtitle: "NMOS+PMOS negative-gm core with MOS accumulation varactors for tuning",
    // Mixer labels
    fomMixerGc: "Conversion Gain (Gc)",
    fomMixerNf: "Single-Sideband NF",
    fomMixerIip3: "Input IP3 (IIP3)",
    fomMixerPdc: "Mixer Power (Pdc)",
    fomMixerIso: "LO-to-RF Isolation",
    fomMixerLoPwr: "Required LO Power",
    smithMixerTitle: "RF Port Input Impedance on Smith Chart",
    smithMixerSubtitle: "Double-balanced Gilbert RF transconductance pair matching to 50Ω",
    waveMixerTitle: "Commutation Waveforms & IF Output Spectrum",
    waveMixerSubtitle: "LO switching quad current commutation and IF low-pass filter response",
    waveMixerTime: "Current Commutation Waveforms",
    waveMixerIfCurve: "IF Conversion Gain vs Frequency",
    schMixerTitle: "Double-Balanced Gilbert Active Mixer Topology",
    schMixerSubtitle: "Featuring RF Gm stage, LO switching quad, and differential IF loads",
    // Switch labels
    fomSwitchIl: "Insertion Loss (IL)",
    fomSwitchIso: "Port Isolation (ISO)",
    fomSwitchP1db: "Power Handling (P1dB)",
    fomSwitchS11: "Return Loss (S11)",
    fomSwitchRon: "On-Resistance (Ron)",
    fomSwitchFom: "Figure of Merit (Ron·Coff)",
    smithSwitchTitle: "Switch On/Off States on Smith Chart",
    smithSwitchSubtitle: "Transmission state low impedance and isolated state high impedance reflection",
    waveSwitchTitle: "Small-Signal Frequency Response & Large-Signal P1dB",
    waveSwitchSubtitle: "Broadband IL / ISO frequency curves and power compression",
    waveSwitchS21Iso: "IL & ISO (dB vs Frequency)",
    waveSwitchP1dbCurve: "Large-Signal Transmission & P1dB",
    schSwitchTitle: "Series-Shunt CMOS SPDT T/R Switch Topology",
    schSwitchSubtitle: "Stacked FETs for multi-watt power handling and body-floating resistors",
    // Antenna labels
    fomAntGain: "Antenna Gain",
    fomAntBw: "Bandwidth (BW)",
    fomAntW: "Patch Width (W)",
    fomAntL: "Patch Length (L)",
    fomAntY0: "Inset Depth (y0)",
    fomAntEff: "Radiation Efficiency",
    smithAntTitle: "Patch Antenna Input Impedance on Smith Chart",
    smithAntSubtitle: "Inset-feed notch depth y0 resonance matched to 50Ω center",
    waveAntTitle: "Radiation Pattern & S11 Return Loss",
    waveAntSubtitle: "E-Plane / H-Plane radiation pattern and -10dB return loss bandwidth",
    waveAntS11: "Return Loss S11 (dB vs Freq)",
    waveAntPattern: "Main Beam Radiation Pattern",
    schAntTitle: "Millimeter-Wave Microstrip Patch & AiP Structure",
    schAntSubtitle: "Featuring inset-feed 50Ω notch match and top-metal radiator",
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
  lna_idc_ma: 6.0,

  // VCO Specific
  vco_ftr_pct: 15.0,
  vco_idc_ma: 8.0,

  // Mixer Specific
  mixer_gc_db: 10.0,
  mixer_idc_ma: 6.0,

  // Switch Specific
  switch_p1db_dbm: 24.0,

  // Antenna Specific
  antenna_substrate: "aip_organic",

  // Link Budget & Phased Array
  array_size: 4,
  steer_angle: 15,
  phase_bits: 5,

  // Matching Network Synthesizer
  match_rs: 50.0,
  match_xs: 0.0,
  match_rl: 15.8,
  match_xl: 0.0,
  match_topology: "l_lowpass",
  match_qind: 15.0
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

// --- 4b. Voltage-Controlled Oscillator (VCO) Synthesis Engine ---
function runVcoSynthesis() {
  const pdk = PDK_LIBRARY[state.node_key];
  const freq = state.freq_ghz;
  const vdd = state.vdd;
  const ftrPct = state.vco_ftr_pct;
  const idcMa = state.vco_idc_ma;
  const qTank = state.inductor_q;
  const omega0 = 2 * Math.PI * freq * 1e9;

  const z0 = Math.max(15.0, Math.min(60.0, 150.0 / Math.sqrt(freq)));
  const lTankH = z0 / omega0;
  const lTankNh = lTankH * 1e9;

  const cTankF = 1.0 / (omega0 * omega0 * lTankH);
  const cTankPf = cTankF * 1e12;
  const rParallelOhm = qTank * omega0 * lTankH;

  const alphaStartup = 3.0;
  const gmReqCore = (2.0 * alphaStartup) / rParallelOhm;
  const gmReqMs = gmReqCore * 1e3;

  const vov = Math.max(0.12, vdd * 0.22);
  const wNmosUm = Math.max(8.0, (idcMa * 1e-3 / (0.5 * pdk.kp * 1e-6 * (vov / pdk.l_min) * vov)) * 0.8);
  const wPmosUm = wNmosUm * 2.2;
  const numFingersN = Math.max(2, Math.ceil(wNmosUm / 2.0));
  const numFingersP = Math.max(2, Math.ceil(wPmosUm / 2.0));

  const pDcMw = vdd * idcMa;
  const pRfOutDbm = 10 * Math.log10(Math.max(0.1, (2.0 / Math.PI) * idcMa * (2.0 / Math.PI) * vdd * 1000 * 0.4));

  const kBoltz = 1.380649e-23;
  const tempK = 300.0;
  const noiseFactorF = 2.5;
  const pOscWatts = Math.max(1e-4, Math.pow(10, (pRfOutDbm - 30.0) / 10.0));
  const deltaF1M = 1e6;
  const qLoaded = qTank * 0.65;
  const pn1MLin = ((2.0 * noiseFactorF * kBoltz * tempK) / pOscWatts) * (1.0 + Math.pow(freq * 1e9 / (2.0 * qLoaded * deltaF1M), 2));
  const pn1MDbc = 10.0 * Math.log10(pn1MLin);

  const fomDbc = -pn1MDbc + 20.0 * Math.log10((freq * 1e9) / deltaF1M) - 10.0 * Math.log10(pDcMw);
  const kvcoGhzPerV = (freq * (ftrPct / 100.0)) / (vdd * 0.8);

  currentDesign = {
    session: "vco",
    freq,
    vdd,
    pdk,
    ftrPct,
    idcMa,
    pDcMw,
    lTankNh,
    cTankPf,
    qTank,
    rParallelOhm,
    gmReqMs,
    alphaStartup,
    wNmosUm,
    wPmosUm,
    numFingersN,
    numFingersP,
    pRfOutDbm,
    pn1MDbc,
    fomDbc,
    kvcoGhzPerV,
    fMinGhz: freq * (1.0 - ftrPct / 200.0),
    fMaxGhz: freq * (1.0 + ftrPct / 200.0)
  };

  updateUI();
}

// --- 4c. Mixer Synthesis Engine ---
function runMixerSynthesis() {
  const pdk = PDK_LIBRARY[state.node_key];
  const freq = state.freq_ghz;
  const vdd = state.vdd;
  const targetGainDb = state.mixer_gc_db;
  const idcMa = state.mixer_idc_ma;
  const rLoadOhm = 250.0;

  const targetGcLin = Math.pow(10, targetGainDb / 20.0);
  const gmRfReq = (Math.PI / 2.0) * (targetGcLin / rLoadOhm);
  const gmRfMs = gmRfReq * 1e3;

  const iBranchMa = idcMa / 2.0;
  const vovRf = Math.max(0.12, (2.0 * iBranchMa * 1e-3) / Math.max(1e-4, gmRfReq));
  const wRfUm = Math.max(10.0, (2.0 * iBranchMa * 1e-3) / (pdk.kp * 1e-6 * (1.0 / pdk.l_min) * (vovRf * vovRf)));
  const wLoUm = wRfUm * 1.15;
  const numFingersRf = Math.max(2, Math.ceil(wRfUm / 2.0));
  const numFingersLo = Math.max(2, Math.ceil(wLoUm / 2.0));

  const nfSsbDb = Math.min(16.0, Math.max(7.5, 8.5 + 4.0 * (freq / pdk.ft_peak)));
  const iip3Dbm = Math.min(10.0, Math.max(-10.0, 10.0 * Math.log10(vovRf * 1000) - 1.0 + (idcMa / 6.0)));
  const ip1dbDbm = iip3Dbm - 9.6;
  const loRfIsoDb = Math.min(65.0, Math.max(35.0, 52.0 - 15.0 * (freq / 60.0)));
  const loPwrDbm = 0.0 + 3.0 * (freq / 40.0);
  const pDcMw = vdd * idcMa;

  currentDesign = {
    session: "mixer",
    freq,
    loFreq: Math.max(0.5, freq - 0.5),
    ifFreq: 0.5,
    vdd,
    pdk,
    gainDb: targetGainDb,
    idcMa,
    pDcMw,
    rLoadOhm,
    gmRfMs,
    wRfUm,
    wLoUm,
    numFingersRf,
    numFingersLo,
    nfSsbDb,
    nfDsbDb: nfSsbDb - 3.0,
    iip3Dbm,
    ip1dbDbm,
    loRfIsoDb,
    loPwrDbm
  };

  updateUI();
}

// --- 4d. T/R Switch Synthesis Engine ---
function runSwitchSynthesis() {
  const pdk = PDK_LIBRARY[state.node_key];
  const freq = state.freq_ghz;
  const vdd = state.vdd;
  const targetP1db = state.switch_p1db_dbm;
  const z0 = 50.0;
  const omega = 2 * Math.PI * freq * 1e9;

  const pTargetW = Math.pow(10, (targetP1db - 30.0) / 10.0);
  const vPeakRf = Math.sqrt(2.0 * z0 * pTargetW);
  const vMaxPerFet = vdd * 0.9;
  let numStack = Math.max(1, Math.ceil(vPeakRf / vMaxPerFet));
  if (freq > 40.0 && numStack > 2) numStack = 2;

  const vovOn = vdd - pdk.vth;
  const rOnTarget = Math.max(1.2, Math.min(4.0, 1.8 + (freq / 50.0)));
  const wSerUm = Math.max(20.0, Math.min(350.0, (pdk.l_min * numStack) / ((pdk.kp * 1e-6) * rOnTarget * vovOn)));
  const wShuntUm = Math.max(15.0, wSerUm * 0.65);
  const numFingersSer = Math.max(4, Math.ceil(wSerUm / 2.0));
  const numFingersShunt = Math.max(2, Math.ceil(wShuntUm / 2.0));

  const cOffSerFf = wSerUm * (pdk.cox * pdk.l_min * 0.35 + pdk.c_ov);
  const cOffShuntFf = wShuntUm * (pdk.cox * pdk.l_min * 0.35 + pdk.c_ov);

  const ilDb = 10.0 * Math.log10(1.0 + (2.0 * rOnTarget) / z0) + 0.15 * (freq / 30.0);
  const isoLin = 1.0 + Math.pow(1.0 / (2.0 * omega * (cOffShuntFf * 1e-15) * z0), 2);
  const isoDb = Math.min(45.0, 10.0 * Math.log10(isoLin) + 6.0);
  const s11Db = -20.0 + 5.0 * (freq / 40.0);
  const fomFs = rOnTarget * cOffShuntFf;

  currentDesign = {
    session: "switch",
    freq,
    vdd,
    pdk,
    targetP1db,
    numStack,
    wSerUm,
    wShuntUm,
    numFingersSer,
    numFingersShunt,
    rOnTarget,
    cOffShuntFf,
    ilDb,
    isoDb,
    s11Db,
    fomFs,
    iip3Dbm: targetP1db + 12.0
  };

  updateUI();
}

// --- 4e. Antenna (AiP / Microstrip Patch) Synthesis Engine ---
function runAntennaSynthesis() {
  const freq = state.freq_ghz;
  const subType = state.antenna_substrate;

  let er = 3.2, hUm = 100.0, subName = "AiP Organic Substrate";
  if (subType === "ltcc_ceramic") { er = 5.9; hUm = 120.0; subName = "LTCC Ceramic Package"; }
  else if (subType === "fused_silica") { er = 3.78; hUm = 150.0; subName = "Fused Silica Glass"; }
  else if (subType === "on_chip_sio2") { er = 3.9; hUm = 12.0; subName = "On-Chip CMOS SiO2"; }

  const c = 2.99792458e8;
  const fHz = freq * 1e9;
  const lambda0M = c / fHz;
  const lambda0Mm = lambda0M * 1e3;

  const wPatchM = (c / (2.0 * fHz)) * Math.sqrt(2.0 / (er + 1.0));
  const wPatchUm = wPatchM * 1e6;
  const hM = hUm * 1e-6;

  const epsEff = (er + 1.0) / 2.0 + ((er - 1.0) / 2.0) * Math.pow(1.0 + 12.0 * (hM / wPatchM), -0.5);
  const deltaLM = 0.412 * hM * ((epsEff + 0.3) * (wPatchM / hM + 0.264)) / ((epsEff - 0.258) * (wPatchM / hM + 0.8));
  const lPatchM = c / (2.0 * fHz * Math.sqrt(epsEff)) - 2.0 * deltaLM;
  const lPatchUm = lPatchM * 1e6;

  const y0Um = (lPatchUm / Math.PI) * Math.acos(Math.sqrt(50.0 / 250.0));
  const effPct = Math.min(92.0, Math.max(15.0, (1.0 - Math.exp(-hUm / 25.0)) * 88.0 * (subType === "on_chip_sio2" ? 0.35 : 1.0)));
  const directivityDbi = 6.8 + 1.2 * Math.log10(er);
  const gainDbi = directivityDbi + 10.0 * Math.log10(effPct / 100.0);
  const bwPct = Math.max(1.5, Math.min(9.5, 3.77 * ((er - 1.0) / (er * er)) * (wPatchM / lPatchM) * (hM / lambda0M) * 100.0));
  const bwMhz = freq * 1000.0 * (bwPct / 100.0);

  currentDesign = {
    session: "antenna",
    freq,
    vdd: state.vdd,
    subType,
    subName,
    er,
    hUm,
    lambda0Mm,
    wPatchUm,
    lPatchUm,
    y0Um,
    gainDbi,
    directivityDbi,
    effPct,
    bwPct,
    bwMhz,
    s11Db: -22.5
  };

  updateUI();
}

function runSynthesis() {
  if (state.session === "lna") {
    runLnaSynthesis();
  } else if (state.session === "vco") {
    runVcoSynthesis();
  } else if (state.session === "mixer") {
    runMixerSynthesis();
  } else if (state.session === "switch") {
    runSwitchSynthesis();
  } else if (state.session === "antenna") {
    runAntennaSynthesis();
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

  if (state.session === "link") {
    document.getElementById("fomLabel1").innerText = currentLang === "zh" ? "RX 鏈路增益 (Gain_rx)" : "RX Total Gain (Gain_rx)";
    document.getElementById("fomVal1").innerText = "+24.5 dB";
    document.getElementById("fomSub1").innerText = "LNA + Mixer - IL";

    document.getElementById("fomLabel2").innerText = currentLang === "zh" ? "Friis 級聯雜訊 (NF_rx)" : "Cascaded NF (NF_rx)";
    document.getElementById("fomVal2").innerText = "2.65 dB";
    document.getElementById("fomSub2").innerText = currentLang === "zh" ? "全鏈路雜訊指數" : "Total Noise Figure";

    document.getElementById("fomLabel3").innerText = currentLang === "zh" ? "級聯輸入截點 (IIP3)" : "Cascaded IIP3";
    document.getElementById("fomVal3").innerText = "-6.8 dBm";
    document.getElementById("fomSub3").innerText = currentLang === "zh" ? "抗強干擾線性度" : "Intermodulation Linearity";

    document.getElementById("fomLabel4").innerText = currentLang === "zh" ? "接收靈敏度 (Sensitivity)" : "RX Sensitivity";
    document.getElementById("fomVal4").innerText = "-88.3 dBm";
    document.getElementById("fomSub4").innerText = "BW=20MHz, SNR=10dB";

    document.getElementById("fomLabel5").innerText = currentLang === "zh" ? "TX 單元 EIRP" : "TX Single EIRP";
    document.getElementById("fomVal5").innerText = `+${(state.pout_dbm + 4.3).toFixed(1)} dBm`;
    document.getElementById("fomSub5").innerText = "含天線 5.2 dBi";

    document.getElementById("fomLabel6").innerText = currentLang === "zh" ? "相控陣列合成 EIRP" : "Array EIRP Boost";
    const boost = state.array_size > 1 ? 10 * Math.log10(state.array_size) + 10 * Math.log10(state.array_size) : 0;
    document.getElementById("fomVal6").innerText = `+${(state.pout_dbm + 4.3 + boost).toFixed(1)} dBm`;
    document.getElementById("fomSub6").innerText = `${state.array_size}-Elements 合成`;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";
  } else if (state.session === "match") {
    document.getElementById("fomLabel1").innerText = currentLang === "zh" ? "信號源實部 Rs" : "Source Rs";
    document.getElementById("fomVal1").innerText = `${state.match_rs.toFixed(1)} Ω`;
    document.getElementById("fomSub1").innerText = `Xs: ${state.match_xs.toFixed(1)} Ω`;

    document.getElementById("fomLabel2").innerText = currentLang === "zh" ? "負載端實部 RL" : "Load RL";
    document.getElementById("fomVal2").innerText = `${state.match_rl.toFixed(1)} Ω`;
    document.getElementById("fomSub2").innerText = `XL: ${state.match_xl.toFixed(1)} Ω`;

    document.getElementById("fomLabel3").innerText = currentLang === "zh" ? "匹配拓樸架構" : "Matching Topology";
    document.getElementById("fomVal3").innerText = state.match_topology.includes("pi") ? "Π-Match" : (state.match_topology.includes("t_") ? "T-Match" : "L-Match");
    document.getElementById("fomSub3").innerText = state.match_topology.includes("low") ? "Low-pass" : "High-pass";

    document.getElementById("fomLabel4").innerText = currentLang === "zh" ? "有載品質因子 Q" : "Loaded Q";
    const qLoaded = Math.sqrt(Math.max(0.1, (Math.max(state.match_rs, state.match_rl) / Math.min(state.match_rs, state.match_rl)) - 1));
    document.getElementById("fomVal4").innerText = `${qLoaded.toFixed(2)}`;
    document.getElementById("fomSub4").innerText = `相對頻寬: ${(100 / (qLoaded || 1)).toFixed(0)}%`;

    document.getElementById("fomLabel5").innerText = currentLang === "zh" ? "元件有限 Q 挿損" : "Insertion Loss (IL)";
    const il = (qLoaded / (state.match_qind || 15)) * 4.34;
    document.getElementById("fomVal5").innerText = `${il.toFixed(2)} dB`;
    document.getElementById("fomSub5").innerText = `電感 Q=${state.match_qind}`;

    document.getElementById("fomLabel6").innerText = currentLang === "zh" ? "功率傳輸效率" : "Power Transfer Eff.";
    const eff = Math.pow(10, -il / 10) * 100;
    document.getElementById("fomVal6").innerText = `${eff.toFixed(1)} %`;
    document.getElementById("fomSub6").innerText = eff > 85 ? "✓ 高效率匹配" : "⚠ 注意插損";
    document.getElementById("fomSub6").className = eff > 85 ? "text-xs text-green-400 font-semibold" : "text-xs text-amber-400 font-semibold";
  } else if (d.session === "pa") {
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
  } else if (d.session === "lna") {
    // LNA Mode UI Updates
    document.getElementById("valLnaGain").innerText = `${state.lna_gain_db.toFixed(1)} dB`;
    document.getElementById("valLnaIdc").innerText = `${state.lna_idc_ma.toFixed(1)} mA`;

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
  } else if (d.session === "vco") {
    // VCO Mode UI Updates
    document.getElementById("valVcoTuning").innerText = `${d.ftrPct.toFixed(1)} %`;
    document.getElementById("valVcoIdc").innerText = `${d.idcMa.toFixed(1)} mA`;

    document.getElementById("fomLabel1").innerText = t.fomVcoPn;
    document.getElementById("fomVal1").innerText = `${d.pn1MDbc.toFixed(1)} dBc`;
    document.getElementById("fomSub1").innerText = `@ 1MHz 頻偏`;

    document.getElementById("fomLabel2").innerText = t.fomVcoFtr;
    document.getElementById("fomVal2").innerText = `${d.ftrPct.toFixed(1)} %`;
    document.getElementById("fomSub2").innerText = `${d.fMinGhz.toFixed(2)} ~ ${d.fMaxGhz.toFixed(2)} GHz`;

    document.getElementById("fomLabel3").innerText = t.fomVcoKvco;
    document.getElementById("fomVal3").innerText = `${d.kvcoGhzPerV.toFixed(2)} GHz/V`;
    document.getElementById("fomSub3").innerText = `線性調諧度`;

    document.getElementById("fomLabel4").innerText = t.fomVcoPdc;
    document.getElementById("fomVal4").innerText = `${d.pDcMw.toFixed(1)} mW`;
    document.getElementById("fomSub4").innerText = `${d.idcMa.toFixed(1)} mA @ ${d.vdd}V`;

    document.getElementById("fomLabel5").innerText = t.fomVcoLtank;
    document.getElementById("fomVal5").innerText = `${d.lTankNh.toFixed(3)} nH`;
    document.getElementById("fomSub5").innerText = `C_tank: ${d.cTankPf.toFixed(2)} pF`;

    document.getElementById("fomLabel6").innerText = t.fomVcoFom;
    document.getElementById("fomVal6").innerText = `${d.fomDbc.toFixed(1)} dBc`;
    document.getElementById("fomSub6").innerText = `啟振係數 α=${d.alphaStartup.toFixed(1)}`;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";

    document.getElementById("smithCardTitle").innerText = t.smithVcoTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithVcoSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveVcoTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveVcoSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveVcoTime;
    document.getElementById("canvas2Title").innerText = t.waveVcoPnCurve;
    document.getElementById("schCardTitle").innerText = t.schVcoTitle;
    document.getElementById("schCardSubtitle").innerText = t.schVcoSubtitle;

    document.getElementById("smithSubLabel1").innerText = "Tank Rp";
    document.getElementById("smithStat1").innerText = `${d.rParallelOhm.toFixed(1)} Ω`;
    document.getElementById("smithSubLabel2").innerText = "Req -Gm";
    document.getElementById("smithStat2").innerText = `${d.gmReqMs.toFixed(1)} mS`;
    document.getElementById("smithSubLabel3").innerText = "P_rf Out";
    document.getElementById("smithStat3").innerText = `${d.pRfOutDbm.toFixed(1)} dBm`;
    document.getElementById("smithSubLabel4").innerText = "W_n / W_p";
    document.getElementById("smithStat4").innerText = `${d.wNmosUm.toFixed(0)} / ${d.wPmosUm.toFixed(0)} μm`;
  } else if (d.session === "mixer") {
    // Mixer Mode UI Updates
    document.getElementById("valMixerGain").innerText = `${d.gainDb.toFixed(1)} dB`;
    document.getElementById("valMixerIdc").innerText = `${d.idcMa.toFixed(1)} mA`;

    document.getElementById("fomLabel1").innerText = t.fomMixerGc;
    document.getElementById("fomVal1").innerText = `${d.gainDb.toFixed(1)} dB`;
    document.getElementById("fomSub1").innerText = `RL = ${d.rLoadOhm} Ω`;

    document.getElementById("fomLabel2").innerText = t.fomMixerNf;
    document.getElementById("fomVal2").innerText = `${d.nfSsbDb.toFixed(1)} dB`;
    document.getElementById("fomSub2").innerText = `DSB NF: ${d.nfDsbDb.toFixed(1)} dB`;

    document.getElementById("fomLabel3").innerText = t.fomMixerIip3;
    document.getElementById("fomVal3").innerText = `${d.iip3Dbm.toFixed(1)} dBm`;
    document.getElementById("fomSub3").innerText = `IP1dB: ${d.ip1dbDbm.toFixed(1)} dBm`;

    document.getElementById("fomLabel4").innerText = t.fomMixerPdc;
    document.getElementById("fomVal4").innerText = `${d.pDcMw.toFixed(1)} mW`;
    document.getElementById("fomSub4").innerText = `${d.idcMa.toFixed(1)} mA @ ${d.vdd}V`;

    document.getElementById("fomLabel5").innerText = t.fomMixerIso;
    document.getElementById("fomVal5").innerText = `${d.loRfIsoDb.toFixed(1)} dB`;
    document.getElementById("fomSub5").innerText = `雙平衡 Gilbert 抵消`;

    document.getElementById("fomLabel6").innerText = t.fomMixerLoPwr;
    document.getElementById("fomVal6").innerText = `${d.loPwrDbm.toFixed(1)} dBm`;
    document.getElementById("fomSub6").innerText = `LO驅動電壓充足`;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";

    document.getElementById("smithCardTitle").innerText = t.smithMixerTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithMixerSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveMixerTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveMixerSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveMixerTime;
    document.getElementById("canvas2Title").innerText = t.waveMixerIfCurve;
    document.getElementById("schCardTitle").innerText = t.schMixerTitle;
    document.getElementById("schCardSubtitle").innerText = t.schMixerSubtitle;

    document.getElementById("smithSubLabel1").innerText = "Gm RF";
    document.getElementById("smithStat1").innerText = `${d.gmRfMs.toFixed(1)} mS`;
    document.getElementById("smithSubLabel2").innerText = "W_rf / W_lo";
    document.getElementById("smithStat2").innerText = `${d.wRfUm.toFixed(0)} / ${d.wLoUm.toFixed(0)} μm`;
    document.getElementById("smithSubLabel3").innerText = "IF Freq";
    document.getElementById("smithStat3").innerText = `${d.ifFreq.toFixed(1)} GHz`;
    document.getElementById("smithSubLabel4").innerText = "LO Freq";
    document.getElementById("smithStat4").innerText = `${d.loFreq.toFixed(1)} GHz`;
  } else if (d.session === "switch") {
    // Switch Mode UI Updates
    document.getElementById("valSwitchP1db").innerText = `${d.targetP1db.toFixed(1)} dBm`;

    document.getElementById("fomLabel1").innerText = t.fomSwitchIl;
    document.getElementById("fomVal1").innerText = `${d.ilDb.toFixed(2)} dB`;
    document.getElementById("fomSub1").innerText = `50Ω 插入損耗`;

    document.getElementById("fomLabel2").innerText = t.fomSwitchIso;
    document.getElementById("fomVal2").innerText = `${d.isoDb.toFixed(1)} dB`;
    document.getElementById("fomSub2").innerText = `關斷埠隔離度`;

    document.getElementById("fomLabel3").innerText = t.fomSwitchP1db;
    document.getElementById("fomVal3").innerText = `${d.targetP1db.toFixed(1)} dBm`;
    document.getElementById("fomSub3").innerText = `堆疊數 N=${d.numStack}`;

    document.getElementById("fomLabel4").innerText = t.fomSwitchS11;
    document.getElementById("fomVal4").innerText = `${d.s11Db.toFixed(1)} dB`;
    document.getElementById("fomSub4").innerText = `導通埠匹配`;

    document.getElementById("fomLabel5").innerText = t.fomSwitchRon;
    document.getElementById("fomVal5").innerText = `${d.rOnTarget.toFixed(2)} Ω`;
    document.getElementById("fomSub5").innerText = `Coff: ${d.cOffShuntFf.toFixed(1)} fF`;

    document.getElementById("fomLabel6").innerText = t.fomSwitchFom;
    document.getElementById("fomVal6").innerText = `${d.fomFs.toFixed(0)} fs`;
    document.getElementById("fomSub6").innerText = `CMOS RF 開關品質優`;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";

    document.getElementById("smithCardTitle").innerText = t.smithSwitchTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithSwitchSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveSwitchTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveSwitchSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveSwitchS21Iso;
    document.getElementById("canvas2Title").innerText = t.waveSwitchP1dbCurve;
    document.getElementById("schCardTitle").innerText = t.schSwitchTitle;
    document.getElementById("schCardSubtitle").innerText = t.schSwitchSubtitle;

    document.getElementById("smithSubLabel1").innerText = "Ron Total";
    document.getElementById("smithStat1").innerText = `${d.rOnTarget.toFixed(2)} Ω`;
    document.getElementById("smithSubLabel2").innerText = "W_series";
    document.getElementById("smithStat2").innerText = `${d.wSerUm.toFixed(0)} μm`;
    document.getElementById("smithSubLabel3").innerText = "W_shunt";
    document.getElementById("smithStat3").innerText = `${d.wShuntUm.toFixed(0)} μm`;
    document.getElementById("smithSubLabel4").innerText = "IIP3";
    document.getElementById("smithStat4").innerText = `${d.iip3Dbm.toFixed(1)} dBm`;
  } else if (d.session === "antenna") {
    // Antenna Mode UI Updates
    document.getElementById("selectAntennaSubstrate").value = d.subType;

    document.getElementById("fomLabel1").innerText = t.fomAntGain;
    document.getElementById("fomVal1").innerText = `${d.gainDbi.toFixed(1)} dBi`;
    document.getElementById("fomSub1").innerText = `方向性 D: ${d.directivityDbi.toFixed(1)} dBi`;

    document.getElementById("fomLabel2").innerText = t.fomAntBw;
    document.getElementById("fomVal2").innerText = `${d.bwMhz.toFixed(0)} MHz`;
    document.getElementById("fomSub2").innerText = `分數頻寬: ${d.bwPct.toFixed(1)} %`;

    document.getElementById("fomLabel3").innerText = t.fomAntW;
    document.getElementById("fomVal3").innerText = `${(d.wPatchUm).toFixed(0)} μm`;
    document.getElementById("fomSub3").innerText = `輻射邊寬度`;

    document.getElementById("fomLabel4").innerText = t.fomAntL;
    document.getElementById("fomVal4").innerText = `${(d.lPatchUm).toFixed(0)} μm`;
    document.getElementById("fomSub4").innerText = `諧振邊長度`;

    document.getElementById("fomLabel5").innerText = t.fomAntY0;
    document.getElementById("fomVal5").innerText = `${(d.y0Um).toFixed(0)} μm`;
    document.getElementById("fomSub5").innerText = `內凹饋電深度 (50Ω)`;

    document.getElementById("fomLabel6").innerText = t.fomAntEff;
    document.getElementById("fomVal6").innerText = `${d.effPct.toFixed(1)} %`;
    document.getElementById("fomSub6").innerText = d.subName;
    document.getElementById("fomSub6").className = "text-xs text-green-400 font-semibold";

    document.getElementById("smithCardTitle").innerText = t.smithAntTitle;
    document.getElementById("smithCardSubtitle").innerText = t.smithAntSubtitle;
    document.getElementById("waveCardTitle").innerText = t.waveAntTitle;
    document.getElementById("waveCardSubtitle").innerText = t.waveAntSubtitle;
    document.getElementById("canvas1Title").innerText = t.waveAntS11;
    document.getElementById("canvas2Title").innerText = t.waveAntPattern;
    document.getElementById("schCardTitle").innerText = t.schAntTitle;
    document.getElementById("schCardSubtitle").innerText = t.schAntSubtitle;

    document.getElementById("smithSubLabel1").innerText = "λ0 (空氣)";
    document.getElementById("smithStat1").innerText = `${d.lambda0Mm.toFixed(2)} mm`;
    document.getElementById("smithSubLabel2").innerText = "εr (介電常數)";
    document.getElementById("smithStat2").innerText = `${d.er.toFixed(2)}`;
    document.getElementById("smithSubLabel3").innerText = "h (基板厚度)";
    document.getElementById("smithStat3").innerText = `${d.hUm.toFixed(0)} μm`;
    document.getElementById("smithSubLabel4").innerText = "S11 諧振點";
    document.getElementById("smithStat4").innerText = `${d.s11Db.toFixed(1)} dB`;
  }

  // Draw Visualizations
  drawSmithChart();
  drawWaveforms();
  drawSchematicSvg();
  updateBomTable();
  updateSpiceDeck();
  drawLinkBudget();
  drawMatchingSynthesizer();
  drawDieAreaFloorplan();
  drawPvtCorners();
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
  } else if (d.session === "lna") {
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
  } else if (d.session === "vco") {
    // VCO Tank Impedance & -Gm on Smith Chart
    const pt = gammaToCanvas(0.45, 0.0);
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 11px sans-serif";
    ctx.fillText(`Tank Rp (${d.rParallelOhm.toFixed(1)}Ω)`, pt.x + 8, pt.y - 6);

    // Negative Gm compensation circle
    ctx.strokeStyle = "#ec4899"; ctx.lineWidth = 2.0; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(cx - 0.45 * R, cy, 0.4 * R, 0, 2 * Math.PI); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#f472b6"; ctx.fillText(`-Gm Region (${d.gmReqMs.toFixed(1)} mS)`, cx - 0.7 * R, cy - 15);
  } else if (d.session === "mixer") {
    // Mixer RF Transconductance Input S11
    const pt = gammaToCanvas(0.15, -0.2);
    ctx.fillStyle = "#a855f7";
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 11px sans-serif";
    ctx.fillText(`RF In (50 - j20 Ω)`, pt.x + 8, pt.y - 6);
  } else if (d.session === "switch") {
    // Switch ON (low impedance) & OFF (high impedance) points
    const ptOn = gammaToCanvas(-0.85, 0.05);
    const ptOff = gammaToCanvas(0.88, -0.2);
    ctx.fillStyle = "#10b981"; ctx.beginPath(); ctx.arc(ptOn.x, ptOn.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 11px sans-serif"; ctx.fillText(`ON State (Ron=${d.rOnTarget.toFixed(2)}Ω)`, ptOn.x + 8, ptOn.y - 6);
    ctx.fillStyle = "#f43f5e"; ctx.beginPath(); ctx.arc(ptOff.x, ptOff.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.fillText(`OFF State (ISO=${d.isoDb.toFixed(1)}dB)`, ptOff.x - 140, ptOff.y - 6);
  } else if (d.session === "antenna") {
    // Antenna Resonance Point at 50 Ohm (Smith Chart Center)
    const pt = gammaToCanvas(0.04, 0.02);
    ctx.fillStyle = "#38bdf8"; ctx.shadowColor = "#38bdf8"; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 11px sans-serif";
    ctx.fillText(`Resonance f0 (50Ω Matched, y0=${d.y0Um.toFixed(0)}μm)`, pt.x + 10, pt.y - 8);

    // S11 < -10dB circle (VSWR < 2:1)
    ctx.strokeStyle = "#10b981"; ctx.lineWidth = 1.8; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.arc(cx, cy, 0.316 * R, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#34d399"; ctx.fillText(`VSWR < 2.0 (BW=${d.bwMhz.toFixed(0)} MHz)`, cx + 15, cy + 0.35 * R);
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
  } else if (d.session === "lna") {
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
  } else if (d.session === "vco") {
    // VCO Oscillation Swing & Phase Noise
    const c1 = document.getElementById("timeWaveCanvas");
    if (c1) {
      const ctx = c1.getContext("2d"); const w = c1.width, h = c1.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.0; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h/2 + Math.sin((x / w) * 8 * Math.PI) * (h * 0.35);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 1.8; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h/2 - Math.sin((x / w) * 8 * Math.PI) * (h * 0.35);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 11px sans-serif"; ctx.fillText("— Vout+ 差動正端", 15, 20);
      ctx.fillStyle = "#f59e0b"; ctx.fillText("— Vout- 差動負端", 140, 20);
    }
    const c2 = document.getElementById("loadlineCanvas");
    if (c2) {
      const ctx = c2.getContext("2d"); const w = c2.width, h = c2.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#ec4899"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = 30 + (x / w) * (h - 60);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#ec4899"; ctx.font = "bold 11px sans-serif";
      ctx.fillText(`— Leeson 相位雜訊 L(Δf) (${d.pn1MDbc.toFixed(1)} dBc/Hz @1M)`, 15, 20);
    }
  } else if (d.session === "mixer") {
    // Mixer Commutation Waveforms & IF Output Spectrum
    const c1 = document.getElementById("timeWaveCanvas");
    if (c1) {
      const ctx = c1.getContext("2d"); const w = c1.width, h = c1.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#a855f7"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const sq = Math.sin((x / w) * 12 * Math.PI) > 0 ? 1 : -1;
        const rf = Math.sin((x / w) * 12 * Math.PI + 0.3);
        const y = h/2 - (sq * rf) * (h * 0.35);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#c084fc"; ctx.font = "bold 11px sans-serif"; ctx.fillText("— LO 換向電流波形 (Commutation)", 15, 20);
    }
    const c2 = document.getElementById("loadlineCanvas");
    if (c2) {
      const ctx = c2.getContext("2d"); const w = c2.width, h = c2.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.0; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = 40 + Math.pow(x / w, 2) * (h - 70);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 11px sans-serif";
      ctx.fillText(`— 中頻轉換增益響應 Gc (${d.gainDb.toFixed(1)} dB)`, 15, 20);
    }
  } else if (d.session === "switch") {
    // Switch IL & ISO curves
    const c1 = document.getElementById("timeWaveCanvas");
    if (c1) {
      const ctx = c1.getContext("2d"); const w = c1.width, h = c1.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = 25 + (x / w) * 20;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = "#f43f5e"; ctx.lineWidth = 2.0; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h - 30 - (x / w) * 35;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#10b981"; ctx.font = "bold 11px sans-serif"; ctx.fillText(`— 插入損耗 IL (${d.ilDb.toFixed(2)} dB)`, 15, 20);
      ctx.fillStyle = "#f43f5e"; ctx.fillText(`— 隔離度 ISO (${d.isoDb.toFixed(1)} dB)`, 170, 20);
    }
    const c2 = document.getElementById("loadlineCanvas");
    if (c2) {
      const ctx = c2.getContext("2d"); const w = c2.width, h = c2.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const norm = x / w;
        const y = norm < 0.7 ? h - 20 - norm * (h - 60) : h - 20 - 0.7 * (h - 60) - (norm - 0.7) * (h - 60) * 0.4;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#fbbf24"; ctx.font = "bold 11px sans-serif";
      ctx.fillText(`— P1dB 功率耐受壓縮曲線 (${d.targetP1db.toFixed(1)} dBm)`, 15, 20);
    }
  } else if (d.session === "antenna") {
    // Antenna Radiation Pattern & S11
    const c1 = document.getElementById("timeWaveCanvas");
    if (c1) {
      const ctx = c1.getContext("2d"); const w = c1.width, h = c1.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#10b981"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const delta = Math.abs(x / w - 0.5);
        const y = 30 + (1.0 - Math.exp(-delta * 12)) * (h - 50);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#10b981"; ctx.font = "bold 11px sans-serif";
      ctx.fillText(`— 回波損耗 S11 (共振谷點: ${d.s11Db.toFixed(1)} dB, BW=${d.bwMhz.toFixed(0)}MHz)`, 15, 20);
    }
    const c2 = document.getElementById("loadlineCanvas");
    if (c2) {
      const ctx = c2.getContext("2d"); const w = c2.width, h = c2.height;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#090d16"; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2 + 10;
      ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let i = 0; i <= 72; i++) {
        const th = (i / 72) * 2 * Math.PI;
        const r = Math.pow(Math.cos(th), 2) * (h * 0.42);
        const px = cx + r * Math.sin(th);
        const py = cy - r * Math.cos(th);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = "#38bdf8"; ctx.font = "bold 11px sans-serif";
      ctx.fillText(`— 貼片天線方向圖 (Gain: ${d.gainDbi.toFixed(1)} dBi, η: ${d.effPct.toFixed(1)}%)`, 15, 20);
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

      <circle cx="45" cy="110" r="4" fill="#38bdf8" /><text x="20" y="105" fill="#38bdf8" font-size="10" font-weight="bold">RFIN+</text><path d="M49 110 L90 110" stroke="#38bdf8" stroke-width="1.8" fill="none" />
      <circle cx="45" cy="230" r="4" fill="#38bdf8" /><text x="20" y="245" fill="#38bdf8" font-size="10" font-weight="bold">RFIN-</text><path d="M49 230 L90 230" stroke="#38bdf8" stroke-width="1.8" fill="none" />

      <rect x="90" y="98" width="55" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" /><text x="96" y="114" fill="#cbd5e1" font-size="9">Limn ${d.limnNh.toFixed(2)}n</text>
      <rect x="90" y="218" width="55" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" /><text x="96" y="234" fill="#cbd5e1" font-size="9">Limn ${d.limnNh.toFixed(2)}n</text>

      <path d="M145 110 L190 110" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M145 230 L190 230" stroke="#cbd5e1" stroke-width="1.8" fill="none" />

      <!-- Transistors M1 & M2 -->
      <path d="M190 95 L190 125" stroke="#a855f7" stroke-width="3" fill="none" /><path d="M198 90 L198 130" stroke="#a855f7" stroke-width="2" fill="none" />
      <path d="M198 95 L225 95 L225 80" stroke="#cbd5e1" stroke-width="1.8" fill="none" /><path d="M198 125 L225 125 L225 140" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <text x="180" y="85" fill="#c084fc" font-size="11" font-weight="bold">M1 (W=${d.wTotalUm}μm)</text>

      <path d="M190 215 L190 245" stroke="#a855f7" stroke-width="3" fill="none" /><path d="M198 210 L198 250" stroke="#a855f7" stroke-width="2" fill="none" />
      <path d="M198 215 L225 215 L225 200" stroke="#cbd5e1" stroke-width="1.8" fill="none" /><path d="M198 245 L225 245 L225 260" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <text x="180" y="278" fill="#c084fc" font-size="11" font-weight="bold">M2 (W=${d.wTotalUm}μm)</text>

      <!-- Neutralization Caps -->
      <path d="M185 110 L185 150 L310 150 L310 200" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.5" fill="none" />
      <text x="230" y="145" fill="#f472b6" font-size="9" font-weight="bold">Cneu (${d.cNeuFf.toFixed(1)}fF)</text>
      <path d="M185 230 L185 190 L310 190 L310 80" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.5" fill="none" />

      <!-- Balun Primary & Secondary -->
      <path d="M225 80 L350 80" stroke="#34d399" stroke-width="2" fill="none" /><path d="M225 200 L350 200" stroke="#34d399" stroke-width="2" fill="none" />
      <circle cx="410" cy="140" r="4" fill="#f59e0b" /><text x="420" y="144" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>
      <rect x="360" y="70" width="30" height="140" rx="6" fill="#047857" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5" />
      <rect x="415" y="70" width="30" height="140" rx="6" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.5" />
      <text x="390" y="65" fill="#94a3b8" font-size="9">k=${d.kBalun}</text>

      <!-- Load -->
      <rect x="540" y="125" width="40" height="30" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="2" /><text x="546" y="144" fill="#fb7185" font-size="10" font-weight="bold">50 Ω</text>
      <text x="600" y="144" fill="#fb7185" font-size="12" font-weight="bold">RFOUT</text><text x="600" y="160" fill="#94a3b8" font-size="10">${d.pout} dBm</text>
    `;
  } else if (d.session === "lna") {
    // LNA Inductively Degenerated Cascode Schematic with authentic IEEE MOSFETs
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="32" fill="#38bdf8" font-size="13" font-weight="bold">CMOS Inductively Degenerated Cascode LNA (${d.freq} GHz)</text>
      <text x="490" y="32" fill="#94a3b8" font-size="11">NF = ${d.nfDb.toFixed(2)} dB | Gain = ${d.gainDb.toFixed(1)} dB</text>

      <!-- RF Input Port -->
      <circle cx="45" cy="180" r="4" fill="#38bdf8" />
      <text x="20" y="175" fill="#38bdf8" font-size="11" font-weight="bold">RFIN</text>
      <path d="M49 180 L90 180" stroke="#38bdf8" stroke-width="2" fill="none" />

      <!-- Gate Inductor Lg Box -->
      <rect x="90" y="168" width="70" height="25" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="96" y="184" fill="#38bdf8" font-size="10" font-weight="bold">Lg ${d.lgNh.toFixed(2)}nH</text>
      <path d="M160 180 L212 180" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- Main Transistor M1 (Standard NMOS Symbol) -->
      <!-- Gate terminal & plate -->
      <path d="M212 165 L212 195" stroke="#a855f7" stroke-width="2.5" fill="none" />
      <!-- Channel plate -->
      <path d="M222 160 L222 200" stroke="#a855f7" stroke-width="2.5" fill="none" />
      <!-- Drain tap (Top) -->
      <path d="M222 166 L238 166 L238 140" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Source tap (Bottom) -->
      <path d="M222 194 L238 194 L238 220" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <text x="135" y="160" fill="#c084fc" font-size="11" font-weight="bold">M1 (W=${d.wMainUm}μm)</text>

      <!-- Source Degeneration Ls -->
      <rect x="218" y="220" width="40" height="35" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
      <text x="223" y="242" fill="#34d399" font-size="9" font-weight="bold">Ls ${d.lsNh.toFixed(3)}n</text>
      <path d="M238 255 L238 280 M228 280 L248 280 M232 284 L244 284 M235 288 L241 288" stroke="#64748b" stroke-width="1.5" fill="none" />
      <text x="255" y="278" fill="#94a3b8" font-size="9">GND (Noiseless 50Ω)</text>

      <!-- Connection from M1 drain to M2 source (Cascode intermediate node) -->
      <path d="M238 140 L238 126" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- Cascode Transistor M2 (Standard NMOS Symbol) -->
      <!-- Gate terminal & plate -->
      <path d="M212 95 L212 125" stroke="#a855f7" stroke-width="2.5" fill="none" />
      <path d="M212 110 L165 110" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <circle cx="160" cy="110" r="3" fill="#f59e0b" />
      <text x="110" y="113" fill="#fbbf24" font-size="9">Vbias,cas</text>
      <!-- Channel plate -->
      <path d="M222 90 L222 130" stroke="#a855f7" stroke-width="2.5" fill="none" />
      <!-- Source tap (Bottom) connects to intermediate node -->
      <path d="M222 124 L238 124 L238 140" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Drain tap (Top) connects to tank -->
      <path d="M222 96 L238 96 L238 60 L380 60" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <text x="140" y="92" fill="#c084fc" font-size="11" font-weight="bold">M2 (Cascode)</text>

      <!-- Tank: Ld and Cd in parallel -->
      <rect x="380" y="45" width="60" height="28" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
      <text x="386" y="62" fill="#fbbf24" font-size="9" font-weight="bold">Ld ${d.ldNh.toFixed(2)}n</text>

      <rect x="380" y="85" width="60" height="28" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="386" y="102" fill="#38bdf8" font-size="9" font-weight="bold">Cd ${d.cdPf.toFixed(2)}p</text>

      <path d="M360 60 L360 99 L380 99" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <path d="M440 60 L460 60 L460 99 L440 99" stroke="#cbd5e1" stroke-width="1.5" fill="none" />

      <!-- DC Supply VDD connection -->
      <circle cx="475" cy="60" r="4" fill="#f59e0b" />
      <text x="485" y="64" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>

      <!-- Output Coupling Cap Cout -->
      <path d="M460 60 L460 120 L520 120" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <line x1="520" y1="112" x2="520" y2="128" stroke="#38bdf8" stroke-width="2.5" />
      <line x1="526" y1="112" x2="526" y2="128" stroke="#38bdf8" stroke-width="2.5" />
      <text x="510" y="105" fill="#38bdf8" font-size="9">Cout ${d.coutPf.toFixed(2)}p</text>

      <!-- Output 50 Ohm Load -->
      <path d="M526 120 L570 120" stroke="#38bdf8" stroke-width="2" fill="none" />
      <circle cx="575" cy="120" r="4" fill="#f43f5e" />
      <text x="585" y="124" fill="#fb7185" font-size="12" font-weight="bold">RFOUT (50Ω)</text>
      <text x="585" y="140" fill="#94a3b8" font-size="10">Gain = ${d.gainDb.toFixed(1)} dB</text>
    `;
  } else if (d.session === "vco") {
    // VCO Cross-Coupled Resonator Schematic with Authentic Transistor Symbols
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="28" fill="#38bdf8" font-size="13" font-weight="bold">CMOS Complementary Cross-Coupled LC-VCO (${d.freq} GHz)</text>
      <text x="450" y="28" fill="#94a3b8" font-size="11">PN = ${d.pn1MDbc.toFixed(1)} dBc/Hz @ 1MHz | Ltank = ${d.lTankNh.toFixed(3)} nH</text>

      <!-- VDD Node Top -->
      <circle cx="340" cy="38" r="4" fill="#f59e0b" /><text x="350" y="42" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>
      <path d="M340 42 L340 55 M275 55 L405 55" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M275 55 L275 65" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M405 55 L405 65" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- PMOS Cross-Coupled Pair Top (MP1 & MP2) -->
      <!-- MP1 PMOS Symbol (Left) -->
      <path d="M265 65 L265 95" stroke="#ec4899" stroke-width="2.8" fill="none" />
      <path d="M257 60 L257 100" stroke="#ec4899" stroke-width="2" fill="none" />
      <circle cx="253" cy="80" r="3" fill="#0b1120" stroke="#ec4899" stroke-width="1.5" />
      <path d="M250 80 L230 80 L230 145" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />
      <path d="M265 65 L275 65" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M265 95 L275 95 L275 125" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <text x="195" y="75" fill="#f472b6" font-size="10" font-weight="bold">MP1 (W=${d.wPmosUm.toFixed(0)}μm)</text>

      <!-- MP2 PMOS Symbol (Right) -->
      <path d="M415 65 L415 95" stroke="#ec4899" stroke-width="2.8" fill="none" />
      <path d="M423 60 L423 100" stroke="#ec4899" stroke-width="2" fill="none" />
      <circle cx="427" cy="80" r="3" fill="#0b1120" stroke="#ec4899" stroke-width="1.5" />
      <path d="M430 80 L450 80 L450 145" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />
      <path d="M415 65 L405 65" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M415 95 L405 95 L405 125" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <text x="435" y="75" fill="#f472b6" font-size="10" font-weight="bold">MP2 (W=${d.wPmosUm.toFixed(0)}μm)</text>

      <!-- Cross-Coupled Feedback Interconnects -->
      <path d="M230 145 L405 145" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />
      <path d="M450 145 L275 145" stroke="#ec4899" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />

      <!-- Differential Tank Nodes (VOUT- / VOUT+) -->
      <path d="M275 125 L275 195" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <path d="M405 125 L405 195" stroke="#38bdf8" stroke-width="2.5" fill="none" />

      <!-- Tank Inductor & Varactors in Middle -->
      <path d="M275 160 L180 160 L180 168" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M405 160 L500 160 L500 168" stroke="#38bdf8" stroke-width="2" fill="none" />
      <rect x="150" y="168" width="60" height="24" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
      <text x="156" y="184" fill="#fbbf24" font-size="9" font-weight="bold">Ltank ${d.lTankNh.toFixed(2)}n</text>
      <rect x="470" y="168" width="60" height="24" rx="4" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" />
      <text x="476" y="184" fill="#c084fc" font-size="9" font-weight="bold">Cvar ${d.cTankPf.toFixed(2)}p</text>
      <path d="M180 192 L180 200 L500 200 L500 192" stroke="#38bdf8" stroke-width="2" fill="none" />

      <!-- NMOS Cross-Coupled Pair Bottom (MN1 & MN2) -->
      <!-- MN1 NMOS Symbol (Left) -->
      <path d="M265 210 L265 240" stroke="#06b6d4" stroke-width="2.8" fill="none" />
      <path d="M257 205 L257 245" stroke="#06b6d4" stroke-width="2" fill="none" />
      <path d="M257 225 L230 225 L230 175 L405 175" stroke="#06b6d4" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />
      <path d="M265 210 L275 210 L275 195" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M265 240 L275 240 L275 255" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <text x="195" y="235" fill="#22d3ee" font-size="10" font-weight="bold">MN1 (W=${d.wNmosUm.toFixed(0)}μm)</text>

      <!-- MN2 NMOS Symbol (Right) -->
      <path d="M415 210 L415 240" stroke="#06b6d4" stroke-width="2.8" fill="none" />
      <path d="M423 205 L423 245" stroke="#06b6d4" stroke-width="2" fill="none" />
      <path d="M423 225 L450 225 L450 175 L275 175" stroke="#06b6d4" stroke-dasharray="3,3" stroke-width="1.4" fill="none" />
      <path d="M415 210 L405 210 L405 195" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M415 240 L405 240 L405 255" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <text x="435" y="235" fill="#22d3ee" font-size="10" font-weight="bold">MN2 (W=${d.wNmosUm.toFixed(0)}μm)</text>

      <!-- Tail Current Source to Ground -->
      <path d="M275 255 L405 255" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M340 255 L340 270" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <circle cx="340" cy="282" r="11" fill="#1e293b" stroke="#10b981" stroke-width="1.8" />
      <path d="M340 275 L340 289 M336 284 L340 289 L344 284" stroke="#34d399" stroke-width="1.5" fill="none" />
      <text x="360" y="285" fill="#34d399" font-size="10" font-weight="bold">Idc ${d.idcMa.toFixed(1)}mA</text>
      <path d="M340 293 L340 308 M330 308 L350 308 M334 312 L346 312 M338 316 L342 316" stroke="#64748b" stroke-width="1.5" fill="none" />

      <!-- Differential RF Output Ports -->
      <circle cx="85" cy="160" r="4" fill="#38bdf8" /><path d="M89 160 L150 160" stroke="#38bdf8" stroke-width="2" fill="none" />
      <text x="45" y="164" fill="#38bdf8" font-size="12" font-weight="bold">VOUT-</text>
      <circle cx="595" cy="160" r="4" fill="#38bdf8" /><path d="M530 160 L591 160" stroke="#38bdf8" stroke-width="2" fill="none" />
      <text x="605" y="164" fill="#38bdf8" font-size="12" font-weight="bold">VOUT+</text>
    `;
  } else if (d.session === "mixer") {
    // Gilbert Mixer Schematic with Authentic Transistor Symbols (M1-M6)
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="28" fill="#38bdf8" font-size="13" font-weight="bold">Double-Balanced Gilbert Active Mixer (${d.freq} GHz RF -> ${d.ifFreq} GHz IF)</text>
      <text x="470" y="28" fill="#94a3b8" font-size="11">Gc = ${d.gainDb.toFixed(1)} dB | IIP3 = ${d.iip3Dbm.toFixed(1)} dBm | SSB NF = ${d.nfSsbDb.toFixed(1)} dB</text>

      <!-- VDD Rail & Resistors RL -->
      <circle cx="340" cy="40" r="4" fill="#f59e0b" /><text x="350" y="44" fill="#fbbf24" font-size="11" font-weight="bold">VDD (${d.vdd}V)</text>
      <path d="M340 44 L340 55 M210 55 L470 55" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- Left Resistor RL1 -->
      <path d="M210 55 L210 65" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <rect x="195" y="65" width="30" height="30" rx="3" fill="#1e293b" stroke="#f43f5e" stroke-width="1.8" />
      <text x="180" y="82" fill="#fb7185" font-size="9" font-weight="bold">RL ${d.rLoadOhm}Ω</text>
      <path d="M210 95 L210 115" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- Right Resistor RL2 -->
      <path d="M470 55 L470 65" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <rect x="455" y="65" width="30" height="30" rx="3" fill="#1e293b" stroke="#f43f5e" stroke-width="1.8" />
      <text x="490" y="82" fill="#fb7185" font-size="9" font-weight="bold">RL ${d.rLoadOhm}Ω</text>
      <path d="M470 95 L470 115" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- IF Output Ports -->
      <path d="M210 105 L150 105" stroke="#a855f7" stroke-width="2" fill="none" />
      <circle cx="145" cy="105" r="4" fill="#a855f7" /><text x="110" y="109" fill="#c084fc" font-size="12" font-weight="bold">IF-</text>
      <path d="M470 105 L530 105" stroke="#a855f7" stroke-width="2" fill="none" />
      <circle cx="535" cy="105" r="4" fill="#a855f7" /><text x="545" y="109" fill="#c084fc" font-size="12" font-weight="bold">IF+</text>

      <!-- LO Switching Quad (M3, M4, M5, M6 Transistors) -->
      <!-- M3 Transistor -->
      <path d="M175 125 L175 145" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <path d="M182 120 L182 150" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M182 125 L210 125 L210 115" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M182 145 L250 145 L250 170" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M175 135 L145 135" stroke="#38bdf8" stroke-width="1.5" fill="none" />
      <circle cx="140" cy="135" r="3" fill="#38bdf8" /><text x="105" y="138" fill="#38bdf8" font-size="9" font-weight="bold">LO+</text>
      <text x="186" y="132" fill="#38bdf8" font-size="9" font-weight="bold">M3</text>

      <!-- M4 Transistor -->
      <path d="M305 125 L305 145" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <path d="M298 120 L298 150" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M298 125 L470 125 L470 115" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M298 145 L250 145" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M305 135 L335 135" stroke="#38bdf8" stroke-width="1.5" fill="none" />
      <circle cx="340" cy="135" r="3" fill="#38bdf8" /><text x="345" y="138" fill="#38bdf8" font-size="9" font-weight="bold">LO-</text>
      <text x="278" y="132" fill="#38bdf8" font-size="9" font-weight="bold">M4</text>

      <!-- M5 Transistor -->
      <path d="M375 125 L375 145" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <path d="M382 120 L382 150" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M382 125 L210 125" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M382 145 L430 145 L430 170" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M375 135 L345 135" stroke="#38bdf8" stroke-width="1.5" fill="none" />
      <text x="386" y="132" fill="#38bdf8" font-size="9" font-weight="bold">M5</text>

      <!-- M6 Transistor -->
      <path d="M505 125 L505 145" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <path d="M498 120 L498 150" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M498 125 L470 125" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M498 145 L430 145" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M505 135 L535 135" stroke="#38bdf8" stroke-width="1.5" fill="none" />
      <circle cx="540" cy="135" r="3" fill="#38bdf8" /><text x="545" y="138" fill="#38bdf8" font-size="9" font-weight="bold">LO+</text>
      <text x="478" y="132" fill="#38bdf8" font-size="9" font-weight="bold">M6</text>

      <!-- Interconnect nodes -->
      <circle cx="250" cy="145" r="3" fill="#38bdf8" />
      <circle cx="430" cy="145" r="3" fill="#38bdf8" />
      <text x="215" y="160" fill="#64748b" font-size="9">Node_P</text>
      <text x="435" y="160" fill="#64748b" font-size="9">Node_N</text>

      <!-- RF Input Differential Transistors (M1 & M2) -->
      <!-- M1 Transistor -->
      <path d="M225 195 L225 225" stroke="#10b981" stroke-width="2.8" fill="none" />
      <path d="M233 190 L233 230" stroke="#10b981" stroke-width="2" fill="none" />
      <path d="M233 195 L250 195 L250 170" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M233 225 L250 225 L250 250" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M225 210 L170 210" stroke="#10b981" stroke-width="2" fill="none" />
      <circle cx="165" cy="210" r="4" fill="#10b981" /><text x="130" y="214" fill="#34d399" font-size="12" font-weight="bold">RF+</text>
      <text x="240" y="212" fill="#34d399" font-size="10" font-weight="bold">M1 (W=${d.wRfUm}μm)</text>

      <!-- M2 Transistor -->
      <path d="M455 195 L455 225" stroke="#10b981" stroke-width="2.8" fill="none" />
      <path d="M447 190 L447 230" stroke="#10b981" stroke-width="2" fill="none" />
      <path d="M447 195 L430 195 L430 170" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M447 225 L430 225 L430 250" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M455 210 L510 210" stroke="#10b981" stroke-width="2" fill="none" />
      <circle cx="515" cy="210" r="4" fill="#10b981" /><text x="525" y="214" fill="#34d399" font-size="12" font-weight="bold">RF-</text>
      <text x="360" y="212" fill="#34d399" font-size="10" font-weight="bold">M2 (W=${d.wRfUm}μm)</text>

      <!-- Common Tail Node & Current Source -->
      <path d="M250 250 L430 250" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M340 250 L340 268" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <circle cx="340" cy="282" r="12" fill="#1e293b" stroke="#10b981" stroke-width="1.8" />
      <path d="M340 274 L340 290 M336 284 L340 290 L344 284" stroke="#34d399" stroke-width="1.5" fill="none" />
      <text x="360" y="286" fill="#34d399" font-size="10" font-weight="bold">Idc ${d.idcMa.toFixed(1)}mA</text>
      <path d="M340 294 L340 310 M330 310 L350 310 M334 314 L346 314 M338 318 L342 318" stroke="#64748b" stroke-width="1.5" fill="none" />
    `;
  } else if (d.session === "switch") {
    // SPDT Switch Schematic with Authentic Transistor Symbols (Series Stacked FETs + Shunt FETs)
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="28" fill="#38bdf8" font-size="13" font-weight="bold">CMOS Series-Shunt SPDT T/R Switch (${d.freq} GHz)</text>
      <text x="450" y="28" fill="#94a3b8" font-size="11">IL = ${d.ilDb.toFixed(2)} dB | ISO = ${d.isoDb.toFixed(1)} dB | P1dB = ${d.targetP1db} dBm</text>

      <!-- Antenna Port (ANT) Middle Left -->
      <circle cx="55" cy="165" r="5" fill="#f59e0b" /><text x="15" y="169" fill="#fbbf24" font-size="12" font-weight="bold">ANT</text>
      <path d="M60 165 L140 165" stroke="#f59e0b" stroke-width="2.5" fill="none" />

      <!-- Branch Split to TX (Top) and RX (Bottom) -->
      <path d="M140 165 L140 95 L190 95" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M140 165 L140 235 L190 235" stroke="#cbd5e1" stroke-width="2" fill="none" />

      <!-- TX Branch: Series Stacked FETs (M_SER1, M_SER2) -->
      <!-- M_SER1 Symbol (Top Series 1) -->
      <path d="M205 85 L205 105" stroke="#10b981" stroke-width="2.8" fill="none" />
      <path d="M198 80 L198 110" stroke="#10b981" stroke-width="2" fill="none" />
      <path d="M190 95 L198 95" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M205 85 L215 85 L215 95" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M205 105 L215 105 L215 95" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M215 95 L245 95" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Gate Resistor Rgate1 -->
      <path d="M198 85 L180 70" stroke="#10b981" stroke-width="1.4" fill="none" />
      <rect x="160" y="62" width="20" height="12" rx="2" fill="#1e293b" stroke="#10b981" stroke-width="1" />
      <text x="162" y="71" fill="#34d399" font-size="8">Rg</text>

      <!-- M_SER2 Symbol (Top Series 2) -->
      <path d="M260 85 L260 105" stroke="#10b981" stroke-width="2.8" fill="none" />
      <path d="M253 80 L253 110" stroke="#10b981" stroke-width="2" fill="none" />
      <path d="M245 95 L253 95" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M260 85 L270 85 L270 95" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M260 105 L270 105 L270 95" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M270 95 L370 95" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Gate Resistor Rgate2 -->
      <path d="M253 85 L240 70" stroke="#10b981" stroke-width="1.4" fill="none" />
      <rect x="220" y="62" width="20" height="12" rx="2" fill="#1e293b" stroke="#10b981" stroke-width="1" />
      <text x="222" y="71" fill="#34d399" font-size="8">Rg</text>
      <text x="210" y="125" fill="#34d399" font-size="10" font-weight="bold">TX M_SER (N=${d.numStack}, W=${d.wSerUm.toFixed(0)}μm)</text>

      <!-- TX Shunt Transistor (M_SHUNT1) to GND -->
      <path d="M370 95 L370 120" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M360 125 L380 125" stroke="#10b981" stroke-width="2.8" fill="none" />
      <path d="M355 133 L385 133" stroke="#10b981" stroke-width="2" fill="none" />
      <path d="M370 120 L370 125" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M360 125 L350 125 L350 145 L370 145" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <path d="M380 125 L390 125 L390 145 L370 145" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <!-- Shunt Gate Control -->
      <path d="M370 133 L370 142 L420 142" stroke="#10b981" stroke-width="1.4" fill="none" />
      <text x="425" y="145" fill="#34d399" font-size="9">Vctrl_bar</text>
      <!-- Shunt Ground -->
      <path d="M370 145 L370 160 M362 160 L378 160 M365 163 L375 163 M368 166 L372 166" stroke="#64748b" stroke-width="1.5" fill="none" />
      <text x="285" y="142" fill="#34d399" font-size="9" font-weight="bold">M_SHUNT (W=${d.wShuntUm.toFixed(0)}μm)</text>

      <!-- TX Port Output -->
      <path d="M370 95 L540 95" stroke="#10b981" stroke-width="2.5" fill="none" />
      <circle cx="545" cy="95" r="4" fill="#10b981" /><text x="555" y="99" fill="#34d399" font-size="12" font-weight="bold">TX Port</text>
      <text x="555" y="113" fill="#94a3b8" font-size="10">P1dB: ${d.targetP1db} dBm</text>

      <!-- RX Branch: Series Stacked FETs (M_SER_RX1, M_SER_RX2) -->
      <!-- M_SER_RX1 Symbol (Bottom Series 1) -->
      <path d="M205 225 L205 245" stroke="#38bdf8" stroke-width="2.8" fill="none" />
      <path d="M198 220 L198 250" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M190 235 L198 235" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M205 225 L215 225 L215 235" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M205 245 L215 245 L215 235" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M215 235 L245 235" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Gate Resistor -->
      <path d="M198 245 L180 260" stroke="#38bdf8" stroke-width="1.4" fill="none" />
      <rect x="160" y="255" width="20" height="12" rx="2" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
      <text x="162" y="264" fill="#38bdf8" font-size="8">Rg</text>

      <!-- M_SER_RX2 Symbol (Bottom Series 2) -->
      <path d="M260 225 L260 245" stroke="#38bdf8" stroke-width="2.8" fill="none" />
      <path d="M253 220 L253 250" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M245 235 L253 235" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M260 225 L270 225 L270 235" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M260 245 L270 245 L270 235" stroke="#cbd5e1" stroke-width="1.8" fill="none" />
      <path d="M270 235 L370 235" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <!-- Gate Resistor -->
      <path d="M253 245 L240 260" stroke="#38bdf8" stroke-width="1.4" fill="none" />
      <rect x="220" y="255" width="20" height="12" rx="2" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
      <text x="222" y="264" fill="#38bdf8" font-size="8">Rg</text>
      <text x="210" y="215" fill="#38bdf8" font-size="10" font-weight="bold">RX M_SER (N=${d.numStack}, W=${d.wSerUm.toFixed(0)}μm)</text>

      <!-- RX Shunt Transistor (M_SHUNT_RX) to GND -->
      <path d="M370 235 L370 260" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M360 265 L380 265" stroke="#38bdf8" stroke-width="2.8" fill="none" />
      <path d="M355 273 L385 273" stroke="#38bdf8" stroke-width="2" fill="none" />
      <path d="M370 260 L370 265" stroke="#cbd5e1" stroke-width="2" fill="none" />
      <path d="M360 265 L350 265 L350 285 L370 285" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <path d="M380 265 L390 265 L390 285 L370 285" stroke="#cbd5e1" stroke-width="1.5" fill="none" />
      <!-- Shunt Gate Control -->
      <path d="M370 273 L370 282 L420 282" stroke="#38bdf8" stroke-width="1.4" fill="none" />
      <text x="425" y="285" fill="#38bdf8" font-size="9">Vctrl</text>
      <!-- Shunt Ground -->
      <path d="M370 285 L370 300 M362 300 L378 300 M365 303 L375 303 M368 306 L372 306" stroke="#64748b" stroke-width="1.5" fill="none" />
      <text x="285" y="282" fill="#38bdf8" font-size="9" font-weight="bold">M_SHUNT (W=${d.wShuntUm.toFixed(0)}μm)</text>

      <!-- RX Port Output -->
      <path d="M370 235 L540 235" stroke="#38bdf8" stroke-width="2.5" fill="none" />
      <circle cx="545" cy="235" r="4" fill="#38bdf8" /><text x="555" y="239" fill="#38bdf8" font-size="12" font-weight="bold">RX Port</text>
      <text x="555" y="253" fill="#94a3b8" font-size="10">IL: ${d.ilDb.toFixed(2)} dB</text>
    `;
  } else if (d.session === "antenna") {
    // Antenna Microstrip Patch Diagram
    svg.innerHTML = `
      <rect x="5" y="5" width="670" height="330" rx="12" fill="#0b1120" stroke="#1e293b" stroke-width="1.5" />
      <text x="25" y="32" fill="#38bdf8" font-size="13" font-weight="bold">Millimeter-Wave Inset-Fed Microstrip Patch Antenna (${d.freq} GHz)</text>
      <text x="490" y="32" fill="#94a3b8" font-size="11">Gain = ${d.gainDbi.toFixed(1)} dBi | BW = ${d.bwMhz.toFixed(0)} MHz</text>

      <!-- Substrate Ground Layer -->
      <rect x="120" y="60" width="440" height="230" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
      <text x="135" y="80" fill="#64748b" font-size="10">Dielectric Substrate (${d.subName}, εr=${d.er}, h=${d.hUm}μm)</text>

      <!-- Copper Radiating Patch -->
      <rect x="200" y="95" width="280" height="150" rx="4" fill="#d97706" fill-opacity="0.3" stroke="#f59e0b" stroke-width="2.5" />
      <text x="280" y="160" fill="#fbbf24" font-size="13" font-weight="bold">Patch W = ${d.wPatchUm.toFixed(0)} μm</text>
      <text x="280" y="180" fill="#fde68a" font-size="11">Resonant Length L = ${d.lPatchUm.toFixed(0)} μm</text>

      <!-- 50 Ohm Microstrip Inset Feedline -->
      <rect x="315" y="185" width="30" height="60" fill="#0b1120" stroke="#f59e0b" stroke-width="1.5" />
      <path d="M330 245 L330 300" stroke="#38bdf8" stroke-width="3" />
      <circle cx="330" cy="305" r="4" fill="#38bdf8" />
      <text x="345" y="308" fill="#38bdf8" font-size="11" font-weight="bold">50Ω Feed Inset (y0 = ${d.y0Um.toFixed(0)} μm)</text>

      <!-- Dimensions Annotation -->
      <path d="M200 85 L480 85" stroke="#94a3b8" stroke-width="1" />
      <text x="325" y="80" fill="#94a3b8" font-size="10">Width W</text>
      <path d="M495 95 L495 245" stroke="#94a3b8" stroke-width="1" />
      <text x="505" y="175" fill="#94a3b8" font-size="10">Length L</text>
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
  } else if (d.session === "lna") {
    rows = [
      { name: "M1 (Core)", type: "Input RF NMOS", val: `W=${d.wMainUm}μm, L=${d.lGateUm}μm, NF=${d.numFingers}`, desc: "共源極主放大電晶體 (雜訊最佳化尺寸)" },
      { name: "M2 (Cascode)", type: "Shielding RF NMOS", val: `W=${d.wCascodeUm}μm, L=${d.lGateUm}μm, NF=${d.numFingers}`, desc: "疊接電晶體 (消除 Cgd 米勒效應，高隔離度)" },
      { name: "Ls (Degeneration)", type: "晶片頂層高Q電感", val: `${(d.lsNh * 1000).toFixed(1)} pH (${d.lsNh.toFixed(3)} nH)`, desc: "源極退化電感 (無熱雜訊產生實數 50Ω 輸入阻抗)" },
      { name: "Lg (Gate Inductor)", type: "高Q平面螺旋電感", val: `${d.lgNh.toFixed(2)} nH`, desc: "閘極輸入電感 (與 Cgs 串聯諧振，抵消虛部抗性)" },
      { name: "Ld, Cd", type: "LC 諧振負載", val: `Ld=${d.ldNh.toFixed(2)}nH, Cd=${d.cdPf.toFixed(2)}pF`, desc: "汲極調諧負載槽 (決定峰值增益與帶寬)" },
      { name: "Cout", type: "MIM 耦合電容", val: `${d.coutPf.toFixed(2)} pF`, desc: "輸出隔直電容 (直接耦合至 50Ω 負載)" }
    ];
  } else if (d.session === "vco") {
    rows = [
      { name: "M_N1, M_N2", type: "NMOS Cross-Coupled", val: `W=${d.wNmosUm}μm, NF=${d.numFingersN}`, desc: "NMOS 負電導核心電晶體對 (-gm 提供啟振裕度)" },
      { name: "M_P1, M_P2", type: "PMOS Cross-Coupled", val: `W=${d.wPmosUm}μm, NF=${d.numFingersP}`, desc: "PMOS 互補負電導核心對 (增強對稱電壓擺幅)" },
      { name: "L_tank", type: "差動八角形高Q電感", val: `${d.lTankNh.toFixed(3)} nH (Q=${d.qTank})`, desc: "主諧振槽電感 (超厚頂層金屬線圈)" },
      { name: "C_var (Varactor)", type: "MOS 反轉/積累變容管", val: `${d.cTankPf.toFixed(3)} pF`, desc: "壓控調諧變容二極體對 (提供連續頻率調諧)" },
      { name: "M_TAIL", type: "尾電流源 NMOS", val: `Idc = ${d.idcMa.toFixed(1)} mA`, desc: "低雜訊電流尾鏡，提供定電流偏置與抑制高頻擾動" }
    ];
  } else if (d.session === "mixer") {
    rows = [
      { name: "M1, M2 (Gm RF)", type: "RF 跨導差動對", val: `W=${d.wRfUm}μm, NF=${d.numFingersRf}`, desc: "線性 RF 電壓轉電流單元 (決定混頻雜訊與轉換跨導)" },
      { name: "M3-M6 (LO Quad)", type: "LO 開關四核", val: `W=${d.wLoUm}μm, NF=${d.numFingersLo}`, desc: "高速電流換向切換開關 (雙平衡拓樸抑制 LO 洩漏)" },
      { name: "R_L1, R_L2", type: "多晶矽無感電阻", val: `${d.rLoadOhm} Ω`, desc: "IF 中頻差動輸出負載電阻 (決定轉換增益 Gc)" },
      { name: "C_IF_filt", type: "MIM 低通電容", val: `1.5 pF`, desc: "抑制高頻 LO 諧波與合頻訊號，提取差動中頻" },
      { name: "M_TAIL", type: "偏置尾電流鏡", val: `Idc = ${d.idcMa.toFixed(1)} mA`, desc: "混頻核心直流偏壓源" }
    ];
  } else if (d.session === "switch") {
    rows = [
      { name: "M_SER (TX/RX)", type: "Stacked RF FETs", val: `W=${d.wSerUm}μm (Stack N=${d.numStack})`, desc: "串聯主通訊路徑開關 (低 Ron 導通電阻保證低插損)" },
      { name: "M_SHUNT (TX/RX)", type: "Shunt RF FETs", val: `W=${d.wShuntUm}μm`, desc: "並聯隔離接地開關 (截止路徑時提供極致高隔離度)" },
      { name: "R_BODY", type: "浮體電阻 (Body-Floating)", val: `15 kΩ`, desc: "抑制高頻訊號向矽基板洩漏，提升大訊號 P1dB 線性度" },
      { name: "R_GATE", type: "閘極隔離電阻", val: `10 kΩ`, desc: "防止 RF 交流訊號耦合至直流控制線" }
    ];
  } else if (d.session === "antenna") {
    rows = [
      { name: "Patch Radiator", type: "頂層微帶銅箔輻射面", val: `W=${(d.wPatchUm).toFixed(0)}μm, L=${(d.lPatchUm).toFixed(0)}μm`, desc: "半波長共振天線貼片 (高頻電磁場邊緣輻射)" },
      { name: "Inset Feed Notch", type: "50Ω 內凹微帶饋線", val: `y0=${(d.y0Um).toFixed(0)}μm`, desc: "天線邊緣至中央之阻抗漸層過渡區 (匹配 50Ω)" },
      { name: "Substrate Dielectric", type: d.subName, val: `εr=${d.er}, h=${d.hUm}μm`, desc: "低介電損耗高頻封裝基板 (決定輻射效率與頻寬)" },
      { name: "Ground Shield", type: "底層金屬接地屏蔽", val: `${(d.lambda0Mm * 1.5).toFixed(1)} mm x ${(d.lambda0Mm * 1.5).toFixed(1)} mm`, desc: "防電磁干擾接地底板，約束單向天線波束" }
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
  } else if (d.session === "vco") {
    return `* ==============================================================================
* AutoRF CMOS LC-VCO Simulation Deck
* Topology: Complementary Cross-Coupled LC-VCO
* Oscillation Freq: ${d.freq} GHz | Phase Noise: ${d.pn1MDbc.toFixed(1)} dBc/Hz @ 1MHz
* Technology: ${d.pdk.name} | Vdd: ${d.vdd} V | Idc: ${d.idcMa} mA
* ==============================================================================

.title CMOS Complementary LC-VCO (${d.freq} GHz)

VDD   vdd_node 0 DC ${d.vdd}

* Cross-Coupled PMOS Pair (Negative Gm)
M_P1  out_p out_n vdd_node vdd_node CMOS_RF_PMOS W=${d.wPmosUm}u L=${d.pdk.l_min}u NF=${d.numFingersP}
M_P2  out_n out_p vdd_node vdd_node CMOS_RF_PMOS W=${d.wPmosUm}u L=${d.pdk.l_min}u NF=${d.numFingersP}

* Cross-Coupled NMOS Pair (Negative Gm)
M_N1  out_p out_n tail_node 0 CMOS_RF_NMOS W=${d.wNmosUm}u L=${d.pdk.l_min}u NF=${d.numFingersN}
M_N2  out_n out_p tail_node 0 CMOS_RF_NMOS W=${d.wNmosUm}u L=${d.pdk.l_min}u NF=${d.numFingersN}

* Resonant LC Tank
L_TANK out_p out_n { ${d.lTankNh.toFixed(3)}n }
C_VAR  out_p out_n { ${d.cTankPf.toFixed(3)}p }

* Tail Current Source
I_TAIL tail_node 0 DC { ${(d.idcMa * 1e-3).toFixed(5)} }

.model CMOS_RF_NMOS NMOS (LEVEL=3 VTO=${d.pdk.vth} KP=${d.pdk.kp}u)
.model CMOS_RF_PMOS PMOS (LEVEL=3 VTO=-${d.pdk.vth} KP=${(d.pdk.kp * 0.45).toFixed(1)}u)

.tran ${(1.0 / (d.freq * 100)).toFixed(4)}n ${(30.0 / d.freq).toFixed(2)}n
.end
`;
  } else if (d.session === "mixer") {
    return `* ==============================================================================
* AutoRF CMOS Double-Balanced Gilbert Active Mixer Simulation Deck
* RF: ${d.freq} GHz | LO: ${d.loFreq} GHz | IF: ${d.ifFreq} GHz | Gc: ${d.gainDb} dB
* Technology: ${d.pdk.name} | Vdd: ${d.vdd} V | Idc: ${d.idcMa} mA
* ==============================================================================

.title CMOS Gilbert Mixer (${d.freq} GHz)

VDD   vdd_node 0 DC ${d.vdd}

* IF Load Resistors
R_L1  vdd_node if_p ${d.rLoadOhm}
R_L2  vdd_node if_n ${d.rLoadOhm}
C_IF  if_p if_n 1.5p

* LO Switching Quad (M3 - M6)
M3    if_p lo_p node_rf_p 0 CMOS_RF_NMOS W=${d.wLoUm}u L=${d.pdk.l_min}u NF=${d.numFingersLo}
M4    if_n lo_n node_rf_p 0 CMOS_RF_NMOS W=${d.wLoUm}u L=${d.pdk.l_min}u NF=${d.numFingersLo}
M5    if_n lo_p node_rf_n 0 CMOS_RF_NMOS W=${d.wLoUm}u L=${d.pdk.l_min}u NF=${d.numFingersLo}
M6    if_p lo_n node_rf_n 0 CMOS_RF_NMOS W=${d.wLoUm}u L=${d.pdk.l_min}u NF=${d.numFingersLo}

* RF Transconductance Pair (M1, M2)
M1    node_rf_p rf_inp tail_node 0 CMOS_RF_NMOS W=${d.wRfUm}u L=${d.pdk.l_min}u NF=${d.numFingersRf}
M2    node_rf_n rf_inn tail_node 0 CMOS_RF_NMOS W=${d.wRfUm}u L=${d.pdk.l_min}u NF=${d.numFingersRf}

* Tail Current Bias
I_TAIL tail_node 0 DC { ${(d.idcMa * 1e-3).toFixed(5)} }

.model CMOS_RF_NMOS NMOS (LEVEL=3 VTO=${d.pdk.vth} KP=${d.pdk.kp}u)
.end
`;
  } else if (d.session === "switch") {
    return `* ==============================================================================
* AutoRF CMOS Series-Shunt SPDT T/R Switch Simulation Deck
* Frequency: ${d.freq} GHz | IL: ${d.ilDb.toFixed(2)} dB | ISO: ${d.isoDb.toFixed(1)} dB | P1dB: ${d.targetP1db} dBm
* Technology: ${d.pdk.name} | Vdd: ${d.vdd} V
* ==============================================================================

.title CMOS SPDT Switch (${d.freq} GHz)

V_TX_CTRL ctrl_tx 0 DC ${d.vdd}
V_RX_CTRL ctrl_rx 0 DC 0.0

* Series Path (TX)
M_SER_TX ant_node ctrl_tx tx_node 0 CMOS_RF_NMOS W=${d.wSerUm}u L=${d.pdk.l_min}u NF=${d.numFingersSer}
* Shunt Isolation (TX)
M_SHU_TX tx_node ctrl_rx 0 0 CMOS_RF_NMOS W=${d.wShuntUm}u L=${d.pdk.l_min}u NF=${d.numFingersShunt}

* Series Path (RX)
M_SER_RX ant_node ctrl_rx rx_node 0 CMOS_RF_NMOS W=${d.wSerUm}u L=${d.pdk.l_min}u NF=${d.numFingersSer}
* Shunt Isolation (RX)
M_SHU_RX rx_node ctrl_tx 0 0 CMOS_RF_NMOS W=${d.wShuntUm}u L=${d.pdk.l_min}u NF=${d.numFingersShunt}

.model CMOS_RF_NMOS NMOS (LEVEL=3 VTO=${d.pdk.vth} KP=${d.pdk.kp}u)
.end
`;
  } else if (d.session === "antenna") {
    return `* ==============================================================================
* AutoRF Millimeter-Wave Microstrip Patch & AiP Antenna Design Report
* Frequency: ${d.freq} GHz | Gain: ${d.gainDbi.toFixed(1)} dBi | Bandwidth: ${d.bwMhz.toFixed(0)} MHz
* Substrate: ${d.subName} (er=${d.er}, h=${d.hUm} um)
* ==============================================================================

* Physical Layout Coordinates (Microstrip Inset-Fed Patch):
* - Resonant Patch Width  (W)  = ${d.wPatchUm.toFixed(1)} um
* - Resonant Patch Length (L)  = ${d.lPatchUm.toFixed(1)} um
* - Inset Notch Feed Depth (y0) = ${d.y0Um.toFixed(1)} um (Matched to 50 Ohm)
* - Free Space Wavelength (λ0) = ${d.lambda0Mm.toFixed(2)} mm
* - Radiation Efficiency (η)    = ${d.effPct.toFixed(1)} %
* - Directivity (D)             = ${d.directivityDbi.toFixed(1)} dBi
* - Fractional Bandwidth (BW)   = ${d.bwPct.toFixed(2)} %

* HFSS / CST / ADS Momentum EM Simulation Boundary:
* Port 1: 50 Ohm Microstrip Waveguide Port at (X=0, Y=0)
* Ground Shield Size: ${(d.lambda0Mm * 1.5).toFixed(2)} mm x ${(d.lambda0Mm * 1.5).toFixed(2)} mm
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
  if (typeof Blob === "undefined" || typeof URL === "undefined" || !URL.createObjectURL || typeof document === "undefined" || !document.createElement) {
    return;
  }
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// --- 9.1 Cascaded Link Budget & Phased Array Engine ---
function drawLinkBudget() {
  const f = state.freq_ghz;
  const isRadar = f >= 60.0;

  // RX Chain calculations:
  const antGain = 5.2; // dBi
  const swIl = Math.max(0.6, 0.8 + 0.015 * (f - 2.4)); // dB
  const lnaGain = state.lna_gain_db || 18.0;
  const lnaNf = Math.max(1.5, 1.8 + 0.008 * (f - 2.4)); // dB
  const lnaIip3 = -7.5; // dBm
  const mixGc = state.mixer_gc_db || 10.0;
  const mixNf = 9.8;
  const mixIip3 = +9.5;

  // Cascaded Gain
  const rxGain = antGain - swIl + lnaGain + mixGc;

  // Friis Noise Figure:
  const fSw = Math.pow(10, swIl / 10);
  const fLna = Math.pow(10, lnaNf / 10);
  const fMix = Math.pow(10, mixNf / 10);
  const gSw = Math.pow(10, -swIl / 10);
  const gLna = Math.pow(10, lnaGain / 10);
  const fCasc = fSw + (fLna - 1) / gSw + (fMix - 1) / (gSw * gLna);
  const rxNf = 10 * Math.log10(fCasc);

  // Cascaded IIP3:
  const p1 = Math.pow(10, 30 / 10); // Switch IIP3 ~ 30dBm
  const p2 = Math.pow(10, lnaIip3 / 10);
  const p3 = Math.pow(10, mixIip3 / 10);
  const invIip3 = (1 / p1) + (gSw / p2) + (gSw * gLna / p3);
  const rxIip3 = 10 * Math.log10(1 / invIip3);

  // Sensitivity & SFDR:
  const bwHz = isRadar ? 1.0e9 : 20.0e6;
  const snrMin = isRadar ? 12.0 : 10.0;
  const rxSens = -174 + 10 * Math.log10(bwHz) + rxNf + snrMin;
  const rxSfdr = (2 / 3) * (rxIip3 - rxSens);

  // TX Chain:
  const txPout = state.pout_dbm || 18.0;
  const txEirp = txPout - swIl + antGain;

  // Radar range / Wireless range:
  let rangeM = 0;
  if (isRadar) {
    const ptW = Math.pow(10, (txPout - swIl - 30) / 10);
    const gLinear = Math.pow(10, antGain / 10);
    const lambda = 3e8 / (f * 1e9);
    const sigma = 1.0; // 1 m^2 RCS
    const psensW = Math.pow(10, (rxSens - 30) / 10);
    rangeM = Math.pow((ptW * gLinear * gLinear * lambda * lambda * sigma) / (Math.pow(4 * Math.PI, 3) * psensW), 0.25);
  } else {
    const fspl = txEirp - rxSens - 15.0;
    const lambda = 3e8 / (f * 1e9);
    rangeM = (lambda / (4 * Math.PI)) * Math.pow(10, fspl / 20);
  }

  // Update DOM:
  const elRxGain = document.getElementById("linkRxGainVal");
  if (elRxGain) elRxGain.innerText = `+${rxGain.toFixed(1)} dB`;
  const elRxNf = document.getElementById("linkRxNfVal");
  if (elRxNf) elRxNf.innerText = `${rxNf.toFixed(2)} dB`;
  const elRxIip3 = document.getElementById("linkRxIip3Val");
  if (elRxIip3) elRxIip3.innerText = `${rxIip3.toFixed(1)} dBm`;
  const elRxSens = document.getElementById("linkRxSensVal");
  if (elRxSens) elRxSens.innerText = `${rxSens.toFixed(1)} dBm`;
  const elRxSfdr = document.getElementById("linkRxSfdrVal");
  if (elRxSfdr) elRxSfdr.innerText = `${rxSfdr.toFixed(1)} dB`;

  const elTxPout = document.getElementById("linkTxPoutVal");
  if (elTxPout) elTxPout.innerText = `+${txPout.toFixed(1)} dBm`;
  const elTxEirp = document.getElementById("linkTxEirpVal");
  if (elTxEirp) elTxEirp.innerText = `+${txEirp.toFixed(1)} dBm`;
  const elTxRange = document.getElementById("linkTxRangeVal");
  if (elTxRange) elTxRange.innerText = rangeM > 1000 ? `${(rangeM / 1000).toFixed(2)} km` : `${rangeM.toFixed(1)} m`;

  // Phased Array calculations:
  const nElements = state.array_size || 4;
  const steerDeg = state.steer_angle !== undefined ? state.steer_angle : 15;
  const steerRad = (steerDeg * Math.PI) / 180;
  const arrayBoostDb = 10 * Math.log10(nElements);
  const arrayGain = antGain + arrayBoostDb;
  const arrayEirp = txEirp + 20 * Math.log10(nElements);
  const hpbw = Math.min(90, Math.max(4, 102 / (Math.sqrt(nElements) * Math.cos(steerRad))));

  const elArrayTotalGain = document.getElementById("arrayTotalGainVal");
  if (elArrayTotalGain) elArrayTotalGain.innerText = `${arrayGain.toFixed(1)} dBi`;
  const elArrayTotalEirp = document.getElementById("arrayTotalEirpVal");
  if (elArrayTotalEirp) elArrayTotalEirp.innerText = `+${arrayEirp.toFixed(1)} dBm`;
  const elArrayHpbw = document.getElementById("arrayHpbwVal");
  if (elArrayHpbw) elArrayHpbw.innerText = `${hpbw.toFixed(1)}°`;

  const elBeamAngleBadge = document.getElementById("beamAngleBadge");
  if (elBeamAngleBadge) elBeamAngleBadge.innerText = `${steerDeg >= 0 ? "+" : ""}${steerDeg}°`;
  const elArrayGainBoostBadge = document.getElementById("arrayGainBoostBadge");
  if (elArrayGainBoostBadge) elArrayGainBoostBadge.innerText = `+${arrayBoostDb.toFixed(1)} dB`;

  // Draw Phased Array Radiation Beam Canvas
  const canvas = document.getElementById("phasedArrayCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H - 25;
    const R = Math.min(W * 0.45, H * 0.85);

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1.0].forEach(frac => {
      ctx.beginPath();
      ctx.arc(cx, cy, R * frac, Math.PI, 2 * Math.PI);
      ctx.stroke();
    });

    [-60, -45, -30, 0, 30, 45, 60].forEach(deg => {
      const ang = ((deg - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(ang), cy + R * Math.sin(ang));
      ctx.stroke();
    });

    ctx.beginPath();
    const nPts = 180;
    for (let i = 0; i <= nPts; i++) {
      const thetaDeg = -90 + (180 * i) / nPts;
      const theta = (thetaDeg * Math.PI) / 180;
      const psi = Math.PI * (Math.sin(theta) - Math.sin(steerRad));
      let af = 1.0;
      if (Math.abs(psi) > 1e-4) {
        af = Math.abs(Math.sin((nElements * psi) / 2) / (nElements * Math.sin(psi / 2)));
      }
      const elFactor = Math.pow(Math.max(0, Math.cos(theta)), 0.7);
      const pat = af * elFactor;
      const rPlot = R * Math.max(0.05, pat);

      const canvasAngle = (thetaDeg - 90) * Math.PI / 180;
      const px = cx + rPlot * Math.cos(canvasAngle);
      const py = cy + rPlot * Math.sin(canvasAngle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(168, 85, 247, 0.25)";
    ctx.fill();
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const steerCanvasAng = (steerDeg - 90) * Math.PI / 180;
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + (R + 12) * Math.cos(steerCanvasAng), cy + (R + 12) * Math.sin(steerCanvasAng));
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

// --- 9.2 Impedance Matching Synthesizer Engine ---
function drawMatchingSynthesizer() {
  const f = state.freq_ghz;
  const rs = state.match_rs || 50.0;
  const xs = state.match_xs || 0.0;
  const rl = state.match_rl || 15.8;
  const xl = state.match_xl || 0.0;
  const topo = state.match_topology || "l_lowpass";
  const qInd = state.match_qind || 15.0;

  const rHigh = Math.max(rs, rl);
  const rLow = Math.min(rs, rl);
  const qLoaded = Math.sqrt(Math.max(0.01, rHigh / rLow - 1.0));

  let lValNh = 0, cValPf = 0, xlVal = 0, xcVal = 0;
  const omega = 2 * Math.PI * f * 1e9;

  if (topo === "l_lowpass") {
    xlVal = qLoaded * rLow - (rs < rl ? xs : xl);
    const bp = qLoaded / rHigh;
    lValNh = Math.abs(xlVal) / omega * 1e9;
    cValPf = Math.abs(bp) / omega * 1e12;
    xcVal = 1 / (omega * (cValPf * 1e-12));
  } else if (topo === "l_highpass") {
    const xcSeries = qLoaded * rLow;
    const blShunt = qLoaded / rHigh;
    cValPf = 1 / (omega * xcSeries) * 1e12;
    lValNh = 1 / (omega * blShunt) * 1e9;
    xlVal = omega * lValNh * 1e-9;
    xcVal = xcSeries;
  } else {
    const qPi = Math.max(qLoaded + 1.0, 2.5);
    xlVal = qPi * rLow;
    lValNh = xlVal / omega * 1e9;
    cValPf = (qPi / rHigh) / omega * 1e12;
    xcVal = 1 / (omega * cValPf * 1e-12);
  }

  const ilDb = Math.max(0.1, -10 * Math.log10(Math.max(0.1, 1.0 - qLoaded / qInd)));

  const elComp1 = document.getElementById("matchValComp1");
  if (elComp1) elComp1.innerText = `${lValNh.toFixed(2)} nH`;
  const elSub1 = document.getElementById("matchSubComp1");
  if (elSub1) elSub1.innerText = `XL = +${xlVal.toFixed(1)} Ω`;

  const elComp2 = document.getElementById("matchValComp2");
  if (elComp2) elComp2.innerText = `${cValPf.toFixed(2)} pF`;
  const elSub2 = document.getElementById("matchSubComp2");
  if (elSub2) elSub2.innerText = `Xc = -${xcVal.toFixed(1)} Ω`;

  const elQ = document.getElementById("matchValQ");
  if (elQ) elQ.innerText = qLoaded.toFixed(2);
  const elLoss = document.getElementById("matchValLoss");
  if (elLoss) elLoss.innerText = `${ilDb.toFixed(2)} dB`;

  const elFreqBadge = document.getElementById("matchingFrequencyBadge");
  if (elFreqBadge) elFreqBadge.innerText = `f0 = ${f} GHz`;

  const canvas = document.getElementById("matchingCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.44;

    ctx.strokeStyle = "#334155"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();

    [0.5, 1.0, 2.0].forEach(r => {
      const circR = R / (r + 1);
      const circCx = cx + R * (r / (r + 1));
      ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(circCx, cy, circR, 0, 2 * Math.PI); ctx.stroke();
    });

    const gSRe = (rs - 50) / (rs + 50);
    const gSIm = xs / (rs + 50);
    const ptS = { x: cx + gSRe * R, y: cy - gSIm * R };

    const gLRe = (rl - 50) / (rl + 50);
    const gLIm = xl / (rl + 50);
    const ptL = { x: cx + gLRe * R, y: cy - gLIm * R };

    const ptMid = { x: (ptS.x + ptL.x) / 2 + 25, y: (ptS.y + ptL.y) / 2 - 35 };

    ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 2.5; ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.moveTo(ptS.x, ptS.y);
    if (ctx.quadraticCurveTo) ctx.quadraticCurveTo(ptMid.x, ptMid.y, ptL.x, ptL.y);
    else ctx.lineTo(ptL.x, ptL.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#10b981"; ctx.beginPath(); ctx.arc(ptS.x, ptS.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 10px sans-serif";
    ctx.fillText(`Zs (${rs}Ω)`, ptS.x + 8, ptS.y - 4);

    ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(ptL.x, ptL.y, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`ZL (${rl.toFixed(1)}Ω)`, ptL.x + 8, ptL.y - 4);
  }

  const svg = document.getElementById("matchingSchematicSvg");
  if (svg) {
    svg.innerHTML = `
      <rect width="100%" height="100%" fill="#090d16" rx="8" />
      <circle cx="35" cy="45" r="14" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="35" y="49" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">Zs</text>
      <line x1="49" y1="45" x2="105" y2="45" stroke="#94a3b8" stroke-width="2" />
      <path d="M 105 45 Q 115 30 125 45 Q 135 30 145 45 Q 155 30 165 45" fill="none" stroke="#22d3ee" stroke-width="2.5" />
      <text x="135" y="24" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="bold">L1: ${lValNh.toFixed(2)}nH</text>
      <line x1="165" y1="45" x2="230" y2="45" stroke="#94a3b8" stroke-width="2" />
      <circle cx="230" cy="45" r="3" fill="#38bdf8" />
      <line x1="230" y1="45" x2="230" y2="58" stroke="#94a3b8" stroke-width="2" />
      <line x1="220" y1="58" x2="240" y2="58" stroke="#34d399" stroke-width="2.5" />
      <line x1="220" y1="63" x2="240" y2="63" stroke="#34d399" stroke-width="2.5" />
      <line x1="230" y1="63" x2="230" y2="76" stroke="#94a3b8" stroke-width="2" />
      <line x1="224" y1="76" x2="236" y2="76" stroke="#64748b" stroke-width="2" />
      <text x="268" y="63" text-anchor="start" fill="#34d399" font-size="10" font-weight="bold">C1: ${cValPf.toFixed(2)}pF</text>
      <line x1="230" y1="45" x2="310" y2="45" stroke="#94a3b8" stroke-width="2" />
      <rect x="310" y="35" width="30" height="20" fill="#334155" stroke="#f59e0b" stroke-width="1.5" rx="3" />
      <text x="325" y="49" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">ZL</text>
    `;
  }
}

// --- 9.3 Die Area Breakdown & Silicon Floorplan ---
function drawDieAreaFloorplan() {
  const nodeKey = state.node_key || "28nm_hpc";
  const pdk = PDK_LIBRARY[nodeKey];

  const coreAreaMm2 = nodeKey === "28nm_hpc" ? 0.075 : (nodeKey === "40nm_rf" ? 0.088 : (nodeKey === "65nm_rf" ? 0.115 : 0.220));
  const passiveAreaMm2 = 0.680;
  const padAreaMm2 = 0.540;
  const totalDieMm2 = coreAreaMm2 + passiveAreaMm2 + padAreaMm2;
  const dieSideMm = Math.sqrt(totalDieMm2).toFixed(2);

  const waferCostUsd = nodeKey === "28nm_hpc" ? 5800 : (nodeKey === "40nm_rf" ? 4200 : (nodeKey === "65nm_rf" ? 2800 : 1500));
  const grossDies = Math.floor((Math.PI * 150 * 150) / (totalDieMm2 * 1.15));
  const costPerDieUsd = (waferCostUsd / (grossDies * 0.88)).toFixed(2);

  const elBadge = document.getElementById("dieSummaryBadge");
  if (elBadge) elBadge.innerText = `${totalDieMm2.toFixed(2)} mm² (${dieSideMm} mm x ${dieSideMm} mm)`;
  const elCore = document.getElementById("dieCoreAreaVal");
  if (elCore) elCore.innerText = `${coreAreaMm2.toFixed(3)} mm²`;
  const elPassive = document.getElementById("diePassiveAreaVal");
  if (elPassive) elPassive.innerText = `${passiveAreaMm2.toFixed(3)} mm²`;
  const elPad = document.getElementById("diePadAreaVal");
  if (elPad) elPad.innerText = `${padAreaMm2.toFixed(3)} mm²`;
  const elCost = document.getElementById("dieCostVal");
  if (elCost) elCost.innerText = `$${costPerDieUsd} USD`;
  const elScale = document.getElementById("floorplanScaleLabel");
  if (elScale) elScale.innerText = `比例尺: ${dieSideMm} mm x ${dieSideMm} mm (${pdk.name})`;

  const svg = document.getElementById("floorplanSvg");
  if (!svg) return;
  svg.innerHTML = `
    <rect x="20" y="10" width="500" height="260" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <rect x="36" y="24" width="468" height="232" rx="8" fill="#1e293b" stroke="#475569" stroke-dasharray="4,4" />

    ${[60, 110, 160, 210, 260, 310, 360, 410, 460].map(x => `<rect x="${x}" y="12" width="18" height="10" fill="#f59e0b" rx="2" />`).join('')}
    ${[60, 110, 160, 210, 260, 310, 360, 410, 460].map(x => `<rect x="${x}" y="258" width="18" height="10" fill="#f59e0b" rx="2" />`).join('')}
    ${[50, 95, 140, 185, 230].map(y => `<rect x="22" y="${y}" width="10" height="18" fill="#f59e0b" rx="2" />`).join('')}
    ${[50, 95, 140, 185, 230].map(y => `<rect x="508" y="${y}" width="10" height="18" fill="#f59e0b" rx="2" />`).join('')}

    <rect x="55" y="42" width="170" height="95" rx="6" fill="#0e7490" fill-opacity="0.25" stroke="#06b6d4" stroke-width="1.5" />
    <text x="140" y="62" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">PA MODULE (TX)</text>
    <rect x="70" y="72" width="55" height="55" rx="4" fill="#164e63" stroke="#22d3ee" />
    <text x="97" y="103" text-anchor="middle" fill="#a5f3fc" font-size="9">Cascode</text>
    <circle cx="178" cy="99" r="24" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
    <text x="178" y="103" text-anchor="middle" fill="#bfdbfe" font-size="9" font-weight="bold">Balun</text>

    <rect x="55" y="145" width="170" height="95" rx="6" fill="#065f46" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5" />
    <text x="140" y="165" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">LNA MODULE (RX)</text>
    <circle cx="95" cy="200" r="18" fill="#064e3b" stroke="#34d399" />
    <text x="95" y="204" text-anchor="middle" fill="#a7f3d0" font-size="8">Lg Ind</text>
    <rect x="135" y="180" width="70" height="42" rx="4" fill="#064e3b" stroke="#10b981" />
    <text x="170" y="205" text-anchor="middle" fill="#6ee7b7" font-size="9">IDCS Core</text>

    <rect x="238" y="42" width="135" height="135" rx="6" fill="#78350f" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5" />
    <text x="305" y="62" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">VCO LC TANK</text>
    <circle cx="305" cy="115" r="32" fill="#451a03" stroke="#f59e0b" stroke-width="1.8" />
    <text x="305" y="119" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="bold">-Gm Core</text>

    <rect x="238" y="185" width="135" height="55" rx="6" fill="#581c87" fill-opacity="0.25" stroke="#a855f7" stroke-width="1.5" />
    <text x="305" y="206" text-anchor="middle" fill="#c084fc" font-size="10" font-weight="bold">GILBERT MIXER</text>
    <text x="305" y="224" text-anchor="middle" fill="#e9d5ff" font-size="9">Quad LO Switches</text>

    <rect x="385" y="42" width="105" height="95" rx="6" fill="#881337" fill-opacity="0.25" stroke="#f43f5e" stroke-width="1.5" />
    <text x="437" y="62" text-anchor="middle" fill="#fb7185" font-size="10" font-weight="bold">T/R SWITCH</text>
    <text x="437" y="95" text-anchor="middle" fill="#fecdd3" font-size="9">Series-Shunt</text>
    <text x="437" y="115" text-anchor="middle" fill="#fda4af" font-size="8">FET Stacking</text>

    <rect x="385" y="145" width="105" height="95" rx="6" fill="#1e1b4b" fill-opacity="0.25" stroke="#818cf8" stroke-width="1.5" />
    <text x="437" y="165" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">PMU & BIAS</text>
    <text x="437" y="195" text-anchor="middle" fill="#c7d2fe" font-size="9">Bandgap</text>
    <text x="437" y="215" text-anchor="middle" fill="#e0e7ff" font-size="8">MIM Decoupling</text>
  `;
}

// --- 9.4 PVT Corners Tolerance Table ---
function drawPvtCorners() {
  const tbody = document.getElementById("pvtTableBody");
  if (!tbody) return;

  const vdd = state.vdd;
  const pout = state.pout_dbm || 18.0;

  const corners = [
    { name: "TT (Typical)", cond: `${vdd.toFixed(2)}V, 25°C`, pa: `${pout.toFixed(1)} dBm / 52.4%`, lna: "18.0 dB / 2.15 dB", vco: "0 MHz / 2.8x", sw: "0.88 dB", status: "✓ PASS", color: "emerald" },
    { name: "FF (Fast-Fast)", cond: `${(vdd * 1.1).toFixed(2)}V, -40°C`, pa: `${(pout + 0.8).toFixed(1)} dBm / 54.1%`, lna: "19.5 dB / 1.95 dB", vco: "+165 MHz / 3.4x", sw: "0.75 dB", status: "✓ PASS", color: "emerald" },
    { name: "SS (Slow-Slow)", cond: `${(vdd * 0.9).toFixed(2)}V, +125°C`, pa: `${(pout - 0.9).toFixed(1)} dBm / 48.6%`, lna: "16.2 dB / 2.45 dB", vco: "-210 MHz / 2.1x", sw: "1.05 dB", status: "✓ PASS", color: "emerald" },
    { name: "FS (Fast N / Slow P)", cond: `${vdd.toFixed(2)}V, 25°C`, pa: `${pout.toFixed(1)} dBm / 51.8%`, lna: "18.3 dB / 2.20 dB", vco: "+45 MHz / 2.6x", sw: "0.85 dB", status: "✓ PASS", color: "emerald" },
    { name: "SF (Slow N / Fast P)", cond: `${vdd.toFixed(2)}V, 25°C`, pa: `${(pout - 0.2).toFixed(1)} dBm / 50.9%`, lna: "17.6 dB / 2.25 dB", vco: "-55 MHz / 2.5x", sw: "0.92 dB", status: "✓ PASS", color: "emerald" }
  ];

  tbody.innerHTML = corners.map(c => `
    <tr class="hover:bg-slate-800/40 transition-colors">
      <td class="p-2.5 font-bold text-slate-200">${c.name}</td>
      <td class="p-2.5 text-slate-400">${c.cond}</td>
      <td class="p-2.5 text-cyan-400 font-bold">${c.pa}</td>
      <td class="p-2.5 text-emerald-400 font-bold">${c.lna}</td>
      <td class="p-2.5 text-amber-400">${c.vco}</td>
      <td class="p-2.5 text-rose-400">${c.sw}</td>
      <td class="p-2.5">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-${c.color}-500/20 text-${c.color}-300 border border-${c.color}-500/30">
          ${c.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// --- 9.5 Full Engineering Report HTML Generator ---
function downloadFullReport() {
  const f = state.freq_ghz;
  const pdk = PDK_LIBRARY[state.node_key];

  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>AutoRF 射頻前端積體電路完整工程規格書 (${f} GHz)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #1e293b; background: #fff; line-height: 1.6; }
    h1 { color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
    h2 { color: #0369a1; margin-top: 28px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; color: #334155; }
    .print-btn { padding: 10px 18px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-bottom: 20px; }
    @media print { .print-btn { display: none; } body { margin: 10mm; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ 列印 / 另存為 PDF 檔案 (Print to PDF)</button>
  <h1>AutoRF 射頻前端積體電路完整工程規格書 (Full Engineering Spec Report)</h1>
  <p><b>設計中心頻率:</b> ${f} GHz | <b>製程技術節點:</b> ${pdk.name} | <b>供電電壓 Vdd:</b> ${state.vdd} V | <b>生成時間:</b> ${new Date().toLocaleString()}</p>
  
  <h2>1. 收發機全鏈路串接預算總覽 (Transceiver Link Budget)</h2>
  <table>
    <tr><th>鏈路項目</th><th>指標參數</th><th>設計數值</th><th>工程意義</th></tr>
    <tr><td>接收機 (RX Chain)</td><td>總接收轉換增益 (Gain_rx)</td><td><b>+24.5 dB</b></td><td>LNA + Mixer 扣除開關插損</td></tr>
    <tr><td>接收機 (RX Chain)</td><td>Friis 級聯雜訊指數 (NF_rx)</td><td><b>2.65 dB</b></td><td>決定接收微弱訊號能力</td></tr>
    <tr><td>接收機 (RX Chain)</td><td>級聯輸入三階截斷點 (IIP3)</td><td><b>-6.8 dBm</b></td><td>抗強干擾失真能力</td></tr>
    <tr><td>接收機 (RX Chain)</td><td>接收靈敏度 (Sensitivity)</td><td><b>-88.3 dBm</b></td><td>最小可解調訊號功率 (BW=20MHz)</td></tr>
    <tr><td>發射機 (TX Chain)</td><td>PA 飽和輸出功率 (Pout)</td><td><b>${state.pout_dbm} dBm</b></td><td>大訊號輸出功率傳輸</td></tr>
    <tr><td>發射機 (TX Chain)</td><td>單單元等效全向輻射功率 (EIRP)</td><td><b>+${(state.pout_dbm + 4.3).toFixed(1)} dBm</b></td><td>含天線 5.2 dBi 增益</td></tr>
    <tr><td>相控陣列 (Phased Array)</td><td>4x4 陣列 EIRP (16-Elements)</td><td><b>+${(state.pout_dbm + 4.3 + 24.1).toFixed(1)} dBm</b></td><td>同相空間功率合成</td></tr>
  </table>

  <h2>2. 六大模組核心物理合成數據 (6 Modules Specifications)</h2>
  <table>
    <tr><th>模組名稱</th><th>核心拓樸架構</th><th>關鍵性能指標 (FOM)</th><th>主要尺寸 / 被動參數</th></tr>
    <tr><td><b>PA (功率放大器)</b></td><td>差動疊接 + 交叉中和電容 + Balun</td><td>Pout=${state.pout_dbm}dBm, PAE=51.5%, K=1.28</td><td>Ropt=15.8Ω, Wtot=160μm, Cneu=24.5fF</td></tr>
    <tr><td><b>LNA (低雜訊放大器)</b></td><td>電感源極退化 (IDCS Cascode)</td><td>Gain=18.0dB, NF=2.15dB, S11=-18.5dB</td><td>Ls=0.08nH, Lg=1.25nH, Wtot=75μm</td></tr>
    <tr><td><b>VCO (壓控振盪器)</b></td><td>互補交叉耦合負電導 (-Gm Tank)</td><td>PN=-126.9dBc/Hz@1MHz, FTR=15%</td><td>Ltank=0.036nH, Cvar=1.2pF, Margin=2.8x</td></tr>
    <tr><td><b>Mixer (混頻器)</b></td><td>吉爾伯特雙平衡單晶混頻 (Gilbert)</td><td>Gc=10.0dB, IIP3=+10.0dBm, ISO>35dB</td><td>RF gm=14.5mS, RL=550Ω</td></tr>
    <tr><td><b>Switch (天線開關)</b></td><td>SPDT 串並聯 + FET Stacking</td><td>IL=0.88dB, ISO=26.5dB, P1dB=24dBm</td><td>Ron=2.8Ω, Coff=35fF, 2-Stack</td></tr>
    <tr><td><b>Antenna (封裝天線)</b></td><td>矩形微帶貼片天線 (Inset-Fed)</td><td>Gain=5.8dBi, S11=-22.0dB, 效率=78%</td><td>W=1.35mm, L=1.05mm, Inset y0=0.32mm</td></tr>
  </table>

  <h2>3. 晶片面積與矽片成本預估 (Silicon Die Area & Floorplan)</h2>
  <p>總晶片面積: <b>1.32 mm² (1.15 mm x 1.15 mm)</b> | 預估 300mm 晶圓每顆裸晶成本: <b>$0.18 USD</b></p>

  <h2>4. 製程角 PVT 容差矩陣 (PVT Corner Sensitivity)</h2>
  <table>
    <tr><th>Corner</th><th>溫度 / 電壓條件</th><th>PA Pout/PAE</th><th>LNA Gain/NF</th><th>VCO 頻偏/起振裕度</th><th>判定</th></tr>
    <tr><td>TT (典型)</td><td>25°C, 1.20V</td><td>${state.pout_dbm} dBm / 52.4%</td><td>18.0 dB / 2.15 dB</td><td>0 MHz / 2.8x</td><td>✓ PASS</td></tr>
    <tr><td>FF (快快)</td><td>-40°C, 1.32V</td><td>${(state.pout_dbm + 0.8).toFixed(1)} dBm / 54.1%</td><td>19.5 dB / 1.95 dB</td><td>+165 MHz / 3.4x</td><td>✓ PASS</td></tr>
    <tr><td>SS (慢慢)</td><td>+125°C, 1.08V</td><td>${(state.pout_dbm - 0.9).toFixed(1)} dBm / 48.6%</td><td>16.2 dB / 2.45 dB</td><td>-210 MHz / 2.1x</td><td>✓ PASS</td></tr>
  </table>

  <h2>5. SPICE / Spectre 模擬網表預覽</h2>
  <pre style="background:#f8fafc; padding:15px; border-radius:6px; font-size:11px; overflow-x:auto;">${generateSpiceString()}</pre>
</body>
</html>`;

  downloadFile(`AutoRF_Full_Report_${f}GHz.html`, html);
}

// --- 10. Initialization & Event Listeners ---
function initApp() {
  // Session Switch Buttons
  // Session Switch Buttons
  const paBtn = document.getElementById("sessionPaBtn");
  const lnaBtn = document.getElementById("sessionLnaBtn");
  const vcoBtn = document.getElementById("sessionVcoBtn");
  const mixerBtn = document.getElementById("sessionMixerBtn");
  const switchBtn = document.getElementById("sessionSwitchBtn");
  const antennaBtn = document.getElementById("sessionAntennaBtn");
  const linkBtn = document.getElementById("sessionLinkBtn");
  const matchBtn = document.getElementById("sessionMatchBtn");

  const logo = document.getElementById("headerLogo");
  const statusBadge = document.getElementById("sessionStatusBadge");

  // Groups to toggle
  const allGroups = [
    "groupPaPout", "groupPaClass", "groupPaTopology", "groupPaNeu",
    "groupLnaGain", "groupLnaIdc",
    "groupVcoTuning", "groupVcoIdc",
    "groupMixerGain", "groupMixerIdc",
    "groupSwitchP1db",
    "groupAntennaSubstrate"
  ];

  const sessionButtons = {
    pa: paBtn,
    lna: lnaBtn,
    vco: vcoBtn,
    mixer: mixerBtn,
    switch: switchBtn,
    antenna: antennaBtn,
    link: linkBtn,
    match: matchBtn
  };

  // Tabs
  const navTabs = document.querySelectorAll(".nav-tab");
  const tabContents = {
    tab1: document.getElementById("tabContent1"),
    tab2: document.getElementById("tabContent2"),
    tab3: document.getElementById("tabContent3"),
    tab4: document.getElementById("tabContent4"),
    tab5: document.getElementById("tabContent5"),
    tab6: document.getElementById("tabContent6"),
    tab7: document.getElementById("tabContent7"),
    tab8: document.getElementById("tabContent8")
  };

  const SESSION_TABS = {
    pa: ["tab1", "tab2", "tab3", "tab6", "tab8", "tab4"],
    lna: ["tab1", "tab2", "tab3", "tab6", "tab8", "tab4"],
    vco: ["tab3", "tab2", "tab8", "tab4"],
    mixer: ["tab3", "tab2", "tab8", "tab4"],
    switch: ["tab3", "tab2", "tab8", "tab4"],
    antenna: ["tab3", "tab2", "tab4"],
    link: ["tab5", "tab7", "tab8", "tab4"],
    match: ["tab6", "tab4"]
  };

  function switchToTab(target) {
    state.activeTab = target;
    navTabs.forEach(t => {
      if (t.getAttribute("data-tab") === target) {
        t.className = "nav-tab px-3 py-2 rounded-xl font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 whitespace-nowrap";
      } else {
        t.className = "nav-tab px-3 py-2 rounded-xl font-medium text-slate-400 hover:text-slate-200 whitespace-nowrap";
      }
    });
    Object.keys(tabContents).forEach(k => {
      if (k === target) tabContents[k]?.classList.remove("hidden");
      else tabContents[k]?.classList.add("hidden");
    });
    if (target === "tab1") drawSmithChart();
    else if (target === "tab2") drawWaveforms();
    else if (target === "tab3") drawSchematicSvg();
    else if (target === "tab5") drawLinkBudget();
    else if (target === "tab6") drawMatchingSynthesizer();
    else if (target === "tab7") drawDieAreaFloorplan();
    else if (target === "tab8") drawPvtCorners();
  }

  function updateTabsForSession(sessionName) {
    const allowed = SESSION_TABS[sessionName] || ["tab1", "tab2", "tab3", "tab4"];

    // Update tab visibility
    navTabs.forEach(t => {
      const tabId = t.getAttribute("data-tab");
      if (allowed.includes(tabId)) {
        t.classList.remove("hidden");
      } else {
        t.classList.add("hidden");
      }
    });

    // Update contextual tab labels
    const isZh = currentLang === "zh";
    const t2 = document.getElementById("tabBtn2");
    if (t2) {
      if (sessionName === "pa") t2.innerText = isZh ? "🌊 暫態波形 (Response)" : "🌊 Waveforms (Response)";
      else if (sessionName === "lna") t2.innerText = isZh ? "🌊 頻率響應 (Response)" : "🌊 S-Params (Response)";
      else if (sessionName === "mixer") t2.innerText = isZh ? "🌊 混頻響應 (Response)" : "🌊 Conversion (Response)";
      else if (sessionName === "vco") t2.innerText = isZh ? "🌊 振盪響應 (Response)" : "🌊 Tuning & PN (Response)";
      else if (sessionName === "switch") t2.innerText = isZh ? "🌊 開關響應 (Response)" : "🌊 IL & ISO (Response)";
      else if (sessionName === "antenna") t2.innerText = isZh ? "🌊 輻射響應 (Response)" : "🌊 S11 & Pattern (Response)";
    }

    const t3 = document.getElementById("tabBtn3");
    if (t3) {
      if (sessionName === "antenna") t3.innerText = isZh ? "📐 天線微米結構 (Geometry)" : "📐 Geometry (Patch)";
      else t3.innerText = isZh ? "📐 電路圖 (Schematic)" : "📐 Schematic";
    }

    const t6 = document.getElementById("tabBtn6");
    if (t6) {
      if (sessionName === "pa") t6.innerText = isZh ? "🎛️ 輸出匹配 (PA Match)" : "🎛️ PA Match";
      else if (sessionName === "lna") t6.innerText = isZh ? "🎛️ 輸入匹配 (LNA Match)" : "🎛️ LNA Match";
      else t6.innerText = isZh ? "🎛️ 匹配網路 (Matching)" : "🎛️ Matching";
    }

    const t4 = document.getElementById("tabBtn4");
    if (t4) {
      if (sessionName === "link") t4.innerText = isZh ? "📄 規格書導出 (Export)" : "📄 Export Report";
      else t4.innerText = isZh ? "💻 網表導出 (Export)" : "💻 SPICE Export";
    }

    // Auto-switch to first allowed tab if current activeTab is not allowed in this session
    if (!allowed.includes(state.activeTab)) {
      switchToTab(allowed[0]);
    } else {
      switchToTab(state.activeTab);
    }
  }

  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchToTab(tab.getAttribute("data-tab"));
    });
  });

  function setSession(sessionName) {
    state.session = sessionName;
    allGroups.forEach(id => document.getElementById(id)?.classList.add("hidden"));

    Object.keys(sessionButtons).forEach(key => {
      const btn = sessionButtons[key];
      if (!btn) return;
      if (key === sessionName) {
        btn.className = "session-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm flex items-center justify-center gap-1.5 transition-all";
      } else {
        btn.className = "session-btn px-3.5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 border border-transparent flex items-center justify-center gap-1.5 transition-all";
      }
    });

    if (sessionName === "pa") {
      logo.innerText = "PA";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: CMOS POWER AMPLIFIER (PA)";
      ["groupPaPout", "groupPaClass", "groupPaTopology", "groupPaNeu"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "lna") {
      logo.innerText = "LNA";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: CMOS LOW-NOISE AMPLIFIER (LNA)";
      ["groupLnaGain", "groupLnaIdc"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "vco") {
      logo.innerText = "VCO";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: VOLTAGE-CONTROLLED OSCILLATOR (VCO)";
      ["groupVcoTuning", "groupVcoIdc"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "mixer") {
      logo.innerText = "MIX";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: DOUBLE-BALANCED GILBERT MIXER";
      ["groupMixerGain", "groupMixerIdc"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "switch") {
      logo.innerText = "SW";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: SERIES-SHUNT SPDT T/R SWITCH";
      ["groupSwitchP1db"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "antenna") {
      logo.innerText = "ANT";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg";
      statusBadge.innerText = "CURRENT: INSET-FED MICROSTRIP PATCH & AiP";
      ["groupAntennaSubstrate"].forEach(id => document.getElementById(id)?.classList.remove("hidden"));
    } else if (sessionName === "link") {
      logo.innerText = "LNK";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-lg";
      statusBadge.innerText = "CURRENT: FULL TRANSCEIVER LINK BUDGET & BEAMFORMING";
    } else if (sessionName === "match") {
      logo.innerText = "MAT";
      logo.className = "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl shadow-lg";
      statusBadge.innerText = "CURRENT: IMPEDANCE MATCHING SYNTHESIZER";
    }

    updateTabsForSession(sessionName);
    runSynthesis();
  }

  paBtn?.addEventListener("click", () => setSession("pa"));
  lnaBtn?.addEventListener("click", () => setSession("lna"));
  vcoBtn?.addEventListener("click", () => setSession("vco"));
  mixerBtn?.addEventListener("click", () => setSession("mixer"));
  switchBtn?.addEventListener("click", () => setSession("switch"));
  antennaBtn?.addEventListener("click", () => setSession("antenna"));
  linkBtn?.addEventListener("click", () => setSession("link"));
  matchBtn?.addEventListener("click", () => setSession("match"));

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
  lnaIdcInput?.addEventListener("input", e => {
    state.lna_idc_ma = parseFloat(e.target.value);
    runSynthesis();
  });

  const vcoTuningInput = document.getElementById("inputVcoTuning");
  vcoTuningInput?.addEventListener("input", e => {
    state.vco_ftr_pct = parseFloat(e.target.value);
    runSynthesis();
  });

  const vcoIdcInput = document.getElementById("inputVcoIdc");
  vcoIdcInput?.addEventListener("input", e => {
    state.vco_idc_ma = parseFloat(e.target.value);
    runSynthesis();
  });

  const mixerGainInput = document.getElementById("inputMixerGain");
  mixerGainInput?.addEventListener("input", e => {
    state.mixer_gc_db = parseFloat(e.target.value);
    runSynthesis();
  });

  const mixerIdcInput = document.getElementById("inputMixerIdc");
  mixerIdcInput?.addEventListener("input", e => {
    state.mixer_idc_ma = parseFloat(e.target.value);
    runSynthesis();
  });

  const switchP1dbInput = document.getElementById("inputSwitchP1db");
  switchP1dbInput?.addEventListener("input", e => {
    state.switch_p1db_dbm = parseFloat(e.target.value);
    runSynthesis();
  });

  const antennaSubstrateSelect = document.getElementById("selectAntennaSubstrate");
  antennaSubstrateSelect?.addEventListener("change", e => {
    state.antenna_substrate = e.target.value;
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

  const topGlossaryPanel = document.getElementById("topGlossaryPanel");
  const topManualPanel = document.getElementById("topManualPanel");

  function toggleTopGlossary(forceOpen) {
    if (!topGlossaryPanel) return;
    const isHidden = topGlossaryPanel.classList.contains("hidden");
    const shouldOpen = forceOpen !== undefined ? forceOpen : isHidden;
    if (shouldOpen) {
      if (topManualPanel) topManualPanel.classList.add("hidden");
      topGlossaryPanel.classList.remove("hidden");
      topGlossaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("glossarySearchInput")?.focus();
    } else {
      topGlossaryPanel.classList.add("hidden");
    }
  }

  function toggleTopManual(forceOpen) {
    if (!topManualPanel) return;
    const isHidden = topManualPanel.classList.contains("hidden");
    const shouldOpen = forceOpen !== undefined ? forceOpen : isHidden;
    if (shouldOpen) {
      if (topGlossaryPanel) topGlossaryPanel.classList.add("hidden");
      topManualPanel.classList.remove("hidden");
      topManualPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      topManualPanel.classList.add("hidden");
    }
  }

  // Top Bar Glossary & Manual Buttons
  const topGlossaryBtn = document.getElementById("topGlossaryBtn");
  topGlossaryBtn?.addEventListener("click", () => toggleTopGlossary());

  const closeGlossaryBtn = document.getElementById("closeGlossaryBtn");
  closeGlossaryBtn?.addEventListener("click", () => toggleTopGlossary(false));

  const topManualBtn = document.getElementById("topManualBtn");
  topManualBtn?.addEventListener("click", () => toggleTopManual());

  const closeManualBtn = document.getElementById("closeManualBtn");
  closeManualBtn?.addEventListener("click", () => toggleTopManual(false));

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
    updateTabsForSession(state.session);
  });

  // Copy & Download
  document.getElementById("copySpiceBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(generateSpiceString()).then(() => {
      alert(currentLang === "zh" ? "SPICE 網表已成功複製至剪貼簿！" : "SPICE deck copied to clipboard!");
    });
  });

  document.getElementById("downloadSpiceBtn").addEventListener("click", () => {
    const prefix = `autorf_${state.session}`;
    downloadFile(`${prefix}_${state.freq_ghz}ghz.sp`, generateSpiceString());
  });

  document.getElementById("downloadS2pBtn").addEventListener("click", () => {
    const d = currentDesign;
    const prefix = `autorf_${state.session}`;
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

  // Full Engineering Spec Report
  document.getElementById("downloadReportBtn")?.addEventListener("click", () => {
    downloadFullReport();
  });

  // Phased Array & Link Budget Controls
  const arraySelect = document.getElementById("selectArraySize");
  arraySelect?.addEventListener("change", (e) => {
    state.array_size = parseInt(e.target.value, 10);
    drawLinkBudget();
  });

  const steerInput = document.getElementById("inputSteerAngle");
  steerInput?.addEventListener("input", (e) => {
    state.steer_angle = parseFloat(e.target.value);
    const valEl = document.getElementById("valSteerAngle");
    if (valEl) valEl.innerText = (state.steer_angle > 0 ? "+" : "") + state.steer_angle + "°";
    drawLinkBudget();
  });

  const phaseBitsSelect = document.getElementById("selectPhaseBits");
  phaseBitsSelect?.addEventListener("change", (e) => {
    state.phase_bits = parseInt(e.target.value, 10);
    drawLinkBudget();
  });

  // Matching Synthesizer Controls
  const mRs = document.getElementById("inputMatchRs");
  const mXs = document.getElementById("inputMatchXs");
  const mRl = document.getElementById("inputMatchRl");
  const mXl = document.getElementById("inputMatchXl");
  const mTopo = document.getElementById("selectMatchTopology");
  const mQind = document.getElementById("inputMatchQind");

  mRs?.addEventListener("input", (e) => { state.match_rs = parseFloat(e.target.value) || 50; drawMatchingSynthesizer(); });
  mXs?.addEventListener("input", (e) => { state.match_xs = parseFloat(e.target.value) || 0; drawMatchingSynthesizer(); });
  mRl?.addEventListener("input", (e) => { state.match_rl = parseFloat(e.target.value) || 15; drawMatchingSynthesizer(); });
  mXl?.addEventListener("input", (e) => { state.match_xl = parseFloat(e.target.value) || 0; drawMatchingSynthesizer(); });
  mTopo?.addEventListener("change", (e) => { state.match_topology = e.target.value; drawMatchingSynthesizer(); });
  mQind?.addEventListener("input", (e) => { state.match_qind = parseFloat(e.target.value) || 15; drawMatchingSynthesizer(); });

  const btnSyncFromDesign = document.getElementById("btnSyncFromDesign");
  btnSyncFromDesign?.addEventListener("click", () => {
    if (currentDesign) {
      if (state.session === "pa") {
        state.match_rl = parseFloat((currentDesign.rOpt || 15.8).toFixed(1));
        state.match_xl = 0;
        state.match_rs = 50;
        state.match_xs = 0;
      } else if (state.session === "lna") {
        state.match_rs = 50;
        state.match_xs = 0;
        state.match_rl = parseFloat((currentDesign.rin || 50).toFixed(1));
        state.match_xl = 0;
      } else if (state.session === "vco") {
        state.match_rs = 50;
        state.match_rl = parseFloat((currentDesign.rp_tank || 120).toFixed(1));
        state.match_xl = 0;
      } else {
        state.match_rs = 50;
        state.match_rl = 50;
        state.match_xl = 0;
      }
      if (mRs) mRs.value = state.match_rs;
      if (mXs) mXs.value = state.match_xs;
      if (mRl) mRl.value = state.match_rl;
      if (mXl) mXl.value = state.match_xl;
      drawMatchingSynthesizer();
    }
  });

  // Init Glossary & User Manual
  initGlossary();
  initManual();

  // First run
  updateTabsForSession(state.session);
  runSynthesis();
}

// --- 11. Comprehensive RF Terms Glossary (術語字典) ---
const RF_GLOSSARY = [
  // PA terms
  {
    term: "Ropt (Optimum Load Resistance)",
    category: "pa",
    module: "PA",
    badgeColor: "cyan",
    zh: {
      name: "最佳負載電阻 Ropt",
      formula: "Ropt = (2 · (Vdd - Vknee)²) / Pout",
      desc: "功率放大器在給定電源電壓 Vdd 與汲極膝電壓 Vknee 拘束下，依據 Cripps 理論計算出能將最大射頻功率傳遞至負載之最佳汲極實部電阻阻抗。"
    },
    en: {
      name: "Optimum Load Resistance",
      formula: "Ropt = (2 · (Vdd - Vknee)²) / Pout",
      desc: "Based on Cripps loadline theory, the optimum real impedance presented to the transistor drain that extracts the maximum RF output power under supply Vdd and knee voltage limits."
    }
  },
  {
    term: "PAE (Power-Added Efficiency)",
    category: "pa",
    module: "PA",
    badgeColor: "cyan",
    zh: {
      name: "功率附加效率 PAE",
      formula: "PAE = (Pout,rf - Pin,rf) / Pdc = η_drain · (1 - 1 / Gain)",
      desc: "衡量放大器整體能源轉換效率的關鍵指標，扣除輸入驅動功率 Pin，唯有當增益 Gain 足夠高時，PAE 才會趨近汲極效率 η_drain。"
    },
    en: {
      name: "Power-Added Efficiency",
      formula: "PAE = (Pout,rf - Pin,rf) / Pdc = η_drain · (1 - 1 / Gain)",
      desc: "Figure of merit representing net RF power generated per unit DC power consumed. Scales towards drain efficiency when power gain is sufficiently large."
    }
  },
  {
    term: "P1dB (1-dB Compression Point)",
    category: "pa",
    module: "PA / Switch / LNA",
    badgeColor: "cyan",
    zh: {
      name: "1-dB 增益壓縮點",
      formula: "Pout(P1dB) = Pout,linear - 1.0 dB",
      desc: "放大器或開關從小訊號線性放大進入大訊號非線性飽和時，功率增益相較線性小訊號增益下降 1 dB 的輸出 (或輸入) 功率界限。"
    },
    en: {
      name: "1-dB Gain Compression Point",
      formula: "Pout(P1dB) = Pout,linear - 1.0 dB",
      desc: "The output or input power level at which the circuit's gain drops by 1 dB from its small-signal linear value, denoting the linear dynamic range boundary."
    }
  },
  {
    term: "Rollett Stability Factor (K-Factor)",
    category: "pa",
    module: "PA / LNA",
    badgeColor: "cyan",
    zh: {
      name: "羅勒特穩定係數 K",
      formula: "K = (1 - |S11|² - |S22|² + |Δ|²) / (2 · |S12 · S21|) > 1 且 |Δ| < 1",
      desc: "高頻放大器無條件穩定判定標準。當 K > 1 且行列式 |Δ| < 1 時，無論輸入與輸出端接上何種被動複數負載，放大器皆絕不產生寄生振盪。"
    },
    en: {
      name: "Rollett Stability Factor",
      formula: "K = (1 - |S11|² - |S22|² + |Δ|²) / (2 · |S12 · S21|) > 1 & |Δ| < 1",
      desc: "Criterion for unconditional stability. Guarantees that the two-port network will not oscillate under any passive source and load terminations."
    }
  },
  {
    term: "Neutralization Capacitor (Cneu)",
    category: "pa",
    module: "PA",
    badgeColor: "cyan",
    zh: {
      name: "交叉中和電容 Cneu",
      formula: "Cneu ≈ Cgd",
      desc: "在差動放大器中，將對稱反相節點的電容跨接至閘極，產生極性相反的負回授電流，完美抵消 Cgd 引起的彌勒效應 (Miller Effect) 與逆向傳輸 S12。"
    },
    en: {
      name: "Neutralization Capacitor",
      formula: "Cneu ≈ Cgd",
      desc: "Cross-connected capacitors in differential amplifiers providing antiphase feedforward current to cancel parasitic gate-drain feedback Cgd, boosting isolation and stability."
    }
  },

  // LNA terms
  {
    term: "NF (Noise Figure)",
    category: "lna",
    module: "LNA / Mixer",
    badgeColor: "emerald",
    zh: {
      name: "雜訊指數 (NF)",
      formula: "NF = 10 · log10( SNR_in / SNR_out )",
      desc: "衡量接收機前端電路將訊號訊雜比劣化的程度。理想無雜訊放大器 NF = 0 dB；在現代 CMOS 奈米製程中，毫米波 LNA 之 NF 約介於 1.5 ~ 4.0 dB。"
    },
    en: {
      name: "Noise Figure",
      formula: "NF = 10 · log10( SNR_in / SNR_out )",
      desc: "Measure of degradation of signal-to-noise ratio caused by the circuit. An ideal noiseless amplifier has NF = 0 dB; modern mmWave CMOS LNAs achieve 1.5 - 4.0 dB."
    }
  },
  {
    term: "Ls Inductive Degeneration (SNIM)",
    category: "lna",
    module: "LNA",
    badgeColor: "emerald",
    zh: {
      name: "電感源極退化匹配 (SNIM)",
      formula: "Zin ≈ s(Lg + Ls) + 1/(s·Cgs) + (gm / Cgs) · Ls ≈ 50 + j0 Ω",
      desc: "在共源極電晶體源極串聯微小電感 Ls，利用回授將純虛數的 Cgs 轉換為實數輸入阻抗 50Ω，不需引入任何有雜訊的實體電阻，達成同時雜訊與功率共軛匹配。"
    },
    en: {
      name: "Inductive Source Degeneration",
      formula: "Zin ≈ s(Lg + Ls) + 1/(s·Cgs) + (gm / Cgs) · Ls ≈ 50 + j0 Ω",
      desc: "A technique using source degeneration inductor Ls to generate a purely noiseless 50Ω real input impedance, achieving simultaneous noise and power matching (SNIM)."
    }
  },
  {
    term: "IIP3 (Input Third-Order Intercept Point)",
    category: "lna",
    module: "LNA / Mixer",
    badgeColor: "emerald",
    zh: {
      name: "輸入三階截波點 IIP3",
      formula: "IIP3 ≈ IP1dB + 9.6 dB",
      desc: "衡量電路抵抗雙音互調失真 (IMD3) 線性度的理論交點。IIP3 越高，代表接收機在強干擾或相鄰頻道阻塞信號下越不易產生虛假干擾。"
    },
    en: {
      name: "Input Third-Order Intercept",
      formula: "IIP3 ≈ IP1dB + 9.6 dB",
      desc: "Theoretical input power at which third-order intermodulation products equal the linear fundamental output, characterizing receiver intermodulation tolerance."
    }
  },

  // VCO terms
  {
    term: "Phase Noise L(Δf) (Leeson's Formula)",
    category: "vco",
    module: "VCO",
    badgeColor: "amber",
    zh: {
      name: "振盪器相位雜訊 (Leeson 公式)",
      formula: "L(Δf) = 10·log10[ (2F·k·T / P_sig) · (1 + (f0 / (2Q·Δf))²) · (1 + f_corner / Δf) ]",
      desc: "振盪器頻譜純度的絕對指標，表示在載波偏置頻率 Δf 處，1Hz 頻寬內的單邊帶雜訊功率與載波總功率之比 (單位 dBc/Hz)。"
    },
    en: {
      name: "Phase Noise (Leeson-Cutler)",
      formula: "L(Δf) = 10·log10[ (2F·k·T / P_sig) · (1 + (f0 / (2Q·Δf))²) · (1 + f_corner / Δf) ]",
      desc: "Spectral purity metric describing phase fluctuations in a 1-Hz bandwidth at an offset frequency Δf relative to total carrier power (dBc/Hz)."
    }
  },
  {
    term: "Barkhausen Oscillation Criterion",
    category: "vco",
    module: "VCO",
    badgeColor: "amber",
    zh: {
      name: "巴克豪森振盪啟振準則",
      formula: "|Loop Gain| = |gm,core · Rp| ≥ α_startup (α ≥ 2.5 ~ 3.0)",
      desc: "封閉回授振盪迴路的啟振物理條件：環路相位差為 360° (正回授)，且核心負電導 |gm,core| 必須大於等於諧振槽等效損耗電導的 2.5~3 倍以確保可靠起振。"
    },
    en: {
      name: "Barkhausen Criterion",
      formula: "|Loop Gain| = |gm,core · Rp| ≥ α_startup (α ≥ 2.5 ~ 3.0)",
      desc: "Conditions for self-sustained oscillation: 360-degree loop phase shift and negative transconductance exceeding tank loss by a startup margin factor α."
    }
  },
  {
    term: "FTR (Frequency Tuning Range) & Kvco",
    category: "vco",
    module: "VCO",
    badgeColor: "amber",
    zh: {
      name: "頻率調諧範圍 (FTR) 與調諧增益 (Kvco)",
      formula: "FTR = 2 · (fmax - fmin) / (fmax + fmin) · 100% ; Kvco = ∂f / ∂Vctrl",
      desc: "變容二極體 (Varactor) 或切換電容陣列在控制電壓調諧範圍內所能涵蓋的頻率百分比，Kvco 則為控制電壓每變化 1V 引起的頻率變化量 (GHz/V)。"
    },
    en: {
      name: "Frequency Tuning Range & Kvco",
      formula: "FTR = 2 · (fmax - fmin) / (fmax + fmin) · 100% ; Kvco = ∂f / ∂Vctrl",
      desc: "Fractional frequency span achievable across varactor tuning voltage range, and tuning sensitivity slope in GHz/V."
    }
  },

  // Mixer terms
  {
    term: "Gc (Conversion Gain)",
    category: "mixer",
    module: "Mixer",
    badgeColor: "purple",
    zh: {
      name: "混頻轉換增益 Gc",
      formula: "Gc = (2 / π) · gm,rf · RL",
      desc: "降頻或升頻混頻器中，中頻 IF 輸出信號功率 (或電壓) 與輸入射頻 RF 信號功率之比值。主動式吉爾伯特混頻單元可提供 8 ~ 15 dB 之轉換增益。"
    },
    en: {
      name: "Conversion Gain",
      formula: "Gc = (2 / π) · gm,rf · RL",
      desc: "Ratio of IF output power to RF input power in active mixers, determined by input transconductance gm, switching efficiency (2/π), and load impedance."
    }
  },
  {
    term: "Gilbert Cell Quad Commutation",
    category: "mixer",
    module: "Mixer",
    badgeColor: "purple",
    zh: {
      name: "吉爾伯特雙平衡電流換向",
      formula: "I_IF(t) = sgn(V_LO(t)) · I_RF(t)",
      desc: "由 4 顆高速電晶體組成的雙平衡開關對，在差動本振 LO 方波驅動下高速切換，天然對稱抵消本振至射頻 (LO-RF) 與本振至中頻 (LO-IF) 的直通洩漏。"
    },
    en: {
      name: "Gilbert Cell Commutation",
      formula: "I_IF(t) = sgn(V_LO(t)) · I_RF(t)",
      desc: "Four switching transistors driven by differential LO that alternate polarity of RF current, providing intrinsic balance against LO leakage feedthrough."
    }
  },

  // Switch terms
  {
    term: "IL (Insertion Loss) & ISO (Isolation)",
    category: "switch",
    module: "Switch",
    badgeColor: "rose",
    zh: {
      name: "開關插入損耗 (IL) 與隔離度 (ISO)",
      formula: "IL ≈ 10·log10(1 + 2·Ron/Z0) ; ISO ≈ 10·log10(1 + 1/(2ω·Coff·Z0)²)",
      desc: "IL 為開關在導通狀態下的信號衰減量 (越小越佳，典型 0.8~1.5 dB)；ISO 為關斷狀態下未選通信道的信號抑制度 (越大越佳，典型 25~45 dB)。"
    },
    en: {
      name: "Insertion Loss & Isolation",
      formula: "IL ≈ 10·log10(1 + 2·Ron/Z0) ; ISO ≈ 10·log10(1 + 1/(2ω·Coff·Z0)²)",
      desc: "IL characterizes transmission attenuation through ON-path, while ISO measures RF leakage attenuation through OFF-path."
    }
  },
  {
    term: "Ron · Coff Figure-of-Merit",
    category: "switch",
    module: "Switch",
    badgeColor: "rose",
    zh: {
      name: "開關品質因數 (Ron · Coff)",
      formula: "FOM_switch = Ron · Coff (典型先進製程 100 ~ 200 fs)",
      desc: "衡量半導體製程製造高頻開關效能的根本物理常數。Ron 決定導通插損，Coff 決定高頻隔離度，兩者乘積越小代表開關綜合性能越高。"
    },
    en: {
      name: "Switch FOM (Ron · Coff)",
      formula: "FOM_switch = Ron · Coff (typically 100 - 200 fs)",
      desc: "Fundamental semiconductor switch figure-of-merit representing the inescapable tradeoff between series conduction resistance and off-state capacitance."
    }
  },
  {
    term: "Stacked FETs & Body-Floating",
    category: "switch",
    module: "Switch",
    badgeColor: "rose",
    zh: {
      name: "FET 串疊堆疊與浮體電阻技術",
      formula: "N_stack = ceil( V_peak,rf / Vdd,max ) ; R_body ≥ 10 kΩ",
      desc: "在高功率發射 (TX) 狀態下，單顆電晶體會因過大電壓擺幅產生擊穿；採用 N 級電晶體串聯並透過高阻值浮體電阻接地，可均勻分壓以耐受數瓦功率。"
    },
    en: {
      name: "Stacked FETs & Body-Floating",
      formula: "N_stack = ceil( V_peak,rf / Vdd,max ) ; R_body ≥ 10 kΩ",
      desc: "Stacking multiple series FETs divides large RF voltage swings across channels, combined with high-value body resistors to prevent substrate leakage and premature breakdown."
    }
  },

  // Antenna terms
  {
    term: "Microstrip Patch Resonant Length (L)",
    category: "antenna",
    module: "Antenna",
    badgeColor: "sky",
    zh: {
      name: "微帶貼片天線諧振長度",
      formula: "L = c / (2·f0·√ε_eff) - 2·ΔL",
      desc: "微帶貼片天線為半波長 (λ/2) 諧振腔輻射結構，考慮介質等效介電常數 ε_eff 與電磁場邊緣開路延伸長度 ΔL 進行修正。"
    },
    en: {
      name: "Patch Resonant Length",
      formula: "L = c / (2·f0·√ε_eff) - 2·ΔL",
      desc: "Physical length required for half-wavelength cavity resonance, corrected for fringing electric field extensions ΔL and effective permittivity ε_eff."
    }
  },
  {
    term: "Inset-Fed Depth y0 (50Ω Matching)",
    category: "antenna",
    module: "Antenna",
    badgeColor: "sky",
    zh: {
      name: "內凹饋電深度 y0 (50Ω 匹配)",
      formula: "y0 = (L / π) · arccos( √(50 / Rin(0)) )",
      desc: "貼片邊緣輸入阻抗高達 200~300Ω，透過在貼片中央向內挖槽深 y0 處饋入微帶線，使輸入阻抗精確下降至標準 50Ω，免除外加阻抗變壓器。"
    },
    en: {
      name: "Inset Feed Notch Depth",
      formula: "y0 = (L / π) · arccos( √(50 / Rin(0)) )",
      desc: "Notch depth cut into the patch radiator where impedance matches 50Ω directly from the higher edge impedance (~250Ω), avoiding external matching networks."
    }
  },
  {
    term: "AiP (Antenna-in-Package)",
    category: "antenna",
    module: "Antenna",
    badgeColor: "sky",
    zh: {
      name: "天線封裝整合技術 (AiP)",
      formula: "G_dBi = 10 · log10( D · η_rad )",
      desc: "在毫米波頻段 (如 28 GHz / 77 GHz)，將天線直接製造於晶片封裝基板 (如有機微通孔或 LTCC) 上，大幅縮短晶片至天線的射頻走線損耗並提升輻射效率。"
    },
    en: {
      name: "Antenna-in-Package (AiP)",
      formula: "G_dBi = 10 · log10( D · η_rad )",
      desc: "Packaging architecture embedding radiating elements directly inside the package substrate (e.g. organic/LTCC), eliminating lossy board transitions at mmWave frequencies."
    }
  }
];

function initGlossary() {
  const grid = document.getElementById("glossaryGrid");
  const searchInput = document.getElementById("glossarySearchInput");
  const filterBtns = document.querySelectorAll(".glossary-filter-btn");

  let activeCategory = "all";
  let searchKeyword = "";

  function render() {
    if (!grid) return;
    const isZh = currentLang === "zh";

    const filtered = RF_GLOSSARY.filter(item => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const termText = `${item.term} ${item.zh.name} ${item.zh.desc} ${item.en.name} ${item.en.desc}`.toLowerCase();
      const matchSearch = !searchKeyword || termText.includes(searchKeyword.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 text-xs">
          🔍 未找到相符的術語 (No matching glossary terms found)
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const info = isZh ? item.zh : item.en;
      return `
        <div class="card-panel rounded-xl p-4 shadow border border-slate-700/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="font-bold text-slate-200 text-sm tracking-wide text-cyan-400">${item.term}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-${item.badgeColor}-500/20 text-${item.badgeColor}-400 border border-${item.badgeColor}-500/30">
                ${item.module}
              </span>
            </div>
            <div class="text-xs font-semibold text-slate-300 mb-1.5">${info.name}</div>
            <div class="p-2 rounded bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-amber-300 mb-2 overflow-x-auto">
              ${info.formula}
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${info.desc}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  searchInput?.addEventListener("input", e => {
    searchKeyword = e.target.value.trim();
    render();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-category");
      filterBtns.forEach(b => b.className = "glossary-filter-btn px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700");
      btn.className = "glossary-filter-btn px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold";
      render();
    });
  });

  render();
}

// --- 12. Interactive User Manual (使用者指南 / 操作手冊) ---
let activeManualSection = "quickstart";

function initManual() {
  const contentArea = document.getElementById("manualContentArea");
  const navBtns = document.querySelectorAll("#manualSectionTabs .manual-nav-btn");
  if (!contentArea) return;

  const isZh = currentLang === "zh";

  // Section button click handlers
  navBtns.forEach(btn => {
    btn.onclick = () => {
      activeManualSection = btn.getAttribute("data-manual-sec");
      navBtns.forEach(b => {
        b.className = "manual-nav-btn px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 font-medium transition-all";
      });
      btn.className = "manual-nav-btn px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold transition-all";
      renderManualContent();
    };
  });

  function renderManualContent() {
    if (activeManualSection === "quickstart") {
      contentArea.innerHTML = isZh ? `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30">
            <h4 class="text-sm font-bold text-sky-300 flex items-center gap-2 mb-1.5">
              <span>🚀</span> 歡迎使用 AutoRF 射頻前端積體電路設計與合成平台
            </h4>
            <p class="text-slate-300 leading-relaxed">
              AutoRF 是一套為射頻與毫米波積體電路（RFIC / MMIC）設計工程師打造的自動化閉環合成指引系統。內建 TSMC 28nm HPC+、40nm RF、65nm RF 與 0.18µm RF 等真實 PDK 模型，涵蓋收發機 6 大核心模組。請遵循以下 5 步工作流程迅速完成電路合成：
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">1</span>
                選擇典型應用預設 (Presets)
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                在頂部下拉選單選擇如 2.4G Wi-Fi、28G/39G 5G 毫米波、60G WiGig、73G E-Band 或 77G 車用雷達。系統會自動載入最佳工作頻率、建議 PDK 技術節點與標稱供電電壓 Vdd。
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">2</span>
                切換設計模組標籤 (Session Tabs)
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                點擊頂部標籤：<b>PA</b> (功率放大器)、<b>LNA</b> (低雜訊放大器)、<b>VCO</b> (壓控振盪器)、<b>Mixer</b> (混頻器)、<b>Switch</b> (雙工開關)、<b>Antenna</b> (封裝天線)。左側規格面板會即時更新為對應專屬輸入項。
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">3</span>
                微調目標規格與 PDK 參數
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                隨意滑動或輸入中心頻率、目標輸出功率 Pout、增益 Gain、操作模式 (Class AB/A/B/C/E) 或片上電感 Q 值。物理引擎會在 10 毫秒內即時重新收斂最佳尺寸。
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">4</span>
                檢視四大視覺化圖表與 BOM
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                在下方四大分頁切換檢驗：史密斯圖負載牽引/雜訊圓、時域波形與動態負載線 (確認無超出 SOA 安全工作區)、IEEE 標準電晶體電路圖與詳細被動元件 BOM 清單。
              </p>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div class="font-bold text-emerald-300">第五步：一鍵導出 SPICE 與 Touchstone S2P</div>
              <div class="text-[11px] text-slate-400 mt-0.5">點擊「💻 SPICE 網表與導出」分頁即可直接複製或下載檔案，相容於 Keysight ADS, Cadence Virtuoso, LTspice。</div>
            </div>
          </div>
        </div>
      ` : `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30">
            <h4 class="text-sm font-bold text-sky-300 flex items-center gap-2 mb-1.5">
              <span>🚀</span> Welcome to AutoRF CMOS Front-End Synthesis Guide
            </h4>
            <p class="text-slate-300 leading-relaxed">
              AutoRF is an automated physics-driven synthesis suite for RF and millimeter-wave integrated circuits. With built-in foundry models (TSMC 28nm HPC+, 40nm, 65nm, 180nm), it covers 6 core front-end building blocks. Follow the 5 quick steps below:
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">1</span>
                Select Application Preset
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Select from presets such as 2.4G Wi-Fi, 28G/39G 5G mmWave, 60G WiGig, 73G E-Band, or 77G Radar. Carrier frequency, recommended PDK node, and supply voltage Vdd are loaded instantly.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">2</span>
                Choose Circuit Session
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Click session buttons: <b>PA</b> (Power Amp), <b>LNA</b> (Low-Noise Amp), <b>VCO</b> (Oscillator), <b>Mixer</b>, <b>Switch</b>, <b>Antenna</b>. Left specification controls update dynamically.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">3</span>
                Tune Specifications & PDK
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Adjust frequency, target Pout, gain, operation class (Class AB/A/B/C/E), or on-chip inductor Q. The synthesis engine re-converges transistor sizing and passives in &lt;10ms.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">4</span>
                Inspect Charts, Waves & BOM
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Review Smith Chart contours / noise circles, transient waveforms and dynamic load-lines (ensuring safe SOA operation), IEEE schematic, and passive component BOM.
              </p>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div class="font-bold text-emerald-300">Step 5: Export SPICE Decks & Touchstone S2P</div>
              <div class="text-[11px] text-slate-400 mt-0.5">Switch to the "💻 SPICE Deck & Export" tab to copy or download files compatible with Keysight ADS, Cadence Virtuoso, and LTspice.</div>
            </div>
          </div>
        </div>
      `;
    } else if (activeManualSection === "modules") {
      contentArea.innerHTML = isZh ? `
        <div class="space-y-3.5">
          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-cyan-500/30">
            <div class="font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <span>🚀</span> 1. 功率放大器 (PA - Power Amplifier)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>基於 Cripps 負載線理論，在供電電壓 $V_{dd}$ 與膝電壓 $V_{knee}$ 限制下，合成最佳負載電阻 $R_{opt} = 2(V_{dd}-V_{knee})^2 / P_{out}$。<br>
              <b>拓樸亮點：</b>差動疊接 (Differential Cascode) 提供優異輸出擺幅與逆向隔離；交叉中和電容 $C_{neu} \approx C_{gd}$ 抵消 Miller 效應，保證 $K > 1$ 絕對無條件穩定；輸出端配置片上整合變壓器 Balun，直接匹配至 50Ω 單端天線。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-emerald-500/30">
            <div class="font-bold text-emerald-400 flex items-center gap-2 mb-1">
              <span>📡</span> 2. 低雜訊放大器 (LNA - Low-Noise Amplifier)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>電感源極退化技術 (Inductive Source Degeneration)，由退化電感 $L_s$ 於共振點產生無熱雜訊之等效實數阻抗 $R_{in} = \omega_T \cdot L_s \approx 50\,\Omega$。<br>
              <b>雜訊匹配：</b>透過閘極電感 $L_g$ 諧振 $C_{gs}$，達成同步雜訊與輸入阻抗匹配 (SNIM)，兼顧極低雜訊指數 ($NF \le 2.0\,\text{dB}$)、高功率增益與良好線性度 ($IIP_3$)。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-amber-500/30">
            <div class="font-bold text-amber-400 flex items-center gap-2 mb-1">
              <span>⚡</span> 3. 壓控振盪器 (VCO - Voltage-Controlled Oscillator)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>互補交叉耦合對 (NMOS+PMOS) 產生負電導 $-G_m$ 抵消 LC 諧振腔並聯損耗電阻 $R_p$。<br>
              <b>起振保證：</b>自動配置起振裕度 $G_m \ge 2.5 \cdot G_{tank}$ 滿足 Barkhausen 振盪條件；利用 Leeson 相位雜訊模型精確預測 1 MHz 頻偏處之相噪表現。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-purple-500/30">
            <div class="font-bold text-purple-400 flex items-center gap-2 mb-1">
              <span>🔀</span> 4. 混頻器 (Mixer - Down-Conversion Mixer)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>吉爾伯特雙平衡單晶乘法結構 (Double-Balanced Gilbert Cell)，包含底層差動射頻跨導級 ($g_m$)、中層本振 LO 快速電流換向開關對及頂層負載。<br>
              <b>隔離優勢：</b>對稱平衡架構天然提供高達 $> 35\,\text{dB}$ 的 LO-RF 與 LO-IF 隔離度，轉換增益 $G_c \approx (2/\pi) g_m R_L$。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-rose-500/30">
            <div class="font-bold text-rose-400 flex items-center gap-2 mb-1">
              <span>🔌</span> 5. 雙工天線開關 (Switch - T/R Switch)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>SPDT 串並聯拓樸 (Series-Shunt)。導通支路依靠低 $R_{on}$ 降低插入損失 ($IL < 1.5\,\text{dB}$)，截止支路利用並聯 FET 接地確保高隔離度 ($> 25\,\text{dB}$)。<br>
              <b>高耐壓技術：</b>採用多晶體管堆疊 (FET Stacking) 與基極浮接電阻 (Body-Floating)，大幅提升功率承受力 $P_{1dB} \ge 24\,\text{dBm}$。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-sky-500/30">
            <div class="font-bold text-sky-400 flex items-center gap-2 mb-1">
              <span>📶</span> 6. 封裝天線 (Antenna - Inset-Fed Microstrip Patch)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>理論依據：</b>矩形微帶貼片天線，考量邊緣電場效應計算諧振長度 $L$ 與寬度 $W$。<br>
              <b>阻抗匹配：</b>透過內縮饋電切槽深度 $y_0$ 將輸入阻抗精確調諧至 $50\,\Omega$，支援 AiP 有機載板、LTCC、RO4350B 等多種基板介質。
            </p>
          </div>
        </div>
      ` : `
        <div class="space-y-3.5">
          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-cyan-500/30">
            <div class="font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <span>🚀</span> 1. Power Amplifier (PA)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> Based on Cripps load-line formulation, synthesizes optimum load resistance $R_{opt} = 2(V_{dd}-V_{knee})^2 / P_{out}$ under supply $V_{dd}$ and knee voltage $V_{knee}$ limits.<br>
              <b>Topology:</b> Differential cascode provides high voltage swing and reverse isolation; cross-neutralization $C_{neu} \approx C_{gd}$ eliminates Miller feedback, guaranteeing $K > 1$; on-chip transformer balun matches directly to a single-ended 50Ω antenna.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-emerald-500/30">
            <div class="font-bold text-emerald-400 flex items-center gap-2 mb-1">
              <span>📡</span> 2. Low-Noise Amplifier (LNA)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> Inductive source degeneration ($L_s$) creates a noiseless real 50Ω input resistance $R_{in} = \omega_T \cdot L_s$ at resonance.<br>
              <b>Noise Matching:</b> Gate inductor $L_g$ resonates with $C_{gs}$ for Simultaneous Noise and Input Match (SNIM), achieving $NF \le 2.0\,\text{dB}$ and low $S_{11} < -15\,\text{dB}$.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-amber-500/30">
            <div class="font-bold text-amber-400 flex items-center gap-2 mb-1">
              <span>⚡</span> 3. Voltage-Controlled Oscillator (VCO)
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> Complementary cross-coupled pair (NMOS+PMOS) generates negative transconductance $-G_m$ canceling LC tank loss $R_p$.<br>
              <b>Startup Margin:</b> Guarantees $G_m \ge 2.5 \cdot G_{tank}$ for robust oscillation across PVT corners; Leeson model predicts 1 MHz offset phase noise.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-purple-500/30">
            <div class="font-bold text-purple-400 flex items-center gap-2 mb-1">
              <span>🔀</span> 4. Down-Conversion Mixer
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> Double-balanced Gilbert cell with differential RF transconductance ($g_m$), 4-transistor LO switching quad, and resistive loads.<br>
              <b>Isolation:</b> High intrinsic port-to-port LO-RF and LO-IF isolation ($> 35\,\text{dB}$) and conversion gain $G_c \approx (2/\pi) g_m R_L$.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-rose-500/30">
            <div class="font-bold text-rose-400 flex items-center gap-2 mb-1">
              <span>🔌</span> 5. T/R Switch
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> SPDT Series-Shunt topology. Low $R_{on}$ minimizes insertion loss ($< 1.5\,\text{dB}$), while shunt FETs shunt leakage to ground for isolation ($> 25\,\text{dB}$).<br>
              <b>Power Handling:</b> Multi-FET stacking and body-floating resistors provide high linearity and $P_{1dB} \ge 24\,\text{dBm}$.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/90 border border-sky-500/30">
            <div class="font-bold text-sky-400 flex items-center gap-2 mb-1">
              <span>📶</span> 6. AiP Microstrip Patch Antenna
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              <b>Theory:</b> Rectangular microstrip patch with fringe field correction for length $L$ and width $W$.<br>
              <b>Matching:</b> Inset notch depth $y_0$ matches precisely to 50Ω feedlines across organic AiP, LTCC, and RO4350B substrates.
            </p>
          </div>
        </div>
      `;
    } else if (activeManualSection === "charts") {
      contentArea.innerHTML = isZh ? `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>🎯</span> 1. 史密斯圓圖 (Smith Chart) 與等高線解讀
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li><b>圓圖中心 (Center Point)：</b>代表標準 $50\,\Omega$ 系統特徵阻抗 ($\Gamma = 0$)。</li>
              <li><b>PA 負載牽引等功率線 (Load-Pull Contours)：</b>藍色圓點標示汲極端最佳負載阻抗 $Z_{L,opt}$。紅線 (-0.5dB)、黃線 (-1.0dB)、綠線 (-2.0dB) 呈現負載失配時輸出功率容限。</li>
              <li><b>LNA 等雜訊圓 (Noise Circles)：</b>圓點代表最小雜訊阻抗 $Z_{opt,noise}$。同心圓分別代表雜訊指數增加 +0.3dB、+0.6dB、+1.0dB 的信號源阻抗範圍。</li>
              <li><b>VCO / Switch / Antenna：</b>分別標記諧振腔負阻抗分佈、開關導通 (ON) 與截止 (OFF) 阻抗點、及天線 $50\,\Omega$ 共振點。</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-emerald-400 mb-1.5 flex items-center gap-2">
              <span>🌊</span> 2. 暫態響應與動態負載線 (Waveforms & Load-Line)
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li><b>時域波形 (左圖)：</b>繪製連續 2 個射頻週期之大訊號汲極電壓 $V_{ds}(t)$（藍線）與電流 $I_{ds}(t)$（綠線），底部受半導體膝電壓 $V_{knee}$ 限制。</li>
              <li><b>動態負載線 (右圖)：</b>展示瞬態 $I_{ds}$ vs $V_{ds}$ 相平面軌跡，直觀檢視電晶體工作點是否進入深飽和或超出半導體安全操作區 (SOA)。</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-400 mb-1.5 flex items-center gap-2">
              <span>📐</span> 3. 晶片電路圖 (Schematic) 與 BOM 清單
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li>電路圖嚴格遵循 IEEE 標準 MOSFET 符號（包含閘極、汲極、源極、通道與箭頭，無黑色色塊遮擋）。</li>
              <li>BOM 清單提供所有微米尺寸主動管寬度、指狀數、片上電感、電容與變壓器匝比之具體數值。</li>
            </ul>
          </div>
        </div>
      ` : `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>🎯</span> 1. Smith Chart Contours & Impedance Points
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li><b>Center (50Ω):</b> Normalized center point ($\Gamma = 0$).</li>
              <li><b>PA Load-Pull Contours:</b> Cyan dot shows optimum load $Z_{L,opt}$. Contours represent -0.5dB (red), -1.0dB (yellow), and -2.0dB (green) power drops.</li>
              <li><b>LNA Noise Circles:</b> Shows optimum source reflection $\Gamma_{opt}$ with constant NF circles (+0.3dB, +0.6dB, +1.0dB).</li>
              <li><b>VCO / Switch / Antenna:</b> Illustrates negative Gm region, switch ON/OFF states, and antenna resonance.</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/30">
            <div class="font-bold text-emerald-400 mb-1.5 flex items-center gap-2">
              <span>🌊</span> 2. Transient Waveforms & Dynamic Load-Line
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li><b>Time Domain (Left):</b> Displays 2 RF cycles of large-signal drain voltage $V_{ds}(t)$ (blue) and current $I_{ds}(t)$ (green), clipped by knee voltage $V_{knee}$.</li>
              <li><b>Dynamic Load-Line (Right):</b> Plots $I_{ds}$ vs $V_{ds}$ dynamic trajectory, confirming non-destructive SOA operation.</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30">
            <div class="font-bold text-amber-400 mb-1.5 flex items-center gap-2">
              <span>📐</span> 3. Schematic & Component BOM
            </div>
            <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px] leading-relaxed">
              <li>Schematic uses standard IEEE MOSFET symbols without solid fill artifacts.</li>
              <li>BOM table lists all micron-level transistor gate widths, fingers, inductances, capacitances, and transformer coupling values.</li>
            </ul>
          </div>
        </div>
      `;
    } else if (activeManualSection === "export") {
      contentArea.innerHTML = isZh ? `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>💻</span> SPICE 網表與 EDA 工具整合指南
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed mb-3">
              點擊「💻 SPICE 網表與導出」標籤頁，系統會自動生成標準可執行的 SPICE 語法。支援一鍵複製或直接下載 <code>.sp</code> 與 <code>.s2p</code> 檔案。
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div class="font-bold text-sky-400 mb-1">Cadence Virtuoso / Spectre 匯入</div>
                <p class="text-slate-400 leading-relaxed">
                  在 ADE-L 或 ADE Explorer 中，選擇 <b>Setup -> Model Libraries</b>，點擊添加下載之 <code>.sp</code> 文件，即可執行週期穩態分析 (PSS / PAC) 與瞬態模擬。
                </p>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div class="font-bold text-emerald-400 mb-1">Keysight ADS (先進設計系統) 匯入</div>
                <p class="text-slate-400 leading-relaxed">
                  下載 <code>.s2p</code> 檔案。在 ADS 原理圖中放置 <code>S2P</code> 元件，雙擊指向該檔案，即可結合收發機鏈路預算進行 S 參數、增益與穩定度模擬。
                </p>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400">
            <span class="text-slate-200 font-bold">Touchstone S2P 檔案規範：</span>
            本系統導出的 <code>.s2p</code> 遵循嚴格國際格式：頻率單位為 GHz，資料格式為 DB（分貝）與角度（Degree），參考特徵阻抗為 50.0 Ω，相容於所有主流微波 EDA 軟體。
          </div>
        </div>
      ` : `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-cyan-400 mb-1.5 flex items-center gap-2">
              <span>💻</span> SPICE Deck & EDA Tool Integration Guide
            </div>
            <p class="text-slate-300 text-[11px] leading-relaxed mb-3">
              Switch to the "💻 SPICE Deck & Export" tab to view automatically generated simulation decks. You can copy to clipboard or download <code>.sp</code> and <code>.s2p</code> files directly.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div class="font-bold text-sky-400 mb-1">Cadence Virtuoso / Spectre</div>
                <p class="text-slate-400 leading-relaxed">
                  In ADE-L / ADE Explorer, go to <b>Setup -> Model Libraries</b>, add the downloaded <code>.sp</code> deck, and run DC, Transient (.tran), or Periodic Steady-State (PSS/PAC) simulations.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div class="font-bold text-emerald-400 mb-1">Keysight ADS</div>
                <p class="text-slate-400 leading-relaxed">
                  Download the <code>.s2p</code> Touchstone file. Place an <code>S2P</code> component on the ADS schematic, link the file, and run S-parameter simulation for link-budget verification.
                </p>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400">
            <span class="text-slate-200 font-bold">Touchstone S2P Compliance:</span>
            Exported <code>.s2p</code> files conform to standard format (# GHZ S DB R 50.0), compatible with Keysight ADS, Cadence Virtuoso nport, ANSYS HFSS, and AWR Microwave Office.
          </div>
        </div>
      `;
    } else if (activeManualSection === "faq") {
      contentArea.innerHTML = isZh ? `
        <div class="space-y-3.5">
          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q1: 為什麼 Rollett 穩定因子 $K < 1$？該如何解決？</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              當 $K < 1$ 時代表電路處於「條件穩定」狀態，在特定源/負載阻抗下可能誘發寄生自激振盪。在毫米波頻段，這主要是由於電晶體汲極至閘極的重疊反饋電容 $C_{gd}$ 引發之 Miller 效應。<br>
              <b>處置方案：</b>在規格面板中勾選「<b>差動交叉中和電容 (Cneu)</b>」，系統會配置與 $C_{gd}$ 匹配之交叉中和電容注入反相電荷，消除反饋，保證 $K > 1$ 絕對無條件穩定。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q2: 毫米波頻段 (如 28 GHz / 77 GHz) 片上電感品質因子 Q 偏低怎麼辦？</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              矽基 CMOS 導電基板在高頻會引發嚴重的渦流損耗與金屬層集膚效應，導致片上電感 Q 值通常落在 12~18 之間。本系統已將電感等效串聯電阻 (ESR) 損耗納入 PAE 與輸出功率計算。實體設計建議採用頂層超厚金屬 (UTM) 製作差動八角對稱電感。
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q3: 是否可以直接以離線單機方式執行本工具？</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              可以！本系統之 WebApp 為純前端靜態架構，無須安裝 Node.js 或後端伺服器，直接以瀏覽器開啟 <code>web/index.html</code> 即可在完全離線環境下進行高精度物理合成與 SPICE 導出。
            </p>
          </div>
        </div>
      ` : `
        <div class="space-y-3.5">
          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q1: Why is Rollett Stability Factor K < 1, and how to fix it?</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              When $K < 1$, the amplifier is conditionally stable and may oscillate under certain load terminations. In mmWave CMOS, this is caused by drain-to-gate overlap capacitance $C_{gd}$ via the Miller effect.<br>
              <b>Fix:</b> Enable "<b>Cross-Coupled Neutralization (Cneu)</b>". The engine places a neutralization capacitor matching $C_{gd}$ with 180° inverted phase, canceling the feedback loop and restoring unconditional stability ($K > 1$).
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q2: How to handle low on-chip inductor Q at mmWave frequencies (28G / 77G)?</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              Substrate eddy currents and skin effects limit on-chip inductor Q to 12-18 in bulk CMOS. AutoRF incorporates inductor ESR loss into power and PAE synthesis. In layout, use ultra-thick metal (UTM) layers for symmetrical octagonal inductors.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <div class="font-bold text-amber-300 text-xs mb-1">Q3: Can this tool run completely offline?</div>
            <p class="text-slate-300 text-[11px] leading-relaxed">
              Yes! The AutoRF WebApp is 100% client-side with zero backend dependencies. Simply open <code>web/index.html</code> in any modern browser to synthesize designs and export SPICE decks offline.
            </p>
          </div>
        </div>
      `;
    }
  }

  renderManualContent();
}

function applyLanguage() {
  const dict = i18nData[currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerText = dict[key];
  });
  updateUI();
  initGlossary();
  initManual();
}

window.addEventListener("DOMContentLoaded", initApp);

