export type Moment = {
  period: string;
  category: string;
  title: string;
  org: string;
  supervisor: string;
  bullets: string[];
  image?: string;
  highlight?: boolean;
};

export const traditionalChineseMoments: Moment[] = [
  {
    period: "08/2026 — 11/2026",
    category: "研究助理",
    title: "加入綠色智慧製造研究中心的研究專案，為生物機器人、昆蟲機器人與智慧控制系統提供研究支援及技術開發。",
    org: "綠色智慧製造研究中心",
    supervisor: "馬元教授",
    bullets: [],
  },
  {
    highlight: true,
    period: "08/2026",
    category: "",
    title: "論文〈軌道邊緣運算中面向地球觀測的延遲—能源協同最佳化任務排程〉獲 2026 IEEE 第 23 屆行動隨意網路與智慧系統國際會議（MASS）接受，錄取率為 29.7%。",
    org: "IEEE MASS 2026",
    supervisor: "衷心感謝劉瑜教授與張翔智先生",
    bullets: [],
  },
  {
    period: "05/2026",
    category: "",
    title: "向 MASS 2026 投稿論文〈軌道邊緣運算中面向地球觀測的延遲—能源協同最佳化任務排程〉。",
    org: "",
    supervisor: "",
    bullets: [],
  },
  {
    period: "03/2026 - 07/2026",
    category: "研究助理",
    title: "參與軌道邊緣運算中面向地球觀測的延遲—能源協同最佳化任務排程研究。",
    org: "香港理工大學計算學系",
    supervisor: "劉瑜教授",
    bullets: [
      "提出符合實際情境的系統模型，並將問題建模為 Dec-POMDP。",
      "運用 MAPPO 實現效能最佳化。",
      "開發實驗模擬程式，並透過基準方法比較驗證系統效能。",
      "撰寫並投稿研究論文。",
    ],
  },
  {
    period: "03/2026",
    category: "",
    title: "畢業於香港理工大學（PolyU），取得區塊鏈科技碩士學位。",
    org: "",
    image: "/photos/mas_grad.jpg",
    supervisor: "",
    bullets: [],
  },
  {
    period: "09/2025 - 12/2025",
    category: "學生",
    title: "碩士論文：資源感知的線上地球觀測任務卸載",
    org: "香港理工大學計算學系",
    supervisor: "劉瑜教授",
    bullets: [
      "提出符合實際情境的系統模型，並將問題建模為 MDP。",
      "在 Gym 環境中運用 PPO，實現線上聯合任務卸載與資源配置。",
      "開發用於實驗與展示的模擬器，並驗證演算法效能。",
      "撰寫畢業學術論文。",
    ],
  },
  {
    period: "09/2024",
    category: "",
    title: "入讀香港理工大學（PolyU）區塊鏈科技碩士課程。",
    org: "",
    supervisor: "",
    bullets: [],
  },
  {
    period: "06/2024 - 03/2024",
    category: "教學助理",
    title: "IELTS 教學助理",
    org: "北京清芬教育科技有限公司",
    supervisor: "彭書強先生",
    bullets: [
      "協助教授 IELTS 備考課程，包括寫作、口說、聽力及閱讀技巧指導。",
      "組織練習課程並提供回饋，協助學生提升 IELTS 考試表現。",
    ],
  },
  {
    highlight: true,
    period: "01/2024",
    category: "證書",
    title: "IELTS Academic 總分 7 分",
    org: "",
    image: "/certs/ielts_3.png",
    supervisor: "",
    bullets: [],
  },
  {
    period: "03/2023 - 03/2024",
    category: "行動應用程式開發者",
    title: "EOS Credit 線上貸款行動應用程式",
    org: "EOS Systems Sdn. Bhd.",
    image: "/photos/eos_intern.jpg",
    supervisor: "Anita 博士、Ng Keng Yap 教授及 Benjamin Lim 先生",
    bullets: [
      "使用 Flutter 開發 EOS Credit，並最終於 Google Play 商店發布。",
      "製作示範宣傳影片以推廣應用程式。",
    ],
  },
  {
    period: "09/2023",
    category: "",
    title: "畢業於馬來西亞博特拉大學（UPM），取得軟體工程學士學位。",
    org: "",
    image: "/photos/bach_grad.jpg",
    supervisor: "",
    bullets: [],
  },
  {
    period: "12/2022",
    category: "證書",
    title: "IELTS Academic 總分 6.5 分",
    org: "",
    image: "/certs/ielts_2.png",
    supervisor: "",
    bullets: [],
  },
  {
    period: "10/2022 - 02/2023",
    category: "學生",
    title: "學士畢業專案：嬰兒智慧搖籃系統",
    org: "博特拉大學軟體工程系",
    supervisor: "Ng Keng Yap 教授",
    bullets: [
      "設計客戶端與管理端介面，並分別使用 Flutter 和 React 開發。",
      "在 Raspberry Pi 上建置 Python 驅動程式，提供 Wi-Fi／藍牙連線與硬體控制。",
      "整合自動健康追蹤與遠端管理功能。",
      "撰寫論文、軟體需求規格（SRS）與軟體設計文件（SDD）等專案文件。",
    ],
  },
  {
    period: "10/2021 - 04/2022",
    category: "研究助理",
    title: "學術專案：Momcare 孕婦智慧助理軟體",
    org: "博特拉大學軟體工程系",
    supervisor: "Ng Keng Yap 教授",
    bullets: [
      "與 Columbia Asia Hospital 的醫生共同研究需求，並使用 Figma 設計介面。",
      "使用 Flutter 與 Dart 開發行動應用程式，並以 Laravel 和 PHP 建置後端服務。",
      "建立資料庫、URI 與資料庫操作，以支援資料儲存、處理及使用者管理。",
      "使用 Flutter 開發健康資料記錄、提醒及個人化建議等核心模組。",
    ],
  },
  {
    period: "10/2021 - 11/2021",
    category: "競賽",
    title: "2021–2022 華為 ICT 大賽馬來西亞賽區季軍",
    org: "博特拉大學與華為馬來西亞",
    supervisor: "",
    image: "/certs/huawei_3rd.jpg",
    bullets: [
      "參加由華為與博特拉大學合辦的全國性 2021–2022 華為 ICT 大賽。",
      "獲得季軍。",
    ],
  },
  {
    period: "10/2021",
    category: "演講",
    title: "國際線上學習經驗分享",
    org: "馬來西亞博特拉大學 FSKTM",
    image: "/certs/mpp_cert.png",
    supervisor: "",
    bullets: [
      "於校級迎新活動 Minggu Perkasa Putra（MPP）中，以「國際線上學習經驗分享」為題擔任講者。",
    ],
  },
  {
    period: "08/2021 - 09/2021",
    category: "證書",
    title: "華為認證 ICT 工程師（HCIA）證書",
    org: "博特拉大學與華為馬來西亞",
    image: "/certs/huawei_cert.jpg",
    supervisor: "",
    bullets: [
      "參加由博特拉大學提供的華為 HCIA 考試準備課程。",
      "通過華為 HCIA 認證考試並取得證書。",
    ],
  },
  {
    period: "09/2019",
    category: "",
    title: "入讀馬來西亞博特拉大學（UPM）軟體工程學士課程。",
    org: "",
    supervisor: "",
    bullets: [],
  },
];
