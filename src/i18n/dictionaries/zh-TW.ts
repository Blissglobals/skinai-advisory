import type { Dictionary } from "./ko";
import type { DeepPartial } from "../deepMerge";

const zhTW: DeepPartial<Dictionary> = {
  meta: {
    title: "SkinAI Advisory",
    description: "AI驅動的個人化肌膚診斷與保養資訊服務",
  },

  home: {
    badge: "SkinAI Advisory",
    heading1: "只需一張照片",
    heading2: "立即了解你的肌膚狀態",
    subtitle: "AI會分析臉部輪廓與膚質紋理,並提供一般性的保養資訊。",
    steps: [
      "1. 免費基礎掃描",
      "2. 選擇想改善的項目",
      "3. 部位精密掃描",
      "4. 查看綜合報告",
    ],
    cta: "免費開始掃描",
    footnote: "本服務僅提供一般資訊,並非醫學診斷。",
  },

  consent: {
    badge: "開始前須知",
    heading: "開始前請先確認以下內容",
    notices: [
      "本服務的分析結果會因拍攝環境(光線、角度、相機性能)而有準確度上的差異。",
      "本服務並非醫療器材,不執行診斷、處方等醫療行為。分析結果為AI分析所得,並非專科醫師或專家的意見,不代表醫學上的判斷。",
      "無論分析結果為何,若肌膚出現異常症狀,請務必諮詢皮膚科專科醫師。",
      "拍攝的照片僅在此裝置(瀏覽器)內進行分析,不會傳送至伺服器或被儲存。",
      "報告中提及的療程、成分相關資訊僅為一般性資訊提供,並非推薦特定醫院或療程。",
    ],
    agree: "我已確認以上所有內容並同意。",
    start: "開始檢測",
  },

  scan: {
    stepLabels: ["掃描", "選擇目標", "深度分析", "解決方案"],
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

    step1: {
      badge: "STEP 1 · 免費掃描",
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
      badge: "STEP 4 · 綜合報告 · 預覽模式",
      headingPrefix: "綜合肌膚評分",
      headingSuffix: "分",
      outOf10: "(滿分10分)",
      previewNotice: "在串接付款功能之前,將直接為您顯示完整報告。",
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
        "· 臉部輪廓、左右對稱:使用Google MediaPipe Face Landmarker(468個臉部特徵點辨識模型)分析臉部結構。",
        "· 毛孔(雙頰)、色素(雙頰+額頭)、皺紋(眼周+額頭+法令紋):將各部位分別裁切後,計算亮度變異、邊緣密度與色彩偏差,再取平均值,為自主開發的影像分析邏輯。",
        "· 彈力:將下顎線特徵點的下垂程度,換算為相對於臉部長度的比例。",
        "· 推估年齡:使用另一套臉部辨識與年齡推估深度學習模型(TinyFaceDetector + AgeGenderNet)計算。",
        "· 拍攝前會先確認光線亮度與色偏,並依使用者親自調整確認的數值校正白平衡後再進行分析。",
        "· 個人色彩(暖色調/冷色調系列)是根據測得的亮度與底色調組合而成的簡易推估值。",
        "· 拍攝當下並非僅擷取單一畫面,而是在約0.4秒內測量多個畫面並取平均值,以降低晃動或瞬間雜訊的影響。",
        "· 膚色是將色彩數值轉換為CIE Lab色彩空間後計算ITA(個體分型角),再依費茲派翠克量表(以紫外線反應為基準的皮膚科學分類標準)進行分類。",
        "· 若照片過暗、光線色偏過於嚴重,或臉部辨識不穩定,系統將引導重新拍攝,而非自動校正。",
        "· 同齡層比較排名為娛樂性質的推估值,並非根據實際使用者統計數據。",
        "· 從5個畫面中排除離群值(最大值、最小值)後計算分數,並採用曲線型計分方式,使極端測量值也不會直接落在0分,而是平緩收斂。",
        "· 各項目的說明文字是依分數區間與其他項目的相對位置組合而成,每次拍攝都會依結果而有所不同。",
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
