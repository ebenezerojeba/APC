import tinubu800 from '../assets/gallery/ojtinubu-800.jpg';
import tinubu1280 from '../assets/gallery/ojtinubu-1280.jpg';
import rally800 from '../assets/gallery/oj5-800.jpg';
import rally1080 from '../assets/gallery/oj5-1080.jpg';
import office800 from '../assets/gallery/ojelabi31-800.jpg';
import office1280 from '../assets/gallery/ojelabi31-1280.jpg';
import ribbon800 from '../assets/gallery/oj11-800.jpg';
import ribbon1080 from '../assets/gallery/oj11-1080.jpg';
import forum800 from '../assets/gallery/oj10-800.jpg';
import forum915 from '../assets/gallery/oj10-915.jpg';
import desk800 from '../assets/gallery/ojelabi39-800.jpg';
import desk1280 from '../assets/gallery/ojelabi39-1280.jpg';

/*
  Hero chapters.

  Shaped for the CMS the brief describes (category / caption / order /
  isActive), so moving this to MongoDB later is a fetch swap rather than a
  rewrite. `focus` is the object-position used when a 3:2 frame is cropped to
  a phone's portrait viewport - without it the subject drifts out of frame on
  narrow screens.

  `caption` describes only what is visible. No dates, places or events are
  asserted, because none could be verified from the files.
*/
export const HERO_SLIDES = [
  {
    id: 'leadership',
    category: 'Leadership',
    caption: 'With the President of the Federal Republic',
    src: tinubu1280,
    srcSet: `${tinubu800} 800w, ${tinubu1280} 1280w`,
    focus: '50% 38%',
    order: 1,
    isActive: true,
  },
  {
    id: 'mobilisation',
    category: 'Mobilisation',
    caption: 'Addressing party faithful across the State',
    src: rally1080,
    srcSet: `${rally800} 800w, ${rally1080} 1080w`,
    focus: '56% 42%',
    order: 2,
    isActive: true,
  },
  {
    id: 'party',
    category: 'The Party',
    caption: 'Among party stakeholders and progressive governors',
    src: forum915,
    srcSet: `${forum800} 800w, ${forum915} 915w`,
    focus: '50% 45%',
    order: 3,
    isActive: true,
  },
  {
    id: 'office',
    category: 'The Office',
    caption: 'Party business at the State secretariat',
    src: office1280,
    srcSet: `${office800} 800w, ${office1280} 1280w`,
    focus: '58% 45%',
    order: 4,
    isActive: true,
  },
  {
    id: 'community',
    category: 'Community',
    caption: 'At a commissioning in the community',
    src: ribbon1080,
    srcSet: `${ribbon800} 800w, ${ribbon1080} 1080w`,
    focus: '50% 45%',
    order: 5,
    isActive: true,
  },
  {
    id: 'consultation',
    category: 'Consultation',
    caption: 'Working session with party leadership',
    src: desk1280,
    srcSet: `${desk800} 800w, ${desk1280} 1280w`,
    focus: '50% 42%',
    order: 6,
    isActive: true,
  },
].filter((s) => s.isActive).sort((a, b) => a.order - b.order);

export const SLIDE_MS = 7000;
