import type { Dictionary } from "./ko";
import type { DeepPartial } from "../deepMerge";

const zhTW: DeepPartial<Dictionary> = {
  meta: {
    title: "ZeroLab 線上肌膚分析",
    description: "ZeroLab診所提供的線上肌膚分析・結果僅供參考，並非診斷",
  },

  home: {
    badge: "SkinAI Advisory",
    heading1: "只需一張照片",
    heading2: "立即了解你的肌膚狀態",
    subtitle: "AI會分析臉部輪廓與膚質紋理,並提供一般性的保養資訊。",
    steps: [
      "1. 選擇在意的肌膚困擾",
      "2. 拍攝一張臉部照片",
      "3. 查看結果",
    ],
    cta: "免費開始掃描",
    footnote: "本服務僅提供一般資訊,並非醫學診斷。",
    privacyNote: "照片只在這台裝置上分析，不會被儲存到任何地方。",
  },

  // 초안: 법률 검토 전입니다.(ko.ts privacy 번역).
  privacy: {
    title: "隱私權政策",
    effectiveDate: "施行日期：2026年10月23日",
    intro:
      "ZeroLab診所（제로랩의원，以下簡稱「本診所」）經營線上肌膚分析，以及LINE諮詢・看診預約說明服務（以下簡稱「本服務」）。本政策說明本診所在本服務中如何處理您的個人資料。",
    sections: [
      {
        heading: "1. 處理的個人資料與處理方式",
        body: [
          "· 肌膚分析：相機影像、分析分數及您輸入的年齡，只在您的裝置（瀏覽器）內處理，不會傳送到本診所伺服器，也不會被儲存。",
          "· LINE諮詢：只有在您按下「LINE諮詢」按鈕並自行傳送訊息時，本診所才會透過LINE官方帳號取得您的LINE顯示名稱、大頭貼、LINE使用者識別碼、您傳送的訊息內容（感興趣的療程、肌膚困擾、分析分數摘要等），以及諮詢過程中您提供的資訊（來韓行程、希望的看診日期等）。",
          "· 加入或封鎖LINE官方帳號時，LINE使用者識別碼可能會留在服務運作紀錄（伺服器日誌）中。",
          "· 連線使用本服務時，主機服務業者會處理IP位址、連線時間、瀏覽器資訊等連線紀錄。",
        ],
      },
      {
        heading: "2. 使用目的",
        body: [
          "回覆諮詢、說明看診預約，以及維護服務穩定與安全。只有在您另外同意時，才會傳送本診所的消息給您。",
        ],
      },
      {
        heading: "3. 保存期間與銷毀",
        body: [
          "諮詢相關資訊自諮詢結束之日起保存1年，期滿後立即銷毀。您要求刪除時，除非法令規定須保存，否則會立即銷毀。伺服器日誌於30天內刪除。",
        ],
      },
      {
        heading: "4. 提供給第三方",
        body: [
          "本診所不會將您的個人資料提供給第三方，但依法令規定者除外。",
        ],
      },
      {
        heading: "5. 委託處理與跨境傳輸",
        body: [
          "· LY Corporation（日本）：LINE訊息的收發與保存。使用LINE時，也同時適用LINE的隱私權政策。",
          "· Vercel Inc.（美國）：服務主機代管與連線紀錄處理。",
          "上述資訊會在您使用服務時透過網路傳輸，並依委託契約或各業者條款規定的期間保存。如果您不希望資料跨境傳輸，可以不使用LINE諮詢；即使如此，仍可使用肌膚分析。",
        ],
      },
      {
        heading: "6. Cookie等自動收集機制",
        body: ["本診所在本服務中不使用以使用分析或廣告為目的的Cookie。"],
      },
      {
        heading: "7. 您的權利與行使方式",
        body: [
          "您可以隨時要求查閱、更正、刪除、停止處理個人資料，或拒絕接收服務消息。透過LINE訊息或下方電子郵件提出要求，我們會立即處理。",
        ],
      },
      {
        heading: "8. 不提供個人資料時",
        body: [
          "肌膚分析不需提供個人資料即可使用。若未提供LINE諮詢所需的資訊，將無法獲得諮詢與預約說明服務。",
        ],
      },
      {
        heading: "9. 未成年人",
        body: [
          "諮詢與預約說明服務以年滿19歲者為對象。本診所不收集未滿14歲兒童的個人資料。",
        ],
      },
      {
        heading: "10. 安全維護措施",
        body: [
          "臉部分析設計為在您的裝置上處理，而非伺服器。諮詢資訊的存取權限僅限於最少數的負責人員。",
        ],
      },
      {
        heading: "11. 個人資料保護負責人與聯絡窗口",
        body: ["ZeroLab診所（제로랩의원） 個人資料保護負責人 Kim Dongwon（代表院長）", "電子郵件：info@zerolabclinic.com"],
      },
      {
        heading: "12. 政策變更",
        body: [
          "本政策可能因法令或服務變更而修改，變更時會在本頁面公告。新增LINE登入等會產生新的個人資料處理的功能時，會在施行前修訂本政策並取得必要的同意。",
        ],
      },
    ],
    footer: "本政策自2026年10月23日起適用。",
    linkLabel: "隱私權政策",
    continueButton: "我已確認，繼續",
  },

  precision: {
    entry: "試試精密分析",
    entryNote: "測試版・4張照片・約2分鐘",
    directEntry: "LINE登入後直接進行精密分析",
    directEntryNote: "4張照片・約2分鐘・目前為測試版，不需登入即可直接開始",
    backToStart: "回到起始畫面",
    badge: "精密分析・測試版",
    introHeading: "用4張照片\n看得更仔細",
    introSteps: [
      "全臉・正面一張",
      "顴骨周圍放大・色素",
      "眼周放大・皺紋",
      "鼻翼旁臉頰放大・毛孔",
    ],
    modeLabel: "要怎麼拍？",
    rearAdvice: "精密分析用後鏡頭準確許多。前鏡頭受畫質與對焦限制，誤差較大。",
    recommended: "推薦",
    modeMirror: "對著鏡子自己拍",
    modeMirrorHint: "後鏡頭・看著鏡子裡映出的畫面拍攝",
    modeHelper: "請別人幫忙拍",
    modeHelperHint: "後鏡頭・最清晰，還能使用補光燈",
    modeSelf: "用前鏡頭輕鬆拍",
    modeSelfHint: "沒有鏡子時・準確度較低，僅供參考",
    mirrorGuideTitle: "對鏡拍攝方法",
    mirrorGuideSteps: [
      "將手機背面的鏡頭朝向臉部。",
      "手機螢幕（正面）朝向鏡子，鏡子裡就會映出螢幕畫面。",
      "眼睛看著鏡子裡映出的畫面，把臉對準引導框。對準後會自動拍攝。",
    ],
    mirrorGuideNote: "放大拍攝會在倒數音效結束後自動拍攝。",
    mirrorGuideAlt: "在鏡子前將手機背面鏡頭朝向臉部，看著鏡中映出的螢幕畫面",
    autoShot: "秒後自動拍攝",
    frontLowAccuracy: "這是用前鏡頭拍攝的結果。受畫質與對焦限制，誤差可能較大，請當作參考。",
    start: "開始",
    notice:
      "放大照片的濾鏡是為了讓色素、皺紋、膚質更明顯而加強對比的呈現效果，並非UV等特殊光源拍攝，也不是醫療診斷。",
    faceBadge: "1/4・全臉精密拍攝",
    faceHeading: "螢幕會亮起強光，請看向正面",
    faceFlash: "正在精密拍攝，請不要移動",
    zones: {
      pigment: { badge: "2/4・色素", heading: "請將顴骨上方的臉頰對準方框", filter: "色素強調濾鏡" },
      wrinkle: { badge: "3/4・皺紋", heading: "請將眼尾外側對準方框", filter: "皺紋強調濾鏡" },
      pore: { badge: "4/4・毛孔", heading: "請將鼻翼旁的臉頰（蝴蝶區）對準方框", filter: "膚質強調濾鏡" },
    },
    distanceHint: "請距離肌膚10～15公分，對焦清楚後再拍。",
    sharp: "對焦良好",
    blurry: "對焦中",
    torchOn: "開啟補光燈",
    torchOff: "關閉補光燈",
    torchUnsupported: "此裝置無法透過網頁開啟補光燈，請在明亮處拍攝。",
    shutter: "拍攝",
    skip: "跳過這個部位",
    retry: "重試",
    resultBadge: "結果・精密分析（測試）",
    resultHeading: "精密肌膚分數",
    closeupTitle: "放大拍攝",
    showOriginal: "原圖",
    showFilter: "濾鏡",
    deviceTitle: "裝置測量值（測試用）",
    deviceNote: "為了訂定各裝置能否進行精密分析的標準而收集的數值。",
    device: {
      faceRes: "前鏡頭解析度",
      pxPerMm: "臉部每1mm的像素",
      closeRes: "放大拍攝解析度",
      torch: "補光燈",
      sharpness: "放大照片清晰度",
      mode: "拍攝方式",
    },
    supported: "支援",
    unsupported: "不支援",
    unknown: "無法測量",
    consultTag: "精密分析結果",
    backToBase: "返回基本結果",
  },

  consult: {
    cta: "透過LINE諮詢診所",
    note: "按下按鈕後，LINE諮詢視窗會預先填入含有您分析結果的訊息。諮詢時間為韓國時間10:00～18:00。",
    ageRestricted: "療程諮詢僅限年滿19歲的使用者。",
    message: {
      title: "【肌膚分析諮詢申請】",
      concern: "在意的部位",
      overall: "綜合分數",
      outOf: "/ 10",
    },
  },

  promo: {
    title: "想了解肌膚諮詢嗎?",
    body: "帶著分析結果，透過LINE諮詢ZeroLab診所吧。",
    cta: "透過LINE諮詢",
  },

  consent: {
    badge: "開始前須知",
    heading: "開始前請先確認以下內容",
    notices: [
      "本服務的分析結果會因拍攝環境(光線、角度、相機性能)而有準確度上的差異。",
      "本服務並非醫療器材,不執行診斷、處方等醫療行為。分析結果為AI分析所得,並非專科醫師或專家的意見,不代表醫學上的判斷。",
      "無論分析結果為何,若肌膚出現異常症狀,請務必諮詢皮膚科專科醫師。",
      "拍攝的照片僅在此裝置(瀏覽器)內進行分析,不會傳送至伺服器或被儲存。",
      "結果畫面中的療程、成分相關資訊皆為一般性資訊，並非推薦特定診所或療程。",
    ],
    agree: "我已確認以上所有內容並同意。",
    start: "開始檢測",
  },

  scan: {
    stepLabels: ["選擇目標", "拍攝", "結果"],
    needOptions: {
      elasticity: "彈力/鬆弛",
      pigment: "色素/斑點",
      pore: "毛孔/膚質",
      wrinkle: "皺紋",
    },
    focusLabel: {
      pore: "毛孔",
      wrinkle: "皺紋",
      pigment: "色素",
      elasticity: "彈力",
    },
    cameraPreparing: "相機尚在準備中,請稍後再試一次。",
    analysisError: "分析過程中發生錯誤,請重新拍攝。",
    retakeNeeded: "需要重新拍攝",
    retakeButton: "重新拍攝",
    retryingNotice: "照片狀態不佳,將重新拍攝。",
    persistentFailureTitle: "照片狀態持續不佳",
    proceedAnyway: "仍要繼續",
    proceedAnywayHint: "準確度可能會較低。",

    goal: {
      badge: "STEP 1 · 選擇目標",
      heading: "最在意哪個部分呢？",
      next: "前往拍攝",
    },

    step1: {
      badge: "STEP 2 · 臉部拍攝",
      heading: "請將臉部對準引導框",
      hintPrefix: "對準引導線後,將會",
      hintAuto: "自動",
      hintSuffix: "拍攝。",
      guideLabel: "全臉掃描",
      analyzing: "分析中...",
      captureNow: "立即拍攝",
    },

    step2: {
      badge: "STEP 2 · 選擇目標",
      heading: "初步掃描結果",
      toneLabel: "膚色(費茲派翠克分類)",
      symmetryLabel: "左右對稱",
      point: "分",
      fitzScaleLabel: "費茲派翠克量表(僅供參考)",
      fitzScaleSuffix: "此為根據照片推估的結果,可能與實際紫外線反應有所不同。",
      ageRangeLabel: "推估肌膚年齡",
      undertoneLabel: "膚底色調(僅供參考)",
      personalColorLabel: "個人色彩推估(僅供參考)",
      personalColorSuffix: "建議透過專業診斷確認精確的個人色彩分析結果。",
      ageInputLabel: "請輸入年齡,以便進行同齡比較",
      agePlaceholder: "例如:28",
      ageRequired: "請先輸入年齡才能進入下一步。",
      needPrompt: "請選擇想改善的部位",
      next: "下一步",
    },

    step3: {
      badge: "STEP 3 · 部位深度掃描",
      heading: "請讓整張臉都對齊引導框",
      focusPrefix: "AI將以",
      focusSuffix: "為中心進行自動分析。",
      hintPrefix: "對準引導線後,將會",
      hintAuto: "自動",
      hintSuffix: "拍攝。",
      guideLabelSuffix: "精密分析",
      analyzing: "分析中...",
      captureNow: "立即拍攝",
    },

    step4: {
      badge: "結果 · 基本拍攝",
      headingPrefix: "簡易肌膚分數 ",
      headingSuffix: "分",
      outOf10: "(滿分10分)",
      previewNotice: "這是用一張照片得出的簡易結果。毛孔・膚質可在精密分析中確認。",
      lockedLabel: "精密分析中確認",
      lockedHint: "一般自拍解析度難以準確判斷，將在精密分析中提供。",
      lockedFocus: "這是您選擇的困擾，精密分析可以看得更仔細。",
      funTitle: "看看就好的趣味結果",
      funNote: "會因光線與相機而不同，僅供參考。",
      lowConfidence: "拍攝照片不夠精確,誤差可能性較高",
      percentilePrefix: "歲群組中排名前",
      percentileSuffix: "%",
      percentileDisclaimer:
        "此排名僅供娛樂參考,並非根據實際使用者統計數據。未來累積足夠數據後,將改以真實統計為基礎更新。",
      worstBadge: "最需要改善",
      bestBadge: "表現最佳",
      procedureLabel: "療程建議:",
      cosmeticLabel: "保養品建議:",
      methodologyToggle: "這個分數是如何計算的?",
      methodology: [
        "· 臉部結構：以 Google MediaPipe Face Landmarker（478 個臉部特徵點）分析臉部位置、角度與對稱。",
        "· 斑點・皺紋：依臉寬只擷取兩頰、額頭、眼尾外側、法令紋部位的肌膚，計算相對亮度的斑駁程度（斑點）與線條成分（皺紋）。",
        "· 毛孔・膚質在一般自拍解析度下難以準確判斷，將在精密分析中提供。",
        "· 膚色、底色與個人色彩是將未經校正的相機色彩轉換為 CIE Lab 色彩空間來推估，會因光線顏色與亮度而不同。",
        "· 推估年齡：使用另一個臉部年齡推估模型（TinyFaceDetector + AgeGenderNet）計算。",
        "· 約 0.4 秒內測量多個畫面，排除極端值後取平均作為分數。",
        "· 若照片太暗、光線顏色明顯偏差或臉部未朝正面，會提示重新拍攝。",
        "· 同齡比較排名並非實際使用者統計，僅為趣味用的推估值。",
        "· 各項目的說明文字是依分數區間與項目間的相對位置組合而成。",
      ],
      methodologyFootnote:
        "* 本指標僅供參考,並非醫療器材等級的精密診斷。年齡推估可能存在平均誤差,分數也可能因光線與角度而有所變動。",
    },
  },

  camera: {
    brightnessGood: "良好",
    brightnessLow: "偏暗",
    brightnessMeasuring: "測量中",
    instructionCountdownSuffix: "秒後將透過臉部辨識自動拍攝。",
    instructionHint: "請讓臉部完整填滿畫面中央的虛線框。",
    alignedLabel: "對齊完成 · 拍攝中",
    lightingLabel: "光線",
    calibrationHintDefault: "正在確認光線...",
  },

  lighting: {
    dark: "光線過暗,請移動到更明亮的地方。",
    yellowCast: "目前光線偏黃,請嘗試在白光下拍攝。",
    blueCast: "目前光線偏藍,請嘗試在自然光下拍攝。",
    good: "光線適中。",
  },

  cameraStream: {
    permissionError: "無法存取相機,請確認瀏覽器權限設定。",
  },

  analysisMessages: {
    cameraNotReady: "相機尚在準備中,請稍後再試一次。",
    faceNotDetected: "無法清楚辨識臉部,請重新拍攝。",
    tooDark: "照片過暗,請在明亮處重新拍攝。",
    colorCastSevere: "光線色偏過於嚴重,難以準確分析,請在其他光源下重新拍攝。",
    videoOnly: "目前的引擎僅支援影片畫面輸入。",
    ageFallback: {
      early20s: "約20歲初期程度(推估失敗,僅供參考)",
      late20sEarly30s: "約20歲後期至30歲初期程度(推估失敗,僅供參考)",
      mid30s: "約30歲中後期程度(推估失敗,僅供參考)",
      forties: "約40多歲程度(推估失敗,僅供參考)",
      lateForties: "約40歲後期以上程度(推估失敗,僅供參考)",
    },
    ageRangeUnderTen: "未滿10歲推估(約{age}歲)",
    ageRangeDecade: "{decade}多歲推估(約{age}歲)",
  },

  fitzpatrick: {
    I: {
      label: "類型 I",
      hint: "膚色非常白皙,對紫外線較敏感,容易曬傷。",
    },
    II: {
      label: "類型 II",
      hint: "膚色白皙,對紫外線較為敏感。",
    },
    III: {
      label: "類型 III",
      hint: "膚色中等,對紫外線會逐漸適應。",
    },
    IV: {
      label: "類型 IV",
      hint: "膚色偏深,對紫外線的耐受度較高。",
    },
    V: {
      label: "類型 V",
      hint: "膚色深,對紫外線的耐受度高。",
    },
    VI: {
      label: "類型 VI",
      hint: "膚色非常深,對紫外線的耐受度非常高。",
    },
  },

  undertone: {
    warm: {
      label: "暖色調",
      hint: "帶黃色調的底色,通常適合金色、珊瑚色系。",
    },
    cool: {
      label: "冷色調",
      hint: "帶藍色調的底色,通常適合銀色、玫瑰色系。",
    },
    neutral: {
      label: "中性色調",
      hint: "不偏向暖色調或冷色調任一方的中間底色。",
    },
  },

  personalColor: {
    spring_warm: {
      label: "春季暖色調(Spring)",
      hint: "通常適合明亮、鮮豔的暖色調系列。",
      palette: ["#F4A261", "#F6C85F", "#F7E1B5", "#E76F51"],
    },
    autumn_warm: {
      label: "秋季暖色調(Autumn)",
      hint: "通常適合沉穩、具深度感的暖色調系列。",
      palette: ["#8A5A2B", "#B08040", "#6B4226", "#C9A66B"],
    },
    summer_cool: {
      label: "夏季冷色調(Summer)",
      hint: "通常適合柔和、明亮的冷色調系列。",
      palette: ["#B39CD0", "#F4C2C2", "#A7C7E7", "#C9CBD3"],
    },
    winter_cool: {
      label: "冬季冷色調(Winter)",
      hint: "通常適合鮮明、對比強烈的冷色調系列。",
      palette: ["#1D1D1D", "#FFFFFF", "#C8102E", "#4B4E9E"],
    },
    neutral: {
      label: "中性(判定不明顯)",
      hint: "未明顯偏向暖色調或冷色調任一方,能夠駕馭多種色調。",
      palette: ["#C9C4B8", "#A9A9A9", "#D9CBB8", "#8C8C8C"],
    },
  },

  metrics: {
    pore: {
      label: "毛孔",
      description: "測量雙頰部位膚質紋理的均勻度。",
    },
    wrinkle: {
      label: "皺紋",
      description: "測量眼周、額頭、法令紋等容易出現表情紋部位的邊緣密度。",
    },
    pigment: {
      label: "色素",
      description: "測量雙頰與額頭部位的色彩均勻度(色素偏差)。",
    },
    elasticity: {
      label: "彈力",
      description: "透過下顎線的下垂程度推估肌膚彈力。",
    },
  },

  solutions: {
    pore: {
      procedureInfo:
        "以改善毛孔紋理為目的的療程,常見的有促進皮膚再生的皮膚保養針(skin booster)、飛梭雷射等。",
      cosmeticInfo: "含有菸鹼醯胺、BHA(水楊酸)成分的產品常用於毛孔紋理保養。",
    },
    wrinkle: {
      procedureInfo:
        "以改善皺紋為目的,常見的療程類型包括肉毒桿菌素、麗珠蘭/PN皮膚保養針等。",
      cosmeticInfo: "含有A醇、胜肽成分的產品常用於皺紋保養。",
    },
    pigment: {
      procedureInfo:
        "以改善色素沉澱為目的,常見的療程類型包括淨膚雷射、脈衝光(IPL)等。",
      cosmeticInfo: "含有維生素C、熊果素、菸鹼醯胺成分的產品常用於色素保養。",
    },
    elasticity: {
      procedureInfo:
        "以改善彈力為目的,常見的療程類型包括高頻(RF)、超音波(HIFU)拉提療程。",
      cosmeticInfo: "含有膠原蛋白、腺苷成分的乳霜常用於彈力保養。",
    },
  },

  solutionDisclaimer:
    "本資訊僅為一般成分/療程機制介紹,並非推薦特定醫療機構或療程,亦不提供醫學診斷。療程相關決定請務必諮詢專科醫師後再進行。",

  scenario: {
    tierText: {
      pore: {
        low: "雙頰整體毛孔明顯擴張,膚質紋理較不均勻。皮脂分泌旺盛或角質堆積時會更加明顯。持續的角質管理與舒緩保養會有幫助。",
        midLow:
          "雙頰觀察到部分毛孔略微擴張。通常集中在特定部位(主要是鼻側或臉頰中央)。搭配輕度角質保養與保濕,有助於改善。",
        midHigh:
          "雙頰毛孔狀態相對良好,未見明顯異常。不過此部位可能會因季節或身體狀況而暫時變化。維持目前的保養習慣,並注意防曬即可。",
        high: "雙頰毛孔緊緻細緻,膚質紋理相當光滑。這可能是肌膚屏障穩定維持的訊號。建議繼續維持目前的保養方式。",
      },
      wrinkle: {
        low: "眼周、額頭與法令紋部位可觀察到明顯的細紋。可能是表情習慣、長期紫外線曝曬與水分不足等因素共同造成。同時做好保濕與防曬,有助於減緩其發展速度。",
        midLow:
          "眼周或額頭處可見部分細紋。若僅在做表情時才明顯,很可能還屬於初期階段。從現在開始加強保濕與眼周專用保養會有幫助。",
        midHigh:
          "眼周與額頭紋路維持得相對穩定。法令紋部位也沒有太大變化,狀態尚可。在目前的保養習慣中持續加強保濕即可。",
        high: "眼周、額頭、法令紋線條平滑,幾乎觀察不到皺紋。這是肌膚彈力與水分平衡維持良好的訊號。建議繼續維持目前的保養方式。",
      },
      pigment: {
        low: "雙頰與額頭部位的色調差異明顯,色素沉澱較為顯著。可能是紫外線曝曬或發炎後色素沉澱所致。建議以防曬為優先,並搭配美白機能性成分會有幫助。",
        midLow:
          "雙頰或額頭部分區域觀察到色調差異。目前看來還是尚未擴散的局部階段。搭配防曬持續保養,有助於防止擴散。",
        midHigh:
          "雙頰與額頭的膚色相對均勻。沒有明顯的色素沉澱,維持得相當穩定。像現在這樣持續做好防曬即可。",
        high: "雙頰與額頭的膚色非常均勻明亮。這是色素管理得當的訊號。建議繼續維持目前的防曬習慣。",
      },
      elasticity: {
        low: "下顎線明顯觀察到鬆弛現象,懷疑彈力有所下降。可能是膠原蛋白減少或肌肉鬆弛所致。搭配彈力保養成分與拉提護理會有幫助。",
        midLow:
          "下顎線觀察到些微鬆弛。看起來還處於初期階段,依保養方式不同,發展速度也會有所差異。持續使用含彈力成分的產品會有幫助。",
        midHigh:
          "下顎線彈力維持得相對穩定,沒有明顯鬆弛,狀態尚可。在目前的保養習慣中加入彈力護理即可。",
        high: "下顎線條緊緻,彈力表現良好。這可能是膠原蛋白密度維持良好的訊號。建議繼續維持目前的保養方式。",
      },
    },
    overallPattern: {
      0: "四項指標皆表現良好,整體肌膚狀態穩定。",
      1: "大部分指標表現良好,只需留意其中一項即可。",
      2: "部分指標需要改善,但整體而言相當均衡。",
      3: "多項指標都需要留意保養,建議訂定優先順序逐步處理。",
      4: "整體上都需要加強保養,建議先從基礎保養開始逐步進行。",
    },
    interactionText: "特別是{worst}項目相對需要留意,而{best}則維持得很穩定。",
  },
};

export default zhTW;
