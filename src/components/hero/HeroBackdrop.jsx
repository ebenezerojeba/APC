import { HERO_SLIDES, SLIDE_MS } from '../../data/heroSlides';

const FADE_MS = 1300;

/*
  The photographic layer.

  Which slides exist in the DOM is derived from the index rather than
  accumulated in state: the outgoing frame (prev) is kept so the crossfade has
  something to fade from, and the upcoming one (next) is mounted a step early
  so it has decoded before its turn. Everything else stays unfetched, so
  opening the page costs one photograph rather than four.
*/
const HeroBackdrop = ({ index, reducedMotion }) => {
  const count = HERO_SLIDES.length;
  const prev = (index - 1 + count) % count;
  const next = (index + 1) % count;
  const isMounted = (i) => i === index || i === next || i === prev;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_SLIDES.map((slide, i) => {
        const active = i === index;
        if (!isMounted(i)) return null;
        return (
          <img
            key={slide.id}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              objectPosition: slide.focus,
              opacity: active ? 1 : 0,
              // Ken Burns: the slow push only runs while the slide is showing.
              transform: reducedMotion ? 'none' : `scale(${active ? 1.075 : 1})`,
              transition: reducedMotion
                ? `opacity ${FADE_MS}ms ease`
                : `opacity ${FADE_MS}ms ease, transform ${SLIDE_MS + FADE_MS}ms linear`,
            }}
          />
        );
      })}

      {/*
        Scrims. Two directional passes rather than one blanket darkening:
        the copy sits bottom-left, so that corner is taken down hard while the
        opposite corner keeps the photograph legible.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#04100A_0%,rgba(4,16,10,0.72)_32%,rgba(4,16,10,0.12)_68%,rgba(4,16,10,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,16,10,0.88)_0%,rgba(4,16,10,0.45)_42%,transparent_78%)]" />
    </div>
  );
};

export default HeroBackdrop;
