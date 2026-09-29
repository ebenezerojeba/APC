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

  /*
    Below sm the frame is a band across the top, not the whole viewport, and
    the photograph is CONTAINED inside it.

    These are 3:2 landscapes. Filling a ~0.46 phone viewport with object-cover
    threw away roughly 70% of the width, which cut the Chairman out of the
    frame he shares with the President entirely. Containing it keeps every
    subject in shot; the copy then sits on solid ground beneath.
  */
  return (
    <div
      className="absolute inset-x-0 top-0 h-[38vh] overflow-hidden sm:inset-0 sm:h-auto"
      aria-hidden="true"
    >
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
            className="absolute inset-0 h-full w-full scale-100 object-contain object-top will-change-transform sm:scale-[var(--kb)] sm:object-cover sm:object-[var(--focus)]"
            style={{
              // Custom property so the per-slide focal point applies only from
              // sm up, where the image is cropped; an inline objectPosition
              // would also hit the contained mobile frame.
              '--focus': slide.focus,
              // Ken Burns: the slow push only runs while the slide is showing.
              // Applied from sm up only — scaling a CONTAINED image would push
              // it past the clip and undo the point of containing it.
              '--kb': reducedMotion || !active ? 1 : 1.075,
              opacity: active ? 1 : 0,
              transition: reducedMotion
                ? `opacity ${FADE_MS}ms ease`
                : `opacity ${FADE_MS}ms ease, scale ${SLIDE_MS + FADE_MS}ms linear`,
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
