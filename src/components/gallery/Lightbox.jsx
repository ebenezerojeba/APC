import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const SWIPE_THRESHOLD = 50;

const Lightbox = ({ photos, index, onClose, onNavigate }) => {
  const dialogRef = useRef(null);
  const touchStartX = useRef(null);

  const photo = photos[index];

  /*
    Track WHICH photo has decoded rather than a boolean reset in an effect.
    Deriving it means moving to a new photo is already "not loaded" on the
    render that shows it, with no second pass and no flash of the old frame.
  */
  const [loadedId, setLoadedId] = useState(null);
  const loaded = loadedId === photo?.id;
  const atStart = index === 0;
  const atEnd = index === photos.length - 1;

  const prev = useCallback(() => { if (index > 0) onNavigate(index - 1); }, [index, onNavigate]);
  const next = useCallback(() => { if (index < photos.length - 1) onNavigate(index + 1); }, [index, photos.length, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  /*
    Lock the page behind the overlay and hand focus to the dialog, then give
    focus back to whatever opened it. Without the restore, dismissing the
    lightbox drops keyboard users back at the top of the document.
  */
  useEffect(() => {
    const opener = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  // Preload the neighbours so arrowing through does not flash a spinner.
  useEffect(() => {
    [photos[index - 1], photos[index + 1]].forEach((p) => {
      if (!p) return;
      const img = new Image();
      img.srcset = p.srcSet;
      img.src = p.full;
    });
  }, [index, photos]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > SWIPE_THRESHOLD) prev();
    else if (dx < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  };

  if (!photo) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#04100A]/97 outline-none backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Bar */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          <span className="tabular-nums text-white">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-1.5">/</span>
          <span className="tabular-nums">{String(photos.length).padStart(2, '0')}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
        {!loaded && (
          <div className="absolute h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        )}
        <img
          key={photo.id}
          src={photo.full}
          srcSet={photo.srcSet}
          sizes="(max-width: 640px) 100vw, 90vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          onLoad={() => setLoadedId(photo.id)}
          className={`max-h-full w-auto max-w-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />

        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="Previous photo"
          className="absolute left-1 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white outline-none transition hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-0 sm:left-3"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          aria-label="Next photo"
          className="absolute right-1 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white outline-none transition hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-0 sm:right-3"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
