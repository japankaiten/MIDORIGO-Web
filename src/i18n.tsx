import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'my', label: 'မြန်မာ' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'es', label: 'Español' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

type IconName = 'market' | 'briefcase' | 'home' | 'calendar' | 'car' | 'scan' | 'map' | 'recycle' | 'language';
type FaqItem = { question: string; answer: string };
type FeatureItem = { icon: IconName; title: string; text: string };
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

type LocaleContent = {
  locale: string;
  routes: { home: string; privacy: string; terms: string; contact: string; support: string; deleteAccount: string };
  common: {
    language: string;
    appNameJa: string;
    footerAbout: string;
    legalAndSupport: string;
    policyDetails: string;
    termsDetails: string;
    copyright: string;
    independent: string;
    effectiveDate: string;
    operator: string;
    address: string;
    supportEmail: string;
  };
  home: {
    eyebrow: string;
    title: string;
    tagline: string;
    intro: string;
    ctaAvailability: string;
    ctaSupport: string;
    previewLabel: string;
    previewCardLabel: string;
    previewCardTitle: string;
    previewCardNote: string;
    previewScanLabel: string;
    previewScanTitle: string;
    previewScanNote: string;
    previewPills: string[];
    sections: {
      features: string;
      marketplace: string;
      platform: string;
      boundaries: string;
      residents: string;
      coreAreas: string;
      comingSoon: string;
      faq: string;
    };
    marketplaceLead: string;
    features: FeatureItem[];
    marketplaceCategories: string[];
    appAspects: FeatureItem[];
    platformBoundaries: string[];
    residentsParagraphs: string[];
    residentsChecks: string[];
    appAreas: Array<{ label: string; title: string }>;
    storeBadges: { appStore: string; playStore: string };
    faq: FaqItem[];
  };
  privacy: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: Array<{ title: string; paragraphs: string[] }>;
  };
  terms: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: Array<{ title: string; paragraphs: string[] }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    emailLabel: string;
    categoryLabel: string;
    messageLabel: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    supportTitle: string;
    supportBody: string;
    supportNote: string;
    categories: string[];
  };
  support: {
    eyebrow: string;
    title: string;
    intro: string;
    sectionTitle: string;
    outro: string;
    faq: FaqItem[];
  };
  deleteAccount: {
    eyebrow: string;
    title: string;
    intro: string;
    requestTitle: string;
    requestSteps: string[];
    sections: Array<{ title: string; paragraphs: string[] }>;
  };
};

