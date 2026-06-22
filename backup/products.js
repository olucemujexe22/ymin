const seriesData = {
    "VHT": {
        series: "VHT",
        category: "高分子混合动力铝电解电容器",
        pkg: "贴片型",
        desc: "固液混合技术，ESR≤8mΩ，125℃高温长寿命，AEC-Q200认证",
        featureTags: ["AEC-Q200", "RoHS", "低 ESR", "高纹波", "耐振动", "125℃"],
        specSummary: [
            { label: "电容类别", value: "高分子混合动力铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "16V ~ 100V" },
            { label: "标称容量范围", value: "10µF ~ 470µF" },
            { label: "ESR (mΩ max.)", value: "8 ~ 40" },
            { label: "温度范围", value: "-55 ~ 125℃" },
            { label: "额定寿命", value: "4000h @125℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["汽车电子 (ECU, LED驱动器)", "5G 基站电源", "DC-DC 转换器", "工业电源"],
        relatedArticles: [
            { title: "混合动力电容器在车载ECU中的应用优势", date: "2024-03-15", category: "技术文章" },
            { title: "如何通过低ESR电容提升DC-DC转换器效率", date: "2024-02-28", category: "设计指南" },
            { title: "VHT系列新品发布：满足125℃高温长寿命需求", date: "2024-01-10", category: "产品新闻" }
        ],
        samplePn: "VHTC0771H470MV"
    },
    "VHU": {
        series: "VHU",
        category: "高分子混合动力铝电解电容器",
        pkg: "贴片型",
        desc: "固液混合技术，低漏电流，125℃高温，AEC-Q200认证，适用于车载DCDC系统",
        featureTags: ["AEC-Q200", "RoHS", "低漏电流", "低 ESR", "125℃"],
        specSummary: [
            { label: "电容类别", value: "高分子混合动力铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "16V ~ 63V" },
            { label: "标称容量范围", value: "22µF ~ 330µF" },
            { label: "ESR (mΩ max.)", value: "10 ~ 50" },
            { label: "温度范围", value: "-55 ~ 125℃" },
            { label: "额定寿命", value: "4000h @125℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["车载DCDC转换器", "OBC车载充电机", "BMS电池管理"],
        relatedArticles: [
            { title: "VHU系列低漏电流方案助力车载DCDC系统", date: "2026-04-03", category: "技术文章" }
        ],
        samplePn: "VHUC0771H470MV"
    },
    "LK": {
        series: "LK",
        category: "液态铝电解电容器",
        pkg: "引线型",
        desc: "AEC-Q200认证，极低漏电流（≤20μA），-40℃低温启动，6000h长寿命，对标NCC LBV/LBG",
        featureTags: ["AEC-Q200", "RoHS", "低漏电流", "低温启动", "6000h"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "引线型" },
            { label: "额定电压范围", value: "16V ~ 400V" },
            { label: "标称容量范围", value: "4.7µF ~ 470µF" },
            { label: "温度范围", value: "-40 ~ 105℃" },
            { label: "额定寿命", value: "6000h @105℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["安全气囊ECU备用电源", "安全气囊ECU点火驱动", "工业控制"],
        relatedArticles: [
            { title: "永铭LK系列AEC-Q200车规电容：汽车安全气囊ECU高可靠性解决方案", date: "2026-03-17", category: "技术文章" }
        ],
        samplePn: "OLKC1101C271MF"
    },
    "VKO": {
        series: "VKO",
        category: "液态铝电解电容器",
        pkg: "贴片型",
        desc: "AEC-Q200认证，SMD封装，大容量3300μF，8000h长寿命，适配自动化产线",
        featureTags: ["AEC-Q200", "RoHS", "大容量", "SMD", "8000h"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "6.3V ~ 50V" },
            { label: "标称容量范围", value: "100µF ~ 3300µF" },
            { label: "温度范围", value: "-55 ~ 105℃" },
            { label: "额定寿命", value: "8000h @105℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["安全气囊ECU MCU滤波", "安全气囊ECU通信回路", "ABS/ESC系统"],
        relatedArticles: [
            { title: "VKO系列贴片铝电解电容：安全气囊ECU小型化与长寿命设计", date: "2025-11-05", category: "技术文章" }
        ],
        samplePn: "VKOI2101C332MVTM"
    },
    "LKL(R)": {
        series: "LKL(R)",
        category: "液态铝电解电容器",
        pkg: "引线型",
        desc: "135℃超高温，DC-Link专用，低ESR，长寿命，对标NCC",
        featureTags: ["135℃", "DC-Link", "低 ESR", "长寿命"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "引线型" },
            { label: "额定电压范围", value: "16V ~ 63V" },
            { label: "标称容量范围", value: "470µF ~ 4700µF" },
            { label: "温度范围", value: "-55 ~ 135℃" },
            { label: "额定寿命", value: "2000h ~ 4000h @135℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["EPS转向控制", "one-box/ESC/EBS", "DC-Link"],
        relatedArticles: [
            { title: "135℃超高温电容在EPS系统中的应用", date: "2025-06-12", category: "技术文章" }
        ],
        samplePn: "LKL(R) 25V/4700μF"
    },
    "VKM": {
        series: "VKM",
        category: "液态铝电解电容器",
        pkg: "贴片型",
        desc: "105℃, 9000h, AEC-Q200, SMD高可靠性",
        featureTags: ["AEC-Q200", "RoHS", "SMD", "9000h", "高可靠性"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "6.3V ~ 100V" },
            { label: "标称容量范围", value: "10µF ~ 680µF" },
            { label: "温度范围", value: "-55 ~ 105℃" },
            { label: "额定寿命", value: "9000h @105℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["EPS转向控制", "智能座舱", "车灯", "ADAS"],
        relatedArticles: [
            { title: "VKM系列贴片铝电解电容：破解智能照明低温启动与长寿命难题", date: "2025-10-24", category: "技术文章" }
        ],
        samplePn: "VKMC1001H680MVTM"
    },
    "VPG": {
        series: "VPG",
        category: "液态铝电解电容器",
        pkg: "引线型",
        desc: "高纹波, 大容量, 2000h, 适用于充电桩与工业电源",
        featureTags: ["高纹波", "大容量", "RoHS"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "引线型" },
            { label: "额定电压范围", value: "16V ~ 100V" },
            { label: "标称容量范围", value: "470µF ~ 2200µF" },
            { label: "温度范围", value: "-55 ~ 105℃" },
            { label: "额定寿命", value: "2000h @105℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["充电桩", "工业电源", "电机驱动"],
        relatedArticles: [],
        samplePn: "VPGJ1951H122MVTM"
    },
    "NPX": {
        series: "NPX",
        category: "高分子固态铝电解电容器",
        pkg: "贴片型",
        desc: "超低ESR(≤10mΩ), 小型化, 适用于域控制器与座舱",
        featureTags: ["超低 ESR", "小型化", "RoHS", "高纹波"],
        specSummary: [
            { label: "电容类别", value: "高分子固态铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "2.5V ~ 25V" },
            { label: "标称容量范围", value: "47µF ~ 1000µF" },
            { label: "ESR (mΩ max.)", value: "≤10" },
            { label: "温度范围", value: "-55 ~ 105℃" },
            { label: "额定寿命", value: "2000h @105℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["域控制器", "智能座舱", "车灯", "ADAS"],
        relatedArticles: [],
        samplePn: "NPXC0700J561MJTM"
    },
    "VHE": {
        series: "VHE",
        category: "高分子混合动力铝电解电容器",
        pkg: "引线型",
        desc: "135℃超高温, 4000h, 高分子混合, 专为热管理系统设计",
        featureTags: ["135℃", "高分子混合", "4000h", "耐高温"],
        specSummary: [
            { label: "电容类别", value: "高分子混合动力铝电解电容器" },
            { label: "形状", value: "引线型" },
            { label: "额定电压范围", value: "16V ~ 63V" },
            { label: "标称容量范围", value: "22µF ~ 470µF" },
            { label: "温度范围", value: "-55 ~ 135℃" },
            { label: "额定寿命", value: "4000h @135℃" },
            { label: "AEC-Q200", value: "符合" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["电子水泵/油泵", "空调压缩机", "PTC加热器"],
        relatedArticles: [
            { title: "VHE系列高分子混合铝电解电容：四大核心优势破解热管理系统车规电容挑战", date: "2025-08-18", category: "技术文章" }
        ],
        samplePn: "VHE系列 135℃"
    },
    "CW3H": {
        series: "CW3H",
        category: "液态铝电解电容器",
        pkg: "牛角型",
        desc: "400-500V, 800V平台DC-Link, 大功率OBC/DCDC",
        featureTags: ["高压", "DC-Link", "大功率", "RoHS"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "牛角型" },
            { label: "额定电压范围", value: "400V ~ 500V" },
            { label: "标称容量范围", value: "100µF ~ 1000µF" },
            { label: "温度范围", value: "-40 ~ 105℃" },
            { label: "额定寿命", value: "3000h @105℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["OBC车载充电机DC-Link", "充电桩DC-DC变换"],
        relatedArticles: [
            { title: "永铭CW3H液态牛角电容：为800V平台OBC/DCDC打造高可靠DC-Link方案", date: "2025-10-24", category: "技术文章" }
        ],
        samplePn: "CW3H 800V平台"
    },
    "LKD": {
        series: "LKD",
        category: "液态铝电解电容器",
        pkg: "引线型",
        desc: "400-500V高压OBC专用，长寿命，高可靠性",
        featureTags: ["高压", "OBC", "长寿命", "RoHS"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "引线型" },
            { label: "额定电压范围", value: "400V ~ 500V" },
            { label: "标称容量范围", value: "10µF ~ 100µF" },
            { label: "温度范围", value: "-40 ~ 105℃" },
            { label: "额定寿命", value: "2000h @105℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["OBC车载充电机", "高压DC-DC"],
        relatedArticles: [],
        samplePn: "LKD高压系列"
    },
    "SMD": {
        series: "液态贴片SMD",
        category: "液态铝电解电容器",
        pkg: "贴片型",
        desc: "耐大纹波, 抗振动, 长寿命, 适用于热管理与车身控制",
        featureTags: ["抗振动", "耐大纹波", "长寿命", "RoHS"],
        specSummary: [
            { label: "电容类别", value: "液态铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "6.3V ~ 100V" },
            { label: "标称容量范围", value: "10µF ~ 1000µF" },
            { label: "温度范围", value: "-55 ~ 105℃" },
            { label: "额定寿命", value: "5000h @105℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["电子水泵/油泵", "冷却风扇/鼓风机", "车窗/天窗/座椅"],
        relatedArticles: [],
        samplePn: "液态抗震座板贴片型"
    },
    "VPT": {
        series: "VPT",
        category: "高分子固态铝电解电容器",
        pkg: "贴片型",
        desc: "125℃高温, 低ESR, 适用于BMS与车载电源",
        featureTags: ["125℃", "低 ESR", "RoHS", "SMD"],
        specSummary: [
            { label: "电容类别", value: "高分子固态铝电解电容器" },
            { label: "形状", value: "贴片型" },
            { label: "额定电压范围", value: "2.5V ~ 16V" },
            { label: "标称容量范围", value: "100µF ~ 1500µF" },
            { label: "温度范围", value: "-55 ~ 125℃" },
            { label: "额定寿命", value: "2000h @125℃" },
            { label: "RoHS指令", value: "符合" }
        ],
        applications: ["BMS电池管理", "智能座舱", "车载电源"],
        relatedArticles: [],
        samplePn: "VPTC0581C151MVTM"
    }
};
