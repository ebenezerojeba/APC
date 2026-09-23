import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <main className="flex min-h-[70vh] items-center bg-[#06170D] px-5 py-24 sm:px-8">
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A574]">
        Error 404
      </p>

      <h1
        className="mt-5 text-4xl font-black uppercase leading-[0.95] text-white sm:text-6xl"
        style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
      >
        Page not found
      </h1>

      <span className="mt-6 block h-px w-24 bg-gradient-to-r from-[#00A651] to-transparent" />

      <p className="mt-6 max-w-md leading-relaxed text-white/70">
        That page has moved or never existed. Everything on this site is reachable
        from the home page.
      </p>

      <div className="mt-9 flex flex-col gap-3 min-[400px]:flex-row">
        <Link
          to="/"
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D4A574] px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#111] outline-none transition-colors duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D]"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to home
        </Link>

        <Link
          to="/appointment"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white outline-none transition-colors duration-200 hover:border-[#00A651] hover:bg-[#00A651] focus-visible:ring-2 focus-visible:ring-[#00A651] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06170D]"
        >
          Book an appointment
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;