const english: LocaleContent = {
  locale: 'en',
  routes: {
    home: 'Home',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    support: 'Support',
    deleteAccount: 'Delete Account',
  },
  common: {
    language: 'Language',
    appNameJa: 'ミドリゴ',
    footerAbout:
      'Circular economy listings, local trade, neighborhood information, and municipality-oriented waste support for residents in Japan.',
    legalAndSupport: 'Legal and support',
    policyDetails: 'Policy details',
    termsDetails: 'Terms details',
    copyright: '© 2026 MIDORIGO',
    independent: 'Independent platform unless separately stated.',
    effectiveDate: 'April 18, 2026',
    operator: 'Japan Kaiten company',
    address: 'Available upon valid request where required.',
    supportEmail: 'japankaiten@gmail.com',
  },
  home: {
    eyebrow: 'Circular economy platform for residents in Japan',
    title: 'Local access layer for circular communities.',
    tagline: 'Trade locally, reuse more, and stay aligned with municipal waste rules.',
    intro:
      'MIDORIGO connects local residents through second-hand listings, jobs, real estate, events, help requests, cars, and community trade. A municipality layer supports garbage calendars, AI item identification, disposal guidance, recycling facilities, and local issue reports.',
    ctaAvailability: 'Register early access for free',
    ctaSupport: 'Get support',
    previewLabel: 'MIDORIGO app preview',
    previewCardLabel: 'Local marketplace',
    previewCardTitle: 'Dining table',
    previewCardNote: 'Reuse before disposal',
    previewScanLabel: 'Municipality layer',
    previewScanTitle: 'Plastic bottles',
    previewScanNote: 'Pickup tomorrow',
    previewPills: ['Jobs near you', 'Events this week', 'AI disposal check'],
    sections: {
      features: 'What MIDORIGO helps with',
      marketplace: 'Community marketplace categories',
      platform: 'How the platform fits together',
      boundaries: 'Important platform boundaries',
      residents: 'For residents in Japan',
      coreAreas: 'Core app areas',
      comingSoon: 'Coming soon',
      faq: 'FAQ',
    },
    marketplaceLead:
      'MIDORIGO does not handle money or act as a payment provider. The app is a platform for posting, discovery, communication, and local coordination. Users are responsible for safe arrangements, legal compliance, and any trade terms they make with each other.',
    features: [
      { icon: 'market', title: 'Second-hand marketplace', text: 'List usable items for local trade, reuse, or giveaway. MIDORIGO connects people, but does not process payments.' },
      { icon: 'briefcase', title: 'Local jobs', text: 'Discover neighborhood work and service opportunities posted by people and organizations in the community.' },
      { icon: 'home', title: 'Real estate', text: 'Find local housing and property posts alongside the daily community information residents already need.' },
      { icon: 'calendar', title: 'Events and help', text: 'Share local events, ask for help, and find practical support from nearby residents.' },
      { icon: 'car', title: 'Cars and mobility trade', text: 'Post or browse local vehicle and mobility-related listings where supported by app rules.' },
      { icon: 'scan', title: 'Waste sorting scanner', text: 'Use AI-assisted item identification for municipality-oriented disposal guidance and next steps.' },
      { icon: 'calendar', title: 'Pickup calendar', text: 'Keep household collection days visible for burnable, non-burnable, recyclable, and oversized items.' },
      { icon: 'map', title: 'Local disposal rules', text: 'Save your city or area setup so guidance can be organized around the place where you live.' },
      { icon: 'recycle', title: 'Recycling facilities', text: 'Find nearby recycling, disposal, and drop-off options when an item needs special handling.' },
      { icon: 'language', title: 'Japanese and English support', text: 'Switch between languages for listings, daily tasks, local rules, reminders, and waste terms.' },
    ],
    marketplaceCategories: ['Second-hand goods', 'Jobs', 'Real estate', 'Events', 'Help requests', 'Cars and mobility'],
    appAspects: [
      { icon: 'market', title: 'Local trade and reuse', text: 'Residents can post and discover second-hand goods, giveaway items, cars, and other mobility listings so usable things stay in circulation longer.' },
      { icon: 'briefcase', title: 'Community opportunities', text: 'Jobs, help requests, events, and local notices give residents a practical place to find and share neighborhood opportunities.' },
      { icon: 'home', title: 'Housing and area discovery', text: 'Real estate posts can help people understand local housing options alongside the daily services and community activity around an area.' },
      { icon: 'map', title: 'Municipality-oriented layer', text: 'City and area settings support garbage calendars, disposal rules, recycling points, issue reports, and local waste guidance.' },
      { icon: 'scan', title: 'AI-assisted identification', text: 'Item photos can help residents identify likely disposal categories, while final decisions should still be checked against municipal rules.' },
      { icon: 'language', title: 'Bilingual everyday access', text: 'English and Japanese support helps residents navigate listings, local rules, reminders, and waste-related terms more easily.' },
    ],
    platformBoundaries: [
      'MIDORIGO does not process payments, hold funds, provide escrow, or guarantee trades.',
      'Listings, messages, jobs, real estate posts, events, help requests, and car posts are user-generated unless clearly stated otherwise.',
      'Users are responsible for lawful posts, safe communication, in-person arrangements, taxes, licenses, permits, and any trade terms.',
      'Municipality websites, printed guides, official notices, and local offices remain the source of truth for final waste disposal decisions.',
      'MIDORIGO may remove content, restrict accounts, or review reports when safety, fraud, abuse, illegality, or rule violations are suspected.',
    ],
    residentsParagraphs: [
      'MIDORIGO is designed for long-term residents, new movers, international residents, students, families, local workers, and community members who want practical neighborhood information in one place.',
      'The municipal layer helps with local disposal rules, AI-assisted item identification, pickup calendars, recycling facilities, and reports. The app is independent unless separately stated. Municipality websites, printed guides, and official contact points remain the final source for current garbage and recycling rules.',
    ],
    residentsChecks: [
      'Post reusable goods, jobs, homes, cars, events, and help requests',
      'Coordinate directly without MIDORIGO handling payment',
      'Save city or area settings',
      'Review bilingual municipal disposal guidance',
      'Report unclear listings or outdated waste information',
    ],
    appAreas: [
      { label: 'Marketplace', title: 'Second-hand goods and local posts' },
      { label: 'Municipality Layer', title: 'Garbage calendar and AI item checks' },
      { label: 'Community', title: 'Jobs, events, help, real estate, and cars' },
    ],
    storeBadges: {
      appStore: 'Coming soon on the App Store',
      playStore: 'Coming soon on Google Play',
    },
    faq: [
      { question: 'Is MIDORIGO an official government app?', answer: 'No. MIDORIGO is an independent circular economy platform unless a specific partnership is announced. Municipality rules remain the source of truth for final garbage and recycling decisions.' },
      { question: 'Does MIDORIGO handle payments?', answer: 'No. MIDORIGO is a platform for discovery, posting, and communication. Users are responsible for their own trade arrangements, and payment handling is not provided by MIDORIGO.' },
      { question: 'What can people post?', answer: 'MIDORIGO is intended for local second-hand goods, jobs, real estate, events, help requests, and cars or mobility listings, subject to app rules and local law.' },
      { question: 'Does MIDORIGO verify every listing?', answer: 'No. Listings and messages are user-generated. MIDORIGO may provide reporting and moderation tools, but users should review posts carefully and make safe arrangements.' },
      { question: 'Can the app tell me exactly how to throw away every item?', answer: 'MIDORIGO helps organize disposal guidance, but rules vary by municipality and can change. Residents should verify uncertain items with their local city, ward, town, or village office.' },
      { question: 'Will the app work in both Japanese and English?', answer: 'The app is designed for bilingual use so residents can understand local waste terms and schedules more easily.' },
      { question: 'When will the app be available?', answer: 'MIDORIGO is preparing for App Store and Google Play release. Final store URLs will be added after approval.' },
    ],
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'How MIDORIGO handles data',
    intro: 'This policy explains the information MIDORIGO may collect to provide local circular economy listings, community communication, and municipality-oriented waste support.',
    sections: [
      { title: 'Information we may collect', paragraphs: [
        'MIDORIGO may collect account email and profile information when you create or manage an account.',
        'MIDORIGO may collect email addresses and device preferences when people register for early access through the website or related registration forms.',
        'We may collect selected city, ward, town, area, location setup data, and approximate location signals when you choose to use local discovery, facility search, pickup calendar, or disposal guidance features.',
        'If you use AI item identification, second-hand listings, jobs, real estate, events, help requests, cars, reports, or similar features, we may collect uploaded images and related text you choose to submit.',
        'Community listing, chat, report, and moderation content may be collected where those features are available. MIDORIGO does not process payments, but users may include trade details in listing or message content.',
        'Camera, photo library, notification, and location permissions may be requested by the app only when needed for features such as item scanning, listing photos, pickup reminders, local discovery, or facility search.',
        'Analytics, diagnostics, device information, notification preferences, and notification tokens may be collected to operate, secure, and improve the app.',
      ]},
      { title: 'How information is used', paragraphs: [
        'We use information to provide accounts, local setup, circular economy listings, community communication, pickup reminders, AI-assisted item guidance, recycling search, issue reporting, customer support, safety moderation, analytics, diagnostics, fraud prevention, and legal compliance.',
        'Early access registration information may be used to manage waitlists, contact users about rollout timing, prepare onboarding, and connect a registration with future app access if the person continues into the live product.',
        'Location-related setup is used to personalize app content. MIDORIGO does not replace official local municipality rules.',
        'Images and text submitted for scanning may be used to return disposal suggestions, improve safety and diagnostics, investigate reports, and support moderation where permitted by law and app settings.',
      ]},
      { title: 'Third-party services', paragraphs: [
        'MIDORIGO may use Supabase for authentication, database, and storage. Expo or notification services may be used for push notifications. Mapping or location providers may be used when location or facility search features are available. No payment provider is listed here because MIDORIGO does not handle money, process marketplace payments, or hold funds.',
        'These providers process information according to their own terms and privacy policies. The provider list may be updated when MIDORIGO adds, removes, or changes service providers.',
      ]},
      { title: 'Sharing and processors', paragraphs: [
        'We may share information with service providers that help operate MIDORIGO, including hosting, authentication, storage, notifications, analytics, diagnostics, maps, customer support, security, and moderation tools. These providers are expected to process information for the services they provide to us.',
        'We may also disclose information when required by law, to protect users and the service, to investigate abuse or fraud, to respond to valid legal requests, or as part of a business transfer permitted by law.',
      ]},
      { title: 'Security', paragraphs: [
        'MIDORIGO uses reasonable administrative, technical, and organizational measures designed to protect user information against unauthorized access, loss, misuse, alteration, or disclosure. No online service can guarantee absolute security, so users should also protect their account credentials and use caution when sharing information in listings or messages.',
      ]},
      { title: 'User-generated content and visibility', paragraphs: [
        'Listings, events, jobs, real estate posts, help requests, car posts, profile details, and related messages may be visible to other users depending on the feature used and the settings available in the app.',
        'Reports and moderation records may be reviewed to protect users, enforce rules, prevent abuse, respond to legal requests, and maintain service integrity.',
      ]},
      { title: 'Retention, deletion, and contact', paragraphs: [
        'We keep information only as long as needed for the purposes described in this policy, unless a longer period is required for legal, security, dispute, moderation, or operational reasons.',
        'If you register for early access, that registration may remain in MIDORIGO systems for launch communication, onboarding, and future account continuity if you later use the app, unless you request deletion.',
        'You may request access, correction, or deletion of your account information. Account deletion instructions are available at /delete-account. Some records may be retained where required for legal, security, fraud prevention, abuse prevention, dispute handling, backup, or operational reasons.',
        'To request access, correction, deletion, or privacy support, contact japankaiten@gmail.com.',
      ]},
      { title: 'Children', paragraphs: [
        'MIDORIGO is not intended for children under 13. Users who are under the age of majority in their location should use the app only with permission and supervision from a parent or legal guardian, especially for listings, messages, trades, jobs, real estate, events, help requests, and car-related posts.',
      ]},
    ],
  },
  terms: {
    eyebrow: 'Terms of Service',
    title: 'Rules for using MIDORIGO',
    intro: 'These terms explain the basic responsibilities for using MIDORIGO as a local circular economy platform with municipality-oriented waste support.',
    sections: [
      { title: 'Eligibility and accounts', paragraphs: [
        'You must be able to use MIDORIGO lawfully in your location. MIDORIGO is not intended for children under 13. If you are under the age of majority where you live, you should use marketplace, messaging, job, real estate, event, help request, and car-related features only with permission and supervision from a parent or legal guardian. You are responsible for the accuracy of your account information and for keeping your sign-in method secure.',
      ]},
      { title: 'Acceptable use', paragraphs: [
        'Do not misuse the app, interfere with service operation, upload harmful content, impersonate others, violate laws, harass users, or submit false reports. MIDORIGO may suspend or remove accounts, listings, messages, or reports that appear abusive, unsafe, illegal, or inconsistent with these terms.',
      ]},
      { title: 'Prohibited content and behavior', paragraphs: [
        'Do not post or promote illegal goods or services, weapons, controlled substances, stolen goods, recalled products, fraudulent offers, scams, sexual or exploitative content, human trafficking, hate or discriminatory content, threats, harassment, bullying, doxxing, malware, spam, or content that infringes another person’s rights. MIDORIGO may use filtering, review, reporting, blocking, and moderation tools to reduce unsafe or objectionable content.',
      ]},
      { title: 'User-generated content', paragraphs: [
        'Users are responsible for the listings, messages, images, reports, and other content they submit. Content must be accurate enough not to mislead others and must not infringe rights, expose private information without permission, or promote unsafe, fraudulent, discriminatory, illegal, or abusive activity.',
      ]},
      { title: 'Community marketplace rules', paragraphs: [
        'Listings should describe goods, jobs, real estate, events, help requests, cars, and other supported categories honestly. Users are responsible for safe communication, lawful posts, handoff arrangements, and avoiding prohibited, dangerous, recalled, illegal, misleading, or restricted items and services.',
        'Job, real estate, vehicle, event, and help-request posts must follow applicable laws, licenses, permits, employment rules, housing rules, consumer protection rules, and platform listing requirements.',
      ]},
      { title: 'Waste guidance and municipality rules', paragraphs: [
        'MIDORIGO helps organize disposal information but does not guarantee that guidance is complete, current, or applicable to every building or neighborhood. Users should verify final disposal decisions with local municipality rules, official notices, or local contact points.',
        'No official municipality endorsement is implied unless separately stated by MIDORIGO and that authority.',
      ]},
      { title: 'AI-assisted results', paragraphs: [
        'AI-assisted item identification may be incomplete or incorrect. Users should treat scan results as a starting point, review the item condition and local rules, and verify uncertain disposal decisions with official municipal sources.',
      ]},
      { title: 'No payment handling', paragraphs: [
        'MIDORIGO is a platform for posting, discovery, communication, and local coordination. MIDORIGO does not process marketplace payments, hold funds, escrow trades, guarantee transactions, or act as a broker. Users are responsible for any trade terms, taxes, legal requirements, safety checks, and payment arrangements they make outside the app.',
      ]},
      { title: 'Reports and moderation', paragraphs: [
        'MIDORIGO may review reports, remove content, limit visibility, restrict accounts, or preserve records where needed for safety, abuse prevention, service integrity, legal compliance, or dispute review. Moderation actions may be taken without prior notice when necessary.',
        'Users should be able to report objectionable listings, messages, and users from within the app where those features are available. MIDORIGO aims to review safety reports and take appropriate action in a timely manner.',
      ]},
      { title: 'Limitation of liability', paragraphs: [
        'To the fullest extent allowed by law, MIDORIGO is not liable for indirect, incidental, special, consequential, or punitive damages, or for losses caused by reliance on incomplete local disposal information, user-generated marketplace content, user-arranged trades, service interruption, or third-party services.',
      ]},
      { title: 'Contact', paragraphs: ['Questions about these terms can be sent to japankaiten@gmail.com.'] },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch with MIDORIGO',
    intro: 'Use the form to prepare an email to support. No backend is connected on this static website.',
    emailLabel: 'Your email',
    categoryLabel: 'Category',
    messageLabel: 'Message',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'Tell us what happened, your city or area if relevant, and the account email if different.',
    submit: 'Open email',
    supportTitle: 'Support email',
    supportBody: 'Email japankaiten@gmail.com for app support, privacy requests, municipality content corrections, and partner inquiries.',
    supportNote: 'A production contact form backend can be added later. Until then, this form opens the user’s email app.',
    categories: ['App support', 'Marketplace listing/report', 'Data/privacy request', 'Municipality/content correction', 'Business/partner inquiry'],
  },
  support: {
    eyebrow: 'Support',
    title: 'Help using MIDORIGO',
    intro: 'Find quick answers for marketplace listings, language settings, location setup, camera access, notifications, account help, and reporting incorrect information.',
    sectionTitle: 'Troubleshooting',
    outro: 'Need more help? Contact japankaiten@gmail.com and include your device, app version if available, selected city or area, and a short description of the issue.',
    faq: [
      { question: 'How do I change language?', answer: 'Open the app settings, choose Language, and select English or Japanese. Some municipality source content may remain in the language originally published by the local authority.' },
      { question: 'How do I set my location?', answer: 'Use the location setup screen to choose your city, ward, town, or area. Marketplace discovery, local posts, pickup schedules, and disposal rules can depend on this setting.' },
      { question: 'Why is the camera not working?', answer: 'Check your device settings and allow camera access for MIDORIGO. The scanner needs camera permission to identify items from photos.' },
      { question: 'Why am I not receiving notifications?', answer: 'Confirm that notifications are enabled in both MIDORIGO settings and your device settings. Pickup reminders also depend on your selected area.' },
      { question: 'I cannot log in.', answer: 'Check that you are using the same email or sign-in method used to create the account. If the problem continues, contact support from the account email when possible.' },
      { question: 'How do I report incorrect waste information?', answer: 'Use the correction or report option in the app, or contact support with the city or area, item name, and the source you believe is correct.' },
      { question: 'How do community listing reports work?', answer: 'Use the report action on a listing or message when second-hand goods, jobs, real estate, events, help requests, cars, or other posts appear unsafe, misleading, illegal, or abusive. MIDORIGO may remove content or restrict accounts that violate the rules.' },
      { question: 'Can I pay for items or services in MIDORIGO?', answer: 'No. MIDORIGO does not process money. Users must make their own arrangements outside the app and should follow local laws, safety guidance, and listing rules.' },
    ],
  },
  deleteAccount: {
    eyebrow: 'Account and data deletion',
    title: 'Request deletion of your MIDORIGO account',
    intro: 'You can request account deletion by email. This page explains what to include and what data may be deleted, anonymized, or retained where required.',
    requestTitle: 'How to request deletion',
    requestSteps: [
      'Email japankaiten@gmail.com from your account email.',
      'Use the subject line: Account deletion request.',
      'Include your user ID if it is available in the app.',
    ],
    sections: [
      { title: 'What is deleted or anonymized', paragraphs: ['Account profile information, saved location setup, notification preferences, uploaded images, reports, second-hand listings, jobs, real estate posts, event posts, help requests, car listings, messages, and related user content may be deleted or anonymized where technically and legally possible.'] },
      { title: 'What may be retained', paragraphs: ['Some records may be retained where required for legal, security, fraud prevention, abuse prevention, dispute handling, backup, or operational reasons. Retained records will be limited to what is necessary for those purposes. MIDORIGO does not process marketplace payments.'] },
      { title: 'Timing', paragraphs: ['MIDORIGO will review deletion requests and may ask for verification before processing. You will receive a response at the account email when the request has been reviewed.'] },
    ],
  },
};

function shallowTranslate(base: LocaleContent, overrides: DeepPartial<LocaleContent>): LocaleContent {
  return {
    ...base,
    ...overrides,
    routes: { ...base.routes, ...overrides.routes },
    common: { ...base.common, ...overrides.common },
    home: { ...base.home, ...overrides.home, sections: { ...base.home.sections, ...overrides.home?.sections } },
    privacy: { ...base.privacy, ...overrides.privacy },
    terms: { ...base.terms, ...overrides.terms },
    contact: { ...base.contact, ...overrides.contact },
    support: { ...base.support, ...overrides.support },
    deleteAccount: { ...base.deleteAccount, ...overrides.deleteAccount },
  };
}

const translations: Record<LanguageCode, LocaleContent> = {
  en: english,
  ja: shallowTranslate(english, {
    locale: 'ja',
    routes: { home: 'ホーム', privacy: 'プライバシー', terms: '利用規約', contact: 'お問い合わせ', support: 'サポート', deleteAccount: 'アカウント削除' },
    common: {
      language: '言語',
      footerAbout: '日本の居住者向けに、循環型経済の掲載、地域取引、近隣情報、自治体向けごみサポートをまとめたサービスです。',
      legalAndSupport: '法務とサポート',
      policyDetails: 'ポリシー詳細',
      termsDetails: '規約詳細',
      independent: '別途明記がない限り独立したプラットフォームです。',
      effectiveDate: '2026年4月18日',
      operator: 'Japan Kaiten company',
      address: '必要な場合は有効な請求に応じて提供します。',
    },
    home: {
      eyebrow: '日本在住者向け循環型経済プラットフォーム',
      title: '地域循環のためのローカルアクセスレイヤー。',
      tagline: '地域でつながり、再利用を増やし、自治体のごみルールにも沿って行動できます。',
      intro: 'MIDORIGOは、中古品、仕事、不動産、イベント、助け合い、車両、地域取引を通じて住民同士をつなぎます。自治体レイヤーでは、ごみ収集カレンダー、AI品目判定、分別案内、リサイクル施設、地域の問題報告を支援します。',
      ctaAvailability: '無料で先行登録する',
      ctaSupport: 'サポートを見る',
      previewLabel: 'MIDORIGOアプリプレビュー',
      previewCardLabel: '地域マーケット',
      previewCardTitle: 'ダイニングテーブル',
      previewCardNote: '廃棄前に再利用',
      previewScanLabel: '自治体レイヤー',
      previewScanTitle: 'ペットボトル',
      previewScanNote: '明日回収',
      previewPills: ['近くの仕事', '今週のイベント', 'AI分別チェック'],
      sections: {
        features: 'MIDORIGOでできること',
        marketplace: 'コミュニティ掲載カテゴリ',
        platform: 'プラットフォーム全体の仕組み',
        boundaries: '重要な利用範囲',
        residents: '日本で暮らす人のために',
        coreAreas: '主なアプリ領域',
        comingSoon: '近日公開',
        faq: 'よくある質問',
      },
      marketplaceLead: 'MIDORIGOは決済や支払い代行を行いません。投稿、発見、連絡、地域調整のためのプラットフォームです。取引条件、安全面、法令順守は利用者ご自身の責任となります。',
      features: [
        { icon: 'market', title: '中古マーケットプレイス', text: '使える物を地域で売買・譲渡・再利用できます。MIDORIGOは人をつなぎますが、決済処理は行いません。' },
        { icon: 'briefcase', title: '地域の仕事', text: '地域の人や団体が掲載する近隣の仕事やサービス機会を見つけられます。' },
        { icon: 'home', title: '不動産', text: '日々の地域情報とあわせて、地域の住まいや物件情報を探せます。' },
        { icon: 'calendar', title: 'イベントと助け合い', text: '地域イベントを共有し、助けを求めたり、近隣住民から実用的な支援を見つけたりできます。' },
        { icon: 'car', title: '車とモビリティ取引', text: 'アプリルールの範囲で、地域の車両やモビリティ関連の掲載を投稿・閲覧できます。' },
        { icon: 'scan', title: 'ごみ分別スキャナー', text: 'AIによる品目判定で、自治体向けの分別案内と次の対応を確認できます。' },
        { icon: 'calendar', title: '収集カレンダー', text: '燃えるごみ、不燃ごみ、資源ごみ、粗大ごみの収集日を見やすく管理できます。' },
        { icon: 'map', title: '地域の分別ルール', text: '市区町村や地域設定を保存し、住んでいる場所に合わせた案内を整理できます。' },
        { icon: 'recycle', title: 'リサイクル施設', text: '特別な対応が必要な品目のために、近くのリサイクル・処分・持ち込み先を探せます。' },
        { icon: 'language', title: '日本語と英語対応', text: '掲載、日常タスク、地域ルール、リマインダー、ごみ関連用語を多言語で確認できます。' },
      ],
      marketplaceCategories: ['中古品', '仕事', '不動産', 'イベント', '助け合い', '車・モビリティ'],
      appAspects: [
        { icon: 'market', title: '地域取引と再利用', text: '住民は中古品、譲渡品、車両、モビリティ掲載を投稿・発見でき、使える物を地域内で長く循環させられます。' },
        { icon: 'briefcase', title: 'コミュニティ機会', text: '仕事、助け合い依頼、イベント、地域のお知らせを通じて、近隣の実用的な機会を共有できます。' },
        { icon: 'home', title: '住まいと地域発見', text: '不動産掲載によって、日常サービスや地域活動とあわせて住まいの選択肢を把握できます。' },
        { icon: 'map', title: '自治体連携レイヤー', text: '市区町村や地域設定により、ごみカレンダー、分別ルール、リサイクル拠点、報告、地域の廃棄案内を支えます。' },
        { icon: 'scan', title: 'AI支援の品目識別', text: '写真から想定される分別カテゴリを確認できますが、最終判断は自治体ルールで確認してください。' },
        { icon: 'language', title: '日常で使える多言語対応', text: '日本語と英語対応により、掲載、地域ルール、リマインダー、ごみ関連用語をより理解しやすくします。' },
      ],
      platformBoundaries: [
        'MIDORIGOは決済、資金保管、エスクロー、取引保証を行いません。',
        '掲載、メッセージ、仕事、不動産、イベント、助け合い、車両投稿は、明示がない限りユーザー生成です。',
        '法令順守、安全な連絡、対面調整、税金、免許、許認可、取引条件は利用者の責任です。',
        '最終的なごみ処分判断は自治体サイト、印刷ガイド、公式通知、窓口が基準です。',
        '安全性、詐欺、乱用、違法性、規約違反が疑われる場合、MIDORIGOは内容削除、アカウント制限、報告確認を行うことがあります。',
      ],
      residentsParagraphs: [
        'MIDORIGOは、長期居住者、新しく引っ越してきた方、海外居住者、学生、家族、地域で働く人など、地域情報をひとつにまとめて使いたい方のために設計されています。',
        '自治体レイヤーでは、分別ルール、AI品目判定、収集カレンダー、リサイクル施設、報告機能を支援します。別途明記がない限り、自治体との正式提携を意味するものではありません。最終的なごみ・資源回収ルールは自治体の公式案内をご確認ください。',
      ],
      residentsChecks: ['中古品、仕事、住まい、車、イベント、助け合いを投稿', 'MIDORIGOが決済を扱わずに直接調整', '市区町村や地域設定を保存', '日英対応の自治体分別案内を確認', '不明確な掲載や古いごみ情報を報告'],
      appAreas: [
        { label: 'マーケット', title: '中古品と地域投稿' },
        { label: '自治体レイヤー', title: 'ごみカレンダーとAI品目チェック' },
        { label: 'コミュニティ', title: '仕事、イベント、助け合い、不動産、車' },
      ],
      storeBadges: { appStore: 'App Storeで近日公開', playStore: 'Google Playで近日公開' },
      faq: [
        { question: 'MIDORIGOは自治体の公式アプリですか？', answer: 'いいえ。特定の提携が公表されていない限り、MIDORIGOは独立した循環型経済プラットフォームです。最終的なごみ・資源回収判断は自治体ルールが基準です。' },
        { question: 'MIDORIGOで決済できますか？', answer: 'いいえ。MIDORIGOは投稿、発見、連絡のためのプラットフォームであり、支払い処理は行いません。' },
        { question: '何を投稿できますか？', answer: '中古品、仕事、不動産、イベント、助け合い、車やモビリティ関連の投稿を、法令とアプリルールの範囲で掲載できます。' },
        { question: '掲載内容はすべて確認されていますか？', answer: 'いいえ。掲載やメッセージはユーザー作成です。報告やモデレーション機能はありますが、安全確認は利用者自身でも行ってください。' },
        { question: 'ごみの捨て方を完全に教えてくれますか？', answer: '分別案内を整理しますが、自治体ごとに異なり変更される場合があります。不明な場合は自治体窓口で確認してください。' },
        { question: '日本語と英語の両方に対応しますか？', answer: 'はい。地域の生活情報やごみ関連用語を理解しやすくするため、日英対応を想定しています。' },
        { question: 'いつ公開されますか？', answer: 'MIDORIGOはApp StoreとGoogle Playでの公開準備中です。正式なストアURLは承認後に追加されます。' },
      ],
    },
    contact: {
      eyebrow: 'お問い合わせ',
      title: 'MIDORIGOへ連絡する',
      intro: 'このフォームはサポートメールを作成します。静的サイトのためバックエンド接続はありません。',
      emailLabel: 'メールアドレス',
      categoryLabel: 'カテゴリ',
      messageLabel: '内容',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: '状況、該当する市区町村や地域、必要に応じて異なるアカウントメールをご記入ください。',
      submit: 'メールを開く',
      supportTitle: 'サポートメール',
      supportBody: 'アプリサポート、プライバシー依頼、自治体情報修正、提携相談は japankaiten@gmail.com までご連絡ください。',
      supportNote: '将来的に問い合わせフォームのバックエンドを追加できます。それまではメールアプリを開く形式です。',
      categories: ['アプリサポート', '掲載・報告', 'データ・プライバシー依頼', '自治体内容の修正', '提携・事業問い合わせ'],
    },
    privacy: {
      eyebrow: 'プライバシーポリシー',
      title: 'MIDORIGOにおけるデータの取り扱い',
      intro: 'このポリシーでは、MIDORIGOが地域の循環型経済の掲載、コミュニティ内のやり取り、自治体向けのごみ支援を提供するために取得する可能性のある情報について説明します。',
      sections: [
        {
          title: '取得する可能性のある情報',
          paragraphs: [
            'MIDORIGOでは、アカウント作成や管理の際に、メールアドレスやプロフィール情報を取得する場合があります。',
            '地域検索、施設検索、収集カレンダー、分別案内などの機能を利用する場合、選択した市区町村、町名、エリア設定、位置設定情報、概算の位置情報を取得することがあります。',
            'AI品目判定、中古品掲載、仕事、不動産、イベント、助け合い、車両、報告機能などを利用する場合、利用者が送信した画像や関連テキストを取得することがあります。',
            'コミュニティ掲載、チャット、報告、モデレーション関連の内容は、該当機能が提供されている場合に取得されることがあります。MIDORIGOは決済を処理しませんが、利用者が掲載やメッセージ内に取引情報を記載することがあります。',
            'カメラ、写真ライブラリ、通知、位置情報の権限は、品目スキャン、掲載写真、収集リマインダー、地域検索、施設検索などの機能に必要な場合にのみ求められます。',
            'アプリの運用、安全性向上、改善のために、分析情報、診断情報、端末情報、通知設定、通知トークンを取得することがあります。',
          ],
        },
        {
          title: '情報の利用目的',
          paragraphs: [
            '取得した情報は、アカウント提供、地域設定、循環型経済の掲載、コミュニティ内の連絡、収集リマインダー、AI支援による品目案内、リサイクル検索、問題報告、サポート対応、安全対策、分析、診断、不正防止、法令順守のために利用します。',
            '位置関連の設定情報は、アプリ内の表示内容を地域に合わせて調整するために利用します。MIDORIGOは自治体の公式ルールに代わるものではありません。',
            'スキャンのために送信された画像やテキストは、分別候補の提示、安全性や診断の改善、報告調査、法令およびアプリ設定で認められる範囲でのモデレーション対応に利用されることがあります。',
          ],
        },
        {
          title: '第三者サービス',
          paragraphs: [
            'MIDORIGOは、認証、データベース、ストレージのためにSupabaseを利用する場合があります。プッシュ通知にはExpoや通知関連サービスを利用する場合があります。位置情報や施設検索機能がある場合、地図または位置情報提供事業者を利用することがあります。MIDORIGOはお金を扱わず、マーケットプレイスの決済処理や資金保管も行わないため、ここでは決済事業者を挙げていません。',
            'これらの事業者は、それぞれの利用規約やプライバシーポリシーに従って情報を処理します。サービス提供事業者の追加、削除、変更があった場合、一覧を更新することがあります。',
          ],
        },
        {
          title: '共有先と委託先',
          paragraphs: [
            'MIDORIGOは、ホスティング、認証、保存、通知、分析、診断、地図、カスタマーサポート、セキュリティ、モデレーションなど、サービス運営を支援する事業者と情報を共有することがあります。これらの事業者は、当社に提供するサービスの範囲で情報を処理することが想定されています。',
            'また、法令上必要な場合、利用者やサービスを保護する必要がある場合、乱用や不正の調査、適法な法的請求への対応、法令で認められる事業承継の一環として、情報を開示することがあります。',
          ],
        },
        {
          title: 'セキュリティ',
          paragraphs: [
            'MIDORIGOは、不正アクセス、紛失、不正利用、改ざん、漏えいから利用者情報を保護するために、合理的な管理上・技術上・組織上の対策を講じます。ただし、オンラインサービスで絶対的な安全性を保証することはできないため、利用者自身もアカウント認証情報の管理や、掲載・メッセージで共有する情報の取り扱いに注意してください。',
          ],
        },
        {
          title: 'ユーザー生成コンテンツと公開範囲',
          paragraphs: [
            '掲載、イベント、仕事、不動産投稿、助け合い依頼、車両投稿、プロフィール情報、および関連メッセージは、利用する機能やアプリ内設定に応じて他の利用者に表示される場合があります。',
            '報告内容やモデレーション記録は、利用者保護、ルール適用、乱用防止、法的請求への対応、サービス健全性の維持のために確認されることがあります。',
          ],
        },
        {
          title: '保存期間、削除、連絡先',
          paragraphs: [
            '情報は、このポリシーに記載した目的のために必要な期間のみ保持します。ただし、法令、安全性、紛争対応、モデレーション、運営上の理由で、より長く保持する必要がある場合があります。',
            '利用者は、アカウント情報へのアクセス、訂正、削除を求めることができます。アカウント削除手順は /delete-account に掲載しています。法令対応、安全対策、不正防止、乱用防止、紛争対応、バックアップ、運営上の理由により、一部記録を保持することがあります。',
            'アクセス、訂正、削除、その他プライバシー関連の問い合わせは japankaiten@gmail.com までご連絡ください。',
          ],
        },
        {
          title: '子どもの利用について',
          paragraphs: [
            'MIDORIGOは13歳未満の子どもを対象としていません。各地域で成年に達していない利用者は、特に掲載、メッセージ、取引、仕事、不動産、イベント、助け合い、車両関連の投稿を利用する際、保護者または法定代理人の許可と監督のもとで利用してください。',
          ],
        },
      ],
    },
    terms: {
      eyebrow: '利用規約',
      title: 'MIDORIGOの利用ルール',
      intro: 'この規約は、MIDORIGOを地域循環型経済のプラットフォーム兼自治体向けごみ支援サービスとして利用する際の基本的な責任を定めるものです。',
      sections: [
        {
          title: '利用資格とアカウント',
          paragraphs: [
            '利用者は、自身の所在地でMIDORIGOを適法に利用できなければなりません。MIDORIGOは13歳未満の子どもを対象としていません。居住地で成年に達していない利用者は、マーケットプレイス、メッセージ、仕事、不動産、イベント、助け合い、車両関連機能を利用する際、保護者または法定代理人の許可と監督を受けてください。アカウント情報の正確性とサインイン方法の安全管理は利用者の責任です。',
          ],
        },
        {
          title: '適切な利用',
          paragraphs: [
            'アプリを不正利用したり、サービス運営を妨害したり、有害な内容をアップロードしたり、他人になりすましたり、法令に違反したり、利用者へ嫌がらせをしたり、虚偽の報告を行ったりしてはいけません。MIDORIGOは、乱用、危険、違法、または本規約に反すると判断されるアカウント、掲載、メッセージ、報告を停止または削除することがあります。',
          ],
        },
        {
          title: '禁止される内容と行為',
          paragraphs: [
            '違法な商品やサービス、武器、規制薬物、盗品、回収対象製品、詐欺的な提案、詐欺行為、性的または搾取的な内容、人身売買、ヘイトや差別的内容、脅迫、嫌がらせ、いじめ、個人情報の晒し、マルウェア、スパム、他人の権利を侵害する内容を投稿または助長してはいけません。MIDORIGOは、不適切または危険な内容を減らすために、フィルタリング、確認、通報、ブロック、モデレーション機能を使用することがあります。',
          ],
        },
        {
          title: 'ユーザー生成コンテンツ',
          paragraphs: [
            '利用者は、自ら送信する掲載、メッセージ、画像、報告、その他の内容について責任を負います。内容は他者を誤認させない程度に正確でなければならず、権利侵害、無断での個人情報公開、危険・不正・差別・違法・乱用行為の助長をしてはいけません。',
          ],
        },
        {
          title: 'コミュニティマーケットプレイスのルール',
          paragraphs: [
            '商品、仕事、不動産、イベント、助け合い、車両、その他対応カテゴリの掲載は、内容を正確かつ誠実に記載する必要があります。利用者は、安全な連絡方法、適法な投稿、受け渡し調整、禁止品・危険物・回収対象品・違法品・誤解を招く内容・制限対象サービスの回避について責任を負います。',
            '仕事、不動産、車両、イベント、助け合いの投稿は、関連する法令、免許、許認可、雇用ルール、住宅ルール、消費者保護ルール、およびプラットフォームの掲載要件に従う必要があります。',
          ],
        },
        {
          title: 'ごみ案内と自治体ルール',
          paragraphs: [
            'MIDORIGOは分別情報の整理を支援しますが、その案内が常に完全、最新、またはすべての建物や地域に適用できることを保証しません。最終的な処分判断は、自治体ルール、公式通知、または地域の問い合わせ窓口で確認してください。',
            'MIDORIGOと当該行政機関が別途明示しない限り、自治体の公式承認や提携を意味するものではありません。',
          ],
        },
        {
          title: 'AI支援結果について',
          paragraphs: [
            'AI支援による品目判定は、不完全または誤っている場合があります。スキャン結果は出発点として扱い、品目の状態や地域ルールを確認したうえで、不明な場合は自治体の公式情報で最終確認してください。',
          ],
        },
        {
          title: '決済を扱わないこと',
          paragraphs: [
            'MIDORIGOは、投稿、発見、連絡、地域調整のためのプラットフォームです。MIDORIGOはマーケットプレイスの決済処理、資金保管、エスクロー、取引保証、仲介行為を行いません。アプリ外で取り決める取引条件、税金、法的要件、安全確認、支払い方法は利用者自身の責任です。',
          ],
        },
        {
          title: '通報とモデレーション',
          paragraphs: [
            'MIDORIGOは、安全確保、乱用防止、サービス健全性、法令順守、紛争確認のために、通報を確認し、内容削除、表示制限、アカウント制限、記録保存を行うことがあります。必要な場合、事前通知なく措置を取ることがあります。',
            '該当機能がある場合、利用者はアプリ内で不適切な掲載、メッセージ、利用者を通報できる必要があります。MIDORIGOは安全に関する通報を確認し、適切な対応をできる限り速やかに行うよう努めます。',
          ],
        },
        {
          title: '責任の制限',
          paragraphs: [
            '法令で認められる最大限の範囲で、MIDORIGOは、不完全な地域分別情報への依拠、ユーザー生成のマーケットプレイス内容、利用者同士の取引、サービス中断、第三者サービスに起因する間接損害、付随的損害、特別損害、結果的損害、懲罰的損害について責任を負いません。',
          ],
        },
        {
          title: '連絡先',
          paragraphs: ['本規約に関する問い合わせは japankaiten@gmail.com までお送りください。'],
        },
      ],
    },
    support: {
      eyebrow: 'サポート',
      title: 'MIDORIGOの使い方',
      intro: '掲載、言語設定、地域設定、カメラ、通知、アカウント、誤情報報告に関するよくある質問をまとめています。',
      sectionTitle: 'トラブルシューティング',
      outro: 'さらにサポートが必要な場合は japankaiten@gmail.com へご連絡ください。端末名、アプリバージョン、選択した地域、問題の概要を記載してください。',
      faq: [
        { question: '言語を変更するには？', answer: 'アプリの設定で言語を選択し、日本語または英語に切り替えてください。自治体元情報は原文のまま表示される場合があります。' },
        { question: '地域を設定するには？', answer: '地域設定画面で市区町村やエリアを選択してください。掲載表示、収集予定、分別ルールに影響します。' },
        { question: 'カメラが使えないのはなぜですか？', answer: '端末設定でMIDORIGOへのカメラ権限を許可してください。品目判定に必要です。' },
        { question: '通知が届かないのはなぜですか？', answer: 'アプリ設定と端末設定の両方で通知が有効か確認してください。収集リマインダーは地域設定にも依存します。' },
        { question: 'ログインできません。', answer: '登録時と同じメールアドレスまたはサインイン方法を使っているか確認してください。解決しない場合は登録メールからサポートへご連絡ください。' },
        { question: '誤ったごみ情報を報告するには？', answer: 'アプリ内の修正・報告機能を使うか、地域名、品目名、正しいと思われる情報源を添えて連絡してください。' },
        { question: '掲載の報告はどう機能しますか？', answer: '中古品、仕事、不動産、イベント、助け合い、車などの投稿が危険、不正確、違法、迷惑な場合に報告できます。' },
        { question: 'MIDORIGO内で支払いできますか？', answer: 'いいえ。支払いは処理しません。取引条件と安全確認は当事者同士で行ってください。' },
      ],
    },
    deleteAccount: {
      eyebrow: 'アカウントとデータ削除',
      title: 'MIDORIGOアカウント削除の依頼',
      intro: 'メールで削除を依頼できます。必要な情報、削除・匿名化の対象、保持される可能性のある情報を説明します。',
      requestTitle: '削除依頼の方法',
      requestSteps: [
        '登録メールアドレスから japankaiten@gmail.com へ送信してください。',
        '件名は「Account deletion request」にしてください。',
        'わかる場合はユーザーIDを記載してください。',
      ],
      sections: [
        {
          title: '削除または匿名化される情報',
          paragraphs: [
            'アカウントプロフィール情報、保存した地域設定、通知設定、アップロード画像、報告、中古品掲載、仕事、不動産投稿、イベント投稿、助け合い依頼、車両掲載、メッセージ、および関連する利用者コンテンツは、技術的かつ法的に可能な範囲で削除または匿名化される場合があります。',
          ],
        },
        {
          title: '保持される可能性がある情報',
          paragraphs: [
            '法令対応、安全対策、不正防止、乱用防止、紛争対応、バックアップ、運営上の理由により、一部記録を保持する場合があります。保持する記録は、これらの目的に必要な範囲に限定されます。MIDORIGOはマーケットプレイスの決済処理を行いません。',
          ],
        },
        {
          title: '対応時期',
          paragraphs: [
            'MIDORIGOは削除依頼を確認し、処理前に本人確認を求める場合があります。依頼の確認後、登録メールアドレス宛に結果を案内します。',
          ],
        },
      ],
    },
  }),
  ko: shallowTranslate(english, {
    locale: 'ko',
    routes: { home: '홈', privacy: '개인정보', terms: '이용약관', contact: '문의', support: '지원', deleteAccount: '계정 삭제' },
    common: {
      language: '언어',
      legalAndSupport: '법률 및 지원',
      policyDetails: '정책 세부정보',
      termsDetails: '약관 세부정보',
      footerAbout: '일본 거주자를 위한 순환경제 게시물, 지역 거래, 생활 정보, 지자체 중심 폐기물 지원 서비스입니다.',
      effectiveDate: '2026년 4월 18일',
      address: '필요한 경우 유효한 요청에 따라 제공합니다.',
    },
    home: {
      eyebrow: '일본 거주자를 위한 순환경제 플랫폼',
      title: '지역 순환 커뮤니티를 위한 로컬 액세스 레이어.',
      tagline: '지역에서 더 많이 거래하고 재사용하며, 지자체 폐기물 규칙에도 맞출 수 있습니다.',
      intro: 'MIDORIGO는 중고 거래, 일자리, 부동산, 이벤트, 도움 요청, 차량, 지역 커뮤니티 거래를 연결합니다. 지자체 레이어는 쓰레기 수거 일정, AI 품목 식별, 배출 안내, 재활용 시설, 지역 문제 신고를 지원합니다.',
      ctaAvailability: '무료 얼리 액세스 등록',
      ctaSupport: '지원 보기',
      previewLabel: 'MIDORIGO 앱 미리보기',
      previewCardLabel: '로컬 마켓플레이스',
      previewCardTitle: '식탁',
      previewCardNote: '폐기 전 재사용',
      previewScanLabel: '지자체 레이어',
      previewScanTitle: '플라스틱 병',
      previewScanNote: '내일 수거',
      previewPills: ['근처 일자리', '이번 주 이벤트', 'AI 분리배출 확인'],
      sections: {
        features: 'MIDORIGO가 지원하는 기능',
        marketplace: '커뮤니티 게시 카테고리',
        platform: '플랫폼이 작동하는 방식',
        boundaries: '중요한 플랫폼 범위',
        residents: '일본 거주자를 위해',
        coreAreas: '핵심 앱 영역',
        comingSoon: '곧 출시',
        faq: '자주 묻는 질문',
      },
      marketplaceLead: 'MIDORIGO는 결제나 에스크로를 처리하지 않습니다. 게시, 탐색, 소통, 지역 조정을 위한 플랫폼입니다. 거래 조건과 안전성, 법규 준수는 사용자 책임입니다.',
      features: [
        { icon: 'market', title: '중고 마켓플레이스', text: '사용 가능한 물건을 지역에서 거래, 재사용, 나눔할 수 있습니다. MIDORIGO는 사람을 연결하지만 결제를 처리하지 않습니다.' },
        { icon: 'briefcase', title: '지역 일자리', text: '지역 개인과 단체가 올린 근처 일자리와 서비스 기회를 찾을 수 있습니다.' },
        { icon: 'home', title: '부동산', text: '일상적인 지역 정보와 함께 지역의 주거 및 부동산 게시물을 찾을 수 있습니다.' },
        { icon: 'calendar', title: '이벤트와 도움', text: '지역 이벤트를 공유하고 도움을 요청하거나 이웃의 실질적인 지원을 찾을 수 있습니다.' },
        { icon: 'car', title: '차량 및 모빌리티 거래', text: '앱 규칙 범위 내에서 지역 차량 및 모빌리티 관련 게시물을 올리거나 둘러볼 수 있습니다.' },
        { icon: 'scan', title: '쓰레기 분류 스캐너', text: 'AI 보조 품목 인식을 통해 지자체 중심 배출 안내와 다음 단계를 확인할 수 있습니다.' },
        { icon: 'calendar', title: '수거 캘린더', text: '가연성, 불연성, 재활용, 대형 폐기물의 수거일을 한눈에 볼 수 있습니다.' },
        { icon: 'map', title: '지역 배출 규칙', text: '도시나 지역 설정을 저장해 거주 지역에 맞춘 안내를 정리할 수 있습니다.' },
        { icon: 'recycle', title: '재활용 시설', text: '특수 처리가 필요한 품목을 위해 근처 재활용, 폐기, 반입 시설을 찾을 수 있습니다.' },
        { icon: 'language', title: '일본어 및 영어 지원', text: '게시물, 일상 작업, 지역 규칙, 알림, 폐기물 용어를 여러 언어로 확인할 수 있습니다.' },
      ],
      marketplaceCategories: ['중고품', '일자리', '부동산', '이벤트', '도움 요청', '차량 및 모빌리티'],
      appAspects: [
        { icon: 'market', title: '지역 거래와 재사용', text: '주민은 중고품, 나눔 물품, 차량과 기타 이동수단 게시물을 올리고 찾으며 자원을 더 오래 순환시킬 수 있습니다.' },
        { icon: 'briefcase', title: '커뮤니티 기회', text: '일자리, 도움 요청, 이벤트, 지역 공지를 통해 실용적인 근처 기회를 공유할 수 있습니다.' },
        { icon: 'home', title: '주거와 지역 탐색', text: '부동산 게시물을 통해 지역 서비스와 커뮤니티 활동과 함께 주거 선택지를 이해할 수 있습니다.' },
        { icon: 'map', title: '지자체 중심 레이어', text: '도시 및 지역 설정은 쓰레기 일정, 배출 규칙, 재활용 지점, 문제 신고, 지역 폐기물 안내를 지원합니다.' },
        { icon: 'scan', title: 'AI 보조 식별', text: '사진으로 예상 배출 분류를 확인할 수 있지만 최종 판단은 지자체 규칙으로 다시 확인해야 합니다.' },
        { icon: 'language', title: '일상 속 이중 언어 접근성', text: '영어와 일본어 지원으로 게시물, 지역 규칙, 알림, 폐기물 용어를 더 쉽게 이해할 수 있습니다.' },
      ],
      platformBoundaries: [
        'MIDORIGO는 결제, 자금 보관, 에스크로, 거래 보증을 제공하지 않습니다.',
        '명시되지 않은 한 게시물, 메시지, 일자리, 부동산, 이벤트, 도움 요청, 차량 게시물은 사용자 생성 콘텐츠입니다.',
        '합법적 게시, 안전한 소통, 대면 약속, 세금, 면허, 허가 및 거래 조건은 사용자 책임입니다.',
        '최종 폐기 판단의 기준은 지자체 웹사이트, 인쇄 안내서, 공식 공지, 지역 사무소입니다.',
        '안전, 사기, 남용, 불법, 규칙 위반이 의심되면 MIDORIGO는 콘텐츠 제거, 계정 제한, 신고 검토를 할 수 있습니다.',
      ],
      residentsParagraphs: [
        'MIDORIGO는 장기 거주자, 새로 이사 온 사람, 외국인 거주자, 학생, 가족, 지역 근로자 등 한곳에서 실용적인 지역 정보를 보고 싶은 사람들을 위해 설계되었습니다.',
        '지자체 레이어는 지역 배출 규칙, AI 품목 식별, 수거 일정, 재활용 시설, 신고 기능을 지원합니다. 별도 명시가 없는 한 공식 지자체 파트너십을 의미하지 않습니다. 최종적인 쓰레기 및 재활용 규칙은 각 지자체의 공식 안내를 확인해야 합니다.',
      ],
      residentsChecks: [
        '재사용 물품, 일자리, 주거, 차량, 이벤트, 도움 요청 게시',
        'MIDORIGO가 결제를 처리하지 않고 직접 조율',
        '도시 또는 지역 설정 저장',
        '이중 언어의 지자체 배출 안내 확인',
        '불명확한 게시물이나 오래된 폐기물 정보를 신고',
      ],
      appAreas: [
        { label: '마켓플레이스', title: '중고품과 지역 게시물' },
        { label: '지자체 레이어', title: '쓰레기 일정과 AI 품목 확인' },
        { label: '커뮤니티', title: '일자리, 이벤트, 도움, 부동산, 차량' },
      ],
      faq: [
        { question: 'MIDORIGO는 공식 정부 앱인가요?', answer: '아니요. 특정 파트너십이 발표되지 않는 한 MIDORIGO는 독립적인 순환경제 플랫폼입니다. 최종적인 쓰레기 및 재활용 판단은 지자체 규칙이 기준입니다.' },
        { question: 'MIDORIGO가 결제를 처리하나요?', answer: '아니요. MIDORIGO는 발견, 게시, 소통을 위한 플랫폼이며, 거래와 결제는 사용자들이 직접 책임집니다.' },
        { question: '어떤 게시물을 올릴 수 있나요?', answer: '지역 중고품, 일자리, 부동산, 이벤트, 도움 요청, 차량 또는 모빌리티 관련 게시물을 앱 규칙과 법률 범위에서 올릴 수 있습니다.' },
        { question: '모든 게시물을 MIDORIGO가 검증하나요?', answer: '아니요. 게시물과 메시지는 사용자 생성입니다. 신고 및 운영 도구는 제공될 수 있지만, 사용자는 스스로도 신중히 검토해야 합니다.' },
        { question: '앱이 모든 물건의 버리는 방법을 정확히 알려주나요?', answer: 'MIDORIGO는 배출 정보를 정리해주지만, 규칙은 지자체마다 다르고 변경될 수 있습니다. 불확실한 경우 지역 행정기관에 확인해야 합니다.' },
        { question: '일본어와 영어 모두 사용할 수 있나요?', answer: '네. 지역 생활 정보와 폐기물 관련 용어를 더 쉽게 이해할 수 있도록 이중 언어 사용을 지원합니다.' },
        { question: '앱은 언제 출시되나요?', answer: 'MIDORIGO는 App Store와 Google Play 출시를 준비 중입니다. 최종 스토어 URL은 승인 후 추가됩니다.' },
      ],
      storeBadges: { appStore: 'App Store 곧 출시', playStore: 'Google Play 곧 출시' },
    },
    privacy: {
      eyebrow: '개인정보 처리방침',
      title: 'MIDORIGO의 데이터 처리 방식',
      intro: '이 방침은 MIDORIGO가 지역 순환경제 게시물, 커뮤니티 소통, 지자체 중심 폐기물 지원을 제공하기 위해 수집할 수 있는 정보를 설명합니다.',
      sections: [
        {
          title: '수집할 수 있는 정보',
          paragraphs: [
            'MIDORIGO는 계정을 생성하거나 관리할 때 이메일 주소와 프로필 정보를 수집할 수 있습니다.',
            '지역 검색, 시설 검색, 수거 일정, 배출 안내 기능을 사용할 경우 선택한 시, 구, 정, 지역 설정 정보와 대략적인 위치 신호를 수집할 수 있습니다.',
            'AI 품목 식별, 중고 게시물, 일자리, 부동산, 이벤트, 도움 요청, 차량, 신고 기능 등을 사용할 경우 사용자가 제출한 이미지와 관련 텍스트를 수집할 수 있습니다.',
            '커뮤니티 게시물, 채팅, 신고, 운영 검토 관련 콘텐츠는 해당 기능이 제공되는 경우 수집될 수 있습니다. MIDORIGO는 결제를 처리하지 않지만 사용자는 게시물이나 메시지에 거래 세부사항을 포함할 수 있습니다.',
            '카메라, 사진 라이브러리, 알림, 위치 권한은 품목 스캔, 게시 사진, 수거 알림, 지역 탐색, 시설 검색 같은 기능에 필요할 때만 요청됩니다.',
            '앱 운영, 보안 유지, 개선을 위해 분석 정보, 진단 정보, 기기 정보, 알림 설정, 알림 토큰이 수집될 수 있습니다.',
          ],
        },
        {
          title: '정보 이용 목적',
          paragraphs: [
            '수집한 정보는 계정 제공, 지역 설정, 순환경제 게시물, 커뮤니티 소통, 수거 알림, AI 보조 품목 안내, 재활용 검색, 문제 신고, 고객 지원, 안전 운영, 분석, 진단, 사기 방지, 법적 준수를 위해 사용됩니다.',
            '위치 관련 설정 정보는 앱 콘텐츠를 지역에 맞게 맞춤화하는 데 사용됩니다. MIDORIGO는 공식 지자체 규칙을 대체하지 않습니다.',
            '스캔을 위해 제출된 이미지와 텍스트는 배출 제안 제공, 안전 및 진단 개선, 신고 조사, 법률과 앱 설정이 허용하는 범위의 운영 검토를 위해 사용될 수 있습니다.',
          ],
        },
        {
          title: '제3자 서비스',
          paragraphs: [
            'MIDORIGO는 인증, 데이터베이스, 저장소를 위해 Supabase를 사용할 수 있습니다. 푸시 알림에는 Expo 또는 알림 서비스를 사용할 수 있습니다. 위치나 시설 검색 기능이 있는 경우 지도 또는 위치 정보 제공자를 사용할 수 있습니다. MIDORIGO는 돈을 다루지 않고 마켓플레이스 결제나 자금 보관을 하지 않으므로 여기에는 결제 제공자가 포함되지 않습니다.',
            '이들 제공자는 각자의 약관과 개인정보 처리방침에 따라 정보를 처리합니다. MIDORIGO가 제공자를 추가, 제거 또는 변경하면 목록이 업데이트될 수 있습니다.',
          ],
        },
        {
          title: '공유 및 처리 위탁',
          paragraphs: [
            'MIDORIGO는 호스팅, 인증, 저장, 알림, 분석, 진단, 지도, 고객 지원, 보안, 운영 검토 도구 등 서비스 운영을 돕는 제공자와 정보를 공유할 수 있습니다. 이러한 제공자는 MIDORIGO에 제공하는 서비스 범위 내에서 정보를 처리하는 것이 기대됩니다.',
            '또한 법률상 요구되는 경우, 사용자와 서비스를 보호해야 하는 경우, 남용 또는 사기를 조사하는 경우, 적법한 법적 요청에 대응하는 경우, 또는 법이 허용하는 사업 이전 과정에서 정보를 공개할 수 있습니다.',
          ],
        },
        {
          title: '보안',
          paragraphs: [
            'MIDORIGO는 사용자 정보를 무단 접근, 분실, 오용, 변경, 유출로부터 보호하기 위해 합리적인 관리적, 기술적, 조직적 조치를 취합니다. 다만 어떤 온라인 서비스도 절대적인 보안을 보장할 수 없으므로, 사용자는 계정 자격 증명을 스스로 보호하고 게시물이나 메시지에서 정보를 공유할 때 주의해야 합니다.',
          ],
        },
        {
          title: '사용자 생성 콘텐츠와 공개 범위',
          paragraphs: [
            '게시물, 이벤트, 일자리, 부동산 게시, 도움 요청, 차량 게시, 프로필 정보와 관련 메시지는 사용된 기능과 앱 내 설정에 따라 다른 사용자에게 보일 수 있습니다.',
            '신고 내용과 운영 기록은 사용자 보호, 규칙 집행, 남용 방지, 법적 요청 대응, 서비스 무결성 유지를 위해 검토될 수 있습니다.',
          ],
        },
        {
          title: '보관 기간, 삭제 및 연락처',
          paragraphs: [
            '정보는 이 방침에 설명된 목적에 필요한 기간 동안만 보관됩니다. 다만 법률, 보안, 분쟁, 운영 검토, 운영상 이유로 더 오래 보관해야 할 수 있습니다.',
            '사용자는 계정 정보에 대한 접근, 정정, 삭제를 요청할 수 있습니다. 계정 삭제 절차는 /delete-account 에 안내되어 있습니다. 법률, 보안, 사기 방지, 남용 방지, 분쟁 처리, 백업, 운영상 이유로 일부 기록이 보관될 수 있습니다.',
            '접근, 정정, 삭제 또는 개인정보 관련 지원 요청은 japankaiten@gmail.com 으로 보내주십시오.',
          ],
        },
        {
          title: '아동 관련 안내',
          paragraphs: [
            'MIDORIGO는 13세 미만 아동을 대상으로 하지 않습니다. 거주 지역에서 성년에 이르지 않은 사용자는 특히 게시물, 메시지, 거래, 일자리, 부동산, 이벤트, 도움 요청, 차량 관련 기능을 이용할 때 부모 또는 법정대리인의 허가와 감독 아래에서 사용해야 합니다.',
          ],
        },
      ],
    },
    terms: {
      eyebrow: '이용약관',
      title: 'MIDORIGO 이용 규칙',
      intro: '이 약관은 MIDORIGO를 지역 순환경제 플랫폼이자 지자체 중심 폐기물 지원 서비스로 이용할 때의 기본 책임을 설명합니다.',
      sections: [
        {
          title: '이용 자격 및 계정',
          paragraphs: [
            '사용자는 자신의 지역에서 MIDORIGO를 적법하게 이용할 수 있어야 합니다. MIDORIGO는 13세 미만 아동을 대상으로 하지 않습니다. 거주 지역에서 성년에 이르지 않은 사용자는 마켓플레이스, 메시지, 일자리, 부동산, 이벤트, 도움 요청, 차량 관련 기능을 부모 또는 법정대리인의 허가와 감독 아래에서 이용해야 합니다. 계정 정보의 정확성과 로그인 수단의 보안 유지 책임은 사용자에게 있습니다.',
          ],
        },
        {
          title: '적절한 사용',
          paragraphs: [
            '앱을 오용하거나, 서비스 운영을 방해하거나, 유해한 콘텐츠를 업로드하거나, 타인을 사칭하거나, 법률을 위반하거나, 사용자를 괴롭히거나, 허위 신고를 제출해서는 안 됩니다. MIDORIGO는 남용적이거나 위험하거나 불법적이거나 이 약관에 부합하지 않는다고 판단되는 계정, 게시물, 메시지, 신고를 정지하거나 삭제할 수 있습니다.',
          ],
        },
        {
          title: '금지되는 콘텐츠 및 행위',
          paragraphs: [
            '불법 상품 또는 서비스, 무기, 규제 약물, 도난품, 리콜 제품, 사기성 제안, 사기 행위, 성적 또는 착취적 콘텐츠, 인신매매, 혐오 또는 차별적 콘텐츠, 협박, 괴롭힘, 따돌림, 개인정보 노출, 악성코드, 스팸, 타인의 권리를 침해하는 콘텐츠를 게시하거나 홍보해서는 안 됩니다. MIDORIGO는 부적절하거나 위험한 콘텐츠를 줄이기 위해 필터링, 검토, 신고, 차단, 운영 도구를 사용할 수 있습니다.',
          ],
        },
        {
          title: '사용자 생성 콘텐츠',
          paragraphs: [
            '사용자는 자신이 제출하는 게시물, 메시지, 이미지, 신고 및 기타 콘텐츠에 대해 책임을 집니다. 콘텐츠는 타인을 오도하지 않을 정도로 정확해야 하며, 권리를 침해하거나 허가 없이 개인정보를 노출하거나 위험, 사기, 차별, 불법, 남용 행위를 조장해서는 안 됩니다.',
          ],
        },
        {
          title: '커뮤니티 마켓플레이스 규칙',
          paragraphs: [
            '상품, 일자리, 부동산, 이벤트, 도움 요청, 차량 및 기타 지원 카테고리의 게시물은 내용을 정직하고 정확하게 설명해야 합니다. 사용자는 안전한 소통, 적법한 게시, 인도 조율, 금지품, 위험물, 리콜 제품, 불법물, 오해를 부르는 내용, 제한된 서비스의 회피에 대해 책임을 집니다.',
            '일자리, 부동산, 차량, 이벤트, 도움 요청 게시물은 관련 법률, 면허, 허가, 고용 규정, 주거 규정, 소비자 보호 규정, 플랫폼 게시 요건을 따라야 합니다.',
          ],
        },
        {
          title: '폐기물 안내와 지자체 규칙',
          paragraphs: [
            'MIDORIGO는 배출 정보를 정리하는 데 도움을 주지만, 그 안내가 항상 완전하거나 최신이거나 모든 건물과 지역에 적용된다고 보장하지 않습니다. 최종적인 처리 판단은 지역 지자체 규칙, 공식 공지, 또는 지역 문의처를 통해 확인해야 합니다.',
            'MIDORIGO와 해당 기관이 별도로 명시하지 않는 한, 어떤 공식 지자체 승인이나 제휴도 의미하지 않습니다.',
          ],
        },
        {
          title: 'AI 보조 결과',
          paragraphs: [
            'AI 보조 품목 식별 결과는 불완전하거나 부정확할 수 있습니다. 스캔 결과는 출발점으로만 활용하고, 물건 상태와 지역 규칙을 검토한 뒤 불확실한 경우 공식 지자체 자료로 확인해야 합니다.',
          ],
        },
        {
          title: '결제 미처리',
          paragraphs: [
            'MIDORIGO는 게시, 탐색, 소통, 지역 조정을 위한 플랫폼입니다. MIDORIGO는 마켓플레이스 결제를 처리하거나 자금을 보관하거나 거래를 보증하거나 중개하지 않습니다. 앱 외부에서 정하는 거래 조건, 세금, 법적 의무, 안전 확인, 결제 방식은 사용자 책임입니다.',
          ],
        },
        {
          title: '신고와 운영',
          paragraphs: [
            'MIDORIGO는 안전 확보, 남용 방지, 서비스 무결성, 법률 준수, 분쟁 검토를 위해 신고를 검토하고 콘텐츠를 제거하거나 노출을 제한하거나 계정을 제한하거나 기록을 보관할 수 있습니다. 필요한 경우 사전 통지 없이 조치를 취할 수 있습니다.',
            '해당 기능이 제공되는 경우 사용자는 앱 내에서 부적절한 게시물, 메시지, 사용자를 신고할 수 있어야 합니다. MIDORIGO는 안전 관련 신고를 검토하고 적절한 조치를 적시에 취하도록 노력합니다.',
          ],
        },
        {
          title: '책임의 제한',
          paragraphs: [
            '법이 허용하는 최대 범위 내에서 MIDORIGO는 불완전한 지역 배출 정보에 대한 의존, 사용자 생성 마켓플레이스 콘텐츠, 사용자 간 거래, 서비스 중단, 제3자 서비스로 인한 간접적, 부수적, 특별, 결과적 또는 징벌적 손해에 대해 책임을 지지 않습니다.',
          ],
        },
        {
          title: '연락처',
          paragraphs: ['이 약관에 관한 문의는 japankaiten@gmail.com 으로 보내주십시오.'],
        },
      ],
    },
    contact: {
      eyebrow: '문의',
      title: 'MIDORIGO에 연락하기',
      intro: '이 양식은 지원 이메일 작성을 돕습니다. 이 정적 웹사이트에는 백엔드가 연결되어 있지 않습니다.',
      emailLabel: '이메일 주소',
      categoryLabel: '카테고리',
      messageLabel: '메시지',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: '무슨 일이 있었는지, 관련된 시 또는 지역, 필요하면 다른 계정 이메일도 함께 적어 주세요.',
      submit: '이메일 열기',
      supportTitle: '지원 이메일',
      supportBody: '앱 지원, 개인정보 요청, 지자체 정보 수정, 제휴 문의는 japankaiten@gmail.com 으로 보내주세요.',
      supportNote: '운영 환경용 문의 폼 백엔드는 나중에 추가할 수 있습니다. 현재는 사용자의 이메일 앱을 여는 방식입니다.',
      categories: ['앱 지원', '게시물/신고', '데이터/개인정보 요청', '지자체/콘텐츠 수정', '비즈니스/제휴 문의'],
    },
    support: {
      eyebrow: '지원',
      title: 'MIDORIGO 사용 도움말',
      intro: '게시물, 언어 설정, 지역 설정, 카메라 접근, 알림, 계정 문제, 잘못된 정보 신고에 대한 빠른 답변을 확인하세요.',
      sectionTitle: '문제 해결',
      outro: '추가 도움이 필요하면 japankaiten@gmail.com 으로 연락해 주세요. 기기명, 가능하다면 앱 버전, 선택한 지역, 문제 설명을 함께 보내주세요.',
      faq: [
        { question: '언어는 어떻게 변경하나요?', answer: '앱 설정에서 언어를 선택하고 일본어 또는 영어를 고르세요. 일부 지자체 원문 콘텐츠는 원래 게시된 언어로 남아 있을 수 있습니다.' },
        { question: '지역은 어떻게 설정하나요?', answer: '지역 설정 화면에서 시, 구, 정 또는 지역을 선택하세요. 게시물 표시, 지역 정보, 수거 일정, 배출 규칙은 이 설정에 따라 달라질 수 있습니다.' },
        { question: '카메라가 왜 작동하지 않나요?', answer: '기기 설정에서 MIDORIGO의 카메라 접근을 허용했는지 확인하세요. 스캐너는 사진으로 품목을 식별하기 위해 카메라 권한이 필요합니다.' },
        { question: '왜 알림이 오지 않나요?', answer: 'MIDORIGO 설정과 기기 설정 모두에서 알림이 활성화되어 있는지 확인하세요. 수거 알림은 선택한 지역 설정에도 의존합니다.' },
        { question: '로그인할 수 없습니다.', answer: '계정을 만들 때 사용한 이메일 또는 로그인 방법과 같은 방법을 사용하고 있는지 확인하세요. 문제가 계속되면 가능하면 계정 이메일로 지원팀에 문의하세요.' },
        { question: '잘못된 폐기물 정보를 어떻게 신고하나요?', answer: '앱 내 수정 또는 신고 기능을 사용하거나, 시 또는 지역명, 품목명, 올바르다고 생각하는 출처를 함께 보내 주세요.' },
        { question: '커뮤니티 게시물 신고는 어떻게 처리되나요?', answer: '중고품, 일자리, 부동산, 이벤트, 도움 요청, 차량 등의 게시물이 위험하거나 오해를 부르거나 불법적이거나 괴롭힘을 유발할 경우 신고 기능을 사용하세요. MIDORIGO는 규칙을 위반한 콘텐츠를 제거하거나 계정을 제한할 수 있습니다.' },
        { question: 'MIDORIGO에서 상품이나 서비스 비용을 결제할 수 있나요?', answer: '아니요. MIDORIGO는 돈을 처리하지 않습니다. 사용자는 앱 밖에서 직접 조율해야 하며 현지 법률, 안전 지침, 게시 규칙을 따라야 합니다.' },
      ],
    },
    deleteAccount: {
      eyebrow: '계정 및 데이터 삭제',
      title: 'MIDORIGO 계정 삭제 요청',
      intro: '이메일로 계정 삭제를 요청할 수 있습니다. 이 페이지는 어떤 정보를 포함해야 하는지와 어떤 데이터가 삭제, 익명화 또는 보관될 수 있는지 설명합니다.',
      requestTitle: '삭제 요청 방법',
      requestSteps: [
        '계정 이메일에서 japankaiten@gmail.com 으로 보내 주세요.',
        '제목은 Account deletion request 로 작성해 주세요.',
        '가능하면 앱에서 사용자 ID를 함께 적어 주세요.',
      ],
      sections: [
        {
          title: '삭제되거나 익명화될 수 있는 정보',
          paragraphs: [
            '계정 프로필 정보, 저장된 지역 설정, 알림 설정, 업로드한 이미지, 신고, 중고 게시물, 일자리, 부동산 게시물, 이벤트 게시물, 도움 요청, 차량 게시물, 메시지 및 관련 사용자 콘텐츠는 기술적·법적으로 가능한 범위 내에서 삭제되거나 익명화될 수 있습니다.',
          ],
        },
        {
          title: '보관될 수 있는 정보',
          paragraphs: [
            '법률, 보안, 사기 방지, 남용 방지, 분쟁 처리, 백업, 운영상 이유로 일부 기록은 보관될 수 있습니다. 보관되는 기록은 이러한 목적에 필요한 범위로 제한됩니다. MIDORIGO는 마켓플레이스 결제를 처리하지 않습니다.',
          ],
        },
        {
          title: '처리 시점',
          paragraphs: [
            'MIDORIGO는 삭제 요청을 검토하고 처리 전에 본인 확인을 요청할 수 있습니다. 요청이 검토되면 계정 이메일로 안내가 발송됩니다.',
          ],
        },
      ],
    },
  }),
  zh: shallowTranslate(english, {
    locale: 'zh',
    routes: { home: '首页', privacy: '隐私政策', terms: '服务条款', contact: '联系', support: '支持', deleteAccount: '删除账户' },
    common: {
      language: '语言',
      legalAndSupport: '法律与支持',
      policyDetails: '政策详情',
      termsDetails: '条款详情',
      footerAbout: '为在日本居住的人提供循环经济信息、社区交易、本地生活信息以及自治体垃圾支持的平台。',
      effectiveDate: '2026年4月18日',
      address: '如有要求，可在有效申请后提供。',
    },
    home: {
      eyebrow: '面向日本居民的循环经济平台',
      title: '服务本地循环社区的入口层。',
      tagline: '更方便地在本地交易、重复利用，并配合自治体垃圾规则。',
      intro: 'MIDORIGO通过二手交易、工作机会、房产、活动、互助、汽车和社区交易连接本地居民。自治体层提供垃圾日历、AI物品识别、投放指引、回收设施和问题上报。',
      ctaAvailability: '免费注册抢先体验',
      ctaSupport: '获取支持',
      previewLabel: 'MIDORIGO 应用预览',
      previewCardLabel: '本地市场',
      previewCardTitle: '餐桌',
      previewCardNote: '先重复利用再丢弃',
      previewScanLabel: '自治体层',
      previewScanTitle: '塑料瓶',
      previewScanNote: '明天回收',
      previewPills: ['附近工作', '本周活动', 'AI投放检查'],
      sections: {
        features: 'MIDORIGO 可帮助的事项',
        marketplace: '社区市场分类',
        platform: '平台如何协同工作',
        boundaries: '重要平台边界',
        residents: '为日本居民而设',
        coreAreas: '核心应用区域',
        comingSoon: '即将推出',
        faq: '常见问题',
      },
      marketplaceLead: 'MIDORIGO不处理资金，也不是支付提供方。它是用于发布、发现、沟通和本地协调的平台。交易条款、安全安排和法律合规由用户自行负责。',
      features: [
        { icon: 'market', title: '二手市场', text: '发布可继续使用的物品，进行本地交易、转赠或再利用。MIDORIGO连接人与人，但不处理支付。' },
        { icon: 'briefcase', title: '本地工作', text: '查找社区个人和组织发布的附近工作与服务机会。' },
        { icon: 'home', title: '房产', text: '在日常社区信息之外，一并查看本地住房和房产信息。' },
        { icon: 'calendar', title: '活动与互助', text: '分享本地活动、发出求助请求，并获得邻里中的实际帮助。' },
        { icon: 'car', title: '汽车与出行交易', text: '在应用规则允许范围内，发布或浏览本地车辆与出行相关信息。' },
        { icon: 'scan', title: '垃圾分类扫描', text: '使用 AI 辅助物品识别，获取面向自治体的处理建议和下一步操作。' },
        { icon: 'calendar', title: '收集日历', text: '清晰查看可燃、不可燃、可回收和大件垃圾的收集日期。' },
        { icon: 'map', title: '本地投放规则', text: '保存所在城市或地区设置，让指引更贴合你的居住地。' },
        { icon: 'recycle', title: '回收设施', text: '当物品需要特殊处理时，查找附近的回收、处理和投放地点。' },
        { icon: 'language', title: '日英双语支持', text: '可在多语言中查看发布内容、日常任务、本地规则、提醒和垃圾相关术语。' },
      ],
      marketplaceCategories: ['二手物品', '工作', '房产', '活动', '求助', '汽车与出行'],
      appAspects: [
        { icon: 'market', title: '本地交易与再利用', text: '居民可以发布和发现二手物品、赠送物品、车辆及其他出行信息，让可用资源在社区内持续流通。' },
        { icon: 'briefcase', title: '社区机会', text: '工作、求助、活动和本地通知为居民提供一个实用的平台来分享周边机会。' },
        { icon: 'home', title: '住房与区域发现', text: '房产信息可以帮助人们结合周边服务和社区活动来了解住房选择。' },
        { icon: 'map', title: '自治体导向层', text: '城市和地区设置支持垃圾日历、投放规则、回收点、问题上报和本地废弃物指引。' },
        { icon: 'scan', title: 'AI 辅助识别', text: '通过物品照片帮助居民识别可能的投放类别，但最终决定仍应核对自治体规则。' },
        { icon: 'language', title: '双语日常访问', text: '日语和英语支持帮助居民更轻松地浏览发布、本地规则、提醒和垃圾术语。' },
      ],
      platformBoundaries: [
        'MIDORIGO不处理付款、不保管资金、不提供托管，也不保证交易。',
        '除非另有明确说明，发布、消息、工作、房产、活动、求助和车辆信息均为用户生成内容。',
        '合法发布、安全沟通、线下安排、税务、执照、许可和交易条款均由用户自行负责。',
        '自治体网站、纸质指南、官方通知和本地办公室仍是最终垃圾处理决定的依据。',
        '如怀疑存在安全风险、欺诈、滥用、违法或规则违规，MIDORIGO可移除内容、限制账户或审核举报。',
      ],
      residentsParagraphs: [
        'MIDORIGO面向长期居民、新搬家的人、国际居民、学生、家庭、本地工作者以及希望在一个地方获得实用社区信息的人。',
        '自治体层帮助处理本地投放规则、AI物品识别、收集日历、回收设施和问题上报。除非另有明确说明，本应用并不代表官方合作关系。最终的垃圾与回收规则仍应以自治体官方信息为准。',
      ],
      residentsChecks: [
        '发布可再利用物品、工作、住房、车辆、活动和求助信息',
        '在MIDORIGO不处理付款的前提下直接协调',
        '保存城市或地区设置',
        '查看双语自治体投放指引',
        '举报不清晰的发布或过时的垃圾信息',
      ],
      appAreas: [
        { label: '市场', title: '二手物品与本地发布' },
        { label: '自治体层', title: '垃圾日历与 AI 物品检查' },
        { label: '社区', title: '工作、活动、互助、房产与车辆' },
      ],
      faq: [
        { question: 'MIDORIGO是官方政府应用吗？', answer: '不是。除非明确公布合作关系，MIDORIGO是独立的循环经济平台。最终的垃圾和回收处理应以自治体规则为准。' },
        { question: 'MIDORIGO会处理付款吗？', answer: '不会。MIDORIGO是一个用于发布、发现和沟通的平台，交易安排和付款由用户自行负责。' },
        { question: '用户可以发布什么？', answer: '可发布本地二手物品、工作、房产、活动、求助以及汽车或出行相关内容，但须遵守应用规则和当地法律。' },
        { question: 'MIDORIGO会验证每一条发布吗？', answer: '不会。发布和消息均为用户生成。MIDORIGO可能提供举报和审核工具，但用户仍应自行仔细判断。' },
        { question: '应用能准确告诉我每件物品怎么丢弃吗？', answer: 'MIDORIGO会帮助整理投放信息，但规则因自治体而异且可能变化。对不确定的物品应向当地自治体确认。' },
        { question: '应用支持日语和英语吗？', answer: '支持。应用设计为双语使用，帮助居民更容易理解本地垃圾术语和日常信息。' },
        { question: '应用什么时候上线？', answer: 'MIDORIGO正在准备 App Store 和 Google Play 上线。最终商店链接将在审核通过后补充。' },
      ],
      storeBadges: { appStore: '即将在 App Store 上线', playStore: '即将在 Google Play 上线' },
    },
    privacy: {
      eyebrow: '隐私政策',
      title: 'MIDORIGO 如何处理数据',
      intro: '本政策说明 MIDORIGO 为提供本地循环经济信息、社区沟通以及面向自治体的垃圾支持而可能收集的信息。',
      sections: [
        {
          title: '我们可能收集的信息',
          paragraphs: [
            '当你创建或管理账户时，MIDORIGO 可能会收集账户邮箱和个人资料信息。',
            '当你使用本地发现、设施搜索、收集日历或投放指引功能时，我们可能会收集你选择的城市、区、町、地区设置数据以及大致位置相关信号。',
            '如果你使用 AI 物品识别、二手发布、工作、房产、活动、求助、汽车、举报等功能，我们可能会收集你主动提交的图片和相关文本。',
            '当相关功能可用时，社区发布、聊天、举报和审核内容可能会被收集。MIDORIGO 不处理付款，但用户可能会在发布或消息中包含交易细节。',
            '只有在物品扫描、发布图片、收集提醒、本地发现或设施搜索等功能需要时，应用才会请求相机、照片库、通知和位置权限。',
            '为了运营、保护和改进应用，我们可能会收集分析信息、诊断信息、设备信息、通知偏好和通知令牌。',
          ],
        },
        {
          title: '信息的使用方式',
          paragraphs: [
            '我们使用这些信息来提供账户、本地设置、循环经济发布、社区沟通、收集提醒、AI 辅助物品指引、回收搜索、问题上报、客户支持、安全审核、分析、诊断、防欺诈和法律合规。',
            '与位置相关的设置用于个性化应用内容。MIDORIGO 不替代自治体的官方规则。',
            '为扫描提交的图片和文本可用于返回投放建议、改进安全与诊断、调查举报，并在法律和应用设置允许的范围内支持审核。',
          ],
        },
        {
          title: '第三方服务',
          paragraphs: [
            'MIDORIGO 可能使用 Supabase 提供认证、数据库和存储服务。推送通知可能使用 Expo 或通知服务。若提供位置或设施搜索功能，可能使用地图或位置服务提供商。由于 MIDORIGO 不处理资金、不处理市场付款，也不保管资金，因此这里不列出支付服务商。',
            '这些服务商会依据各自的条款和隐私政策处理信息。当 MIDORIGO 增加、移除或更换服务商时，相关列表可能会更新。',
          ],
        },
        {
          title: '共享与处理方',
          paragraphs: [
            '我们可能会与帮助 MIDORIGO 运营的服务商共享信息，包括托管、认证、存储、通知、分析、诊断、地图、客户支持、安全和审核工具。这些服务商应仅在为我们提供服务的范围内处理相关信息。',
            '当法律要求、需要保护用户和服务、调查滥用或欺诈、回应合法请求，或在法律允许的业务转移过程中，我们也可能披露相关信息。',
          ],
        },
        {
          title: '安全',
          paragraphs: [
            'MIDORIGO 采取合理的管理、技术和组织措施，以保护用户信息免遭未经授权的访问、丢失、滥用、篡改或泄露。但任何在线服务都无法保证绝对安全，因此用户也应妥善保护账户凭据，并谨慎对待在发布或消息中分享的信息。',
          ],
        },
        {
          title: '用户生成内容与可见性',
          paragraphs: [
            '发布内容、活动、工作、房产信息、求助请求、车辆信息、个人资料以及相关消息，可能会根据所使用的功能和应用设置对其他用户可见。',
            '举报和审核记录可能会被查看，以保护用户、执行规则、防止滥用、回应法律请求并维护服务完整性。',
          ],
        },
        {
          title: '保存期限、删除与联系方式',
          paragraphs: [
            '我们仅在实现本政策所述目的所需的时间内保存信息，除非因法律、安全、争议处理、审核或运营原因需要更长时间保留。',
            '你可以请求访问、更正或删除账户信息。账户删除说明见 /delete-account。出于法律、安全、防欺诈、防滥用、争议处理、备份或运营原因，部分记录可能会被保留。',
            '如需访问、更正、删除或寻求隐私支持，请联系 japankaiten@gmail.com。',
          ],
        },
        {
          title: '儿童',
          paragraphs: [
            'MIDORIGO 不面向 13 岁以下儿童。未达到所在地区法定成年年龄的用户，尤其在使用发布、消息、交易、工作、房产、活动、求助和车辆相关功能时，应在父母或法定监护人的许可和监督下使用。',
          ],
        },
      ],
    },
    terms: {
      eyebrow: '服务条款',
      title: '使用 MIDORIGO 的规则',
      intro: '本条款说明将 MIDORIGO 作为本地循环经济平台和自治体导向垃圾支持服务使用时的基本责任。',
      sections: [
        {
          title: '使用资格与账户',
          paragraphs: [
            '用户必须能够在其所在地合法使用 MIDORIGO。MIDORIGO 不面向 13 岁以下儿童。如果你在所在地尚未达到法定成年年龄，使用市场、消息、工作、房产、活动、求助和车辆相关功能时应获得父母或法定监护人的许可和监督。账户信息的准确性以及登录方式的安全由用户负责。',
          ],
        },
        {
          title: '合理使用',
          paragraphs: [
            '不得滥用应用、干扰服务运行、上传有害内容、冒充他人、违反法律、骚扰用户或提交虚假举报。对于看似滥用、不安全、违法或与本条款不一致的账户、发布、消息或举报，MIDORIGO 可暂停或移除。',
          ],
        },
        {
          title: '禁止内容与行为',
          paragraphs: [
            '不得发布或宣传非法商品或服务、武器、管制物质、赃物、召回产品、欺诈性报价、诈骗、色情或剥削性内容、人口贩运、仇恨或歧视内容、威胁、骚扰、霸凌、泄露个人隐私、恶意软件、垃圾信息，或侵犯他人权利的内容。MIDORIGO 可能使用过滤、审核、举报、屏蔽和管理工具来减少不安全或令人反感的内容。',
          ],
        },
        {
          title: '用户生成内容',
          paragraphs: [
            '用户对其提交的发布、消息、图片、举报和其他内容负责。内容应足够准确，不得误导他人，也不得侵犯权利、未经许可公开隐私信息，或鼓励危险、欺诈、歧视、违法或滥用行为。',
          ],
        },
        {
          title: '社区市场规则',
          paragraphs: [
            '商品、工作、房产、活动、求助、车辆及其他支持类别的发布应诚实准确地描述内容。用户应对安全沟通、合法发布、交接安排以及避免禁止、危险、召回、非法、误导或受限的物品和服务负责。',
            '工作、房产、车辆、活动和求助类发布必须遵守适用法律、执照、许可、雇佣规则、住房规则、消费者保护规则以及平台发布要求。',
          ],
        },
        {
          title: '垃圾指引与自治体规则',
          paragraphs: [
            'MIDORIGO 帮助整理处理信息，但不保证这些指引始终完整、最新，或适用于每一栋建筑和每个区域。最终的处理决定应通过当地自治体规则、官方通知或本地联系点进行确认。',
            '除非 MIDORIGO 与相关机构另有明确说明，否则不代表任何官方自治体认可或合作关系。',
          ],
        },
        {
          title: 'AI 辅助结果',
          paragraphs: [
            'AI 辅助物品识别结果可能不完整或不准确。用户应将扫描结果视为起点，结合物品状况和本地规则进行判断，并在不确定时向自治体官方来源核实。',
          ],
        },
        {
          title: '不处理付款',
          paragraphs: [
            'MIDORIGO 是用于发布、发现、沟通和本地协调的平台。MIDORIGO 不处理市场付款、不保管资金、不提供托管、不保证交易，也不充当中介。用户需自行负责在应用外达成的交易条款、税务、法律要求、安全检查和付款安排。',
          ],
        },
        {
          title: '举报与审核',
          paragraphs: [
            'MIDORIGO 可为保障安全、防止滥用、维护服务完整性、符合法律要求或处理争议而审核举报、移除内容、限制可见性、限制账户或保留记录。在必要时，相关措施可在不事先通知的情况下采取。',
            '在相关功能可用的情况下，用户应能够在应用内举报令人反感的发布、消息和用户。MIDORIGO 将尽力及时审查安全举报并采取适当措施。',
          ],
        },
        {
          title: '责任限制',
          paragraphs: [
            '在法律允许的最大范围内，MIDORIGO 不对因依赖不完整的本地处理信息、用户生成的市场内容、用户自行安排的交易、服务中断或第三方服务而造成的间接、附带、特殊、后果性或惩罚性损害承担责任。',
          ],
        },
        {
          title: '联系方式',
          paragraphs: ['如对本条款有疑问，请发送邮件至 japankaiten@gmail.com。'],
        },
      ],
    },
    contact: {
      eyebrow: '联系',
      title: '联系 MIDORIGO',
      intro: '此表单用于帮助你准备发送给支持团队的邮件。这个静态网站未连接后端服务。',
      emailLabel: '你的邮箱',
      categoryLabel: '类别',
      messageLabel: '消息内容',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: '请说明发生了什么、相关城市或区域，以及如有不同请附上账户邮箱。',
      submit: '打开邮件',
      supportTitle: '支持邮箱',
      supportBody: '如需应用支持、隐私请求、自治体内容更正或合作咨询，请发送邮件至 japankaiten@gmail.com。',
      supportNote: '后续可以添加正式联系表单后端。当前此表单会打开用户的邮件应用。',
      categories: ['应用支持', '发布/举报', '数据/隐私请求', '自治体/内容更正', '商务/合作咨询'],
    },
    support: {
      eyebrow: '支持',
      title: 'MIDORIGO 使用帮助',
      intro: '查找关于发布内容、语言设置、地区设置、相机权限、通知、账户帮助和错误信息举报的快速解答。',
      sectionTitle: '故障排查',
      outro: '如果还需要帮助，请联系 japankaiten@gmail.com，并附上你的设备、应用版本（如有）、所选城市或地区以及问题简述。',
      faq: [
        { question: '如何更改语言？', answer: '打开应用设置，选择 Language，然后切换到日语或英语。部分自治体来源内容可能仍保留原始发布语言。' },
        { question: '如何设置我的地区？', answer: '在地区设置页面选择你的市、区、町或地区。市场发现、本地发布、收集日程和投放规则可能依赖此设置。' },
        { question: '为什么相机不能用？', answer: '请检查设备设置，并允许 MIDORIGO 使用相机。扫描器需要相机权限来通过照片识别物品。' },
        { question: '为什么我收不到通知？', answer: '请确认 MIDORIGO 设置和设备设置中都已开启通知。收集提醒也依赖你所选择的地区。' },
        { question: '我无法登录。', answer: '请确认你使用的是创建账户时使用的同一邮箱或登录方式。如果问题持续，请尽量使用账户邮箱联系支持团队。' },
        { question: '如何举报错误的垃圾信息？', answer: '请使用应用内的更正或举报功能，或者联系支持团队并提供城市或地区、物品名称以及你认为正确的信息来源。' },
        { question: '社区发布举报如何处理？', answer: '当二手物品、工作、房产、活动、求助、车辆或其他发布看起来不安全、误导、违法或有骚扰性时，请使用举报功能。MIDORIGO 可能移除违规内容或限制相关账户。' },
        { question: '我可以在 MIDORIGO 内支付商品或服务费用吗？', answer: '不可以。MIDORIGO 不处理资金。用户需要在应用外自行安排，并遵守当地法律、安全指引和发布规则。' },
      ],
    },
    deleteAccount: {
      eyebrow: '账户与数据删除',
      title: '申请删除你的 MIDORIGO 账户',
      intro: '你可以通过邮件申请删除账户。本页说明需要提供的信息，以及哪些数据可能会被删除、匿名化或在必要时保留。',
      requestTitle: '如何申请删除',
      requestSteps: [
        '请使用你的账户邮箱发送邮件至 japankaiten@gmail.com。',
        '邮件主题请填写：Account deletion request。',
        '如果可以，请附上你在应用中的用户 ID。',
      ],
      sections: [
        {
          title: '将被删除或匿名化的信息',
          paragraphs: [
            '账户资料信息、已保存的地区设置、通知偏好、上传图片、举报、二手发布、工作、房产发布、活动发布、求助请求、车辆发布、消息以及相关用户内容，可能会在技术和法律允许的范围内被删除或匿名化。',
          ],
        },
        {
          title: '可能保留的信息',
          paragraphs: [
            '出于法律、安全、防欺诈、防滥用、争议处理、备份或运营原因，部分记录可能会被保留。保留的记录将限制在实现这些目的所必需的范围内。MIDORIGO 不处理市场付款。',
          ],
        },
        {
          title: '处理时间',
          paragraphs: [
            'MIDORIGO 会审核删除请求，并可能在处理前要求进行身份验证。请求审核完成后，你将通过账户邮箱收到回复。',
          ],
        },
      ],
    },
  }),
  id: shallowTranslate(english, {
    locale: 'id',
    routes: { home: 'Beranda', privacy: 'Privasi', terms: 'Ketentuan', contact: 'Kontak', support: 'Bantuan', deleteAccount: 'Hapus Akun' },
    common: {
      language: 'Bahasa',
      legalAndSupport: 'Hukum dan bantuan',
      policyDetails: 'Detail kebijakan',
      termsDetails: 'Detail ketentuan',
      footerAbout: 'Platform untuk warga di Jepang dengan listing ekonomi sirkular, perdagangan lokal, informasi lingkungan, dan dukungan sampah berbasis pemerintah daerah.',
      effectiveDate: '18 April 2026',
      address: 'Tersedia bila diwajibkan melalui permintaan yang sah.',
    },
    home: {
      eyebrow: 'Platform ekonomi sirkular untuk warga di Jepang',
      title: 'Lapisan akses lokal untuk komunitas sirkular.',
      tagline: 'Bertransaksi lebih dekat, gunakan kembali lebih banyak, dan tetap selaras dengan aturan sampah pemerintah daerah.',
      intro: 'MIDORIGO menghubungkan warga lokal melalui listing barang bekas, pekerjaan, properti, acara, permintaan bantuan, kendaraan, dan perdagangan komunitas. Lapisan pemerintah daerah mendukung kalender sampah, identifikasi barang dengan AI, panduan pembuangan, fasilitas daur ulang, dan laporan masalah lokal.',
      ctaAvailability: 'Daftar akses awal gratis',
      ctaSupport: 'Lihat bantuan',
      previewLabel: 'Pratinjau aplikasi MIDORIGO',
      previewCardLabel: 'Marketplace lokal',
      previewCardTitle: 'Meja makan',
      previewCardNote: 'Gunakan kembali sebelum dibuang',
      previewScanLabel: 'Lapisan pemerintah daerah',
      previewScanTitle: 'Botol plastik',
      previewScanNote: 'Diambil besok',
      previewPills: ['Lowongan dekat Anda', 'Acara minggu ini', 'Cek pembuangan AI'],
      sections: {
        features: 'Yang dibantu MIDORIGO',
        marketplace: 'Kategori marketplace komunitas',
        platform: 'Cara platform bekerja',
        boundaries: 'Batas penting platform',
        residents: 'Untuk warga di Jepang',
        coreAreas: 'Area inti aplikasi',
        comingSoon: 'Segera hadir',
        faq: 'FAQ',
      },
      marketplaceLead: 'MIDORIGO tidak menangani uang atau menjadi penyedia pembayaran. Aplikasi ini adalah platform untuk posting, penemuan, komunikasi, dan koordinasi lokal. Pengguna bertanggung jawab atas keamanan, kepatuhan hukum, dan syarat transaksi mereka sendiri.',
      features: [
        { icon: 'market', title: 'Marketplace barang bekas', text: 'Pasang barang yang masih layak untuk jual beli lokal, penggunaan ulang, atau giveaway. MIDORIGO menghubungkan orang, tetapi tidak memproses pembayaran.' },
        { icon: 'briefcase', title: 'Pekerjaan lokal', text: 'Temukan peluang kerja dan layanan di sekitar lingkungan yang diposting oleh orang dan organisasi di komunitas.' },
        { icon: 'home', title: 'Properti', text: 'Temukan posting perumahan dan properti lokal bersama informasi komunitas harian yang dibutuhkan warga.' },
        { icon: 'calendar', title: 'Acara dan bantuan', text: 'Bagikan acara lokal, minta bantuan, dan temukan dukungan praktis dari warga sekitar.' },
        { icon: 'car', title: 'Perdagangan mobil dan mobilitas', text: 'Posting atau telusuri listing kendaraan dan mobilitas lokal sesuai aturan aplikasi.' },
        { icon: 'scan', title: 'Pemindai pemilahan sampah', text: 'Gunakan identifikasi item berbantuan AI untuk panduan pembuangan yang berorientasi pada pemerintah daerah.' },
        { icon: 'calendar', title: 'Kalender pengambilan', text: 'Lihat jadwal pengumpulan sampah mudah terbakar, tidak terbakar, daur ulang, dan barang besar dengan jelas.' },
        { icon: 'map', title: 'Aturan pembuangan lokal', text: 'Simpan pengaturan kota atau area agar panduan tersusun sesuai tempat tinggal Anda.' },
        { icon: 'recycle', title: 'Fasilitas daur ulang', text: 'Temukan opsi daur ulang, pembuangan, dan drop-off terdekat saat barang memerlukan penanganan khusus.' },
        { icon: 'language', title: 'Dukungan bahasa Jepang dan Inggris', text: 'Beralih bahasa untuk listing, tugas sehari-hari, aturan lokal, pengingat, dan istilah sampah.' },
      ],
      marketplaceCategories: ['Barang bekas', 'Pekerjaan', 'Properti', 'Acara', 'Permintaan bantuan', 'Mobil dan mobilitas'],
      appAspects: [
        { icon: 'market', title: 'Perdagangan lokal dan penggunaan ulang', text: 'Warga dapat memposting dan menemukan barang bekas, barang giveaway, mobil, dan listing mobilitas lain agar barang berguna tetap beredar lebih lama.' },
        { icon: 'briefcase', title: 'Peluang komunitas', text: 'Pekerjaan, permintaan bantuan, acara, dan pengumuman lokal memberi warga tempat praktis untuk menemukan dan berbagi peluang sekitar.' },
        { icon: 'home', title: 'Hunian dan penemuan area', text: 'Posting properti membantu orang memahami pilihan hunian lokal bersama layanan harian dan aktivitas komunitas di suatu area.' },
        { icon: 'map', title: 'Lapisan berorientasi pemerintah daerah', text: 'Pengaturan kota dan area mendukung kalender sampah, aturan pembuangan, titik daur ulang, laporan masalah, dan panduan sampah lokal.' },
        { icon: 'scan', title: 'Identifikasi berbantuan AI', text: 'Foto barang dapat membantu warga mengenali kategori pembuangan yang mungkin, namun keputusan akhir tetap perlu dicek dengan aturan pemerintah daerah.' },
        { icon: 'language', title: 'Akses bilingual sehari-hari', text: 'Dukungan Inggris dan Jepang membantu warga menavigasi listing, aturan lokal, pengingat, dan istilah terkait sampah dengan lebih mudah.' },
      ],
      platformBoundaries: [
        'MIDORIGO tidak memproses pembayaran, menahan dana, menyediakan escrow, atau menjamin transaksi.',
        'Listing, pesan, pekerjaan, posting properti, acara, permintaan bantuan, dan posting kendaraan adalah konten buatan pengguna kecuali dinyatakan lain.',
        'Pengguna bertanggung jawab atas posting yang sah, komunikasi aman, pertemuan langsung, pajak, lisensi, izin, dan syarat transaksi apa pun.',
        'Situs pemerintah daerah, panduan cetak, pemberitahuan resmi, dan kantor lokal tetap menjadi sumber kebenaran untuk keputusan akhir pembuangan sampah.',
        'MIDORIGO dapat menghapus konten, membatasi akun, atau meninjau laporan ketika ada dugaan masalah keamanan, penipuan, penyalahgunaan, pelanggaran hukum, atau pelanggaran aturan.',
      ],
      residentsParagraphs: [
        'MIDORIGO dirancang untuk warga jangka panjang, pendatang baru, warga internasional, pelajar, keluarga, pekerja lokal, dan anggota komunitas yang ingin mendapatkan informasi lingkungan yang praktis di satu tempat.',
        'Lapisan pemerintah daerah membantu dengan aturan pembuangan lokal, identifikasi item berbantuan AI, kalender pengambilan, fasilitas daur ulang, dan laporan. Kecuali dinyatakan terpisah, aplikasi ini bukan kemitraan resmi pemerintah daerah. Aturan akhir tentang sampah dan daur ulang tetap harus diverifikasi melalui sumber resmi pemerintah daerah.',
      ],
      residentsChecks: [
        'Posting barang guna ulang, pekerjaan, rumah, mobil, acara, dan permintaan bantuan',
        'Berkoordinasi langsung tanpa MIDORIGO menangani pembayaran',
        'Simpan pengaturan kota atau area',
        'Tinjau panduan pembuangan pemerintah daerah dalam dua bahasa',
        'Laporkan listing yang tidak jelas atau informasi sampah yang usang',
      ],
      appAreas: [
        { label: 'Marketplace', title: 'Barang bekas dan posting lokal' },
        { label: 'Lapisan pemerintah daerah', title: 'Kalender sampah dan cek item AI' },
        { label: 'Komunitas', title: 'Pekerjaan, acara, bantuan, properti, dan mobil' },
      ],
      faq: [
        { question: 'Apakah MIDORIGO adalah aplikasi resmi pemerintah?', answer: 'Tidak. MIDORIGO adalah platform ekonomi sirkular independen kecuali kemitraan tertentu diumumkan. Aturan pemerintah daerah tetap menjadi sumber utama untuk keputusan akhir sampah dan daur ulang.' },
        { question: 'Apakah MIDORIGO menangani pembayaran?', answer: 'Tidak. MIDORIGO adalah platform untuk penemuan, posting, dan komunikasi. Pengguna bertanggung jawab atas pengaturan transaksi mereka sendiri.' },
        { question: 'Apa yang bisa diposting pengguna?', answer: 'MIDORIGO ditujukan untuk barang bekas lokal, pekerjaan, properti, acara, permintaan bantuan, dan listing mobil atau mobilitas, sesuai aturan aplikasi dan hukum setempat.' },
        { question: 'Apakah semua listing diverifikasi oleh MIDORIGO?', answer: 'Tidak. Listing dan pesan dibuat oleh pengguna. MIDORIGO dapat menyediakan alat pelaporan dan moderasi, tetapi pengguna tetap harus menilai dengan hati-hati.' },
        { question: 'Apakah aplikasi bisa memberi tahu cara membuang setiap barang secara pasti?', answer: 'MIDORIGO membantu mengatur panduan pembuangan, tetapi aturan berbeda di tiap pemerintah daerah dan dapat berubah. Barang yang meragukan harus diverifikasi ke otoritas setempat.' },
        { question: 'Apakah aplikasi akan bekerja dalam bahasa Jepang dan Inggris?', answer: 'Ya. Aplikasi ini dirancang agar penggunaan dua bahasa membantu warga memahami istilah sampah dan informasi sehari-hari dengan lebih mudah.' },
        { question: 'Kapan aplikasi akan tersedia?', answer: 'MIDORIGO sedang mempersiapkan peluncuran di App Store dan Google Play. URL toko final akan ditambahkan setelah persetujuan.' },
      ],
      storeBadges: { appStore: 'Segera hadir di App Store', playStore: 'Segera hadir di Google Play' },
    },
    privacy: {
      eyebrow: 'Kebijakan Privasi',
      title: 'Cara MIDORIGO menangani data',
      intro: 'Kebijakan ini menjelaskan informasi yang dapat dikumpulkan MIDORIGO untuk menyediakan listing ekonomi sirkular lokal, komunikasi komunitas, dan dukungan sampah berbasis pemerintah daerah.',
      sections: [
        { title: 'Informasi yang dapat kami kumpulkan', paragraphs: [
          'MIDORIGO dapat mengumpulkan email akun dan informasi profil saat Anda membuat atau mengelola akun.',
          'Kami dapat mengumpulkan data kota, distrik, area, pengaturan lokasi, dan sinyal lokasi perkiraan saat Anda menggunakan fitur penemuan lokal, pencarian fasilitas, kalender pengambilan, atau panduan pembuangan.',
          'Jika Anda menggunakan identifikasi barang dengan AI, listing barang bekas, pekerjaan, properti, acara, permintaan bantuan, mobil, laporan, atau fitur serupa, kami dapat mengumpulkan gambar yang diunggah dan teks terkait yang Anda kirimkan.',
          'Konten listing komunitas, chat, laporan, dan moderasi dapat dikumpulkan jika fitur tersebut tersedia. MIDORIGO tidak memproses pembayaran, tetapi pengguna dapat menyertakan detail transaksi dalam listing atau pesan.',
          'Izin kamera, galeri foto, notifikasi, dan lokasi dapat diminta hanya saat diperlukan untuk fitur seperti pemindaian barang, foto listing, pengingat pengambilan, penemuan lokal, atau pencarian fasilitas.',
          'Analitik, diagnostik, informasi perangkat, preferensi notifikasi, dan token notifikasi dapat dikumpulkan untuk menjalankan, mengamankan, dan meningkatkan aplikasi.',
        ]},
        { title: 'Bagaimana informasi digunakan', paragraphs: [
          'Kami menggunakan informasi untuk menyediakan akun, pengaturan lokal, listing ekonomi sirkular, komunikasi komunitas, pengingat pengambilan, panduan barang berbantuan AI, pencarian daur ulang, pelaporan masalah, dukungan pelanggan, moderasi keamanan, analitik, diagnostik, pencegahan penipuan, dan kepatuhan hukum.',
          'Pengaturan terkait lokasi digunakan untuk menyesuaikan konten aplikasi. MIDORIGO tidak menggantikan aturan resmi pemerintah daerah.',
          'Gambar dan teks yang dikirim untuk pemindaian dapat digunakan untuk memberi saran pembuangan, meningkatkan keamanan dan diagnostik, menyelidiki laporan, dan mendukung moderasi sesuai hukum dan pengaturan aplikasi.',
        ]},
        { title: 'Layanan pihak ketiga', paragraphs: [
          'MIDORIGO dapat menggunakan Supabase untuk autentikasi, basis data, dan penyimpanan. Expo atau layanan notifikasi dapat digunakan untuk push notification. Penyedia peta atau lokasi dapat digunakan saat fitur lokasi atau pencarian fasilitas tersedia. Karena MIDORIGO tidak menangani uang, pembayaran marketplace, atau penyimpanan dana, penyedia pembayaran tidak dicantumkan di sini.',
          'Penyedia ini memproses informasi sesuai syarat dan kebijakan privasi mereka sendiri. Daftar penyedia dapat diperbarui saat MIDORIGO menambah, menghapus, atau mengganti penyedia layanan.',
        ]},
        { title: 'Berbagi dan pemroses', paragraphs: [
          'Kami dapat membagikan informasi kepada penyedia layanan yang membantu mengoperasikan MIDORIGO, termasuk hosting, autentikasi, penyimpanan, notifikasi, analitik, diagnostik, peta, dukungan pelanggan, keamanan, dan alat moderasi. Penyedia ini diharapkan memproses informasi untuk layanan yang mereka sediakan kepada kami.',
          'Kami juga dapat mengungkapkan informasi bila diwajibkan oleh hukum, untuk melindungi pengguna dan layanan, menyelidiki penyalahgunaan atau penipuan, menanggapi permintaan hukum yang sah, atau sebagai bagian dari pengalihan bisnis yang diizinkan oleh hukum.',
        ]},
        { title: 'Keamanan', paragraphs: [
          'MIDORIGO menggunakan langkah administratif, teknis, dan organisasi yang wajar untuk melindungi informasi pengguna dari akses tidak sah, kehilangan, penyalahgunaan, perubahan, atau pengungkapan. Tidak ada layanan online yang dapat menjamin keamanan mutlak, jadi pengguna juga harus melindungi kredensial akun dan berhati-hati saat membagikan informasi dalam listing atau pesan.',
        ]},
        { title: 'Konten buatan pengguna dan visibilitas', paragraphs: [
          'Listing, acara, pekerjaan, posting properti, permintaan bantuan, posting kendaraan, detail profil, dan pesan terkait dapat terlihat oleh pengguna lain tergantung fitur dan pengaturan yang tersedia di aplikasi.',
          'Laporan dan catatan moderasi dapat ditinjau untuk melindungi pengguna, menegakkan aturan, mencegah penyalahgunaan, menanggapi permintaan hukum, dan menjaga integritas layanan.',
        ]},
        { title: 'Retensi, penghapusan, dan kontak', paragraphs: [
          'Kami menyimpan informasi hanya selama diperlukan untuk tujuan dalam kebijakan ini, kecuali periode yang lebih lama diperlukan karena alasan hukum, keamanan, sengketa, moderasi, atau operasional.',
          'Anda dapat meminta akses, koreksi, atau penghapusan informasi akun. Instruksi penghapusan akun tersedia di /delete-account. Sebagian catatan dapat disimpan untuk alasan hukum, keamanan, pencegahan penipuan, pencegahan penyalahgunaan, penanganan sengketa, cadangan, atau operasional.',
          'Untuk meminta akses, koreksi, penghapusan, atau bantuan privasi, hubungi japankaiten@gmail.com.',
        ]},
        { title: 'Anak-anak', paragraphs: [
          'MIDORIGO tidak ditujukan untuk anak di bawah 13 tahun. Pengguna yang belum mencapai usia dewasa menurut lokasi mereka harus menggunakan aplikasi hanya dengan izin dan pengawasan orang tua atau wali hukum, terutama untuk listing, pesan, transaksi, pekerjaan, properti, acara, permintaan bantuan, dan posting terkait kendaraan.',
        ]},
      ],
    },
    terms: {
      eyebrow: 'Ketentuan Layanan',
      title: 'Aturan penggunaan MIDORIGO',
      intro: 'Ketentuan ini menjelaskan tanggung jawab dasar saat menggunakan MIDORIGO sebagai platform ekonomi sirkular lokal dengan dukungan sampah berbasis pemerintah daerah.',
      sections: [
        { title: 'Kelayakan dan akun', paragraphs: [
          'Anda harus dapat menggunakan MIDORIGO secara sah di lokasi Anda. MIDORIGO tidak ditujukan untuk anak di bawah 13 tahun. Jika Anda belum mencapai usia dewasa di tempat tinggal Anda, Anda harus menggunakan fitur marketplace, pesan, pekerjaan, properti, acara, permintaan bantuan, dan kendaraan hanya dengan izin dan pengawasan orang tua atau wali hukum. Anda bertanggung jawab atas keakuratan informasi akun dan keamanan metode masuk Anda.',
        ]},
        { title: 'Penggunaan yang dapat diterima', paragraphs: [
          'Jangan menyalahgunakan aplikasi, mengganggu operasi layanan, mengunggah konten berbahaya, menyamar sebagai orang lain, melanggar hukum, melecehkan pengguna, atau mengirim laporan palsu. MIDORIGO dapat menangguhkan atau menghapus akun, listing, pesan, atau laporan yang tampak abusif, tidak aman, ilegal, atau tidak sesuai dengan ketentuan ini.',
        ]},
        { title: 'Konten dan perilaku terlarang', paragraphs: [
          'Jangan memposting atau mempromosikan barang atau jasa ilegal, senjata, zat terkontrol, barang curian, produk recall, penawaran palsu, penipuan, konten seksual atau eksploitatif, perdagangan manusia, konten kebencian atau diskriminatif, ancaman, pelecehan, perundungan, doxxing, malware, spam, atau konten yang melanggar hak orang lain. MIDORIGO dapat menggunakan penyaringan, peninjauan, pelaporan, pemblokiran, dan alat moderasi untuk mengurangi konten yang tidak aman atau tidak pantas.',
        ]},
        { title: 'Konten buatan pengguna', paragraphs: [
          'Pengguna bertanggung jawab atas listing, pesan, gambar, laporan, dan konten lain yang mereka kirim. Konten harus cukup akurat agar tidak menyesatkan orang lain dan tidak boleh melanggar hak, membuka informasi pribadi tanpa izin, atau mempromosikan aktivitas yang tidak aman, curang, diskriminatif, ilegal, atau abusif.',
        ]},
        { title: 'Aturan marketplace komunitas', paragraphs: [
          'Listing barang, pekerjaan, properti, acara, permintaan bantuan, mobil, dan kategori lain yang didukung harus menjelaskan isi secara jujur. Pengguna bertanggung jawab atas komunikasi yang aman, posting yang sah, pengaturan serah terima, serta menghindari barang dan layanan yang terlarang, berbahaya, recall, ilegal, menyesatkan, atau dibatasi.',
          'Posting pekerjaan, properti, kendaraan, acara, dan bantuan harus mengikuti hukum, lisensi, izin, aturan ketenagakerjaan, aturan perumahan, aturan perlindungan konsumen, dan persyaratan listing platform yang berlaku.',
        ]},
        { title: 'Panduan sampah dan aturan pemerintah daerah', paragraphs: [
          'MIDORIGO membantu mengatur informasi pembuangan, tetapi tidak menjamin panduan selalu lengkap, terbaru, atau berlaku untuk setiap bangunan atau lingkungan. Pengguna harus memverifikasi keputusan akhir pembuangan dengan aturan pemerintah daerah, pemberitahuan resmi, atau titik kontak lokal.',
          'Tidak ada dukungan resmi pemerintah daerah yang tersirat kecuali dinyatakan terpisah oleh MIDORIGO dan otoritas tersebut.',
        ]},
        { title: 'Hasil berbantuan AI', paragraphs: [
          'Identifikasi barang berbantuan AI dapat tidak lengkap atau salah. Pengguna harus memperlakukan hasil pemindaian sebagai titik awal, meninjau kondisi barang dan aturan lokal, lalu memverifikasi keputusan pembuangan yang meragukan dengan sumber resmi pemerintah daerah.',
        ]},
        { title: 'Tanpa penanganan pembayaran', paragraphs: [
          'MIDORIGO adalah platform untuk posting, penemuan, komunikasi, dan koordinasi lokal. MIDORIGO tidak memproses pembayaran marketplace, menahan dana, menyediakan escrow, menjamin transaksi, atau bertindak sebagai perantara. Pengguna bertanggung jawab atas syarat transaksi, pajak, persyaratan hukum, pemeriksaan keamanan, dan pengaturan pembayaran yang mereka buat di luar aplikasi.',
        ]},
        { title: 'Laporan dan moderasi', paragraphs: [
          'MIDORIGO dapat meninjau laporan, menghapus konten, membatasi visibilitas, membatasi akun, atau menyimpan catatan bila diperlukan untuk keselamatan, pencegahan penyalahgunaan, integritas layanan, kepatuhan hukum, atau peninjauan sengketa. Tindakan moderasi dapat diambil tanpa pemberitahuan sebelumnya bila diperlukan.',
          'Jika fitur tersebut tersedia, pengguna harus dapat melaporkan listing, pesan, dan pengguna yang tidak pantas dari dalam aplikasi. MIDORIGO berupaya meninjau laporan keselamatan dan mengambil tindakan yang sesuai secara tepat waktu.',
        ]},
        { title: 'Batas tanggung jawab', paragraphs: [
          'Sejauh diizinkan oleh hukum, MIDORIGO tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau hukuman, atau kerugian yang disebabkan oleh ketergantungan pada informasi pembuangan lokal yang tidak lengkap, konten marketplace buatan pengguna, transaksi antar pengguna, gangguan layanan, atau layanan pihak ketiga.',
        ]},
        { title: 'Kontak', paragraphs: ['Pertanyaan tentang ketentuan ini dapat dikirim ke japankaiten@gmail.com.'] },
      ],
    },
    contact: {
      eyebrow: 'Kontak',
      title: 'Hubungi MIDORIGO',
      intro: 'Gunakan formulir ini untuk menyiapkan email ke dukungan. Tidak ada backend yang terhubung di situs statis ini.',
      emailLabel: 'Email Anda',
      categoryLabel: 'Kategori',
      messageLabel: 'Pesan',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Ceritakan apa yang terjadi, kota atau area Anda jika relevan, dan email akun bila berbeda.',
      submit: 'Buka email',
      supportTitle: 'Email dukungan',
      supportBody: 'Email ke japankaiten@gmail.com untuk dukungan aplikasi, permintaan privasi, koreksi konten pemerintah daerah, dan pertanyaan mitra.',
      supportNote: 'Backend formulir kontak produksi dapat ditambahkan nanti. Untuk saat ini, formulir ini membuka aplikasi email pengguna.',
      categories: ['Dukungan aplikasi', 'Listing/laporan', 'Permintaan data/privasi', 'Koreksi pemerintah daerah/konten', 'Pertanyaan bisnis/mitra'],
    },
    support: {
      eyebrow: 'Bantuan',
      title: 'Bantuan menggunakan MIDORIGO',
      intro: 'Temukan jawaban cepat untuk listing marketplace, pengaturan bahasa, pengaturan lokasi, akses kamera, notifikasi, bantuan akun, dan pelaporan informasi yang salah.',
      sectionTitle: 'Pemecahan masalah',
      outro: 'Butuh bantuan lebih lanjut? Hubungi japankaiten@gmail.com dan sertakan perangkat Anda, versi aplikasi jika tersedia, kota atau area yang dipilih, dan deskripsi singkat masalah.',
      faq: [
        { question: 'Bagaimana cara mengubah bahasa?', answer: 'Buka pengaturan aplikasi, pilih Language, lalu pilih Inggris atau Jepang. Beberapa konten sumber pemerintah daerah dapat tetap dalam bahasa asli yang dipublikasikan.' },
        { question: 'Bagaimana cara mengatur lokasi saya?', answer: 'Gunakan layar pengaturan lokasi untuk memilih kota, distrik, atau area Anda. Penemuan marketplace, posting lokal, jadwal pengambilan, dan aturan pembuangan dapat bergantung pada pengaturan ini.' },
        { question: 'Mengapa kamera tidak berfungsi?', answer: 'Periksa pengaturan perangkat Anda dan izinkan akses kamera untuk MIDORIGO. Pemindai memerlukan izin kamera untuk mengidentifikasi barang dari foto.' },
        { question: 'Mengapa saya tidak menerima notifikasi?', answer: 'Pastikan notifikasi diaktifkan baik di pengaturan MIDORIGO maupun di pengaturan perangkat Anda. Pengingat pengambilan juga bergantung pada area yang Anda pilih.' },
        { question: 'Saya tidak bisa masuk.', answer: 'Periksa apakah Anda menggunakan email atau metode masuk yang sama dengan saat membuat akun. Jika masalah berlanjut, hubungi dukungan dari email akun bila memungkinkan.' },
        { question: 'Bagaimana cara melaporkan informasi sampah yang salah?', answer: 'Gunakan opsi koreksi atau laporan di aplikasi, atau hubungi dukungan dengan nama kota atau area, nama barang, dan sumber yang menurut Anda benar.' },
        { question: 'Bagaimana laporan listing komunitas ditangani?', answer: 'Gunakan tindakan report pada listing atau pesan ketika barang bekas, pekerjaan, properti, acara, permintaan bantuan, mobil, atau posting lain tampak tidak aman, menyesatkan, ilegal, atau abusif. MIDORIGO dapat menghapus konten atau membatasi akun yang melanggar aturan.' },
        { question: 'Bisakah saya membayar barang atau jasa di MIDORIGO?', answer: 'Tidak. MIDORIGO tidak memproses uang. Pengguna harus membuat pengaturan sendiri di luar aplikasi dan mengikuti hukum lokal, panduan keselamatan, dan aturan listing.' },
      ],
    },
    deleteAccount: {
      eyebrow: 'Penghapusan akun dan data',
      title: 'Minta penghapusan akun MIDORIGO Anda',
      intro: 'Anda dapat meminta penghapusan akun melalui email. Halaman ini menjelaskan apa yang harus disertakan dan data apa yang dapat dihapus, dianonimkan, atau disimpan bila diwajibkan.',
      requestTitle: 'Cara meminta penghapusan',
      requestSteps: [
        'Email ke japankaiten@gmail.com dari email akun Anda.',
        'Gunakan subjek: Account deletion request.',
        'Sertakan ID pengguna Anda jika tersedia di aplikasi.',
      ],
      sections: [
        { title: 'Apa yang dihapus atau dianonimkan', paragraphs: ['Informasi profil akun, pengaturan lokasi tersimpan, preferensi notifikasi, gambar yang diunggah, laporan, listing barang bekas, pekerjaan, posting properti, posting acara, permintaan bantuan, listing mobil, pesan, dan konten pengguna terkait dapat dihapus atau dianonimkan bila secara teknis dan hukum memungkinkan.'] },
        { title: 'Apa yang dapat disimpan', paragraphs: ['Sebagian catatan dapat disimpan bila diperlukan untuk alasan hukum, keamanan, pencegahan penipuan, pencegahan penyalahgunaan, penanganan sengketa, cadangan, atau operasional. Catatan yang disimpan akan dibatasi pada yang diperlukan untuk tujuan tersebut. MIDORIGO tidak memproses pembayaran marketplace.'] },
        { title: 'Waktu pemrosesan', paragraphs: ['MIDORIGO akan meninjau permintaan penghapusan dan dapat meminta verifikasi sebelum memproses. Anda akan menerima tanggapan di email akun setelah permintaan ditinjau.'] },
      ],
    },
  }),
  hi: shallowTranslate(english, {
    locale: 'hi',
    routes: { home: 'होम', privacy: 'गोपनीयता', terms: 'शर्तें', contact: 'संपर्क', support: 'सहायता', deleteAccount: 'अकाउंट हटाएँ' },
    common: {
      language: 'भाषा',
      legalAndSupport: 'कानूनी और सहायता',
      policyDetails: 'नीति विवरण',
      termsDetails: 'शर्तों का विवरण',
      footerAbout: 'जापान में रहने वाले लोगों के लिए सर्कुलर इकोनॉमी लिस्टिंग, स्थानीय लेनदेन, पड़ोस की जानकारी और नगरपालिका कचरा सहायता वाला प्लेटफ़ॉर्म।',
      effectiveDate: '18 अप्रैल 2026',
      address: 'जहाँ आवश्यक हो, वैध अनुरोध पर उपलब्ध।',
    },
    home: {
      eyebrow: 'जापान के निवासियों के लिए सर्कुलर इकोनॉमी प्लेटफ़ॉर्म',
      title: 'स्थानीय सर्कुलर समुदायों के लिए एक्सेस लेयर।',
      tagline: 'स्थानीय रूप से लेनदेन करें, अधिक पुनः उपयोग करें, और नगरपालिका कचरा नियमों के साथ बने रहें।',
      intro: 'MIDORIGO सेकंड-हैंड लिस्टिंग, नौकरियाँ, रियल एस्टेट, इवेंट, मदद के अनुरोध, वाहन और सामुदायिक लेनदेन के माध्यम से स्थानीय निवासियों को जोड़ता है। नगरपालिका लेयर कचरा कैलेंडर, AI आइटम पहचान, निपटान मार्गदर्शन, रीसाइक्लिंग सुविधाएँ और स्थानीय समस्या रिपोर्टिंग में मदद करती है।',
      ctaAvailability: 'मुफ्त प्रारंभिक एक्सेस दर्ज करें',
      ctaSupport: 'सहायता देखें',
      previewLabel: 'MIDORIGO ऐप प्रीव्यू',
      previewCardLabel: 'स्थानीय मार्केटप्लेस',
      previewCardTitle: 'डाइनिंग टेबल',
      previewCardNote: 'फेंकने से पहले पुनः उपयोग',
      previewScanLabel: 'नगरपालिका लेयर',
      previewScanTitle: 'प्लास्टिक बोतलें',
      previewScanNote: 'कल संग्रह',
      previewPills: ['आपके पास नौकरियाँ', 'इस सप्ताह इवेंट', 'AI निपटान जाँच'],
      sections: {
        features: 'MIDORIGO क्या मदद करता है',
        marketplace: 'कम्युनिटी मार्केटप्लेस श्रेणियाँ',
        platform: 'प्लेटफ़ॉर्म कैसे साथ काम करता है',
        boundaries: 'महत्वपूर्ण प्लेटफ़ॉर्म सीमाएँ',
        residents: 'जापान के निवासियों के लिए',
        coreAreas: 'मुख्य ऐप क्षेत्र',
        comingSoon: 'जल्द आ रहा है',
        faq: 'अक्सर पूछे जाने वाले प्रश्न',
      },
      marketplaceLead: 'MIDORIGO पैसे या भुगतान को संभालता नहीं है। यह पोस्टिंग, खोज, संचार और स्थानीय समन्वय के लिए एक प्लेटफ़ॉर्म है। सुरक्षा, कानूनी अनुपालन और लेनदेन की शर्तों की ज़िम्मेदारी उपयोगकर्ताओं की है।',
      features: [
        { icon: 'market', title: 'सेकंड-हैंड मार्केटप्लेस', text: 'उपयोग योग्य वस्तुओं को स्थानीय व्यापार, पुनः उपयोग या giveaway के लिए सूचीबद्ध करें। MIDORIGO लोगों को जोड़ता है, लेकिन भुगतान संसाधित नहीं करता।' },
        { icon: 'briefcase', title: 'स्थानीय नौकरियाँ', text: 'समुदाय के लोगों और संगठनों द्वारा पोस्ट किए गए आस-पास के काम और सेवाओं के अवसर खोजें।' },
        { icon: 'home', title: 'रियल एस्टेट', text: 'दैनिक सामुदायिक जानकारी के साथ स्थानीय आवास और संपत्ति पोस्ट देखें।' },
        { icon: 'calendar', title: 'इवेंट और मदद', text: 'स्थानीय इवेंट साझा करें, मदद माँगें, और आसपास के निवासियों से व्यावहारिक सहयोग पाएँ।' },
        { icon: 'car', title: 'कार और मोबिलिटी ट्रेड', text: 'ऐप नियमों के अनुसार स्थानीय वाहन और मोबिलिटी संबंधी लिस्टिंग पोस्ट करें या देखें।' },
        { icon: 'scan', title: 'कचरा छँटाई स्कैनर', text: 'AI-सहायता प्राप्त वस्तु पहचान का उपयोग कर नगरपालिका-उन्मुख निपटान मार्गदर्शन देखें।' },
        { icon: 'calendar', title: 'पिकअप कैलेंडर', text: 'जलने योग्य, न जलने योग्य, रिसाइक्लेबल और बड़े कचरे के संग्रह दिवस स्पष्ट रूप से देखें।' },
        { icon: 'map', title: 'स्थानीय निपटान नियम', text: 'अपने शहर या क्षेत्र की सेटिंग सहेजें ताकि मार्गदर्शन आपके रहने की जगह के अनुसार व्यवस्थित हो।' },
        { icon: 'recycle', title: 'रिसाइक्लिंग सुविधाएँ', text: 'विशेष संभाल की आवश्यकता होने पर पास के रिसाइक्लिंग, निपटान और ड्रॉप-ऑफ विकल्प खोजें।' },
        { icon: 'language', title: 'जापानी और अंग्रेज़ी सहायता', text: 'लिस्टिंग, दैनिक कार्य, स्थानीय नियम, रिमाइंडर और कचरा शब्दावली के लिए भाषाएँ बदलें।' },
      ],
      marketplaceCategories: ['सेकंड-हैंड सामान', 'नौकरियाँ', 'रियल एस्टेट', 'इवेंट', 'मदद के अनुरोध', 'कार और मोबिलिटी'],
      appAspects: [
        { icon: 'market', title: 'स्थानीय व्यापार और पुनः उपयोग', text: 'निवासी सेकंड-हैंड सामान, giveaway वस्तुएँ, कारें और अन्य मोबिलिटी लिस्टिंग पोस्ट और खोज सकते हैं ताकि उपयोगी चीज़ें अधिक समय तक चलन में रहें।' },
        { icon: 'briefcase', title: 'सामुदायिक अवसर', text: 'नौकरियाँ, मदद के अनुरोध, इवेंट और स्थानीय सूचनाएँ पड़ोस के अवसर साझा करने का व्यावहारिक स्थान देती हैं।' },
        { icon: 'home', title: 'आवास और क्षेत्र खोज', text: 'रियल एस्टेट पोस्ट लोगों को किसी क्षेत्र की दैनिक सेवाओं और सामुदायिक गतिविधियों के साथ स्थानीय आवास विकल्प समझने में मदद करती हैं।' },
        { icon: 'map', title: 'नगरपालिका-उन्मुख लेयर', text: 'शहर और क्षेत्र सेटिंग्स कचरा कैलेंडर, निपटान नियम, रिसाइक्लिंग पॉइंट, समस्या रिपोर्ट और स्थानीय कचरा मार्गदर्शन को समर्थन देती हैं।' },
        { icon: 'scan', title: 'AI-सहायता प्राप्त पहचान', text: 'वस्तु की फोटो संभावित निपटान श्रेणी पहचानने में मदद कर सकती है, लेकिन अंतिम निर्णय नगरपालिका नियमों से जाँचना चाहिए।' },
        { icon: 'language', title: 'दैनिक द्विभाषी पहुँच', text: 'अंग्रेज़ी और जापानी समर्थन उपयोगकर्ताओं को लिस्टिंग, स्थानीय नियम, रिमाइंडर और कचरे से जुड़े शब्द समझने में मदद करता है।' },
      ],
      platformBoundaries: [
        'MIDORIGO भुगतान संसाधित नहीं करता, धन नहीं रखता, एस्क्रो नहीं देता, और ट्रेड की गारंटी नहीं करता।',
        'लिस्टिंग, संदेश, नौकरियाँ, रियल एस्टेट पोस्ट, इवेंट, मदद के अनुरोध और कार पोस्ट उपयोगकर्ता-जनित हैं जब तक अलग से न कहा जाए।',
        'कानूनी पोस्ट, सुरक्षित संचार, व्यक्तिगत मुलाकातें, टैक्स, लाइसेंस, परमिट और ट्रेड शर्तें उपयोगकर्ता की जिम्मेदारी हैं।',
        'अंतिम कचरा निपटान निर्णयों के लिए नगरपालिका वेबसाइटें, मुद्रित गाइड, आधिकारिक नोटिस और स्थानीय कार्यालय ही सत्य का स्रोत हैं।',
        'यदि सुरक्षा, धोखाधड़ी, दुरुपयोग, अवैधता या नियम उल्लंघन का संदेह हो, तो MIDORIGO सामग्री हटा सकता है, खाते सीमित कर सकता है या रिपोर्ट की समीक्षा कर सकता है।',
      ],
      residentsParagraphs: [
        'MIDORIGO उन दीर्घकालिक निवासियों, नए आने वालों, अंतरराष्ट्रीय निवासियों, छात्रों, परिवारों, स्थानीय कामगारों और सामुदायिक लोगों के लिए बनाया गया है जो एक ही जगह पर उपयोगी पड़ोस जानकारी चाहते हैं।',
        'नगरपालिका लेयर स्थानीय निपटान नियमों, AI-सहायता प्राप्त वस्तु पहचान, पिकअप कैलेंडर, रिसाइक्लिंग सुविधाओं और रिपोर्टिंग में मदद करती है। अलग से न कहा जाए तो यह किसी आधिकारिक साझेदारी का दावा नहीं करता। अंतिम कचरा और रीसाइक्लिंग नियमों के लिए आधिकारिक नगरपालिका स्रोतों की जाँच करनी चाहिए।',
      ],
      residentsChecks: [
        'पुनः उपयोग योग्य वस्तुएँ, नौकरियाँ, घर, कारें, इवेंट और मदद के अनुरोध पोस्ट करें',
        'MIDORIGO द्वारा भुगतान संभाले बिना सीधे समन्वय करें',
        'शहर या क्षेत्र सेटिंग सहेजें',
        'द्विभाषी नगरपालिका निपटान मार्गदर्शन देखें',
        'अस्पष्ट लिस्टिंग या पुरानी कचरा जानकारी रिपोर्ट करें',
      ],
      appAreas: [
        { label: 'मार्केटप्लेस', title: 'सेकंड-हैंड सामान और स्थानीय पोस्ट' },
        { label: 'नगरपालिका लेयर', title: 'कचरा कैलेंडर और AI आइटम जाँच' },
        { label: 'समुदाय', title: 'नौकरियाँ, इवेंट, मदद, रियल एस्टेट और कारें' },
      ],
      faq: [
        { question: 'क्या MIDORIGO एक आधिकारिक सरकारी ऐप है?', answer: 'नहीं। जब तक किसी विशेष साझेदारी की घोषणा न हो, MIDORIGO एक स्वतंत्र सर्कुलर इकोनॉमी प्लेटफ़ॉर्म है। अंतिम कचरा और रीसाइक्लिंग निर्णयों के लिए नगरपालिका नियम ही मान्य हैं।' },
        { question: 'क्या MIDORIGO भुगतान संभालता है?', answer: 'नहीं। MIDORIGO खोज, पोस्टिंग और संचार के लिए एक प्लेटफ़ॉर्म है। लेनदेन और भुगतान की व्यवस्था उपयोगकर्ताओं की जिम्मेदारी है।' },
        { question: 'लोग क्या पोस्ट कर सकते हैं?', answer: 'स्थानीय सेकंड-हैंड सामान, नौकरियाँ, रियल एस्टेट, इवेंट, मदद के अनुरोध, और कार या मोबिलिटी लिस्टिंग ऐप नियमों और स्थानीय कानून के अधीन पोस्ट की जा सकती हैं।' },
        { question: 'क्या MIDORIGO हर लिस्टिंग की पुष्टि करता है?', answer: 'नहीं। लिस्टिंग और संदेश उपयोगकर्ता-जनित हैं। MIDORIGO रिपोर्टिंग और मॉडरेशन टूल दे सकता है, लेकिन उपयोगकर्ताओं को स्वयं भी सावधानी से जाँच करनी चाहिए।' },
        { question: 'क्या ऐप हर वस्तु को फेंकने का सही तरीका बता सकता है?', answer: 'MIDORIGO निपटान मार्गदर्शन व्यवस्थित करता है, लेकिन नियम नगरपालिका के अनुसार बदलते हैं और बदल भी सकते हैं। संदेह होने पर स्थानीय प्राधिकरण से पुष्टि करनी चाहिए।' },
        { question: 'क्या ऐप जापानी और अंग्रेज़ी दोनों में काम करेगा?', answer: 'हाँ। ऐप इस तरह बनाया गया है कि द्विभाषी उपयोग से स्थानीय कचरा शब्द और दैनिक जानकारी समझना आसान हो।' },
        { question: 'ऐप कब उपलब्ध होगा?', answer: 'MIDORIGO App Store और Google Play पर रिलीज़ की तैयारी कर रहा है। अंतिम स्टोर URL स्वीकृति के बाद जोड़े जाएँगे।' },
      ],
      storeBadges: { appStore: 'App Store पर जल्द', playStore: 'Google Play पर जल्द' },
    },
    privacy: {
      eyebrow: 'गोपनीयता नीति',
      title: 'MIDORIGO डेटा कैसे संभालता है',
      intro: 'यह नीति बताती है कि MIDORIGO स्थानीय सर्कुलर इकोनॉमी लिस्टिंग, सामुदायिक संचार और नगरपालिका-उन्मुख कचरा सहायता देने के लिए कौन-सी जानकारी एकत्र कर सकता है।',
      sections: [
        { title: 'हम कौन-सी जानकारी एकत्र कर सकते हैं', paragraphs: [
          'जब आप अकाउंट बनाते या प्रबंधित करते हैं, MIDORIGO अकाउंट ईमेल और प्रोफ़ाइल जानकारी एकत्र कर सकता है।',
          'यदि आप स्थानीय खोज, सुविधा खोज, पिकअप कैलेंडर या निपटान मार्गदर्शन सुविधाओं का उपयोग करते हैं, तो चुने गए शहर, वार्ड, क्षेत्र, लोकेशन सेटअप डेटा और अनुमानित लोकेशन संकेत एकत्र किए जा सकते हैं।',
          'यदि आप AI आइटम पहचान, सेकंड-हैंड लिस्टिंग, नौकरियाँ, रियल एस्टेट, इवेंट, मदद के अनुरोध, कारें, रिपोर्ट या समान सुविधाओं का उपयोग करते हैं, तो आपके द्वारा अपलोड की गई छवियाँ और संबंधित टेक्स्ट एकत्र किए जा सकते हैं।',
          'कम्युनिटी लिस्टिंग, चैट, रिपोर्ट और मॉडरेशन कंटेंट संबंधित सुविधाएँ उपलब्ध होने पर एकत्र किया जा सकता है। MIDORIGO भुगतान प्रोसेस नहीं करता, लेकिन उपयोगकर्ता लिस्टिंग या संदेशों में लेनदेन विवरण शामिल कर सकते हैं।',
          'कैमरा, फोटो लाइब्रेरी, नोटिफिकेशन और लोकेशन परमिशन केवल तभी मांगी जा सकती है जब आइटम स्कैनिंग, लिस्टिंग फोटो, पिकअप रिमाइंडर, स्थानीय खोज या सुविधा खोज जैसी सुविधाओं के लिए ज़रूरी हो।',
          'ऐप को चलाने, सुरक्षित रखने और बेहतर बनाने के लिए एनालिटिक्स, डायग्नोस्टिक्स, डिवाइस जानकारी, नोटिफिकेशन प्राथमिकताएँ और नोटिफिकेशन टोकन एकत्र किए जा सकते हैं।',
        ]},
        { title: 'जानकारी का उपयोग कैसे किया जाता है', paragraphs: [
          'हम जानकारी का उपयोग अकाउंट, स्थानीय सेटअप, सर्कुलर इकोनॉमी लिस्टिंग, सामुदायिक संचार, पिकअप रिमाइंडर, AI-सहायता प्राप्त आइटम मार्गदर्शन, रीसाइक्लिंग खोज, समस्या रिपोर्टिंग, ग्राहक सहायता, सुरक्षा मॉडरेशन, एनालिटिक्स, डायग्नोस्टिक्स, धोखाधड़ी रोकथाम और कानूनी अनुपालन के लिए करते हैं।',
          'लोकेशन संबंधी सेटअप ऐप कंटेंट को वैयक्तिकृत करने के लिए उपयोग किया जाता है। MIDORIGO आधिकारिक नगरपालिका नियमों का विकल्प नहीं है।',
          'स्कैनिंग के लिए भेजी गई छवियाँ और टेक्स्ट निपटान सुझाव देने, सुरक्षा और डायग्नोस्टिक्स सुधारने, रिपोर्ट की जांच करने और कानून तथा ऐप सेटिंग्स के अनुसार मॉडरेशन में मदद के लिए उपयोग किए जा सकते हैं।',
        ]},
        { title: 'थर्ड-पार्टी सेवाएँ', paragraphs: [
          'MIDORIGO प्रमाणीकरण, डेटाबेस और स्टोरेज के लिए Supabase का उपयोग कर सकता है। पुश नोटिफिकेशन के लिए Expo या नोटिफिकेशन सेवाएँ उपयोग हो सकती हैं। लोकेशन या सुविधा खोज सुविधाएँ उपलब्ध होने पर मैपिंग या लोकेशन प्रदाता उपयोग हो सकते हैं। MIDORIGO पैसे, मार्केटप्लेस भुगतान या फंड होल्ड नहीं करता, इसलिए यहाँ भुगतान प्रदाताओं की सूची नहीं है।',
          'ये प्रदाता अपनी शर्तों और गोपनीयता नीतियों के अनुसार जानकारी प्रोसेस करते हैं। MIDORIGO प्रदाताओं को जोड़ने, हटाने या बदलने पर यह सूची अपडेट की जा सकती है।',
        ]},
        { title: 'साझाकरण और प्रोसेसर', paragraphs: [
          'हम जानकारी उन सेवा प्रदाताओं के साथ साझा कर सकते हैं जो MIDORIGO चलाने में मदद करते हैं, जैसे होस्टिंग, प्रमाणीकरण, स्टोरेज, नोटिफिकेशन, एनालिटिक्स, डायग्नोस्टिक्स, मैप्स, ग्राहक सहायता, सुरक्षा और मॉडरेशन टूल्स। ये प्रदाता केवल हमारे लिए दी जा रही सेवाओं के दायरे में जानकारी प्रोसेस करेंगे।',
          'कानूनी आवश्यकता होने पर, उपयोगकर्ताओं और सेवा की रक्षा के लिए, दुरुपयोग या धोखाधड़ी की जांच के लिए, वैध कानूनी अनुरोधों का जवाब देने के लिए, या कानून द्वारा अनुमत बिज़नेस ट्रांसफर के हिस्से के रूप में हम जानकारी का खुलासा कर सकते हैं।',
        ]},
        { title: 'सुरक्षा', paragraphs: [
          'MIDORIGO अनधिकृत पहुँच, हानि, दुरुपयोग, बदलाव या खुलासे से उपयोगकर्ता जानकारी की सुरक्षा के लिए उचित प्रशासनिक, तकनीकी और संगठनात्मक उपाय अपनाता है। फिर भी कोई भी ऑनलाइन सेवा पूर्ण सुरक्षा की गारंटी नहीं दे सकती, इसलिए उपयोगकर्ताओं को अपने अकाउंट क्रेडेंशियल सुरक्षित रखने चाहिए और लिस्टिंग या संदेशों में जानकारी साझा करते समय सावधानी बरतनी चाहिए।',
        ]},
        { title: 'उपयोगकर्ता-जनित सामग्री और दृश्यता', paragraphs: [
          'लिस्टिंग, इवेंट, नौकरियाँ, रियल एस्टेट पोस्ट, मदद के अनुरोध, कार पोस्ट, प्रोफ़ाइल विवरण और संबंधित संदेश उपयोग की गई सुविधा और उपलब्ध सेटिंग्स के आधार पर अन्य उपयोगकर्ताओं को दिखाई दे सकते हैं।',
          'रिपोर्ट और मॉडरेशन रिकॉर्ड उपयोगकर्ताओं की सुरक्षा, नियम लागू करने, दुरुपयोग रोकने, कानूनी अनुरोधों का जवाब देने और सेवा की अखंडता बनाए रखने के लिए देखे जा सकते हैं।',
        ]},
        { title: 'रिटेंशन, डिलीशन और संपर्क', paragraphs: [
          'हम जानकारी उतनी ही देर तक रखते हैं जितनी इस नीति में बताए गए उद्देश्यों के लिए आवश्यक हो, जब तक कि कानूनी, सुरक्षा, विवाद, मॉडरेशन या संचालन कारणों से अधिक समय की आवश्यकता न हो।',
          'आप अपने अकाउंट डेटा तक पहुँच, सुधार या डिलीट करने का अनुरोध कर सकते हैं। अकाउंट डिलीट निर्देश /delete-account पर उपलब्ध हैं। कुछ रिकॉर्ड कानूनी, सुरक्षा, धोखाधड़ी रोकथाम, दुरुपयोग रोकथाम, विवाद प्रबंधन, बैकअप या संचालन कारणों से रखे जा सकते हैं।',
          'पहुंच, सुधार, डिलीशन या गोपनीयता सहायता के लिए japankaiten@gmail.com पर संपर्क करें।',
        ]},
        { title: 'बच्चे', paragraphs: [
          'MIDORIGO 13 वर्ष से कम आयु के बच्चों के लिए नहीं है। जो उपयोगकर्ता अपने स्थान के अनुसार वयस्क आयु से कम हैं, उन्हें विशेष रूप से लिस्टिंग, संदेश, ट्रेड, नौकरियाँ, रियल एस्टेट, इवेंट, मदद के अनुरोध और कार-संबंधित पोस्ट के लिए ऐप केवल माता-पिता या कानूनी अभिभावक की अनुमति और निगरानी में उपयोग करना चाहिए।',
        ]},
      ],
    },
    terms: {
      eyebrow: 'सेवा की शर्तें',
      title: 'MIDORIGO उपयोग के नियम',
      intro: 'ये शर्तें MIDORIGO को स्थानीय सर्कुलर इकोनॉमी प्लेटफ़ॉर्म और नगरपालिका-उन्मुख कचरा सहायता सेवा के रूप में उपयोग करने की मूल जिम्मेदारियाँ बताती हैं।',
      sections: [
        { title: 'पात्रता और अकाउंट', paragraphs: [
          'आपको अपने स्थान पर MIDORIGO का कानूनी रूप से उपयोग करने में सक्षम होना चाहिए। MIDORIGO 13 वर्ष से कम आयु के बच्चों के लिए नहीं है। यदि आप अपने निवास स्थान पर वयस्कता की आयु से कम हैं, तो मार्केटप्लेस, मैसेजिंग, नौकरी, रियल एस्टेट, इवेंट, मदद के अनुरोध और कार-संबंधित सुविधाओं का उपयोग केवल माता-पिता या कानूनी अभिभावक की अनुमति और निगरानी में करें। अकाउंट जानकारी की शुद्धता और साइन-इन तरीके की सुरक्षा आपकी जिम्मेदारी है।',
        ]},
        { title: 'स्वीकार्य उपयोग', paragraphs: [
          'ऐप का दुरुपयोग न करें, सेवा संचालन में बाधा न डालें, हानिकारक सामग्री अपलोड न करें, किसी और का रूप धारण न करें, कानून का उल्लंघन न करें, उपयोगकर्ताओं को परेशान न करें, या झूठी रिपोर्ट जमा न करें। MIDORIGO ऐसे अकाउंट, लिस्टिंग, संदेश या रिपोर्ट को निलंबित या हटाने का अधिकार रखता है जो अपमानजनक, असुरक्षित, अवैध या इन शर्तों से असंगत लगें।',
        ]},
        { title: 'प्रतिबंधित सामग्री और व्यवहार', paragraphs: [
          'अवैध वस्तुएँ या सेवाएँ, हथियार, नियंत्रित पदार्थ, चोरी का सामान, रिकॉल किए गए उत्पाद, धोखाधड़ी वाले प्रस्ताव, स्कैम, यौन या शोषणकारी सामग्री, मानव तस्करी, घृणास्पद या भेदभावपूर्ण सामग्री, धमकी, उत्पीड़न, बुलीइंग, डॉक्सिंग, मालवेयर, स्पैम, या किसी अन्य के अधिकारों का उल्लंघन करने वाली सामग्री पोस्ट या प्रमोट न करें। MIDORIGO असुरक्षित या आपत्तिजनक सामग्री को कम करने के लिए फ़िल्टरिंग, समीक्षा, रिपोर्टिंग, ब्लॉकिंग और मॉडरेशन टूल्स का उपयोग कर सकता है।',
        ]},
        { title: 'उपयोगकर्ता-जनित सामग्री', paragraphs: [
          'उपयोगकर्ता अपनी लिस्टिंग, संदेश, छवियों, रिपोर्ट और अन्य सामग्री के लिए जिम्मेदार हैं। सामग्री इतनी सटीक होनी चाहिए कि वह दूसरों को गुमराह न करे, और उसे अधिकारों का उल्लंघन, बिना अनुमति निजी जानकारी का खुलासा, या असुरक्षित, धोखाधड़ीपूर्ण, भेदभावपूर्ण, अवैध या अपमानजनक गतिविधि को बढ़ावा नहीं देना चाहिए।',
        ]},
        { title: 'कम्युनिटी मार्केटप्लेस नियम', paragraphs: [
          'वस्तुओं, नौकरियों, रियल एस्टेट, इवेंट, मदद के अनुरोध, कारों और अन्य समर्थित श्रेणियों की लिस्टिंग ईमानदारी से वर्णित होनी चाहिए। उपयोगकर्ता सुरक्षित संचार, कानूनी पोस्टिंग, हैंडऑफ व्यवस्था, और प्रतिबंधित, खतरनाक, रिकॉल, अवैध, भ्रामक या सीमित वस्तुओं और सेवाओं से बचने के लिए जिम्मेदार हैं।',
          'नौकरी, रियल एस्टेट, वाहन, इवेंट और मदद-संबंधी पोस्ट को लागू कानून, लाइसेंस, परमिट, रोजगार नियम, आवास नियम, उपभोक्ता संरक्षण नियम और प्लेटफ़ॉर्म पोस्टिंग आवश्यकताओं का पालन करना होगा।',
        ]},
        { title: 'कचरा मार्गदर्शन और नगरपालिका नियम', paragraphs: [
          'MIDORIGO निपटान जानकारी व्यवस्थित करने में मदद करता है, लेकिन यह गारंटी नहीं देता कि मार्गदर्शन हर इमारत या क्षेत्र के लिए पूरा, अद्यतन या लागू है। अंतिम निपटान निर्णय स्थानीय नगरपालिका नियमों, आधिकारिक नोटिस या स्थानीय संपर्क बिंदुओं से सत्यापित किए जाने चाहिए।',
          'जब तक MIDORIGO और संबंधित प्राधिकरण अलग से न कहें, किसी आधिकारिक नगरपालिका समर्थन का संकेत नहीं है।',
        ]},
        { title: 'AI-सहायता प्राप्त परिणाम', paragraphs: [
          'AI-सहायता प्राप्त आइटम पहचान अपूर्ण या गलत हो सकती है। उपयोगकर्ताओं को स्कैन परिणाम को केवल शुरुआती बिंदु के रूप में लेना चाहिए, आइटम की स्थिति और स्थानीय नियमों की समीक्षा करनी चाहिए, और संदिग्ध मामलों में आधिकारिक नगरपालिका स्रोतों से पुष्टि करनी चाहिए।',
        ]},
        { title: 'भुगतान हैंडलिंग नहीं', paragraphs: [
          'MIDORIGO पोस्टिंग, खोज, संचार और स्थानीय समन्वय के लिए एक प्लेटफ़ॉर्म है। MIDORIGO मार्केटप्लेस भुगतान प्रोसेस नहीं करता, फंड नहीं रखता, एस्क्रो नहीं देता, लेनदेन की गारंटी नहीं करता, और ब्रोकर के रूप में कार्य नहीं करता। उपयोगकर्ता ऐप के बाहर किए गए ट्रेड नियम, टैक्स, कानूनी आवश्यकताएँ, सुरक्षा जाँच और भुगतान व्यवस्थाओं के लिए जिम्मेदार हैं।',
        ]},
        { title: 'रिपोर्ट और मॉडरेशन', paragraphs: [
          'MIDORIGO सुरक्षा, दुरुपयोग रोकथाम, सेवा अखंडता, कानूनी अनुपालन या विवाद समीक्षा के लिए रिपोर्ट की समीक्षा कर सकता है, सामग्री हटा सकता है, दृश्यता सीमित कर सकता है, अकाउंट सीमित कर सकता है या रिकॉर्ड संरक्षित रख सकता है। आवश्यकता पड़ने पर बिना पूर्व सूचना कार्रवाई की जा सकती है।',
          'जहाँ ये सुविधाएँ उपलब्ध हों, उपयोगकर्ता ऐप के भीतर आपत्तिजनक लिस्टिंग, संदेश और उपयोगकर्ताओं की रिपोर्ट कर सकें। MIDORIGO सुरक्षा रिपोर्टों की समीक्षा कर उचित कार्रवाई समय पर करने का प्रयास करता है।',
        ]},
        { title: 'दायित्व की सीमा', paragraphs: [
          'कानून द्वारा अनुमत अधिकतम सीमा तक, MIDORIGO अधूरी स्थानीय निपटान जानकारी पर निर्भरता, उपयोगकर्ता-जनित मार्केटप्लेस सामग्री, उपयोगकर्ता-व्यवस्थित ट्रेड, सेवा बाधा, या थर्ड-पार्टी सेवाओं से उत्पन्न अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान के लिए उत्तरदायी नहीं है।',
        ]},
        { title: 'संपर्क', paragraphs: ['इन शर्तों के बारे में प्रश्न japankaiten@gmail.com पर भेजे जा सकते हैं।'] },
      ],
    },
    contact: {
      eyebrow: 'संपर्क',
      title: 'MIDORIGO से संपर्क करें',
      intro: 'सपोर्ट को ईमेल तैयार करने के लिए इस फ़ॉर्म का उपयोग करें। इस स्थिर वेबसाइट पर कोई बैकएंड जुड़ा नहीं है।',
      emailLabel: 'आपका ईमेल',
      categoryLabel: 'श्रेणी',
      messageLabel: 'संदेश',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'क्या हुआ, यदि लागू हो तो आपका शहर या क्षेत्र, और यदि अलग हो तो अकाउंट ईमेल लिखें।',
      submit: 'ईमेल खोलें',
      supportTitle: 'सपोर्ट ईमेल',
      supportBody: 'ऐप सहायता, गोपनीयता अनुरोध, नगरपालिका सामग्री सुधार और पार्टनर पूछताछ के लिए japankaiten@gmail.com पर ईमेल करें।',
      supportNote: 'भविष्य में प्रोडक्शन संपर्क फ़ॉर्म बैकएंड जोड़ा जा सकता है। अभी यह फ़ॉर्म उपयोगकर्ता की ईमेल ऐप खोलता है।',
      categories: ['ऐप सहायता', 'लिस्टिंग/रिपोर्ट', 'डेटा/गोपनीयता अनुरोध', 'नगरपालिका/सामग्री सुधार', 'बिज़नेस/पार्टनर पूछताछ'],
    },
    support: {
      eyebrow: 'सहायता',
      title: 'MIDORIGO उपयोग सहायता',
      intro: 'मार्केटप्लेस लिस्टिंग, भाषा सेटिंग, लोकेशन सेटअप, कैमरा एक्सेस, नोटिफिकेशन, अकाउंट सहायता और गलत जानकारी की रिपोर्टिंग पर तेज़ जवाब देखें।',
      sectionTitle: 'समस्या निवारण',
      outro: 'और सहायता चाहिए? japankaiten@gmail.com पर संपर्क करें और अपना डिवाइस, उपलब्ध हो तो ऐप संस्करण, चुना गया शहर या क्षेत्र और समस्या का छोटा विवरण शामिल करें।',
      faq: [
        { question: 'भाषा कैसे बदलें?', answer: 'ऐप सेटिंग्स खोलें, Language चुनें और अंग्रेज़ी या जापानी चुनें। कुछ नगरपालिका स्रोत सामग्री मूल प्रकाशित भाषा में रह सकती है।' },
        { question: 'अपनी लोकेशन कैसे सेट करूँ?', answer: 'लोकेशन सेटअप स्क्रीन में अपना शहर, वार्ड, टाउन या क्षेत्र चुनें। मार्केटप्लेस खोज, स्थानीय पोस्ट, पिकअप शेड्यूल और निपटान नियम इस सेटिंग पर निर्भर हो सकते हैं।' },
        { question: 'कैमरा क्यों काम नहीं कर रहा?', answer: 'डिवाइस सेटिंग्स जांचें और MIDORIGO के लिए कैमरा एक्सेस की अनुमति दें। स्कैनर को फोटो से आइटम पहचानने के लिए कैमरा अनुमति चाहिए।' },
        { question: 'मुझे नोटिफिकेशन क्यों नहीं मिल रहे?', answer: 'पक्का करें कि MIDORIGO सेटिंग्स और डिवाइस सेटिंग्स दोनों में नोटिफिकेशन सक्षम हों। पिकअप रिमाइंडर आपके चुने गए क्षेत्र पर भी निर्भर करते हैं।' },
        { question: 'मैं लॉग इन नहीं कर पा रहा हूँ।', answer: 'जांचें कि आप वही ईमेल या साइन-इन तरीका उपयोग कर रहे हैं जो अकाउंट बनाते समय इस्तेमाल किया था। समस्या जारी रहे तो संभव हो तो अकाउंट ईमेल से सपोर्ट से संपर्क करें।' },
        { question: 'गलत कचरा जानकारी की रिपोर्ट कैसे करूँ?', answer: 'ऐप में correction या report विकल्प उपयोग करें, या सपोर्ट को शहर या क्षेत्र, आइटम का नाम और वह स्रोत भेजें जिसे आप सही मानते हैं।' },
        { question: 'कम्युनिटी लिस्टिंग रिपोर्ट कैसे काम करती है?', answer: 'जब सेकंड-हैंड सामान, नौकरियाँ, रियल एस्टेट, इवेंट, मदद के अनुरोध, कारें या अन्य पोस्ट असुरक्षित, भ्रामक, अवैध या अपमानजनक लगें, तब report कार्रवाई का उपयोग करें। MIDORIGO नियम तोड़ने वाली सामग्री हटा सकता है या अकाउंट सीमित कर सकता है।' },
        { question: 'क्या मैं MIDORIGO में वस्तुओं या सेवाओं के लिए भुगतान कर सकता हूँ?', answer: 'नहीं। MIDORIGO पैसे प्रोसेस नहीं करता। उपयोगकर्ताओं को ऐप के बाहर अपनी व्यवस्था करनी होगी और स्थानीय कानून, सुरक्षा मार्गदर्शन और लिस्टिंग नियमों का पालन करना होगा।' },
      ],
    },
    deleteAccount: {
      eyebrow: 'अकाउंट और डेटा डिलीशन',
      title: 'अपने MIDORIGO अकाउंट को हटाने का अनुरोध करें',
      intro: 'आप ईमेल द्वारा अकाउंट डिलीशन का अनुरोध कर सकते हैं। यह पेज बताता है कि क्या शामिल करना है और कौन-सा डेटा हटाया, अनाम किया या आवश्यक होने पर रखा जा सकता है।',
      requestTitle: 'डिलीशन अनुरोध कैसे करें',
      requestSteps: [
        'अपने अकाउंट ईमेल से japankaiten@gmail.com पर ईमेल भेजें।',
        'Subject line का उपयोग करें: Account deletion request.',
        'यदि उपलब्ध हो तो अपना यूज़र आईडी शामिल करें।',
      ],
      sections: [
        { title: 'क्या हटाया या अनाम किया जाता है', paragraphs: ['अकाउंट प्रोफ़ाइल जानकारी, सहेजा गया लोकेशन सेटअप, नोटिफिकेशन प्राथमिकताएँ, अपलोड की गई छवियाँ, रिपोर्ट, सेकंड-हैंड लिस्टिंग, नौकरियाँ, रियल एस्टेट पोस्ट, इवेंट पोस्ट, मदद के अनुरोध, कार लिस्टिंग, संदेश और संबंधित उपयोगकर्ता सामग्री तकनीकी और कानूनी रूप से संभव होने पर हटाई या अनाम की जा सकती है।'] },
        { title: 'क्या रखा जा सकता है', paragraphs: ['कुछ रिकॉर्ड कानूनी, सुरक्षा, धोखाधड़ी रोकथाम, दुरुपयोग रोकथाम, विवाद प्रबंधन, बैकअप या संचालन कारणों से रखे जा सकते हैं। रखे गए रिकॉर्ड केवल उतने ही होंगे जितने उन उद्देश्यों के लिए आवश्यक हों। MIDORIGO मार्केटप्लेस भुगतान प्रोसेस नहीं करता।'] },
        { title: 'समय', paragraphs: ['MIDORIGO डिलीशन अनुरोधों की समीक्षा करेगा और प्रोसेस करने से पहले सत्यापन मांग सकता है। अनुरोध की समीक्षा होने पर अकाउंट ईमेल पर जवाब भेजा जाएगा।'] },
      ],
    },
  }),
  my: shallowTranslate(english, {
    locale: 'my',
    routes: { home: 'ပင်မ', privacy: 'ကိုယ်ရေးအချက်အလက်', terms: 'စည်းမျဉ်းများ', contact: 'ဆက်သွယ်ရန်', support: 'အကူအညီ', deleteAccount: 'အကောင့်ဖျက်ရန်' },
    common: {
      language: 'ဘာသာစကား',
      legalAndSupport: 'ဥပဒေနှင့် အကူအညီ',
      policyDetails: 'မူဝါဒ အသေးစိတ်',
      termsDetails: 'စည်းမျဉ်း အသေးစိတ်',
      footerAbout: 'ဂျပန်တွင်နေထိုင်သူများအတွက် စက်ဝိုင်းစီးပွားရေး listing များ၊ ဒေသတွင်း အရောင်းအဝယ်၊ အိမ်နီးချင်းအချက်အလက်များနှင့် မြို့နယ်အမှိုက်ဝန်ဆောင်မှု အထောက်အပံ့များကိုပေးသော ပလက်ဖောင်းဖြစ်သည်။',
      effectiveDate: '2026 ဧပြီ 18',
      address: 'လိုအပ်ပါက တရားဝင်တောင်းဆိုမှုအပေါ် မူတည်၍ ပေးပါမည်။',
    },
    home: {
      eyebrow: 'ဂျပန်နေထိုင်သူများအတွက် စက်ဝိုင်းစီးပွားရေး ပလက်ဖောင်း',
      title: 'ဒေသတွင်း စက်ဝိုင်းအသိုင်းအဝိုင်းများအတွက် ဝင်ရောက်သုံးစွဲမှုအလွှာ။',
      tagline: 'ဒေသတွင်း အရောင်းအဝယ်ပြုလုပ်ပြီး ပြန်လည်အသုံးပြုမှုကိုမြှင့်တင်ကာ မြို့နယ်အမှိုက်စည်းမျဉ်းများနှင့်ကိုက်ညီစေပါ။',
      intro: 'MIDORIGO သည် second-hand listing များ၊ အလုပ်အကိုင်၊ အိမ်ခြံမြေ၊ event များ၊ အကူအညီတောင်းဆိုမှုများ၊ ကားများနှင့် အသိုင်းအဝိုင်းအရောင်းအဝယ်များမှတစ်ဆင့် ဒေသခံများကို ချိတ်ဆက်ပေးသည်။ မြို့နယ်အလွှာသည် အမှိုက်နေ့စဉ်ဇယား၊ AI ပစ္စည်းခွဲခြားမှု၊ စွန့်ပစ်လမ်းညွှန်၊ ပြန်လည်အသုံးပြုစင်တာများနှင့် ဒေသဆိုင်ရာပြဿနာတင်ပြချက်များကို ထောက်ပံ့ပေးသည်။',
      ctaAvailability: 'အခမဲ့ အစောပိုင်းဝင်ရောက်ခွင့် စာရင်းသွင်းရန်',
      ctaSupport: 'အကူအညီကြည့်ရန်',
      previewLabel: 'MIDORIGO အက်ပ် နမူနာ',
      previewCardLabel: 'ဒေသတွင်း marketplace',
      previewCardTitle: 'ထမင်းစားစားပွဲ',
      previewCardNote: 'စွန့်ပစ်မီ ပြန်သုံးပါ',
      previewScanLabel: 'မြို့နယ်အလွှာ',
      previewScanTitle: 'ပလတ်စတစ်ပုလင်း',
      previewScanNote: 'မနက်ဖြန် ကောက်ယူမည်',
      previewPills: ['အနီးအနားအလုပ်များ', 'ဒီအပတ် event များ', 'AI စွန့်ပစ်စစ်ဆေးမှု'],
      sections: {
        features: 'MIDORIGO က ကူညီနိုင်သောအရာများ',
        marketplace: 'အသိုင်းအဝိုင်း marketplace အမျိုးအစားများ',
        platform: 'ပလက်ဖောင်း လုပ်ဆောင်ပုံ',
        boundaries: 'အရေးကြီးသော ပလက်ဖောင်းနယ်နိမိတ်များ',
        residents: 'ဂျပန်နေထိုင်သူများအတွက်',
        coreAreas: 'အက်ပ်၏ အဓိကကဏ္ဍများ',
        comingSoon: 'မကြာမီ',
        faq: 'မေးလေ့ရှိသော မေးခွန်းများ',
      },
      marketplaceLead: 'MIDORIGO သည် ငွေပေးချေမှုမလုပ်ဆောင်ပါ။ posting, discovery, communication နှင့် ဒေသတွင်း coordination အတွက်ပလက်ဖောင်းတစ်ခုဖြစ်သည်။ လုံခြုံရေး၊ ဥပဒေလိုက်နာမှုနှင့် အရောင်းအဝယ်စည်းကမ်းများကို အသုံးပြုသူများက ကိုယ်တိုင်တာဝန်ယူရမည်။',
      features: [
        { icon: 'market', title: 'အသုံးပြုပြီးဈေးကွက်', text: 'အသုံးပြုနိုင်သေးသောပစ္စည်းများကို ဒေသတွင်းအရောင်းအဝယ်၊ ပြန်သုံးခြင်း သို့မဟုတ် အခမဲ့ပေးခြင်းအတွက် တင်နိုင်သည်။ MIDORIGO သည် လူများကိုချိတ်ဆက်ပေးသော်လည်း ငွေပေးချေမှုမလုပ်ဆောင်ပါ။' },
        { icon: 'briefcase', title: 'ဒေသအလုပ်အကိုင်', text: 'အသိုင်းအဝိုင်းရှိ လူများနှင့် အဖွဲ့အစည်းများတင်ထားသော အနီးအနားအလုပ်နှင့် ဝန်ဆောင်မှုအခွင့်အလမ်းများကို ရှာဖွေနိုင်သည်။' },
        { icon: 'home', title: 'အိမ်ခြံမြေ', text: 'နေ့စဉ်အသိုင်းအဝိုင်းအချက်အလက်များနှင့်အတူ ဒေသတွင်းအိမ်ရာနှင့် ပိုင်ဆိုင်မှု post များကို ရှာဖွေနိုင်သည်။' },
        { icon: 'calendar', title: 'ပွဲများနှင့် အကူအညီ', text: 'ဒေသပွဲများကို မျှဝေပြီး အကူအညီတောင်းဆိုကာ အနီးအနားနေထိုင်သူများထံမှ အသုံးဝင်သောပံ့ပိုးမှုကို ရှာနိုင်သည်။' },
        { icon: 'car', title: 'ကားနှင့် မိုဘိုင်းတီအရောင်းအဝယ်', text: 'အက်ပ်စည်းမျဉ်းနှင့်ကိုက်ညီသည့် ဒေသတွင်းယာဉ်နှင့် မိုဘိုင်းတီဆိုင်ရာ listing များကို တင်နိုင် သို့မဟုတ် ကြည့်ရှုနိုင်သည်။' },
        { icon: 'scan', title: 'အမှိုက်ခွဲခြားစကင်နာ', text: 'AI ကူညီသော ပစ္စည်းခွဲခြားမှုဖြင့် မြို့နယ်အခြေပြု စွန့်ပစ်လမ်းညွှန်နှင့် နောက်တစ်ဆင့်ကို သိနိုင်သည်။' },
        { icon: 'calendar', title: 'သိမ်းယူရက်ပြက္ခဒိန်', text: 'မီးရှို့နိုင်၊ မမီးရှို့နိုင်၊ ပြန်လည်အသုံးပြုနိုင်၊ အရွယ်ကြီးအမှိုက် စုဆောင်းရက်များကို မြင်သာစွာ ကြည့်နိုင်သည်။' },
        { icon: 'map', title: 'ဒေသတွင်းစွန့်ပစ်စည်းမျဉ်း', text: 'သင်နေထိုင်ရာနှင့်ကိုက်ညီသော လမ်းညွှန်များရရန် မြို့ သို့မဟုတ် ဧရိယာဆက်တင်များကို သိမ်းထားနိုင်သည်။' },
        { icon: 'recycle', title: 'ပြန်လည်အသုံးပြုစင်တာများ', text: 'အထူးစီမံခန့်ခွဲမှုလိုအပ်သော ပစ္စည်းများအတွက် အနီးရှိ recycling, disposal နှင့် drop-off နေရာများကို ရှာနိုင်သည်။' },
        { icon: 'language', title: 'ဂျပန်နှင့် အင်္ဂလိပ်အထောက်အပံ့', text: 'listing များ၊ နေ့စဉ်လုပ်ငန်းများ၊ ဒေသစည်းမျဉ်းများ၊ သတိပေးချက်များနှင့် အမှိုက်ဆိုင်ရာအသုံးအနှုန်းများအတွက် ဘာသာပြောင်းလဲအသုံးပြုနိုင်သည်။' },
      ],
      marketplaceCategories: ['အသုံးပြုပြီးပစ္စည်း', 'အလုပ်အကိုင်', 'အိမ်ခြံမြေ', 'event များ', 'အကူအညီတောင်းဆိုမှု', 'ကားနှင့် သယ်ယူပို့ဆောင်ရေး'],
      appAspects: [
        { icon: 'market', title: 'ဒေသအရောင်းအဝယ်နှင့် ပြန်သုံးခြင်း', text: 'နေထိုင်သူများသည် အသုံးပြုပြီးပစ္စည်းများ၊ အခမဲ့ပေးပစ္စည်းများ၊ ကားများနှင့် အခြားမိုဘိုင်းတီ listing များကို တင်ပြီး ရှာဖွေနိုင်ကာ အသုံးဝင်သောအရာများကို ပိုကြာအောင် လည်ပတ်စေသည်။' },
        { icon: 'briefcase', title: 'အသိုင်းအဝိုင်းအခွင့်အလမ်းများ', text: 'အလုပ်အကိုင်၊ အကူအညီတောင်းဆိုမှု၊ ပွဲများနှင့် ဒေသသတင်းများက နီးစပ်ရာအခွင့်အလမ်းများကို ရှာဖွေမျှဝေရန် နေရာပေးသည်။' },
        { icon: 'home', title: 'အိမ်ရာနှင့် ဧရိယာရှာဖွေမှု', text: 'အိမ်ခြံမြေ post များက နေ့စဉ်ဝန်ဆောင်မှုများနှင့် အသိုင်းအဝိုင်းလှုပ်ရှားမှုများနှင့်အတူ ဒေသအိမ်ရာရွေးချယ်မှုများကို နားလည်စေသည်။' },
        { icon: 'map', title: 'မြို့နယ်အခြေပြုအလွှာ', text: 'မြို့နှင့် ဧရိယာဆက်တင်များသည် အမှိုက်ပြက္ခဒိန်၊ စွန့်ပစ်စည်းမျဉ်း၊ recycling point, issue report နှင့် ဒေသအမှိုက်လမ်းညွှန်ကို ပံ့ပိုးသည်။' },
        { icon: 'scan', title: 'AI ကူညီသော ခွဲခြားသတ်မှတ်မှု', text: 'ပစ္စည်းဓာတ်ပုံများသည် ဖြစ်နိုင်သော စွန့်ပစ်အမျိုးအစားကို ဖော်ထုတ်ပေးနိုင်သော်လည်း နောက်ဆုံးဆုံးဖြတ်ချက်ကို မြို့နယ်စည်းမျဉ်းနှင့် စစ်ဆေးသင့်သည်။' },
        { icon: 'language', title: 'နေ့စဉ် ဘာသာနှစ်မျိုးအသုံးပြုနိုင်မှု', text: 'အင်္ဂလိပ်နှင့် ဂျပန်အထောက်အပံ့က listing များ၊ ဒေသစည်းမျဉ်းများ၊ သတိပေးချက်များနှင့် အမှိုက်အသုံးအနှုန်းများကို ပိုမိုလွယ်ကူစေသည်။' },
      ],
      platformBoundaries: [
        'MIDORIGO သည် ငွေပေးချေမှုမလုပ်ဆောင်၊ ငွေမကိုင်၊ escrow မပေး၊ အရောင်းအဝယ်အာမခံမပေးပါ။',
        'ဖော်ပြထားခြင်းမရှိပါက listing များ၊ စာတိုများ၊ အလုပ်၊ အိမ်ခြံမြေ၊ ပွဲများ၊ အကူအညီတောင်းဆိုမှုများနှင့် ကား post များသည် အသုံးပြုသူဖန်တီးထားသောအကြောင်းအရာများဖြစ်သည်။',
        'တရားဝင် post တင်ခြင်း၊ လုံခြုံသောဆက်သွယ်မှု၊ လူချင်းတွေ့ဆုံမှု၊ အခွန်၊ လိုင်စင်၊ ခွင့်ပြုမိန့်နှင့် အရောင်းအဝယ်စည်းကမ်းများသည် အသုံးပြုသူတာဝန်ဖြစ်သည်။',
        'နောက်ဆုံးအမှိုက်စွန့်ပစ်ဆုံးဖြတ်ချက်များအတွက် မြို့နယ်ဝဘ်ဆိုဒ်များ၊ ပုံနှိပ်လမ်းညွှန်များ၊ တရားဝင်ကြေညာချက်များနှင့် ဒေသရုံးများသည် အမှန်တရားအရင်းအမြစ်ဖြစ်သည်။',
        'လုံခြုံရေး၊ လိမ်လည်မှု၊ အလွဲသုံးစားမှု၊ ဥပဒေချိုးဖောက်မှု သို့မဟုတ် စည်းမျဉ်းချိုးဖောက်မှုရှိသည်ဟု သံသယရှိလျှင် MIDORIGO သည် အကြောင်းအရာဖယ်ရှားခြင်း၊ အကောင့်ကန့်သတ်ခြင်း သို့မဟုတ် report များကို စစ်ဆေးနိုင်သည်။',
      ],
      residentsParagraphs: [
        'MIDORIGO ကို ရေရှည်နေထိုင်သူများ၊ အသစ်ပြောင်းရွှေ့လာသူများ၊ နိုင်ငံခြားနေထိုင်သူများ၊ ကျောင်းသားများ၊ မိသားစုများ၊ ဒေသလုပ်သားများနှင့် တစ်နေရာတည်းတွင် အသုံးဝင်သော အနီးအနားအချက်အလက်ကိုလိုချင်သူများအတွက် ဒီဇိုင်းလုပ်ထားသည်။',
        'မြို့နယ်အလွှာသည် ဒေသစွန့်ပစ်စည်းမျဉ်းများ၊ AI ကူညီသော ပစ္စည်းခွဲခြားမှု၊ သိမ်းယူရက်ပြက္ခဒိန်၊ recycling facility များနှင့် report များကို ကူညီပေးသည်။ သီးခြားဖော်ပြမထားလျှင် တရားဝင်ပူးပေါင်းမှုရှိသည်ဟု ဆိုလိုခြင်းမဟုတ်ပါ။ နောက်ဆုံးအမှိုက်နှင့် recycling စည်းမျဉ်းများကို မြို့နယ်၏ တရားဝင်အချက်အလက်မှ စစ်ဆေးရမည်။',
      ],
      residentsChecks: [
        'ပြန်သုံးနိုင်သောပစ္စည်းများ၊ အလုပ်များ၊ အိမ်ရာများ၊ ကားများ၊ ပွဲများနှင့် အကူအညီတောင်းဆိုမှုများကို post တင်ပါ',
        'MIDORIGO က ငွေပေးချေမှုမလုပ်ဆောင်ဘဲ တိုက်ရိုက်ညှိနှိုင်းပါ',
        'မြို့ သို့မဟုတ် ဧရိယာဆက်တင်များကို သိမ်းဆည်းပါ',
        'ဘာသာနှစ်မျိုးပါဝင်သော မြို့နယ်စွန့်ပစ်လမ်းညွှန်ကို ကြည့်ပါ',
        'မရှင်းလင်းသော listing သို့မဟုတ် ဟောင်းနွမ်းနေသော အမှိုက်အချက်အလက်ကို report လုပ်ပါ',
      ],
      appAreas: [
        { label: 'ဈေးကွက်', title: 'အသုံးပြုပြီးပစ္စည်းများနှင့် ဒေသ post များ' },
        { label: 'မြို့နယ်အလွှာ', title: 'အမှိုက်ပြက္ခဒိန်နှင့် AI ပစ္စည်းစစ်ဆေးမှု' },
        { label: 'အသိုင်းအဝိုင်း', title: 'အလုပ်များ၊ ပွဲများ၊ အကူအညီ၊ အိမ်ခြံမြေ နှင့် ကားများ' },
      ],
      faq: [
        { question: 'MIDORIGO သည် အစိုးရ၏ တရားဝင် app လား။', answer: 'မဟုတ်ပါ။ သီးခြားပူးပေါင်းမှုကို ကြေညာထားခြင်းမရှိပါက MIDORIGO သည် လွတ်လပ်သော စက်ဝိုင်းစီးပွားရေးပလက်ဖောင်းဖြစ်သည်။ နောက်ဆုံးအမှိုက်နှင့် recycling ဆိုင်ရာ ဆုံးဖြတ်ချက်များအတွက် မြို့နယ်စည်းမျဉ်းများသာ အခြေခံဖြစ်သည်။' },
        { question: 'MIDORIGO က ငွေပေးချေမှုကို လုပ်ဆောင်ပါသလား။', answer: 'မလုပ်ဆောင်ပါ။ MIDORIGO သည် ရှာဖွေခြင်း၊ posting နှင့် ဆက်သွယ်မှုအတွက်သာ ပလက်ဖောင်းဖြစ်သည်။ အရောင်းအဝယ်နှင့် ငွေပေးချေမှုများကို အသုံးပြုသူများက ကိုယ်တိုင်တာဝန်ယူရသည်။' },
        { question: 'အသုံးပြုသူများက ဘာတွေ post လုပ်နိုင်သလဲ။', answer: 'ဒေသတွင်း အသုံးပြုပြီးပစ္စည်းများ၊ အလုပ်အကိုင်များ၊ အိမ်ခြံမြေ၊ ပွဲများ၊ အကူအညီတောင်းဆိုမှုများနှင့် ကား သို့မဟုတ် မိုဘိုင်းတီ listing များကို app စည်းမျဉ်းများနှင့် ဒေသဥပဒေများအတွင်း post လုပ်နိုင်သည်။' },
        { question: 'MIDORIGO သည် listing တစ်ခုချင်းစီကို အတည်ပြုပါသလား။', answer: 'မဟုတ်ပါ။ listing များနှင့် message များသည် အသုံးပြုသူဖန်တီးထားသည်။ MIDORIGO သည် report နှင့် moderation tool များပေးနိုင်သော်လည်း အသုံးပြုသူများကလည်း ကိုယ်တိုင်သေချာစွာ စစ်ဆေးသင့်သည်။' },
        { question: 'အက်ပ်က ပစ္စည်းတိုင်းကို ဘယ်လိုစွန့်ပစ်ရမလဲဆိုတာ အတိအကျပြောပေးနိုင်သလား။', answer: 'MIDORIGO သည် စွန့်ပစ်လမ်းညွှန်များကို စနစ်တကျစုစည်းပေးသော်လည်း စည်းမျဉ်းများသည် မြို့နယ်အလိုက်ကွာခြားပြီး ပြောင်းလဲနိုင်သည်။ မသေချာသောအရာများကို ဒေသအာဏာပိုင်ထံ စစ်ဆေးသင့်သည်။' },
        { question: 'အက်ပ်ကို ဂျပန်နှင့် အင်္ဂလိပ် နှစ်ဘာသာလုံးဖြင့် အသုံးပြုနိုင်ပါသလား။', answer: 'အသုံးပြုနိုင်ပါသည်။ ဘာသာနှစ်မျိုးအသုံးပြုခြင်းက ဒေသအချက်အလက်နှင့် အမှိုက်ဆိုင်ရာအသုံးအနှုန်းများကို ပိုမိုလွယ်ကူစွာ နားလည်စေသည်။' },
        { question: 'အက်ပ်ကို ဘယ်အချိန်မှာ ရနိုင်မလဲ။', answer: 'MIDORIGO သည် App Store နှင့် Google Play ထုတ်ဝေရန် ပြင်ဆင်နေသည်။ နောက်ဆုံး store URL များကို approval ရပြီးနောက် ထည့်သွင်းမည်။' },
      ],
      storeBadges: { appStore: 'App Store တွင် မကြာမီ', playStore: 'Google Play တွင် မကြာမီ' },
    },
    privacy: {
      eyebrow: 'ကိုယ်ရေးအချက်အလက် မူဝါဒ',
      title: 'MIDORIGO မှ ဒေတာကို ဘယ်လိုကိုင်တွယ်သလဲ',
      intro: 'ဤမူဝါဒတွင် MIDORIGO သည် ဒေသအခြေပြု စက်ဝိုင်းစီးပွားရေး listing များ၊ အသိုင်းအဝိုင်းဆက်သွယ်မှုများနှင့် မြို့နယ်အခြေပြု အမှိုက်အထောက်အပံ့များပေးရန် အတွက် စုဆောင်းနိုင်သည့် အချက်အလက်များကို ဖော်ပြထားသည်။',
      sections: [
        { title: 'စုဆောင်းနိုင်သော အချက်အလက်များ', paragraphs: [
          'အကောင့်ဖန်တီးခြင်း သို့မဟုတ် စီမံခြင်း ပြုလုပ်သည့်အခါ MIDORIGO သည် အကောင့်အီးမေးလ်နှင့် profile အချက်အလက်များကို စုဆောင်းနိုင်သည်။',
          'ဒေသရှာဖွေမှု၊ facility ရှာဖွေမှု၊ သိမ်းယူရက်ပြက္ခဒိန် သို့မဟုတ် စွန့်ပစ်လမ်းညွှန်ကို အသုံးပြုသည့်အခါ ရွေးချယ်ထားသော မြို့၊ ward၊ area၊ location setup data နှင့် ခန့်မှန်းတည်နေရာ signal များကို စုဆောင်းနိုင်သည်။',
          'AI ပစ္စည်းခွဲခြားမှု၊ second-hand listing များ၊ အလုပ်များ၊ အိမ်ခြံမြေ၊ ပွဲများ၊ အကူအညီတောင်းဆိုမှုများ၊ ကားများ၊ report များ သို့မဟုတ် အလားတူ feature များကို အသုံးပြုပါက သင်တင်ပို့သော ဓာတ်ပုံများနှင့် ဆက်စပ်စာသားများကို စုဆောင်းနိုင်သည်။',
          'Community listing, chat, report နှင့် moderation content များသည် သက်ဆိုင်ရာ feature ရှိပါက စုဆောင်းနိုင်သည်။ MIDORIGO သည် ငွေပေးချေမှု မလုပ်ဆောင်သော်လည်း အသုံးပြုသူများသည် listing သို့မဟုတ် message ထဲတွင် trade အသေးစိတ်ထည့်နိုင်သည်။',
          'Camera, photo library, notification နှင့် location permission များကို item scanning, listing photo, pickup reminder, local discovery သို့မဟုတ် facility search လိုအပ်သောအခါသာ တောင်းဆိုနိုင်သည်။',
          'App ကို လည်ပတ်စေရန်၊ လုံခြုံရေးတိုးတက်စေရန်နှင့် ကောင်းမွန်စေရန် analytics, diagnostics, device information, notification preference နှင့် notification token များကို စုဆောင်းနိုင်သည်။',
        ]},
        { title: 'အချက်အလက် အသုံးပြုပုံ', paragraphs: [
          'အချက်အလက်များကို account ပေးရန်၊ local setup, circular economy listing, community communication, pickup reminder, AI item guidance, recycling search, issue report, customer support, safety moderation, analytics, diagnostics, fraud prevention နှင့် law compliance အတွက် အသုံးပြုသည်။',
          'Location ဆိုင်ရာ setup အချက်အလက်များကို app content ကို သင့်ဒေသနှင့်ကိုက်ညီအောင် ပြင်ဆင်ရန် အသုံးပြုသည်။ MIDORIGO သည် တရားဝင် မြို့နယ်စည်းမျဉ်းများကို အစားထိုးမပေးပါ။',
          'Scan အတွက် တင်ပို့သော ဓာတ်ပုံနှင့် စာသားများကို စွန့်ပစ်အကြံပြုချက်ပေးရန်၊ security နှင့် diagnostics တိုးတက်စေရန်၊ report များ စုံစမ်းရန်နှင့် ဥပဒေ၊ app setting ခွင့်ပြုသည့်အတိုင်း moderation ကို အထောက်အကူပြုရန် အသုံးပြုနိုင်သည်။',
        ]},
        { title: 'Third-party service များ', paragraphs: [
          'MIDORIGO သည် authentication, database နှင့် storage အတွက် Supabase ကို အသုံးပြုနိုင်သည်။ Push notification အတွက် Expo သို့မဟုတ် notification service များကို အသုံးပြုနိုင်သည်။ Location သို့မဟုတ် facility search feature များရှိပါက map သို့မဟုတ် location provider များကို အသုံးပြုနိုင်သည်။ MIDORIGO သည် ငွေမကိုင်တွယ်သဖြင့် marketplace payment သို့မဟုတ် fund holding မလုပ်ပါ၊ ထို့ကြောင့် payment provider ကို ဤနေရာတွင် မဖော်ပြပါ။',
          'ဤ provider များသည် ၎င်းတို့၏ စည်းမျဉ်းနှင့် privacy policy များအတိုင်း အချက်အလက်ကို ကိုင်တွယ်သည်။ MIDORIGO သည် provider များကို ပေါင်းထည့်၊ ဖယ်ရှား သို့မဟုတ် ပြောင်းလဲပါက စာရင်းကို update လုပ်နိုင်သည်။',
        ]},
        { title: 'မျှဝေခြင်းနှင့် processor များ', paragraphs: [
          'MIDORIGO ကို လည်ပတ်ရာတွင် ကူညီသော hosting, authentication, storage, notification, analytics, diagnostics, map, customer support, security နှင့် moderation tool provider များနှင့် အချက်အလက်များကို မျှဝေနိုင်သည်။ ဤ provider များသည် ကျွန်ုပ်တို့အတွက် ပေးနေသော service အတွက်သာ အချက်အလက်ကို ကိုင်တွယ်ရန် မျှော်လင့်ပါသည်။',
          'ဥပဒေအရ လိုအပ်ပါက၊ အသုံးပြုသူများနှင့် service ကို ကာကွယ်ရန်၊ abuse သို့မဟုတ် fraud ကို စုံစမ်းရန်၊ တရားဝင်ဥပဒေရေးရာ တောင်းဆိုမှုများကို ဖြေကြားရန်၊ သို့မဟုတ် ဥပဒေအရ ခွင့်ပြုထားသော business transfer ၏ အစိတ်အပိုင်းအဖြစ် အချက်အလက်ကို ဖွင့်ဆိုနိုင်သည်။',
        ]},
        { title: 'လုံခြုံရေး', paragraphs: [
          'MIDORIGO သည် အသုံးပြုသူအချက်အလက်များကို မတရားဝင်ဝင်ရောက်မှု၊ ပျောက်ဆုံးမှု၊ အလွဲသုံးစားမှု၊ ပြောင်းလဲမှု သို့မဟုတ် ပေါက်ကြားမှုမှ ကာကွယ်ရန် သင့်တော်သော စီမံခန့်ခွဲမှု၊ နည်းပညာနှင့် အဖွဲ့အစည်းဆိုင်ရာ အဆင့်များကို အသုံးပြုသည်။ သို့သော် အွန်လိုင်းဝန်ဆောင်မှုတစ်ခုမှလည်း လုံးဝလုံခြုံမှုကို အာမခံမပေးနိုင်သောကြောင့် အသုံးပြုသူများသည် မိမိတို့၏ account credential များကို ကာကွယ်ကာ listing သို့မဟုတ် message များတွင် အချက်အလက်မျှဝေရာတွင် သတိပြုရမည်။',
        ]},
        { title: 'အသုံးပြုသူဖန်တီးအကြောင်းအရာနှင့် မြင်တွေ့နိုင်မှု', paragraphs: [
          'Listing များ၊ event များ၊ အလုပ်များ၊ အိမ်ခြံမြေ post များ၊ အကူအညီတောင်းဆိုမှုများ၊ ကား post များ၊ profile အသေးစိတ်နှင့် ဆက်စပ် message များသည် အသုံးပြုသည့် feature နှင့် app setting များအပေါ် မူတည်၍ အခြားအသုံးပြုသူများမြင်နိုင်သည်။',
          'Report နှင့် moderation record များကို အသုံးပြုသူများကို ကာကွယ်ရန်၊ စည်းမျဉ်းများကို အကောင်အထည်ဖော်ရန်၊ abuse ကို ကာကွယ်ရန်၊ ဥပဒေရေးရာ တောင်းဆိုမှုများကို ဖြေရှင်းရန်နှင့် service integrity ကို ထိန်းသိမ်းရန် ပြန်လည်သုံးသပ်နိုင်သည်။',
        ]},
        { title: 'သိုလှောင်ကာလ၊ ဖျက်ခြင်းနှင့် ဆက်သွယ်ရန်', paragraphs: [
          'ဤမူဝါဒတွင် ဖော်ပြထားသော ရည်ရွယ်ချက်များအတွက် လိုအပ်သလောက်သာ အချက်အလက်ကို သိမ်းဆည်းမည်ဖြစ်သည်၊ သို့သော် ဥပဒေ၊ လုံခြုံရေး၊ အငြင်းပွားမှု၊ moderation သို့မဟုတ် operation ဆိုင်ရာ အကြောင်းပြချက်များကြောင့် ပိုကြာသိုလှောင်ရန် လိုအပ်နိုင်သည်။',
          'သင်သည် account information အပေါ် access, correction သို့မဟုတ် deletion ကို တောင်းဆိုနိုင်သည်။ Account deletion instruction များကို /delete-account တွင် ကြည့်နိုင်သည်။ ဥပဒေ၊ လုံခြုံရေး၊ fraud prevention, abuse prevention, dispute handling, backup သို့မဟုတ် operation အတွက် လိုအပ်သော record များကို ထိန်းသိမ်းနိုင်သည်။',
          'Access, correction, deletion သို့မဟုတ် privacy support အတွက် japankaiten@gmail.com သို့ ဆက်သွယ်ပါ။',
        ]},
        { title: 'ကလေးများ', paragraphs: [
          'MIDORIGO သည် အသက် 13 နှစ်အောက် ကလေးများအတွက် မရည်ရွယ်ပါ။ မိမိနေရာဒေသအရ အရွယ်ရောက်ခြင်းမရောက်သေးသော အသုံးပြုသူများသည် listing, message, trade, အလုပ်, အိမ်ခြံမြေ, event, အကူအညီတောင်းဆိုမှု နှင့် ကားဆိုင်ရာ post များကို အထူးသဖြင့် မိဘ သို့မဟုတ် တရားဝင်အုပ်ထိန်းသူ၏ ခွင့်ပြုချက်နှင့် ကြီးကြပ်မှုအောက်တွင်သာ အသုံးပြုသင့်သည်။',
        ]},
      ],
    },
    terms: {
      eyebrow: 'ဝန်ဆောင်မှု စည်းမျဉ်းများ',
      title: 'MIDORIGO အသုံးပြုမှု စည်းကမ်းများ',
      intro: 'ဤစည်းမျဉ်းများတွင် MIDORIGO ကို ဒေသအခြေပြု စက်ဝိုင်းစီးပွားရေးပလက်ဖောင်းနှင့် မြို့နယ်အခြေပြု အမှိုက်အထောက်အပံ့ဝန်ဆောင်မှုအဖြစ် အသုံးပြုရာတွင် လိုအပ်သော အခြေခံတာဝန်များကို ဖော်ပြထားသည်။',
      sections: [
        { title: 'အသုံးပြုခွင့်နှင့် အကောင့်', paragraphs: [
          'သင်သည် မိမိနေရာတွင် MIDORIGO ကို တရားဝင်အသုံးပြုနိုင်ရမည်။ MIDORIGO သည် အသက် 13 နှစ်အောက် ကလေးများအတွက် မရည်ရွယ်ပါ။ သင်သည် မိမိနေရာဒေသအရ အရွယ်ရောက်ခြင်းမပြည့်သေးပါက marketplace, message, အလုပ်, အိမ်ခြံမြေ, event, အကူအညီတောင်းဆိုမှုနှင့် ကားဆိုင်ရာ feature များကို မိဘ သို့မဟုတ် တရားဝင်အုပ်ထိန်းသူ၏ ခွင့်ပြုချက်နှင့် ကြီးကြပ်မှုအောက်တွင်သာ အသုံးပြုသင့်သည်။ အကောင့်အချက်အလက်၏ မှန်ကန်မှုနှင့် sign-in နည်းလမ်း လုံခြုံရေးသည် သင့်တာဝန်ဖြစ်သည်။',
        ]},
        { title: 'လက်ခံနိုင်သော အသုံးပြုမှု', paragraphs: [
          'App ကို အလွဲသုံးစားမလုပ်ပါနှင့်၊ service လည်ပတ်မှုကို မနှောင့်ယှက်ပါနှင့်၊ အန္တရာယ်ရှိသောအကြောင်းအရာ မတင်ပါနှင့်၊ အခြားသူအဖြစ် မဟန်တူမလုပ်ပါနှင့်၊ ဥပဒေမချိုးဖောက်ပါနှင့်၊ အသုံးပြုသူများကို မအနှောင့်အယှက်ပေးပါနှင့်၊ မမှန်ကန်သော report မတင်ပါနှင့်။ MIDORIGO သည် ဤစည်းမျဉ်းများနှင့်မကိုက်ညီသော အကောင့်၊ listing, message သို့မဟုတ် report များကို ရပ်ဆိုင်း သို့မဟုတ် ဖယ်ရှားနိုင်သည်။',
        ]},
        { title: 'တားမြစ်ထားသော အကြောင်းအရာနှင့် အပြုအမူ', paragraphs: [
          'တရားမဝင် ကုန်ပစ္စည်း သို့မဟုတ် ဝန်ဆောင်မှုများ၊ လက်နက်များ၊ ထိန်းချုပ်ပစ္စည်းများ၊ ခိုးယူထားသောပစ္စည်းများ၊ recall product များ၊ လိမ်လည်သောအဆိုပြုချက်များ၊ scam များ၊ လိင်ပိုင်းဆိုင်ရာ သို့မဟုတ် အမြတ်ထုတ်မှုပါဝင်သော အကြောင်းအရာများ၊ လူကုန်ကူးမှု၊ မုန်းတီးမှု သို့မဟုတ် ခွဲခြားဆက်ဆံမှု အကြောင်းအရာများ၊ ခြိမ်းခြောက်မှု၊ အနှောင့်အယှက်၊ bully လုပ်မှု၊ doxxing, malware, spam သို့မဟုတ် အခြားသူ၏ အခွင့်အရေးချိုးဖောက်သော အကြောင်းအရာများကို post သို့မဟုတ် promote မလုပ်ပါနှင့်။ MIDORIGO သည် မလုံခြုံသော သို့မဟုတ် မသင့်လျော်သော အကြောင်းအရာများကို လျှော့ချရန် filtering, review, report, blocking နှင့် moderation tool များကို အသုံးပြုနိုင်သည်။',
        ]},
        { title: 'အသုံးပြုသူဖန်တီးအကြောင်းအရာ', paragraphs: [
          'အသုံးပြုသူများသည် မိမိတို့တင်ပို့သည့် listing, message, image, report နှင့် အခြားအကြောင်းအရာများအတွက် တာဝန်ယူရမည်။ အကြောင်းအရာများသည် အခြားသူများကို မလွဲမှားစေရန် လုံလောက်စွာ မှန်ကန်ရမည်ဖြစ်ပြီး အခွင့်အရေးချိုးဖောက်မှု၊ ခွင့်ပြုချက်မရှိဘဲ ကိုယ်ရေးအချက်အလက်ဖော်ပြမှု သို့မဟုတ် မလုံခြုံ၊ လိမ်လည်၊ ခွဲခြားဆက်ဆံ၊ တရားမဝင် သို့မဟုတ် အလွဲသုံးစားလုပ်သော လုပ်ရပ်များကို မအားပေးရပါ။',
        ]},
        { title: 'Community marketplace စည်းမျဉ်းများ', paragraphs: [
          'ကုန်ပစ္စည်းများ၊ အလုပ်များ၊ အိမ်ခြံမြေ၊ ပွဲများ၊ အကူအညီတောင်းဆိုမှုများ၊ ကားများနှင့် အခြား support category များ၏ listing များကို ရိုးသားစွာ ဖော်ပြရမည်။ အသုံးပြုသူများသည် လုံခြုံသောဆက်သွယ်မှု၊ တရားဝင် post, လွှဲပြောင်းအစီအစဉ်များနှင့် တားမြစ်ထားသော၊ အန္တရာယ်ရှိသော၊ recall, တရားမဝင်၊ လှည့်စားနိုင်သော သို့မဟုတ် ကန့်သတ်ထားသော ပစ္စည်းနှင့်ဝန်ဆောင်မှုများကို ရှောင်ရှားရန် တာဝန်ရှိသည်။',
          'အလုပ်၊ အိမ်ခြံမြေ၊ ယာဉ်၊ event နှင့် အကူအညီ post များသည် သက်ဆိုင်ရာ ဥပဒေများ၊ လိုင်စင်များ၊ ခွင့်ပြုမိန့်များ၊ အလုပ်ခန့်အပ်မှုစည်းမျဉ်းများ၊ အိမ်ရာစည်းမျဉ်းများ၊ စားသုံးသူကာကွယ်ရေးစည်းမျဉ်းများနှင့် platform listing လိုအပ်ချက်များကို လိုက်နာရမည်။',
        ]},
        { title: 'အမှိုက်လမ်းညွှန်နှင့် မြို့နယ်စည်းမျဉ်းများ', paragraphs: [
          'MIDORIGO သည် စွန့်ပစ်အချက်အလက်များကို စီစဉ်ရာတွင် ကူညီသော်လည်း လမ်းညွှန်များသည် အမြဲတမ်း ပြည့်စုံ၊ နောက်ဆုံးပေါ် သို့မဟုတ် အိမ်အဆောက်အအုံတိုင်းနှင့် ဧရိယာတိုင်းအတွက် အသုံးချနိုင်သည်ဟု အာမခံမပေးပါ။ နောက်ဆုံးဆုံးဖြတ်ချက်များကို မြို့နယ်စည်းမျဉ်းများ၊ တရားဝင်ကြေညာချက်များ သို့မဟုတ် ဒေသဆိုင်ရာဆက်သွယ်ရန်နေရာများဖြင့် စစ်ဆေးရမည်။',
          'MIDORIGO နှင့် သက်ဆိုင်ရာအာဏာပိုင်တို့က သီးခြားမဖော်ပြပါက တရားဝင်မြို့နယ်ထောက်ခံမှု မဟုတ်ပါ။',
        ]},
        { title: 'AI ကူညီသော ရလဒ်များ', paragraphs: [
          'AI ကူညီသော ပစ္စည်းခွဲခြားမှုသည် မပြည့်စုံနိုင်သလို မှားယွင်းနိုင်သည်။ အသုံးပြုသူများသည် scan result ကို အစပြုအချက်အဖြစ်သာ ယူဆကာ ပစ္စည်းအခြေအနေနှင့် ဒေသစည်းမျဉ်းများကို ပြန်လည်စစ်ဆေးပြီး မသေချာပါက တရားဝင်မြို့နယ်အရင်းအမြစ်များဖြင့် အတည်ပြုရမည်။',
        ]},
        { title: 'ငွေပေးချေမှု မကိုင်တွယ်ခြင်း', paragraphs: [
          'MIDORIGO သည် posting, discovery, communication နှင့် local coordination အတွက် platform တစ်ခုဖြစ်သည်။ MIDORIGO သည် marketplace payment မလုပ်ဆောင်၊ fund မကိုင်၊ escrow မပေး၊ transaction ကို မအာမခံ၊ broker အဖြစ် မလုပ်ဆောင်ပါ။ အသုံးပြုသူများသည် app အပြင်ဘက်တွင် ပြုလုပ်သော trade term, tax, ဥပဒေလိုအပ်ချက်, safety check နှင့် payment arrangement များအတွက် တာဝန်ယူရမည်။',
        ]},
        { title: 'Report နှင့် moderation', paragraphs: [
          'MIDORIGO သည် safety, abuse prevention, service integrity, law compliance သို့မဟုတ် dispute review အတွက် report များကို စစ်ဆေးနိုင်ပြီး content ဖယ်ရှားခြင်း၊ visibility ကန့်သတ်ခြင်း၊ account ကန့်သတ်ခြင်း သို့မဟုတ် record များ သိမ်းဆည်းခြင်းတို့ကို ပြုလုပ်နိုင်သည်။ လိုအပ်ပါက ကြိုတင်အကြောင်းကြားခြင်းမရှိဘဲ action ယူနိုင်သည်။',
          'Feature ရရှိပါက အသုံးပြုသူများသည် app အတွင်း objectionable listing, message နှင့် အသုံးပြုသူများကို report လုပ်နိုင်ရမည်။ MIDORIGO သည် safety report များကို အချိန်မီ စစ်ဆေးပြီး သင့်လျော်သော action ယူရန် ကြိုးစားသည်။',
        ]},
        { title: 'တာဝန်ကန့်သတ်ချက်', paragraphs: [
          'ဥပဒေအရ ခွင့်ပြုသလောက် အများဆုံးအတိုင်း MIDORIGO သည် မပြည့်စုံသော ဒေသစွန့်ပစ်အချက်အလက်အပေါ် အားထားမှု၊ အသုံးပြုသူဖန်တီးထားသော marketplace content, အသုံးပြုသူအချင်းချင်း trade, service interruption သို့မဟုတ် third-party service များကြောင့် ဖြစ်ပေါ်လာသော indirect, incidental, special, consequential သို့မဟုတ် punitive damages များအတွက် တာဝန်မရှိပါ။',
        ]},
        { title: 'ဆက်သွယ်ရန်', paragraphs: ['ဤစည်းမျဉ်းများနှင့်ပတ်သက်သော မေးခွန်းများကို japankaiten@gmail.com သို့ ပို့နိုင်သည်။'] },
      ],
    },
    contact: {
      eyebrow: 'ဆက်သွယ်ရန်',
      title: 'MIDORIGO သို့ ဆက်သွယ်ရန်',
      intro: 'Support သို့ ပို့မည့် email ကို ပြင်ဆင်ရန် ဤ form ကို အသုံးပြုပါ။ ဤ static website တွင် backend မချိတ်ဆက်ထားပါ။',
      emailLabel: 'သင့်အီးမေးလ်',
      categoryLabel: 'အမျိုးအစား',
      messageLabel: 'မက်ဆေ့ချ်',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'ဘာဖြစ်သွားသည်၊ သက်ဆိုင်ပါက သင့်မြို့ သို့မဟုတ် area, နှင့် ကွဲပြားပါက account email ကို ဖော်ပြပါ။',
      submit: 'အီးမေးလ်ဖွင့်ရန်',
      supportTitle: 'Support email',
      supportBody: 'App support, privacy request, municipality content correction နှင့် partner inquiry များအတွက် japankaiten@gmail.com သို့ အီးမေးလ်ပို့ပါ။',
      supportNote: 'နောက်ပိုင်းတွင် production contact form backend ထည့်နိုင်သည်။ လက်ရှိတွင် ဤ form သည် အသုံးပြုသူ၏ email app ကိုဖွင့်ပေးသည်။',
      categories: ['App support', 'Listing/report', 'Data/privacy request', 'Municipality/content correction', 'Business/partner inquiry'],
    },
    support: {
      eyebrow: 'အကူအညီ',
      title: 'MIDORIGO အသုံးပြုမှု အကူအညီ',
      intro: 'Marketplace listing, language setting, location setup, camera access, notification, account help နှင့် မမှန်ကန်သော အချက်အလက် report လုပ်ခြင်းအတွက် အမြန်အဖြေများကို ရှာဖွေပါ။',
      sectionTitle: 'ပြဿနာဖြေရှင်းခြင်း',
      outro: 'ပိုမိုအကူအညီလိုအပ်ပါက japankaiten@gmail.com သို့ ဆက်သွယ်ပြီး သင့် device, app version ရှိပါက ၎င်း၊ ရွေးထားသော မြို့ သို့မဟုတ် area နှင့် ပြဿနာအကျဉ်းချုပ်ကို ထည့်ပါ။',
      faq: [
        { question: 'ဘာသာစကားကို ဘယ်လိုပြောင်းမလဲ။', answer: 'App setting ကိုဖွင့်ပြီး Language ကိုရွေးကာ အင်္ဂလိပ် သို့မဟုတ် ဂျပန်ကို ရွေးပါ။ အချို့သော မြို့နယ်အရင်းအမြစ် content များသည် မူရင်းဘာသာဖြင့်ပင် ရှိနေနိုင်သည်။' },
        { question: 'တည်နေရာကို ဘယ်လိုသတ်မှတ်မလဲ။', answer: 'Location setup screen မှာ သင့်မြို့၊ ward၊ town သို့မဟုတ် area ကို ရွေးပါ။ Marketplace discovery, local post, pickup schedule နှင့် disposal rule များသည် ဤ setting အပေါ် မူတည်နိုင်သည်။' },
        { question: 'Camera ဘာကြောင့်မအလုပ်လုပ်သလဲ။', answer: 'Device setting ကိုစစ်ပြီး MIDORIGO အတွက် camera access ကို ခွင့်ပြုပါ။ Scanner သည် photo မှ ပစ္စည်းခွဲခြားရန် camera permission လိုအပ်သည်။' },
        { question: 'ဘာကြောင့် notification မရသလဲ။', answer: 'MIDORIGO setting နှင့် device setting နှစ်ခုလုံးတွင် notification ဖွင့်ထားကြောင်း စစ်ဆေးပါ။ Pickup reminder များသည် ရွေးထားသော area ပေါ်တွင်လည်း မူတည်သည်။' },
        { question: 'Login မဝင်နိုင်ပါ။', answer: 'Account ဖန်တီးစဉ် အသုံးပြုခဲ့သည့် email သို့မဟုတ် sign-in method တူညီကြောင်း စစ်ဆေးပါ။ ပြဿနာ ဆက်လက်ရှိနေပါက ဖြစ်နိုင်လျှင် account email မှ support ကို ဆက်သွယ်ပါ။' },
        { question: 'မမှန်သော အမှိုက်အချက်အလက်ကို ဘယ်လို report လုပ်မလဲ။', answer: 'App အတွင်း correction သို့မဟုတ် report option ကို အသုံးပြုပါ၊ သို့မဟုတ် support ကို မြို့ သို့မဟုတ် area, item အမည် နှင့် မှန်ကန်သည်ဟုထင်သော အရင်းအမြစ်ကို ပို့ပါ။' },
        { question: 'Community listing report ဘယ်လိုအလုပ်လုပ်သလဲ။', answer: 'Second-hand goods, jobs, real estate, events, help request, cars သို့မဟုတ် အခြား post များသည် မလုံခြုံ၊ လှည့်စားနိုင်၊ တရားမဝင် သို့မဟုတ် အလွဲသုံးစားလုပ်သောအခါ report action ကို အသုံးပြုပါ။ MIDORIGO သည် စည်းမျဉ်းချိုးဖောက်သော content များကို ဖယ်ရှားနိုင်ပြီး account ကို ကန့်သတ်နိုင်သည်။' },
        { question: 'MIDORIGO အတွင်း ပစ္စည်း သို့မဟုတ် ဝန်ဆောင်မှုအတွက် ငွေပေးချေနိုင်ပါသလား။', answer: 'မရပါ။ MIDORIGO သည် ငွေမလုပ်ဆောင်ပါ။ အသုံးပြုသူများသည် app အပြင်ဘက်တွင် မိမိတို့ အစီအစဉ်ကို ကိုယ်တိုင်လုပ်ဆောင်ရမည်ဖြစ်ပြီး ဒေသဥပဒေ၊ safety guidance နှင့် listing rule များကို လိုက်နာရမည်။' },
      ],
    },
    deleteAccount: {
      eyebrow: 'အကောင့်နှင့် ဒေတာ ဖျက်ခြင်း',
      title: 'သင့် MIDORIGO အကောင့် ဖျက်ရန် တောင်းဆိုပါ',
      intro: 'အီးမေးလ်ဖြင့် account deletion တောင်းဆိုနိုင်သည်။ ဤစာမျက်နှာတွင် ထည့်သွင်းရမည့် အချက်များနှင့် မည်သည့်ဒေတာများကို ဖျက်မည်၊ anonymous လုပ်မည် သို့မဟုတ် လိုအပ်ပါက သိမ်းဆည်းမည်ကို ဖော်ပြထားသည်။',
      requestTitle: 'ဖျက်ရန် တောင်းဆိုပုံ',
      requestSteps: [
        'သင့် account email မှ japankaiten@gmail.com သို့ အီးမေးလ်ပို့ပါ။',
        'Subject line ကို Account deletion request ဟုရေးပါ။',
        'ရရှိနိုင်ပါက သင့် user ID ကို ထည့်ပါ။',
      ],
      sections: [
        { title: 'ဖျက်မည် သို့မဟုတ် anonymous လုပ်မည့် အချက်အလက်များ', paragraphs: ['Account profile information, သိမ်းထားသော location setup, notification preference, upload လုပ်ထားသော image များ, report များ, second-hand listing, အလုပ်, အိမ်ခြံမြေ post, event post, help request, car listing, message များနှင့် ဆက်စပ်အသုံးပြုသူ content များကို နည်းပညာနှင့် ဥပဒေအရ ဖြစ်နိုင်သလောက် ဖျက်ခြင်း သို့မဟုတ် anonymous လုပ်နိုင်သည်။'] },
        { title: 'သိမ်းဆည်းနိုင်သော အချက်အလက်များ', paragraphs: ['ဥပဒေ၊ လုံခြုံရေး၊ fraud prevention, abuse prevention, dispute handling, backup သို့မဟုတ် operation အတွက် လိုအပ်ပါက record အချို့ကို သိမ်းဆည်းနိုင်သည်။ သိမ်းဆည်းသော record များသည် ထိုရည်ရွယ်ချက်များအတွက် လိုအပ်သလောက်သာ ဖြစ်မည်။ MIDORIGO သည် marketplace payment မလုပ်ဆောင်ပါ။'] },
        { title: 'လုပ်ဆောင်ချိန်', paragraphs: ['MIDORIGO သည် deletion request များကို စစ်ဆေးပြီး process မလုပ်မီ verification တောင်းဆိုနိုင်သည်။ Request ကို စစ်ဆေးပြီးသည်နှင့် account email သို့ အကြောင်းပြန်မည်။'] },
      ],
    },
  }),
  vi: shallowTranslate(english, {
    locale: 'vi',
    routes: { home: 'Trang chủ', privacy: 'Quyền riêng tư', terms: 'Điều khoản', contact: 'Liên hệ', support: 'Hỗ trợ', deleteAccount: 'Xóa tài khoản' },
    common: {
      language: 'Ngôn ngữ',
      legalAndSupport: 'Pháp lý và hỗ trợ',
      policyDetails: 'Chi tiết chính sách',
      termsDetails: 'Chi tiết điều khoản',
      footerAbout: 'Nền tảng dành cho cư dân tại Nhật Bản với tin đăng kinh tế tuần hoàn, giao dịch địa phương, thông tin khu vực và hỗ trợ rác thải theo chính quyền địa phương.',
      effectiveDate: '18 tháng 4, 2026',
      address: 'Cung cấp khi cần thiết theo yêu cầu hợp lệ.',
    },
    home: {
      eyebrow: 'Nền tảng kinh tế tuần hoàn cho cư dân tại Nhật Bản',
      title: 'Lớp truy cập địa phương cho cộng đồng tuần hoàn.',
      tagline: 'Giao dịch gần hơn, tái sử dụng nhiều hơn, và vẫn bám sát quy định rác thải của chính quyền địa phương.',
      intro: 'MIDORIGO kết nối cư dân địa phương thông qua tin đăng đồ cũ, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp, xe cộ và giao dịch cộng đồng. Lớp chính quyền địa phương hỗ trợ lịch thu gom rác, nhận diện vật phẩm bằng AI, hướng dẫn xử lý, cơ sở tái chế và báo cáo vấn đề địa phương.',
      ctaAvailability: 'Đăng ký dùng thử miễn phí',
      ctaSupport: 'Xem hỗ trợ',
      previewLabel: 'Xem trước ứng dụng MIDORIGO',
      previewCardLabel: 'Chợ địa phương',
      previewCardTitle: 'Bàn ăn',
      previewCardNote: 'Tái sử dụng trước khi bỏ đi',
      previewScanLabel: 'Lớp chính quyền địa phương',
      previewScanTitle: 'Chai nhựa',
      previewScanNote: 'Thu gom ngày mai',
      previewPills: ['Việc làm gần bạn', 'Sự kiện tuần này', 'Kiểm tra phân loại bằng AI'],
      sections: {
        features: 'MIDORIGO hỗ trợ gì',
        marketplace: 'Danh mục chợ cộng đồng',
        platform: 'Cách nền tảng hoạt động',
        boundaries: 'Các giới hạn quan trọng của nền tảng',
        residents: 'Dành cho cư dân tại Nhật Bản',
        coreAreas: 'Các khu vực chính của ứng dụng',
        comingSoon: 'Sắp ra mắt',
        faq: 'Câu hỏi thường gặp',
      },
      marketplaceLead: 'MIDORIGO không xử lý tiền hay cung cấp dịch vụ thanh toán. Ứng dụng là nền tảng để đăng tin, khám phá, liên lạc và phối hợp địa phương. Người dùng chịu trách nhiệm về an toàn, tuân thủ pháp luật và các điều khoản giao dịch của mình.',
      features: [
        { icon: 'market', title: 'Chợ đồ cũ', text: 'Đăng các món đồ còn dùng được để giao dịch địa phương, tái sử dụng hoặc tặng lại. MIDORIGO kết nối mọi người nhưng không xử lý thanh toán.' },
        { icon: 'briefcase', title: 'Việc làm địa phương', text: 'Tìm cơ hội việc làm và dịch vụ gần bạn do cá nhân và tổ chức trong cộng đồng đăng tải.' },
        { icon: 'home', title: 'Bất động sản', text: 'Tìm tin nhà ở và bất động sản địa phương cùng với thông tin cộng đồng hằng ngày.' },
        { icon: 'calendar', title: 'Sự kiện và trợ giúp', text: 'Chia sẻ sự kiện địa phương, yêu cầu trợ giúp và tìm hỗ trợ thực tế từ cư dân xung quanh.' },
        { icon: 'car', title: 'Giao dịch xe và di chuyển', text: 'Đăng hoặc xem các tin xe cộ và di chuyển địa phương trong phạm vi quy định của ứng dụng.' },
        { icon: 'scan', title: 'Trình quét phân loại rác', text: 'Dùng nhận diện vật phẩm có hỗ trợ AI để xem hướng dẫn xử lý theo chính quyền địa phương.' },
        { icon: 'calendar', title: 'Lịch thu gom', text: 'Xem rõ ngày thu gom rác cháy được, không cháy được, tái chế và rác cỡ lớn.' },
        { icon: 'map', title: 'Quy định xử lý địa phương', text: 'Lưu cài đặt thành phố hoặc khu vực để hướng dẫn phù hợp với nơi bạn sinh sống.' },
        { icon: 'recycle', title: 'Cơ sở tái chế', text: 'Tìm địa điểm tái chế, xử lý và tiếp nhận gần bạn khi vật phẩm cần xử lý đặc biệt.' },
        { icon: 'language', title: 'Hỗ trợ tiếng Nhật và tiếng Anh', text: 'Chuyển đổi ngôn ngữ cho tin đăng, công việc hằng ngày, quy định địa phương, nhắc nhở và thuật ngữ rác thải.' },
      ],
      marketplaceCategories: ['Đồ cũ', 'Việc làm', 'Bất động sản', 'Sự kiện', 'Yêu cầu trợ giúp', 'Xe cộ và di chuyển'],
      appAspects: [
        { icon: 'market', title: 'Giao dịch địa phương và tái sử dụng', text: 'Cư dân có thể đăng và tìm đồ cũ, đồ tặng, xe cộ và các tin di chuyển khác để giữ tài nguyên hữu ích lưu thông lâu hơn.' },
        { icon: 'briefcase', title: 'Cơ hội cộng đồng', text: 'Việc làm, yêu cầu trợ giúp, sự kiện và thông báo địa phương mang lại nơi thực tế để cư dân chia sẻ cơ hội quanh mình.' },
        { icon: 'home', title: 'Khám phá nhà ở và khu vực', text: 'Tin bất động sản giúp mọi người hiểu lựa chọn nhà ở địa phương cùng với dịch vụ hằng ngày và hoạt động cộng đồng.' },
        { icon: 'map', title: 'Lớp định hướng chính quyền địa phương', text: 'Cài đặt thành phố và khu vực hỗ trợ lịch rác, quy định xử lý, điểm tái chế, báo cáo sự cố và hướng dẫn rác địa phương.' },
        { icon: 'scan', title: 'Nhận diện có hỗ trợ AI', text: 'Ảnh vật phẩm có thể giúp nhận biết danh mục xử lý phù hợp, nhưng quyết định cuối cùng vẫn nên kiểm tra theo quy định địa phương.' },
        { icon: 'language', title: 'Tiếp cận song ngữ hằng ngày', text: 'Hỗ trợ tiếng Anh và tiếng Nhật giúp cư dân dễ theo dõi tin đăng, quy định địa phương, nhắc nhở và thuật ngữ rác thải.' },
      ],
      platformBoundaries: [
        'MIDORIGO không xử lý thanh toán, giữ tiền, cung cấp escrow hay đảm bảo giao dịch.',
        'Trừ khi nêu rõ khác đi, tin đăng, tin nhắn, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp và tin xe cộ đều do người dùng tạo.',
        'Người dùng chịu trách nhiệm về bài đăng hợp pháp, liên lạc an toàn, sắp xếp gặp mặt, thuế, giấy phép, giấy chứng nhận và điều khoản giao dịch.',
        'Trang web chính quyền địa phương, tài liệu in, thông báo chính thức và văn phòng địa phương vẫn là nguồn xác thực cuối cùng cho quyết định xử lý rác.',
        'MIDORIGO có thể xóa nội dung, hạn chế tài khoản hoặc xem xét báo cáo khi có nghi ngờ về an toàn, gian lận, lạm dụng, bất hợp pháp hoặc vi phạm quy định.',
      ],
      residentsParagraphs: [
        'MIDORIGO được thiết kế cho cư dân lâu năm, người mới chuyển đến, cư dân quốc tế, sinh viên, gia đình, người lao động địa phương và bất kỳ ai muốn có thông tin khu vực hữu ích ở cùng một nơi.',
        'Lớp chính quyền địa phương hỗ trợ quy định xử lý rác, nhận diện vật phẩm bằng AI, lịch thu gom, cơ sở tái chế và báo cáo. Trừ khi có nêu rõ riêng, ứng dụng không có nghĩa là được chính quyền địa phương chứng thực chính thức. Quy định cuối cùng về rác và tái chế vẫn cần kiểm tra qua nguồn chính thức của địa phương.',
      ],
      residentsChecks: [
        'Đăng đồ có thể tái sử dụng, việc làm, nhà ở, xe cộ, sự kiện và yêu cầu trợ giúp',
        'Phối hợp trực tiếp mà MIDORIGO không xử lý thanh toán',
        'Lưu cài đặt thành phố hoặc khu vực',
        'Xem hướng dẫn xử lý rác của địa phương bằng hai ngôn ngữ',
        'Báo cáo tin đăng không rõ ràng hoặc thông tin rác đã lỗi thời',
      ],
      appAreas: [
        { label: 'Chợ', title: 'Đồ cũ và bài đăng địa phương' },
        { label: 'Lớp chính quyền địa phương', title: 'Lịch rác và kiểm tra vật phẩm bằng AI' },
        { label: 'Cộng đồng', title: 'Việc làm, sự kiện, trợ giúp, bất động sản và xe cộ' },
      ],
      faq: [
        { question: 'MIDORIGO có phải là ứng dụng chính thức của chính phủ không?', answer: 'Không. Trừ khi một quan hệ đối tác cụ thể được công bố, MIDORIGO là một nền tảng kinh tế tuần hoàn độc lập. Quy định của chính quyền địa phương vẫn là nguồn cuối cùng cho quyết định xử lý rác và tái chế.' },
        { question: 'MIDORIGO có xử lý thanh toán không?', answer: 'Không. MIDORIGO là nền tảng để khám phá, đăng tin và liên lạc. Người dùng tự chịu trách nhiệm về sắp xếp giao dịch và thanh toán của mình.' },
        { question: 'Người dùng có thể đăng gì?', answer: 'MIDORIGO dành cho đồ cũ địa phương, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp và tin xe cộ hoặc di chuyển, tùy theo quy định ứng dụng và pháp luật địa phương.' },
        { question: 'MIDORIGO có xác minh mọi tin đăng không?', answer: 'Không. Tin đăng và tin nhắn là nội dung do người dùng tạo. MIDORIGO có thể cung cấp công cụ báo cáo và kiểm duyệt, nhưng người dùng vẫn nên tự đánh giá cẩn thận.' },
        { question: 'Ứng dụng có thể cho tôi biết chính xác cách bỏ mọi vật phẩm không?', answer: 'MIDORIGO giúp sắp xếp hướng dẫn xử lý, nhưng quy định khác nhau theo từng địa phương và có thể thay đổi. Với vật phẩm không chắc chắn, người dùng nên xác minh với chính quyền địa phương.' },
        { question: 'Ứng dụng có hoạt động bằng cả tiếng Nhật và tiếng Anh không?', answer: 'Có. Ứng dụng được thiết kế để hỗ trợ song ngữ, giúp cư dân hiểu các thuật ngữ rác và thông tin hằng ngày dễ hơn.' },
        { question: 'Khi nào ứng dụng sẽ có mặt?', answer: 'MIDORIGO đang chuẩn bị phát hành trên App Store và Google Play. Liên kết cửa hàng cuối cùng sẽ được thêm sau khi được phê duyệt.' },
      ],
      storeBadges: { appStore: 'Sắp có trên App Store', playStore: 'Sắp có trên Google Play' },
    },
    privacy: {
      eyebrow: 'Chính sách quyền riêng tư',
      title: 'MIDORIGO xử lý dữ liệu như thế nào',
      intro: 'Chính sách này giải thích thông tin mà MIDORIGO có thể thu thập để cung cấp tin đăng kinh tế tuần hoàn địa phương, liên lạc cộng đồng và hỗ trợ rác thải theo chính quyền địa phương.',
      sections: [
        { title: 'Thông tin chúng tôi có thể thu thập', paragraphs: [
          'MIDORIGO có thể thu thập email tài khoản và thông tin hồ sơ khi bạn tạo hoặc quản lý tài khoản.',
          'Chúng tôi có thể thu thập dữ liệu thành phố, quận, khu vực, thiết lập vị trí và tín hiệu vị trí gần đúng khi bạn sử dụng các tính năng khám phá địa phương, tìm cơ sở, lịch thu gom hoặc hướng dẫn xử lý.',
          'Nếu bạn sử dụng nhận diện vật phẩm bằng AI, tin đăng đồ cũ, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp, xe cộ, báo cáo hoặc các tính năng tương tự, chúng tôi có thể thu thập hình ảnh tải lên và văn bản liên quan mà bạn gửi.',
          'Nội dung tin đăng cộng đồng, trò chuyện, báo cáo và kiểm duyệt có thể được thu thập khi các tính năng đó khả dụng. MIDORIGO không xử lý thanh toán, nhưng người dùng có thể đưa chi tiết giao dịch vào tin đăng hoặc tin nhắn.',
          'Quyền truy cập camera, thư viện ảnh, thông báo và vị trí chỉ được yêu cầu khi cần cho các tính năng như quét vật phẩm, ảnh tin đăng, nhắc lịch thu gom, khám phá địa phương hoặc tìm cơ sở.',
          'Phân tích, chẩn đoán, thông tin thiết bị, tùy chọn thông báo và token thông báo có thể được thu thập để vận hành, bảo vệ và cải thiện ứng dụng.',
        ]},
        { title: 'Thông tin được sử dụng như thế nào', paragraphs: [
          'Chúng tôi sử dụng thông tin để cung cấp tài khoản, thiết lập địa phương, tin đăng kinh tế tuần hoàn, liên lạc cộng đồng, nhắc lịch thu gom, hướng dẫn vật phẩm có hỗ trợ AI, tìm kiếm tái chế, báo cáo sự cố, hỗ trợ khách hàng, kiểm duyệt an toàn, phân tích, chẩn đoán, ngăn chặn gian lận và tuân thủ pháp luật.',
          'Thiết lập liên quan đến vị trí được dùng để cá nhân hóa nội dung ứng dụng. MIDORIGO không thay thế các quy định chính thức của chính quyền địa phương.',
          'Hình ảnh và văn bản gửi để quét có thể được dùng để đưa ra gợi ý xử lý, cải thiện an toàn và chẩn đoán, điều tra báo cáo và hỗ trợ kiểm duyệt theo pháp luật và cài đặt ứng dụng.',
        ]},
        { title: 'Dịch vụ bên thứ ba', paragraphs: [
          'MIDORIGO có thể sử dụng Supabase cho xác thực, cơ sở dữ liệu và lưu trữ. Expo hoặc các dịch vụ thông báo có thể được dùng cho thông báo đẩy. Nhà cung cấp bản đồ hoặc vị trí có thể được dùng khi tính năng vị trí hoặc tìm cơ sở khả dụng. Vì MIDORIGO không xử lý tiền, thanh toán marketplace hoặc giữ tiền, nên không có nhà cung cấp thanh toán nào được liệt kê tại đây.',
          'Các nhà cung cấp này xử lý thông tin theo điều khoản và chính sách riêng của họ. Danh sách nhà cung cấp có thể được cập nhật khi MIDORIGO thêm, bỏ hoặc thay đổi nhà cung cấp dịch vụ.',
        ]},
        { title: 'Chia sẻ và bên xử lý', paragraphs: [
          'Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ giúp vận hành MIDORIGO, bao gồm lưu trữ, xác thực, lưu trữ dữ liệu, thông báo, phân tích, chẩn đoán, bản đồ, hỗ trợ khách hàng, bảo mật và công cụ kiểm duyệt. Các bên này chỉ được kỳ vọng xử lý thông tin trong phạm vi dịch vụ họ cung cấp cho chúng tôi.',
          'Chúng tôi cũng có thể tiết lộ thông tin khi pháp luật yêu cầu, để bảo vệ người dùng và dịch vụ, điều tra hành vi lạm dụng hoặc gian lận, phản hồi yêu cầu pháp lý hợp lệ, hoặc như một phần của việc chuyển giao kinh doanh được pháp luật cho phép.',
        ]},
        { title: 'Bảo mật', paragraphs: [
          'MIDORIGO sử dụng các biện pháp hành chính, kỹ thuật và tổ chức hợp lý nhằm bảo vệ thông tin người dùng trước truy cập trái phép, mất mát, lạm dụng, thay đổi hoặc tiết lộ. Không có dịch vụ trực tuyến nào có thể đảm bảo an toàn tuyệt đối, vì vậy người dùng cũng nên bảo vệ thông tin đăng nhập và cẩn trọng khi chia sẻ thông tin trong tin đăng hoặc tin nhắn.',
        ]},
        { title: 'Nội dung do người dùng tạo và khả năng hiển thị', paragraphs: [
          'Tin đăng, sự kiện, việc làm, bài đăng bất động sản, yêu cầu trợ giúp, tin xe cộ, thông tin hồ sơ và các tin nhắn liên quan có thể hiển thị cho người dùng khác tùy theo tính năng được sử dụng và cài đặt trong ứng dụng.',
          'Báo cáo và hồ sơ kiểm duyệt có thể được xem xét để bảo vệ người dùng, thực thi quy tắc, ngăn lạm dụng, phản hồi yêu cầu pháp lý và duy trì tính toàn vẹn của dịch vụ.',
        ]},
        { title: 'Lưu trữ, xóa và liên hệ', paragraphs: [
          'Chúng tôi chỉ giữ thông tin trong thời gian cần thiết cho các mục đích nêu trong chính sách này, trừ khi cần giữ lâu hơn vì lý do pháp lý, bảo mật, tranh chấp, kiểm duyệt hoặc vận hành.',
          'Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin tài khoản. Hướng dẫn xóa tài khoản có tại /delete-account. Một số hồ sơ có thể được giữ lại vì lý do pháp lý, bảo mật, ngăn gian lận, ngăn lạm dụng, xử lý tranh chấp, sao lưu hoặc vận hành.',
          'Để yêu cầu truy cập, chỉnh sửa, xóa hoặc hỗ trợ về quyền riêng tư, hãy liên hệ japankaiten@gmail.com.',
        ]},
        { title: 'Trẻ em', paragraphs: [
          'MIDORIGO không dành cho trẻ em dưới 13 tuổi. Người dùng chưa đủ tuổi trưởng thành theo nơi cư trú chỉ nên dùng ứng dụng với sự cho phép và giám sát của cha mẹ hoặc người giám hộ hợp pháp, đặc biệt với các tin đăng, tin nhắn, giao dịch, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp và bài đăng liên quan đến xe cộ.',
        ]},
      ],
    },
    terms: {
      eyebrow: 'Điều khoản dịch vụ',
      title: 'Quy tắc sử dụng MIDORIGO',
      intro: 'Các điều khoản này giải thích trách nhiệm cơ bản khi sử dụng MIDORIGO như một nền tảng kinh tế tuần hoàn địa phương với lớp hỗ trợ rác thải theo chính quyền địa phương.',
      sections: [
        { title: 'Điều kiện sử dụng và tài khoản', paragraphs: [
          'Bạn phải có khả năng sử dụng MIDORIGO một cách hợp pháp tại nơi bạn sống. MIDORIGO không dành cho trẻ em dưới 13 tuổi. Nếu bạn chưa đến tuổi trưởng thành theo nơi cư trú, bạn chỉ nên sử dụng các tính năng marketplace, nhắn tin, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp và xe cộ khi có sự cho phép và giám sát của cha mẹ hoặc người giám hộ hợp pháp. Bạn chịu trách nhiệm về tính chính xác của thông tin tài khoản và việc bảo mật phương thức đăng nhập.',
        ]},
        { title: 'Cách sử dụng được chấp nhận', paragraphs: [
          'Không được lạm dụng ứng dụng, cản trở hoạt động dịch vụ, tải lên nội dung gây hại, mạo danh người khác, vi phạm pháp luật, quấy rối người dùng hoặc gửi báo cáo sai sự thật. MIDORIGO có thể đình chỉ hoặc xóa tài khoản, tin đăng, tin nhắn hoặc báo cáo có dấu hiệu lạm dụng, không an toàn, bất hợp pháp hoặc không phù hợp với các điều khoản này.',
        ]},
        { title: 'Nội dung và hành vi bị cấm', paragraphs: [
          'Không được đăng hoặc quảng bá hàng hóa hay dịch vụ bất hợp pháp, vũ khí, chất bị kiểm soát, đồ bị đánh cắp, sản phẩm bị thu hồi, đề nghị gian dối, lừa đảo, nội dung tình dục hoặc bóc lột, buôn người, nội dung thù ghét hoặc phân biệt đối xử, đe dọa, quấy rối, bắt nạt, tiết lộ thông tin riêng tư, phần mềm độc hại, spam hoặc nội dung xâm phạm quyền của người khác. MIDORIGO có thể sử dụng công cụ lọc, xem xét, báo cáo, chặn và kiểm duyệt để giảm nội dung không an toàn hoặc phản cảm.',
        ]},
        { title: 'Nội dung do người dùng tạo', paragraphs: [
          'Người dùng chịu trách nhiệm về các tin đăng, tin nhắn, hình ảnh, báo cáo và nội dung khác mà họ gửi. Nội dung phải đủ chính xác để không gây hiểu lầm và không được xâm phạm quyền, tiết lộ thông tin riêng tư khi chưa được phép, hoặc cổ vũ hoạt động không an toàn, gian lận, phân biệt đối xử, bất hợp pháp hoặc lạm dụng.',
        ]},
        { title: 'Quy tắc marketplace cộng đồng', paragraphs: [
          'Tin đăng về hàng hóa, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp, xe cộ và các danh mục được hỗ trợ khác phải mô tả trung thực. Người dùng chịu trách nhiệm về việc liên lạc an toàn, đăng tin hợp pháp, sắp xếp bàn giao và tránh hàng hóa hay dịch vụ bị cấm, nguy hiểm, bị thu hồi, bất hợp pháp, gây hiểu lầm hoặc bị hạn chế.',
          'Tin đăng việc làm, bất động sản, phương tiện, sự kiện và trợ giúp phải tuân thủ luật áp dụng, giấy phép, giấy tờ cho phép, quy định lao động, quy định nhà ở, quy định bảo vệ người tiêu dùng và yêu cầu đăng tin của nền tảng.',
        ]},
        { title: 'Hướng dẫn rác thải và quy định địa phương', paragraphs: [
          'MIDORIGO giúp sắp xếp thông tin xử lý nhưng không đảm bảo hướng dẫn luôn đầy đủ, cập nhật hoặc áp dụng cho mọi tòa nhà hay khu vực. Người dùng phải xác minh quyết định xử lý cuối cùng với quy định địa phương, thông báo chính thức hoặc đầu mối liên hệ tại địa phương.',
          'Không có sự chứng thực chính thức nào của chính quyền địa phương được ngụ ý trừ khi MIDORIGO và cơ quan đó nêu rõ riêng.',
        ]},
        { title: 'Kết quả có hỗ trợ AI', paragraphs: [
          'Kết quả nhận diện vật phẩm bằng AI có thể không đầy đủ hoặc không chính xác. Người dùng nên coi kết quả quét là điểm khởi đầu, xem xét tình trạng vật phẩm và quy định địa phương, rồi xác minh với nguồn chính thức khi còn nghi ngờ.',
        ]},
        { title: 'Không xử lý thanh toán', paragraphs: [
          'MIDORIGO là nền tảng để đăng tin, khám phá, liên lạc và phối hợp địa phương. MIDORIGO không xử lý thanh toán marketplace, không giữ tiền, không cung cấp escrow, không đảm bảo giao dịch và không làm trung gian. Người dùng chịu trách nhiệm về điều khoản giao dịch, thuế, yêu cầu pháp lý, kiểm tra an toàn và sắp xếp thanh toán được thực hiện ngoài ứng dụng.',
        ]},
        { title: 'Báo cáo và kiểm duyệt', paragraphs: [
          'MIDORIGO có thể xem xét báo cáo, xóa nội dung, giới hạn hiển thị, hạn chế tài khoản hoặc lưu giữ hồ sơ khi cần cho an toàn, ngăn lạm dụng, bảo vệ tính toàn vẹn dịch vụ, tuân thủ pháp luật hoặc xem xét tranh chấp. Hành động kiểm duyệt có thể được thực hiện mà không cần thông báo trước khi cần thiết.',
          'Khi các tính năng đó khả dụng, người dùng phải có thể báo cáo tin đăng, tin nhắn và người dùng phản cảm từ trong ứng dụng. MIDORIGO cố gắng xem xét các báo cáo an toàn và có hành động phù hợp trong thời gian hợp lý.',
        ]},
        { title: 'Giới hạn trách nhiệm', paragraphs: [
          'Trong phạm vi tối đa pháp luật cho phép, MIDORIGO không chịu trách nhiệm đối với thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hệ quả hoặc mang tính trừng phạt phát sinh do dựa vào thông tin xử lý địa phương không đầy đủ, nội dung marketplace do người dùng tạo, giao dịch do người dùng tự sắp xếp, gián đoạn dịch vụ hoặc dịch vụ bên thứ ba.',
        ]},
        { title: 'Liên hệ', paragraphs: ['Câu hỏi về điều khoản này có thể gửi đến japankaiten@gmail.com.'] },
      ],
    },
    contact: {
      eyebrow: 'Liên hệ',
      title: 'Liên hệ với MIDORIGO',
      intro: 'Dùng biểu mẫu này để chuẩn bị email gửi bộ phận hỗ trợ. Không có backend nào được kết nối trên website tĩnh này.',
      emailLabel: 'Email của bạn',
      categoryLabel: 'Danh mục',
      messageLabel: 'Nội dung',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Hãy cho biết điều gì đã xảy ra, thành phố hoặc khu vực của bạn nếu liên quan, và email tài khoản nếu khác.',
      submit: 'Mở email',
      supportTitle: 'Email hỗ trợ',
      supportBody: 'Gửi email đến japankaiten@gmail.com cho hỗ trợ ứng dụng, yêu cầu quyền riêng tư, sửa nội dung địa phương và hỏi về đối tác.',
      supportNote: 'Backend biểu mẫu liên hệ chính thức có thể được thêm sau. Hiện tại biểu mẫu này sẽ mở ứng dụng email của người dùng.',
      categories: ['Hỗ trợ ứng dụng', 'Tin đăng/báo cáo', 'Yêu cầu dữ liệu/quyền riêng tư', 'Sửa nội dung/chính quyền địa phương', 'Hỏi về kinh doanh/đối tác'],
    },
    support: {
      eyebrow: 'Hỗ trợ',
      title: 'Trợ giúp sử dụng MIDORIGO',
      intro: 'Tìm câu trả lời nhanh về tin đăng marketplace, cài đặt ngôn ngữ, thiết lập vị trí, truy cập camera, thông báo, hỗ trợ tài khoản và báo cáo thông tin sai.',
      sectionTitle: 'Khắc phục sự cố',
      outro: 'Cần thêm trợ giúp? Hãy liên hệ japankaiten@gmail.com và gửi kèm thiết bị của bạn, phiên bản ứng dụng nếu có, thành phố hoặc khu vực đã chọn và mô tả ngắn về vấn đề.',
      faq: [
        { question: 'Làm sao để đổi ngôn ngữ?', answer: 'Mở cài đặt ứng dụng, chọn Language và chọn tiếng Anh hoặc tiếng Nhật. Một số nội dung từ nguồn địa phương có thể vẫn giữ nguyên ngôn ngữ gốc.' },
        { question: 'Làm sao để đặt vị trí của tôi?', answer: 'Dùng màn hình thiết lập vị trí để chọn thành phố, quận, thị trấn hoặc khu vực của bạn. Khám phá marketplace, tin đăng địa phương, lịch thu gom và quy định xử lý có thể phụ thuộc vào cài đặt này.' },
        { question: 'Tại sao camera không hoạt động?', answer: 'Hãy kiểm tra cài đặt thiết bị và cho phép MIDORIGO truy cập camera. Trình quét cần quyền camera để nhận diện vật phẩm từ ảnh.' },
        { question: 'Tại sao tôi không nhận được thông báo?', answer: 'Hãy xác nhận rằng thông báo được bật cả trong cài đặt MIDORIGO và cài đặt thiết bị. Nhắc lịch thu gom cũng phụ thuộc vào khu vực bạn đã chọn.' },
        { question: 'Tôi không thể đăng nhập.', answer: 'Hãy kiểm tra xem bạn có đang dùng cùng email hoặc phương thức đăng nhập đã dùng để tạo tài khoản không. Nếu vấn đề tiếp tục, hãy liên hệ hỗ trợ bằng email tài khoản nếu có thể.' },
        { question: 'Làm sao để báo thông tin rác sai?', answer: 'Dùng tùy chọn sửa hoặc báo cáo trong ứng dụng, hoặc liên hệ hỗ trợ và gửi tên thành phố hoặc khu vực, tên vật phẩm và nguồn mà bạn cho là đúng.' },
        { question: 'Báo cáo tin đăng cộng đồng hoạt động như thế nào?', answer: 'Dùng hành động báo cáo trên tin đăng hoặc tin nhắn khi đồ cũ, việc làm, bất động sản, sự kiện, yêu cầu trợ giúp, xe cộ hoặc các bài đăng khác có vẻ không an toàn, gây hiểu lầm, bất hợp pháp hoặc lạm dụng. MIDORIGO có thể xóa nội dung hoặc hạn chế tài khoản vi phạm quy định.' },
        { question: 'Tôi có thể thanh toán cho hàng hóa hoặc dịch vụ trong MIDORIGO không?', answer: 'Không. MIDORIGO không xử lý tiền. Người dùng phải tự sắp xếp bên ngoài ứng dụng và tuân theo luật địa phương, hướng dẫn an toàn và quy định đăng tin.' },
      ],
    },
    deleteAccount: {
      eyebrow: 'Xóa tài khoản và dữ liệu',
      title: 'Yêu cầu xóa tài khoản MIDORIGO của bạn',
      intro: 'Bạn có thể yêu cầu xóa tài khoản qua email. Trang này giải thích cần gửi gì và dữ liệu nào có thể bị xóa, ẩn danh hoặc được giữ lại khi cần.',
      requestTitle: 'Cách yêu cầu xóa',
      requestSteps: [
        'Gửi email đến japankaiten@gmail.com từ email tài khoản của bạn.',
        'Dùng tiêu đề: Account deletion request.',
        'Bao gồm ID người dùng nếu có trong ứng dụng.',
      ],
      sections: [
        { title: 'Thông tin sẽ bị xóa hoặc ẩn danh', paragraphs: ['Thông tin hồ sơ tài khoản, thiết lập vị trí đã lưu, tùy chọn thông báo, ảnh tải lên, báo cáo, tin đăng đồ cũ, việc làm, bài đăng bất động sản, bài đăng sự kiện, yêu cầu trợ giúp, tin đăng xe cộ, tin nhắn và nội dung liên quan của người dùng có thể bị xóa hoặc ẩn danh khi khả thi về mặt kỹ thuật và pháp lý.'] },
        { title: 'Thông tin có thể được giữ lại', paragraphs: ['Một số hồ sơ có thể được giữ lại khi cần cho lý do pháp lý, bảo mật, ngăn gian lận, ngăn lạm dụng, xử lý tranh chấp, sao lưu hoặc vận hành. Hồ sơ được giữ lại sẽ chỉ giới hạn ở mức cần thiết cho các mục đích đó. MIDORIGO không xử lý thanh toán marketplace.'] },
        { title: 'Thời gian xử lý', paragraphs: ['MIDORIGO sẽ xem xét yêu cầu xóa và có thể yêu cầu xác minh trước khi xử lý. Bạn sẽ nhận được phản hồi qua email tài khoản sau khi yêu cầu được xem xét.'] },
      ],
    },
  }),
  es: shallowTranslate(english, {
    locale: 'es',
    routes: { home: 'Inicio', privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', support: 'Soporte', deleteAccount: 'Eliminar cuenta' },
    common: {
      language: 'Idioma',
      legalAndSupport: 'Legal y soporte',
      policyDetails: 'Detalles de la política',
      termsDetails: 'Detalles de los términos',
      footerAbout: 'Plataforma para residentes en Japón con publicaciones de economía circular, comercio local, información del vecindario y apoyo de residuos orientado al municipio.',
      effectiveDate: '18 de abril de 2026',
      address: 'Disponible previa solicitud válida cuando sea necesario.',
    },
    home: {
      eyebrow: 'Plataforma de economía circular para residentes en Japón',
      title: 'Capa de acceso local para comunidades circulares.',
      tagline: 'Comercia localmente, reutiliza más y mantente alineado con las normas municipales de residuos.',
      intro: 'MIDORIGO conecta a residentes locales mediante publicaciones de segunda mano, empleos, bienes raíces, eventos, solicitudes de ayuda, autos y comercio comunitario. Una capa municipal apoya calendarios de recogida, identificación de objetos con IA, orientación de desecho, instalaciones de reciclaje y reportes locales.',
      ctaAvailability: 'Regístrate gratis al acceso anticipado',
      ctaSupport: 'Ver soporte',
      previewLabel: 'Vista previa de la app MIDORIGO',
      previewCardLabel: 'Mercado local',
      previewCardTitle: 'Mesa de comedor',
      previewCardNote: 'Reutilizar antes de desechar',
      previewScanLabel: 'Capa municipal',
      previewScanTitle: 'Botellas de plástico',
      previewScanNote: 'Recogida mañana',
      previewPills: ['Trabajos cerca de ti', 'Eventos esta semana', 'Revisión de desecho con IA'],
      sections: {
        features: 'Qué ayuda a hacer MIDORIGO',
        marketplace: 'Categorías del mercado comunitario',
        platform: 'Cómo encaja la plataforma',
        boundaries: 'Límites importantes de la plataforma',
        residents: 'Para residentes en Japón',
        coreAreas: 'Áreas principales de la app',
        comingSoon: 'Próximamente',
        faq: 'Preguntas frecuentes',
      },
      marketplaceLead: 'MIDORIGO no maneja dinero ni actúa como proveedor de pagos. La app es una plataforma para publicar, descubrir, comunicarse y coordinar localmente. Los usuarios son responsables de la seguridad, el cumplimiento legal y los términos de sus acuerdos.',
      features: [
        { icon: 'market', title: 'Mercado de segunda mano', text: 'Publica objetos útiles para comercio local, reutilización o regalo. MIDORIGO conecta a las personas, pero no procesa pagos.' },
        { icon: 'briefcase', title: 'Trabajos locales', text: 'Encuentra oportunidades de trabajo y servicios cercanos publicadas por personas y organizaciones de la comunidad.' },
        { icon: 'home', title: 'Bienes raíces', text: 'Encuentra publicaciones locales de vivienda y propiedades junto con la información comunitaria diaria.' },
        { icon: 'calendar', title: 'Eventos y ayuda', text: 'Comparte eventos locales, pide ayuda y encuentra apoyo práctico de residentes cercanos.' },
        { icon: 'car', title: 'Comercio de autos y movilidad', text: 'Publica o consulta anuncios de vehículos y movilidad local dentro de las reglas de la app.' },
        { icon: 'scan', title: 'Escáner de clasificación de residuos', text: 'Usa identificación de artículos asistida por IA para obtener orientación de desecho orientada al municipio.' },
        { icon: 'calendar', title: 'Calendario de recogida', text: 'Mantén visibles los días de recogida para residuos combustibles, no combustibles, reciclables y voluminosos.' },
        { icon: 'map', title: 'Reglas locales de desecho', text: 'Guarda la configuración de tu ciudad o zona para organizar la guía según donde vives.' },
        { icon: 'recycle', title: 'Instalaciones de reciclaje', text: 'Encuentra opciones cercanas de reciclaje, desecho y entrega cuando un artículo necesita manejo especial.' },
        { icon: 'language', title: 'Soporte en japonés e inglés', text: 'Cambia de idioma para publicaciones, tareas diarias, reglas locales, recordatorios y términos de residuos.' },
      ],
      marketplaceCategories: ['Artículos de segunda mano', 'Empleos', 'Bienes raíces', 'Eventos', 'Solicitudes de ayuda', 'Autos y movilidad'],
      appAspects: [
        { icon: 'market', title: 'Comercio local y reutilización', text: 'Los residentes pueden publicar y descubrir artículos de segunda mano, objetos para regalar, autos y otras publicaciones de movilidad para mantener los recursos útiles en circulación por más tiempo.' },
        { icon: 'briefcase', title: 'Oportunidades comunitarias', text: 'Trabajos, solicitudes de ayuda, eventos y avisos locales ofrecen un lugar práctico para compartir oportunidades del vecindario.' },
        { icon: 'home', title: 'Vivienda y descubrimiento del área', text: 'Las publicaciones inmobiliarias pueden ayudar a entender opciones de vivienda local junto con los servicios diarios y la actividad comunitaria de una zona.' },
        { icon: 'map', title: 'Capa orientada al municipio', text: 'La configuración de ciudad y zona respalda calendarios de basura, reglas de desecho, puntos de reciclaje, reportes de incidencias y orientación local sobre residuos.' },
        { icon: 'scan', title: 'Identificación asistida por IA', text: 'Las fotos de artículos pueden ayudar a identificar categorías probables de desecho, pero la decisión final debe comprobarse con las normas municipales.' },
        { icon: 'language', title: 'Acceso bilingüe cotidiano', text: 'El soporte en inglés y japonés ayuda a navegar publicaciones, reglas locales, recordatorios y términos relacionados con residuos con mayor facilidad.' },
      ],
      platformBoundaries: [
        'MIDORIGO no procesa pagos, no retiene fondos, no ofrece escrow ni garantiza transacciones.',
        'Las publicaciones, mensajes, trabajos, bienes raíces, eventos, solicitudes de ayuda y anuncios de autos son generados por usuarios salvo que se indique lo contrario.',
        'Los usuarios son responsables de publicaciones legales, comunicación segura, encuentros presenciales, impuestos, licencias, permisos y cualquier término de intercambio.',
        'Los sitios web municipales, guías impresas, avisos oficiales y oficinas locales siguen siendo la fuente de referencia para decisiones finales de desecho de residuos.',
        'MIDORIGO puede eliminar contenido, restringir cuentas o revisar reportes cuando se sospeche de riesgos de seguridad, fraude, abuso, ilegalidad o violaciones de reglas.',
      ],
      residentsParagraphs: [
        'MIDORIGO está diseñado para residentes de largo plazo, personas recién mudadas, residentes internacionales, estudiantes, familias, trabajadores locales y cualquier persona que quiera información útil del vecindario en un solo lugar.',
        'La capa municipal ayuda con reglas locales de desecho, identificación de artículos con IA, calendarios de recogida, instalaciones de reciclaje y reportes. Salvo indicación expresa, la app no implica una asociación oficial con municipios. Las reglas finales sobre basura y reciclaje deben verificarse siempre con fuentes oficiales municipales.',
      ],
      residentsChecks: [
        'Publicar artículos reutilizables, trabajos, viviendas, autos, eventos y solicitudes de ayuda',
        'Coordinar directamente sin que MIDORIGO gestione pagos',
        'Guardar la configuración de ciudad o zona',
        'Revisar orientación municipal bilingüe de desecho',
        'Reportar publicaciones poco claras o información desactualizada sobre residuos',
      ],
      appAreas: [
        { label: 'Mercado', title: 'Artículos de segunda mano y publicaciones locales' },
        { label: 'Capa municipal', title: 'Calendario de basura y revisión de artículos con IA' },
        { label: 'Comunidad', title: 'Trabajos, eventos, ayuda, bienes raíces y autos' },
      ],
      faq: [
        { question: '¿MIDORIGO es una app oficial del gobierno?', answer: 'No. A menos que se anuncie una alianza específica, MIDORIGO es una plataforma independiente de economía circular. Las reglas municipales siguen siendo la fuente final para decisiones sobre basura y reciclaje.' },
        { question: '¿MIDORIGO gestiona pagos?', answer: 'No. MIDORIGO es una plataforma para descubrir, publicar y comunicarse. Los usuarios son responsables de sus propios arreglos de intercambio y pago.' },
        { question: '¿Qué puede publicar la gente?', answer: 'MIDORIGO está pensado para artículos de segunda mano, empleos, bienes raíces, eventos, solicitudes de ayuda y publicaciones de autos o movilidad, sujeto a las reglas de la app y la ley local.' },
        { question: '¿MIDORIGO verifica cada publicación?', answer: 'No. Las publicaciones y mensajes son generados por usuarios. MIDORIGO puede ofrecer herramientas de reporte y moderación, pero los usuarios deben revisarlos con cuidado por su cuenta.' },
        { question: '¿La app puede decirme exactamente cómo desechar cada objeto?', answer: 'MIDORIGO ayuda a organizar la orientación de desecho, pero las reglas varían por municipio y pueden cambiar. En caso de duda, los usuarios deben verificar con su gobierno local.' },
        { question: '¿La app funcionará en japonés e inglés?', answer: 'Sí. La app está pensada para uso bilingüe, ayudando a los residentes a entender mejor términos de residuos e información diaria.' },
        { question: '¿Cuándo estará disponible la app?', answer: 'MIDORIGO se está preparando para su lanzamiento en App Store y Google Play. Las URL finales de tienda se añadirán después de la aprobación.' },
      ],
      storeBadges: { appStore: 'Próximamente en App Store', playStore: 'Próximamente en Google Play' },
    },
    privacy: {
      eyebrow: 'Política de privacidad',
      title: 'Cómo MIDORIGO maneja los datos',
      intro: 'Esta política explica la información que MIDORIGO puede recopilar para ofrecer publicaciones locales de economía circular, comunicación comunitaria y apoyo de residuos orientado al municipio.',
      sections: [
        { title: 'Información que podemos recopilar', paragraphs: [
          'MIDORIGO puede recopilar el correo electrónico de la cuenta y la información del perfil cuando creas o administras una cuenta.',
          'Podemos recopilar ciudad, distrito, zona, configuración de ubicación y señales aproximadas de ubicación cuando usas funciones de descubrimiento local, búsqueda de instalaciones, calendario de recogida u orientación de desecho.',
          'Si usas identificación de objetos con IA, publicaciones de segunda mano, empleos, bienes raíces, eventos, solicitudes de ayuda, autos, reportes u otras funciones similares, podemos recopilar imágenes subidas y texto relacionado que decidas enviar.',
          'El contenido de publicaciones comunitarias, chats, reportes y moderación puede recopilarse cuando esas funciones estén disponibles. MIDORIGO no procesa pagos, pero los usuarios pueden incluir detalles de intercambio en publicaciones o mensajes.',
          'Los permisos de cámara, biblioteca de fotos, notificaciones y ubicación solo se solicitan cuando son necesarios para funciones como escaneo de objetos, fotos para publicaciones, recordatorios de recogida, descubrimiento local o búsqueda de instalaciones.',
          'Se pueden recopilar análisis, diagnósticos, información del dispositivo, preferencias de notificaciones y tokens de notificación para operar, proteger y mejorar la app.',
        ]},
        { title: 'Cómo se usa la información', paragraphs: [
          'Usamos la información para ofrecer cuentas, configuración local, publicaciones de economía circular, comunicación comunitaria, recordatorios de recogida, orientación de objetos con IA, búsqueda de reciclaje, reporte de incidencias, soporte al cliente, moderación de seguridad, análisis, diagnósticos, prevención de fraude y cumplimiento legal.',
          'La configuración relacionada con la ubicación se usa para personalizar el contenido de la app. MIDORIGO no sustituye las reglas oficiales del municipio.',
          'Las imágenes y textos enviados para escaneo pueden usarse para devolver sugerencias de desecho, mejorar seguridad y diagnósticos, investigar reportes y apoyar la moderación cuando lo permitan la ley y la configuración de la app.',
        ]},
        { title: 'Servicios de terceros', paragraphs: [
          'MIDORIGO puede usar Supabase para autenticación, base de datos y almacenamiento. Expo u otros servicios de notificación pueden usarse para notificaciones push. Proveedores de mapas o ubicación pueden usarse cuando haya funciones de ubicación o búsqueda de instalaciones. Como MIDORIGO no maneja dinero, pagos del marketplace ni retiene fondos, aquí no se incluyen proveedores de pago.',
          'Estos proveedores procesan la información según sus propios términos y políticas de privacidad. La lista de proveedores puede actualizarse cuando MIDORIGO agregue, elimine o cambie proveedores de servicio.',
        ]},
        { title: 'Compartición y procesadores', paragraphs: [
          'Podemos compartir información con proveedores de servicio que ayudan a operar MIDORIGO, incluidos hosting, autenticación, almacenamiento, notificaciones, análisis, diagnósticos, mapas, soporte al cliente, seguridad y herramientas de moderación. Se espera que estos proveedores procesen la información para los servicios que nos prestan.',
          'También podemos divulgar información cuando lo exija la ley, para proteger a los usuarios y al servicio, investigar abuso o fraude, responder a solicitudes legales válidas o como parte de una transferencia empresarial permitida por la ley.',
        ]},
        { title: 'Seguridad', paragraphs: [
          'MIDORIGO usa medidas administrativas, técnicas y organizativas razonables para proteger la información de los usuarios contra acceso no autorizado, pérdida, uso indebido, alteración o divulgación. Ningún servicio en línea puede garantizar seguridad absoluta, por lo que los usuarios también deben proteger sus credenciales y actuar con cautela al compartir información en publicaciones o mensajes.',
        ]},
        { title: 'Contenido generado por usuarios y visibilidad', paragraphs: [
          'Las publicaciones, eventos, empleos, publicaciones inmobiliarias, solicitudes de ayuda, publicaciones de autos, datos de perfil y mensajes relacionados pueden ser visibles para otros usuarios según la función usada y la configuración disponible en la app.',
          'Los reportes y registros de moderación pueden revisarse para proteger a los usuarios, hacer cumplir las reglas, prevenir abuso, responder a solicitudes legales y mantener la integridad del servicio.',
        ]},
        { title: 'Retención, eliminación y contacto', paragraphs: [
          'Conservamos la información solo el tiempo necesario para los fines descritos en esta política, salvo que se requiera un período mayor por motivos legales, de seguridad, disputas, moderación u operación.',
          'Puedes solicitar acceso, corrección o eliminación de la información de tu cuenta. Las instrucciones para eliminar la cuenta están disponibles en /delete-account. Algunos registros pueden conservarse cuando sea necesario por motivos legales, de seguridad, prevención de fraude, prevención de abuso, gestión de disputas, respaldo u operación.',
          'Para solicitar acceso, corrección, eliminación o soporte de privacidad, contacta a japankaiten@gmail.com.',
        ]},
        { title: 'Menores', paragraphs: [
          'MIDORIGO no está destinado a menores de 13 años. Los usuarios que no hayan alcanzado la mayoría de edad en su lugar de residencia deben usar la app solo con permiso y supervisión de sus padres o tutor legal, especialmente para publicaciones, mensajes, intercambios, empleos, bienes raíces, eventos, solicitudes de ayuda y publicaciones relacionadas con autos.',
        ]},
      ],
    },
    terms: {
      eyebrow: 'Términos de servicio',
      title: 'Reglas para usar MIDORIGO',
      intro: 'Estos términos explican las responsabilidades básicas al usar MIDORIGO como plataforma local de economía circular con apoyo de residuos orientado al municipio.',
      sections: [
        { title: 'Elegibilidad y cuentas', paragraphs: [
          'Debes poder usar MIDORIGO legalmente en tu ubicación. MIDORIGO no está destinado a menores de 13 años. Si no has alcanzado la mayoría de edad donde vives, debes usar las funciones de marketplace, mensajería, empleos, bienes raíces, eventos, solicitudes de ayuda y autos solo con permiso y supervisión de un padre, madre o tutor legal. Eres responsable de la exactitud de la información de tu cuenta y de mantener seguro tu método de acceso.',
        ]},
        { title: 'Uso aceptable', paragraphs: [
          'No uses indebidamente la app, no interfieras con la operación del servicio, no subas contenido dañino, no suplantes a otras personas, no violes leyes, no acoses a usuarios ni envíes reportes falsos. MIDORIGO puede suspender o eliminar cuentas, publicaciones, mensajes o reportes que parezcan abusivos, inseguros, ilegales o incompatibles con estos términos.',
        ]},
        { title: 'Contenido y conducta prohibidos', paragraphs: [
          'No publiques ni promuevas bienes o servicios ilegales, armas, sustancias controladas, artículos robados, productos retirados, ofertas fraudulentas, estafas, contenido sexual o explotador, trata de personas, contenido de odio o discriminatorio, amenazas, acoso, intimidación, exposición de datos privados, malware, spam ni contenido que infrinja los derechos de otra persona. MIDORIGO puede usar filtrado, revisión, reportes, bloqueo y herramientas de moderación para reducir contenido inseguro o inapropiado.',
        ]},
        { title: 'Contenido generado por usuarios', paragraphs: [
          'Los usuarios son responsables de las publicaciones, mensajes, imágenes, reportes y demás contenido que envían. El contenido debe ser lo bastante preciso para no engañar a otras personas y no debe infringir derechos, exponer información privada sin permiso ni promover actividad insegura, fraudulenta, discriminatoria, ilegal o abusiva.',
        ]},
        { title: 'Reglas del mercado comunitario', paragraphs: [
          'Las publicaciones de bienes, empleos, bienes raíces, eventos, solicitudes de ayuda, autos y otras categorías compatibles deben describirse de forma honesta. Los usuarios son responsables de la comunicación segura, publicaciones legales, coordinación de entrega y de evitar artículos o servicios prohibidos, peligrosos, retirados, ilegales, engañosos o restringidos.',
          'Las publicaciones de empleo, bienes raíces, vehículos, eventos y ayuda deben cumplir con las leyes aplicables, licencias, permisos, normas laborales, normas de vivienda, normas de protección al consumidor y requisitos de publicación de la plataforma.',
        ]},
        { title: 'Orientación de residuos y reglas municipales', paragraphs: [
          'MIDORIGO ayuda a organizar la información de desecho, pero no garantiza que la orientación sea completa, actual o aplicable a cada edificio o barrio. Los usuarios deben verificar las decisiones finales de desecho con las reglas municipales locales, avisos oficiales o puntos de contacto locales.',
          'No se implica ningún respaldo oficial del municipio salvo que MIDORIGO y esa autoridad lo indiquen por separado.',
        ]},
        { title: 'Resultados asistidos por IA', paragraphs: [
          'La identificación de objetos asistida por IA puede ser incompleta o incorrecta. Los usuarios deben tratar los resultados del escaneo como un punto de partida, revisar el estado del objeto y las reglas locales, y verificar con fuentes oficiales municipales cuando haya dudas.',
        ]},
        { title: 'Sin gestión de pagos', paragraphs: [
          'MIDORIGO es una plataforma para publicar, descubrir, comunicarse y coordinar localmente. MIDORIGO no procesa pagos del marketplace, no retiene fondos, no ofrece escrow, no garantiza transacciones ni actúa como intermediario. Los usuarios son responsables de los términos de intercambio, impuestos, requisitos legales, revisiones de seguridad y acuerdos de pago que hagan fuera de la app.',
        ]},
        { title: 'Reportes y moderación', paragraphs: [
          'MIDORIGO puede revisar reportes, eliminar contenido, limitar visibilidad, restringir cuentas o conservar registros cuando sea necesario por seguridad, prevención de abuso, integridad del servicio, cumplimiento legal o revisión de disputas. Las acciones de moderación pueden tomarse sin aviso previo cuando sea necesario.',
          'Cuando estas funciones estén disponibles, los usuarios deben poder reportar publicaciones, mensajes y usuarios objetables desde la app. MIDORIGO procura revisar los reportes de seguridad y tomar medidas adecuadas oportunamente.',
        ]},
        { title: 'Limitación de responsabilidad', paragraphs: [
          'En la máxima medida permitida por la ley, MIDORIGO no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por pérdidas causadas por confiar en información local de desecho incompleta, contenido de marketplace generado por usuarios, intercambios organizados por usuarios, interrupción del servicio o servicios de terceros.',
        ]},
        { title: 'Contacto', paragraphs: ['Las preguntas sobre estos términos pueden enviarse a japankaiten@gmail.com.'] },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Ponte en contacto con MIDORIGO',
      intro: 'Usa este formulario para preparar un correo a soporte. No hay backend conectado en este sitio estático.',
      emailLabel: 'Tu correo',
      categoryLabel: 'Categoría',
      messageLabel: 'Mensaje',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Cuéntanos qué pasó, tu ciudad o zona si aplica, y el correo de la cuenta si es distinto.',
      submit: 'Abrir correo',
      supportTitle: 'Correo de soporte',
      supportBody: 'Escribe a japankaiten@gmail.com para soporte de la app, solicitudes de privacidad, correcciones de contenido municipal y consultas de socios.',
      supportNote: 'Más adelante se puede añadir un backend para el formulario de contacto. Por ahora, este formulario abre la app de correo del usuario.',
      categories: ['Soporte de la app', 'Publicación/reporte', 'Solicitud de datos/privacidad', 'Corrección municipal/contenido', 'Consulta comercial/socios'],
    },
    support: {
      eyebrow: 'Soporte',
      title: 'Ayuda para usar MIDORIGO',
      intro: 'Encuentra respuestas rápidas sobre publicaciones del marketplace, configuración de idioma, configuración de ubicación, acceso a cámara, notificaciones, ayuda de cuenta y reportes de información incorrecta.',
      sectionTitle: 'Solución de problemas',
      outro: '¿Necesitas más ayuda? Contacta a japankaiten@gmail.com e incluye tu dispositivo, la versión de la app si está disponible, la ciudad o zona seleccionada y una breve descripción del problema.',
      faq: [
        { question: '¿Cómo cambio el idioma?', answer: 'Abre la configuración de la app, elige Language y selecciona inglés o japonés. Parte del contenido fuente del municipio puede seguir apareciendo en el idioma original en que fue publicado.' },
        { question: '¿Cómo configuro mi ubicación?', answer: 'Usa la pantalla de configuración de ubicación para elegir tu ciudad, distrito, pueblo o zona. El descubrimiento del marketplace, las publicaciones locales, los horarios de recogida y las reglas de desecho pueden depender de esta configuración.' },
        { question: '¿Por qué no funciona la cámara?', answer: 'Revisa la configuración de tu dispositivo y permite el acceso a la cámara para MIDORIGO. El escáner necesita permiso de cámara para identificar objetos a partir de fotos.' },
        { question: '¿Por qué no recibo notificaciones?', answer: 'Confirma que las notificaciones estén activadas tanto en la configuración de MIDORIGO como en la de tu dispositivo. Los recordatorios de recogida también dependen de la zona seleccionada.' },
        { question: 'No puedo iniciar sesión.', answer: 'Comprueba que estás usando el mismo correo o método de acceso con el que creaste la cuenta. Si el problema continúa, contacta a soporte desde el correo de la cuenta cuando sea posible.' },
        { question: '¿Cómo reporto información incorrecta sobre residuos?', answer: 'Usa la opción de corrección o reporte en la app, o contacta a soporte con la ciudad o zona, el nombre del artículo y la fuente que consideras correcta.' },
        { question: '¿Cómo funcionan los reportes de publicaciones comunitarias?', answer: 'Usa la acción de reportar en una publicación o mensaje cuando artículos de segunda mano, empleos, bienes raíces, eventos, solicitudes de ayuda, autos u otras publicaciones parezcan inseguros, engañosos, ilegales o abusivos. MIDORIGO puede eliminar contenido o restringir cuentas que infrinjan las reglas.' },
        { question: '¿Puedo pagar artículos o servicios dentro de MIDORIGO?', answer: 'No. MIDORIGO no procesa dinero. Los usuarios deben hacer sus propios arreglos fuera de la app y seguir la ley local, la orientación de seguridad y las reglas de publicación.' },
      ],
    },
    deleteAccount: {
      eyebrow: 'Eliminación de cuenta y datos',
      title: 'Solicita la eliminación de tu cuenta MIDORIGO',
      intro: 'Puedes solicitar la eliminación de la cuenta por correo electrónico. Esta página explica qué incluir y qué datos pueden eliminarse, anonimizarse o conservarse cuando sea necesario.',
      requestTitle: 'Cómo solicitar la eliminación',
      requestSteps: [
        'Envía un correo a japankaiten@gmail.com desde el correo de tu cuenta.',
        'Usa el asunto: Account deletion request.',
        'Incluye tu ID de usuario si está disponible en la app.',
      ],
      sections: [
        { title: 'Qué se elimina o anonimiza', paragraphs: ['La información del perfil de la cuenta, la configuración de ubicación guardada, preferencias de notificaciones, imágenes subidas, reportes, publicaciones de segunda mano, empleos, publicaciones inmobiliarias, publicaciones de eventos, solicitudes de ayuda, publicaciones de autos, mensajes y contenido relacionado del usuario pueden eliminarse o anonimizarse cuando sea técnica y legalmente posible.'] },
        { title: 'Qué puede conservarse', paragraphs: ['Algunos registros pueden conservarse cuando sea necesario por motivos legales, de seguridad, prevención de fraude, prevención de abuso, gestión de disputas, respaldo u operación. Los registros conservados se limitarán a lo necesario para esos fines. MIDORIGO no procesa pagos del marketplace.'] },
        { title: 'Plazos', paragraphs: ['MIDORIGO revisará las solicitudes de eliminación y puede pedir verificación antes de procesarlas. Recibirás una respuesta en el correo de la cuenta cuando la solicitud haya sido revisada.'] },
      ],
    },
  }),
};

type LocaleContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: LocaleContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('midorigo-language') as LanguageCode | null;
    if (saved && translations[saved]) {
      setLanguage(saved);
      return;
    }
    const browser = navigator.language.slice(0, 2) as LanguageCode;
    if (translations[browser]) {
      setLanguage(browser);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('midorigo-language', language);
    document.documentElement.lang = translations[language].locale;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
