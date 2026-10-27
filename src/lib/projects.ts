export type Project = {
    title: string;
    href: string;
    supervisor: string;
    date: string;
    img: string;
    intro: string;
    sections: Section[];
    slug: string;
};

export type Section = {
    image: string;
    subtitle: string;
    description: string;
}

function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

import rawData from '@/data/projects.json';
import type { Language } from '@/lib/i18n';

const raw = rawData as Array<Omit<Project, 'slug'>>;

export const projects: Project[] = raw.map((p) => ({ ...p, slug: slugify(p.title) }));

export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
    return projects.map((p) => p.slug);
}

type ProjectTranslation = {
    title: string;
    intro: string;
    sections: Array<Pick<Section, 'subtitle' | 'description'>>;
};

const traditionalChineseProjects: Record<string, ProjectTranslation> = {
    'cyborgcockroach-control': {
        title: '仿生蟑螂控制',
        intro: '仿生蟑螂控制系統的模擬與實作。',
        sections: [
            {
                subtitle: '蟑螂控制示範',
                description: '展示仿生蟑螂控制系統的運作。',
            },
            {
                subtitle: '手術',
                description: '為蟑螂進行術前準備，以植入控制裝置。',
            },
        ],
    },
    's-c-o-p-e': {
        title: 'S.C.O.P.E.',
        intro: '用於評估衛星星座觀測效能的模擬器。',
        sections: [
            {
                subtitle: '控制示範',
                description: '展示系統的控制功能。',
            },
            {
                subtitle: '簡介',
                description: 'S.C.O.P.E.（衛星—地面協同觀測效能評估器）提供輕量但功能強大的環境，用於視覺化及評估低軌衛星的運作情境。',
            },
            {
                subtitle: '模擬器目標',
                description: '主要目標是建立一個實驗平台，能產生真實的衛星—地面互動資料、執行任務排程與卸載邏輯，並評估不同最佳化策略的效能。',
            },
            {
                subtitle: '系統設計與架構',
                description: '模擬器整合了衛星動力學、可見性分析、任務生成、通訊建模、軌道能源消耗及基於強化學習的決策等模組化元件。',
            },
        ],
    },
    'smart-cradle': {
        title: '智慧嬰兒床',
        intro: '以嬰兒監測硬體與應用程式開發為主題的學士物聯網專案。',
        sections: [
            {
                subtitle: '簡介',
                description: '智慧嬰兒床系統由一系列共享及交換資訊的軟硬體組成，協助父母監測並照顧嬰兒。',
            },
            {
                subtitle: '專案概覽',
                description: '此畢業專案結合軟硬體開發，成果包括以 Raspberry Pi 為基礎的智慧嬰兒床、供使用者使用的行動應用程式，以及供管理人員使用的網頁應用程式。',
            },
            {
                subtitle: '硬體元件',
                description: '智慧嬰兒床系統的硬體部分為嬰兒床裝置，可透過感測器收集心率等嬰兒身體資料。',
            },
        ],
    },
    momcare: {
        title: 'Momcare',
        intro: '為孕婦提供健康管理與支援的行動應用程式。',
        sections: [
            {
                subtitle: '簡介',
                description: '為孕婦提供個人化健康管理與支援的智慧助理軟體。',
            },
            {
                subtitle: '應用程式目標',
                description: '開發智慧助理軟體，為孕婦提供個人化健康管理與支援，從而改善懷孕期間的健康狀況。本專案由博特拉大學軟體工程系與馬來西亞 Columbia Asia Hospital 合作進行。',
            },
            {
                subtitle: 'Momcare 應用程式介面',
                description: '專案首先與 Columbia Asia Hospital 的醫生合作研究，以釐清軟體需求與使用者需要；介面採用 Figma 製作原型，以確保良好的使用體驗。行動應用程式以 Flutter 與 Dart 實作，後端服務（資料儲存、處理及使用者管理）則以 Laravel 與 PHP 建置。',
            },
        ],
    },
    'eos-credit': {
        title: 'EOS Credit',
        intro: '在 EOS Systems Sdn. Bhd. 實習期間開發的行動貸款應用程式。',
        sections: [
            {
                subtitle: 'EOS Credit 應用程式簡介',
                description: 'EOS Credit 是一款行動應用程式，旨在為需要財務協助的人士提供方便且安全的貸款服務。',
            },
            {
                subtitle: '應用程式目標',
                description: '目標是開發創新的財務支援應用程式，為需要快速資金支援的人士提供安全且靈活的貸款方案。本專案由博特拉大學軟體工程系與 EOS Systems Sdn. Bhd. 合作進行。',
            },
            {
                subtitle: '開發與發布',
                description: 'EOS Credit 應用程式使用 Flutter 框架開發，以符合 EOS Systems Sdn. Bhd. 提供的特定需求與設計準則。專案於實習期間完成，並成功在馬來西亞地區的 Google Play 商店發布；同時亦製作了示範宣傳影片。',
            },
        ],
    },
};

export function localizeProject(project: Project, language: Language): Project {
    if (language === 'en') return project;

    const translation = traditionalChineseProjects[project.slug];
    if (!translation) return project;

    return {
        ...project,
        title: translation.title,
        intro: translation.intro,
        sections: project.sections.map((section, index) => ({
            ...section,
            ...translation.sections[index],
        })),
    };
}
