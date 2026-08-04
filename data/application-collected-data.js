(function (global) {
    'use strict';
    global.YMIN = global.YMIN || {};
    var data = {
    "source":  "应用中心数据采集表6.11.xlsx",
    "overview":  {
                     "汽车电子":  {
                                  "description":  "电驱/电控/电源、安全部件、热管理、智能座舱、智能驾驶、车灯、充电桩 —— AEC-Q200合规，耐高温125℃、135℃、150℃，耐振动。",
                                  "tags":  "AEC-Q200 / 135℃耐高温 / 极低漏电流",
                                  "recommended":  "8个应用子领域 · 10+产品系列"
                              },
                     "AI服务器":  {
                                   "description":  "GPU 加速卡、CPU 供电、PDN 总线架构的大电流、超低 ESR 电容方案，支持 400V/800V DC-Link。",
                                   "tags":  "大电流 / 超低ESR / 小型化",
                                   "recommended":  "VHT · NPX · CW3H系列"
                               },
                     "仪器仪表":  {
                                  "description":  "精密测量仪器、工业自动化仪表、医疗检测设备等对精度和稳定性要求极高的电容方案。",
                                  "tags":  "高精度 / 低漏电流 / 长寿命",
                                  "recommended":  "VKM · VPT · LK系列"
                              },
                     "新型电机驱动":  {
                                    "description":  "变频器、伺服驱动器、步进电机驱动等工业电机控制系统的 DC-Link 与滤波电容方案。",
                                    "tags":  "DC-Link / 滤波 / 高纹波",
                                    "recommended":  "VPG · VPX · CW3H系列"
                                },
                     "储能":  {
                                "description":  "光伏逆变器、储能系统、充电桩等高压大容量电容方案，支持高纹波电流与长寿命需求。",
                                "tags":  "高压大容量 / 高纹波 / 长寿命",
                                "recommended":  "CW3H · VPG系列"
                            },
                     "消费类电子":  {
                                   "description":  "笔记本电脑、智能家居、PD快充、LED照明等消费电子产品的薄型化小型化电容方案。",
                                   "tags":  "薄型化 / 小型化 / 低ESR",
                                   "recommended":  "NPX · VKM · VPT系列"
                               },
                     "电源":  {
                                "description":  "大功率电源100W及以上（PC、医疗、激光、高压、户外）",
                                "tags":  "长寿命/耐压足/低ESR",
                                "recommended":  "LKF.LKM.LKD"
                            }
                 },
    "pages":  {
                  "automotive":  {
                                     "sheet":  "汽车电子",
                                     "icon":  "directions_car",
                                     "hero":  {
                                                  "title":  "汽车电子应用指南",
                                                  "description":  "电驱/电控/电源、安全部件、热管理、智能座舱、智能驾驶、车灯、充电桩 —— AEC-Q200合规，耐高温125℃、135℃、150℃，耐振动。",
                                                  "tags":  [
                                                               "AEC-Q200",
                                                               "135℃耐高温",
                                                               "极低漏电流"
                                                           ]
                                              },
                                     "tabs":  [
                                                  {
                                                      "key":  "t0",
                                                      "name":  "电机驱动",
                                                      "icon":  "settings",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "电机控制器-MCU",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-01.png",
                                                                                                     "alt":  "电机控制器-MCU电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "应用要求：电机控制需要快速响应，长期工作稳定；环境要求集成化，耐高温；\n电容作用：DCDC/升压滤波平滑\n永铭产品优势：\n超低ESR：保证滤波效果，确保电源纯净，整机工作更稳定；降低自身发热，提升整机能效；\n高容量密度密度设计：满足整机集成化；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V121MVKZ",
                                                                                                                "voltage":  "35V",
                                                                                                                "cap":  "120",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V151MVCG",
                                                                                                                "voltage":  "35V",
                                                                                                                "cap":  "150",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V221MVCG",
                                                                                                                "voltage":  "35V",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581V470MVCG",
                                                                                                                "voltage":  "35V",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "60",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581E560MVCG",
                                                                                                                "voltage":  "25V",
                                                                                                                "cap":  "56",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "50",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTB0581C470MVCG",
                                                                                                                "voltage":  "16",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "5*5.8",
                                                                                                                "esr":  "80",
                                                                                                                "ripple":  "550",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051E271MVKZ",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "270",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051H121MVKZ",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "120",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "25",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771H330MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "33",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771H470MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVKZ",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V151MVKZ",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "150",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771A150MVCG",
                                                                                                                "voltage":  "100",
                                                                                                                "cap":  "15",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "80",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "OBC（车载充电机）",
                                                                          "icon":  "power",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-02.png",
                                                                                                     "alt":  "OBC（车载充电机）电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "power",
                                                                                              "desc":  "应用要求：可抵御电路瞬时浪涌冲击，耐纹波电流大，更好平滑电压波动\n电容作用：平滑滤波\n永铭产品优势：\n高耐压设计：可抵御电路瞬时浪涌冲击；\n高容量密度密度设计：满足滤波效果的同时，本体小型化",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "CW3H",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "CW3H2W331MNNYS07S2",
                                                                                                                "voltage":  "450",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 3000H",
                                                                                                                "size":  "25*50",
                                                                                                                "esr":  "390",
                                                                                                                "ripple":  "1940",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "CW3H",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "CW3H2W561MNNXS07S2",
                                                                                                                "voltage":  "450",
                                                                                                                "cap":  "560",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 3000H",
                                                                                                                "size":  "30*50",
                                                                                                                "esr":  "450",
                                                                                                                "ripple":  "2100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "CW3H",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "CW3H2W251MNNYS04S2",
                                                                                                                "voltage":  "450",
                                                                                                                "cap":  "250",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 3000H",
                                                                                                                "size":  "25*35",
                                                                                                                "esr":  "340",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "直流转直流-DCDC",
                                                                          "icon":  "power",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-03.png",
                                                                                                     "alt":  "直流转直流-DCDC电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "power",
                                                                                              "desc":  "应用要求：保证各负载端电压稳定，同时整机功耗要满足整车要求\n电容作用：输出平滑\n永铭产品优势：\n超低漏电：多个并联使用，可以满足整机超低功耗要求；\n高容量密度密度设计：满足滤波效果的同时，本体小型化",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHU",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHUE1051V271MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "270",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "135℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2000",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "高压分线盒-PDU",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "应用要求：低功耗；抗电磁干扰(EMC)；紧凑化与集成；\n电容作用：EMC滤波\n永铭产品优势：\n纹波能力：够耐受大纹波电流且保证优秀的滤波效果，提升抗电磁干扰能力(EMC)；\n高容量密度设计：电容大容量小型化设计，节省PCB空间,适配PDU模块化集成需求(如三合一/五合一方案)；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "整车控制-VCU",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-04.png",
                                                                                                     "alt":  "整车控制-VCU电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "应用要求：保证各负载端电压稳定，同时整机功耗要满足整车要求\n电容作用：输出平滑\n永铭产品优势：\n超低漏电：多个并联使用，可以满足整机超低功耗要求；\n高容量密度密度设计：满足滤波效果的同时，本体小型化",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VKL(T)",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VKL(T)E1001V221MVTMCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 3000H",
                                                                                                                "size":  "10*10",
                                                                                                                "esr":  "300",
                                                                                                                "ripple":  "550",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "电池管理系统-BMS",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-05.png",
                                                                                                     "alt":  "电池管理系统-BMS电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗EMC能力强\n电容作用：滤波\n永铭产品优势：\n高容量密度：小型化，节省空间，降低安装成本",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581V470MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "60",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MC0771V101MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3ME1001V471MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "10*10",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MC0771H101MVTMSLYPCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t1",
                                                      "name":  "安全部件",
                                                      "icon":  "shield",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "One-Box /EMB/IEB",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-06.png",
                                                                                                     "alt":  "One-Box /EMB/IEB电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗浪涌冲击\n电容作用：滤波，直流支撑\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771E181MVKZ",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "180",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1701E102MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "1000",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×17",
                                                                                                                "esr":  "12",
                                                                                                                "ripple":  "4100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V271MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "270",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVKZ",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E561MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "560",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVKZ",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  "抗震品"
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051K101MVCG",
                                                                                                                "voltage":  "80",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1200",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "电子助力转向-EPS",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-07.png",
                                                                                                     "alt":  "电子助力转向-EPS电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗浪涌冲击，抗震动\n电容作用：滤波，直流支撑\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳\n优化结构，提供抗震座板满足产品30G抗震需求。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHME1051E561MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "560",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8×10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V391MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "390",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V471MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "车身稳定系统-ESC（ESP）/ABS",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗震动\n电容作用：滤波，\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳\n优化结构，提供抗震座板满足产品30G抗震需求。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHME1701E102MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "1000",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×17",
                                                                                                                "esr":  "12",
                                                                                                                "ripple":  "4100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHMC0581V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "60",
                                                                                                                "ripple":  "1200",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "底盘悬架",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗震动\n电容作用：滤波，\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳\n优化结构，提供抗震座板满足产品30G抗震需求。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3CM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MCE1001V681MVTMSLYPCGe",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "680",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 3000H",
                                                                                                                "size":  "10*10",
                                                                                                                "esr":  "150",
                                                                                                                "ripple":  "1200",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VKL(T)",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VKL(T)D1001V221MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 3000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "安全气囊",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "应用要求：快速响应，能量充足，高容量密度\n电容作用：储能\n永铭产品优势：\n-40℃下 ESR≤100mΩ(不超过常温3-4倍，业内10-20倍)；\n具备高可靠性和快速释放电能力，以满足长期储能和瞬时（3-10MS）大电流释放的需求；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "LK",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "OLKI2001E442MF",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "4400",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "16*20",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "LK",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "OLKJ2501V332MF",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "3300",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "18*25",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V271MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "270",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "CPM",
                                                                          "icon":  "shield",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "shield",
                                                                                              "desc":  "",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "SDH",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "SDH2R7L2561625",
                                                                                                                "voltage":  "2.7",
                                                                                                                "cap":  "25",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "16*25",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t2",
                                                      "name":  "热管理部件",
                                                      "icon":  "directions_car",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "电子水泵/油泵",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-08.png",
                                                                                                     "alt":  "电子水泵/油泵电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗震动\n电容作用：滤波，直流支撑\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳\n优化结构，提供抗震座板满足产品30G抗震需求。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E331MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHU",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHUE1051E331MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "135℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2000",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHR",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHRE1051E471MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "150℃ 2000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "25",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1301V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTL1351H331MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "12.5×13.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "3500",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHU",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHUE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "135℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2000",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "空调压缩机控制器",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-09.png",
                                                                                                     "alt":  "空调压缩机控制器电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：长期稳定可靠\n电容作用：滤波\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "空调压缩-功率板",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [

                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "冷却风扇控制器",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-10.png",
                                                                                                     "alt":  "冷却风扇控制器电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：长期稳定可靠，抗震动\n电容作用：滤波，直流支撑\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳\n优化结构，提供抗震座板满足产品30G抗震需求。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHME1251V561MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "560",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*12.5",
                                                                                                                "esr":  "16",
                                                                                                                "ripple":  "3200",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "电子水阀",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTB0581E560MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "56",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "5×5.8",
                                                                                                                "esr":  "80",
                                                                                                                "ripple":  "550",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTB0581V220MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "22",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "5×5.8",
                                                                                                                "esr":  "100",
                                                                                                                "ripple":  "550",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "PTC加热器",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：可抵御电路瞬时浪涌冲击，耐纹波电流大，更好平滑电压波动\n电容作用：平滑滤波\n永铭产品优势：\n高耐压设计：可抵御电路瞬时浪涌冲击；\n高容量密度密度设计：满足滤波效果的同时，本体小型化，可提供全系贴片产品",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "LK",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "OLKJ3152W101MF",
                                                                                                                "voltage":  "450",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "18*31.5",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VMM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VMML1352W150MVTMSLYPCG",
                                                                                                                "voltage":  "450",
                                                                                                                "cap":  "15",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "12.5*13.5",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E331MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "鼓风机",
                                                                          "icon":  "settings",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-11.png",
                                                                                                     "alt":  "鼓风机电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "settings",
                                                                                              "desc":  "用要求：长期稳定可靠，小型化；\n电容作用：滤波，直流支撑\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E331MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHU",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHUE1051E471MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "135℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2000",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t3",
                                                      "name":  "新能源车车灯",
                                                      "icon":  "lightbulb",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "新能源车车灯",
                                                                          "icon":  "lightbulb",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-12.png",
                                                                                                     "alt":  "新能源车车灯电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "lightbulb",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581V470MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "60",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "60",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771H330MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "33",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771H470MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051H680MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1250",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581J220MVCG",
                                                                                                                "voltage":  "63",
                                                                                                                "cap":  "22",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "120",
                                                                                                                "ripple":  "700",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051K680MVCG",
                                                                                                                "voltage":  "80",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1200",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t4",
                                                      "name":  "智能驾驶",
                                                      "icon":  "directions_car",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "底盘域控制器",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-13.png",
                                                                                                     "alt":  "底盘域控制器电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化，保障算力中心\n电容作用：滤波，储能\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳，算力更平稳。",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V221MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E471MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051E331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "雷达/摄像头",
                                                                          "icon":  "sensors",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-14.png",
                                                                                                     "alt":  "雷达/摄像头电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "sensors",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V470MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V221MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1301H221MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*13",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M(T)",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3M(T)C0581V101MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MC0771E221MVTMSLYPCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*7.7",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "车机（算力模块）",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：消耗功率增大，大电流化 ，低电压化 ，低线路阻抗化\n电容作用：滤波\n永铭产品优势：\n超低ESR,满足整机大电流纹波；\n125度耐温，满足整机高温长寿需求",
                                                                                              "specs":  [

                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "叠层",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [

                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "自动换挡器",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：低线路阻抗化，快速响应，耐高温\n电容作用：滤波\n永铭产品优势：\n超低ESR,线路纯净，快速响应\n125度耐温，满足整机高温长寿需求",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051V391MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "390",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2800",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "加速器控制",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1051H101MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10*10.5",
                                                                                                                "esr":  "25",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t5",
                                                      "name":  "智能座舱",
                                                      "icon":  "directions_car",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "组合仪表、车载屏、导航",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771C151MVCG",
                                                                                                                "voltage":  "16",
                                                                                                                "cap":  "150",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1450",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "50",
                                                                                                                "ripple":  "900",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V221MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3ME1651E102MVTMSLYPCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "1000",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "10*16.5",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VKL(T)",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VKL(T)L1351V471MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "12.512.5",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "抬头显示HUD",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHX",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHXC0581E221MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 2000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "50",
                                                                                                                "ripple":  "1300",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VGY",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VGYE1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 10000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "2500",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581H220MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "22",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "80",
                                                                                                                "ripple":  "750",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VGY",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VGYC0771H470MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 10000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "座椅控制",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHX",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHXC0771A471MVCG",
                                                                                                                "voltage":  "10",
                                                                                                                "cap":  "470",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 2000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "45",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0581C820MVCG",
                                                                                                                "voltage":  "16",
                                                                                                                "cap":  "82",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "45",
                                                                                                                "ripple":  "950",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MC0581C221MVTMSLYPCG",
                                                                                                                "voltage":  "16",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*5.8",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "V3M",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "V3MC0541E101MVTMSLYPCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "6.3*5.4",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "音响、功放",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：音质纯净无电磁干扰；紧凑化与集成；长寿命与耐久性\n电容作用：滤波\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能；\n低ESR提供更大耐纹波电流，让电压更平稳,确认音质纯净",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VKM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VKMI2101V222MVTMSLYPCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "2200",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "LKF",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "LKFI2501E332MF",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "3300",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "",
                                                                                                                "size":  "",
                                                                                                                "esr":  "",
                                                                                                                "ripple":  "",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "车门、窗控制器",
                                                                          "icon":  "memory",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "memory",
                                                                                              "desc":  "应用要求：长期稳定可靠，小型化；\n电容作用：滤波\n永铭产品优势：\n高容量密度赋予产品小型化，节省空间；\n低ESR提供更大耐纹波电流，让电压更平稳；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "NHX",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "NHXC0701E221MJCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 2000H",
                                                                                                                "size":  "6.3×7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "2000",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V680MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "68",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771H470MVCG",
                                                                                                                "voltage":  "50",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "40",
                                                                                                                "ripple":  "1100",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTE1052A470MVCG",
                                                                                                                "voltage":  "100",
                                                                                                                "cap":  "47",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1200",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      },
                                                                      {
                                                                          "name":  "USB/WPT",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [
                                                                                                 {
                                                                                                     "src":  "assets/application-collected/automotive-15.png",
                                                                                                     "alt":  "USB/WPT电路拓扑图"
                                                                                                 }
                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：紧凑化与集成，长寿命与耐久性，低温可靠；\n电容作用：滤波，\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能与耐久；\n双电解质赋予电容更好的低温性能，满足整机-55℃低温依旧稳定；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTC0771V101MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×7.7",
                                                                                                                "esr":  "35",
                                                                                                                "ripple":  "1400",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTD1051V221MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "8*10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "1600",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  },
                                                  {
                                                      "key":  "t6",
                                                      "name":  "其他",
                                                      "icon":  "directions_car",
                                                      "subApps":  [
                                                                      {
                                                                          "name":  "T-BOX",
                                                                          "icon":  "directions_car",
                                                                          "topologyImages":  [

                                                                                             ],
                                                                          "modules":  [
                                                                                          {
                                                                                              "name":  "关键电容应用位置",
                                                                                              "icon":  "directions_car",
                                                                                              "desc":  "应用要求：紧凑化与集成，长寿命与耐久性，低温可靠；\n电容作用：滤波，\n永铭产品优势：\n高容量密度同尺寸给予给大的容量，提升整机性能与耐久；\n双电解质赋予电容更好的低温性能，满足整机-55℃低温依旧稳定；",
                                                                                              "specs":  [
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHMC0581E101MVCG",
                                                                                                                "voltage":  "25",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "6.3×5.8",
                                                                                                                "esr":  "50",
                                                                                                                "ripple":  "1300",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHX",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHXD1051V331MVCG",
                                                                                                                "voltage":  "35",
                                                                                                                "cap":  "330",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "105℃ 2000H",
                                                                                                                "size":  "8×10.5",
                                                                                                                "esr":  "27",
                                                                                                                "ripple":  "2300",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHM",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHME1051J101MVCG",
                                                                                                                "voltage":  "63",
                                                                                                                "cap":  "100",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "10×10.5",
                                                                                                                "esr":  "30",
                                                                                                                "ripple":  "2200",
                                                                                                                "note":  ""
                                                                                                            },
                                                                                                            {
                                                                                                                "series":  "VHT",
                                                                                                                "spec":  "",
                                                                                                                "pn":  "VHTL1651K221MVCG",
                                                                                                                "voltage":  "80",
                                                                                                                "cap":  "220",
                                                                                                                "temperature":  "",
                                                                                                                "life":  "125℃ 4000H",
                                                                                                                "size":  "12.5×16.5",
                                                                                                                "esr":  "20",
                                                                                                                "ripple":  "3900",
                                                                                                                "note":  ""
                                                                                                            }
                                                                                                        ]
                                                                                          }
                                                                                      ]
                                                                      }
                                                                  ]
                                                  }
                                              ]
                                 },
                  "ai-server":  {
                                    "sheet":  "AI服务器与数据中心",
                                    "icon":  "memory",
                                    "hero":  {
                                                 "title":  "AI服务器与数据中心应用指南",
                                                 "description":  "GPU 加速卡、CPU 供电、PDN 总线架构的大电流、超低 ESR 电容方案，支持 400V/800V DC-Link。",
                                                 "tags":  [
                                                              "大电流",
                                                              "超低ESR",
                                                              "小型化"
                                                          ]
                                             },
                                    "tabs":  [
                                                 {
                                                     "key":  "t0",
                                                     "name":  "AI服务器主板\u0026显卡",
                                                     "icon":  "memory",
                                                     "subApps":  [
                                                                     {
                                                                         "name":  "CPU/GPU",
                                                                         "icon":  "memory",
                                                                         "topologyImages":  [

                                                                                            ],
                                                                         "modules":  [
                                                                                         {
                                                                                             "name":  "VRM 输入端",
                                                                                             "icon":  "power",
                                                                                             "desc":  "VRM 输入端位于主板供电接口与板载VRM降压电路之间，为整个主板供电系统提供输入稳压、低频滤波与储能，抑制机架供电的电压波动与尖峰，保障后级电路稳定工作。\n\nVRM 输出端位于多相Buck降压输出、CPU/AI芯片供电引脚周边，与MLCC陶瓷电容搭配形成全频段滤波网络，为芯片提供瞬态大电流支撑，抑制高频纹波，保障芯片核心供电稳定。\n\n对电容的要求：超低ESR、高能量密度、高频特性优异、高稳定性、高温度可靠性、小型化及高密度贴装\n\n电容核心作用：滤波、储能、抗电压尖峰、稳压缓冲\n\n永铭叠层固态产品优势：\n1，超低ESR，ESR一致性高，有助于整机低功耗和高能效。MPS系列ESR  最大仅3mΩ Max;\n2，高能量密度；①D壳尺寸下容值可达820μF 2V。②确保有限的空间内提供足 够的电荷储备；\n3，高温度可靠性；①-55℃~+105℃容量变化不超过5% ②长期工作后容量变化不 超过-10%确保服务器在7×24小时高负荷、高温环境下稳定运 行，降低故障率和维护需求，适 应数据中心严苛环境；高温可靠性强，长期工作后容量变化不 超过-10%确保服务器在7×24小时高负荷、高温环境下稳定运  行，降低故障率和维护需求，适应数据中心严苛环境；\n4，高频特性优异；①适应100~300KHz高频率②保证服务器在不同温度情况下 高频滤波性能保持一致，系统设\n计更可靠；",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-16V-100μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD101M1CD28040R",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-25V-68μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD680M1ED19040R",
                                                                                                               "voltage":  "25",
                                                                                                               "cap":  "68",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-16V-150μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD151M1CD28040R",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "150",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-25V-120μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD121M1ED28040R",
                                                                                                               "voltage":  "25",
                                                                                                               "cap":  "120",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-35V-47μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD470M1VD28040R",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         },
                                                                                         {
                                                                                             "name":  "VRM 输出端",
                                                                                             "icon":  "power",
                                                                                             "desc":  "VRM 输入端位于主板供电接口与板载VRM降压电路之间，为整个主板供电系统提供输入稳压、低频滤波与储能，抑制机架供电的电压波动与尖峰，保障后级电路稳定工作。\n\nVRM 输出端位于多相Buck降压输出、CPU/AI芯片供电引脚周边，与MLCC陶瓷电容搭配形成全频段滤波网络，为芯片提供瞬态大电流支撑，抑制高频纹波，保障芯片核心供电稳定。\n\n对电容的要求：超低ESR、高能量密度、高频特性优异、高稳定性、高温度可靠性、小型化及高密度贴装\n\n电容核心作用：滤波、储能、抗电压尖峰、稳压缓冲\n\n永铭叠层固态产品优势：\n1，超低ESR，ESR一致性高，有助于整机低功耗和高能效。MPS系列ESR  最大仅3mΩ Max;\n2，高能量密度；①D壳尺寸下容值可达820μF 2V。②确保有限的空间内提供足 够的电荷储备；\n3，高温度可靠性；①-55℃~+105℃容量变化不超过5% ②长期工作后容量变化不 超过-10%确保服务器在7×24小时高负荷、高温环境下稳定运 行，降低故障率和维护需求，适 应数据中心严苛环境；高温可靠性强，长期工作后容量变化不 超过-10%确保服务器在7×24小时高负荷、高温环境下稳定运  行，降低故障率和维护需求，适应数据中心严苛环境；\n4，高频特性优异；①适应100~300KHz高频率②保证服务器在不同温度情况下 高频滤波性能保持一致，系统设\n计更可靠；",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "MPS",
                                                                                                               "spec":  "MPS-2.5V-470μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPS471M0ED19003R",
                                                                                                               "voltage":  "2.5",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "3",
                                                                                                               "ripple":  "10200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPX",
                                                                                                               "spec":  "MPX-2V-470μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPX471M0DD19006RC",
                                                                                                               "voltage":  "2",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 3000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "6",
                                                                                                               "ripple":  "7200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPX",
                                                                                                               "spec":  "MPX-2.5V-470μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPX471M0ED194R5RC",
                                                                                                               "voltage":  "2.5",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 3000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "4.5",
                                                                                                               "ripple":  "8500",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPX",
                                                                                                               "spec":  "MPX-2.5V-220μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPX221M0ED19009RC",
                                                                                                               "voltage":  "2.5",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 3000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "9",
                                                                                                               "ripple":  "6300",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-4V-150μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD151M0JD19018R",
                                                                                                               "voltage":  "4",
                                                                                                               "cap":  "150",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "18",
                                                                                                               "ripple":  "4600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-4V-330μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD331M0JD19009R",
                                                                                                               "voltage":  "4",
                                                                                                               "cap":  "330",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "9",
                                                                                                               "ripple":  "6300",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-6.3V-220μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD221M0LD19015R",
                                                                                                               "voltage":  "6.3",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-6.3V-330μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD331M0LD28015R",
                                                                                                               "voltage":  "6.3",
                                                                                                               "cap":  "330",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-2V-820μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD821M0DD28006R",
                                                                                                               "voltage":  "2",
                                                                                                               "cap":  "820",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "6",
                                                                                                               "ripple":  "7200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-4V-470μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD471M0JD28015R",
                                                                                                               "voltage":  "4",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD28-6.3V-470μF 7.3*4.3*2.8",
                                                                                                               "pn":  "MPD471M0LD28015R",
                                                                                                               "voltage":  "6.3",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*2.8",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         }
                                                                                     ]
                                                                     },
                                                                     {
                                                                         "name":  "DC-DC转换器",
                                                                         "icon":  "power",
                                                                         "topologyImages":  [

                                                                                            ],
                                                                         "modules":  [
                                                                                         {
                                                                                             "name":  "主板辅助供电DC-DC转换器",
                                                                                             "icon":  "power",
                                                                                             "desc":  "位于主板12V母线输入与芯片组、网卡、PCIe插槽、BIOS芯片等外设供电端之间，采用同步Buck DC-DC拓扑，将12V电压转换为5V/3.3V辅助供电，为主板各类外设提供稳定的低压电源。\n\n对电容的要求：超低ESR、高容许纹波电流；小型化、高容量密度；高可靠\u0026宽温长寿命；\n\n电容核心作用：电压转换、辅助供电、稳压滤波、抗干扰\n\n永铭固态铝电解产品优势：\n1，超低ESR ( 超高容许纹波电流)；采用高电导率电解质和优化的电极结构，实 现超低ESR特性。其具备优异的高频响应和 抗纹波能力，可显著减少能量损耗和温升， 保障设备高温工况下的稳定运行；\n2，小型化/高容量密度；以创新材料与结构设计突破产品体积极限， 在同等容值条件下实现行业领先的小型化封 装，助力实现PCB 的高密度布局，释放宝贵 空间；\n3，高可靠性\u0026宽温长寿命；-55℃~+105℃宽温性能稳定，容量变化不 超过5%,确保服务器在7x24小时高负荷；  高温环境下稳定运行，容量衰减极低，降低 故障率和维护需求，适应数据中心严苛环境；",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-25V-33μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD330M1ED19040R",
                                                                                                               "voltage":  "25",
                                                                                                               "cap":  "33",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "3200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "MPD",
                                                                                                               "spec":  "MPD19-6.3V-220μF 7.3*4.3*1.9",
                                                                                                               "pn":  "MPD221M0LD19015R",
                                                                                                               "voltage":  "6.3",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQD",
                                                                                                               "spec":  "TQD19-16V-150μF 7.3*4.3*1.9",
                                                                                                               "pn":  "TQD151M1CD19100RN",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "150",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQD",
                                                                                                               "spec":  "TQD19-25V-100μF 7.3*4.3*1.9",
                                                                                                               "pn":  "TQD101M1ED19100RN",
                                                                                                               "voltage":  "25",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPC",
                                                                                                               "spec":  "NPC-6.3V-560μF  6.3*9",
                                                                                                               "pn":  "NPCC0900J561MJTM",
                                                                                                               "voltage":  "6.3",
                                                                                                               "cap":  "560",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "6.3*9",
                                                                                                               "esr":  "12",
                                                                                                               "ripple":  "5250",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPC",
                                                                                                               "spec":  "NPC-16V-100μF  6.3*5.7",
                                                                                                               "pn":  "NPCC0571C101MJTM",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "6.3*5.7",
                                                                                                               "esr":  "20",
                                                                                                               "ripple":  "2700",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPC",
                                                                                                               "spec":  "NPC-16V-270μF  8*9",
                                                                                                               "pn":  "NPCD0901C271MJTM",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "270",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "8*9",
                                                                                                               "esr":  "10",
                                                                                                               "ripple":  "5000",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "VPC",
                                                                                                               "spec":  "VPC-16V-100μF  6.3*5.8",
                                                                                                               "pn":  "VPCC0581C101MVTM",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "6.3*5.8",
                                                                                                               "esr":  "20",
                                                                                                               "ripple":  "2700",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "VPC",
                                                                                                               "spec":  "VPC-16V-270μF  8*10",
                                                                                                               "pn":  "VPCD1001C271MVTM",
                                                                                                               "voltage":  "16",
                                                                                                               "cap":  "270",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "8*10",
                                                                                                               "esr":  "10",
                                                                                                               "ripple":  "5000",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         }
                                                                                     ]
                                                                     }
                                                                 ]
                                                 },
                                                 {
                                                     "key":  "t1",
                                                     "name":  "AI服务器电源",
                                                     "icon":  "power",
                                                     "subApps":  [
                                                                     {
                                                                         "name":  "主供电源（PSU）",
                                                                         "icon":  "power",
                                                                         "topologyImages":  [
                                                                                                {
                                                                                                    "src":  "assets/application-collected/ai-server-01.png",
                                                                                                    "alt":  "主供电源（PSU）电路拓扑图"
                                                                                                }
                                                                                            ],
                                                                         "modules":  [
                                                                                         {
                                                                                             "name":  "关键电容应用位置",
                                                                                             "icon":  "power",
                                                                                             "desc":  "高压 PFC 级输出端（又称 DC-Link 端）：位于PSU电源PFC电路输出、LLC变换器输入前级，是电源高压侧的核心储能滤波节点，稳定PFC输出电压，滤除整流后的低频纹波，为后级LLC变换提供稳定的高压输入。\n\nLLC 变换器输出端（又称同步整流输出端）位于LLC变换器同步整流输出、12V/48V母线输出前级，是电源低压侧的滤波储能节点，滤除LLC开关产生的高频纹波，稳定输出电压，为后级主板、显卡提供纯净的供电。\n\n对电容的要求：高容量密度(小型化、大容量);更高的耐压与可靠性；极高的纹波电流承受能力；更低的等效串联电阻(ESR);\n\n电容核心作用：高压侧储能滤波、稳定母线电压、抑制低频纹波；低压侧高频滤波、输出稳压、抑制开关纹波\n\n永铭液态铝电解优势：\n1，超高容量与能量密度；单颗即可提供极大的电容量，能作为高效 的“能量水库”,满足AI加速卡(如GPU)  瞬 间极高功耗需求的缓冲，防止电压跌落。\n2，耐大纹波电流承受能力；AI服务器电源工作时电流脉动巨大。该产品 能承受极高的纹波电流而不过热，保证了 在极端负载下的稳定性和长寿命。\n3，高耐压与可靠性；额定电压高(如500V以上),能稳定工作 在PFC级的高压直流母线中，为整个电源系 统提供可靠的基础。\n4，低ESR；低ESR  ( 等效串联电阻)特性使其能快速响 应AI芯片负载的剧烈变化，迅速释放或吸收 巨大电流，确保输出电压稳定。\n\n永铭固态/固液混合铝电解优势：\n1、足够的耐压余量，确保整机电源长期稳定可靠;\n2、超低ESR产品，优秀的滤波效果，确保整机低EMC和强大的抗干扰能力，保证运算稳定可靠;\n3、超小体积:利于PCB布局优化和整机的进一步小型化升级。\n4、耐超大电流冲击:单体电容可耐受20A以上的超大冲击电流，帮助服务器电源从容应对过载问题，不会因为过载导致产生蓝屏、重启或显卡花屏等问题。",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "IDC3",
                                                                                                               "spec":  "IDC3-450V-1400μF 30*70",
                                                                                                               "pn":  "IDC32W142MNNXG01S2",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "1400",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 3000H",
                                                                                                               "size":  "30*70",
                                                                                                               "esr":  "215",
                                                                                                               "ripple":  "2750",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "IDC3",
                                                                                                               "spec":  "IDC3-500V-1500μF 30*85",
                                                                                                               "pn":  "IDC32H152MNNXG04S2",
                                                                                                               "voltage":  "500",
                                                                                                               "cap":  "1500",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 3000H",
                                                                                                               "size":  "30*85",
                                                                                                               "esr":  "175",
                                                                                                               "ripple":  "3520",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF-475V-220μF 18*60",
                                                                                                               "pn":  "LKFJ6002a221FF",
                                                                                                               "voltage":  "475",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  10000H",
                                                                                                               "size":  "18*60",
                                                                                                               "esr":  "300",
                                                                                                               "ripple":  "2650",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF-500V-180μF 16*50",
                                                                                                               "pn":  "LKFI5002H181MF",
                                                                                                               "voltage":  "500",
                                                                                                               "cap":  "180",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "16*50",
                                                                                                               "esr":  "420",
                                                                                                               "ripple":  "2250",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-33μF 12.5*25",
                                                                                                               "pn":  "LKGL2502W330MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "33",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "12.5*25",
                                                                                                               "esr":  "4250",
                                                                                                               "ripple":  "600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-47μF 14.5*20",
                                                                                                               "pn":  "LKGU2002W470MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "14.5*20",
                                                                                                               "esr":  "4200",
                                                                                                               "ripple":  "810",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-68μF 14.5*27",
                                                                                                               "pn":  "LKGU2702W680MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "68",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "14.5*27",
                                                                                                               "esr":  "2000",
                                                                                                               "ripple":  "900",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         },
                                                                                         {
                                                                                             "name":  "LLC 变换器输出端（又称同步整流输出端）",
                                                                                             "icon":  "power",
                                                                                             "desc":  "高压 PFC 级输出端（又称 DC-Link 端）：位于PSU电源PFC电路输出、LLC变换器输入前级，是电源高压侧的核心储能滤波节点，稳定PFC输出电压，滤除整流后的低频纹波，为后级LLC变换提供稳定的高压输入。\n\nLLC 变换器输出端（又称同步整流输出端）位于LLC变换器同步整流输出、12V/48V母线输出前级，是电源低压侧的滤波储能节点，滤除LLC开关产生的高频纹波，稳定输出电压，为后级主板、显卡提供纯净的供电。\n\n对电容的要求：高容量密度(小型化、大容量);更高的耐压与可靠性；极高的纹波电流承受能力；更低的等效串联电阻(ESR);\n\n电容核心作用：高压侧储能滤波、稳定母线电压、抑制低频纹波；低压侧高频滤波、输出稳压、抑制开关纹波\n\n永铭液态铝电解优势：\n1，超高容量与能量密度；单颗即可提供极大的电容量，能作为高效 的“能量水库”,满足AI加速卡(如GPU)  瞬 间极高功耗需求的缓冲，防止电压跌落。\n2，耐大纹波电流承受能力；AI服务器电源工作时电流脉动巨大。该产品 能承受极高的纹波电流而不过热，保证了 在极端负载下的稳定性和长寿命。\n3，高耐压与可靠性；额定电压高(如500V以上),能稳定工作 在PFC级的高压直流母线中，为整个电源系 统提供可靠的基础。\n4，低ESR；低ESR  ( 等效串联电阻)特性使其能快速响 应AI芯片负载的剧烈变化，迅速释放或吸收 巨大电流，确保输出电压稳定。\n\n永铭固态/固液混合铝电解优势：\n1、足够的耐压余量，确保整机电源长期稳定可靠;\n2、超低ESR产品，优秀的滤波效果，确保整机低EMC和强大的抗干扰能力，保证运算稳定可靠;\n3、超小体积:利于PCB布局优化和整机的进一步小型化升级。\n4、耐超大电流冲击:单体电容可耐受20A以上的超大冲击电流，帮助服务器电源从容应对过载问题，不会因为过载导致产生蓝屏、重启或显卡花屏等问题。",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "NHX",
                                                                                                               "spec":  "NHX_63V_270μF_10*16",
                                                                                                               "pn":  "NHXE1601J271MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "270",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "10*16",
                                                                                                               "esr":  "20",
                                                                                                               "ripple":  "3000",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHX",
                                                                                                               "spec":  "NHX-63V-470μF 10*21",
                                                                                                               "pn":  "NHXE2101J471MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "10*21",
                                                                                                               "esr":  "18",
                                                                                                               "ripple":  "3400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHX",
                                                                                                               "spec":  "NHX-63V-560μF 10*30",
                                                                                                               "pn":  "NHXE3001J561MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "560",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "10*30",
                                                                                                               "esr":  "16",
                                                                                                               "ripple":  "4100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHX",
                                                                                                               "spec":  "NHX-63V-1000μF 12.5*30",
                                                                                                               "pn":  "NHXL3001J102MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "1000",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "12.5*30",
                                                                                                               "esr":  "15",
                                                                                                               "ripple":  "4400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHT",
                                                                                                               "spec":  "NHT-63V-120μF 10*10",
                                                                                                               "pn":  "NHTE1001J121MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "120",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 4000H",
                                                                                                               "size":  "10*10",
                                                                                                               "esr":  "30",
                                                                                                               "ripple":  "1400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHT",
                                                                                                               "spec":  "NHT-63V-390μF 10*25",
                                                                                                               "pn":  "NHTE2501J391MJCG",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "390",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 4000H",
                                                                                                               "size":  "10*25",
                                                                                                               "esr":  "12",
                                                                                                               "ripple":  "4200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHT",
                                                                                                               "spec":  "NHT-80V-47μF 10*10",
                                                                                                               "pn":  "NHTE1001K470MJCG",
                                                                                                               "voltage":  "80",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 4000H",
                                                                                                               "size":  "10*10",
                                                                                                               "esr":  "35",
                                                                                                               "ripple":  "1200",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "VHT",
                                                                                                               "spec":  "VHT-80V-10μF 6.3*5.8",
                                                                                                               "pn":  "VHTC0581K100MVCG",
                                                                                                               "voltage":  "80",
                                                                                                               "cap":  "10",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 4000H",
                                                                                                               "size":  "6.3*5.8",
                                                                                                               "esr":  "120",
                                                                                                               "ripple":  "700",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPL",
                                                                                                               "spec":  "NPL-63V-680μF-10*30",
                                                                                                               "pn":  "NPLE3001J681MJTM",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "680",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "10*30",
                                                                                                               "esr":  "25",
                                                                                                               "ripple":  "5100",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPL",
                                                                                                               "spec":  "NPL-63V-470μF-10*21",
                                                                                                               "pn":  "NPLE2101J471MJTM",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "10*21",
                                                                                                               "esr":  "30",
                                                                                                               "ripple":  "4350",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NPL",
                                                                                                               "spec":  "NPL-80V-330μF-12.5*20",
                                                                                                               "pn":  "NPLL2001K331MJTM",
                                                                                                               "voltage":  "80",
                                                                                                               "cap":  "330",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 5000H",
                                                                                                               "size":  "12.5*20",
                                                                                                               "esr":  "30",
                                                                                                               "ripple":  "4550",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKH",
                                                                                                               "spec":  "LKH-100V 100μF 10*20",
                                                                                                               "pn":  "LKHE2002A101MF",
                                                                                                               "voltage":  "100",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "150℃ 1000H",
                                                                                                               "size":  "10*20",
                                                                                                               "esr":  "950",
                                                                                                               "ripple":  "620",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKH",
                                                                                                               "spec":  "LKH-100V-220μF 13*20",
                                                                                                               "pn":  "LKHS2002A221MF",
                                                                                                               "voltage":  "100",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "150℃ 1000H",
                                                                                                               "size":  "13*20",
                                                                                                               "esr":  "650",
                                                                                                               "ripple":  "1000",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-33μF 12.5*25",
                                                                                                               "pn":  "LKGL2502W330MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "33",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "12.5*25",
                                                                                                               "esr":  "4250",
                                                                                                               "ripple":  "600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-47μF 14.5*20",
                                                                                                               "pn":  "LKGU2002W470MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "14.5*20",
                                                                                                               "esr":  "4200",
                                                                                                               "ripple":  "810",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKG",
                                                                                                               "spec":  "LKG-450V-68μF 14.5*27",
                                                                                                               "pn":  "LKGU2702W680MF",
                                                                                                               "voltage":  "450",
                                                                                                               "cap":  "68",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃  12000H",
                                                                                                               "size":  "14.5*27",
                                                                                                               "esr":  "2000",
                                                                                                               "ripple":  "900",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-63V-470μF 12.5*20",
                                                                                                               "pn":  "LKLL2001J471MF",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "130℃ 5000H",
                                                                                                               "size":  "12.5*20",
                                                                                                               "esr":  "758",
                                                                                                               "ripple":  "1170",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-63V-1000μF 14.5*27",
                                                                                                               "pn":  "LKLU2701J102MF",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "1000",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "130℃ 5000H",
                                                                                                               "size":  "14.5*27",
                                                                                                               "esr":  "450",
                                                                                                               "ripple":  "1850",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-63V-1200μF 12.5*30",
                                                                                                               "pn":  "LKLL3001J122MF",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "1200",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "130℃ 5000H",
                                                                                                               "size":  "12.5*30",
                                                                                                               "esr":  "45",
                                                                                                               "ripple":  "1600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-63V-2700μF 18*31.5",
                                                                                                               "pn":  "LKLJ3151J272MF",
                                                                                                               "voltage":  "63",
                                                                                                               "cap":  "2700",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "130℃ 5000H",
                                                                                                               "size":  "18*31.5",
                                                                                                               "esr":  "38",
                                                                                                               "ripple":  "2500",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         }
                                                                                     ]
                                                                     },
                                                                     {
                                                                         "name":  "BBU备用电源",
                                                                         "icon":  "power",
                                                                         "topologyImages":  [

                                                                                            ],
                                                                         "modules":  [

                                                                                     ]
                                                                     }
                                                                 ]
                                                 },
                                                 {
                                                     "key":  "t2",
                                                     "name":  "AI服务器存储",
                                                     "icon":  "memory",
                                                     "subApps":  [
                                                                     {
                                                                         "name":  "SSD企业级固态硬盘",
                                                                         "icon":  "memory",
                                                                         "topologyImages":  [

                                                                                            ],
                                                                         "modules":  [
                                                                                         {
                                                                                             "name":  "PLP 电路供电输入端",
                                                                                             "icon":  "power",
                                                                                             "desc":  "位于SSD供电接口与PLP掉电保护电路、主控电路之间，是SSD供电的一级滤波节点，同时在掉电时为PLP电路提供储能支撑，保障缓存数据写入与掉电保护执行。\n\n对电容的要求：异常断电保护(PLP)的可靠性；耐高频开关冲击；高温环境下的长寿命与稳定性；高耐纹波电流能力；高可靠性与一致性；\n\n电容核心作用：输入供电滤波、PLP掉电保护储能、抗电压波动\n\n永铭固液混合铝电解优势：\n1，掉电保护；固混电容可以提供毫秒级断电保护，超低ESR确保能量高效释放，完美满足PLP需求；\n2，耐开关冲击；永铭固混电容可耐受30万次充放电；\n3，高温长寿命；采用固液混合技术，从根本上解决了电解液干涸问题，在125℃高温下寿命4000小时，远超Al服务器 的预期工作年限；\n4，固液混合电容具有高耐纹波电流能力，能保持系统在重载下的稳定；\n5，高可靠性、一致性；永铭通过智能化生产线和数字化管理平台，严格品控，提供高质量、一致性好的产品，满足企业级客  户对可靠性的极致追求；\n\n永铭钽电容产品优势：\n1，超高容量密度；具备极致的体积效率，在SSD“寸土寸金”的板 卡上，以最小的物理尺寸提供最大的单位体 积容量，释放了宝贵的布局空间，同时满足 掉电保护的能量需求。\n2，掉电保护的即时性；既能实现毫秒级的快速能量释放，满足掉电 保护需求；又有效抑制了正常上电时的浪涌 电流，从而完美支持热插拔等关键功能，提 升了系统应用的坚固性与安全性。\n3，宽温稳定\u0026高可靠性；部分系列产品可通过双85测试1000小时，并 在20000次充放电循环后，容量衰减仍小于 15%。其卓越的长期耐高温与抗老化性能，为 数据的绝对安全与系统长期可靠性提供了坚 实保障。",
                                                                                             "specs":  [
                                                                                                           {
                                                                                                               "series":  "NGY",
                                                                                                               "spec":  "NGY-35V-100μF 5*11",
                                                                                                               "pn":  "NGYB1101V101MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "5*11",
                                                                                                               "esr":  "60",
                                                                                                               "ripple":  "1250",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NGY",
                                                                                                               "spec":  "NGY-35V-150μF-5*13",
                                                                                                               "pn":  "NGYB1301V151MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "150",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "5*13",
                                                                                                               "esr":  "50",
                                                                                                               "ripple":  "1350",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NGY",
                                                                                                               "spec":  "NGY-35V-220μF-5*15",
                                                                                                               "pn":  "NGYB1501V221MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "5*15",
                                                                                                               "esr":  "40",
                                                                                                               "ripple":  "1450",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NGY",
                                                                                                               "spec":  "NGY-35V-820μF-8*18",
                                                                                                               "pn":  "NGYD1801V821MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "820",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "8*18",
                                                                                                               "esr":  "20",
                                                                                                               "ripple":  "3240",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NGY",
                                                                                                               "spec":  "NGY-35V-2200μF 12.5*25",
                                                                                                               "pn":  "NGYL2501V222MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "2200",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "12.5*25",
                                                                                                               "esr":  "20",
                                                                                                               "ripple":  "4600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "NHT",
                                                                                                               "spec":  "NHT-35V-3300μF-12.5*30",
                                                                                                               "pn":  "NHTL3001V332MJCG",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "3300",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 4000H",
                                                                                                               "size":  "12.5*30",
                                                                                                               "esr":  "16",
                                                                                                               "ripple":  "5700",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-35V-2200μF 10*32",
                                                                                                               "pn":  "LKLE3201V222MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "2200",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "125℃ 3000H",
                                                                                                               "size":  "10*32",
                                                                                                               "esr":  "60",
                                                                                                               "ripple":  "2500",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKL",
                                                                                                               "spec":  "LKL-35V-3300μF 12.5*30",
                                                                                                               "pn":  "LKLL3001V332MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "3300",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "130℃ 5000H",
                                                                                                               "size":  "12.5*30",
                                                                                                               "esr":  "44",
                                                                                                               "ripple":  "2800",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF(U)-35V-47μF 5*11",
                                                                                                               "pn":  "LKF(U)B1101V470MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "5*11",
                                                                                                               "esr":  "1110",
                                                                                                               "ripple":  "345",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF-35V-470μF 6.3*23",
                                                                                                               "pn":  "LKFC2301V471MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "470",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 9000H",
                                                                                                               "size":  "6.3*23",
                                                                                                               "esr":  "550",
                                                                                                               "ripple":  "1150",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF-35V-1800μF 12.5*25",
                                                                                                               "pn":  "LKFL2501V182MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "1800",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "12.5*25",
                                                                                                               "esr":  "35",
                                                                                                               "ripple":  "3450",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "LKF",
                                                                                                               "spec":  "LKF-35V-2200μF 12.5*25",
                                                                                                               "pn":  "LKFL2501V222MF",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "2200",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 10000H",
                                                                                                               "size":  "12.5*25",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "3480",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQD",
                                                                                                               "spec":  "TQD15-35V-47μF 7.3*4.3*1.5",
                                                                                                               "pn":  "TQD470M1VD15100RN",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "47",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.5",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQD",
                                                                                                               "spec":  "TQD19-35V-68μF 7.3*4.3*1.9",
                                                                                                               "pn":  "TQD680M1VD19100RN",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "68",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*4.3*1.9",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1400",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQW",
                                                                                                               "spec":  "TQW19-35V-100μF 7.3*6.0*1.9",
                                                                                                               "pn":  "TQW101M1VW19100RN",
                                                                                                               "voltage":  "35",
                                                                                                               "cap":  "100",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*6.0*1.9",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1600",
                                                                                                               "note":  ""
                                                                                                           },
                                                                                                           {
                                                                                                               "series":  "TQW",
                                                                                                               "spec":  "TQW19-25V-220μF 7.3*6.0*1.9",
                                                                                                               "pn":  "TQW221M1EW19100RN",
                                                                                                               "voltage":  "25",
                                                                                                               "cap":  "220",
                                                                                                               "temperature":  "",
                                                                                                               "life":  "105℃ 2000H",
                                                                                                               "size":  "7.3*6.0*1.9",
                                                                                                               "esr":  "100",
                                                                                                               "ripple":  "1600",
                                                                                                               "note":  ""
                                                                                                           }
                                                                                                       ]
                                                                                         }
                                                                                     ]
                                                                     }
                                                                 ]
                                                 }
                                             ]
                                },
                  "robotics":  {
                                   "sheet":  "机器人",
                                   "icon":  "precision_manufacturing",
                                   "hero":  {
                                                "title":  "机器人应用指南",
                                                "description":  "面向机器人关节模组、雷达/摄像头感知系统及高压输入滤波，提供高容量密度、低ESR和高可靠性的电容方案。",
                                                "tags":  [
                                                             "高容量密度",
                                                             "低ESR",
                                                             "高可靠性"
                                                         ]
                                            },
                                   "tabs":  [
                                                {
                                                    "key":  "t0",
                                                    "name":  "机器人关节模组",
                                                    "icon":  "settings",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "关节模组",
                                                                        "icon":  "settings",
                                                                        "topologyImages":  [

                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "母线直流支持",
                                                                                            "icon":  "settings",
                                                                                            "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHXC0581K120MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "12μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "静噪",
                                                                                            "icon":  "settings",
                                                                                            "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHXC0541K180MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "18μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "过滤杂波提供稳定的电流和电压",
                                                                                            "icon":  "settings",
                                                                                            "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHXC0581K220MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "22μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHXD1051K680MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "68μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "8*10.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHXC0582A100MV",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "10μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHMC0581K100MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "10μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHME1051K680MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "68μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "10*10.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHMC0852A150MV",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "15μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "6.3*8.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHMD1052A220MV",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "22μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "8*10.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHME1052A470MV",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "47μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "10*10.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHME1702A820MV",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "82μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "10*17",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHXE1001K101MF",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHXD1601K121MF",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "120μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "8*16",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHXE1002A101MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 2000~5000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHME1602A820MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "82μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "10*16",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKZ",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKZB2502A390MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "39μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 10000~15000H",
                                                                                                              "size":  "5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKZ",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKZC2502A680MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "68μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 10000~15000H",
                                                                                                              "size":  "6.3*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKZ",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKZT2502A101MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 10000~15000H",
                                                                                                              "size":  "7*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKZ",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKZL2502A331MF",
                                                                                                              "voltage":  "100V",
                                                                                                              "cap":  "330μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 10000~15000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMMC0541V470MV",
                                                                                                              "voltage":  "35V",
                                                                                                              "cap":  "47μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000~8000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMMD0621K270MV",
                                                                                                              "voltage":  "80V",
                                                                                                              "cap":  "27μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000~8000H",
                                                                                                              "size":  "8*6.2",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMML1452K101MV",
                                                                                                              "voltage":  "120V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000~8000H",
                                                                                                              "size":  "12.5*14.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t1",
                                                    "name":  "机器人感知系统",
                                                    "icon":  "sensors",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "雷达/摄像头",
                                                                        "icon":  "sensors",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/robotics-01.png",
                                                                                                   "alt":  "雷达/摄像头电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "关键电容应用位置",
                                                                                            "icon":  "sensors",
                                                                                            "desc":  "应用要求‌：适配DSP芯片瞬时大电流突变的供电需求，避免芯片因供电波动出现算力不足、数据丢包。\n‌电容作用‌：快速响应DSP核心的瞬态功率波动，滤除芯片工作产生的高频回流噪声，维持核心供电电压稳定。\n‌YMIN产品优势‌：推荐VHT系列固液混合电容，超低ESR特性可实现纳秒级瞬态响应，在狭小空间内实现高容值滤波，保障雷达点云数据、摄像头图像数据传输零丢包。",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VHT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHTC0771V470MVCG",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "47",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "6.3×7.7",
                                                                                                              "esr":  "35",
                                                                                                              "ripple":  "1400",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHTD1051V221MVCG",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "8*10.5",
                                                                                                              "esr":  "27",
                                                                                                              "ripple":  "1600",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHTE1301H221MVCG",
                                                                                                              "voltage":  "50",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "125℃ 4000H",
                                                                                                              "size":  "10*13",
                                                                                                              "esr":  "20",
                                                                                                              "ripple":  "2400",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t2",
                                                    "name":  "机器人电源模块",
                                                    "icon":  "power",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "高压输入滤波",
                                                                        "icon":  "power",
                                                                        "topologyImages":  [

                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "高压输入滤波",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求‌：在高压输入侧实现EMI抑制，同时耐受高浪涌冲击，满足整机小型化、高能量密度的设计需求。\n‌电容作用‌：吸收高压输入侧的瞬态尖峰与电网浪涌，滤除输入共模/差模噪声，为后级所有电路提供安全、纯净的输入电源。\n‌YMIN产品优势‌：固液混合高压电容的容量密度是传统铝电解电容的3倍，在更小体积下实现大容值滤波，可配合LC滤波网络完成高效EMI抑制，同时耐受高输入浪涌冲击，完美匹配电源模块高能量密度、小型化的设计目标。",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "LKX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCMU2702T101MF",
                                                                                                              "voltage":  "420V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 12000H",
                                                                                                              "size":  "14.5*27",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "高能量密度，小型化",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求‌：在高压输入侧实现EMI抑制，同时耐受高浪涌冲击，满足整机小型化、高能量密度的设计需求。\n‌电容作用‌：吸收高压输入侧的瞬态尖峰与电网浪涌，滤除输入共模/差模噪声，为后级所有电路提供安全、纯净的输入电源。\n‌YMIN产品优势‌：固液混合高压电容的容量密度是传统铝电解电容的3倍，在更小体积下实现大容值滤波，可配合LC滤波网络完成高效EMI抑制，同时耐受高输入浪涌冲击，完美匹配电源模块高能量密度、小型化的设计目标。",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "LKX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKXI4002T151MF",
                                                                                                              "voltage":  "420V",
                                                                                                              "cap":  "150μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 12000H",
                                                                                                              "size":  "16*40",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCME1802W330MF",
                                                                                                              "voltage":  "450V",
                                                                                                              "cap":  "33μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000H",
                                                                                                              "size":  "10*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCML2502W680MF",
                                                                                                              "voltage":  "450V",
                                                                                                              "cap":  "68μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCMU2502W101MF",
                                                                                                              "voltage":  "450V",
                                                                                                              "cap":  "100μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCML5002W121MF",
                                                                                                              "voltage":  "450V",
                                                                                                              "cap":  "120μF",
                                                                                                              "temperature":  "",
                                                                                                              "life":  "105℃ 3000H",
                                                                                                              "size":  "12.5*50",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                }
                                            ]
                               },
                  "drone":  {
                                "sheet":  "无人机",
                                "icon":  "flight",
                                "hero":  {
                                             "title":  "无人机应用指南",
                                             "description":  "面向无人机电子调速器与航点飞行调参，提供适用于滤波、储能和稳定供电的电容方案。",
                                             "tags":  [
                                                          "大纹波",
                                                          "高能量密度",
                                                          "小型化"
                                                      ]
                                         },
                                "tabs":  [
                                             {
                                                 "key":  "t0",
                                                 "name":  "无人机电子调速器",
                                                 "icon":  "flight",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "电子调速器",
                                                                     "icon":  "flight",
                                                                     "topologyImages":  [
                                                                                            {
                                                                                                "src":  "assets/application-collected/drone-01.png",
                                                                                                "alt":  "电子调速器电路拓扑图"
                                                                                            }
                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "母线直流支持",
                                                                                         "icon":  "flight",
                                                                                         "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性\n\n\n\n‌耐压裕量‌：耐压值需达到电路最大工作电压的1.2~2倍，应对方波驱动产生的电压尖峰，避免过压击穿。\n‌低等效串联电阻（ESR）‌：ESR需控制在20mΩ及以下，降低大电流下的发热损耗，保障滤波效率。\n‌高纹波电流能力‌：单体纹波电流需达到5500mA级别，可承载穿越机急加速等场景下的数百安培毫秒级瞬时峰值电流",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "VHM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VHME1301K820MV",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "82μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "10*13",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "静噪",
                                                                                         "icon":  "flight",
                                                                                         "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性\n\n\n\n‌耐压裕量‌：耐压值需达到电路最大工作电压的1.2~2倍，应对方波驱动产生的电压尖峰，避免过压击穿。\n‌低等效串联电阻（ESR）‌：ESR需控制在20mΩ及以下，降低大电流下的发热损耗，保障滤波效率。\n‌高纹波电流能力‌：单体纹波电流需达到5500mA级别，可承载穿越机急加速等场景下的数百安培毫秒级瞬时峰值电流",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "VHM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VHME1701K181MV",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "180μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "10*17",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "过滤杂波提供稳定的电流和电压",
                                                                                         "icon":  "flight",
                                                                                         "desc":  "滤波稳压‌：吸收逆变环节高频开关产生的纹波电流，平滑直流母线电压，为电机提供稳定的电能输入。\n‌浪涌与瞬态响应‌:凭借耐大电流冲击的特性，承受电机启动时的浪涌电流，同时提供瞬时大电流，快速响应电机功率突变的需求。\n‌储能缓冲‌:短时间储存电荷，在负载波动时维持电压稳定，避免电压尖峰损坏电调内部的功率器件。\n‌抑制干扰‌:消除电源与负载间的低频噪声耦合，减少电路间的干扰，提升电调整体运行稳定性\n\n\n\n‌耐压裕量‌：耐压值需达到电路最大工作电压的1.2~2倍，应对方波驱动产生的电压尖峰，避免过压击穿。\n‌低等效串联电阻（ESR）‌：ESR需控制在20mΩ及以下，降低大电流下的发热损耗，保障滤波效率。\n‌高纹波电流能力‌：单体纹波电流需达到5500mA级别，可承载穿越机急加速等场景下的数百安培毫秒级瞬时峰值电流",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "VHM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VHMC0852A150MV",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "15μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "6.3*8.5",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001V152MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1500μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFE3001V122MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "10*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001V182VF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1800μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001H102MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "1000μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001H122MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "1200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFJ4001H472MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "4700μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "18*40",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001J561MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "560μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFD3501J681MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "8*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001J681MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3501J122MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "1200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFL3001J102MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "1000μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKF",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKFJ4001J222MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "2200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "18*40",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKME3001V122MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "10*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKML3001V152MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1500μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKMI3151H222MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "2200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "16*31.5",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKML3001K681MF",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKML3001J122MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "1200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKML3001K681MF",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKMJ3552A102MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "1000μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "18*35.5",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKMI1602K221MF",
                                                                                                           "voltage":  "120V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "16*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKML3002K271MF",
                                                                                                           "voltage":  "120V",
                                                                                                           "cap":  "270μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t1",
                                                 "name":  "无人机航点飞行调参",
                                                 "icon":  "flight",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "航点飞行调参",
                                                                     "icon":  "flight",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "高能量密度",
                                                                                         "icon":  "flight",
                                                                                         "desc":  "集成化小型化：集成飞行控制、导航、通信等功能，减轻重量，提升性能。\n高可靠性高精度：在恶劣环境中保持稳定工作，确保飞行的精度和安全性。特别是在复杂的飞行 任务中，需要高精度的姿态控制和稳定的飞行性能。\n高能效 低功耗：随着无人机对电池续航的依赖性增强，控制器系统的功耗也成为一个关键问 题。控制器需要具备高效能的同时，确保低功耗以延长无人机的飞行时间。\n抗干扰抗震：控制器需要具备较强的抗干扰能力，能够有效应对环境中出现的各种电磁干扰及噪声，保持飞行的稳定性。同时，控制器应具备抗震能力，防止由于振动对飞行控制精度的影响。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "MPD19",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD101M1CD19018R",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "100μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*1.9",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "输出滤波",
                                                                                         "icon":  "power",
                                                                                         "desc":  "集成化小型化：集成飞行控制、导航、通信等功能，减轻重量，提升性能。\n高可靠性高精度：在恶劣环境中保持稳定工作，确保飞行的精度和安全性。特别是在复杂的飞行 任务中，需要高精度的姿态控制和稳定的飞行性能。\n高能效 低功耗：随着无人机对电池续航的依赖性增强，控制器系统的功耗也成为一个关键问 题。控制器需要具备高效能的同时，确保低功耗以延长无人机的飞行时间。\n抗干扰抗震：控制器需要具备较强的抗干扰能力，能够有效应对环境中出现的各种电磁干扰及噪声，保持飞行的稳定性。同时，控制器应具备抗震能力，防止由于振动对飞行控制精度的影响。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "MPD19",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD470M1ED19040R",
                                                                                                           "voltage":  "25V",
                                                                                                           "cap":  "47μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*1.9",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "整机控制EMC",
                                                                                         "icon":  "memory",
                                                                                         "desc":  "集成化小型化：集成飞行控制、导航、通信等功能，减轻重量，提升性能。\n高可靠性高精度：在恶劣环境中保持稳定工作，确保飞行的精度和安全性。特别是在复杂的飞行 任务中，需要高精度的姿态控制和稳定的飞行性能。\n高能效 低功耗：随着无人机对电池续航的依赖性增强，控制器系统的功耗也成为一个关键问 题。控制器需要具备高效能的同时，确保低功耗以延长无人机的飞行时间。\n抗干扰抗震：控制器需要具备较强的抗干扰能力，能够有效应对环境中出现的各种电磁干扰及噪声，保持飞行的稳定性。同时，控制器应具备抗震能力，防止由于振动对飞行控制精度的影响。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "MPD19",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD220M1VD19040R",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "22μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*1.9",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "MPD28",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD330M1VD28040R",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "33μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃_2000H",
                                                                                                           "size":  "7.3*4.3*2.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "MPD28",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD330M1JD28040R",
                                                                                                           "voltage":  "40V",
                                                                                                           "cap":  "33μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃_2000H",
                                                                                                           "size":  "7.3*4.3*2.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             }
                                         ]
                            },
                  "motor":  {
                                "sheet":  "新型电机驱动",
                                "icon":  "electric_bolt",
                                "hero":  {
                                             "title":  "新型电机驱动应用指南",
                                             "description":  "变频器、伺服驱动器、步进电机驱动等工业电机控制系统的 DC-Link 与滤波电容方案。",
                                             "tags":  [
                                                          "DC-Link",
                                                          "滤波",
                                                          "高纹波"
                                                      ]
                                         },
                                "tabs":  [
                                             {
                                                 "key":  "t0",
                                                 "name":  "智慧出行",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "低速电动车",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "输入EMI滤波",
                                                                                         "icon":  "power",
                                                                                         "desc":  "高容量密度品，小型化大容量；适合小型化高功率的需求；低漏电流产品，低静态功耗；电池续航更保证；",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "VPX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VPXC0581C221MV",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "6.3*5.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "大电流充放电双向拓扑",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "宽频范围内保持低ER;整机BC更可控；宽温范围内电性能稳定；保证整机户外运行稳定；耐受超大电流冲击，单体电容耐受冲击电流高达30A以上确保高负载高功率的工况下电容能够正常工作且性能稳定。\n高功率密度架构，适配小体积大容量需求，低静态功耗设计保障长续航；全工况下宽温域大电流充放电可控，搭载BMS主动均衡与多重硬件保护，满功率户外运行无压力，-40℃~85℃宽温环境下可稳定输出，长期循环无容量下降问题。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "VPX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VPXC0581E221MV",
                                                                                                           "voltage":  "25V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "6.3*5.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXI2502A471MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "470μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "16*25",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXJ2502A561MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "560μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "18*25",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LK",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "OLKL2002C121MF",
                                                                                                           "voltage":  "160V",
                                                                                                           "cap":  "120μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 8000H",
                                                                                                           "size":  "12.5*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "V3M",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "V3MC0771E221MV",
                                                                                                           "voltage":  "25V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "6.3*7.7",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "V3M",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "V3MD1001V331MV",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "8*10",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "VMM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VMMI1651C332MV",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "3300μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000~8000H",
                                                                                                           "size":  "16*16.5",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "VMM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VMME0841V221MV",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000~8000H",
                                                                                                           "size":  "10*8.4",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "VMM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VMMC0571J220MV",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "22μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000~8000H",
                                                                                                           "size":  "6.3*5.7",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "VMM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VMME1001K121KV",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "120μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000~8000H",
                                                                                                           "size":  "10*10",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "VMM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "VMME0692A220MV",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "22μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000~8000H",
                                                                                                           "size":  "10*6.9",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 },
                                                                 {
                                                                     "name":  "高速电摩",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "输入EMI滤波",
                                                                                         "icon":  "power",
                                                                                         "desc":  "高容量密度品，小型化大容量；适合小型化高功率的需求；低漏电流产品，低静态功耗；电池续航更保证；",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXE1602A101MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "100μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "10*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "大电流充放电双向拓扑",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "宽频范围内保持低ESR;整机EMC可控；宽温范围内电性能稳定；保证整机户外运行稳定；耐受超大电流冲击，单体电容耐受冲击电流高达30A以上确保高负载高功率的工况下电容能够正常工作且性能稳定。\n高集成度小体积设计适配轻量化需求，低损耗架构降低发热提升续航表现；全温域内大电流充放电，搭载硬件级过流、过压双重锁止保护，适配户外复杂工况，满负载连续运行无器件过热失效风险。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXL1602A221MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "12.5*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXL2302A331MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "12.5*23",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEE2002A151MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "150μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 1000H",
                                                                                                           "size":  "10*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEL1602A221MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 1000H",
                                                                                                           "size":  "12.5*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEL2002A331MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 1000H",
                                                                                                           "size":  "12.5*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKES1602D820MF",
                                                                                                           "voltage":  "200V",
                                                                                                           "cap":  "82μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 1000H",
                                                                                                           "size":  "13*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEL2002D101MF",
                                                                                                           "voltage":  "200V",
                                                                                                           "cap":  "100μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 1000H",
                                                                                                           "size":  "12.5*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LK",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "OLKI2002A561MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "560μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 8000H",
                                                                                                           "size":  "16*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LK",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "OLKU3502A681MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 8000H",
                                                                                                           "size":  "14.5*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LK",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "OLKM2002A102MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "1000uF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 8000H",
                                                                                                           "size":  "25*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t1",
                                                 "name":  "电动工具",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "园林工具",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "高功率Buck-Boost混合拓扑",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "① 耐超大电流设计，单体最高30A以上；\n② 宽频范围内保持低ESR;\n③ 导针加粗设计，耐大电流同时抗震性更好；\n④ LKE系列M型封装，抗震设计，可SMT贴片，满足板子结构设计，版面布局 更合理。\n支持超大电流瞬态输出，峰值电流≥30A，适配重载作业场景；全工况下阻抗匹配度≤5mΩ，导通过程无尖峰冲击，搭配SMT贴片化设计缩减整机体积，布局紧凑EMC性能优异。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "NHT",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHTC0701J220MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "22μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "6.3*7",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "高压输入端口",
                                                                                         "icon":  "power",
                                                                                         "desc":  "① 耐超大电流设计，单体最高30A以上；\n② 宽频范围内保持低ESR;\n③ 导针加粗设计，耐大电流同时抗震性更好；\n④ LKE系列M型封装，抗震设计，可SMT贴片，满足板子结构设计，版面布局 更合理。\n支持超大电流瞬态输出，峰值电流≥30A，适配重载作业场景；全工况下阻抗匹配度≤5mΩ，导通过程无尖峰冲击，搭配SMT贴片化设计缩减整机体积，布局紧凑EMC性能优异。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "NHT",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHTL2001J471MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "470μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃_4000H",
                                                                                                           "size":  "12.5*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "NHT",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHTC0701K220MF",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "22μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "6.3*7",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "NHT",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHTL1601K221MF",
                                                                                                           "voltage":  "80V",
                                                                                                           "cap":  "220μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "125℃ 4000H",
                                                                                                           "size":  "12.5*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 },
                                                                 {
                                                                     "name":  "电动工具",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "大电流自适应拓扑",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "动态阻抗实时调节，适配不同负载下的功率输出需求，支持多档位功率切换，硬件级过流保护响应时间短，适配冲击钻、电锯等重载电动工具的瞬态大电流工况。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEL2001V102MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1000μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "12.5*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "大电流充放电双向拓扑",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "动态阻抗实时调节，适配不同负载下的功率输出需求，支持多档位功率切换，硬件级过流保护响应时间短，适配冲击钻、电锯等重载电动工具的瞬态大电流工况。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKES2001J681MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "13*20",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKES2502A331MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "13*25",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t2",
                                                 "name":  "高速风筒",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "高速风筒",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "高频谐振滤波",
                                                                                         "icon":  "power",
                                                                                         "desc":  "低纹波供电适配高速无刷电机驱动需求，开关损耗降低，整机噪音，支持10万转以上电机稳定运行，全负载范围内高效率，长时间运行无功率衰减。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "KCM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "KCME1802G390MF",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "39μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "10*18",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "KCM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "KCME4002G101MF",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "100μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "10*40",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "KCM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "KCMS3502G121MF",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "120μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "13*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "KCM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "KCMS3502G151MF",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "150μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "13*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "KCM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "KCMU3002G151MF",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "150μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "14.5*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t3",
                                                 "name":  "伺服/变频",
                                                 "icon":  "settings",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "伺服/变频控制器",
                                                                     "icon":  "settings",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "高压输入端口",
                                                                                         "icon":  "power",
                                                                                         "desc":  "低ESR、高容许波电流、小体积大容量，确保整机输出准确且稳定。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "SW3",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "SW32G561MNNAS04S2",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "560μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "35*35",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "高频谐振滤波",
                                                                                         "icon":  "power",
                                                                                         "desc":  "耐受瞬间高电压冲击和大电流冲击等能力，确保整机在峰值功率输出时能够稳定工作；",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "SW3",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "SW32G681MNNAS05S2",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "680μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "35*40",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     },
                                                                                     {
                                                                                         "name":  "三相矢量逆变+前级PFC拓扑模块",
                                                                                         "icon":  "power",
                                                                                         "desc":  "低纹波、高动态响应带宽设计，小体积大扭矩输出特性优异，全速度区间转速控制精度可达±1rpm；前级主动PFC将功率因数提升至0.98以上，搭配过转矩、过流、编码器异常多重保护，在机床、自动化生产线等工业场景下可实现高精度闭环运动控制，长期运行无丢步、失速问题。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "SW3",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "SW32G821MNNAS05S2",
                                                                                                           "voltage":  "400V",
                                                                                                           "cap":  "820μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "35*40",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "SW3",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "SW32W331MNNXS03S2",
                                                                                                           "voltage":  "450V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 3000H",
                                                                                                           "size":  "30*30",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t4",
                                                 "name":  "智能家电/智能厨电",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "智能家电/智能厨电",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "低功耗隔离反激拓扑模块",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "待机功耗≤0.5W，适配智能家居低功耗长续航需求，全电压输入范围适配家用市电波动，搭载通讯级隔离设计，支持IoT信号联动，长期运行无静电干扰宕机问题。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKME1251V331MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "10*12.5",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKM",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKME1401H331MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "10*14",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LK",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "OLKL2501C332MF",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "3300μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 8000H",
                                                                                                           "size":  "12.5*25",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t5",
                                                 "name":  "AGV",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "AGV智慧小车",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "多相交错并联拓扑模块",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "大电流持续输出适配AGV重载行走工况，均流误差≤3%，动态响应速度快，支持快充与续航模式无缝切换，搭配CAN通讯接口实时上传电源状态，保障AGV 7*24小时连续运行。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "MPD19",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD101M1CD19018R",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "100μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*1.9",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "MPD28",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD151M1CD28015R",
                                                                                                           "voltage":  "16V",
                                                                                                           "cap":  "150μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*2.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "MPD28",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "MPD330M1VD28040R",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "33μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000H",
                                                                                                           "size":  "7.3*4.3*2.8",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t6",
                                                 "name":  "运动出行",
                                                 "icon":  "electric_bolt",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "运动出行",
                                                                     "icon":  "electric_bolt",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "高功率密度碳化硅拓扑模块",
                                                                                         "icon":  "electric_bolt",
                                                                                         "desc":  "小体积轻量化设计适配便携出行设备，SiC器件降低导通损耗，全温域下功率输出稳定，支持快充补能，适配电动滑板、平衡车等设备的动态负载需求。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "NHX",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "NHXL1601V152MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1500μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 2000~5000H",
                                                                                                           "size":  "12.5*16",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKES2001J471MF",
                                                                                                           "voltage":  "63V",
                                                                                                           "cap":  "470μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "13*20涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEU2302A471MF",
                                                                                                           "voltage":  "100V",
                                                                                                           "cap":  "470μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃_10000H",
                                                                                                           "size":  "14.5*23涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKE",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKEU2502K331MF",
                                                                                                           "voltage":  "120V",
                                                                                                           "cap":  "330μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "105℃ 10000H",
                                                                                                           "size":  "14.5*25涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             },
                                             {
                                                 "key":  "t7",
                                                 "name":  "工业水泵/风机",
                                                 "icon":  "settings",
                                                 "subApps":  [
                                                                 {
                                                                     "name":  "工业水泵/风机",
                                                                     "icon":  "settings",
                                                                     "topologyImages":  [

                                                                                        ],
                                                                     "modules":  [
                                                                                     {
                                                                                         "name":  "矢量驱动三相逆变拓扑模块",
                                                                                         "icon":  "settings",
                                                                                         "desc":  "支持V/F无级调速，适配水泵风机的变负载节能运行需求，谐波畸变率≤5%，搭配过转矩保护，全工况下运行平稳无冲击，长期工业环境下可靠性MTBF≥10万小时。",
                                                                                         "specs":  [
                                                                                                       {
                                                                                                           "series":  "LKL(R)",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKL(R)L2001V132MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1300μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "135℃ 3000H",
                                                                                                           "size":  "12.5*20涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKL(R)",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKL(R)L2501E222MF",
                                                                                                           "voltage":  "25V",
                                                                                                           "cap":  "2200μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "135℃ 3000H",
                                                                                                           "size":  "12.5*25涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKL(R)",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKL(R)L2001V102MF",
                                                                                                           "voltage":  "35V",
                                                                                                           "cap":  "1000μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "135℃ 3000H",
                                                                                                           "size":  "12.5*20涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       },
                                                                                                       {
                                                                                                           "series":  "LKL(R)",
                                                                                                           "spec":  "",
                                                                                                           "pn":  "LKL(R)L2001H471MF",
                                                                                                           "voltage":  "50V",
                                                                                                           "cap":  "470μF",
                                                                                                           "temperature":  "",
                                                                                                           "life":  "135℃ 3000H",
                                                                                                           "size":  "12.5*20涂膜",
                                                                                                           "esr":  "",
                                                                                                           "ripple":  "",
                                                                                                           "note":  ""
                                                                                                       }
                                                                                                   ]
                                                                                     }
                                                                                 ]
                                                                 }
                                                             ]
                                             }
                                         ]
                            },
                  "consumer":  {
                                   "sheet":  "消费类电子",
                                   "icon":  "devices",
                                   "hero":  {
                                                "title":  "消费类电子应用指南",
                                                "description":  "笔记本电脑、智能家居、PD快充、LED照明等消费电子产品的薄型化小型化电容方案。",
                                                "tags":  [
                                                             "薄型化",
                                                             "小型化",
                                                             "低ESR"
                                                         ]
                                            },
                                   "tabs":  [
                                                {
                                                    "key":  "t0",
                                                    "name":  "移动电源",
                                                    "icon":  "power",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "无线充",
                                                                        "icon":  "power",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-01.png",
                                                                                                   "alt":  "无线充电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "DC-DC开关电源",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：小体积，薄型化，高频低阻，高容量密度，输入端重瞬态补能与浪涌抑制，输出端重纹波平滑与负载补偿\n\n电容作用：充当瞬态电流池为开关管导通提供陡峭脉冲电流，抑制电池内阻引起的电压跌落，同时滤除低频纹波，承担母线平滑与负载补偿，填补环路响应延迟期间的电荷缺口，抑制负载跳变时的电压过冲/下冲“具备极低的ESR特性”，不仅能大幅度降低自身发热，瞬态响应，动态稳压，防止电压跌落，降低输出阻抗，滤除整流后的高频纹波，应对瞬时大电流负载，为负载提供平滑的直流电。\n\n  永铭固态及固液混合电容优势：小型化，薄型化，高容量密度，低ESR、耐大纹波电流能力，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "NPM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPM-16V-220μF 4*11",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPM-25V-100μF 3.55*11",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "3.55*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPM_25V_100μF_4*9",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPM-25V-220μF 4*15",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-68μF 4*11",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "68",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 5*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 6.3*4.5",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*4.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 6.3*5.8  低漏电",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-35V-100μF 6.3*5.4",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_16V_220μF_6.3*5.4",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_25V_120μF_6.3*5.4",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "120",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_25V_180μF_6.3*5.4",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "180",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_35V_100μF_6.3*5.4",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-220μF 6.3*5.8 低ESR",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-35V-150μF 6.3*5.8",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "150",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHX-25V-220μF-6.3*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHX-25V-100μF 6.3*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t1",
                                                    "name":  "PD快充",
                                                    "icon":  "devices",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "输入端",
                                                                        "icon":  "power",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-02.png",
                                                                                                   "alt":  "输入端电路拓扑图"
                                                                                               },
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-03.png",
                                                                                                   "alt":  "输入端电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "AC-DC转换，输入滤波/高压滤波电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：在PD快充输入端，要求电容高耐压，整流滤波电容的核心任务是平滑脉动直流，为后级变换器建立稳定的直流母线电压。其选型关键在于高耐压以满足高压场景，同时需具备足够容量与高可靠性，以在负载突变时提供即时能量缓冲。\n\n电容作用：输入端高压滤波，将整流后的脉动直流电平滑为稳定的高压直流电，为后续的开关变换电路提供平稳的能量来源，滤波与动态稳压，在开关管高速通断或负载突变时，它能提供瞬时能量，维持母线电压稳定，防止电压跌落，靠这颗大电容像“水库”一样，在瞬间释放存储的能量\n\n\n永铭液态快充KC专用系列优势：高容量密度，低漏电流，低阻抗，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；\n高铝箔耐压，耐大纹波电流耐受度、快速瞬态响应",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-400V-27μF 8*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "27",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-450V-12μF 10*11",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "12",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX_450V_100μF_18*25_",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "18*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX_450V_56μF_13*20",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "56",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "13*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400V-56μF 10*25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "56",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "10*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400V-56μF 8*30",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "56",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "8*30",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400μF-22μF 8*15",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "8*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM(T)_400V_15μF_7*15",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "15",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "7*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM_400V_22μF_7*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "7*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM(T)_400V_27μF_7*25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "27",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "7*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM_400V_47μF_10*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "47",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "10*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCG",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCG_450V_27μF_8*20",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "27",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "4000H",
                                                                                                              "size":  "8*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    },
                                                                    {
                                                                        "name":  "输出端",
                                                                        "icon":  "power",
                                                                        "topologyImages":  [

                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "DC-DC稳压滤波，输出滤波电容，滤除高频纹波，为负载提供平滑稳定的直流电",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：在PD快充输出端，要求电容小体积，耐大纹波，滤除高频纹波，提供纯净电源，DC-DC转换器的开关动作会在输出端产生高频纹波电流，输出电容的首要任务就是滤除这些纹波\n\n电容作用：瞬态响应，动态稳压，防止电压跌落，降低输出阻抗，滤除整流后的高频纹波，为负载提供平滑的直流电“具备极低的ESR特性”，不仅能大幅度降低自身发热，提升充电器寿命，还能将负载突变引起的电压尖峰抑制在毫伏级别，防止瞬间过冲烧毁手机电池管理芯片，\n\n永铭固态电容优势：高可靠性，低ESR，低漏电，小体积，耐大纹波电流，高容量密度，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-25V-560μF 5.5*15",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "560",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5.5*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-25V-1000μF 6.3*18",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-35V-820μF 6.3*20",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "820",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT_35V_47μF_4*7",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "47",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-25V-470μF-5*15",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-470μF 6.3*13",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*13",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-680μF 6.3*20",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "680",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-820μF-10*14",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "820",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*14",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-1000μF-8*18",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD15",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD15-16V-15uF 7.3*4.3*1.5",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "15",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19-16V-100uF 7.3*4.3*1.9",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19-25V-68uF 7.3*4.3*1.9",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "68",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD28",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD28-25V-100uF 7.3*4.3*2.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*2.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t2",
                                                    "name":  "数码3C",
                                                    "icon":  "devices",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "数码3C",
                                                                        "icon":  "devices",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-04.png",
                                                                                                   "alt":  "数码3C电路拓扑图"
                                                                                               },
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-05.png",
                                                                                                   "alt":  "数码3C电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "AC-DC输入端（整流滤波）:输入滤波/高压滤波电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：要求电容高耐压，滤除开关纹波，提供纯净且稳定的直流电，并在负载突变时充当能量的“缓冲池”\n电容作用：平滑整流后的脉动直流电，为后级提供平稳能量。推荐高耐压400V及以上，大容量，长寿命液态铝电解电容。\n\n永铭液态系列：高容量密度，低漏电流，低阻抗，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；\n高铝箔耐压，耐大纹波电流耐受度、快速瞬态响应",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-400V-27μF 8*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "27",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-420V-150μF 14.5*25",
                                                                                                              "voltage":  "420",
                                                                                                              "cap":  "150",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-450V-12μF 10*11",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "12",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCX-450V-100μF 14.5*25",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400μF-22μF 8*15",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400V-33μF 8*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "33",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM-400V-56μF 10*25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "56",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "KCM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "KCM(T)-420V-100μF 14.5*25",
                                                                                                              "voltage":  "420",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "控制端",
                                                                                            "icon":  "memory",
                                                                                            "desc":  "应用要求：为PWM/PFC控制IC、协议芯片（如PD）、MCU等供电的电源引脚（VDD/VCC）及其周边电路。这部分电容的核心使命是去耦与抗扰——为芯片创造绝对干净的直流工作环境\n电容作用：为PWM控制芯片提供稳定、纯净的工作电压，小容量，耐压根据芯片供电选择；\n永铭固态叠层电容优势：低ESR，耐大纹波电流及满足IC负载瞬态响应",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "MPS",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPS_2.5V_470μF_7.3*4.3*1.9_±20%_3mΩ",
                                                                                                              "voltage":  "2.5",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.2*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19_2V_330μF_7.3*4.3*1.9_-35%~+10%_9mΩ",
                                                                                                              "voltage":  "2",
                                                                                                              "cap":  "330",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "DC-DC稳压滤波，输出滤波电容，滤除高频纹波，为负载提供平滑稳定的直流电",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：DC-DC输出滤波电容的选型，要求电容小体积，耐大纹波，核心是解决“高频纹波电压”和“负载瞬态响应，看的是“高频特性下的有效容量与极低ESR”\n电容作用：瞬态响应，动态稳压，防止电压跌落，降低输出阻抗，滤除整流后的高频纹波，为负载提供平滑的直流电“具备极低的ESR特性”，不仅能大幅度降低自身发热，提升充电器寿命，还能将负载突变引起的电压尖峰抑制在毫伏级别，防止瞬间过冲烧毁手机电池管理芯片，\n\n永铭固态电容优势：高可靠性，低ESR，低漏电，小体积，耐大纹波电流，高容量密度，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 5*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 6.3*4.5",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*4.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 6.3*5.8  低漏电",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-35V-100μF 6.3*5.4",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_16V_220μF_6.3*5.4",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_25V_120μF_6.3*5.4",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "120",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_25V_180μF_6.3*5.4",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "180",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX_35V_100μF_6.3*5.4",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-220μF 6.3*5.8 低ESR",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-35V-150μF 6.3*5.8",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "150",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHX-25V-220μF-6.3*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VHX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VHX-25V-100μF 6.3*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-25V-560μF 5.5*15",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "560",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5.5*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-25V-1000μF 6.3*18",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-35V-820μF 6.3*20",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "820",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT_35V_47μF_4*7",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "47",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "4*7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-25V-470μF-5*15",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "5*15",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-470μF 6.3*13",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*13",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-680μF 6.3*20",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "680",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-820μF-10*14",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "820",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*14",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPT-35V-1000μF-8*18",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*18",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19_10V_100μF_7.3*4.3*1.9_±20%_15mΩ",
                                                                                                              "voltage":  "10",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19_25V_33μF_7.3*4.3*1.9_±20%_40mΩ",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "33",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19_25V_68μF_7.3*4.3*1.9_±20%_40mΩ",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "68",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD28",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD28_25V_100μF_7.3*4.3*2.8_±20%_40mΩ",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*2.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t3",
                                                    "name":  "智能照明",
                                                    "icon":  "lightbulb",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "智能照明",
                                                                        "icon":  "lightbulb",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-06.png",
                                                                                                   "alt":  "智能照明电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "输出端：输出滤波",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：输出端要求电容降低输出电流纹波，小体积，耐大纹波\n电容作用：滤除高频纹波，为LED提供平滑稳定的电流，是消除频闪的关键，\n\n推荐永铭固态及固液混合电容：低ESR、低漏电，耐高温，耐大纹波电流。\n推荐永铭液态贴片电容优势:低阻抗，耐纹波，小体积，高容量密度",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX_16V_1000μF_8*11",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*11",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHT_63V_22μF_6.3*7",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NHT",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NHT_80V_10μF_6.3*7",
                                                                                                              "voltage":  "80",
                                                                                                              "cap":  "10",
                                                                                                              "temperature":  "125度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-16V-1000μF 10*10",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-25V-470μF 8*10",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-35V-560μF 10*10",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "560",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-50V-220μF 8*10",
                                                                                                              "voltage":  "50",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMM-63V-1000μF 18*17",
                                                                                                              "voltage":  "63",
                                                                                                              "cap":  "1000",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "18*17",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VKM-80V-100μF 10*10",
                                                                                                              "voltage":  "80",
                                                                                                              "cap":  "10",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKL",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKL-50V-470μF 10*20",
                                                                                                              "voltage":  "50",
                                                                                                              "cap":  "470",
                                                                                                              "temperature":  "130度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "10*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKL",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKL-63V-560μF 14.5*16",
                                                                                                              "voltage":  "63",
                                                                                                              "cap":  "560",
                                                                                                              "temperature":  "130度",
                                                                                                              "life":  "5000H",
                                                                                                              "size":  "14.5*16",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKL",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKL-160V-100μF 12.5*20",
                                                                                                              "voltage":  "160",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "130度",
                                                                                                              "life":  "5000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "输入端：输入滤波/整流滤波电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应要要求：AC-DC输入端，要求高耐压，输入电容容量需足够大以平滑电压纹波\n\n电容作用：滤除电源中的杂波，为LED驱动电路提供平滑、纯净的电流，缓冲启动或调光切换时的瞬态尖峰电流，平滑整流后的脉动直流电，为后级提供平稳能量并吸收纹波，\n\n永铭液态电容优势: 铝箔高耐压，高容量密度、耐大纹波电流承受能力；\n永铭固态叠层电容优势：低ESR，耐大纹波电流，薄型化",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "LED",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LED-400V-4.7μF 8*9",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "4.7",
                                                                                                              "temperature":  "130度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "8*9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LED",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LED-400V-6.8μF 8*10",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "6.8",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "8*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LED",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LED-400V-10μF 10*12.5",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "10",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "10*12.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LED",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LED-400V-47μF 12.5*25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "47",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LED",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LED-400V-68μF 14.5-25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "68",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKM-400V-4.7μF 10*7",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "4.7",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "10*7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKM-400V-56μF 12.5*25",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "56",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKM-500V-22μF 12.5*20",
                                                                                                              "voltage":  "500",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "12.5*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMM-400V-1.2μF 6.3*5.4",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "1.2",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "3000H",
                                                                                                              "size":  "6.3*5.4",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMM-400V-4.7 10*6.9",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "4.7",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "10*6.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD28",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD28-100V-4.7μF 7.3*4.3*2.8",
                                                                                                              "voltage":  "100",
                                                                                                              "cap":  "4.7",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*2.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19-35V-22uF 7.3*4.3*1.9",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t4",
                                                    "name":  "电子笔",
                                                    "icon":  "devices",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "电子笔",
                                                                        "icon":  "devices",
                                                                        "topologyImages":  [

                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "输入滤波",
                                                                                            "icon":  "power",
                                                                                            "desc":  "电源输入端需滤波电容以抑制纹波与噪声，保证后续电路稳定工作。",
                                                                                            "specs":  [

                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "储能/旁路",
                                                                                            "icon":  "battery_charging_full",
                                                                                            "desc":  "储能与旁路电容提供瞬态电流支持，减小电源总线波动。",
                                                                                            "specs":  [

                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "输出滤波",
                                                                                            "icon":  "power",
                                                                                            "desc":  "输出端需滤波电容以平滑电压波形，确保负载端获得纯净电源。",
                                                                                            "specs":  [

                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "保护/去耦",
                                                                                            "icon":  "devices",
                                                                                            "desc":  "去耦与保护电容吸收高频噪声和电压尖峰，保障系统EMC合规与长期可靠性。",
                                                                                            "specs":  [

                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                },
                                                {
                                                    "key":  "t5",
                                                    "name":  "安防",
                                                    "icon":  "devices",
                                                    "subApps":  [
                                                                    {
                                                                        "name":  "安防",
                                                                        "icon":  "devices",
                                                                        "topologyImages":  [
                                                                                               {
                                                                                                   "src":  "assets/application-collected/consumer-07.png",
                                                                                                   "alt":  "安防电路拓扑图"
                                                                                               }
                                                                                           ],
                                                                        "modules":  [
                                                                                        {
                                                                                            "name":  "AC-DC输入端（整流滤波）:输入滤波/高压滤波电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：高压直流母线：核心储能与平滑，在严苛、长寿命的工作条件下，实现安全、稳定、高效的滤波与储能\n 电容作用： 平滑整流后的脉动直流电，为后级提供平稳能量。推荐高耐压400V及以上，大容量，长寿命液态铝电解电容。\n永铭液态电容优势：高容量密度，低漏电流，低阻抗，降低电能损耗和电容自身发热，提升转换效率；确保在高频纹波电流下稳定工作，减少发热；高铝箔耐压，耐大纹波电流耐受度、快速瞬态响应",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "LKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKM_400V_22μF_10*20",
                                                                                                              "voltage":  "400",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "10*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LK",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LK-450V-68μF 14.5*25",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "68",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "14.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LK",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LK-550V-22μF 12.5*25",
                                                                                                              "voltage":  "550",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "12.5*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LK",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LK-600V-15μF 12.5*16",
                                                                                                              "voltage":  "600",
                                                                                                              "cap":  "15",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "12.5*16",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "LKM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKM-450V-33μF 12.5*20",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "33",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "10000H",
                                                                                                              "size":  "12.5*20",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "控制端",
                                                                                            "icon":  "memory",
                                                                                            "desc":  "应用要求：低ESR、稳定容量，为电源管理芯片（PWM IC）提供稳定工作电压\n电容作用：为PWM控制芯片提供稳定、纯净的工作电压，小容量，耐压根据芯片供电选择；\n永铭固态叠层电容优势：低ESR，耐大纹波电流及满足IC负载瞬态响应",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "LKG",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "LKG-450V-82μF 18*25",
                                                                                                              "voltage":  "450",
                                                                                                              "cap":  "82",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "12000H",
                                                                                                              "size":  "18*25",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-35V-330μF 8*10",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "330",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "8*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "V3M",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "V3M-25V-220μF 6.3*7.7",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "3300",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*7.7",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "DC-DC输入储能电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：为DC-DC芯片提供瞬态大电流，补偿电压跌落\n电容作用：提供瞬态电流补偿，应对负载突变，低ESR，提供快速瞬态响应\n永铭液态电容优势:小型化，高容量密度，低ESR、耐大纹波电流能力",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMM-16V-3300μF 16*16.5",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "3300",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "16*16.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VMM",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VMM-80V-120μF 10*10",
                                                                                                              "voltage":  "80",
                                                                                                              "cap":  "120",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "8000H",
                                                                                                              "size":  "10*10",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        },
                                                                                        {
                                                                                            "name":  "输出端：输出滤波电容",
                                                                                            "icon":  "power",
                                                                                            "desc":  "应用要求：平滑输出电压，最大程度降低纹波和噪声，滤除高频纹波\n电容作用：滤除高频纹波，为负载提供平滑稳定的直流电，低ESR、耐高纹波电流承受能力\n永铭固态电容优势：高可靠性，低ESR，低漏电，小体积，耐大纹波电流，高容量密度。永铭固态叠层电容优势：低ESR，耐大纹波电流，薄型化",
                                                                                            "specs":  [
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-25V-100μF 6.3*5.8",
                                                                                                              "voltage":  "25",
                                                                                                              "cap":  "100",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*5.8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "VPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "VPX-63V-22μF 6.3*8.5",
                                                                                                              "voltage":  "63",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*8.5",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "NPX",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "NPX-16V-220μF 6.3*8",
                                                                                                              "voltage":  "16",
                                                                                                              "cap":  "220",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "6.3*8",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          },
                                                                                                          {
                                                                                                              "series":  "MPD19",
                                                                                                              "spec":  "",
                                                                                                              "pn":  "MPD19-35V-22uF 7.3*4.3*1.9",
                                                                                                              "voltage":  "35",
                                                                                                              "cap":  "22",
                                                                                                              "temperature":  "105度",
                                                                                                              "life":  "2000H",
                                                                                                              "size":  "7.3*4.3*1.9",
                                                                                                              "esr":  "",
                                                                                                              "ripple":  "",
                                                                                                              "note":  ""
                                                                                                          }
                                                                                                      ]
                                                                                        }
                                                                                    ]
                                                                    }
                                                                ]
                                                }
                                            ]
                               }
              }
};
    data.getPage = function (pageKey) { return data.pages[pageKey] || null; };
    global.YMIN.applicationCollected = data;
})(window);