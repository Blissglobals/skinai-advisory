import { mapsUrl, type SiteContent } from "./index";

// ko.ts의 간체(중국 대륙·싱가포르) 번역입니다. 구조·순서·slug·URL은 ko.ts와 같아야 합니다.
// 의원 이름·주소는 한국어 그대로 둡니다(택시·지도 검색용).
const ASK = "咨询时说明";

const zhCN: SiteContent = {
  ui: {
    brand: "ZeroLab",
    draftNotice: "示例内容・尚未经医生审核",
    consultCta: "通过LINE咨询诊所",
    consultBar: "LINE咨询",
    scanCta: "开始在线皮肤分析",
    scanBar: "在线皮肤分析",
    comingSoon: "准备中",
    seeAll: "查看全部",
    adLabel: "广告",
    spotBadges: { visited: "亲自探店", hot: "人气名店" },
    aiPersonLabel: "AI生成虚拟人物",
    aiPageNotice: "本页含有AI生成的虚拟人物照片。",
    languageLabel: "语言",
    nav: { treatments: "项目", guide: "周边指南" },
    consultMessage: {
      title: "【皮肤分析咨询申请】",
      interest: "感兴趣的项目",
      topic: "想咨询的内容",
      concern: "皮肤困扰",
    },
  },

  home: {
    eyebrow: "ZeroLab诊所 在线皮肤分析",
    heading: "诊所打造的\n在线皮肤分析，\n先来试试看。",
    subheading: "用一张照片查看色斑和皱纹状态，再带着精密分析报告咨询ZeroLab诊所。结果仅供参考，并非诊断。",
    chips: ["在线皮肤分析", "精密分析报告", "带着报告咨询诊所"],
    marquee: ["皮秒激光", "水光针", "超声提拉", "射频提拉", "点阵激光", "祛痘护理", "血管激光"],
    quote: "分析在线上，\n诊断在诊所。",
    quoteBy: "是否做项目，请在院长面诊后自行决定。",
    concernsTitle: "您有哪些皮肤困扰？",
    treatmentsTitle: "热门项目",
    stepsTitle: "服务流程",
    guideTitle: "弘大周边 & 首尔旅行指南",
    clinicTitle: "诊所信息",
    faqTitle: "常见问题",
    finalTitle: "想在诊所仔细看看自己的皮肤吗？",
    finalBody: "先用在线分析确认，再带着报告通过LINE咨询。",
  },

  concernPage: {
    causes: "为什么会出现？",
    treatments: "在诊所会这样处理",
    homeCare: "日常护理这样做",
    scanTitle: "想了解自己的皮肤状态？",
    scanBody: "用一张照片轻松看看皮肤状态。照片只会在您的设备上分析。",
  },

  treatmentPage: {
    indexTitle: "项目介绍",
    indexIntro: "按皮肤困扰整理了常见的项目。适合的项目会在院长面诊后决定。",
    relatedConcerns: "适合这些困扰",
    forWhom: "适合这样的人",
    facts: "要点一览",
    cautions: "注意事项",
    faq: "常见问题",
    related: "相关项目",
  },

  guidePage: {
    title: "弘大周边 & 首尔旅行指南",
    intro: "整理了ZeroLab诊所周边值得顺路去的地方，以及首尔代表性的旅游景点。",
    lastChecked: "最后确认日期",
    sponsoredNote: "有合作或赞助的店家会标注“广告”。",
  },

  footer: {
    company: "ZeroLab诊所（제로랩의원）",
    registration: "代表院长 Kim Dongwon・서울 마포구 양화로 151 욱도빌딩 5~7층・代表电话 1544-5598",
    disclaimer:
      "在线皮肤分析仅供参考，并非医学诊断或处方。皮肤状态和是否做项目，请到诊所面诊、与院长咨询后再决定。",
    aiNotice:
      "本网站的照片均为AI生成图像，并非真实人物或项目效果。皮肤分析分数为AI计算的参考信息。",
    privacy: "隐私政策",
  },

  concerns: [
    {
      slug: "pigment",
      name: "黄褐斑・色斑",
      hint: "色素沉着、肤色暗沉",
      intro:
        "黄褐斑和色斑根据成因和深度分为很多种。看起来相似，处理方法却不同，所以先分清是哪种色素很重要。",
      causes: ["紫外线照射", "激素变化", "痘痘或刺激后留下的色素"],
      homeCare: [
        "阴天也要每天涂防晒。",
        "减少过度去角质或揉搓的习惯。",
        "先通过面诊分清色素类型，再决定处理方法。",
      ],
      treatmentSlugs: ["pico-toning", "fractional-laser"],
    },
    {
      slug: "pore",
      name: "毛孔・肤质",
      hint: "毛孔粗大、肤质粗糙",
      intro:
        "皮脂分泌、弹性下降、以前的痘印等因素叠加，会让毛孔看起来更明显。改善肤质与其只做一次，坚持护理通常更重要。",
      causes: ["皮脂分泌旺盛", "随年龄下降的弹性", "痘痘留下的痕迹"],
      homeCare: [
        "一天洗脸两次，不要洗得过于干涩紧绷。",
        "做好保湿，守护皮肤屏障。",
        "不要用手挤毛孔。",
      ],
      treatmentSlugs: ["skin-booster", "fractional-laser"],
    },
    {
      slug: "wrinkle",
      name: "皱纹・紧致",
      hint: "细纹、松弛",
      intro:
        "皮肤里的胶原蛋白和弹性纤维减少，就会出现细纹和松弛。根据皮肤深度和部位，适合的项目也不同。",
      causes: ["随年龄减少的胶原蛋白", "紫外线", "重复的表情习惯"],
      homeCare: [
        "防晒是紧致护理的基础。",
        "做好保湿，让细纹不那么明显。",
        "充足的睡眠和补水也有帮助。",
      ],
      treatmentSlugs: ["hifu-lifting", "rf-lifting", "skin-booster"],
    },
    {
      slug: "acne",
      name: "痘痘・痘坑",
      hint: "反复长痘、凹陷痘坑",
      intro:
        "正在长的痘痘和已经留下的痘坑，处理方法不同。有炎症时先镇静，痘坑放在下一步处理。",
      causes: ["皮脂和角质堵塞毛孔", "炎症反应", "用手挤痘造成的伤口"],
      homeCare: [
        "不要用手挤或摸。",
        "不要叠加使用多种刺激性产品。",
        "炎症严重时，请先就医面诊。",
      ],
      treatmentSlugs: ["acne-care", "fractional-laser"],
    },
    {
      slug: "redness",
      name: "泛红・敏感",
      hint: "脸部泛红、容易变红",
      intro: "脸部容易泛红，或红色迟迟不退时，可能和血管或皮肤屏障有关。",
      causes: ["面部血管扩张", "皮肤屏障变弱", "温度剧烈变化和刺激"],
      homeCare: [
        "少用热水洗脸，少蒸桑拿。",
        "避开香味浓或刺激性的产品。",
        "用保湿产品持续养护皮肤屏障。",
      ],
      treatmentSlugs: ["vascular-laser"],
    },
  ],

  treatments: [
    {
      slug: "pico-toning",
      ready: true,
      name: "皮秒激光",
      summary: "利用脉冲极短的激光，把色素分解成细小颗粒，帮助均匀肤色的项目。",
      forWhom: [
        "在意黄褐斑、色斑等色素问题的人",
        "整体肤色暗沉的人",
        "旅行时间短、担心恢复期的人",
      ],
      facts: [
        { label: "主要困扰", value: "黄褐斑・色斑、肤色暗沉" },
        { label: "建议次数", value: ASK },
        { label: "恢复期", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "效果和恢复期会因皮肤状态而存在个体差异。",
        "做完后尤其要做好防晒。",
        "根据色素类型，其他项目可能更合适。",
      ],
      faq: [
        {
          q: "做完当天可以直接去玩吗？",
          a: "要看皮肤状态。咨询时会结合您的行程说明。",
        },
        {
          q: "只做一次可以吗？",
          a: "要看目标和皮肤状态。面诊后会说明建议次数。",
        },
      ],
    },
    {
      slug: "fractional-laser",
      ready: true,
      name: "点阵激光",
      summary: "以极细小的点状给皮肤热刺激、帮助皮肤再生的激光，常用于痘坑、毛孔和肤质护理。",
      forWhom: [
        "有凹陷痘坑困扰的人",
        "在意毛孔粗大和肤质粗糙的人",
        "打算长期护理肤质的人",
      ],
      facts: [
        { label: "主要困扰", value: "痘坑、毛孔、肤质" },
        { label: "建议次数", value: ASK },
        { label: "恢复期", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "做完后一段时间可能会泛红或脱屑，行程最好留些余地。",
        "做完后要做好防晒。",
        "强度和次数在面诊后决定。",
      ],
      faq: [
        {
          q: "旅行期间可以做吗？",
          a: "可能需要恢复期，咨询时会结合回国行程一起说明。",
        },
        {
          q: "毛孔也会改善吗？",
          a: "常用于肤质和毛孔护理，但效果因皮肤状态而异。面诊后会说明可以期待的范围。",
        },
      ],
    },
    {
      slug: "skin-booster",
      ready: true,
      name: "水光针",
      summary: "把有助保湿、修护的成分注入皮肤内，护理肤质和光泽的项目统称。",
      forWhom: [
        "皮肤干燥、粗糙没光泽的人",
        "同时在意细纹和肤质粗糙的人",
        "觉得皮肤内部缺水的人",
      ],
      facts: [
        { label: "主要困扰", value: "肤质、保湿、细纹" },
        { label: "种类", value: "因成分和产品而异" },
        { label: "建议次数", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "注射部位可能暂时出现肿胀或淤青。",
        "种类很多，会通过面诊选择适合皮肤状态的产品。",
      ],
      faq: [
        {
          q: "哪种产品比较好？",
          a: "要看皮肤状态和目标。咨询时会说明可选的方案。",
        },
        {
          q: "做完可以马上化妆吗？",
          a: "因产品和注射方式而异。请按照做完后医生的指示。",
        },
      ],
    },
    {
      slug: "hifu-lifting",
      ready: true,
      name: "超声提拉",
      summary: "把高强度聚焦超声（HIFU）的能量集中在皮肤下较深的层次，帮助护理皮肤紧致度的项目。",
      forWhom: [
        "脸部轮廓看起来下垂的人",
        "想做不开刀的紧致护理的人",
        "在意下颌线、脸颊线条的人",
      ],
      facts: [
        { label: "主要困扰", value: "松弛、紧致" },
        { label: "建议周期", value: ASK },
        { label: "恢复期", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "做的过程中的感受和疼痛程度因人而异。",
        "效果出现的时间和维持时间因人而异。",
      ],
      faq: [
        {
          q: "和射频提拉有什么不同？",
          a: "能量类型和作用深度不同。会根据皮肤状态，建议其中一种或搭配进行。",
        },
        {
          q: "会疼吗？",
          a: "感受程度因人而异。各诊所也会一并说明减轻疼痛的方法。",
        },
      ],
    },
    {
      slug: "rf-lifting",
      ready: true,
      name: "射频提拉",
      summary: "利用射频（RF）能量把热传递到皮肤内，帮助护理紧致度和肤质的项目。",
      forWhom: [
        "皮肤变薄、弹性下降的人",
        "想同时护理细纹和肤质的人",
        "在意眼周、额头细纹的人",
      ],
      facts: [
        { label: "主要困扰", value: "紧致、细纹" },
        { label: "建议周期", value: ASK },
        { label: "恢复期", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: ["做完后可能暂时泛红。", "仪器和强度在面诊后决定。"],
      faq: [
        {
          q: "可以和超声提拉一起做吗？",
          a: "根据皮肤状态，有时会建议搭配进行。面诊后决定组合和顺序。",
        },
        {
          q: "效果马上能看到吗？",
          a: "感受到效果的时间和维持时间因人而异。咨询时会说明可以期待的范围。",
        },
      ],
    },
    {
      slug: "acne-care",
      ready: true,
      name: "祛痘护理",
      summary: "根据皮肤状态组合清痘、深层清洁、镇静护理等的项目。炎症严重时，可能需要同时开药。",
      forWhom: [
        "反复长痘的人",
        "想在旅行前后调理皮肤状态的人",
        "同时在意痘印和痘坑的人",
      ],
      facts: [
        { label: "主要困扰", value: "痘痘、皮肤问题" },
        { label: "内容", value: "根据皮肤状态组合" },
        { label: "建议次数", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "短期停留期间以镇静为主，长期护理会一起规划回国后的安排。",
        "处方药需要经过面诊才能拿到。",
      ],
      faq: [
        {
          q: "短期旅行也能做吗？",
          a: "停留期间以镇静和调理为主，之后的护理会一起规划回国后的安排。",
        },
        {
          q: "清痘会留下印子吗？",
          a: "医生会根据皮肤状态决定是否进行以及方式。如果担心留印，请在咨询时提前告诉我们。",
        },
      ],
    },
    {
      slug: "vascular-laser",
      ready: true,
      name: "血管激光",
      summary: "使用对红色血管有反应的波长的激光，处理潮红和泛红的项目。",
      forWhom: [
        "脸部泛红迟迟不退的人",
        "能看到红血丝的人",
        "遇到温度变化脸就容易发热泛红的人",
      ],
      facts: [
        { label: "主要困扰", value: "潮红、泛红" },
        { label: "建议次数", value: ASK },
        { label: "恢复期", value: ASK },
        { label: "价格区间", value: ASK },
      ],
      cautions: [
        "做完后可能暂时看起来更红。",
        "桑拿、饮酒等会让身体发热的活动，请按医生指示避免。",
      ],
      faq: [
        {
          q: "需要做几次？",
          a: "要看泛红程度和原因。面诊后会说明建议次数。",
        },
        {
          q: "做完可以马上去玩吗？",
          a: "可能出现暂时性的泛红或肿胀，行程最好留些余地。咨询时会结合旅行行程说明。",
        },
      ],
    },
  ],

  steps: [
    { title: "在线皮肤分析", body: "用一张照片查看色斑和皱纹状态。" },
    { title: "精密分析报告", body: "通过放大拍摄，连毛孔都仔细查看，并获取分析报告。" },
    { title: "通过LINE咨询报告", body: "发送报告后，我们会在咨询时间（韩国时间工作日10:00～18:00、周末10:00～16:00）内回复您。" },
    { title: "预约后到院", body: "按您的行程前往ZeroLab诊所。" },
    { title: "面诊后决定", body: "经院长面诊后，再决定是否做项目。" },
  ],

  guides: [
    {
      slug: "attractions",
      ready: true,
      lastChecked: "2026-10-23",
      title: "首尔热门景点",
      summary: "从弘大入口站坐地铁就能轻松到达的首尔代表性景点",
      sections: [
        {
          heading: "从弘大入口站出发",
          body: "所需时间以 Kakao 地图公共交通路线为准，可能因时段而不同。",
          spots: [
            { name: "동대문디자인플라자(DDP)（东大门设计广场）", note: "东大门历史文化公园站（2、4、5号线）・约17分钟・坐2号线直达・设计地标与购物", sponsored: false, mapUrl: mapsUrl("동대문디자인플라자") },
            { name: "북촌한옥마을·인사동（北村韩屋村・仁寺洞）", note: "安国站（3号线）・约19分钟・韩屋小巷与传统工艺街", sponsored: false, mapUrl: mapsUrl("북촌한옥마을") },
            { name: "경복궁（景福宫）", note: "景福宫站（3号线）・约21分钟・朝鲜王朝的正宫，韩服体验热门地", sponsored: false, mapUrl: mapsUrl("경복궁") },
            { name: "명동（明洞）", note: "明洞站（4号线）・约22分钟・购物与街头小吃", sponsored: false, mapUrl: mapsUrl("명동") },
            { name: "여의도한강공원（汝矣岛汉江公园）", note: "汝矣渡口站（5号线）・约25分钟・汉江野餐与夜景", sponsored: false, mapUrl: mapsUrl("여의도한강공원") },
            { name: "성수동（圣水洞）", note: "圣水站（2号线）・约28分钟・坐2号线直达・快闪店与咖啡街", sponsored: false, mapUrl: mapsUrl("성수동 카페거리") },
            { name: "N서울타워（N首尔塔）", note: "从明洞站往南山方向・约37分钟・首尔观景地标", sponsored: false, mapUrl: mapsUrl("N서울타워") },
            { name: "롯데월드타워·롯데월드（乐天世界塔・乐天世界）", note: "蚕室站（2、8号线）・约39分钟・坐2号线直达・观景台与主题乐园", sponsored: false, mapUrl: mapsUrl("롯데월드타워") },
          ],
        },
        {
          heading: "搭配项目行程时",
          body: "因项目类型不同，可能会出现泛红或肿胀。刚做完项目时以室内行程为主，请务必做好防晒。行程会在咨询时一起为您安排。",
        },
      ],
    },
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-23",
      title: "诊所周边药店",
      summary: "从ZeroLab诊所步行可到的药店",
      sections: [
        {
          heading: "术后修护包",
          body: "新产品在院长同意后再使用比较安全。",
          items: [
            "防晒霜 — 激光项目后必备",
            "镇静・保湿霜 — 选择香精少、刺激性低的产品",
            "温和的洁面产品 — 不用搓揉就能洗干净的",
            "帽子・遮阳伞 — 项目后有户外行程时",
          ],
        },
        {
          heading: "步行10分钟以内",
          body: "步行时间以ZeroLab诊所为起点。",
          spots: [
            { name: "홍익약국", note: "步行约5分钟・外国客人多・经药剂师咨询后销售医学护肤品", sponsored: false, mapUrl: mapsUrl("홍익약국 서울 마포구 양화로18길 7") },
            { name: "홍대 베리뉴약국", note: "步行约5分钟", sponsored: false, mapUrl: mapsUrl("홍대 베리뉴약국 서울 마포구 양화로18길 12") },
            { name: "광명약국", note: "步行约7分钟", sponsored: false, mapUrl: mapsUrl("광명약국 서울 마포구 양화로 191") },
            { name: "연남약국", note: "步行约7分钟・延南洞方向", sponsored: false, mapUrl: mapsUrl("연남약국 서울 마포구 양화로21길 31") },
            { name: "홍익플라자약국", note: "步行约8分钟", sponsored: false, mapUrl: mapsUrl("홍익플라자약국 서울 마포구 양화로 192") },
          ],
        },
        {
          heading: "在药店可以出示这些句子",
          items: [
            "자외선 차단제 있나요?（有防晒霜吗？）",
            "피부 시술 후에 쓸 순한 보습제 추천해 주세요.（请推荐适合皮肤项目后使用的温和保湿产品。）",
            "이거 하루에 몇 번 바르나요?（这个一天涂几次？）",
          ],
        },
        {
          heading: "小贴士",
          body: "能否退税以及营业时间可能因店家情况而变动。去之前请先在地图上确认，办理退税请务必携带护照。以上信息与店家没有任何合作或赞助关系。步行时间以 Kakao 地图步行路线为准。",
        },
      ],
    },
    {
      slug: "food",
      ready: true,
      lastChecked: "2026-10-23",
      title: "诊所周边美食",
      summary: "合井・弘大入口・无广告推荐餐厅",
      sections: [
        {
          heading: "刚做完时这样吃",
          body: "因项目类型而异，请优先遵照院长的指示。",
          items: [
            "在院长说可以之前，请避免饮酒。",
            "桑拿、汗蒸房等会让身体发热的地方，请先推迟。",
            "很辣或很烫的食物，可能让脸部发热泛红。",
          ],
        },
        {
          heading: "合井・弘大入口",
          body: "2、6号线合井站・2号线弘大入口站",
          spots: [
            { name: "합정옥", note: "合井站8号出口步行4分钟・牛骨汤・汤底清淡", sponsored: false, mapUrl: mapsUrl("합정옥 서울 마포구 양화로1길 21") },
            { name: "옥동식 서교점（玉东植）", note: "合井站2号出口步行5分钟・猪肉清汤饭・汤底清爽，做完项目吃也没负担・座位少，可能需要排队", sponsored: false, badges: ["hot"], mapUrl: mapsUrl("옥동식 서교점 서울 마포구 양화로7길 44-10") },
            { name: "진진", note: "合井站2号出口步行7分钟・中餐・刚做完项目请避开辣的菜・可预约", sponsored: false, mapUrl: mapsUrl("진진 서울 마포구 월드컵북로1길 60") },
            { name: "백년토종삼계탕 본점（百年土种参鸡汤）", note: "弘大入口站9号出口步行7分钟・参鸡汤", sponsored: false, mapUrl: mapsUrl("백년토종삼계탕 본점 서울 마포구 양화로 118") },
            { name: "서교난면방", note: "望远站步行7分钟・韩国本土小麦面", sponsored: false, mapUrl: mapsUrl("서교난면방 서울 마포구 동교로12길 16") },
          ],
        },
        {
          heading: "小贴士",
          body: "“亲自探店”是我们亲自去过的店，“人气名店”是排队人很多的热门餐厅。营业时间和休息日经常变动，去之前请先在地图上确认。以上信息与店家没有任何合作或赞助关系。步行时间以 Kakao 地图步行路线为准。",
        },
      ],
    },
    {
      slug: "cosmetics",
      ready: true,
      lastChecked: "2026-10-23",
      title: "周边美妆店",
      summary: "从ZeroLab诊所步行可到的美妆门店",
      sections: [
        {
          heading: "步行10分钟以内",
          body: "步行时间以ZeroLab诊所为起点。",
          spots: [
            { name: "올리브영 홍대입구역점", note: "步行约4分钟・美妆药妆店", sponsored: false, mapUrl: mapsUrl("올리브영 홍대입구역점 서울 마포구 양화로 156") },
            { name: "메디큐브 홍대", note: "步行约5分钟・护肤品牌门店", sponsored: false, mapUrl: mapsUrl("메디큐브 홍대 서울 마포구 홍익로6길 27") },
            { name: "다이소 홍대입구점", note: "步行约6分钟・生活用品・平价化妆品", sponsored: false, mapUrl: mapsUrl("다이소 홍대입구점 서울 마포구 홍익로 25") },
            { name: "무신사 뷰티 홍대", note: "步行约6分钟・美妆集合店", sponsored: false, mapUrl: mapsUrl("무신사 뷰티 홍대 서울 마포구 홍익로 18") },
            { name: "올리브영 홍대정문점", note: "步行约9分钟・美妆药妆店", sponsored: false, mapUrl: mapsUrl("올리브영 홍대정문점 서울 마포구 홍익로 4") },
          ],
        },
        {
          heading: "热门购买品类",
          items: [
            "防晒霜 — 种类多，很多质地轻薄好推开",
            "片状面膜 — 也很适合当伴手礼",
            "镇静霜 — 有很多敏感肌适用的产品",
            "卸妆油・洗面奶",
          ],
        },
        {
          heading: "购买小贴士",
          items: [
            "刚做完项目时，不要马上使用新产品，请先咨询院长。",
            "能否办理外国人退税，请在店内确认。",
          ],
        },
      ],
    },
    {
      slug: "shopping",
      ready: true,
      lastChecked: "2026-10-23",
      title: "周边购物去处",
      summary: "弘大・延南・合井适合边走边逛的购物街区",
      sections: [
        {
          heading: "离诊所很近",
          body: "步行时间以ZeroLab诊所为起点。",
          spots: [
            { name: "홍대 걷고싶은거리", note: "步行约7分钟・弘大代表性的步行街，街头表演与商店街", sponsored: false, mapUrl: mapsUrl("홍대 걷고싶은거리") },
            { name: "경의선숲길 (연남동)", note: "步行约7分钟・由旧铁路改建的散步道，一路连到延南洞的咖啡馆和小物店", sponsored: false, mapUrl: mapsUrl("경의선숲길 연남동") },
            { name: "AK플라자 홍대", note: "步行约8分钟・与弘大入口站相连的购物中心", sponsored: false, mapUrl: mapsUrl("AK플라자 홍대 서울 마포구 양화로 188") },
            { name: "메세나폴리스몰", note: "合井站・地铁一站・综合购物中心", sponsored: false, mapUrl: mapsUrl("메세나폴리스몰 서울 마포구 양화로 45") },
          ],
        },
      ],
    },
  ],

  clinics: [
    {
      slug: "zerolab",
      name: "제로랩의원",
      formerName: "샤인빔의원 홍대",
      area: "弘大",
      address: "서울 마포구 양화로 151 욱도빌딩 5~7층",
      station: "弘大入口站1号出口",
      phone: "1544-5598",
      homepage: "http://zerolabclinic.com",
      languages: "中文（简体・繁体）、英文、日文、泰文介绍页面",
      links: [{ label: "Instagram", url: "https://www.instagram.com/zerolabclinic_global/" }],
    },
  ],

  clinicPage: {
    title: "诊所信息",
    intro: "门诊时间和项目信息可在ZeroLab诊所官网查看。",
    address: "地址",
    station: "最近车站",
    phone: "电话",
    languages: "外语介绍",
    homepage: "诊所官网",
    map: "在地图上查看",
    formerName: "原名",
    detailNote: "门诊时间、项目信息以诊所官网为准，可能会有变动。去之前会在咨询时再次为您确认。",
    consultInterest: "希望去的诊所",
  },

  faq: [
    {
      q: "在线皮肤分析免费吗？",
      a: "是的，在线分析和精密分析报告都免费。项目费用因项目而异，会在咨询时说明。",
    },
    {
      q: "可以用分析结果当作诊断吗？",
      a: "不能。在线分析仅供参考，并非诊断。实际状况需要到诊所由院长面诊确认。",
    },
    {
      q: "LINE咨询什么时候能收到回复？",
      a: "咨询时间为韩国时间工作日10:00～18:00、周末10:00～16:00。其他时段留下的咨询，会在第二天按顺序回复。",
    },
    {
      q: "不会韩语也没关系吗？",
      a: "外语服务范围会在咨询时说明。",
    },
    {
      q: "怎么付款？",
      a: "付款方式和时间会在咨询时说明。",
    },
    {
      q: "回国后如果出现问题怎么办？",
      a: "请通过LINE咨询。（术后护理范围待确认）",
    },
  ],
};

export default zhCN;
