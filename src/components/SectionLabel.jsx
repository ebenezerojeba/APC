const TONE = {
  gold: 'text-[#D4A574]',
  green: 'text-[#008A44]',
  muted: 'text-gray-400',
};

/*
  The mark before a section label.

  Green / white / green at 1:2 — the Nigerian flag, and the Party's green. It
  replaces the hairline rule that opened all nine sections identically. A dot,
  slash or bracket would have been the same decoration in a different costume;
  this one belongs to this site and nowhere else.

  On light grounds `onDark` is false and the centre band is left transparent,
  so the page itself supplies the white stripe.
*/
const SectionLabel = ({
  children,
  tone = 'gold',
  onDark = true,
  as: Tag = 'h2',
  className = '',
}) => (
  <Tag
    className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${TONE[tone]} ${className}`}
  >
    <span className="flex h-2.5 w-5 shrink-0 overflow-hidden" aria-hidden="true">
      <span className="w-1/3 bg-[#008A44]" />
      <span className={`w-1/3 ${onDark ? 'bg-white' : 'bg-transparent'}`} />
      <span className="w-1/3 bg-[#008A44]" />
    </span>
    {children}
  </Tag>
);

export default SectionLabel;
