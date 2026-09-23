import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/*
  Reads the OS setting and keeps listening, so toggling it mid-session takes
  effect without a reload. Initialised from a function so the first render
  already has the right answer and motion never starts before being cancelled.
*/
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
};

export default usePrefersReducedMotion;
