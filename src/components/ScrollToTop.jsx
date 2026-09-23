import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  Router keeps scroll position across route changes, so navigating to /join
  from halfway down the home page landed you halfway down /join.

  A hash is honoured rather than overridden: links like
  /resources/apc-constitution#organs arrive on a route that is mounting for
  the first time, so the target does not exist yet on this tick - hence the
  rAF before looking for it. Without that, every deep link silently landed at
  the top of the page.
*/
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
