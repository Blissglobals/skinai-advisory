import type { Dictionary } from "./ko";
import type { DeepPartial } from "../deepMerge";

const zhCN: DeepPartial<Dictionary> = {
  meta: {
    title: "SkinAI Advisory",
    description: "AI驱动的个人化肌肤诊断与保养信息服务",
  },

  home: {
    badge: "SkinAI Advisory",
    heading1: "只需一张照片",
    heading2: "立即了解你的肌肤状态",
    subtitle: "AI会分析脸部轮廓与肤质纹理,并提供一般性的保养信息。",
    steps: [
      "1. 免费基础扫描",
      "2. 选择想改善的项目",
      "3. 部位精密扫描",
      "4. 查看综合报告",
    ],
    cta: "免费开始扫描",
    footnote: "本服务仅提供一般信息,并非医学诊断。",
  },

  consent: {
    badge: "开始前须知",
    heading: "开始前请先确认以下内容",
    notices: [
      "本服务的分析结果会因拍摄环境(光线、角度、相机性能)而有准确度上的差异。",
      "本服务并非医疗器械,不执行诊断、处方等医疗行为。分析结果为AI分析所得,并非专科医师或专家的意见,不代表医学上的判断。",
      "无论分析结果为何,若肌肤出现异常症状,请务必咨询皮肤科专科医师。",
      "拍摄的照片仅在此设备(浏览器)内进行分析,不会传送至服务器或被存储。",
      "报告中提及的疗程、成分相关信息仅为一般性信息提供,并非推荐特定医院或疗程。",
    ],
    agree: "我已确认以上所有内容并同意。",
    start: "开始检测",
  },

  scan: {
    stepLabels: ["扫描", "选择目标", "深度分析", "解决方案"],
    needOptions: {
      elasticity: "弹力/松弛",
      pigment: "色素/斑点",
      pore: "毛孔/肤质",
      wrinkle: "皱纹",
    },
    focusLabel: {
      pore: "毛孔",
      wrinkle: "皱纹",
      pigment: "色素",
      elasticity: "弹力",
    },
    cameraPreparing: "相机尚在准备中,请稍后再试一次。",
    analysisError: "分析过程中发生错误,请重新拍摄。",
    retakeNeeded: "需要重新拍摄",
    retakeButton: "重新拍摄",
    retryingNotice: "照片状态不佳,将重新拍摄。",
    persistentFailureTitle: "照片状态持续不佳",
    proceedAnyway: "仍要继续",
    proceedAnywayHint: "准确度可能会较低。",

    step1: {
      badge: "STEP 1 · 免费扫描",
      heading: "请将脸部对准引导框",
      hintPrefix: "对准引导线后,将会",
      hintAuto: "自动",
      hintSuffix: "拍摄。",
      guideLabel: "全脸扫描",
      analyzing: "分析中...",
      captureNow: "立即拍摄",
    },

    step2: {
      badge: "STEP 2 · 选择目标",
      heading: "初步扫描结果",
      toneLabel: "肤色(费兹派翠克分类)",
      symmetryLabel: "左右对称",
      point: "分",
      fitzScaleLabel: "费兹派翠克量表(仅供参考)",
      fitzScaleSuffix: "此为根据照片推估的结果,可能与实际紫外线反应有所不同。",
      ageRangeLabel: "推估肌肤年龄",
      undertoneLabel: "肤底色调(仅供参考)",
      personalColorLabel: "个人色彩推估(仅供参考)",
      personalColorSuffix: "建议通过专业诊断确认精确的个人色彩分析结果。",
      ageInputLabel: "请输入年龄,以便进行同龄比较",
      agePlaceholder: "例如:28",
      ageRequired: "请先输入年龄才能进入下一步。",
      needPrompt: "请选择想改善的部位",
      next: "下一步",
    },

    step3: {
      badge: "STEP 3 · 部位深度扫描",
      heading: "请让整张脸都对齐引导框",
      focusPrefix: "AI将以",
      focusSuffix: "为中心进行自动分析。",
      hintPrefix: "对准引导线后,将会",
      hintAuto: "自动",
      hintSuffix: "拍摄。",
      guideLabelSuffix: "精密分析",
      analyzing: "分析中...",
      captureNow: "立即拍摄",
    },

    step4: {
      badge: "STEP 4 · 综合报告 · 预览模式",
      headingPrefix: "综合肌肤评分",
      headingSuffix: "分",
      outOf10: "(满分10分)",
      previewNotice: "在接入付款功能之前,将直接为您显示完整报告。",
      lowConfidence: "拍摄照片不够精确,误差可能性较高",
      percentilePrefix: "岁群组中排名前",
      percentileSuffix: "%",
      percentileDisclaimer:
        "此排名仅供娱乐参考,并非根据实际用户统计数据。未来累积足够数据后,将改以真实统计为基础更新。",
      worstBadge: "最需要改善",
      bestBadge: "表现最佳",
      procedureLabel: "疗程建议:",
      cosmeticLabel: "保养品建议:",
      methodologyToggle: "这个分数是如何计算的?",
      methodology: [
        "· 脸部轮廓、左右对称:使用Google MediaPipe Face Landmarker(468个脸部特征点识别模型)分析脸部结构。",
        "· 毛孔(双颊)、色素(双颊+额头)、皱纹(眼周+额头+法令纹):将各部位分别裁切后,计算亮度变异、边缘密度与色彩偏差,再取平均值,为自主开发的图像分析逻辑。",
        "· 弹力:将下颚线特征点的下垂程度,换算为相对于脸部长度的比例。",
        "· 推估年龄:使用另一套脸部识别与年龄推估深度学习模型(TinyFaceDetector + AgeGenderNet)计算。",
        "· 拍摄前会先确认光线亮度与色偏,并依用户亲自调整确认的数值校正白平衡后再进行分析。",
        "· 个人色彩(暖色调/冷色调系列)是根据测得的亮度与底色调组合而成的简易推估值。",
        "· 拍摄当下并非仅撷取单一画面,而是在约0.4秒内测量多个画面并取平均值,以降低晃动或瞬间噪声的影响。",
        "· 肤色是将色彩数值转换为CIE Lab色彩空间后计算ITA(个体分型角),再依费兹派翠克量表(以紫外线反应为基准的皮肤科学分类标准)进行分类。",
        "· 若照片过暗、光线色偏过于严重,或脸部识别不稳定,系统将引导重新拍摄,而非自动校正。",
        "· 同龄层比较排名为娱乐性质的推估值,并非根据实际用户统计数据。",
        "· 从5个画面中排除离群值(最大值、最小值)后计算分数,并采用曲线型计分方式,使极端测量值也不会直接落在0分,而是平缓收敛。",
        "· 各项目的说明文字是依分数区间与其他项目的相对位置组合而成,每次拍摄都会依结果而有所不同。",
      ],
      methodologyFootnote:
        "* 本指标仅供参考,并非医疗器械等级的精密诊断。年龄推估可能存在平均误差,分数也可能因光线与角度而有所变动。",
    },
  },

  camera: {
    brightnessGood: "良好",
    brightnessLow: "偏暗",
    brightnessMeasuring: "测量中",
    instructionCountdownSuffix: "秒后将通过面部识别自动拍摄。",
    instructionHint: "请让脸部完整填满画面中央的虚线框。",
    alignedLabel: "对齐完成 · 拍摄中",
    lightingLabel: "光线",
    calibrationHintDefault: "正在确认光线...",
  },

  lighting: {
    dark: "光线过暗,请移动到更明亮的地方。",
    yellowCast: "目前光线偏黄,请尝试在白光下拍摄。",
    blueCast: "目前光线偏蓝,请尝试在自然光下拍摄。",
    good: "光线适中。",
  },

  cameraStream: {
    permissionError: "无法访问相机,请确认浏览器权限设置。",
  },

  analysisMessages: {
    cameraNotReady: "相机尚在准备中,请稍后再试一次。",
    faceNotDetected: "无法清楚识别脸部,请重新拍摄。",
    tooDark: "照片过暗,请在明亮处重新拍摄。",
    colorCastSevere: "光线色偏过于严重,难以准确分析,请在其他光源下重新拍摄。",
    videoOnly: "目前的引擎仅支持视频画面输入。",
    ageFallback: {
      early20s: "约20岁初期程度(推估失败,仅供参考)",
      late20sEarly30s: "约20岁后期至30岁初期程度(推估失败,仅供参考)",
      mid30s: "约30岁中后期程度(推估失败,仅供参考)",
      forties: "约40多岁程度(推估失败,仅供参考)",
      lateForties: "约40岁后期以上程度(推估失败,仅供参考)",
    },
    ageRangeUnderTen: "未满10岁推估(约{age}岁)",
    ageRangeDecade: "{decade}多岁推估(约{age}岁)",
  },

  fitzpatrick: {
    I: {
      label: "类型 I",
      hint: "肤色非常白皙,对紫外线较敏感,容易晒伤。",
    },
    II: {
      label: "类型 II",
      hint: "肤色白皙,对紫外线较为敏感。",
    },
    III: {
      label: "类型 III",
      hint: "肤色中等,对紫外线会逐渐适应。",
    },
    IV: {
      label: "类型 IV",
      hint: "肤色偏深,对紫外线的耐受度较高。",
    },
    V: {
      label: "类型 V",
      hint: "肤色深,对紫外线的耐受度高。",
    },
    VI: {
      label: "类型 VI",
      hint: "肤色非常深,对紫外线的耐受度非常高。",
    },
  },

  undertone: {
    warm: {
      label: "暖色调",
      hint: "带黄色调的底色,通常适合金色、珊瑚色系。",
    },
    cool: {
      label: "冷色调",
      hint: "带蓝色调的底色,通常适合银色、玫瑰色系。",
    },
    neutral: {
      label: "中性色调",
      hint: "不偏向暖色调或冷色调任一方的中间底色。",
    },
  },

  personalColor: {
    spring_warm: {
      label: "春季暖色调(Spring)",
      hint: "通常适合明亮、鲜艳的暖色调系列。",
      palette: ["#F4A261", "#F6C85F", "#F7E1B5", "#E76F51"],
    },
    autumn_warm: {
      label: "秋季暖色调(Autumn)",
      hint: "通常适合沉稳、具深度感的暖色调系列。",
      palette: ["#8A5A2B", "#B08040", "#6B4226", "#C9A66B"],
    },
    summer_cool: {
      label: "夏季冷色调(Summer)",
      hint: "通常适合柔和、明亮的冷色调系列。",
      palette: ["#B39CD0", "#F4C2C2", "#A7C7E7", "#C9CBD3"],
    },
    winter_cool: {
      label: "冬季冷色调(Winter)",
      hint: "通常适合鲜明、对比强烈的冷色调系列。",
      palette: ["#1D1D1D", "#FFFFFF", "#C8102E", "#4B4E9E"],
    },
    neutral: {
      label: "中性(判定不明显)",
      hint: "未明显偏向暖色调或冷色调任一方,能够驾驭多种色调。",
      palette: ["#C9C4B8", "#A9A9A9", "#D9CBB8", "#8C8C8C"],
    },
  },

  metrics: {
    pore: {
      label: "毛孔",
      description: "测量双颊部位肤质纹理的均匀度。",
    },
    wrinkle: {
      label: "皱纹",
      description: "测量眼周、额头、法令纹等容易出现表情纹部位的边缘密度。",
    },
    pigment: {
      label: "色素",
      description: "测量双颊与额头部位的色彩均匀度(色素偏差)。",
    },
    elasticity: {
      label: "弹力",
      description: "通过下颚线的下垂程度推估肌肤弹力。",
    },
  },

  solutions: {
    pore: {
      procedureInfo:
        "以改善毛孔纹理为目的的疗程,常见的有促进皮肤再生的皮肤保养针(skin booster)、点阵激光等。",
      cosmeticInfo: "含有烟酰胺、BHA(水杨酸)成分的产品常用于毛孔纹理保养。",
    },
    wrinkle: {
      procedureInfo:
        "以改善皱纹为目的,常见的疗程类型包括肉毒杆菌素、丽珠兰/PN皮肤保养针等。",
      cosmeticInfo: "含有A醇、多肽成分的产品常用于皱纹保养。",
    },
    pigment: {
      procedureInfo:
        "以改善色素沉淀为目的,常见的疗程类型包括嫩肤激光、脉冲光(IPL)等。",
      cosmeticInfo: "含有维生素C、熊果素、烟酰胺成分的产品常用于色素保养。",
    },
    elasticity: {
      procedureInfo:
        "以改善弹力为目的,常见的疗程类型包括射频(RF)、超声波(HIFU)提升疗程。",
      cosmeticInfo: "含有胶原蛋白、腺苷成分的乳霜常用于弹力保养。",
    },
  },

  solutionDisclaimer:
    "本信息仅为一般成分/疗程机制介绍,并非推荐特定医疗机构或疗程,亦不提供医学诊断。疗程相关决定请务必咨询专科医师后再进行。",

  scenario: {
    tierText: {
      pore: {
        low: "双颊整体毛孔明显扩张,肤质纹理较不均匀。皮脂分泌旺盛或角质堆积时会更加明显。持续的角质管理与舒缓保养会有帮助。",
        midLow:
          "双颊观察到部分毛孔略微扩张。通常集中在特定部位(主要是鼻侧或脸颊中央)。搭配轻度角质保养与保湿,有助于改善。",
        midHigh:
          "双颊毛孔状态相对良好,未见明显异常。不过此部位可能会因季节或身体状况而暂时变化。维持目前的保养习惯,并注意防晒即可。",
        high: "双颊毛孔紧致细致,肤质纹理相当光滑。这可能是肌肤屏障稳定维持的信号。建议继续维持目前的保养方式。",
      },
      wrinkle: {
        low: "眼周、额头与法令纹部位可观察到明显的细纹。可能是表情习惯、长期紫外线曝晒与水分不足等因素共同造成。同时做好保湿与防晒,有助于减缓其发展速度。",
        midLow:
          "眼周或额头处可见部分细纹。若仅在做表情时才明显,很可能还属于初期阶段。从现在开始加强保湿与眼周专用保养会有帮助。",
        midHigh:
          "眼周与额头纹路维持得相对稳定。法令纹部位也没有太大变化,状态尚可。在目前的保养习惯中持续加强保湿即可。",
        high: "眼周、额头、法令纹线条平滑,几乎观察不到皱纹。这是肌肤弹力与水分平衡维持良好的信号。建议继续维持目前的保养方式。",
      },
      pigment: {
        low: "双颊与额头部位的色调差异明显,色素沉淀较为显著。可能是紫外线曝晒或发炎后色素沉淀所致。建议以防晒为优先,并搭配美白机能性成分会有帮助。",
        midLow:
          "双颊或额头部分区域观察到色调差异。目前看来还是尚未扩散的局部阶段。搭配防晒持续保养,有助于防止扩散。",
        midHigh:
          "双颊与额头的肤色相对均匀。没有明显的色素沉淀,维持得相当稳定。像现在这样持续做好防晒即可。",
        high: "双颊与额头的肤色非常均匀明亮。这是色素管理得当的信号。建议继续维持目前的防晒习惯。",
      },
      elasticity: {
        low: "下颚线明显观察到松弛现象,怀疑弹力有所下降。可能是胶原蛋白减少或肌肉松弛所致。搭配弹力保养成分与提升护理会有帮助。",
        midLow:
          "下颚线观察到些微松弛。看起来还处于初期阶段,依保养方式不同,发展速度也会有所差异。持续使用含弹力成分的产品会有帮助。",
        midHigh:
          "下颚线弹力维持得相对稳定,没有明显松弛,状态尚可。在目前的保养习惯中加入弹力护理即可。",
        high: "下颚线条紧致,弹力表现良好。这可能是胶原蛋白密度维持良好的信号。建议继续维持目前的保养方式。",
      },
    },
    overallPattern: {
      0: "四项指标皆表现良好,整体肌肤状态稳定。",
      1: "大部分指标表现良好,只需留意其中一项即可。",
      2: "部分指标需要改善,但整体而言相当均衡。",
      3: "多项指标都需要留意保养,建议制定优先顺序逐步处理。",
      4: "整体上都需要加强保养,建议先从基础保养开始逐步进行。",
    },
    interactionText: "特别是{worst}项目相对需要留意,而{best}则维持得很稳定。",
  },
};

export default zhCN;
