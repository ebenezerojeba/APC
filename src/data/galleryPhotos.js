/*
  Gallery data.

  Derivatives live in src/assets/gallery as <name>-<width>.jpg and are produced
  from the originals in src/assets. Vite's glob picks them up at build time, so
  adding a photo means dropping in its derivatives and adding one RAW row - no
  import wiring.

  Categories describe what is visibly happening in each frame. They are not
  sourced from records, so no dates, events or place names are asserted here.
  Captions belong in the CMS once they can be verified.
*/

const files = import.meta.glob('../assets/gallery/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

// name -> { 400: url, 800: url, <original>: url }
const byName = {};
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([^/]+)-(\d+)\.jpg$/);
  if (!match) continue;
  const [, name, width] = match;
  (byName[name] ||= {})[Number(width)] = url;
}

// w/h are the ORIGINAL intrinsic dimensions, used to reserve layout space so
// the masonry columns never reflow as images arrive.
const RAW = [
  { n: 'cno-07', c: 'ceremony', w: 1600, h: 1066, s: [400, 800, 1400] },
  { n: 'cno-18', c: 'ceremony', w: 1600, h: 1067, s: [400, 800, 1400] },
  { n: 'cno-20', c: 'portrait', w: 851, h: 1280, s: [400, 800, 851] },
  { n: 'ojtinubu',  c: 'ceremony',   w: 1280, h: 852,  s: [400, 800, 1280] },
  { n: 'cno-01', c: 'ceremony', w: 1024, h: 683, s: [400, 800, 1024] },
  { n: 'oj1',       c: 'podium',     w: 1080, h: 717,  s: [400, 800, 1080] },
  { n: 'cno-02', c: 'podium', w: 1200, h: 862, s: [400, 800, 1200] },
  { n: 'ojelabi19', c: 'portrait',   w: 720,  h: 1080, s: [400, 720] },
  { n: 'cno-03', c: 'press', w: 1032, h: 688, s: [400, 800, 1032] },
  { n: 'ojelabi23', c: 'grassroots', w: 1280, h: 850,  s: [400, 800, 1280] },
  { n: 'cno-04', c: 'grassroots', w: 929, h: 619, s: [400, 800, 929] },
  { n: 'ojelabi31', c: 'meetings',   w: 1280, h: 852,  s: [400, 800, 1280] },
  { n: 'cno-05', c: 'grassroots', w: 1032, h: 688, s: [400, 800, 1032] },
  { n: 'oj10',      c: 'ceremony',   w: 915,  h: 655,  s: [400, 800, 915] },
  { n: 'cno-06', c: 'ceremony', w: 720, h: 1080, s: [400, 720] },
  { n: 'ojelabi22', c: 'podium',     w: 914,  h: 1280, s: [400, 800, 914] },
  { n: 'cno-08', c: 'meetings', w: 1600, h: 1067, s: [400, 800, 1400] },
  { n: 'oj11',      c: 'grassroots', w: 1080, h: 720,  s: [400, 800, 1080] },
  { n: 'cno-09', c: 'ceremony', w: 960, h: 650, s: [400, 800, 960] },
  { n: 'ojelabi13', c: 'portrait',   w: 720,  h: 898,  s: [400, 720] },
  { n: 'cno-10', c: 'ceremony', w: 1440, h: 981, s: [400, 800, 1400] },
  { n: 'ojelabi39', c: 'meetings',   w: 1280, h: 852,  s: [400, 800, 1280] },
  { n: 'cno-11', c: 'grassroots', w: 1170, h: 780, s: [400, 800, 1170] },
  { n: 'oj12',      c: 'grassroots', w: 1032, h: 688,  s: [400, 800, 1032] },
  { n: 'cno-12', c: 'portrait', w: 851, h: 1280, s: [400, 800, 851] },
  { n: 'ojelabi17', c: 'podium',     w: 720,  h: 1080, s: [400, 720] },
  { n: 'cno-13', c: 'ceremony', w: 1200, h: 927, s: [400, 800, 1200] },
  { n: 'oj13',      c: 'ceremony',   w: 1032, h: 688,  s: [400, 800, 1032] },
  { n: 'cno-14', c: 'ceremony', w: 1256, h: 836, s: [400, 800, 1256] },
  { n: 'ojelabi24', c: 'portrait',   w: 1002, h: 1280, s: [400, 800, 1002] },
  { n: 'cno-15', c: 'ceremony', w: 960, h: 640, s: [400, 800, 960] },
  { n: 'ojelabi38', c: 'meetings',   w: 1280, h: 852,  s: [400, 800, 1280] },
  { n: 'cno-16', c: 'press', w: 1280, h: 853, s: [400, 800, 1280] },
  { n: 'oj14',      c: 'ceremony',   w: 943,  h: 629,  s: [400, 800, 943] },
  { n: 'cno-17', c: 'meetings', w: 913, h: 1280, s: [400, 800, 913] },
  { n: 'ojelabi16', c: 'podium',     w: 1080, h: 720,  s: [400, 800, 1080] },
  { n: 'cno-19', c: 'ceremony', w: 1280, h: 888, s: [400, 800, 1280] },
  { n: 'oj5',       c: 'grassroots', w: 1080, h: 717,  s: [400, 800, 1080] },
  { n: 'cno-21', c: 'podium', w: 1080, h: 718, s: [400, 800, 1080] },
  { n: 'ojelabi15', c: 'ceremony',   w: 720,  h: 1080, s: [400, 720] },
  { n: 'cno-22', c: 'meetings', w: 1063, h: 708, s: [400, 800, 1063] },
  { n: 'ojelabi33', c: 'meetings',   w: 916,  h: 603,  s: [400, 800, 916] },
  { n: 'oj2',       c: 'ceremony',   w: 1080, h: 717,  s: [400, 800, 1080] },
  { n: 'cno-24', c: 'grassroots', w: 1208, h: 804, s: [400, 800, 1208] },
  { n: 'ojelabi29', c: 'portrait',   w: 720,  h: 1080, s: [400, 720] },
  { n: 'cno-25', c: 'meetings', w: 890, h: 560, s: [400, 800, 890] },
  { n: 'ojelabi30', c: 'podium',     w: 1035, h: 690,  s: [400, 800, 1035] },
  { n: 'cno-26', c: 'meetings', w: 1032, h: 688, s: [400, 800, 1032] },
  { n: 'oj6',       c: 'grassroots', w: 1080, h: 717,  s: [400, 800, 1080] },
  { n: 'cno-27', c: 'press', w: 1080, h: 718, s: [400, 800, 1080] },
  { n: 'ojelabi34', c: 'ceremony',   w: 1280, h: 854,  s: [400, 800, 1280] },
  { n: 'cno-28', c: 'ceremony', w: 1179, h: 779, s: [400, 800, 1179] },
  { n: 'ojelabi27', c: 'podium',     w: 837,  h: 1080, s: [400, 800, 837] },
  { n: 'cno-29', c: 'portrait', w: 1080, h: 717, s: [400, 800, 1080] },
  { n: 'ojelabi14', c: 'meetings',   w: 1024, h: 667,  s: [400, 800, 1024] },
  { n: 'cno-30', c: 'ceremony', w: 1032, h: 688, s: [400, 800, 1032] },
  { n: 'oj3',       c: 'ceremony',   w: 1080, h: 717,  s: [400, 800, 1080] },
  { n: 'cno-31', c: 'ceremony', w: 1080, h: 761, s: [400, 800, 1080] },
  { n: 'ojelabi18', c: 'portrait',   w: 720,  h: 1080, s: [400, 720] },
  { n: 'cno-32', c: 'grassroots', w: 1080, h: 720, s: [400, 800, 1080] },
  { n: 'ojelabi25', c: 'grassroots', w: 1032, h: 688,  s: [400, 800, 1032] },
  { n: 'ojelabi36', c: 'podium',     w: 1024, h: 682,  s: [400, 800, 1024] },
  { n: 'oj7',       c: 'ceremony',   w: 1080, h: 718,  s: [400, 800, 1080] },
  { n: 'ojelabi21', c: 'portrait',   w: 1080, h: 720,  s: [400, 800, 1080] },
  { n: 'oj9',       c: 'meetings',   w: 886,  h: 591,  s: [400, 800, 886] },
  { n: 'ojelabi26', c: 'podium',     w: 919,  h: 660,  s: [400, 800, 919] },
  { n: 'oj8',       c: 'ceremony',   w: 1080, h: 775,  s: [400, 800, 1080] },
  { n: 'ojelabi28', c: 'ceremony',   w: 719,  h: 1080, s: [400, 719] },
  { n: 'ojelabi37', c: 'podium',     w: 682,  h: 1024, s: [400, 682] },
  { n: 'ojelabi10', c: 'ceremony',   w: 1080, h: 719,  s: [400, 800, 1080] },
  { n: 'ojelabi32', c: 'ceremony',   w: 1024, h: 682,  s: [400, 800, 1024] },
  { n: 'ojelabi20', c: 'ceremony',   w: 1080, h: 720,  s: [400, 800, 1080] },
  { n: 'ojgroup',   c: 'ceremony',   w: 960,  h: 650,  s: [400, 800, 960] },
  { n: 'ojelabi35', c: 'ceremony',   w: 1024, h: 682,  s: [400, 800, 1024] },
  { n: 'oj4',       c: 'podium',     w: 1080, h: 879,  s: [400, 800, 1080] },
];

const ALT = {
  podium: 'Pastor Cornelius Ojelabi addressing an audience',
  meetings: 'Pastor Cornelius Ojelabi in an official meeting',
  grassroots: 'Pastor Cornelius Ojelabi at a community engagement',
  ceremony: 'Pastor Cornelius Ojelabi at a party or ceremonial event',
  press: 'Pastor Cornelius Ojelabi speaking to the press',
  portrait: 'Portrait of Pastor Cornelius Ojelabi',
};

export const PHOTOS = RAW.filter((p) => byName[p.n]).map((p) => {
  const sizes = byName[p.n];
  return {
    id: p.n,
    category: p.c,
    width: p.w,
    height: p.h,
    thumb: sizes[400],
    full: sizes[p.s[p.s.length - 1]],
    srcSet: p.s.filter((w) => sizes[w]).map((w) => `${sizes[w]} ${w}w`).join(', '),
    alt: ALT[p.c],
  };
});

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'podium', label: 'At the Podium' },
  { id: 'grassroots', label: 'Grassroots' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'press', label: 'Press & Media' },
  { id: 'ceremony', label: 'Party & Ceremony' },
  { id: 'portrait', label: 'Portraits' },
];
