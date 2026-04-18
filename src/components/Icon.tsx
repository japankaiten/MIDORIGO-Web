type IconName = 'briefcase' | 'calendar' | 'car' | 'home' | 'language' | 'map' | 'market' | 'recycle' | 'scan';

const paths: Record<IconName, string> = {
  briefcase:
    'M8 7V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1m-9 4h10m-13-4h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z',
  calendar:
    'M7 3v3m10-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 8h3m3 0h3m-9 4h3m3 0h3',
  car: 'M5 14h14l-2-5a3 3 0 0 0-3-2h-4a3 3 0 0 0-3 2l-2 5Zm0 0v4m14-4v4M7 18h.01M17 18h.01M8 11h8',
  home: 'm4 11 8-7 8 7m-14-1v9h5v-5h2v5h5v-9',
  language:
    'M4 5h9M9 3v2m1 12a10 10 0 0 1-5-8m8-4a13 13 0 0 1-7 12m8 4 4-10 4 10m-6-4h4',
  map: 'M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6',
  market:
    'M5 9h14l-1-5H6L5 9Zm0 0v10h14V9M8 13h3v6m5-6h-2m-8-4a3 3 0 0 0 6 0m0 0a3 3 0 0 0 6 0',
  recycle:
    'm7 8 2-4 2 4M9 4a7 7 0 0 1 6 3l1 2m1 7-2 4-2-4m2 4a7 7 0 0 1-6-3l-1-2m-4-2 4 1-3 3m-1-4a7 7 0 0 1 3-6',
  scan: 'M5 8V5h3m8 0h3v3M5 16v3h3m11-3v3h-3M8 12h8m-8 3h5',
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

export type { IconName };
