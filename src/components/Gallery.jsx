import { useMemo, useState } from 'react';

import { PHOTOS, CATEGORIES } from '../data/galleryPhotos';
import Lightbox from './gallery/Lightbox';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [openAt, setOpenAt] = useState(null);

  const photos = useMemo(
    () => (filter === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === filter)),
    [filter],
  );

  // Only offer a filter that actually has photos behind it.
  const categories = useMemo(
    () => CATEGORIES.filter((c) => c.id === 'all' || PHOTOS.some((p) => p.category === c.id)),
    [],
  );

  const selectFilter = (id) => {
    setFilter(id);
    setOpenAt(null);
  };

  return (
    <section id="gallery" className="bg-[#06170D] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <header className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">
            <span className="h-px w-8 bg-[#D4A574]" />
            The Archive
          </div>
          <h2
            className="text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Moments
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-white/60">
            {PHOTOS.length} photographs from the Chairman&apos;s work across Lagos State — at the
            podium, in the field, and around the table.
          </p>
        </header>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter photographs by category"
          className="mt-9 flex flex-wrap gap-2 sm:mt-11"
        >
          {categories.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectFilter(id)}
                aria-pressed={active}
                className={`min-h-11 rounded-full px-5 text-[11px] font-bold uppercase tracking-[0.18em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D] ${
                  active
                    ? 'bg-[#D4A574] text-[#111]'
                    : 'border border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/*
          CSS columns rather than a JS masonry: the photographs have mixed
          portrait and landscape ratios, and this keeps every one uncropped
          with no measuring pass and nothing to recalculate on resize.
        */}
        <div className="mt-8 columns-2 gap-3 sm:mt-10 sm:columns-3 sm:gap-4 lg:columns-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open ${photo.alt}, photo ${i + 1} of ${photos.length}`}
              className="group mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D] sm:mb-4"
            >
              <div className="relative overflow-hidden bg-white/5">
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  /* Intrinsic w/h reserve the row height, so columns never reflow. */
                  className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="pointer-events-none absolute inset-0 bg-[#06170D]/0 transition-colors duration-300 group-hover:bg-[#06170D]/25" />
              </div>
            </button>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="mt-12 text-center text-white/50">No photographs in this category yet.</p>
        )}
      </div>

      {openAt !== null && (
        <Lightbox
          photos={photos}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onNavigate={setOpenAt}
        />
      )}
    </section>
  );
};

export default Gallery;
