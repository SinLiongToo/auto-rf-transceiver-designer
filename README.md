# AutoRF: 射頻前端積體電路設計與合成指引 (RF Front-End Design & Synthesis Guide)
### Universal CMOS RF & Millimeter-Wave Full Transceiver Front-End Design Guide

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://sinliongtoo.github.io/auto-rf-transceiver-designer/)
[![User Manual](https://img.shields.io/badge/User%20Manual-Comprehensive%20Guide-blueviolet?logo=gitbook)](USER_MANUAL.md)
[![Tests](https://img.shields.io/badge/Unit%20Tests-12%20Passed-blue)](tests/test_designer.py)
[![QA](https://img.shields.io/badge/System%20QA-20%2F20%20Verified-success)](tests/verify_all.py)

> 🚀 **即時線上體驗 (Live Interactive WebApp)**:  
> [https://sinliongtoo.github.io/auto-rf-transceiver-designer/](https://sinliongtoo.github.io/auto-rf-transceiver-designer/)  
> 📖 **完整使用操作手冊 (User Manual)**:  
> [USER_MANUAL.md](USER_MANUAL.md) — 涵蓋六大模組合成理論、史密斯圖負載牽引解讀、SPICE 網表與 EDA 工具整合教學。

**AutoRF** 是一套專為射頻與毫米波積體電路（RFIC / MMIC）設計工程師打造的完整射頻前端設計與自動化合成指引系統。系統涵蓋現代射頻收發機前端的**六大核心電路與被動輻射模組（PA 功率放大器、LNA 低雜訊放大器、VCO 壓控振盪器、Mixer 混頻器、T/R Switch 雙工開關、AiP Antenna 封裝天線）**，並內建完整雙語射頻前端術語字典（RF Front-End Glossary）與操作手冊（User Manual），支援從 **Sub-1 GHz IoT**、**2.4G/5G Wi-Fi**、**28G/39G 5G 毫米波**，一直到 **60G WiGig**、**71–76G E-Band 骨幹回傳** 與 **72–79 GHz / 77–81 GHz 車用毫米波雷達與高精度工業成像**。

---

## 🌐 通用應用領域支援 (Universal Application Support)

本系統建立於**第一性物理原理與半導體高頻比例法則（First-Principles Physics & Scaling Laws）**，能依據工作頻率與系統規格自動調配最佳電路拓樸與尺寸，適用於現今所有主流無線通訊、雷達與感測系統：

| 應用領域 (Application Domain) | 典型頻段 (Bands) | 發射端 (PA / TX) 角色 | 接收端 (LNA / RX) 角色 | 本振與混頻 (VCO / Mixer) | 開關與天線 (Switch & AiP) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **🌐 5G / 6G 行動通訊與骨幹回傳** | **Sub-6G, 28G, 39G, 73.5 GHz (E-Band)** | 高回退效率 (PBO PAE)、高線性度抵禦 OFDM 高峰均比。 | 極低噪聲係數 ($NF < 2.2\text{ dB}$)，寬頻輸入阻抗匹配。 | 超低帶內抖動與 Leeson 相噪，雙平衡高隔離。 | 低插損開關 ($<1.5\text{dB}$)，封裝級微帶天線 (AiP)。 |
| **🚗 車用先進輔助駕駛雷達 (ADAS)** | **76–77 GHz & 77–81 GHz FMCW** | $P_{out} \ge 14.5\text{ dBm}$，高飽和輸出驅動天線陣列。 | $NF \le 2.3\text{ dB}$，50Ω 同步雜訊輸入匹配，高動態。 | 寬調諧範圍 ($\text{FTR} \ge 15\%$)，超線性調頻斜率。 | 快速 T/R 切換開關，5.2 dBi 封裝天線整合。 |
| **🛰️ 低軌衛星通訊 (LEO Satcom)** | **12 GHz (Ku), 28/30 GHz (Ka), 40 GHz (Q)** | 整合交叉中和電容 ($C_{neu}$)，確保相控陣列多通道無自激振盪。 | 超低噪聲係數 ($NF < 1.8\text{ dB}$)，低通道間相差。 | 頻率覆蓋廣，多波束本振同步驅動。 | 堆疊電晶體高耐壓開關，高極化純度天線。 |
| **🔬 工業物位感測與無損探傷 (NDT)** | **60 GHz, 75–81 GHz** | 穿透粉塵、高溫高壓蒸汽、原油油槽連續物位測量。 | 高靈敏度接收微弱反射波，極佳抗雜散干擾能力。 | 極高頻率穩定度與寬溫度容限 ($(-40^\circ\text{C} \sim +125^\circ\text{C})$)。 | 高隔離度隔離發射洩漏 ($>25\text{dB}$)，定向波束天線。 |
| **🏡 智慧家庭與低功耗物聯網 (IoT)** | **Sub-1 GHz (868/915M), 2.4 GHz, 5 GHz** | Class-E / Class-F 交換式高效率功率放大，延長電池續航。 | 微安級超低靜態電流偏置 ($I_{dc} < 2\text{ mA}$)。 | 片上整合 LC 諧振腔，省去外部石英晶體體積與成本。 | 低成本單端開關，晶片板載印刷天線。 |
| **🏥 醫療生醫感測與生命體徵雷達** | **433 MHz, 2.45 GHz, 60 GHz (呼吸心跳)** | 高純度單頻譜輸出，低帶外諧波輻射。 | 超微弱都卜勒頻移反射波接收。 | 極低近端 $1/f$ 閃爍噪聲，保證微小生理位移解析度。 | 雙工循環/隔離切換，微米級高解析陣列天線。 |

---

## 🌟 六大核心電路與天線模組 (Six RF Front-End Building Blocks)

1. **🚀 功率放大器 (Power Amplifier - PA)**:
   - **Cripps 負載線理論**: 在供電電壓 $V_{DD}$ 與膝電壓 $V_{knee}$ 拘束下，自動合成汲極最佳等效阻抗 $R_{opt}$。
   - **多元操作類別 (PA Classes: A, AB, B, C, E, F)**:
     - 功率放大器各類別（Class）電路**並非完全相同**，本質上可分為**連續導通偏壓類 (Linear/Continuous PAs)** 與 **諧波切換開關類 (Harmonic/Switching PAs)** 兩大架構：
       - **Class A / AB / B**: 以微米級差動對 FET 當受控電流源，差異在於**閘極偏壓工作點 ($V_{gs}$)** 與導通角（Class A $\theta=360^\circ$ 全週期導通線性最高、Class AB $\theta \in (180^\circ, 360^\circ)$ 兼具線性與效率主流、Class B $\theta=180^\circ$ 推挽放大）。
       - **Class C**: $V_{gs} < V_{th}$ 脈衝導通，仰賴高 $Q$ LC 帶通濾波。
       - **Class F**: 引入**諧波終端整形網路 (Harmonic Traps)**，汲極端實現 2 次諧波短路 ($Z_{2f_0}=0$) 與 3 次諧波開路 ($Z_{3f_0}=\infty$)，將汲極電壓整形為方波、電流為半正弦，大幅縮小重疊損耗，理論效率達 88.4%～100%。
       - **Class E**: 電晶體作為**高頻純切換開關 (Switch)**，藉由特定的汲極並聯電容 $C_{sh}$ 與調諧迴路實現**零電壓切換 (ZVS)** 與零電壓變化率切換 (ZDS)，導通時 $V_{ds}=0$、截止時 $I_d=0$，消除切換損耗，極限效率高達 100%（但需耐受 $3.56\times V_{dd}$ 峰值電壓擺幅）。
   - **晶片整合變壓器 Balun**: 磁耦合係數 $k$、匝數比 $n$、初級 $L_p$ 與次級 $L_s$ 自動合成，直接由天線 50Ω 單端匹配。
   - **差動交叉中和技術**: $C_{neu} \approx C_{gd}$ 抵消米勒反饋，保證毫米波頻段 **Rollett 穩定因子 $K > 1$** 與逆向隔離度。

2. **📡 低雜訊放大器 (Low-Noise Amplifier - LNA)**:
   - **電感源極退化 (IDCS Cascode)**: 利用源極退化電感 $L_s$ 產生無熱雜訊之等效實數 $50\,\Omega$ 輸入阻抗。
   - **同步雜訊與輸入匹配 (SNIM)**: 閘極微調電感 $L_g$ 諧振 $C_{gs}$，在最低雜訊指數 $NF_{min}$ 下同步達成 $S_{11} < -18\text{ dB}$。
   - **Shaeffer-Lee 雜訊物理模型**: 精確預測 $NF, NF_{min}, R_n, \Gamma_{opt}$ 與三階截波點 $IIP_3$。

3. **⚡ 壓控振盪器 (Voltage-Controlled Oscillator - VCO)**:
   - **互補交叉耦合負電導 (-Gm Core)**: NMOS + PMOS 負阻對抵消 LC 諧振腔並聯損耗電阻 $R_p$。
   - **Barkhausen 啟振裕度保證**: 自動配置 $\alpha_{\text{startup}} \ge 3.0$，確保在任何低溫/高溫 PVT 轉角皆能 100% 穩定起振。
   - **Leeson-Cutler 相位雜訊模型**: 綜合電晶體噪聲係數 $F$、載波功率 $P_{\text{sig}}$ 與品質因子 $Q$，精確預測 1 MHz / 10 MHz 頻偏相噪。
   - **MOS 變容二極體 (Varactor)**: 提供 $\ge 15\%$ 調諧範圍與可預測的 $K_{VCO}$ 斜率。

4. **🔀 混頻器 (Down/Up-Conversion Mixer)**:
   - **雙平衡吉爾伯特乘法單元 (Double-Balanced Gilbert Cell)**: 射頻跨導級 (RF Stage) + 快速電流換流開關 (LO Quad) + 中頻負載 (IF Load)。
   - **天然高隔離度**: 對稱平衡電橋天然消除偶數階失真，提供 $> 35\text{ dB}$ 的 LO-RF 與 LO-IF 隔離。
   - **轉換增益與線性度**: $G_c = \frac{2}{\pi} g_{m,RF} R_L$ 與高 $IIP_3$ 線性動態範圍。

5. **🔀 收發雙工切換開關 (T/R SPDT RF Switch)**:
   - **串並聯 (Series-Shunt) 拓樸**: 串聯開關 FET 降低導通插損 ($IL < 2\text{ dB}$)，並聯開關 FET 於關斷時將信號短路至地，大幅提昇隔離度 ($\text{ISO} > 22\text{ dB}$)。
   - **電晶體堆疊耐壓技術 (FET Stacking)**: $N$-Stack 結構均勻分散高功率大電壓擺幅，避免寄生基極二極體導通並大幅提高功率耐受度 ($P_{1\text{dB}}$)。
   - **基極浮接電阻 (Body-Floating)**: $R_b \ge 25\text{ k}\Omega$ 阻斷高頻射頻信號向有損矽襯底洩漏。

6. **📡 毫米波天線與封裝整合 (AiP Antenna-in-Package)**:
   - **微帶貼片天線合成 (Microstrip Patch)**: Bahl & Bhartia 最佳輻射貼片寬度 $W$ 與 Hammerstad 邊緣電場修正之諧振長度 $L$。
   - **內凹微帶饋電 (Inset Notch Feed)**: 精確合成內凹饋電深度 $y_0$，實現對 $50\,\Omega$ 傳輸線的完美阻抗匹配 ($S_{11} < -20\text{ dB}$)。
   - **封裝介質材料適配 (Substrates)**: 支援高密度有機有機封裝材料 (Organic AiP, $\varepsilon_r = 3.2$)、低溫共燒陶瓷 (LTCC, $\varepsilon_r = 5.9$)、石英玻璃 (Fused Silica, $\varepsilon_r = 3.78$) 與晶片片上 (On-Chip $\text{SiO}_2$)。

7. **🌐 全收發鏈路預算與 Friis 級聯分析 (Cascaded Link Budget)**:
   - **Friis 級聯雜訊公式**: 即時計算接收機總增益 $Gain_{rx}$、級聯雜訊指數 $NF_{rx} = NF_1 + \frac{NF_2 - 1}{G_1} + \dots$、級聯 $IIP_3$ 與熱雜訊底調解靈敏度 ($Sensitivity$)。
   - **發射機鏈路**: 計算天線端總功率與單單元/陣列等效全向輻射功率 (EIRP)。

8. **📡 相控陣列 2D 波束賦形合成器 (Phased Array Beamforming)**:
   - **空間波束掃描**: 支援線性與面陣列 ($1\times 4, 1\times 8, 4\times 4, 8\times 8$)、波束指向角 $\theta \in [-60^\circ, +60^\circ]$、4/5/6-Bit 移相器步進量化。
   - **陣列因子方向圖**: 即時 Canvas 極坐標陣列因子繪圖、同相功率疊加增益提升與半功率波束寬度 (HPBW) 銳化角分析。

9. **🎛️ 互動式阻抗匹配網路合成器 (Impedance Matching Synthesizer)**:
   - **四大拓樸自由切換**: L-型低通 (諧波抑制)、L-型高通 (隔直)、$\Pi$-型寬頻與 T-型帶通匹配。
   - **物理損耗評估與史密斯軌跡**: 納入片上電感有限品質因子 $Q$，計算實際挿損 (IL) 與有載 $Q$ 頻寬，並於史密斯圖上動態標註阻抗變換路徑。

10. **📐 晶片面積估算與平面佈局 (Die Area Breakdown & Floorplan)**:
    - **主動/被動/銲墊分佈**: 微米尺寸電晶體核心、晶片片上電感/Balun/變容管、以及 32-Pin I/O 銲墊環面積分解。
    - **矽片量產成本預估**: 基於 12 吋 (300mm) 晶圓良率模型估算單顆晶粒製造單價。

11. **🌡️ 製程角 PVT 容差與敏感度分析 (PVT Corners Analysis)**:
    - **全極端角涵蓋**: TT (典型 $25^\circ\text{C}$)、FF (快角 $-40^\circ\text{C}$)、SS (慢角 $+125^\circ\text{C}$)、FS 與 SF。
    - **良率安全裕度**: 監控 PA 飽和功率/PAE、LNA 增益/NF、VCO 頻偏與起振裕度之極端漂移。

12. **📄 一鍵導出完整工程規格書 (1-Click Full Engineering Spec Report)**:
    - **工程級報告產出**: 一鍵輸出包含設計參數、鏈路指標、PVT 矩陣、BOM 與 SPICE 網表的專業 HTML 規格報告。

13. **📖 互動式射頻術語字典 (RF Front-End Glossary)**:
    - **術語分類篩選與即時搜尋**: 內建 PA, LNA, VCO, Mixer, Switch, Antenna 核心術語卡片（含 $R_{opt}$, PAE, $P_{1\text{dB}}$, Rollett $K$, $C_{neu}$, NF, SNIM, $IIP_3$, Leeson $L(\Delta f)$, Barkhausen, $G_c$, $R_{on}C_{off}$, AiP 等）。
    - **物理公式與中英雙語對照**: 每一術語皆提供標準數學公式、電路設計意義及中英雙語詳細說明。

---

## 🛠️ PDK 製程庫支援 (Process Design Kit)

* **TSMC 65nm RF CMOS**: $V_{DD} = 1.2\text{ V}, f_T = 160\text{ GHz}, f_{max} = 210\text{ GHz}$
* **TSMC 40nm RF LP**: $V_{DD} = 1.1\text{ V}, f_T = 190\text{ GHz}, f_{max} = 250\text{ GHz}$
* **TSMC 28nm HPC+ RF**: $V_{DD} = 0.9\text{ V}, f_T = 240\text{ GHz}, f_{max} = 300\text{ GHz}$ (超高速毫米波首選)
* **TSMC 0.18µm RF CMOS**: $V_{DD} = 1.8\text{ V}, f_T = 55\text{ GHz}$ (成熟低成本 IoT)

---

## 📁 專案目錄結構

```
rf_circuit_放大器/
├── pa_engine/                   # 核心 Python 射頻 IC 合成引擎
│   ├── __init__.py              # 模組導出 (PA, LNA, VCO, Mixer)
│   ├── process_pdk.py           # PDK 半導體參數模型庫
│   ├── cripps.py                # Cripps 負載線與大訊號功率分析
│   ├── transistor_sizing.py     # 多指電晶體尺寸與高頻寄生效應萃取
│   ├── matching_network.py      # 片上變壓器 Balun 與匹配網路合成
│   ├── stability.py             # Rollett K-factor 與差動交叉中和分析
│   ├── loadpull.py              # 史密斯圖負載牽引等高線演算法
│   ├── class_e_f.py             # Class-E 與 Class-F 諧波合成
│   ├── lna_designer.py          # 自動化 LNA 低雜訊放大器合成器
│   ├── vco_designer.py          # 自動化 LC-VCO 壓控振盪器合成器
│   ├── mixer_designer.py        # 自動化 Gilbert Cell 混頻器合成器
│   ├── spice_exporter.py        # SPICE 網表與 Touchstone .s2p 導出
│   └── designer.py              # PA 主設計調度器
├── web/                         # 互動式視覺化 WebApp (無須伺服器，直接離線執行)
│   ├── index.html               # 繁中/英文、暗亮主題雙切換介面 (PA & LNA 雙 Session)
│   └── app.js                   # 純前端即時物理計算引擎與 Canvas 繪圖
├── examples/                    # 完整應用場景設計範例
│   ├── wifi_2p4ghz_65nm.py      # 2.4 GHz Wi-Fi PA (TSMC 65nm)
│   ├── sub6g_5ghz_40nm.py       # 5.2 GHz Wi-Fi 6 PA (TSMC 40nm)
│   ├── mmwave_28ghz_28nm.py     # 28 GHz 5G 毫米波 PA (TSMC 28nm)
│   ├── radar_77ghz_28nm.py      # 72–79 GHz FMCW 車用雷達 PA (TSMC 28nm)
│   ├── lna_radar_77ghz_28nm.py  # 72–79 GHz 毫米波低雜訊放大器 (TSMC 28nm)
│   ├── eband_73ghz_backhaul_28nm.py # 71–76 GHz E-Band 電信骨幹回傳收發前端
│   └── transceiver_77ghz_full_chain.py # 77 GHz 全鏈路收發機 (PA+LNA+VCO+Mixer)
├── tests/                       # 嚴格自動化測試與物理定律驗證
│   ├── test_designer.py         # 單元測試集 (10 項全部通過)
│   ├── verify_all.py            # 20 項全系統物理定律與格式合規性稽核
│   └── verify_frontend_math.js  # 前端 JavaScript 數學引擎無頭驗證
├── cli.py                       # 命令列終端設計工具
└── README.md
```

---

## 🚀 快速上手 (Quick Start)

### 1. 互動式圖形介面 (Web UI)
直接使用瀏覽器（Chrome, Edge, Safari）開啟 [`web/index.html`](web/index.html)：
- 包含頂層設計模組按鈕：`[ 🚀 功率放大器 (PA) ]` 與 `[ 📡 低雜訊放大器 (LNA) ]`。
- 右上方預設選單內建全頻段應用設定（Sub-1 GHz, 2.4 GHz, 5.2 GHz, 28 GHz, 39 GHz, 60 GHz, 73 GHz, 77 GHz）。
- 支援四大檢視標籤：**史密斯圖等高線/雜訊圓**、**時域波形與頻寬響應**、**晶片架構電路圖**、**SPICE 網表與下載**。

### 2. 終端機命令列設計 (CLI)
```bash
# 設計一個 77 GHz 毫米波車用雷達 PA
python cli.py --freq 76.5 --pout 14.5 --node 28nm_hpc --op-class AB

# 設計一個 2.4 GHz Wi-Fi 功率放大器並導出 SPICE 與 Touchstone
python cli.py --freq 2.4 --pout 24.0 --node 65nm_rf --export-spice wifi_pa.sp --export-s2p wifi_pa.s2p
```

### 3. Python 模組程式化調用
```python
from pa_engine import (
    AutomatedPADesigner,
    AutomatedLNADesigner,
    AutomatedVCODesigner,
    AutomatedMixerDesigner,
    AutomatedSwitchDesigner,
    AutomatedAntennaDesigner
)

# 1. 合成 77 GHz 功率放大器 (PA)
pa = AutomatedPADesigner("28nm_hpc").synthesize(freq_ghz=77.0, pout_dbm=14.5)

# 2. 合成 77 GHz 低雜訊放大器 (LNA)
lna = AutomatedLNADesigner("28nm_hpc").synthesize(freq_ghz=77.0, target_gain_db=15.0)

# 3. 合成 77 GHz 壓控振盪器 (VCO)
vco = AutomatedVCODesigner("28nm_hpc").synthesize(freq_ghz=77.0, target_pn_1mhz_dbc=-105.0)

# 4. 合成 77 GHz 混頻器 (Mixer)
mixer = AutomatedMixerDesigner("28nm_hpc").synthesize(rf_freq_ghz=77.0, lo_freq_ghz=76.5)

# 5. 合成 77 GHz 收發雙工開關 (T/R Switch)
switch = AutomatedSwitchDesigner("28nm_hpc").synthesize(freq_ghz=77.0, target_p1db_dbm=18.0)

# 6. 合成 77 GHz 封裝天線 (AiP Antenna)
antenna = AutomatedAntennaDesigner("aip_organic").synthesize(freq_ghz=77.0)

print(f"PA PAE: {pa.pae_pct}%, LNA NF: {lna.nf_db} dB, Switch IL: {switch.insertion_loss_db} dB, Antenna Gain: {antenna.gain_dbi} dBi")
```

### 4. 執行完整驗證測試
```bash
# 執行單元測試
python -m unittest tests/test_designer.py

# 執行 20 項全系統物理定律與 SPICE 合規性稽核
python tests/verify_all.py

# 執行前端 JavaScript 數學計算驗證
node tests/verify_frontend_math.js
```

---
© AutoRF Integrated Front-End Design Suite. Licensed under MIT.
