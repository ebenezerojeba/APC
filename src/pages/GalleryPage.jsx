import { useEffect, useMemo, useState } from 'react';

import { PHOTOS, CATEGORIES } from '../data/galleryPhotos';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Lightbox from '../components/gallery/Lightbox';
import SectionLabel from '../components/SectionLabel';

/*
  The full photo archive, with category filters. The home page shows a short
  curated selection and links here.
*/
const GalleryPage = () => {
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

  useEffect(() => {
    const prev = document.title;
    document.title = 'Gallery | Hon. Cornelius Ojelabi';
    return () => { document.title = prev; };
  }, []);

  const selectFilter = (id) => {
    setFilter(id);
    setOpenAt(null);
  };

  return (
    <main className="min-h-screen bg-[#06170D] pb-20 pt-32 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white">
          <ArrowLeft size={14} /> Home
        </Link>
        <header className="max-w-3xl">
          <SectionLabel as="p" tone="gold" className="mb-4">
            The Archive
          </SectionLabel>
          <h1
            className="text-5xl font-black uppercase leading-[0.95] text-white md:text-7xl"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Moments
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-white/60">
            {PHOTOS.length} photographs from the Chairman&apos;s work across Lagos State: at the
            podium, in the field, and around the table.
          </p>
        </header>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter photographs by category"
          className="sticky top-[88px] z-20 -mx-4 mt-9 flex gap-2 overflow-x-auto bg-[#06170D]/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-11 sm:flex-wrap sm:bg-transparent sm:px-0 sm:py-0"
        >
          {categories.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectFilter(id)}
                aria-pressed={active}
                className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 text-[11px] font-bold uppercase tracking-[0.18em] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#D4A574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D] ${
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
    </main>
  );
};

export default GalleryPage;
