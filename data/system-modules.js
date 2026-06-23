/**
 * 永铭官网 — 系统模块详解共享数据
 * 覆盖所有应用页面的所有子应用，按三个层级组织：页面→一级Tab→子应用名
 * getModules(tabKey, subAppName) 返回该子应用的4个模块卡片
 */
var YMIN = window.YMIN || {};
YMIN.sysMod = (function(){
  'use strict';
  var DB = {

// ==================== 汽车电子 ====================
automotive: {
  mainDrive: {
    'DC-DC转换器': [
      {name:'高压输入滤波',icon:'power',desc:'车载高压电池（400V/800V）输入端滤波，需承受高压与大纹波电流。推荐VHT系列固液混合电容，ESR≤8mΩ，125℃耐高温。'},
      {name:'开关变换电路',icon:'transform',desc:'DC-DC功率变换核心，MOSFET/SiC开关产生高频噪声。需在开关节点就近放置低ESR电容吸收尖峰，推荐VPG系列高纹波电容。'},
      {name:'整流滤波输出',icon:'filter_alt',desc:'次级整流后低压侧输出滤波，为12V/48V系统提供稳定直流。需大容量低ESR，推荐NPX系列高分子固态电容。'},
      {name:'低压负载端旁路',icon:'electrical_services',desc:'ECU、传感器等负载就地旁路，抑制电源总线瞬态波动。推荐VKM系列SMD电容，9000h长寿命。'}
    ],
    'DC-AC逆变器': [
      {name:'直流母线支撑',icon:'electric_bolt',desc:'逆变器直流母线DC-Link电容，为IGBT/SiC模块提供瞬时大电流。需高耐压、低ESL、大纹波能力，推荐薄膜电容。'},
      {name:'开关吸收缓冲',icon:'speed',desc:'IGBT/SiC开关瞬间的浪涌吸收，需极低ESL和ESR。推荐薄膜电容就近安装于功率模块，降低开关损耗。'},
      {name:'输出滤波',icon:'filter_alt',desc:'逆变输出端的LC滤波器，滤除PWM载波高频分量。推荐薄膜电容配合电感组成低通滤波。'},
      {name:'控制电源滤波',icon:'developer_board',desc:'DSP/MCU控制板的辅助电源滤波，需小体积高可靠。推荐NPX系列贴片型电容。'}
    ],
    'EPS转向控制': [
      {name:'DC-Link储能',icon:'electric_bolt',desc:'EPS电机驱动的直流母线支撑电容，需在135℃高温下稳定工作。推荐LKL(R)系列135℃超高温电容。'},
      {name:'MCU供电滤波',icon:'memory',desc:'EPS主控MCU的电源滤波，对纹波敏感。需低ESR、高可靠性，推荐VKM系列AEC-Q200认证SMD电容。'},
      {name:'电机驱动旁路',icon:'motor',desc:'EPS电机H桥驱动回路的旁路电容，吸收开关噪声。推荐VHT系列固液混合电容。'},
      {name:'传感器信号滤波',icon:'sensors',desc:'扭矩/角度传感器的电源去耦，保证信号精度。推荐NPX系列超低ESR电容。'}
    ],
    '电机驱动': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'牵引电机逆变器DC-Link电容，需大容量高纹波。推荐VPG系列引线型电容和薄膜电容组合。'},
      {name:'门极驱动供电',icon:'flash_on',desc:'IGBT/SiC门极驱动器的隔离电源滤波，需高耐压小体积。推荐VHT系列贴片型电容。'},
      {name:'相电流检测滤波',icon:'speed',desc:'电机相电流采样的RC滤波，保证FOC控制精度。推荐NPX系列低ESR电容。'},
      {name:'旋变/编码器供电',icon:'settings_input_antenna',desc:'位置传感器供电去耦，需低噪声。推荐VKM系列SMD电容。'}
    ]
  },
  charge: {
    'OBC车载充电机': [
      {name:'AC输入滤波',icon:'power',desc:'电网侧的EMI滤波和PFC输入电容，需高耐压AC规格。推荐薄膜电容和VPG系列组合。'},
      {name:'PFC升压输出',icon:'trending_up',desc:'PFC升压后的DC-Link电容，400-500V高压。推荐CW3H系列牛角型电容，专为800V平台设计。'},
      {name:'DC-DC谐振电容',icon:'waves',desc:'LLC谐振变换器的谐振电容，需高频低损耗。推荐薄膜电容，低ESR高纹波。'},
      {name:'低压辅助电源',icon:'electrical_services',desc:'OBC控制板和通信模块的辅助电源滤波。推荐VKM系列贴片型电容。'}
    ],
    'DC-DC转换器': [
      {name:'高压输入滤波',icon:'power',desc:'400V/800V高压输入端滤波电容，吸收母线纹波。推荐CW3H系列牛角型电容。'},
      {name:'变压器原边',icon:'transform',desc:'全桥/半桥变换器原边直流支撑，提供瞬态大电流。推荐薄膜电容和LKD系列组合。'},
      {name:'同步整流输出',icon:'filter_alt',desc:'12V/48V输出端滤波，大电流低纹波要求。推荐VPG系列高纹波电容。'},
      {name:'控制IC供电',icon:'developer_board',desc:'PWM控制器和隔离驱动供电去耦。推荐NPX系列贴片电容。'}
    ],
    'BMS电池管理': [
      {name:'电池采样滤波',icon:'battery_horiz_075',desc:'单体电压/温度采样的RC滤波网络，需低漏电流。推荐VKM系列低漏电流SMD电容。'},
      {name:'均衡电路储能',icon:'balance',desc:'主动/被动均衡回路的储能与滤波电容。推荐VPT系列125℃贴片电容。'},
      {name:'绝缘检测供电',icon:'shield',desc:'高压绝缘监测电路的隔离电源滤波。推荐VHT系列固液混合电容。'},
      {name:'通信总线去耦',icon:'cell_tower',desc:'CAN/SPI通信接口的电源去耦，保证信号完整性。推荐NPX系列超低ESR电容。'}
    ]
  },
  safety: {
    '安全气囊': [
      {name:'备用电源储能',icon:'battery_charging_full',desc:'碰撞断电瞬间提供备用能量，确保ECU持续工作。需大容量低漏电流电容，推荐LK系列引线型AEC-Q200认证电容。'},
      {name:'MCU监控回路',icon:'monitor_heart',desc:'传感器信号采集与碰撞算法判定，对电源纹波敏感。需低ESR保证供电稳定性，推荐VKO系列贴片型电容。'},
      {name:'点火驱动回路',icon:'local_fire_department',desc:'ECU点火指令后瞬时释放大电流引爆气囊。需高纹波能力和极低内阻，推荐LK系列引线型电容。'},
      {name:'通信回路滤波',icon:'cell_tower',desc:'与ABS/ESC等ECU交换状态信息，需滤波抑制总线噪声。推荐VKO系列贴片型电容。'}
    ],
    'ABS防抱死系统': [
      {name:'泵电机驱动',icon:'motor',desc:'ABS液压泵电机的驱动回路支撑电容，需耐大纹波。推荐VKO系列大容量SMD电容。'},
      {name:'电磁阀控制',icon:'precision_manufacturing',desc:'高速电磁阀驱动的供电滤波，瞬态响应要求高。推荐VKM系列AEC-Q200电容。'},
      {name:'轮速传感器',icon:'sensors',desc:'轮速传感器信号调理电路的电源去耦。推荐NPX系列低ESR电容。'},
      {name:'ECU主供电',icon:'developer_board',desc:'ABS-ECU的主电源滤波，需高可靠性宽温范围。推荐VHT系列125℃电容。'}
    ],
    'EPS': [
      {name:'DC-Link储能',icon:'electric_bolt',desc:'EPS电机驱动直流母线支撑，135℃高温稳定。推荐LKL(R)系列超高温电容。'},
      {name:'MCU供电滤波',icon:'memory',desc:'EPS主控MCU电源滤波，纹波敏感需低ESR。推荐VKM系列AEC-Q200认证SMD电容。'},
      {name:'电机驱动旁路',icon:'motor',desc:'EPS电机H桥驱动回路旁路电容吸收开关噪声。推荐VHT系列固液混合电容。'},
      {name:'扭矩传感器',icon:'sensors',desc:'扭矩/角度传感器电源去耦保证信号精度。推荐NPX系列超低ESR电容。'}
    ],
    'one-box / ESC / EBS': [
      {name:'泵电机DC-Link',icon:'electric_bolt',desc:'ESC泵电机驱动的直流母线支撑，需大容量低ESR。推荐VKO系列3300μF大容量SMD电容。'},
      {name:'电磁阀驱动',icon:'precision_manufacturing',desc:'12路以上电磁阀的高速开关驱动滤波。推荐LKL(R)系列135℃高温电容。'},
      {name:'主控MCU供电',icon:'memory',desc:'多核MCU的core和IO供电去耦。推荐NPX系列超低ESR高分子固态电容。'},
      {name:'IMU传感器',icon:'sensors',desc:'6轴IMU惯性传感器的超低噪声供电。推荐VKM系列低漏电流电容。'}
    ]
  },
  adas: {
    '域控制器': [
      {name:'SoC核心供电',icon:'memory',desc:'自动驾驶域控大算力SoC的core供电，需超低ESR、大容量。推荐NPX系列高分子固态电容。'},
      {name:'DDR/LPDDR供电',icon:'database',desc:'高速内存VDD/VTT供电滤波，瞬态响应要求高。推荐VHT系列固液混合电容。'},
      {name:'SerDes供电',icon:'cable',desc:'摄像头/雷达高速串行接口的电源去耦。推荐NPX系列超小封装贴片电容。'},
      {name:'PMIC输入滤波',icon:'power',desc:'多路PMIC的12V输入滤波，需宽输入范围。推荐VKM系列SMD电容。'}
    ],
    '毫米波雷达': [
      {name:'RF前端供电',icon:'radar',desc:'77GHz MMIC的电源滤波，需超低噪声和高PSRR。推荐NPX系列超低ESR电容。'},
      {name:'VCO锁相环',icon:'frequency',desc:'压控振荡器PLL供电去耦，频率稳定至关重要。推荐MLCC+NPX电容组合。'},
      {name:'基带处理供电',icon:'memory',desc:'雷达信号处理DSP的core供电滤波。推荐VHT系列固液混合电容。'},
      {name:'CAN收发器',icon:'cell_tower',desc:'车辆通信总线接口的电源去耦。推荐VKM系列AEC-Q200电容。'}
    ],
    '摄像头模组': [
      {name:'图像传感器供电',icon:'camera',desc:'CMOS图像传感器的模拟和数字供电去耦，需超低噪声。推荐NPX系列超低ESR电容。'},
      {name:'LED补光驱动',icon:'light',desc:'红外LED/激光补光的脉冲驱动滤波。推荐VHT系列耐大纹波电容。'},
      {name:'串行器供电',icon:'cable',desc:'FPD-Link/GMSL串行器的供电滤波。推荐VKM系列小型SMD电容。'},
      {name:'镜头电机驱动',icon:'settings_suggest',desc:'自动对焦/光圈步进电机的驱动滤波。推荐NPX系列超小封装电容。'}
    ]
  },
  thermal: {
    '电子水泵/油泵': [
      {name:'BLDC驱动DC-Link',icon:'water_pump',desc:'水泵BLDC电机的直流母线支撑，135℃环境。推荐VHE系列135℃超高温混合电容。'},
      {name:'霍尔传感器供电',icon:'sensors',desc:'转子位置霍尔传感器的供电去耦。推荐VKM系列宽温SMD电容。'},
      {name:'MCU核心供电',icon:'memory',desc:'FOC控制MCU的电源滤波。推荐液态贴片SMD系列抗震电容。'},
      {name:'LIN通信接口',icon:'cell_tower',desc:'LIN总线收发器供电去耦。推荐NPX系列小型电容。'}
    ],
    '空调压缩机': [
      {name:'高压DC-Link',icon:'ac_unit',desc:'电动压缩机400V/800V直流母线支撑，高功率密度。推荐VHE系列135℃电容和薄膜电容。'},
      {name:'IPM模块吸收',icon:'speed',desc:'IPM智能功率模块的开关浪涌吸收。推荐薄膜电容靠近IPM安装。'},
      {name:'隔离驱动供电',icon:'flash_on',desc:'高压隔离栅极驱动器的供电滤波。推荐VHT系列固液混合电容。'},
      {name:'控制器供电',icon:'developer_board',desc:'压缩机控制器MCU和通信模块供电。推荐VKM系列SMD电容。'}
    ],
    '冷却风扇/鼓风机': [
      {name:'BLDC驱动滤波',icon:'fan',desc:'风扇BLDC电机的驱动回路支撑电容。推荐液态贴片SMD系列抗震大纹波电容。'},
      {name:'PWM调速滤波',icon:'speed',desc:'PWM调速信号的低通滤波。推荐VPG系列引线型电容。'},
      {name:'传感器供电',icon:'sensors',desc:'温度/转速传感器供电去耦。推荐VKM系列SMD电容。'},
      {name:'LIN/CAN通信',icon:'cell_tower',desc:'通信总线接口供电滤波。推荐NPX系列贴片电容。'}
    ],
    'PTC加热器': [
      {name:'高压DC-Link',icon:'heat',desc:'PTC加热器400V/800V直流母线支撑。推荐VHE系列135℃超高温电容。'},
      {name:'IGBT驱动滤波',icon:'flash_on',desc:'PTC功率控制IGBT的驱动供电滤波。推荐VHT系列固液混合电容。'},
      {name:'NTC温度采样',icon:'sensors',desc:'NTC热敏电阻分压采样的滤波电容。推荐VKM系列低漏电流电容。'},
      {name:'控制板供电',icon:'developer_board',desc:'PTC控制器MCU供电去耦。推荐NPX系列贴片电容。'}
    ]
  },
  cockpit: {
    '域控制器/HUD': [
      {name:'SoC核心供电',icon:'dashboard',desc:'座舱域控SoC和GPU的core供电，需超低ESR大电流。推荐NPX系列高分子固态电容。'},
      {name:'DDR内存供电',icon:'database',desc:'LPDDR4/5内存的VDD/VTT供电滤波。推荐VHT系列固液混合电容。'},
      {name:'HUD激光驱动',icon:'light',desc:'AR-HUD激光投影模块的脉冲驱动滤波。推荐NPX系列低ESR电容。'},
      {name:'电源管理PMIC',icon:'power',desc:'多路PMIC的输入输出滤波。推荐VKM系列SMD电容。'}
    ],
    '多媒体/T-BOX': [
      {name:'音频功放供电',icon:'speaker',desc:'Class-D音频功放的大电流纹波滤波。推荐VPG系列高纹波电容。'},
      {name:'4G/5G模块供电',icon:'cell_tower',desc:'蜂窝通信模块的PA突发电流支撑。推荐VHT系列固液混合电容。'},
      {name:'GNSS接收供电',icon:'gps_fixed',desc:'卫星定位接收器的低噪声供电去耦。推荐NPX系列超低ESR电容。'},
      {name:'蓝牙/WiFi供电',icon:'bluetooth',desc:'短距无线通信模块的电源滤波。推荐VKM系列SMD电容。'}
    ],
    '车窗/天窗/座椅': [
      {name:'电机驱动DC-Link',icon:'chair',desc:'座椅/车窗DC电机的驱动回路支撑。推荐液态贴片SMD系列抗震电容。'},
      {name:'防夹传感器',icon:'sensors',desc:'霍尔/电流传感器的信号调理滤波。推荐NPX系列贴片电容。'},
      {name:'LIN节点供电',icon:'cell_tower',desc:'LIN总线从节点的供电去耦。推荐VKM系列小体积SMD电容。'},
      {name:'加热丝驱动',icon:'heat',desc:'座椅加热PWM驱动的滤波电容。推荐VPG系列引线型电容。'}
    ]
  },
  lamp: {
    '前照大灯/LED': [
      {name:'LED驱动输入',icon:'light',desc:'LED恒流驱动的输入滤波，需宽压输入范围。推荐NPX系列超低ESR电容。'},
      {name:'Boost升压输出',icon:'trending_up',desc:'LED灯串升压驱动的输出滤波。推荐VHT系列125℃电容。'},
      {name:'矩阵控制供电',icon:'grid_on',desc:'ADB矩阵式大灯的像素级LED控制供电。推荐VKM系列SMD电容。'},
      {name:'CAN通信接口',icon:'cell_tower',desc:'前照灯ECU的CAN通信供电滤波。推荐NPX系列贴片电容。'}
    ],
    '刹车/转向/尾灯': [
      {name:'LED驱动滤波',icon:'emoji_objects',desc:'尾灯/转向灯LED驱动的输入滤波。推荐VKM系列AEC-Q200 SMD电容。'},
      {name:'PWM调光滤波',icon:'brightness_medium',desc:'PWM调光信号的平滑滤波。推荐VPG系列引线型电容。'},
      {name:'LIN通信供电',icon:'cell_tower',desc:'LIN总线灯光控制节点的供电去耦。推荐NPX系列贴片电容。'},
      {name:'诊断电路供电',icon:'monitor_heart',desc:'LED开路/短路诊断电路的供电滤波。推荐VKM系列低漏电流电容。'}
    ]
  },
  charger: {
    'AC-DC整流': [
      {name:'AC输入EMI',icon:'power',desc:'交流输入端的X/Y电容和共模滤波。推荐薄膜电容用于EMI抑制。'},
      {name:'PFC输出DC-Link',icon:'trending_up',desc:'PFC升压后的直流母线支撑，400-500V高压。推荐VPG系列引线型电容。'},
      {name:'整流桥吸收',icon:'speed',desc:'整流二极管反向恢复尖峰吸收。推荐薄膜电容小型化方案。'},
      {name:'辅助电源滤波',icon:'electrical_services',desc:'待机辅助电源的输入输出滤波。推荐LK系列长寿命电容。'}
    ],
    'DC-DC变换': [
      {name:'高压输入滤波',icon:'electric_bolt',desc:'400V/800V直流输入的母线滤波。推荐CW3H系列牛角型电容。'},
      {name:'LLC谐振电容',icon:'waves',desc:'LLC谐振变换器的高频谐振电容，低损耗。推荐LKD系列高压引线型电容。'},
      {name:'同步整流输出',icon:'filter_alt',desc:'低压大电流输出的滤波电容组。推荐VPG系列高纹波电容组。'},
      {name:'控制电路供电',icon:'developer_board',desc:'数字控制器的供电去耦。推荐NPX系列贴片电容。'}
    ]
  }
},

// ==================== AI服务器 ====================
aiserver: {
  cpu: {
    'GPU加速卡VRM': [
      {name:'12V输入滤波',icon:'power',desc:'GPU加速卡48V/12V输入的母线滤波，需大容量低ESR。推荐VHT/VHU系列固液混合电容，≤8mΩ。'},
      {name:'多相VRM输出',icon:'memory',desc:'GPU核心供电VRM的多相输出滤波，电流数百安。推荐NPX系列超低ESR高分子固态电容。'},
      {name:'GPU旁路电容',icon:'speed',desc:'GPU die附近的高频旁路去耦，抑制瞬态电压跌落。推荐MLCC+NPX组合。'},
      {name:'HBM供电',icon:'database',desc:'HBM高带宽内存的VDD供电滤波，需超低噪声。推荐NPX系列超低ESR电容。'}
    ],
    'CPU核心供电': [
      {name:'VRM输入滤波',icon:'power',desc:'CPU VRM 12V输入的大容量滤波，推荐VPG系列高纹波电容。'},
      {name:'Vcore输出滤波',icon:'memory',desc:'CPU核心电压的输出滤波组，超低ESR大容量。推荐NPX系列高分子固态电容。'},
      {name:'VCCIO供电滤波',icon:'developer_board',desc:'CPU IO电压的供电滤波。推荐VHT系列固液混合电容。'},
      {name:'时钟供电去耦',icon:'schedule',desc:'CPU时钟PLL的超低噪声供电去耦。推荐MLCC+NPX组合。'}
    ],
    'POL转换器': [
      {name:'输入滤波',icon:'power',desc:'POL转换器12V/5V输入的母线滤波。推荐NPX系列超低ESR电容。'},
      {name:'输出滤波',icon:'filter_alt',desc:'POL稳压输出的滤波，1.8V/1.2V等低压。推荐VHT系列固液混合电容。'},
      {name:'使能/软启电容',icon:'timer',desc:'POL IC的软启动和使能延时电容。推荐VKM系列小容量SMD电容。'},
      {name:'反馈补偿',icon:'tune',desc:'POL环路补偿网络电容，保证稳定性和瞬态响应。推荐NPX系列精密电容。'}
    ],
    '大电流输入滤波': [
      {name:'48V母线滤波',icon:'electric_bolt',desc:'48V中间总线的输入滤波电容组。推荐VPG系列大容量高纹波电容。'},
      {name:'热插拔缓冲',icon:'swap_horiz',desc:'热插拔控制器的浪涌电流缓冲电容。推荐CW3H系列牛角型电容。'},
      {name:'输入保险丝滤波',icon:' shield ',desc:'eFuse/热插拔后的输出滤波。推荐NPX系列超低ESR电容。'},
      {name:'均流电路',icon:'balance',desc:'并联均流电路的滤波与采样电容。推荐VHT系列固液混合电容。'}
    ]
  },
  mem: {
    'DDR5内存供电': [
      {name:'VDD供电滤波',icon:'database',desc:'DDR5内存1.1V VDD供电的大容量滤波。推荐VPT系列125℃贴片电容。'},
      {name:'VPP供电滤波',icon:'flash_on',desc:'DDR5 1.8V VPP供电的滤波电容。推荐VHT系列固液混合电容。'},
      {name:'VTT终端滤波',icon:'filter_alt',desc:'DDR5地址/命令线的VTT终端电压滤波。推荐NPX系列超低ESR电容。'},
      {name:'SPD供电去耦',icon:'memory',desc:'SPD EEPROM和温度传感器的供电去耦。推荐VKM系列SMD电容。'}
    ],
    'NVMe SSD电源': [
      {name:'3.3V输入滤波',icon:'storage',desc:'NVMe SSD 3.3V供电输入的大容量滤波。推荐VPL系列5000h长寿命电容。'},
      {name:'NAND供电滤波',icon:'memory',desc:'NAND Flash的VCC/VCCQ供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'控制器核心供电',icon:'developer_board',desc:'SSD主控的1.2V/1.8V核心供电滤波。推荐VHT系列固液混合电容。'},
      {name:'掉电保护储能',icon:'battery_charging_full',desc:'PLP掉电保护电路的大容量储能电容。推荐VPG系列大容量电容。'}
    ],
    'HBM内存供电': [
      {name:'VDD_HBM供电',icon:'database',desc:'HBM堆叠内存的1.2V供电滤波，超低噪声。推荐NPX系列超低ESR电容。'},
      {name:'PHY供电滤波',icon:'cable',desc:'HBM PHY物理层的供电去耦。推荐VHT系列固液混合电容。'},
      {name:'TSV供电去耦',icon:'vertical_align_center',desc:'硅通孔TSV互连的供电去耦网络。推荐MLCC+NPX组合。'},
      {name:'Interposer供电',icon:'grid_on',desc:'硅中介层供电网络的旁路电容。推荐NPX系列超小封装电容。'}
    ]
  },
  net: {
    '400G/800G光模块': [
      {name:'3.3V供电滤波',icon:'network_intelligence',desc:'光模块3.3V供电的大容量滤波。推荐NPX系列超低ESR电容。'},
      {name:'DSP供电去耦',icon:'memory',desc:'光模块DSP芯片的core/IO供电去耦。推荐VHT系列固液混合电容。'},
      {name:'激光器驱动供电',icon:'flash_on',desc:'EML/DML激光器驱动电路的供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'TIA供电滤波',icon:'sensors',desc:'跨阻放大器TIA的低噪声供电去耦。推荐VKM系列SMD电容。'}
    ],
    '以太网交换芯片': [
      {name:'Core供电滤波',icon:'router',desc:'交换芯片核心电压0.8V/1.0V的大电流供电滤波。推荐NPX系列超低ESR高分子固态电容。'},
      {name:'SerDes供电去耦',icon:'cable',desc:'高速SerDes接口的供电去耦网络。推荐MLCC+NPX组合。'},
      {name:'IO供电滤波',icon:'developer_board',desc:'交换芯片1.8V/3.3V IO供电滤波。推荐VHT系列固液混合电容。'},
      {name:'时钟供电去耦',icon:'schedule',desc:'交换芯片参考时钟的超低噪声供电。推荐VKM系列低漏电流电容。'}
    ],
    'PCIe/CXL接口': [
      {name:'3.3V/12V输入',icon:'cable',desc:'PCIe插槽供电的输入滤波。推荐VHT系列固液混合电容。'},
      {name:'Retimer供电',icon:'refresh',desc:'PCIe Retimer芯片的core/IO供电去耦。推荐NPX系列超低ESR电容。'},
      {name:'时钟Buffer供电',icon:'schedule',desc:'PCIe时钟缓冲器的供电滤波。推荐VKM系列SMD电容。'},
      {name:'热插拔控制',icon:'swap_horiz',desc:'PCIe热插拔控制器的浪涌保护电容。推荐VPG系列大容量电容。'}
    ]
  },
  aux: {
    '待机电源': [
      {name:'AC-DC输入滤波',icon:'electrical_services',desc:'待机电源的AC整流后高压滤波。推荐VPX系列耐大纹波经济型电容。'},
      {name:'Flyback输出滤波',icon:'filter_alt',desc:'反激变换器的输出电压滤波。推荐VP1系列-55~105℃通用型电容。'},
      {name:'反馈补偿',icon:'tune',desc:'反馈环路的补偿电容，保证待机电源稳定性。推荐VKM系列SMD电容。'},
      {name:'VCC供电滤波',icon:'power',desc:'PWM控制器VCC引脚的供电滤波。推荐NPX系列贴片电容。'}
    ],
    '风扇/散热控制': [
      {name:'12V风扇供电',icon:'fan',desc:'散热风扇12V供电的输入滤波。推荐VP1系列经济型电容。'},
      {name:'PWM调速滤波',icon:'speed',desc:'风扇PWM调速信号的低通滤波。推荐VPG系列引线型电容。'},
      {name:'转速传感器',icon:'sensors',desc:'风扇转速反馈信号的调理滤波。推荐NPX系列贴片电容。'},
      {name:'MCU供电去耦',icon:'developer_board',desc:'散热控制MCU的供电去耦。推荐VKM系列SMD电容。'}
    ],
    'BMC管理电源': [
      {name:'3.3V待机供电',icon:'settings',desc:'BMC 3.3V待机供电的滤波，需长期稳定。推荐VPT系列125℃贴片电容。'},
      {name:'1.2V核心供电',icon:'memory',desc:'BMC SoC核心电压的供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'ADC采样滤波',icon:'sensors',desc:'BMC电压/温度ADC采样的RC滤波。推荐VKM系列低漏电流电容。'},
      {name:'RTC后备供电',icon:'schedule',desc:'RTC实时时钟的电池后备超级电容。推荐VPX系列大容量电容。'}
    ]
  },
  pdn: {
    '400V/800V DC-Link': [
      {name:'整流后母线滤波',icon:'electric_bolt',desc:'AC整流后的400V/800V直流母线支撑电容组。推荐CW3H系列牛角型高压电容。'},
      {name:'均压电阻旁路',icon:'balance',desc:'串联电容均压电阻的高频旁路。推荐薄膜电容低ESL方案。'},
      {name:'母线放电电容',icon:'speed',desc:'安全放电回路的定时电容。推荐LK系列长寿命电容。'},
      {name:'电压采样滤波',icon:'sensors',desc:'直流母线电压采样调理电路滤波。推荐VKM系列SMD电容。'}
    ],
    '48V中间总线': [
      {name:'母线输入滤波',icon:'power_input',desc:'48V中间总线的输入端大容量滤波。推荐VPG系列高纹波电容。'},
      {name:'母线输出滤波',icon:'filter_alt',desc:'48V总线各分支的输出去耦。推荐VHT系列固液混合电容。'},
      {name:'热插拔保护',icon:'swap_horiz',desc:'48V热插拔/Hot-Swap控制器的保护电容。推荐VPG系列大容量电容。'},
      {name:'EMI滤波',icon:'shield',desc:'48V总线的共模/差模EMI滤波。推荐薄膜电容+磁珠组合。'}
    ],
    'SiC/IGBT吸收': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'SiC/IGBT模块直流端子的DC-Link支撑电容。推荐薄膜电容超低ESL方案。'},
      {name:'开关浪涌吸收',icon:'speed',desc:'SiC高速开关产生浪涌电压的吸收电容。推荐薄膜电容紧贴模块安装。'},
      {name:'栅极驱动供电',icon:'flash_on',desc:'隔离栅极驱动器的供电滤波。推荐VHT系列固液混合电容。'},
      {name:'温度采样滤波',icon:'sensors',desc:'SiC/IGBT NTC温度采样的滤波。推荐VKM系列SMD电容。'}
    ]
  }
},

// ==================== 储能 ====================
energy: {
  pv: {
    '组串式逆变器': [
      {name:'MPPT输入滤波',icon:'solar_power',desc:'光伏组串MPPT输入端的直流滤波电容。推荐CW3H系列牛角型高压电容。'},
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'逆变器直流母线DC-Link储能电容组。推荐CW3H系列高纹波长寿命电容。'},
      {name:'逆变输出滤波',icon:'filter_alt',desc:'逆变器交流输出端的LC滤波。推荐薄膜电容高频低损耗方案。'},
      {name:'辅助电源滤波',icon:'electrical_services',desc:'逆变器控制板和通信模块辅助电源滤波。推荐VPG系列引线型电容。'}
    ],
    '集中式逆变器': [
      {name:'直流汇流滤波',icon:'power',desc:'光伏阵列汇流后的高压直流母线滤波。推荐CW3H系列大容量牛角型电容。'},
      {name:'DC-Link电容组',icon:'electric_bolt',desc:'大功率集中式逆变器DC-Link电容组。推荐CW3H系列多并联方案。'},
      {name:'LCL滤波',icon:'filter_alt',desc:'并网LCL滤波器的电容，需高耐压。推荐薄膜电容方案。'},
      {name:'控制系统供电',icon:'developer_board',desc:'逆变器DSP控制板和PLC通信供电滤波。推荐VPG系列电容。'}
    ],
    '微型逆变器': [
      {name:'PV输入去耦',icon:'home',desc:'单块光伏板的输入去耦电容。推荐VPX系列耐大纹波电容。'},
      {name:'Flyback变压器',icon:'transform',desc:'微型逆变器反激变换器的输入支撑。推荐VPG系列引线型电容。'},
      {name:'输出EMI滤波',icon:'shield',desc:'微型逆变器交流输出EMI滤波。推荐薄膜电容X/Y电容。'},
      {name:'通信模块供电',icon:'cell_tower',desc:'PLC/WiFi通信模块的供电滤波。推荐VKM系列SMD电容。'}
    ],
    '储能混合逆变器': [
      {name:'PV侧DC-Link',icon:'battery_charging_full',desc:'光伏侧和储能侧的双向DC-Link支撑。推荐CW3H系列牛角型电容。'},
      {name:'电池侧滤波',icon:'battery_horiz_075',desc:'储能电池48V/400V侧的充放电滤波。推荐VPG系列高纹波电容。'},
      {name:'双向DC-DC',icon:'swap_horiz',desc:'双向DC-DC变换器的谐振/滤波电容。推荐薄膜电容高频低损耗。'},
      {name:'离网输出滤波',icon:'power',desc:'离网模式下交流输出的滤波电容组。推荐薄膜电容方案。'}
    ]
  },
  pcs: {
    '储能变流器PCS': [
      {name:'直流侧DC-Link',icon:'electric_bolt',desc:'储能电池直流侧的DC-Link支撑电容组。推荐CW3H系列牛角型高压电容。'},
      {name:'交流侧滤波',icon:'filter_alt',desc:'PCS交流侧并网滤波的LCL电容。推荐薄膜电容高耐压方案。'},
      {name:'预充电回路',icon:'flash_on',desc:'DC-Link预充电回路的限流与储能电容。推荐VPG系列大容量电容。'},
      {name:'控制电源滤波',icon:'developer_board',desc:'PCS控制器和通信模块供电滤波。推荐LK系列长寿命电容。'}
    ],
    'BMS电池管理': [
      {name:'单体采样滤波',icon:'battery_horiz_075',desc:'电池单体电压/温度采样的RC滤波。推荐VKM系列低漏电流电容。'},
      {name:'均衡回路',icon:'balance',desc:'主动/被动均衡回路的储能电容。推荐VPT系列125℃贴片电容。'},
      {name:'绝缘监测',icon:'shield',desc:'高压绝缘电阻检测电路的供电滤波。推荐VHT系列固液混合电容。'},
      {name:'通信接口',icon:'cell_tower',desc:'CAN/RS485通信接口的电源去耦。推荐NPX系列贴片电容。'}
    ],
    '能量管理系统': [
      {name:'EMS控制器供电',icon:'settings',desc:'EMS能量管理控制器的供电滤波。推荐VKM系列SMD电容。'},
      {name:'通信网关供电',icon:'router',desc:'Modbus/IEC61850通信网关的供电去耦。推荐NPX系列贴片电容。'},
      {name:'数据采集滤波',icon:'sensors',desc:'电表/传感器数据采集的调理滤波。推荐VKM系列低漏电流电容。'},
      {name:'RTC后备供电',icon:'schedule',desc:'实时时钟和数据存储的后备供电。推荐超级电容储能方案。'}
    ]
  },
  ups: {
    '在线式UPS': [
      {name:'整流DC-Link',icon:'power',desc:'UPS整流后的直流母线支撑电容组。推荐CW3H系列大容量牛角型电容。'},
      {name:'电池组滤波',icon:'battery_horiz_075',desc:'蓄电池组的直流滤波电容。推荐VPG系列高纹波电容。'},
      {name:'逆变输出滤波',icon:'filter_alt',desc:'UPS逆变输出端的LC滤波。推荐薄膜电容高频方案。'},
      {name:'旁路静态开关',icon:'swap_horiz',desc:'静态旁路开关的缓冲与滤波电容。推荐VPG系列大容量电容。'}
    ],
    '后备式UPS': [
      {name:'充电回路滤波',icon:'battery_charging_full',desc:'蓄电池充电回路的滤波电容。推荐VPG系列引线型电容。'},
      {name:'逆变DC-Link',icon:'electric_bolt',desc:'后备逆变器的直流母线支撑。推荐VPX系列经济型电容。'},
      {name:'切换电路',icon:'swap_horiz',desc:'市电/逆变切换电路的缓冲电容。推荐VPG系列大容量电容。'},
      {name:'控制供电',icon:'developer_board',desc:'UPS控制板的辅助电源滤波。推荐LK系列长寿命电容。'}
    ],
    '模块化UPS': [
      {name:'功率模块DC-Link',icon:'electric_bolt',desc:'各功率模块独立的DC-Link支撑电容。推荐CW3H系列牛角型电容。'},
      {name:'并联均流',icon:'balance',desc:'多模块并联均流电路的滤波电容。推荐VPG系列高纹波电容。'},
      {name:'系统控制器供电',icon:'settings',desc:'UPS系统级控制器的供电滤波。推荐VKM系列SMD电容。'},
      {name:'通信背板供电',icon:'router',desc:'模块间CAN/RS485通信的供电去耦。推荐NPX系列贴片电容。'}
    ]
  },
  bms: {
    '电池监测单元': [
      {name:'电压采集滤波',icon:'sensors',desc:'电池单体电压采集的RC滤波网络。推荐VKM系列低漏电流SMD电容。'},
      {name:'温度采集滤波',icon:'thermostat',desc:'NTC热敏电阻分压采样的滤波电容。推荐NPX系列贴片电容。'},
      {name:'隔离供电',icon:'flash_on',desc:'高压隔离DC-DC的输入输出滤波。推荐VHT系列固液混合电容。'},
      {name:'通信供电',icon:'cell_tower',desc:'菊花链isoSPI通信的供电去耦。推荐VKM系列小体积SMD电容。'}
    ],
    '均衡管理': [
      {name:'被动均衡电阻旁路',icon:'balance',desc:'被动均衡MOSFET开关的旁路电容。推荐VKM系列SMD电容。'},
      {name:'主动均衡储能',icon:'battery_charging_full',desc:'主动均衡电感的储能与滤波电容。推荐VPT系列125℃贴片电容。'},
      {name:'PWM驱动滤波',icon:'speed',desc:'均衡MOSFET PWM驱动的滤波。推荐NPX系列超低ESR电容。'},
      {name:'电流采样滤波',icon:'sensors',desc:'均衡电流检测的采样滤波。推荐VKM系列低漏电流电容。'}
    ],
    '热管理': [
      {name:'风扇驱动滤波',icon:'fan',desc:'BMS散热风扇的驱动供电滤波。推荐VP1系列-55~105℃电容。'},
      {name:'PTC加热控制',icon:'heat',desc:'低温环境下电池加热PTC的控制滤波。推荐VPG系列引线型电容。'},
      {name:'温度采样滤波',icon:'thermostat',desc:'多点温度传感器的采集滤波。推荐VKM系列SMD电容。'},
      {name:'MCU供电去耦',icon:'developer_board',desc:'BMS主控MCU的供电去耦。推荐NPX系列超低ESR电容。'}
    ]
  }
},

// ==================== 电机驱动 ====================
motor: {
  inverter: {
    '通用变频器': [
      {name:'整流DC-Link',icon:'settings',desc:'三相整流后的直流母线支撑电容组。推荐CW3H系列牛角型大容量电容。'},
      {name:'制动回路',icon:'speed',desc:'制动IGBT和制动电阻的缓冲电容。推荐VPG系列高纹波引线型电容。'},
      {name:'逆变输出滤波',icon:'filter_alt',desc:'逆变输出端的du/dt滤波和EMI抑制。推荐薄膜电容高频方案。'},
      {name:'控制板供电',icon:'developer_board',desc:'变频器DSP控制板和IO模块的供电滤波。推荐LK系列长寿命电容。'}
    ],
    '高压变频器': [
      {name:'输入变压器滤波',icon:'bolt',desc:'高压输入移相变压器的次级滤波。推荐CW3H系列高压牛角型电容。'},
      {name:'单元级DC-Link',icon:'electric_bolt',desc:'功率单元级联的独立DC-Link支撑电容。推荐薄膜电容方案。'},
      {name:'单元旁路',icon:'swap_horiz',desc:'功率单元故障旁路电路的缓冲电容。推荐VPG系列大容量电容。'},
      {name:'光纤通信供电',icon:'cell_tower',desc:'高压隔离光纤通信接口的供电去耦。推荐VKM系列SMD电容。'}
    ],
    '中压变频器': [
      {name:'多脉整流滤波',icon:'power',desc:'12/18脉整流后的直流滤波电容组。推荐CW3H系列牛角型电容。'},
      {name:'NPC三电平DC-Link',icon:'electric_bolt',desc:'NPC三电平逆变器上下母线电容。推荐CW3H系列均压电容组。'},
      {name:'中点电位平衡',icon:'balance',desc:'NPC逆变器中点电位平衡的支撑电容。推荐薄膜电容方案。'},
      {name:'驱动供电',icon:'flash_on',desc:'中压IGBT隔离驱动器的供电滤波。推荐VHT系列固液混合电容。'}
    ],
    '专用变频器': [
      {name:'专用DC-Link',icon:'precision_manufacturing',desc:'电梯/起重机等专用变频器DC-Link支撑。推荐VPG系列高纹波电容。'},
      {name:'抱闸控制',icon:'lock',desc:'电机制动抱闸控制的驱动滤波。推荐VPX系列耐大纹波电容。'},
      {name:'编码器供电',icon:'sensors',desc:'电机编码器的供电去耦和信号滤波。推荐VKM系列SMD电容。'},
      {name:'安全回路',icon:'shield',desc:'STO安全转矩关断回路的滤波电容。推荐NPX系列贴片电容。'}
    ]
  },
  servo: {
    '通用伺服': [
      {name:'整流DC-Link',icon:'settings',desc:'伺服驱动器整流后的直流母线支撑。推荐CW3H系列牛角型电容。'},
      {name:'制动吸收',icon:'speed',desc:'伺服电机制动能量回馈的吸收电容。推荐VPG系列高纹波电容。'},
      {name:'逆变输出滤波',icon:'filter_alt',desc:'伺服电机PWM驱动的输出滤波。推荐薄膜电容低ESL方案。'},
      {name:'编码器接口',icon:'sensors',desc:'绝对值编码器通信接口的供电滤波。推荐VKM系列SMD电容。'}
    ],
    '高端伺服': [
      {name:'共DC母线',icon:'electric_bolt',desc:'多轴共用直流母线的支撑电容。推荐CW3H系列大容量牛角型电容。'},
      {name:'轴模块DC-Link',icon:'power',desc:'单轴模块的独立DC-Link支撑电容。推荐薄膜电容超低ESL方案。'},
      {name:'EtherCAT通信',icon:'cell_tower',desc:'EtherCAT实时以太网通信供电去耦。推荐NPX系列贴片电容。'},
      {name:'功能安全供电',icon:'shield',desc:'SIL3功能安全回路的独立供电滤波。推荐VHT系列固液混合电容。'}
    ],
    '集成伺服': [
      {name:'一体化DC-Link',icon:'settings',desc:'电机与驱动器一体化的DC-Link支撑。推荐VPG系列小型引线型电容。'},
      {name:'散热管理滤波',icon:'fan',desc:'集成伺服的散热风扇供电滤波。推荐VP1系列经济型电容。'},
      {name:'传感器供电',icon:'sensors',desc:'集成编码器和温度传感器供电去耦。推荐VKM系列SMD电容。'},
      {name:'通信接口供电',icon:'cell_tower',desc:'CANopen/EtherCAT通信接口供电滤波。推荐NPX系列贴片电容。'}
    ]
  },
  stepper: {
    '两相步进': [
      {name:'DC-DC输入滤波',icon:'power',desc:'步进驱动器24V/48V直流输入的滤波电容。推荐VPG系列引线型电容。'},
      {name:'H桥驱动滤波',icon:'motor',desc:'两相H桥驱动的支撑与吸收电容。推荐VPG系列高纹波电容。'},
      {name:'电流采样滤波',icon:'sensors',desc:'相电流检测电阻的采样滤波。推荐NPX系列贴片电容。'},
      {name:'MCU供电去耦',icon:'developer_board',desc:'步进控制MCU的供电去耦。推荐VKM系列SMD电容。'}
    ],
    '五相步进': [
      {name:'输入滤波',icon:'power',desc:'五相步进驱动器的直流输入滤波。推荐VPG系列大容量电容。'},
      {name:'五相桥驱动',icon:'motor',desc:'五相H桥驱动的各相支撑电容。推荐VPG系列高纹波电容组。'},
      {name:'微步电流控制',icon:'tune',desc:'微步细分电流控制的采样滤波。推荐NPX系列超低ESR电容。'},
      {name:'控制供电',icon:'developer_board',desc:'五相步进控制器供电去耦。推荐VKM系列SMD电容。'}
    ],
    '闭环步进': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'闭环步进伺服化的DC-Link支撑电容。推荐VPG系列引线型电容。'},
      {name:'编码器供电',icon:'sensors',desc:'闭环步进编码器的供电和信号滤波。推荐VKM系列SMD电容。'},
      {name:'陷波滤波',icon:'filter_alt',desc:'机械谐振抑制的陷波滤波电容。推荐NPX系列贴片电容。'},
      {name:'通信接口供电',icon:'cell_tower',desc:'脉冲/RS485/EtherCAT接口供电滤波。推荐NPX系列超低ESR电容。'}
    ]
  },
  bldc: {
    '有感BLDC': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'BLDC驱动器直流母线支撑。推荐VPG系列高纹波引线型电容。'},
      {name:'三相桥驱动',icon:'motor',desc:'三相MOSFET桥驱动的支撑与吸收。推荐VPG系列大容量电容组。'},
      {name:'霍尔传感器供电',icon:'sensors',desc:'转子位置霍尔传感器的供电去耦。推荐VKM系列SMD电容。'},
      {name:'MCU供电滤波',icon:'developer_board',desc:'FOC/方波控制MCU供电滤波。推荐NPX系列贴片电容。'}
    ],
    '无感BLDC': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'无感BLDC的直流母线支撑。推荐VPG系列高纹波电容。'},
      {name:'反电动势检测',icon:'sensors',desc:'BEMF过零检测的分压滤波电容。推荐NPX系列精密电容。'},
      {name:'三相桥吸收',icon:'motor',desc:'MOSFET开关噪声的吸收电容。推荐薄膜电容+NPX组合。'},
      {name:'启动控制供电',icon:'developer_board',desc:'无感启动算法的MCU供电滤波。推荐VKM系列SMD电容。'}
    ],
    'FOC驱动': [
      {name:'DC-Link支撑',icon:'electric_bolt',desc:'FOC磁场定向控制的直流母线支撑。推荐VPG系列大容量电容。'},
      {name:'电流采样滤波',icon:'sensors',desc:'双/三电阻相电流采样的RC滤波。推荐NPX系列超低ESR电容。'},
      {name:'三相桥吸收',icon:'motor',desc:'SVPWM调制下的开关吸收电容。推荐薄膜电容+NPX组合。'},
      {name:'编码器/旋变供电',icon:'settings_input_antenna',desc:'位置传感器的激励和信号调理供电。推荐VKM系列SMD电容。'}
    ]
  }
},

