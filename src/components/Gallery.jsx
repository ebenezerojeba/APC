import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Images } from 'lucide-react';

import { PHOTOS } from '../data/galleryPhotos';
import Lightbox from './gallery/Lightbox';
import SectionLabel from './SectionLabel';

/*
  Home-page gallery: a short curated selection, not the whole archive.

  Desktop shows a tile layout (one large frame and four smaller ones, the
  last carrying "+N more"); phones get a swipeable row. Both lead to the full
  archive at /gallery. Tapping a photo opens the viewer over all photos, so
  people can keep swiping past the selection.
*/

// Hand-picked for range: President, podium, press, grassroots, meetings, ceremony.
const FEATURED_IDS = ['ojtinubu', 'oj1', 'cno-03', 'ojelabi23', 'cno-08', 'cno-07', 'oj11', 'cno-02'];
const FEATURED = FEATURED_IDS.map((id) => PHOTOS.find((p) => p.id === id)).filter(Boolean);
const indexOf = (photo) => PHOTOS.indexOf(photo);

const Tile = ({ photo, onOpen, className = '', sizes, children }) => (
  <button
    type="button"
    onClick={() => onOpen(indexOf(photo))}
    aria-label={`Open photo: ${photo.alt}`}
    className={`group relative block overflow-hidden bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574] ${className}`}
  >
    <img
      src={photo.thumb}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
    />
    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    {children}
  </button>
);

const Gallery = () => {
  const [openAt, setOpenAt] = useState(null);
  const [slide, setSlide] = useState(0);
  const rail = useRef(null);

  const more = PHOTOS.length - 5;

  const onRailScroll = () => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild;
    if (!card) return;
    setSlide(Math.round(el.scrollLeft / (card.offsetWidth + 12)));
  };

  return (
    <section id="gallery" className="overflow-hidden bg-[#06170D] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <header className="max-w-2xl">
            <SectionLabel tone="gold" className="mb-4">The Archive</SectionLabel>
            <h2
              className="text-5xl font-black uppercase leading-[0.95] text-white md:text-7xl"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
            >
              Moments
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/60">
              The Chairman&apos;s work across Lagos State: at the podium, in the field, and around the table.
            </p>
          </header>
          <Link
            to="/gallery"
            className="group hidden shrink-0 items-center gap-2 border-b-2 border-[#D4A574]/40 pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A574] transition-colors hover:border-[#D4A574] sm:inline-flex"
          >
            All {PHOTOS.length} photos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Desktop / tablet: tile layout */}
        <div className="mt-10 hidden h-[560px] grid-cols-4 grid-rows-2 gap-3 sm:grid lg:h-[620px]">
          <Tile photo={FEATURED[0]} onOpen={setOpenAt} sizes="50vw" className="col-span-2 row-span-2" />
          {FEATURED.slice(1, 4).map((p) => (
            <Tile key={p.id} photo={p} onOpen={setOpenAt} sizes="25vw" />
          ))}
          <Link
            to="/gallery"
            className="group relative block overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]"
            aria-label={`See all ${PHOTOS.length} photos`}
          >
            <img
              src={FEATURED[4].thumb}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-30"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="leading-none" style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: '4rem' }}>
                +{more}
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#D4A574]">
                View all <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>

        {/* Phones: swipeable row */}
        <div className="mt-8 sm:hidden">
          <div
            ref={rail}
            onScroll={onRailScroll}
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED.map((p, i) => (
              <Tile
                key={p.id}
                photo={p}
                onOpen={setOpenAt}
                sizes="82vw"
                className="aspect-[4/5] w-[82vw] shrink-0 snap-center"
              >
                <span className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 text-[10px] font-bold tabular-nums text-white backdrop-blur-sm">
                  {i + 1} / {FEATURED.length}
                </span>
              </Tile>
            ))}
            <Link
              to="/gallery"
              className="flex aspect-[4/5] w-[60vw] shrink-0 snap-center flex-col items-center justify-center border border-white/15 text-white"
            >
              <Images size={28} className="text-[#D4A574]" />
              <span className="mt-3 text-center text-[11px] font-black uppercase tracking-[0.2em]">
                See all
                <br />
                {PHOTOS.length} photos
              </span>
            </Link>
          </div>

          {/* progress dots */}
          <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
            {FEATURED.map((p, i) => (
              <span
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-[#D4A574]' : 'w-1.5 bg-white/25'}`}
              />
            ))}
          </div>

          <Link
            to="/gallery"
            className="mt-7 flex min-h-12 items-center justify-center gap-2 border border-[#D4A574] text-[11px] font-black uppercase tracking-[0.22em] text-[#D4A574]"
          >
            View all {PHOTOS.length} photos <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {openAt !== null && (
        <Lightbox photos={PHOTOS} index={openAt} onClose={() => setOpenAt(null)} onNavigate={setOpenAt} />
      )}
    </section>
  );
};

export default Gallery;
