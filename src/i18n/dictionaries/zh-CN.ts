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
      "1. 选择在意的肌肤困扰",
      "2. 拍摄一张面部照片",
      "3. 查看结果",
    ],
    cta: "免费开始扫描",
    footnote: "本服务仅提供一般信息,并非医学诊断。",
    privacyNote: "照片只在本设备上分析，不会被保存到任何地方。",
  },

  // 초안: 법률 검토 전입니다.(ko.ts privacy 번역).
  privacy: {
    title: "隐私政策",
    effectiveDate: "施行日期：2026年10月21日",
    intro:
      "블리스글로벌스 주식회사（外国人患者招揽业登记号 A-2025-01-01-06361，以下简称“本公司”）运营皮肤分析服务，以及首尔皮肤诊所咨询・预约说明服务（以下简称“本服务”）。本政策说明本公司如何处理您的个人信息。",
    sections: [
      {
        heading: "1. 处理的个人信息与处理方式",
        body: [
          "· 皮肤分析：摄像头画面、分析分数及您输入的年龄，只在您的设备（浏览器）内处理，不会发送到本公司服务器，也不会被保存。",
          "· LINE咨询：只有在您点击“LINE免费咨询”按钮并主动发送消息时，本公司才会通过LINE官方账号获取您的LINE显示名称、头像、LINE用户标识符、您发送的消息内容（感兴趣的项目、皮肤困扰、分析分数摘要等），以及咨询过程中您提供的信息（来韩行程、希望去的诊所等）。",
          "· 添加或屏蔽LINE官方账号时，LINE用户标识符可能会留在服务运行记录（服务器日志）中。",
          "· 访问本服务时，托管服务商会处理IP地址、访问时间、浏览器信息等访问记录。",
        ],
      },
      {
        heading: "2. 使用目的",
        body: [
          "回复咨询、介绍合作诊所与代办预约、提供翻译等来韩便利服务，以及维护服务稳定与安全。只有在您另行同意时，才会向您发送服务资讯。",
        ],
      },
      {
        heading: "3. 保存期限与销毁",
        body: [
          "咨询相关信息自咨询结束之日起保存1年，期满后立即销毁。您要求删除时，除非法律规定须保存，否则会立即销毁。服务器日志在30天内删除。",
        ],
      },
      {
        heading: "4. 向第三方提供",
        body: [
          "进行预约时，会在征得您的同意后，将姓名、联系方式、希望的项目和到访日期提供给相应的合作诊所。未经您同意，不会向第三方提供。",
        ],
      },
      {
        heading: "5. 委托处理与跨境传输",
        body: [
          "· LY Corporation（日本）：LINE消息的收发与保存。使用LINE时，LINE的隐私政策也同时适用。",
          "· Vercel Inc.（美国）：服务托管与访问记录处理。",
          "上述信息会在您使用服务时通过网络传输，并按照委托合同或各服务商条款规定的期限保存。如果您不希望信息跨境传输，可以不使用LINE咨询；即便如此，仍可使用皮肤分析。",
        ],
      },
      {
        heading: "6. Cookie等自动收集机制",
        body: ["本公司不使用以使用分析或广告为目的的Cookie。"],
      },
      {
        heading: "7. 您的权利与行使方式",
        body: [
          "您可以随时要求查阅、更正、删除、停止处理个人信息，或拒绝接收服务资讯。通过LINE消息或下方电子邮箱提出要求，我们会立即处理。",
        ],
      },
      {
        heading: "8. 不提供个人信息时",
        body: [
          "皮肤分析无需提供个人信息即可使用。若未提供LINE咨询所需的信息，将无法获得咨询与预约说明服务。",
        ],
      },
      {
        heading: "9. 未成年人",
        body: [
          "咨询与预约说明服务以年满19周岁者为对象。本公司不收集未满14周岁儿童的个人信息。",
        ],
      },
      {
        heading: "10. 安全保障措施",
        body: [
          "面部分析设计为在您的设备上处理，而不是服务器。咨询信息的访问权限仅限于最少数的负责人员。",
        ],
      },
      {
        heading: "11. 个人信息保护负责人与联系方式",
        body: ["블리스글로벌스 주식회사 个人信息保护负责人 Kim Dongwon（代表）", "电子邮箱：blissglobalscs@gmail.com"],
      },
      {
        heading: "12. 政策变更",
        body: [
          "本政策可能因法律法规或服务变更而修改，变更时会在本页面公告。新增LINE登录等会产生新的个人信息处理的功能时，会在施行前修订本政策并征得必要的同意。",
        ],
      },
    ],
    footer: "本政策自2026年10月21日起适用。",
    linkLabel: "隐私政策",
    continueButton: "我已确认，继续",
  },

  consult: {
    cta: "通过LINE免费咨询",
    note: "点击按钮后，LINE咨询窗口会自动填入您的分析结果，点击发送即可开始咨询。",
    ageRestricted: "项目咨询仅限年满19岁的用户。",
    message: {
      title: "【免费咨询申请】",
      concern: "关注部位",
      overall: "综合分数",
      outOf: "/ 10",
    },
  },

  promo: {
    title: "想了解肌肤咨询吗?",
    body: "欢迎通过 Bliss Globals 合作诊所预约免费咨询。",
    cta: "通过LINE咨询",
  },

  consent: {
    badge: "开始前须知",
    heading: "开始前请先确认以下内容",
    notices: [
      "本服务的分析结果会因拍摄环境(光线、角度、相机性能)而有准确度上的差异。",
      "本服务并非医疗器械,不执行诊断、处方等医疗行为。分析结果为AI分析所得,并非专科医师或专家的意见,不代表医学上的判断。",
      "无论分析结果为何,若肌肤出现异常症状,请务必咨询皮肤科专科医师。",
      "拍摄的照片仅在此设备(浏览器)内进行分析,不会传送至服务器或被存储。",
      "结果页面中的项目、成分相关信息均为一般性信息，并非推荐特定诊所或项目。",
    ],
    agree: "我已确认以上所有内容并同意。",
    start: "开始检测",
  },

  scan: {
    stepLabels: ["选择目标", "拍摄", "结果"],
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

    goal: {
      badge: "STEP 1 · 选择目标",
      heading: "最在意哪个部分？",
      next: "去拍摄",
    },

    step1: {
      badge: "STEP 2 · 面部拍摄",
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
      badge: "结果 · 基础拍摄",
      headingPrefix: "简易肌肤分数 ",
      headingSuffix: "分",
      outOf10: "(满分10分)",
      previewNotice: "这是根据一张照片得出的简易结果。毛孔・肤质可在精密分析中查看。",
      lockedLabel: "精密分析中查看",
      lockedHint: "普通自拍分辨率难以准确判断，将在精密分析中提供。",
      lockedFocus: "这是您选择的困扰，精密分析可以看得更细致。",
      funTitle: "趣味参考结果",
      funNote: "会因光线和相机而变化，仅供参考。",
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
        "· 面部结构：使用 Google MediaPipe Face Landmarker（478 个面部特征点）分析面部位置、角度与对称。",
        "· 斑点・皱纹：按脸宽只截取两颊、额头、眼尾外侧、法令纹部位的皮肤，计算相对亮度的斑驳程度（斑点）与线条成分（皱纹）。",
        "· 毛孔・肤质在普通自拍分辨率下难以准确判断，将在精密分析中提供。",
        "· 肤色、底色与个人色彩是将未经校正的相机色彩转换到 CIE Lab 色彩空间来推估，会因光线颜色与亮度而变化。",
        "· 推估年龄：使用另一个面部年龄推估模型（TinyFaceDetector + AgeGenderNet）计算。",
        "· 约 0.4 秒内测量多帧画面，排除极端值后取平均作为分数。",
        "· 若照片太暗、光线颜色明显偏差或面部未朝正面，会提示重新拍摄。",
        "· 同龄比较排名并非实际用户统计，仅为趣味用的推估值。",
        "· 各项目的说明文字根据分数区间与项目之间的相对位置组合而成。",
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
