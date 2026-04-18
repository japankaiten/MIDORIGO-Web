export const SUPPORT_EMAIL = 'japankaiten@gmail.com';
export const APP_NAME = 'MIDORIGO';

export const routes = [
  { label: 'Home', href: '/' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
  { label: 'Support', href: '/support' },
  { label: 'Delete Account', href: '/delete-account' },
];

export const legalPlaceholders = {
  effectiveDate: 'April 18, 2026',
  operatorName: 'Japan Kaiten company',
  legalAddress: 'Available upon valid request where required.', // TODO: Replace with a public legal address if required by store, local, or platform rules.
};

export const features = [
  {
    icon: 'market',
    title: 'Second-hand marketplace',
    text: 'List usable items for local trade, reuse, or giveaway. MIDORIGO connects people, but does not process payments.',
  },
  {
    icon: 'briefcase',
    title: 'Local jobs',
    text: 'Discover neighborhood work and service opportunities posted by people and organizations in the community.',
  },
  {
    icon: 'home',
    title: 'Real estate',
    text: 'Find local housing and property posts alongside the daily community information residents already need.',
  },
  {
    icon: 'calendar',
    title: 'Events and help',
    text: 'Share local events, ask for help, and find practical support from nearby residents.',
  },
  {
    icon: 'car',
    title: 'Cars and mobility trade',
    text: 'Post or browse local vehicle and mobility-related listings where supported by app rules.',
  },
  {
    icon: 'scan',
    title: 'Waste sorting scanner',
    text: 'Use AI-assisted item identification for municipality-oriented disposal guidance and next steps.',
  },
  {
    icon: 'calendar',
    title: 'Pickup calendar',
    text: 'Keep household collection days visible for burnable, non-burnable, recyclable, and oversized items.',
  },
  {
    icon: 'map',
    title: 'Local disposal rules',
    text: 'Save your city or area setup so guidance can be organized around the place where you live.',
  },
  {
    icon: 'recycle',
    title: 'Recycling facilities',
    text: 'Find nearby recycling, disposal, and drop-off options when an item needs special handling.',
  },
  {
    icon: 'language',
    title: 'Japanese and English support',
    text: 'Switch between languages for listings, daily tasks, local rules, reminders, and waste terms.',
  },
] as const;

export const marketplaceCategories = [
  'Second-hand goods',
  'Jobs',
  'Real estate',
  'Events',
  'Help requests',
  'Cars and mobility',
] as const;

export const appAspects = [
  {
    icon: 'market',
    title: 'Local trade and reuse',
    text: 'Residents can post and discover second-hand goods, giveaway items, cars, and other mobility listings so usable things stay in circulation longer.',
  },
  {
    icon: 'briefcase',
    title: 'Community opportunities',
    text: 'Jobs, help requests, events, and local notices give residents a practical place to find and share neighborhood opportunities.',
  },
  {
    icon: 'home',
    title: 'Housing and area discovery',
    text: 'Real estate posts can help people understand local housing options alongside the daily services and community activity around an area.',
  },
  {
    icon: 'map',
    title: 'Municipality-oriented layer',
    text: 'City and area settings support garbage calendars, disposal rules, recycling points, issue reports, and local waste guidance.',
  },
  {
    icon: 'scan',
    title: 'AI-assisted identification',
    text: 'Item photos can help residents identify likely disposal categories, while final decisions should still be checked against municipal rules.',
  },
  {
    icon: 'language',
    title: 'Bilingual everyday access',
    text: 'English and Japanese support helps residents navigate listings, local rules, reminders, and waste-related terms more easily.',
  },
] as const;

export const platformBoundaries = [
  'MIDORIGO does not process payments, hold funds, provide escrow, or guarantee trades.',
  'Listings, messages, jobs, real estate posts, events, help requests, and car posts are user-generated unless clearly stated otherwise.',
  'Users are responsible for lawful posts, safe communication, in-person arrangements, taxes, licenses, permits, and any trade terms.',
  'Municipality websites, printed guides, official notices, and local offices remain the source of truth for final waste disposal decisions.',
  'MIDORIGO may remove content, restrict accounts, or review reports when safety, fraud, abuse, illegality, or rule violations are suspected.',
] as const;

export const homeFaqs = [
  {
    question: 'Is MIDORIGO an official government app?',
    answer:
      'No. MIDORIGO is an independent circular economy platform unless a specific partnership is announced. Municipality rules remain the source of truth for final garbage and recycling decisions.',
  },
  {
    question: 'Does MIDORIGO handle payments?',
    answer:
      'No. MIDORIGO is a platform for discovery, posting, and communication. Users are responsible for their own trade arrangements, and payment handling is not provided by MIDORIGO.',
  },
  {
    question: 'What can people post?',
    answer:
      'MIDORIGO is intended for local second-hand goods, jobs, real estate, events, help requests, and cars or mobility listings, subject to app rules and local law.',
  },
  {
    question: 'Does MIDORIGO verify every listing?',
    answer:
      'No. Listings and messages are user-generated. MIDORIGO may provide reporting and moderation tools, but users should review posts carefully and make safe arrangements.',
  },
  {
    question: 'Can the app tell me exactly how to throw away every item?',
    answer:
      'MIDORIGO helps organize disposal guidance, but rules vary by municipality and can change. Residents should verify uncertain items with their local city, ward, town, or village office.',
  },
  {
    question: 'Will the app work in both Japanese and English?',
    answer:
      'The app is designed for bilingual use so residents can understand local waste terms and schedules more easily.',
  },
  {
    question: 'When will the app be available?',
    answer:
      'MIDORIGO is preparing for App Store and Google Play release. Final store URLs will be added after approval.',
  },
];

export const supportFaqs = [
  {
    question: 'How do I change language?',
    answer:
      'Open the app settings, choose Language, and select English or Japanese. Some municipality source content may remain in the language originally published by the local authority.',
  },
  {
    question: 'How do I set my location?',
    answer:
      'Use the location setup screen to choose your city, ward, town, or area. Marketplace discovery, local posts, pickup schedules, and disposal rules can depend on this setting.',
  },
  {
    question: 'Why is the camera not working?',
    answer:
      'Check your device settings and allow camera access for MIDORIGO. The scanner needs camera permission to identify items from photos.',
  },
  {
    question: 'Why am I not receiving notifications?',
    answer:
      'Confirm that notifications are enabled in both MIDORIGO settings and your device settings. Pickup reminders also depend on your selected area.',
  },
  {
    question: 'I cannot log in.',
    answer:
      'Check that you are using the same email or sign-in method used to create the account. If the problem continues, contact support from the account email when possible.',
  },
  {
    question: 'How do I report incorrect waste information?',
    answer:
      'Use the correction or report option in the app, or contact support with the city or area, item name, and the source you believe is correct.',
  },
  {
    question: 'How do community listing reports work?',
    answer:
      'Use the report action on a listing or message when second-hand goods, jobs, real estate, events, help requests, cars, or other posts appear unsafe, misleading, illegal, or abusive. MIDORIGO may remove content or restrict accounts that violate the rules.',
  },
  {
    question: 'Can I pay for items or services in MIDORIGO?',
    answer:
      'No. MIDORIGO does not process money. Users must make their own arrangements outside the app and should follow local laws, safety guidance, and listing rules.',
  },
];
