import { LAGOS_COLOURS } from '../data/lagosColours';

/*
  The four Lagos State bands.

  One mark, used both for the rule under the navbar and for the mark that
  opens each section, so the two can never drift apart.
*/
const LagosMark = ({ className = '' }) => (
  <span className={`flex overflow-hidden ${className}`} aria-hidden="true">
    {LAGOS_COLOURS.map((colour) => (
      <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
    ))}
  </span>
);

export default LagosMark;
