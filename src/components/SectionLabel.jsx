import LagosMark from './LagosMark';

const TONE = {
  gold: 'text-[#D4A574]',
  green: 'text-[#008A44]',
  muted: 'text-gray-400',
};

/*
  The mark before a section label.

  The Lagos State colours, the same four bands that run under the navbar. It
  replaced the hairline rule that opened all nine sections identically — a dot,
  slash or bracket would have been the same decoration in a different costume,
  whereas this belongs to the State he chairs and to nowhere else.
*/
const SectionLabel = ({ children, tone = 'gold', as: Tag = 'h2', className = '' }) => (
  <Tag
    className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${TONE[tone]} ${className}`}
  >
    <LagosMark className="h-2.5 w-6 shrink-0" />
    {children}
  </Tag>
);

export default SectionLabel;
