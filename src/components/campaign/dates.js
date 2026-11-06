import { useEffect, useState } from 'react';
import { toDate } from '../../data/campaign';

const DAY = 86400000;

export const startOfToday = (now = new Date()) => {
  const t = new Date(now);
  t.setHours(0, 0, 0, 0);
  return t;
};

// Whole days from today to `iso` (0 = today, negative = past).
export const daysUntil = (iso, now = new Date()) =>
  Math.round((toDate(iso) - startOfToday(now)) / DAY);

export const fmt = (iso, opts) => new Intl.DateTimeFormat('en-GB', opts).format(toDate(iso));
export const fmtLong = (iso) => fmt(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const fmtDay = (iso) => fmt(iso, { weekday: 'short' });
export const fmtDayNum = (iso) => fmt(iso, { day: 'numeric' });
export const fmtMonth = (iso) => fmt(iso, { month: 'short' });

export const relative = (days) => {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  return days > 0 ? `In ${days} days` : `${-days} days ago`;
};

// Google Calendar link for an all-day item (end date is exclusive).
export const calendarLink = ({ title, date, dateEnd, venue, details = '' }) => {
  const s = date.replace(/-/g, '');
  const end = toDate(dateEnd || date);
  end.setDate(end.getDate() + 1);
  const e = `${end.getFullYear()}${String(end.getMonth() + 1).padStart(2, '0')}${String(end.getDate()).padStart(2, '0')}`;
  const q = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${s}/${e}`, details, location: venue || '' });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
};

/*
  The current time, ticking. One minute is enough for day counts; the
  countdown asks for every second.
*/
export const useNow = (ms = 60000) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
};
