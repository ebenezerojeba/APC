import { toDate } from '../../data/campaign';
import { useNow } from './dates';

/*
  Days / hours / minutes / seconds to 8:00 AM on `iso`, when polls open.
  Each unit is a fixed-width cell with tabular figures so the row does not
  jitter as the seconds tick.
*/
const Countdown = ({ iso, tone = 'light', className = '' }) => {
  const now = useNow(1000);
  const target = toDate(iso);
  target.setHours(8, 0, 0, 0);
  const diff = Math.max(0, target - now);

  const units = [
    ['Days', Math.floor(diff / 86400000)],
    ['Hrs', Math.floor(diff / 3600000) % 24],
    ['Min', Math.floor(diff / 60000) % 60],
    ['Sec', Math.floor(diff / 1000) % 60],
  ];

  const dark = tone === 'dark';

  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`} role="timer" aria-label={`${units[0][1]} days to go`}>
      {units.map(([label, value]) => (
        <div
          key={label}
          className={`min-w-[4.25rem] border px-3 py-2.5 text-center sm:min-w-[5.5rem] sm:px-4 sm:py-3 ${
            dark ? 'border-gray-200 bg-white' : 'border-white/15 bg-white/[0.04]'
          }`}
        >
          <span
            className={`block leading-none tabular-nums ${dark ? 'text-gray-900' : 'text-white'}`}
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.25rem)' }}
          >
            {String(value).padStart(2, '0')}
          </span>
          <span className={`mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] ${dark ? 'text-gray-400' : 'text-white/45'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
