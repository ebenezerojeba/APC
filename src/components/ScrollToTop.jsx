import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  Router keeps scroll position across route changes, so navigating to /join
  from halfway down the home page landed you halfway down /join.

  Keyed on pathname only: in-page anchors (?query / #hash) must not trigger a
  jump, or the navbar's scrollToSection would be undone the moment it ran.
*/
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
