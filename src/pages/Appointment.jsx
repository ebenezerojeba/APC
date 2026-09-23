import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react';

const PURPOSE_OPTIONS = [
  'Party Affairs & Governance',
  'Community Development',
  'Business & Investment',
  'Media & Press',
  'Youth & Women Affairs',
  'Official Delegation',
  'Personal Matter',
  'Other',
];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const EMPTY = {
  fullName: '',
  phone: '',
  email: '',
  organization: '',
  purpose: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

const API_BASE = (() => {
  const raw = import.meta.env.VITE_API_URL;
  return raw && raw !== 'undefined'
    ? raw.replace(/\/$/, '')
    : 'https://apcbackend.vercel.app/api';
})();

const FIELD =
  'w-full min-h-11 border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#D4A574] focus:bg-white/[0.07]';

const Label = ({ htmlFor, children, required }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
  >
    {children}
    {required && (
      <span className="ml-1 text-[#D4A574]" aria-hidden="true">
        *
      </span>
    )}
  </label>
);

const Appointment = () => {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Nobody can usefully request a meeting in the past.
  const today = new Date().toISOString().split('T')[0];

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.purpose) {
      setError('Please fill in your name, phone number and the purpose of your visit.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setError('');
    setForm(EMPTY);
  };

  return (
    <main className="bg-[#04100A] px-4 pb-20 pt-28 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-3xl">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 outline-none transition-colors hover:text-white focus-visible:text-white"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D4A574]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574] sm:text-[11px]">
              Office of the Chairman
            </span>
          </div>

          <h1
            className="mt-5 font-black uppercase leading-[0.9] text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.25rem, 7vw, 4.5rem)',
            }}
          >
            <span className="block">Request an</span>
            <span className="block text-[#4ADE80]">Appointment</span>
          </h1>

          <p className="mt-5 max-w-lg leading-relaxed text-white/60">
            For official meetings, party consultations and matters of governance. All requests are
            reviewed by the Chairman&apos;s office.
          </p>
        </header>

        {submitted ? (
          <div
            className="mt-12 border border-[#00A651]/40 bg-[#00A651]/10 px-6 py-12 text-center sm:px-10"
            role="status"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#4ADE80]/50 bg-[#00A651]/20">
              <Check size={24} className="text-[#4ADE80]" />
            </span>
            <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">Request received</h2>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-white/60">
              Your appointment request has been received. The Chairman&apos;s office will contact
              you on the phone number you provided.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex min-h-11 items-center justify-center border border-white/30 px-6 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-white outline-none transition-colors hover:border-white hover:bg-white hover:text-[#0b0b0b] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A]"
            >
              Submit another request
            </button>
          </div>
        ) : (
          /* A real form element: Enter submits, and the browser can help. */
          <form onSubmit={submit} noValidate className="mt-12">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName" required>Full name</Label>
                <input
                  id="fullName" name="fullName" type="text" required
                  autoComplete="name"
                  value={form.fullName} onChange={change}
                  placeholder="Enter your full name" className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="phone" required>Phone number</Label>
                <input
                  id="phone" name="phone" type="tel" required
                  autoComplete="tel" inputMode="tel"
                  value={form.phone} onChange={change}
                  placeholder="+234 800 000 0000" className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <input
                  id="email" name="email" type="email"
                  autoComplete="email" inputMode="email"
                  value={form.email} onChange={change}
                  placeholder="your@email.com" className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="organization">Organisation</Label>
                <input
                  id="organization" name="organization" type="text"
                  autoComplete="organization"
                  value={form.organization} onChange={change}
                  placeholder="Company, party unit, LGA…" className={FIELD}
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="purpose" required>Purpose of visit</Label>
                <select
                  id="purpose" name="purpose" required
                  value={form.purpose} onChange={change}
                  className={`${FIELD} appearance-none`}
                >
                  <option value="" className="bg-[#04100A]">Select a purpose</option>
                  {PURPOSE_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-[#04100A]">{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="preferredDate">Preferred date</Label>
                <input
                  id="preferredDate" name="preferredDate" type="date"
                  min={today}
                  value={form.preferredDate} onChange={change}
                  className={`${FIELD} [color-scheme:dark]`}
                />
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred time</Label>
                <select
                  id="preferredTime" name="preferredTime"
                  value={form.preferredTime} onChange={change}
                  className={`${FIELD} appearance-none`}
                >
                  <option value="" className="bg-[#04100A]">Select a time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#04100A]">{t}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="message">Details</Label>
                <textarea
                  id="message" name="message" rows={5}
                  value={form.message} onChange={change}
                  placeholder="Briefly describe the purpose of your visit…"
                  className={`${FIELD} resize-y`}
                />
              </div>
            </div>

            {/* role="alert" so the failure is announced, not just coloured red. */}
            {error && (
              <p
                role="alert"
                className="mt-6 flex items-start gap-2.5 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/35">
                <span className="text-[#D4A574]">*</span> Required fields
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#D4A574] bg-[#D4A574] px-8 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#0b0b0b] outline-none transition-colors duration-200 hover:bg-transparent hover:text-[#D4A574] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04100A] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#D4A574] disabled:hover:text-[#0b0b0b]"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? 'Sending…' : 'Submit request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default Appointment;
