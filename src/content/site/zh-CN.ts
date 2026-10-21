import { mapsUrl, type SiteContent } from "./index";

// ko.ts의 간체(중국 대륙·싱가포르) 번역입니다. 구조·순서·slug·URL은 ko.ts와 같아야 합니다.
// 의원 이름·주소는 한국어 그대로 둡니다(택시·지도 검색용).
const ASK = "咨询时说明";

const zhCN: SiteContent = {
  ui: {
    brand: "Bliss Globals",
    draftNotice: "示例内容・尚未经医生审核",
    consultCta: "通过LINE免费咨询",
    consultBar: "LINE免费咨询",
    scanCta: "试试免费皮肤分析",
    scanBar: "皮肤分析",
    comingSoon: "准备中",
    seeAll: "查看全部",
    adLabel: "广告",
    aiPersonLabel: "AI生成虚拟人物",
    languageLabel: "语言",
    nav: { treatments: "项目", guide: "指南" },
    consultMessage: {
      title: "【免费咨询申请】",
      interest: "感兴趣的项目",
      topic: "想咨询的内容",
      concern: "皮肤困扰",
    },
  },

  home: {
    eyebrow: "首尔皮肤美容之旅",
    heading: "首尔皮肤诊所，\n从咨询到预约\n一站搞定。",
    subheading: "了解适合您皮肤困扰的项目，通过免费咨询提前确认行程和费用。",
    chips: ["免费咨询", "免费翻译与预约", "匹配合适诊所"],
    marquee: ["皮秒激光", "水光针", "超声提拉", "射频提拉", "点阵激光", "祛痘护理", "血管激光"],
    quote: "咨询可以轻松问，\n决定留到面诊后。",
    quoteBy: "是否做项目，请在医生面诊后自行决定。",
    concernsTitle: "您有哪些皮肤困扰？",
    treatmentsTitle: "热门项目",
    stepsTitle: "服务流程",
    guideTitle: "首尔皮肤美容旅行指南",
    clinicTitle: "合作诊所",
    faqTitle: "常见问题",
    finalTitle: "不确定哪个项目适合自己？",
    finalBody: "用一张皮肤照片轻松看看，或直接咨询我们。",
  },

  concernPage: {
    causes: "为什么会出现？",
    treatments: "首尔皮肤诊所常见的处理方式",
    homeCare: "日常护理这样做",
    scanTitle: "想了解自己的皮肤状态？",
    scanBody: "用一张照片轻松看看皮肤状态。照片只会在您的设备上分析。",
  },

  treatmentPage: {
    indexTitle: "项目介绍",
    indexIntro: "按皮肤困扰整理了首尔皮肤诊所常见的项目。",
    relatedConcerns: "适合这些困扰",
    forWhom: "适合这样的人",
    facts: "要点一览",
    cautions: "注意事项",
    faq: "常见问题",
    related: "相关项目",
  },

  guidePage: {
    title: "首尔皮肤美容旅行指南",
    intro: "整理了项目前后适合去的地方，以及值得准备的东西。",
    lastChecked: "最后确认日期",
    sponsoredNote: "有合作或赞助的店家会标注“广告”。",
  },

  footer: {
    company: "Bliss Globals（블리스글로벌스 주식회사）",
    registration: "外国人患者招揽业登记号 A-2025-01-01-06361",
    disclaimer:
      "本网站信息仅为一般性说明，并非医学诊断或处方。是否做项目，请务必咨询医生后再决定。",
    aiNotice:
      "本网站的照片均为AI生成图像，并非真实人物、诊所或项目效果。皮肤分析分数为AI计算的参考信息。",
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
    { title: "通过LINE咨询", body: "告诉我们您的皮肤困扰和旅行行程。" },
    { title: "诊所与报价说明", body: "说明适合您的合作诊所和预估费用。" },
    { title: "预约后来韩", body: "按预约日期来韩国。" },
    { title: "面诊与项目", body: "经医生面诊后，再决定是否做项目。" },
    { title: "回国后护理", body: "有任何问题，都可以继续通过LINE询问。" },
  ],

  guides: [
    {
      slug: "pharmacies",
      ready: true,
      lastChecked: "2026-10-22",
      title: "药店 & 美妆店",
      summary: "做完项目要准备的东西，以及诊所附近可以买到的地方",
      sections: [
        {
          heading: "术后修护包",
          body: "新产品在医生同意后再用比较安全。",
          items: [
            "防晒霜 — 激光项目后必备",
            "舒缓・保湿霜 — 选香精少、刺激性低的产品",
            "温和的洁面产品 — 不用揉搓就能洗干净的",
            "帽子・遮阳伞 — 做完后有户外行程时",
          ],
        },
        {
          heading: "弘大",
          body: "제로랩의원附近",
          spots: [
            { name: "홍익약국", note: "药店・可用中文咨询・出示护照可即时退税", sponsored: false, mapUrl: mapsUrl("홍익약국 서울 마포구 양화로18길 7") },
            { name: "레디영약국 홍대", note: "药店・可退税", sponsored: false, mapUrl: mapsUrl("레디영약국 홍대 서울 마포구 홍익로6길 8") },
            { name: "올리브영 홍대타운", note: "美妆店・大型门店", sponsored: false, mapUrl: mapsUrl("올리브영 홍대타운 서울 마포구 홍익로6길 57") },
          ],
        },
        {
          heading: "江南站",
          body: "디오레의원附近",
          spots: [
            { name: "옵티마웰니스뮤지엄약국 강남", note: "药店・步行约7分钟・可用中文、英语、日语咨询・即时退税", sponsored: false, mapUrl: mapsUrl("옵티마웰니스뮤지엄약국 강남 서울 강남구 강남대로102길 42") },
            { name: "강남 레디영약국", note: "药店・步行约6分钟・可用中文、英语、日语咨询・可退税", sponsored: false, mapUrl: mapsUrl("강남 레디영약국 서울 서초구 서초대로77길 5") },
            { name: "강남드림약국", note: "药店・步行约3分钟・退税加盟店", sponsored: false, mapUrl: mapsUrl("강남드림약국 서울 서초구 강남대로 435") },
            { name: "올리브영 센트럴 강남 타운", note: "美妆店・步行约5分钟・有外语服务人员", sponsored: false, mapUrl: mapsUrl("올리브영 센트럴 강남 타운 서울 서초구 강남대로 403") },
          ],
        },
        {
          heading: "狎鸥亭・新沙",
          body: "베이드의원・스케줄의원附近・这一带面向外国游客的药店不多",
          spots: [
            { name: "압구정퀸약국", note: "药店・从베이드의원步行约3分钟・退税加盟店", sponsored: false, mapUrl: mapsUrl("압구정퀸약국 서울 강남구 논현로 853") },
            { name: "올리브영 압구정", note: "美妆店・从베이드의원步行约2分钟", sponsored: false, mapUrl: mapsUrl("올리브영 압구정 서울 강남구 논현로 842") },
            { name: "올리브영 압구정로데오역점", note: "美妆店・从스케줄의원步行约7分钟", sponsored: false, mapUrl: mapsUrl("올리브영 압구정로데오역점 서울 강남구 선릉로 817") },
          ],
        },
        {
          heading: "明洞",
          body: "观光路线上・面向外国游客的药店集中区",
          spots: [
            { name: "명동레디영약국", note: "药店・有会说中文、英语、日语的店员・可退税", sponsored: false, mapUrl: mapsUrl("명동레디영약국 서울 중구 명동8나길 7") },
            { name: "명동타운 레디영약국", note: "药店・可用中文、英语、日语咨询・支持微信支付、支付宝", sponsored: false, mapUrl: mapsUrl("명동타운 레디영약국 서울 중구 명동8가길 31") },
            { name: "올리브영 명동타운", note: "美妆店・大型门店", sponsored: false, mapUrl: mapsUrl("올리브영 명동타운 서울 중구 명동길 53") },
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
          body: "退税方式（即时・事后）和营业时间可能因店铺情况而变动。去之前请先在地图上确认，退税请务必带上护照。以上信息与店家没有任何合作或赞助关系。",
        },
      ],
    },
    {
      slug: "must-buy",
      ready: true,
      lastChecked: "2026-10-21",
      title: "韩国必买推荐",
      summary: "旅行途中值得买的护肤品",
      sections: [
        {
          heading: "热门购买品类",
          items: [
            "防晒霜 — 种类多，很多质地轻薄好推开",
            "片状面膜 — 也很适合当伴手礼",
            "舒缓霜 — 有很多敏感肌适用的产品",
            "清洁产品 — 卸妆油・洗面奶",
            "润唇・护手保湿产品",
          ],
        },
        {
          heading: "在哪里买？",
          items: [
            "美妆店（H&B）— 品类最多",
            "药店 — 项目后护理用的产品",
            "免税店 — 出境前顺路逛很方便",
          ],
        },
        {
          heading: "购买小贴士",
          items: [
            "刚做完项目时，不要马上用新产品，请先问医生。",
            "能否办理外国人退税，请在店内确认。",
          ],
        },
      ],
    },
    {
      slug: "food",
      ready: true,
      lastChecked: "2026-10-22",
      title: "项目后饮食指南",
      summary: "做完项目也没负担的餐点和各区域餐厅",
      sections: [
        {
          heading: "刚做完时这样吃",
          body: "因项目类型而异，请优先遵照医生的指示。",
          items: [
            "在医生说可以之前，请避免饮酒。",
            "桑拿、汗蒸房等会让身体发热的地方，请先推迟。",
            "很辣或很烫的食物，可能让脸部发热泛红。",
          ],
        },
        {
          heading: "弘大",
          body: "제로랩의원附近",
          spots: [
            { name: "옥동식 서교점（玉东植）", note: "猪肉清汤饭・汤底清爽，做完项目吃也没负担・座位少，可能需要排队", sponsored: false, mapUrl: mapsUrl("옥동식 서교점 서울 마포구 양화로7길 44-10") },
            { name: "합정옥", note: "牛骨汤・汤底清淡", sponsored: false, mapUrl: mapsUrl("합정옥 서울 마포구 양화로1길 21") },
            { name: "서교난면방", note: "韩国本土小麦面", sponsored: false, mapUrl: mapsUrl("서교난면방 서울 마포구 동교로12길 16") },
            { name: "백년토종삼계탕 본점（百年土种参鸡汤）", note: "参鸡汤", sponsored: false, mapUrl: mapsUrl("백년토종삼계탕 본점 서울 마포구 양화로 118") },
            { name: "진진", note: "中餐・刚做完项目请避开辣的菜・可预约", sponsored: false, mapUrl: mapsUrl("진진 서울 마포구 월드컵북로1길 60") },
          ],
        },
        {
          heading: "江南・新沙",
          body: "디오레의원・베이드의원・스케줄의원附近",
          spots: [
            { name: "3대 삼계장인", note: "参鸡汤・可能需要排队", sponsored: false, mapUrl: mapsUrl("3대 삼계장인 서울 서초구 반포대로28길 56-3") },
            { name: "진미평양냉면 본관", note: "平壤冷面・饺子", sponsored: false, mapUrl: mapsUrl("진미평양냉면 본관 서울 강남구 학동로 307") },
            { name: "유정식당（有情餐馆）", note: "包饭套餐・辣炒猪肉和泡菜偏辣・2人起点", sponsored: false, mapUrl: mapsUrl("유정식당 서울 강남구 도산대로28길 14") },
          ],
        },
        {
          heading: "明洞",
          body: "观光路线上",
          spots: [
            { name: "하동관（河东馆）", note: "牛骨汤・下午较早关门，周日休息", sponsored: false, mapUrl: mapsUrl("하동관 서울 중구 명동9길 12") },
            { name: "신선설농탕 명동점（神仙雪浓汤）", note: "雪浓汤", sponsored: false, mapUrl: mapsUrl("신선설농탕 명동점 서울 중구 명동길 56") },
            { name: "영양센타 본점（明洞营养中心）", note: "参鸡汤・电烤全鸡", sponsored: false, mapUrl: mapsUrl("영양센타 본점 서울 중구 명동2길 52") },
            { name: "능라도 명동점（绫罗岛冷面）", note: "平壤冷面・温汤饭", sponsored: false, mapUrl: mapsUrl("능라도 명동점 서울 중구 명동길 53") },
            { name: "명동교자（明洞饺子）", note: "韩式刀切面・泡菜蒜味较重・排队的人很多", sponsored: false, mapUrl: mapsUrl("명동교자 서울 중구 명동10길 29") },
            { name: "우래옥 본점", note: "平壤冷面・在乙支路一带", sponsored: false, mapUrl: mapsUrl("우래옥 본점 서울 중구 창경궁로 62-29") },
          ],
        },
        {
          heading: "圣水",
          body: "观光路线上",
          spots: [
            { name: "능동미나리 성수점（陵洞水芹菜）", note: "牛骨汤", sponsored: false, mapUrl: mapsUrl("능동미나리 성수점 서울 성동구 연무장길 42") },
            { name: "조조칼국수 성수점（朝朝刀削面）", note: "蛤蜊刀切面", sponsored: false, mapUrl: mapsUrl("조조칼국수 성수점 서울 성동구 성수일로8길 55") },
            { name: "성수다락", note: "蛋包饭", sponsored: false, mapUrl: mapsUrl("성수다락 서울 성동구 뚝섬로9길 20") },
            { name: "꿉당 성수점", note: "烤猪肉・刚做完项目最好避开油腻的烤肉", sponsored: false, mapUrl: mapsUrl("꿉당 성수점 서울 성동구 성수이로20길 10") },
          ],
        },
        {
          heading: "小贴士",
          body: "热门店家可能要排很久的队，营业时间和休息日也经常变动。去之前请先在地图上确认。以上信息与店家没有任何合作或赞助关系。",
        },
      ],
    },
    {
      slug: "itinerary",
      ready: true,
      lastChecked: "2026-10-21",
      title: "项目+旅行 4天3晚",
      summary: "考虑恢复期的行程示例",
      sections: [
        {
          heading: "第1天・抵达",
          items: ["入住酒店", "简单吃个晚饭、休息", "确认第二天的面诊时间"],
        },
        {
          heading: "第2天・面诊与项目",
          items: ["经医生面诊后做项目", "在药店准备术后修护包", "安排轻松的室内行程"],
        },
        {
          heading: "第3天・轻松观光",
          items: ["以商场、美术馆等室内行程为主", "做好防晒", "需要时复诊"],
        },
        {
          heading: "第4天・回国",
          items: ["免税店购物", "回国后有问题，请通过LINE咨询"],
        },
        {
          heading: "请务必确认",
          body: "每个项目的恢复期都不同。需要根据回国日期安排项目时间，请在预约前先通过咨询确认。",
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
      languages: "中文（简体・繁体）、英语、日语、泰语介绍页面",
      links: [{ label: "Instagram", url: "https://www.instagram.com/zerolabclinic_global/" }],
    },
    {
      slug: "diore",
      name: "디오레의원",
      area: "江南站・新论岘",
      address: "서울 강남구 강남대로 428 만이빌딩 9층",
      station: "新论岘站6号出口・江南站11号出口步行5分钟",
      phone: "02-553-5533",
      homepage: "https://dioreclinic.com/ko",
      languages: "英语、日语、中文、泰语官网",
      links: [{ label: "Instagram", url: "https://www.instagram.com/diore_clinic_eng/" }],
    },
    {
      slug: "baid",
      name: "베이드의원",
      area: "狎鸥亭・新沙",
      address: "서울 강남구 논현로 839 서원식스 4층",
      station: "狎鸥亭站4号出口步行2分钟",
      phone: "02-511-1985",
      homepage: "https://www.baidclinic.com",
      languages: "外语服务范围咨询时说明",
      links: [{ label: "Instagram", url: "https://www.instagram.com/baidclinic_kor/" }],
    },
    {
      slug: "schedule",
      name: "스케줄의원",
      area: "狎鸥亭罗德奥・岛山公园",
      address: "서울 강남구 도산대로49길 11 IVY빌딩 3층",
      station: "狎鸥亭罗德奥站5号出口",
      phone: "02-511-7773",
      homepage: "http://scheduleclinic.kr",
      languages: "外语服务范围咨询时说明",
      links: [{ label: "Instagram", url: "https://www.instagram.com/schedule_clinic/" }],
    },
  ],

  clinicPage: {
    title: "合作诊所",
    intro: "我们会在咨询时，根据您的困扰和行程介绍合适的诊所。门诊时间和项目信息可在各诊所官网查看。",
    address: "地址",
    station: "最近车站",
    phone: "电话",
    languages: "外语服务",
    homepage: "诊所官网",
    map: "在地图上查看",
    formerName: "原名",
    detailNote: "门诊时间、项目信息以诊所官网为准，可能会有变动。去之前会在咨询时再次为您确认。",
    consultInterest: "希望去的诊所",
  },

  faq: [
    {
      q: "咨询真的免费吗？",
      a: "是的，LINE咨询免费。项目费用因诊所和项目而异，会在咨询时说明。",
    },
    {
      q: "会介绍哪些诊所？",
      a: "会从合作诊所中，介绍适合您困扰和行程的诊所。",
    },
    {
      q: "不会韩语也没关系吗？",
      a: "没关系。面诊翻译和预约代办都免费协助。",
    },
    {
      q: "免费翻译与预约代办，每个人都能用吗？",
      a: "适用对象为未加入韩国健康保险、没有韩国外国人登录的短期访客。咨询时会简单确认。",
    },
    {
      q: "怎么付款？",
      a: "付款方式和时间因诊所而异，会在咨询时说明。",
    },
    {
      q: "回国后如果出现问题怎么办？",
      a: "请通过LINE咨询，我们会协助联系您就诊的诊所。（术后护理范围待确认）",
    },
    {
      q: "皮肤分析结果可以当作诊断吗？",
      a: "不能。皮肤分析结果仅供参考，并非诊断。实际状况需要经医生面诊确认。",
    },
  ],
};

export default zhCN;
