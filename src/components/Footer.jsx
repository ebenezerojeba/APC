import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

/*
  `id` scrolls to a home-page section (navigating home first if needed);
  `to` opens another page.
*/
const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Priorities', id: 'priorities' },
  { label: 'Campaign', to: '/campaign' },
  { label: 'News', id: 'news' },
  { label: 'Contact', id: 'contact' },
  { label: 'Join Us', to: '/join' },
];

const Footer = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const go = ({ id, to }) => (to ? navigate(to) : scrollToSection(id));

  return (
    <footer className="border-t border-white/5 bg-[#0a0f0d] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <button type="button" onClick={() => scrollToSection('home')} aria-label="Back to top" className="mb-8">
            <img src={assets.apc2} alt="APC Logo" className="h-12 w-auto opacity-80 transition-opacity hover:opacity-100" />
          </button>

          <nav aria-label="Footer" className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {LINKS.map((link) => (
              <motion.button
                key={link.label}
                type="button"
                onClick={() => go(link)}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-amber-400"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="mb-8 h-px w-full max-w-md bg-linear-to-r from-transparent via-gray-700 to-transparent" />

          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500">
            &copy; {new Date().getFullYear()} APC Lagos State. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
