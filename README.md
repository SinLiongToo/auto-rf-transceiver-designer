# AutoRF: 射頻前端積體電路設計與合成指引 (RF Front-End Design & Synthesis Guide)
### Universal CMOS RF & Millimeter-Wave Full Transceiver Front-End Design Guide

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://sinliongtoo.github.io/auto-rf-transceiver-designer/)
[![User Manual](https://img.shields.io/badge/User%20Manual-Comprehensive%20Guide-blueviolet?logo=gitbook)](USER_MANUAL.md)
[![Tests](https://img.shields.io/badge/Unit%20Tests-14%20Passed-blue)](tests/test_designer.py)
[![QA](https://img.shields.io/badge/System%20QA-22%2F22%20Verified-success)](tests/verify_all.py)

> 🚀 **即時線上體驗 (Live Interactive WebApp)**:  
> [https://sinliongtoo.github.io/auto-rf-transceiver-designer/](https://sinliongtoo.github.io/auto-rf-transceiver-designer/)  
> 📖 **完整使用操作手冊 (User Manual)**:  
> [USER_MANUAL.md](USER_MANUAL.md) — 涵蓋六大模組合成理論、史密斯圖負載牽引解讀、大訊號線性度與熱阻可靠度、SPICE 網表與 EDA 工具整合教學。

**AutoRF (v1.4.0)** 是一套專為射頻與毫米波積體電路（RFIC / MMIC）設計工程師打造的完整射頻前端設計與自動化合成指引系統。系統涵蓋現代射頻收發機前端的**六大核心電路與被動輻射模組（PA 功率放大器、LNA 低雜訊放大器、VCO 壓控振盪器、Mixer 混頻器、T/R Switch 雙工開關、AiP Antenna 封裝天線）**，並內建完整雙語射頻前端術語字典（RF Front-End Glossary）與操作手冊（User Manual），支援從 **Sub-1 GHz IoT**、**2.4G/5G Wi-Fi**、**28G/39G 5G 毫米波與 LEO Ka-Band 低軌衛星**，一直到 **60G WiGig**、**71–76G E-Band 骨幹回傳**、**77 GHz 車用毫米波雷達** 與 **94 GHz W-Band 超高頻異質整合感測**。

---

## 🌐 通用應用領域支援 (Universal Application Support)

本系統建立於**第一性物理原理與半導體高頻比例法則（First-Principles Physics & Scaling Laws）**，能依據工作頻率與系統規格自動調配最佳電路拓樸與尺寸，適用於現今所有主流無線通訊、雷達與感測系統：

| 應用領域 (Application Domain) | 典型頻段 (Bands) | 發射端 (PA / TX) 角色 | 接收端 (LNA / RX) 角色 | 本振與混頻 (VCO / Mixer) | 開關與天線 (Switch & AiP) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **🌐 5G / 6G 行動通訊與骨幹回傳** | **Sub-6G, 28G, 39G, 73.5 GHz (E-Band)** | 高回退效率 (PBO PAE)、DPD 數位預失真抵禦 OFDM 高峰均比。 | 極低噪聲係數 ($NF < 2.2\text{ dB}$)，寬頻輸入阻抗匹配。 | 超低帶內抖動與 Leeson 相噪，雙平衡高隔離。 | 低插損開關 ($<1.5\text{dB}$)，封裝級微帶天線 (AiP)。 |
| **🚗 車用先進輔助駕駛雷達 (ADAS)** | **76–77 GHz & 77–81 GHz FMCW** | $P_{out} \ge 14.5\text{ dBm}$，高飽和輸出驅動天線陣列。 | $NF \le 2.3\text{ dB}$，50Ω 同步雜訊輸入匹配，高動態。 | 寬調諧範圍 ($\text{FTR} \ge 15\%$)，超線性調頻斜率。 | 快速 T/R 切換開關，5.2 dBi 封裝天線整合。 |
| **🛰️ 低軌衛星通訊 (LEO Satcom)** | **12 GHz (Ku), 29.5 GHz (Ka, 22FDX), 40 GHz** | 整合交叉中和電容 ($C_{neu}$)，確保相控陣列多通道無自激振盪。 | 超低噪聲係數 ($NF < 1.8\text{ dB}$)，低通道間相差。 | 頻率覆蓋廣，多波束本振同步驅動。 | 堆疊電晶體高耐壓開關，高極化純度天線。 |
| **🔬 工業物位感測與無損探傷 (NDT)** | **60 GHz, 75–81 GHz, 94 GHz (W-Band SiGe)** | 穿透粉塵、高溫高壓蒸汽、原油油槽連續物位測量。 | 高靈敏度接收微弱反射波，極佳抗雜散干擾能力。 | 極高頻率穩定度與寬溫度容限 ($(-40^\circ\text{C} \sim +125^\circ\text{C})$)。 | 高隔離度隔離發射洩漏 ($>25\text{dB}$)，定向波束天線。 |
| **🏡 智慧家庭與低功耗物聯網 (IoT)** | **Sub-1 GHz (868/915M), 2.4 GHz, 5 GHz** | Class-C / Class-E / Class-F 交換式高效率功率放大，延長電池續航。 | 微安級超低靜態電流偏置 ($I_{dc} < 2\text{ mA}$)。 | 片上整合 LC 諧振腔，省去外部石英晶體體積與成本。 | 低成本單端開關，晶片板載印刷天線。 |
| **🏥 醫療生醫感測與生命體徵雷達** | **433 MHz, 2.45 GHz, 60 GHz (呼吸心跳)** | 高純度單頻譜輸出，低帶外諧波輻射。 | 超微弱都卜勒頻移反射波接收。 | 極低近端 $1/f$ 閃爍噪聲，保證微小生理位移解析度。 | 雙工循環/隔離切換，微米級高解析陣列天線。 |

---

## 🌟 核心電路、系統鏈路與大訊號/熱可靠度模組

1. **🚀 功率放大器 (Power Amplifier - PA)**:
   - **Cripps 負載線理論**: 在供電電壓 $V_{DD}$ 與膝電壓 $V_{knee}$ 拘束下，自動合成汲極最佳等效阻抗 $R_{opt}$。
   - **完整六大操作類別 (PA Classes: A, AB, B, C, E, F)**:
     - **Class A / AB / B**: 以微米級差動對 FET 當受控電流源，差異在於**閘極偏壓工作點 ($V_{gs}$)** 與導通角（Class A $\theta=360^\circ$ 全週期導通線性最高、Class AB $\theta=240^\circ$ 兼具線性與效率主流、Class B $\theta=180^\circ$ 半波推挽放大）。
     - **Class C ($\theta=120^\circ$)**: $V_{gs} < V_{th}$ 窄脈衝導通，依據餘弦脈衝傅立葉係數合成基頻與直流分量，理論汲極效率高達 $89.7\%$。
     - **Class F**: 引入**諧波終端整形網路 (Harmonic Traps)**，汲極端實現 2 次諧波短路 ($Z_{2f_0}=0$) 與 3 次諧波開路 ($Z_{3f_0}=\infty$)，將汲極電壓整形為方波、電流為半正弦，理論效率達 88.4%～100%。
     - **Class E**: 電晶體作為**高頻純切換開關 (Switch)**，藉由特定的汲極並聯電容 $C_{sh}$ 與調諧迴路實現**零電壓切換 (ZVS)** 與零電壓變化率切換 (ZDS)，消除切換損耗（需耐受 $3.56\times V_{dd}$ 峰值電壓擺幅）。
   - **晶片整合變壓器 Balun 與差動交叉中和**: 自動合成 $L_p, L_s, k$ 與 $C_{neu} \approx C_{gd}$，保證毫米波頻段 **Rollett 穩定因子 $K > 1$**。

2. **📡 低雜訊放大器 (Low-Noise Amplifier - LNA)**:
   - **電感源極退化 (IDCS Cascode)** 與 **同步雜訊與輸入匹配 (SNIM)**: 源極電感 $L_s$ 產生無熱雜訊 $50\,\Omega$ 實部阻抗，閘極 $L_g$ 諧振 $C_{gs}$，達成最低雜訊指數 $NF_{min}$ 與 $S_{11} < -18\text{ dB}$。

3. **⚡ 壓控振盪器 (Voltage-Controlled Oscillator - VCO)**:
   - **互補交叉耦合負電導 (-Gm Core)**、**Barkhausen 啟振裕度 ($\alpha_{\text{startup}} \ge 3.0$)** 與 **Leeson-Cutler 相位雜訊模型**。

4. **🔀 混頻器 (Down/Up-Conversion Mixer)**:
   - **雙平衡吉爾伯特乘法單元 (Double-Balanced Gilbert Cell)**: 提供高轉換增益 $G_c = \frac{2}{\pi} g_{m,RF} R_L$ 與 $> 35\text{ dB}$ 埠間本振隔離度。

5. **🔀 收發雙工切換開關 (T/R SPDT RF Switch)**:
   - **串並聯 (Series-Shunt) 拓樸**、**$N$-Stack 電晶體堆疊耐壓** 與 **$R_b \ge 25\text{ k}\Omega$ 基極浮接電阻**。

6. **📡 毫米波天線與封裝整合 (AiP Antenna-in-Package)**:
   - **微帶貼片天線 (Microstrip Patch)** 與 **內凹微帶饋電 ($y_0$)**，支援 Organic AiP、LTCC、Fused Silica 與 On-Chip $\text{SiO}_2$。

7. **📊 大訊號線性度、數位預失真與封裝熱阻可靠度 (Linearity, DPD & Thermal SOA - v1.4.0 新增)**:
   - **Rapp / Saleh AM-AM 與 AM-PM 壓縮模型**: 即時繪製大訊號增益壓縮與相位偏移曲線，計算 $OP_{1\text{dB}}$、$OIP_3$ 與 $IIP_3$。
   - **OFDM 調變 EVM / ACLR1 與 DPD 數位預失真**: 支援 `QPSK`, `16-QAM`, `64-QAM`, `256-QAM`, `1024-QAM` 高峰均比 (PAPR) 回退評估，並可一鍵開啟基頻數位預失真 (DPD) 比對線性化前後之 EVM 與鄰道洩漏比 (ACLR1)。
   - **雙音三階交調 (Two-Tone IMD3) 與高次諧波頻譜**: 視覺化 $2f_1-f_2, f_1, f_2, 2f_2-f_1$ 交調分量及 $2f_0, 3f_0$ 諧波抑制度。
   - **封裝熱阻 ($\theta_{JA}$) 與 Black 電遷移壽命方程 (MTTF)**: 支援 Flip-Chip BGA、QFN Exposed Pad、WLCSP 與 AiP BGA 四種封裝熱阻模型，動態計算接面溫度 $T_j = T_{amb} + P_{diss}\cdot\theta_{JA}$ 與阿瑞尼氏電遷移平均失效壽命 (MTTF)。

8. **🌐 全收發鏈路預算與相控陣列 2D 波束賦形 (Cascaded Link Budget & Phased Array Beamforming)**:
   - Friis 級聯雜訊指數、接收靈敏度、EIRP 以及 $1\times 4 \sim 8\times 8$ 相控陣列極座標波束掃描與移相器量化分析。

9. **🎛️ 互動式阻抗匹配網路合成器、📐 動態矽片面積成本估算、🌡️ 動態 PVT 角分析 與 📄 一鍵工程規格書導出**。

---

## 🛠️ PDK 製程庫支援 (Process Design Kit - 6 大晶圓代工節點)

* **GF 22FDX 22nm FD-SOI RF (`22nm_fdsoi`)**: $V_{DD} = 0.8\text{ V}, f_T = 350\text{ GHz}, f_{max} = 370\text{ GHz}$ (v1.4.0 新增：毫米波/低軌衛星超低功耗首選)
* **TSMC 28nm HPC+ RF (`28nm_hpc`)**: $V_{DD} = 0.9\text{ V}, f_T = 240\text{ GHz}, f_{max} = 300\text{ GHz}$ (5G FR2 / 77GHz 雷達主流)
* **TSMC 40nm RF LP (`40nm_rf`)**: $V_{DD} = 1.1\text{ V}, f_T = 190\text{ GHz}, f_{max} = 250\text{ GHz}$
* **TSMC 65nm RF CMOS (`65nm_rf`)**: $V_{DD} = 1.2\text{ V}, f_T = 160\text{ GHz}, f_{max} = 210\text{ GHz}$
* **SiGe BiCMOS 130nm HBT/RF (`130nm_sige`)**: $V_{DD} = 1.8\text{ V}, f_T = 300\text{ GHz}, f_{max} = 450\text{ GHz}$ (v1.4.0 新增：W-Band 94GHz 高功率雷達首選)
* **TSMC 0.18µm RF CMOS (`180nm_rf`)**: $V_{DD} = 1.8\text{ V}, f_T = 55\text{ GHz}$ (成熟低成本 Sub-1GHz IoT)

---

## 📁 專案目錄結構

```
rf_circuit_放大器/
├── pa_engine/                   # 核心 Python 射頻 IC 合成引擎
│   ├── __init__.py              # 模組導出 (PA, LNA, VCO, Mixer, Switch, Antenna, Linearity/Thermal)
│   ├── process_pdk.py           # 6 大 PDK 半導體參數模型庫 (含 22nm FD-SOI 與 130nm SiGe)
│   ├── cripps.py                # Cripps 負載線與大訊號功率分析 (支援 Class A/AB/B/C/E/F)
│   ├── transistor_sizing.py     # 多指電晶體尺寸與高頻寄生效應萃取
│   ├── matching_network.py      # 片上變壓器 Balun 與匹配網路合成
│   ├── stability.py             # Rollett K-factor 與差動交叉中和分析
│   ├── loadpull.py              # 史密斯圖負載牽引等高線演算法
│   ├── class_e_f.py             # Class-E 與 Class-F 諧波合成
│   ├── linearity_thermal.py     # AM-AM/AM-PM、DPD、EVM/ACLR、IMD3 與熱阻/MTTF 引擎
│   ├── lna_designer.py          # 自動化 LNA 低雜訊放大器合成器
│   ├── vco_designer.py          # 自動化 LC-VCO 壓控振盪器合成器
│   ├── mixer_designer.py        # 自動化 Gilbert Cell 混頻器合成器
│   ├── switch_designer.py       # 自動化 SPDT T/R 天線開關合成器
│   ├── antenna_designer.py      # 自動化 AiP 微帶貼片天線合成器
│   ├── spice_exporter.py        # SPICE 網表與 Touchstone .s2p 導出
│   └── designer.py              # PA 主設計調度器
├── web/ & docs/                 # 互動式視覺化 WebApp (支援離線與 GitHub Pages)
│   ├── index.html               # 繁中/英文、暗亮主題雙切換介面 (8 大工作階段 + 9 大分頁)
│   └── app.js                   # 純前端即時物理計算引擎與 Canvas/SVG 繪圖
├── examples/                    # 完整應用場景設計範例
├── tests/                       # 嚴格自動化測試與物理定律驗證
│   ├── test_designer.py         # 單元測試集 (14 項全部通過)
│   ├── verify_all.py            # 22 項全系統物理定律與 432 組極端矩陣稽核
│   └── verify_frontend_math.js  # 前端 JavaScript 數學引擎無頭驗證
├── cli.py                       # 多模組命令列終端設計工具 (--module pa|lna|vco|mixer|switch|antenna|all)
└── README.md
```

---

## 🚀 快速上手 (Quick Start)

### 1. 互動式圖形介面 (Web UI)
直接使用瀏覽器（Chrome, Edge, Safari）開啟 [`web/index.html`](web/index.html)：
- 頂部支援 8 大工作階段切換：`PA`、`LNA`、`VCO`、`Mixer`、`Switch`、`Antenna`、`Link Budget & Array`、`Matching`。
- 內建 11 組全頻段預設場景（含新增之 `28 GHz LEO 低軌衛星相控陣 (22nm FD-SOI)` 與 `94 GHz W-Band 高解析雷達 (130nm SiGe)`）。
- 支援九大檢視分頁：**史密斯圖**、**暫態波形**、**📊 線性度與熱阻 (Linearity & Thermal)**、**電路圖與 BOM**、**系統鏈路與波束賦形**、**匹配網路合成**、**晶片面積與佈局**、**PVT 製程角**、**SPICE 網表與工程報告導出**。

### 2. 終端機命令列設計 (Multi-Module CLI)
```bash
# 一次合成全收發機 6 大模組 + 大訊號線性度 (256-QAM + DPD) 與封裝熱阻可靠度
python cli.py --module all --freq 77.0 --node 22nm_fdsoi --pout 16.0 --op-class C --modulation 256-QAM

# 單獨合成 28 GHz 低雜訊放大器 (LNA)
python cli.py --module lna --freq 28.0 --node 28nm_hpc

# 設計一個 2.4 GHz Wi-Fi 功率放大器並導出 SPICE 與 Touchstone
python cli.py --module pa --freq 2.4 --pout 24.0 --node 65nm_rf --export-spice wifi_pa.sp --export-s2p wifi_pa.s2p
```

### 3. Python 模組程式化調用
```python
from pa_engine import (
    AutomatedPADesigner,
    AutomatedLNADesigner,
    AutomatedVCODesigner,
    AutomatedMixerDesigner,
    AutomatedSwitchDesigner,
    AutomatedAntennaDesigner,
    AutomatedFilterDesigner,
    analyze_linearity_and_thermal,
)

# 1. 合成 29.5 GHz Ka-Band 衛星功率放大器 (22nm FD-SOI, Class-C)
pa = AutomatedPADesigner("22nm_fdsoi").synthesize(freq_ghz=29.5, pout_dbm=19.5, op_class="C")

# 2. 評估 256-QAM 調變線性度 (含 DPD) 與 Flip-Chip BGA 封裝接面溫度 Tj / MTTF
lin = analyze_linearity_and_thermal(
    pout_dbm=pa.psat_dbm,
    gain_db=pa.gain_db,
    p_dc_w=pa.p_dc_w,
    op_class="C",
    modulation="256-QAM",
    dpd_enabled=True,
    package_type="flip_chip_bga",
)

# 3. 合成 2.4 GHz 三階高通濾波器 (HP) 並模擬低頻 (LF) 與高頻 (HF) 訊號輸入/輸出變化
flt = AutomatedFilterDesigner().synthesize(
    cutoff_freq_ghz=2.4,
    filter_type="HP",
    approximation="butterworth",
    order_n=3,
    vin_lf_v=0.80,
    vin_hf_v=0.60,
)
print(f"PA PAE: {pa.pae_pct}%, EVM (Raw->DPD): {lin.evm_raw_pct}% -> {lin.evm_dpd_pct}%, Tj: {lin.junction_temp_c} °C")
print(f"HP Filter LF Out: {flt.signal_components[0].vout_amp_v}V, HF Out: {flt.signal_components[2].vout_amp_v}V")
```

### 4. 執行完整驗證測試
```bash
# 執行單元測試 (15/15 Passed)
python -m unittest tests/test_designer.py

# 執行 24 項全系統物理定律與 432 組矩陣稽核
python tests/verify_all.py

# 執行前端 JavaScript 數學計算驗證
node tests/verify_frontend_math.js
```

---
© AutoRF Integrated Front-End Design Suite (v1.5.0). Licensed under MIT.
