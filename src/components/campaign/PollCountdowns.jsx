import { POLLS } from '../../data/campaign';
import { daysUntil, fmtLong, useNow } from './dates';
import Countdown from './Countdown';

/*
  One countdown per election day: Presidential, then Governorship. Once a
  poll day has passed its clock is replaced by a "held" note rather than
  sitting at 00:00:00:00.

  `layout="row"` puts them side by side on wide screens (Campaign page hero);
  `layout="stack"` keeps them one above the other (home-page teaser).
*/
const PollCountdowns = ({ layout = 'row', className = '' }) => {
  const now = useNow();

  return (
    <div
      className={`flex flex-col gap-8 ${layout === 'row' ? 'xl:flex-row xl:gap-12' : ''} ${className}`}
    >
      {POLLS.map((p, i) => {
        const held = daysUntil(p.date, now) < 0;
        return (
          <div key={p.date} className={i > 0 && layout === 'row' ? 'xl:border-l xl:border-white/12 xl:pl-12' : ''}>
            <p className={`text-[10px] font-black uppercase tracking-[0.24em] ${i === 0 ? 'text-[#4ADE80]' : 'text-[#D4A574]'}`}>
              {p.short} election
            </p>
            <p className="mt-1.5 text-base font-bold text-white sm:text-lg">{p.label}</p>
            <p className="text-sm text-white/50">{fmtLong(p.date)}</p>
            {held ? (
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-white/60">Polls held</p>
            ) : (
              <Countdown iso={p.date} className="mt-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PollCountdowns;