// ==================== 仪器仪表 ====================
instrument: {
  precision: {
    '数字万用表': [
      {name:'电池输入滤波',icon:'speed',desc:'万用表电池供电的输入滤波和升压储能。推荐VKM系列低漏电流SMD电容。'},
      {name:'ADC基准滤波',icon:'sensors',desc:'高精度ADC电压基准的滤波和去耦。推荐NPX系列超低ESR电容。'},
      {name:'前端保护滤波',icon:'shield',desc:'输入过压保护电路的滤波电容。推荐LK系列长寿命电容。'},
      {name:'MCU供电去耦',icon:'developer_board',desc:'主控MCU和LCD驱动的供电去耦。推荐VKM系列SMD电容。'}
    ],
    '示波器': [
      {name:'前端放大器供电',icon:'graphic_eq',desc:'模拟前端放大器的超低噪声供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'ADC转换供电',icon:'transform',desc:'高速ADC的模拟和数字供电去耦。推荐MLCC+NPX组合。'},
      {name:'FPGA核心供电',icon:'memory',desc:'FPGA高速信号处理的核心供电滤波。推荐VHT系列固液混合电容。'},
      {name:'触发电路供电',icon:'schedule',desc:'触发比较器和时基电路的供电滤波。推荐VKM系列SMD电容。'}
    ],
    '频谱分析仪': [
      {name:'本振供电滤波',icon:'frequency',desc:'超低相位噪声本振的供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'混频器供电',icon:'settings_input_component',desc:'RF混频器的供电去耦和偏置滤波。推荐MLCC+NPX组合。'},
      {name:'中频放大器供电',icon:'filter_alt',desc:'IF中频放大器的低噪声供电滤波。推荐VKM系列低漏电流电容。'},
      {name:'DSP处理供电',icon:'memory',desc:'数字中频处理DSP的core供电滤波。推荐VHT系列固液混合电容。'}
    ],
    'LCR电桥': [
      {name:'正弦激励供电',icon:'waves',desc:'DDS正弦波激励源的供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'IV转换供电',icon:'transform',desc:'电流-电压转换放大器的供电去耦。推荐VKM系列低漏电流电容。'},
      {name:'相敏检波供电',icon:'tune',desc:'正交相敏检波器的供电滤波。推荐NPX系列贴片电容。'},
      {name:'MCU供电去耦',icon:'developer_board',desc:'主控MCU和LCD显示的供电滤波。推荐VKM系列SMD电容。'}
    ]
  },
  industrial: {
    '温度变送器': [
      {name:'4-20mA回路供电',icon:'thermostat',desc:'两线制4-20mA回路取电的储能和滤波。推荐LK系列长寿命低漏电流电容。'},
      {name:'ADC采样滤波',icon:'sensors',desc:'温度传感器ADC采样的RC滤波网络。推荐NPX系列精密电容。'},
      {name:'HART通信供电',icon:'cell_tower',desc:'HART调制解调器的供电滤波。推荐VKM系列SMD电容。'},
      {name:'隔离供电',icon:'flash_on',desc:'输入输出隔离DC-DC的滤波电容。推荐VHT系列固液混合电容。'}
    ],
    '压力传感器': [
      {name:'电桥激励供电',icon:'sensors',desc:'惠斯通电桥的恒压/恒流激励滤波。推荐VKM系列低漏电流电容。'},
      {name:'仪表放大器供电',icon:'settings_input_component',desc:'差分仪表放大器的供电去耦。推荐NPX系列超低ESR电容。'},
      {name:'温度补偿滤波',icon:'thermostat',desc:'温度补偿电路的滤波和采样电容。推荐NPX系列精密电容。'},
      {name:'输出驱动供电',icon:'power',desc:'4-20mA/0-10V输出驱动的供电滤波。推荐LK系列长寿命电容。'}
    ],
    '流量计': [
      {name:'励磁供电滤波',icon:'water',desc:'电磁流量计励磁线圈驱动的供电滤波。推荐VPG系列高纹波电容。'},
      {name:'电极信号调理',icon:'sensors',desc:'检测电极信号放大器的供电去耦。推荐NPX系列超低ESR电容。'},
      {name:'脉冲输出',icon:'speed',desc:'脉冲/频率输出驱动的供电滤波。推荐VKM系列SMD电容。'},
      {name:'通信供电',icon:'cell_tower',desc:'RS485/HART通信接口的供电去耦。推荐NPX系列贴片电容。'}
    ],
    'PLC控制': [
      {name:'24V输入滤波',icon:'power',desc:'PLC 24V电源输入的大容量滤波和浪涌保护。推荐VPG系列引线型电容。'},
      {name:'CPU模块供电',icon:'memory',desc:'PLC CPU模块的核心和IO供电滤波。推荐VKM系列SMD电容。'},
      {name:'模拟量模块供电',icon:'sensors',desc:'AI/AO模拟量模块的隔离供电滤波。推荐VHT系列固液混合电容。'},
      {name:'通信模块供电',icon:'router',desc:'Ethernet/IP PROFINET通信模块供电去耦。推荐NPX系列贴片电容。'}
    ]
  },
  medical: {
    '监护仪': [
      {name:'隔离电源滤波',icon:'monitor_heart',desc:'医疗级隔离DC-DC的输入输出滤波。推荐VHT系列固液混合电容。'},
      {name:'ECG前端供电',icon:'favorite',desc:'心电采集模拟前端的超低噪声供电。推荐NPX系列超低ESR电容。'},
      {name:'SpO2模块供电',icon:'sensors',desc:'血氧采集LED驱动和光电接收供电。推荐VKM系列低漏电流电容。'},
      {name:'NIBP气泵驱动',icon:'air',desc:'无创血压气泵电机的驱动和滤波。推荐VPG系列高纹波电容。'}
    ],
    '超声诊断': [
      {name:'高压发射供电',icon:'waves',desc:'超声探头高压发射脉冲的储能电容。推荐薄膜电容高压方案。'},
      {name:'接收前端供电',icon:'sensors',desc:'超声回波接收LNA的低噪声供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'波束合成FPGA供电',icon:'memory',desc:'数字波束合成FPGA的core供电滤波。推荐VHT系列固液混合电容。'},
      {name:'图像处理GPU供电',icon:'developer_board',desc:'超声图像处理GPU的大电流供电滤波。推荐NPX系列高分子固态电容。'}
    ],
    '生化分析': [
      {name:'步进电机驱动',icon:'motor',desc:'样本针/试剂针步进电机的驱动滤波。推荐VPG系列高纹波电容。'},
      {name:'光电检测供电',icon:'sensors',desc:'光度计光电检测电路的低噪声供电。推荐NPX系列超低ESR电容。'},
      {name:'温控系统供电',icon:'thermostat',desc:'反应盘恒温控制的加热/制冷供电滤波。推荐LK系列长寿命电容。'},
      {name:'主控系统供电',icon:'developer_board',desc:'生化仪主控计算机和通信供电滤波。推荐VKM系列SMD电容。'}
    ],
    'CT/MRI': [
      {name:'高压发生器滤波',icon:'flash_on',desc:'CT球管高压发生器的DC-Link储能电容。推荐CW3H系列牛角型高压电容。'},
      {name:'旋转部分供电',icon:'rotate_right',desc:'CT滑环旋转部件的供电滤波。推荐VPG系列高纹波电容。'},
      {name:'梯度放大器供电',icon:'waves',desc:'MRI梯度功率放大器的DC-Link支撑。推荐薄膜电容方案。'},
      {name:'RF功放供电',icon:'settings_input_antenna',desc:'MRI射频功放的供电滤波和储能。推荐VPG系列大容量电容组。'}
    ]
  },
  analytical: {
    '色谱仪': [
      {name:'泵电机驱动',icon:'water',desc:'HPLC高压泵电机的驱动和滤波。推荐VPG系列高纹波电容。'},
      {name:'检测器供电',icon:'sensors',desc:'UV/VIS/FLD检测器的低噪声供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'柱温箱控制',icon:'thermostat',desc:'色谱柱恒温箱的加热控制滤波。推荐LK系列长寿命电容。'},
      {name:'数据采集供电',icon:'developer_board',desc:'色谱数据工作站和通信供电滤波。推荐VKM系列SMD电容。'}
    ],
    '质谱仪': [
      {name:'真空泵驱动',icon:'air',desc:'涡轮分子泵和机械泵电机的驱动滤波。推荐VPG系列大容量电容。'},
      {name:'高压电源滤波',icon:'flash_on',desc:'离子源/质量分析器高压电源的滤波。推荐薄膜电容高压方案。'},
      {name:'检测器供电',icon:'sensors',desc:'电子倍增器/法拉第杯检测器供电滤波。推荐NPX系列精密电容。'},
      {name:'控制系统供电',icon:'developer_board',desc:'质谱仪主控和真空控制系统供电滤波。推荐VHT系列固液混合电容。'}
    ],
    '光谱仪': [
      {name:'光源供电滤波',icon:'light',desc:'氘灯/钨灯光源的稳流供电滤波。推荐VPG系列高纹波电容。'},
      {name:'CCD检测器供电',icon:'camera',desc:'线阵CCD/CMOS检测器的低噪声供电。推荐NPX系列超低ESR电容。'},
      {name:'光栅驱动',icon:'settings_suggest',desc:'扫描光栅步进电机的驱动滤波。推荐VPG系列引线型电容。'},
      {name:'数据处理供电',icon:'developer_board',desc:'光谱数据处理和通信模块供电滤波。推荐VKM系列SMD电容。'}
    ]
  }
},

// ==================== 消费类电子 ====================
consumer: {
  smartphone: {
    'PMIC电源管理': [
      {name:'电池输入滤波',icon:'power',desc:'锂电池3.7V输入的滤波和瞬态支撑。推荐NPX系列超低ESR高分子固态电容。'},
      {name:'Buck输出滤波',icon:'filter_alt',desc:'各DC-DC Buck输出的滤波电容。推荐NPX系列小型化贴片电容。'},
      {name:'LDO输出滤波',icon:'tune',desc:'多路LDO输出的去耦和噪声滤波。推荐VKM系列低漏电流SMD电容。'},
      {name:'充电管理滤波',icon:'battery_charging_full',desc:'USB PD快充回路的输入输出滤波。推荐VPT系列125℃贴片电容。'}
    ],
    'DC-DC转换器': [
      {name:'输入滤波',icon:'power',desc:'DC-DC转换器输入的母线滤波。推荐VHT系列固液混合电容，≤8mΩ。'},
      {name:'输出滤波',icon:'filter_alt',desc:'DC-DC输出的低纹波滤波电容组。推荐NPX系列超低ESR电容。'},
      {name:'自举电容',icon:'flash_on',desc:'半桥驱动器的自举供电电容。推荐VKM系列小容量SMD电容。'},
      {name:'补偿网络',icon:'tune',desc:'DC-DC反馈环路补偿电容。推荐NPX系列精密电容。'}
    ],
    '音频功放': [
      {name:'功放供电滤波',icon:'speaker',desc:'Class-D音频功放的大电流纹波滤波。推荐NPX系列超低ESR电容。'},
      {name:'电荷泵飞跨电容',icon:'flash_on',desc:'Class-H升压电荷泵的飞跨电容。推荐VKM系列SMD电容。'},
      {name:'输出LC滤波',icon:'filter_alt',desc:'扬声器输出端的EMI抑制LC滤波。推荐NPX系列贴片电容。'},
      {name:'偏置去耦',icon:'tune',desc:'音频编解码器模拟偏置的去耦电容。推荐NPX系列超低ESR电容。'}
    ],
    '快充电路': [
      {name:'输入滤波',icon:'battery_charging_full',desc:'USB PD快充适配器输入的滤波。推荐VPT系列125℃贴片电容。'},
      {name:'电荷泵飞跨电容',icon:'flash_on',desc:'双相电荷泵的飞跨储能电容。推荐VHT系列固液混合电容。'},
      {name:'输出滤波',icon:'filter_alt',desc:'快充输出至电池的滤波。推荐NPX系列超低ESR电容。'},
      {name:'OVP保护电容',icon:'shield',desc:'过压保护电路的定时与滤波电容。推荐VKM系列SMD电容。'}
    ]
  },
  wearable: {
    '智能手表PMIC': [
      {name:'电池滤波',icon:'watch',desc:'穿戴设备小容量电池的滤波和脉冲支撑。推荐NPX系列超小封装高分子电容。'},
      {name:'升压输出滤波',icon:'trending_up',desc:'Boost升压为OLED/传感器供电的输出滤波。推荐NPX系列低ESR电容。'},
      {name:'常开LDO滤波',icon:'power',desc:'Always-On LDO的超低功耗输出滤波。推荐VKM系列低漏电流电容。'},
      {name:'充电管理',icon:'battery_charging_full',desc:'无线/触点充电的输入滤波。推荐VKM系列SMD电容。'}
    ],
    'TWS耳机充电仓': [
      {name:'电池输入滤波',icon:'headphones',desc:'充电仓锂电池的输入滤波和升压储能。推荐VKM系列SMD电容。'},
      {name:'Boost升压输出',icon:'trending_up',desc:'5V升压为耳机充电的输出滤波。推荐NPX系列低ESR电容。'},
      {name:'霍尔开关去耦',icon:'sensors',desc:'开盖检测霍尔传感器的供电去耦。推荐VKM系列小体积SMD电容。'},
      {name:'LED指示供电',icon:'light',desc:'电量指示LED的驱动滤波。推荐NPX系列贴片电容。'}
    ],
    '传感器供电': [
      {name:'HR传感器LED驱动',icon:'sensors',desc:'心率检测绿光LED的脉冲驱动滤波。推荐NPX系列超低ESR电容。'},
      {name:'PPG AFE供电',icon:'favorite',desc:'光电容积描记模拟前端的超低噪声供电。推荐VKM系列低漏电流电容。'},
      {name:'加速度计供电',icon:'speed',desc:'6轴IMU加速度计/陀螺仪的供电去耦。推荐NPX系列超小封装电容。'},
      {name:'气压计供电',icon:'air',desc:'气压高度计的低噪声供电去耦。推荐VKM系列SMD电容。'}
    ],
    '电池管理BMS': [
      {name:'电量计滤波',icon:'battery_horiz_075',desc:'库仑计/电量计的电流采样滤波。推荐NPX系列精密电容。'},
      {name:'保护MOSFET驱动',icon:'shield',desc:'电池保护MOSFET的栅极驱动滤波。推荐VKM系列SMD电容。'},
      {name:'NTC温度采样',icon:'thermostat',desc:'电池NTC温度检测的分压滤波。推荐VKM系列低漏电流电容。'},
      {name:'无线充电整流',icon:'flash_on',desc:'无线充电接收线圈的整流滤波。推荐VPT系列贴片电容。'}
    ]
  },
  appliance: {
    '主控板电源滤波': [
      {name:'AC整流滤波',icon:'developer_board',desc:'家电主控板AC整流后的高压直流滤波。推荐VPG系列引线型大容量电容。'},
      {name:'Buck降压输出',icon:'filter_alt',desc:'非隔离Buck降压为MCU供电的输出滤波。推荐LK系列长寿命电容。'},
      {name:'继电器驱动滤波',icon:'power',desc:'继电器/电磁阀驱动回路的支撑电容。推荐VPG系列高纹波电容。'},
      {name:'MCU供电去耦',icon:'memory',desc:'家电MCU和触摸芯片的供电去耦。推荐VKM系列SMD电容。'}
    ],
    '变频电机驱动': [
      {name:'整流DC-Link',icon:'motor',desc:'变频电机驱动的直流母线支撑电容。推荐VPG系列高纹波电容。'},
      {name:'IPM模块吸收',icon:'speed',desc:'IPM智能功率模块的开关浪涌吸收。推荐薄膜电容+NPX组合。'},
      {name:'相电流采样',icon:'sensors',desc:'单电阻/三电阻相电流检测的滤波。推荐NPX系列超低ESR电容。'},
      {name:'霍尔传感器供电',icon:'settings_input_antenna',desc:'转子位置霍尔传感器的供电去耦。推荐VKM系列SMD电容。'}
    ],
    '显示面板供电': [
      {name:'背光LED驱动',icon:'display_settings',desc:'LED背光升压驱动的输入输出滤波。推荐NPX系列低ESR电容。'},
      {name:'TFT偏压供电',icon:'flash_on',desc:'TFT液晶面板VGH/VGL偏压的滤波。推荐VKM系列SMD电容。'},
      {name:'触摸屏供电',icon:'touch_app',desc:'电容触摸屏控制器的供电去耦。推荐NPX系列超低ESR电容。'},
      {name:'WiFi模块供电',icon:'wifi',desc:'智能显示WiFi通信模块的供电滤波。推荐VKO系列大容量SMD电容。'}
    ],
    '智能控制模块': [
      {name:'WiFi/Zigbee供电',icon:'smart_toy',desc:'智能家居无线通信模块的PA突发电流支撑。推荐NPX系列超低ESR电容。'},
      {name:'语音识别供电',icon:'mic',desc:'语音唤醒和识别芯片的供电滤波。推荐VHT系列固液混合电容。'},
      {name:'传感器融合供电',icon:'sensors',desc:'多传感器（温湿度/PM2.5/CO2）供电去耦。推荐VKM系列SMD电容。'},
      {name:'语音功放供电',icon:'speaker',desc:'智能音箱语音反馈功放的供电滤波。推荐VPG系列高纹波电容。'}
    ]
  },
  led: {
    'LED球泡灯驱动': [
      {name:'AC整流滤波',icon:'light',desc:'球泡灯AC整流后的直流滤波电容。推荐LK系列长寿命引线型电容。'},
      {name:'恒流输出滤波',icon:'filter_alt',desc:'LED恒流驱动输出端的纹波滤波。推荐VPG系列引线型电容。'},
      {name:'IC VCC供电',icon:'power',desc:'LED驱动IC的VCC引脚供电滤波。推荐VKM系列SMD电容。'},
      {name:'调光接口滤波',icon:'brightness_medium',desc:'PWM/可控硅调光接口的滤波电容。推荐LK系列低漏电流电容。'}
    ],
    'LED灯管/面板灯': [
      {name:'PFC输出滤波',icon:'light_group',desc:'有源PFC升压后的DC滤波电容。推荐VPG系列高纹波引线型电容。'},
      {name:'LLC谐振电容',icon:'waves',desc:'LLC半桥谐振变换器的谐振电容。推荐薄膜电容高频低损耗。'},
      {name:'次级整流滤波',icon:'filter_alt',desc:'次级同步整流后的输出滤波。推荐LK系列长寿命电容。'},
      {name:'辅助供电滤波',icon:'electrical_services',desc:'待机辅助电源的输入输出滤波。推荐VKM系列SMD电容。'}
    ],
    'LED路灯/户外': [
      {name:'浪涌保护滤波',icon:'outdoor_lamp',desc:'户外防雷击浪涌的SPD配合滤波电容。推荐CW3H系列牛角型高压电容。'},
      {name:'PFC+LLC滤波',icon:'power',desc:'大功率路灯驱动的PFC和LLC滤波。推荐LK系列400V高压电容。'},
      {name:'恒流输出滤波',icon:'filter_alt',desc:'多路LED恒流输出的滤波。推荐VPG系列高纹波电容。'},
      {name:'智能调光供电',icon:'settings_remote',desc:'NB-IoT/LoRa无线调光模块的供电滤波。推荐VKM系列SMD电容。'}
    ],
    '智能照明控制': [
      {name:'Zigbee/BLE供电',icon:'settings_remote',desc:'智能照明无线通信模块的供电滤波。推荐NPX系列超低ESR电容。'},
      {name:'传感器供电',icon:'sensors',desc:'光照/人体红外传感器的供电去耦。推荐VKM系列低漏电流电容。'},
      {name:'LED驱动控制',icon:'light',desc:'多通道LED恒流驱动的控制供电滤波。推荐VKM系列SMD电容。'},
      {name:'电池备份供电',icon:'battery_charging_full',desc:'应急照明电池备份的充放电滤波。推荐NPX系列贴片电容。'}
    ]
  }
}

  }; // end DB

  // pageKey 映射：页面tab → DB中的key
  var PAGE_MAP = {
    'automotive': 'automotive',
    'aiserver': 'aiserver',
    'energy': 'energy',
    'motor': 'motor',
    'instrument': 'instrument',
    'consumer': 'consumer'
  };

  function getModules(tabKey, subAppName) {
    var url = window.location.href;
    var pageKey = 'automotive';
    if (url.indexOf('ai-server')>=0) pageKey = 'aiserver';
    else if (url.indexOf('energy-storage')>=0) pageKey = 'energy';
    else if (url.indexOf('motor-drive')>=0) pageKey = 'motor';
    else if (url.indexOf('instrument')>=0) pageKey = 'instrument';
    else if (url.indexOf('consumer')>=0) pageKey = 'consumer';
    var dbKey = PAGE_MAP[pageKey];
    if (!dbKey || !DB[dbKey]) return _defaultModules(subAppName);
    var tab = DB[dbKey][tabKey];
    if (!tab) return _defaultModules(subAppName);
    return tab[subAppName] || _defaultModules(subAppName);
  }
  function _defaultModules(name) {
    return [
      {name:'输入滤波',icon:'power',desc:name+'的电源输入端需滤波电容以抑制纹波与噪声，保证后续电路稳定工作。请参阅对应产品系列推荐。'},
      {name:'储能/旁路',icon:'battery_charging_full',desc:name+'的储能与旁路电容提供瞬态电流支持，减小电源总线波动。请参阅对应产品系列推荐。'},
      {name:'输出滤波',icon:'filter_alt',desc:name+'的输出端需滤波电容以平滑电压波形，确保负载端获得纯净电源。请参阅对应产品系列推荐。'},
      {name:'保护/去耦',icon:'shield',desc:name+'的去耦与保护电容吸收高频噪声和电压尖峰，保障系统EMC合规与长期可靠性。请参阅对应产品系列推荐。'}
    ];
  }

  // ===== 规格级推荐数据（Style 2 — 详细料号表） =====
  var SPECS = {power: {
    smps: {
        '开关电源-AC输入': [{series:'VPG',pn:'VPGJ1951H122MVTM',voltage:'50V',cap:'1200µF',size:'18×19.5',esr:'0.03Ω',ripple:'4650mA',life:'2000H',note:'引线型 高纹波'},
            {series:'CW3H',pn:'CW3H 500V/470µF',voltage:'500V',cap:'470µF',size:'35×50',esr:'0.15Ω',ripple:'3800mA',life:'3000H',note:'牛角型 DC-Link'}
        ],
        '开关电源-DC输出': [{series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 超低ESR'},
            {series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 长寿命'}
        ]
    },
    ups: {
        'UPS-逆变模块': [{series:'CW3H',pn:'CW3H 500V/1000µF',voltage:'500V',cap:'1000µF',size:'35×63',esr:'0.10Ω',ripple:'5200mA',life:'3000H',note:'牛角型 DC-Link'},
            {series:'VPG',pn:'VPGJ1951H122MVTM',voltage:'50V',cap:'1200µF',size:'18×19.5',esr:'0.03Ω',ripple:'4650mA',life:'2000H',note:'引线型 高纹波'}
        ]
    },
    pd: {
        'PD快充-初级侧': [{series:'VPG',pn:'VPGJ1951H122MVTM',voltage:'50V',cap:'1200µF',size:'18×19.5',esr:'0.03Ω',ripple:'4650mA',life:'2000H',note:'引线型 高纹波'}],
        'PD快充-次级侧': [{series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 超低ESR'}]
    }
},
robotics: {
    servo: {
        '伺服驱动器': [{series:'VHT',pn:'VHTC0771H470MV',voltage:'50V',cap:'47µF',size:'6.3×7.7',esr:'40mΩ',ripple:'1100mA',life:'125℃4000H',note:'固液混合 AEC-Q200'},
            {series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 超低ESR'}
        ],
        '编码器接口': [{series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 长寿命 AEC-Q200'}]
    },
    joint: {
        '关节电机驱动': [{series:'VHT',pn:'VHTC0771H470MV',voltage:'50V',cap:'47µF',size:'6.3×7.7',esr:'40mΩ',ripple:'1100mA',life:'125℃4000H',note:'固液混合 小型化'}]
    },
    control: {
        '机器人控制器': [{series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 超低ESR'}],
        '传感器模块': [{series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 长寿命'}]
    }
},
drone: {
    fc: {
        '飞控主板': [{series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 小尺寸'},
            {series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 长寿命'}
        ],
        'IMU传感器': [{series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 低漏电流'}]
    },
    esc: {
        '无刷电调': [{series:'VHT',pn:'VHTC0771H470MV',voltage:'50V',cap:'47µF',size:'6.3×7.7',esr:'40mΩ',ripple:'1100mA',life:'125℃4000H',note:'固液混合 高纹波'},
            {series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 超低ESR'}
        ]
    },
    video: {
        '图传模块': [{series:'NPX',pn:'NPXC0700J561MJTM',voltage:'6.3V',cap:'560µF',size:'6.3×7',esr:'8mΩ',ripple:'4800mA',life:'2000H',note:'固态 低ESR'}],
        '通信模块': [{series:'VKM',pn:'VKMC1001H680MVTM',voltage:'50V',cap:'68µF',size:'10×10',esr:'0.12Ω',ripple:'420mA',life:'9000H',note:'SMD 长寿命'}]
    }
},

    automotive: {
      'mainDrive': {
        '电机控制器-MCU': [
          {series:'VHT',pn:'—',voltage:'35V',cap:'120µF',size:'6.3×7.7',esr:'35mΩ',ripple:'1400mA',life:'125℃ 4000H',note:'[固液]P05 · Nichicon ZC/ZK · Panasonic GYA/GYE'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'150µF',size:'8×10.5',esr:'27mΩ',ripple:'1600mA',life:'125℃ 4000H',note:'[固液]P05 · Panasonic ZT/ZKU · Chemi-Con HXJ'},
        ],
        'DC-DC转换器': [
          {series:'VHT',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P06 · Nichicon GYA/GYE · Panasonic ZC/ZK'},
          {series:'VHU',pn:'—',voltage:'35V',cap:'270µF',size:'10×10.5',esr:'20mΩ',ripple:'2000mA',life:'135℃ 4000H',note:'[固液]P06 · Nichicon GYC · Panasonic ZS/ZU'},
        ],
        'BMS电池管理': [
          {series:'VHT',pn:'—',voltage:'35V',cap:'22µF',size:'6.3×5.8',esr:'60mΩ',ripple:'900mA',life:'125℃ 4000H',note:'[固液]P12 · Nichicon GYA/GYE'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'47µF',size:'6.3×5.8',esr:'60mΩ',ripple:'900mA',life:'125℃ 4000H',note:'[固液]P12 · Nichicon GYF · Panasonic ZSU'},
          {series:'VHU',pn:'—',voltage:'35V',cap:'47µF',size:'6.3×5.8',esr:'60mΩ',ripple:'1000mA',life:'135℃ 4000H',note:'[固液]P12 · Nichicon GYC'},
        ],
      },
      'safety': {
        '刹车制动-BS': [
          {series:'VHT',pn:'—',voltage:'35V',cap:'100µF',size:'6.3×7.7',esr:'35mΩ',ripple:'1400mA',life:'125℃ 4000H',note:'[固液]P08 · Nichicon ZC/ZK'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'150µF',size:'8×8.5',esr:'35mΩ',ripple:'1400mA',life:'125℃ 4000H',note:'[固液]P08 · Panasonic GYA/GYE'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P08 · Chemi-Con HXJ · Panasonic ZSU'},
          {series:'VHT',pn:'—',voltage:'80V',cap:'82µF',size:'10×10.5',esr:'35mΩ',ripple:'1200mA',life:'125℃ 4000H',note:'[固液]P08 · 高压型'},
          {series:'VHU',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'135℃ 4000H',note:'[固液]P08 · Nichicon GYC · Panasonic ZS/ZU'},
          {series:'VHU',pn:'—',voltage:'50V',cap:'150µF',size:'10×13',esr:'19mΩ',ripple:'2250mA',life:'135℃ 4000H',note:'[固液]P08 · Nichicon GYC · Chemi-Con HXE/HXF'},
        ],
        '电子助力转向-EPS': [
          {series:'VKL',pn:'—',voltage:'35V',cap:'100µF',size:'6.3×7.7',esr:'0.48Ω',ripple:'240mA',life:'125℃ 2000H',note:'[液态]P04贴片 · Nichicon UUB/ULT · Panasonic MVH'},
          {series:'VMM',pn:'—',voltage:'50V',cap:'47µF',size:'6.3×7.7',esr:'0.68Ω',ripple:'200mA',life:'105℃ 2000H',note:'[液态]P04贴片 · Nichicon UWT/UWX · Panasonic MVE'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P09贴片 · Chemi-Con HXA/HXC'},
          {series:'VHT',pn:'—',voltage:'35V',cap:'390µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P09贴片 · Nichicon GYF'},
          {series:'LKL(R)',pn:'—',voltage:'50V',cap:'1300µF',size:'16×25',esr:'0.055Ω',ripple:'2500mA',life:'135℃ 3000H',note:'[液态]P04引线 · Nichicon UWJ'},
          {series:'LKL(R)',pn:'—',voltage:'50V',cap:'2400µF',size:'18×35.5',esr:'0.029Ω',ripple:'3210mA',life:'135℃ 3000H',note:'[液态]P04引线'},
          {series:'LKL(R)',pn:'—',voltage:'50V',cap:'3000µF',size:'18×35.5',esr:'0.034Ω',ripple:'3390mA',life:'135℃ 3000H',note:'[液态]P04引线 · Nichicon UBW/UBY'},
          {series:'LKL(R)',pn:'—',voltage:'63V',cap:'2700µF',size:'18×40',esr:'0.028Ω',ripple:'4100mA',life:'135℃ 3000H',note:'[液态]P04引线 · Chemi-Con GPD/GVD'},
        ],
        '安全气囊': [
          {series:'LK',pn:'—',voltage:'25V',cap:'4400µF',size:'16×20',esr:'0.030Ω',ripple:'2000mA',life:'105℃ 8000H',note:'[液态]P05引线 · Nichicon UPW/UPM'},
          {series:'LK',pn:'—',voltage:'35V',cap:'3300µF',size:'18×25',esr:'0.045Ω',ripple:'3600mA',life:'105℃ 8000H',note:'[液态]P05引线 · Chemi-Con LBV/LBG'},
          {series:'LK',pn:'—',voltage:'35V',cap:'5600µF',size:'18×25',esr:'0.035Ω',ripple:'2000mA',life:'105℃ 8000H',note:'[液态]P05引线'},
          {series:'LK',pn:'—',voltage:'35V',cap:'10000µF',size:'18×40',esr:'0.020Ω',ripple:'3800mA',life:'105℃ 8000H',note:'[液态]P05引线'},
        ],
        '车窗控制器': [
          {series:'LKL(R)',pn:'—',voltage:'35V',cap:'470µF',size:'10×20',esr:'0.65Ω',ripple:'780mA',life:'135℃ 3000H',note:'[液态]P05引线 · Nichicon UBW/UBY'},
          {series:'LKL(R)',pn:'—',voltage:'35V',cap:'1200µF',size:'12.5×20',esr:'0.57Ω',ripple:'2215mA',life:'135℃ 3000H',note:'[液态]P05引线 · Chemi-Con HGX'},
        ],
      },
      'thermal': {
        '电子水泵/油泵': [
          {series:'VHT',pn:'—',voltage:'25V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P10 · Nichicon GYA/GYE'},
          {series:'VHT',pn:'—',voltage:'25V',cap:'470µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P10 · Nichicon GYF'},
          {series:'VHU',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'135℃ 4000H',note:'[固液]P10 · Nichicon GYC'},
          {series:'VHR',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'25mΩ',ripple:'900mA',life:'150℃ 2000H',note:'[固液]P10 · Nichicon GYD · Panasonic ZE/ZF'},
          {series:'LKG',pn:'—',voltage:'450V',cap:'56µF',size:'12.5×35',esr:'1.82Ω',ripple:'1200mA',life:'105℃ 12000H',note:'[液态]P08引线'},
        ],
        '空调压缩机控制器': [
          {series:'VHT',pn:'—',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'2800mA',life:'125℃ 4000H',note:'[固液]P11'},
          {series:'VHT',pn:'—',voltage:'50V',cap:'220µF',size:'10×13',esr:'20mΩ',ripple:'2400mA',life:'125℃ 4000H',note:'[固液]P11 · Panasonic ZKU/ZSU'},
          {series:'VHM',pn:'—',voltage:'35V',cap:'560µF',size:'10×13',esr:'16mΩ',ripple:'3200mA',life:'125℃ 4000H',note:'[固液]P11 · 大容量低ESR'},
          {series:'NHT',pn:'—',voltage:'35V',cap:'1200µF',size:'12.5×20',esr:'16mΩ',ripple:'4500mA',life:'125℃ 4000H',note:'[固液]P11 · 超大容量'},
        ],
      },
    },
    aiserver: {
      'cpu': {
        '图形处理器-GPU、中央处理器 CPU': [
          {series:'MPS',pn:'MPS561M0ED19003R',voltage:'2.5V',cap:'560µF',size:'7.3×4.3×1.9',esr:'3mΩ',ripple:'10200mA',life:'105℃ 2000H',note:'[AI]P08 · 叠层高分子 · 超低ESR'},
          {series:'MPD19',pn:'MPD561M0DD194R5R',voltage:'2V',cap:'560µF',size:'7.3×4.3×1.9',esr:'4.5mΩ',ripple:'8500mA',life:'105℃ 2000H',note:'[AI]P08 · 叠层高分子'},
          {series:'MPD19',pn:'MPD821M0DD194R5R',voltage:'2V',cap:'820µF',size:'7.3×4.3×2.8',esr:'4.5mΩ',ripple:'8500mA',life:'105℃ 2000H',note:'[AI]P08 · 叠层高分子 · 最大容量'},
        ],
        'DC-DC转换器': [
          {series:'NPC',pn:'NPCC0570E561MJTM',voltage:'2.5V',cap:'560µF',size:'6.3×5.7',esr:'10mΩ',ripple:'3500mA',life:'105℃ 2000H',note:'[AI]P09 · 高分子固态引线型'},
          {series:'NPC',pn:'NPCD0800E102MJTM',voltage:'2.5V',cap:'1000µF',size:'8×8',esr:'7mΩ',ripple:'6100mA',life:'105℃ 2000H',note:'[AI]P09 · 高分子固态 · 大容量'},
          {series:'VPC',pn:'VPCC0580E561MVTM',voltage:'2.5V',cap:'560µF',size:'6.3×5.8',esr:'10mΩ',ripple:'3500mA',life:'105℃ 2000H',note:'[AI]P09 · 高分子固态贴片型'},
        ],
      },
      'aux': {
        '主供电源-低压输出端': [
          {series:'TPB19',pn:'TPB470M1CB19100RN',voltage:'16V',cap:'47µF',size:'3.5×2.8×1.9',esr:'100mΩ',ripple:'1100mA',life:'105℃ 2000H',note:'[AI]P10 · 导电高分子钽 · 超小封装'},
          {series:'TQD19',pn:'TQB101M1CD19100RN',voltage:'16V',cap:'100µF',size:'7.3×4.3×1.9',esr:'100mΩ',ripple:'1400mA',life:'105℃ 2000H',note:'[AI]P10 · 导电高分子钽'},
        ],
        '主供电源-高压输入端': [
          {series:'IDC3',pn:'IDC32W102MNNXS09S2',voltage:'450V',cap:'1000µF',size:'30×60',esr:'301mΩ',ripple:'1960mA',life:'105℃ 3000H',note:'[AI]P13 · 液态基板自立型'},
          {series:'IDC3',pn:'IDC32W162MNNXG03S2',voltage:'450V',cap:'1600µF',size:'30×80',esr:'188mΩ',ripple:'3140mA',life:'105℃ 3000H',note:'[AI]P13 · 液态基板自立型'},
          {series:'LKF',pn:'LKFJ3552W121MF',voltage:'450V',cap:'120µF',size:'18×35.5',esr:'310mΩ',ripple:'1900mA',life:'105℃ 10000H',note:'[AI]P13 · 液态引线型 · 长寿命'},
        ],
        'BBU备用电源': [
          {series:'LKF',pn:'LKFE3001V182VF',voltage:'35V',cap:'1800µF',size:'10×30',esr:'30mΩ',ripple:'2900mA',life:'105℃ 10000H',note:'[AI]P17 · 液态引线型'},
          {series:'LKF',pn:'LKFL4001V422VF',voltage:'35V',cap:'4200µF',size:'12.5×40',esr:'29mΩ',ripple:'4700mA',life:'105℃ 10000H',note:'[AI]P17 · 液态引线型 · 超大容量'},
        ],
      },
      'mem': {
        'SSD企业级固态硬盘': [
          {series:'LKF',pn:'LKFE3001V182VF',voltage:'35V',cap:'1800µF',size:'10×30',esr:'30mΩ',ripple:'2900mA',life:'105℃ 10000H',note:'[AI]P17 · 液态引线型'},
        ],
        '数据存储盘': [
          {series:'LKF',pn:'LKFL4001V422VF',voltage:'35V',cap:'4200µF',size:'12.5×40',esr:'29mΩ',ripple:'4700mA',life:'105℃ 10000H',note:'[AI]P17 · 液态引线型 · 超大容量'},
        ],
      },
    },
    energy: {
      'pv': {
        '逆变器': [
          {series:'CW3',pn:'CW32H471MNNAS06',voltage:'550V',cap:'330µF',size:'35×45',esr:'—',ripple:'—',life:'105℃ 3000H',note:'[储能]P06 · 基板自立型'},
        ],
        '定日镜': [
          {series:'CW3',pn:'CW32H471MNNAS07',voltage:'550V',cap:'470µF',size:'35×50',esr:'—',ripple:'—',life:'105℃ 3000H',note:'[储能]P06 · 基板自立型'},
        ],
      },
      'pcs': {
        '变流器': [
          {series:'MDP',pn:'—',voltage:'600-1600V',cap:'20~2000µF',size:'—',esr:'≤1~5.5mΩ',ripple:'60~500A',life:'105-125℃ 10000H',note:'[储能]P10 · 薄膜电容插针式'},
          {series:'CW3',pn:'CW32V122MNNAS07',voltage:'350V',cap:'1200µF',size:'35×50',esr:'—',ripple:'—',life:'105℃ 3000H',note:'[储能]P13 · 基板自立型'},
          {series:'LKM',pn:'LKML2501H102MF',voltage:'50V',cap:'1000µF',size:'12.5×25',esr:'—',ripple:'—',life:'105℃ 10000H',note:'[储能]P13 · 引线型'},
        ],
      },
      'bms': {
        '电池管理系统-BMS': [
          {series:'VKM',pn:'VKMJ1650J562MVT',voltage:'6.3V',cap:'5600µF',size:'18×16.5',esr:'—',ripple:'—',life:'105℃ 10000H',note:'[储能]P07 · 贴片型'},
          {series:'VKO(R)',pn:'VKO(R)L1601E102',voltage:'25V',cap:'1000µF',size:'12.5×16',esr:'—',ripple:'—',life:'105℃ 5000H',note:'[储能]P07 · 贴片型'},
          {series:'VHT',pn:'VHTE1051V331MVC',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'—',life:'125℃ 4000H',note:'[储能]P16 · 固液混合'},
        ],
      },
    },
    motor: {
      'inverter': {
        '智慧出行': [
          {series:'LKE',pn:'LKES2502A331MF',voltage:'100V',cap:'330µF',size:'13×25',esr:'0.066Ω',ripple:'1620mA',life:'105℃ 10000H',note:'[电机]P06 · 引线型 · 电动工具'},
          {series:'LKE',pn:'LKES2002K151MF',voltage:'120V',cap:'150µF',size:'13×20',esr:'0.093Ω',ripple:'1368mA',life:'105℃ 10000H',note:'[电机]P06 · 引线型'},
        ],
      },
      'servo': {
        '机器人': [
          {series:'LK',pn:'OLK12002A561MF',voltage:'100V',cap:'560µF',size:'16×20',esr:'0.030Ω',ripple:'2100mA',life:'105℃ 8000H',note:'[电机]P06 · 引线型'},
          {series:'LK',pn:'OLKM2002A122MF',voltage:'100V',cap:'1200µF',size:'25×20',esr:'0.022Ω',ripple:'2900mA',life:'105℃ 8000H',note:'[电机]P06 · 引线型 · 大容量'},
        ],
      },
      'stepper': {
        '无人机': [
          {series:'VHT',pn:'VHTC0771V101MVC',voltage:'35V',cap:'100µF',size:'6.3×7.7',esr:'35mΩ',ripple:'—',life:'125℃ 4000H',note:'[电机]P16 · 固液混合'},
          {series:'VHT',pn:'VHTE1051V331MVC',voltage:'35V',cap:'330µF',size:'10×10.5',esr:'20mΩ',ripple:'—',life:'125℃ 4000H',note:'[电机]P16 · 固液混合'},
        ],
      },
      'bldc': {
        '电动工具': [
          {series:'VKM',pn:'VKMB1001A221MV',voltage:'10V',cap:'220µF',size:'5×10',esr:'0.53Ω',ripple:'—',life:'105℃ 7000H',note:'[电机]P16 · 贴片型'},
          {series:'VKM',pn:'VKMI1701E222MV',voltage:'25V',cap:'2200µF',size:'16×17',esr:'0.068Ω',ripple:'—',life:'105℃ 10000H',note:'[电机]P16 · 贴片型'},
        ],
      },
      'thermal2': {
        '汽车热管理': [
          {series:'VHT',pn:'VHTC0771E101MVC',voltage:'25V',cap:'100µF',size:'6.3×7.7',esr:'30mΩ',ripple:'—',life:'125℃ 4000H',note:'[电机]P16 · 固液混合'},
          {series:'VHT',pn:'VHTD1051H820MVC',voltage:'50V',cap:'82µF',size:'8×10.5',esr:'30mΩ',ripple:'—',life:'125℃ 4000H',note:'[电机]P16 · 固液混合'},
        ],
      },
      'home': {
        '智能家电': [
          {series:'VHT',pn:'VHTD1051H820MVC',voltage:'50V',cap:'82µF',size:'8×10.5',esr:'30mΩ',ripple:'—',life:'125℃ 4000H',note:'[电机]P16 · 固液混合'},
        ],
      },
    },
    instrument: {
      'precision': {
        '智能电表': [
          {series:'SDL(G)',pn:'SDLG2R7L1050812',voltage:'2.7V',cap:'1F',size:'8×11.5',esr:'160mΩ',ripple:'—',life:'-40~85℃',note:'[仪器]P06 · 双电层超级电容'},
        ],
        '载波模块': [
          {series:'SDL(G)',pn:'SDLG2R7L5051020',voltage:'2.7V',cap:'5F',size:'10×20',esr:'60mΩ',ripple:'—',life:'-40~85℃',note:'[仪器]P06 · 双电层超级电容'},
        ],
        '集中器': [
          {series:'SDL(G)',pn:'SDLG2R7L1561325',voltage:'2.7V',cap:'15F',size:'12.5×25',esr:'25mΩ',ripple:'—',life:'-40~85℃',note:'[仪器]P07 · 双电层超级电容'},
        ],
        '新融合终端': [
          {series:'SDL(G)',pn:'SDLG2R7L1561325',voltage:'2.7V',cap:'15F',size:'12.5×25',esr:'25mΩ',ripple:'—',life:'-40~85℃',note:'[仪器]P07 · 双电层超级电容'},
        ],
        'DTU (配电自动化终端)': [
          {series:'VKO',pn:'VKOD1001C471MVTM',voltage:'16V',cap:'470µF',size:'8×10',esr:'—',ripple:'—',life:'-55~105℃ 8000H',note:'[仪器]P08 · 贴片型'},
        ],
        '开关电源': [
          {series:'VMM',pn:'VMML1351E102MVTM',voltage:'25V',cap:'1000µF',size:'12.5×13.5',esr:'—',ripple:'—',life:'-55~105℃ 8000H',note:'[仪器]P08 · 贴片型'},
        ],
        '断路器': [
          {series:'VKM',pn:'VKMC1201E221MVTM',voltage:'25V',cap:'220µF',size:'6.3×12',esr:'—',ripple:'—',life:'-55~105℃ 7000H',note:'[仪器]P08 · 贴片型'},
        ],
      },
      'industrial': {
        '智能燃气表': [
          {series:'NPL',pn:'NPLC1001C471MJTM',voltage:'16V',cap:'470µF',size:'6.3×10',esr:'10mΩ',ripple:'—',life:'-55~105℃ 5000H',note:'[仪器]P12 · 高分子固态'},
          {series:'NPL',pn:'NPLD1401C102MJTM',voltage:'16V',cap:'1000µF',size:'8×14',esr:'8mΩ',ripple:'—',life:'-55~105℃ 5000H',note:'[仪器]P12 · 高分子固态 · 大容量'},
        ],
      },
      'medical': {
        '智能水表、热量表': [
          {series:'VKM',pn:'VKMC1202G3R9MVTM',voltage:'400V',cap:'3.9µF',size:'6.3×12',esr:'—',ripple:'—',life:'-40~105℃ 9000H',note:'[仪器]P11 · 贴片型 · 医疗电源'},
          {series:'VKM',pn:'VKMD1002W3R3MVTM',voltage:'450V',cap:'3.3µF',size:'8×10',esr:'—',ripple:'—',life:'-40~105℃ 10000H',note:'[仪器]P11 · 贴片型 · 高压'},
          {series:'LKJ',pn:'LKJE1601H221MF',voltage:'50V',cap:'220µF',size:'10×16',esr:'0.12Ω',ripple:'—',life:'-55~105℃ 10000H',note:'[仪器]P11 · 引线型 · 长寿命'},
        ],
      },
    },
    consumer: {
      'smartphone': {
        'PD快充-高压输入端': [
          {series:'KCX',pn:'—',voltage:'400-450V',cap:'15~150µF',size:'7×15~14.5×27',esr:'—',ripple:'—',life:'—',note:'[消费]P03 · 液态高压小型化 · PD快充专用'},
          {series:'LKM',pn:'—',voltage:'400-500V',cap:'2.2~47µF',size:'5×11~12.5×25',esr:'—',ripple:'—',life:'105℃ 10000H',note:'[消费]P03 · 液态引线型 · 行业最小尺寸'},
        ],
        'PD快充-PWM供电': [
          {series:'L3M',pn:'—',voltage:'10-100V',cap:'4.7~220µF',size:'4×7~4×11',esr:'—',ripple:'—',life:'—',note:'[消费]P03 · 液态贴片型 · 超低压小体积'},
          {series:'NPX',pn:'—',voltage:'2.5-25V',cap:'47~1000µF',size:'5×5.8~8×10.5',esr:'≤10mΩ',ripple:'—',life:'105℃ 2000H',note:'[消费] · 高分子固态 · 超低ESR'},
        ],
      },
      'led': {
        'LED驱动电源': [
          {series:'LKM',pn:'—',voltage:'400-500V',cap:'22~47µF',size:'10×10~12.5×25',esr:'—',ripple:'—',life:'105℃ 10000H',note:'[消费] · 液态引线型 · 长寿命'},
          {series:'LKG',pn:'—',voltage:'250-600V',cap:'8.2~56µF',size:'10×20~14.5×27',esr:'—',ripple:'—',life:'105℃ 12000H',note:'[消费] · 液态引线型 · 超长寿命'},
        ],
      },
    },
  };
  function getSpecs(pageKey, tabKey, subAppName) {
    if (!SPECS[pageKey]) return null;
    var tab = SPECS[pageKey][tabKey];
    if (!tab) return null;
    return tab[subAppName] || null;
  }

  return { getModules: getModules, getSpecs: getSpecs };
})();