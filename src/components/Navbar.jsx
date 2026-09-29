import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  
  // Subtle transparency effect on scroll
  const headerBg = useTransform(
    scrollYProgress, 
    [0, 0.05], 
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'priorities', 'gallery', 'news', 'events', 'road-ahead', 'resources', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust 120 based on your navbar height
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*
    Label and id are separate now: "2027" scrolls to #road-ahead, "Documents"
    to #resources. Deriving the id from the label silently broke both.
    NAV_FULL is the mobile list; the desktop bar shows a subset that fits.
  */
  const NAV_FULL = [
    { label: 'About', id: 'about' },
    { label: 'Priorities', id: 'priorities' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'News', id: 'news' },
    { label: 'Events', id: 'events' },
    { label: '2027', id: 'road-ahead' },
    { label: 'Documents', id: 'resources' },
    { label: 'Contact', id: 'contact' },
  ];
  const NAV_DESKTOP = NAV_FULL.filter((n) => n.id !== 'events' && n.id !== 'resources');

  // FIXED: Explicitly handle scrolling and state
  const handleNavClick = (id) => {
    scrollToSection(id);
    setActiveSection(id); // Immediate UI feedback
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className="fixed top-0 left-0 right-0 z-100 border-b-4 border-amber-400 shadow-lg backdrop-blur-md"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          
         {/* LOGO & BRANDING */}
<motion.div
  onClick={() => navigate('/')}
  className="flex items-center gap-3 cursor-pointer flex-shrink-0"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
>
  <img
    src={assets.logo1}
    alt="APC Logo"
    className="h-20 w-auto sm:h-18 md:h-16 lg:h-18 transition-all duration-200"
  />
</motion.div>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex lg:space-x-4 xl:space-x-6">
            {NAV_DESKTOP.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  className={`px-1.5 py-1 font-bold text-sm uppercase transition-colors relative group ${
                    activeSection === id ? 'text-[#008A44]' : 'text-gray-600 hover:text-[#008A44]'
                  }`}
                >
                  {label}
                  {/* Underline Indicator */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              </li>
            ))}
          </ul>

          {/* CTAs — booking is a primary action, so it lives in the bar and
              is reachable from every page, not buried in one section. */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => navigate('/appointment')}
              className="cursor-pointer whitespace-nowrap rounded-full border-2 border-[#008A44] px-5 py-2 text-sm font-bold text-[#008A44] transition-colors hover:bg-[#008A44] hover:text-white focus-visible:ring-2 focus-visible:ring-[#008A44] focus-visible:ring-offset-2"
            >
              APPOINTMENT
            </button>
            <motion.button
              onClick={() => navigate('/join')}
              className="bg-[#008A44] cursor-pointer whitespace-nowrap text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-emerald-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VOLUNTEER
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#008A44] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b-4 border-amber-400 shadow-2xl lg:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {NAV_FULL.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`text-left min-h-11 py-3 text-sm font-black uppercase border-b border-gray-100 ${
                    activeSection === id ? 'text-[#008A44]' : 'text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/appointment'); }}
                className="mt-4 min-h-11 cursor-pointer rounded-xl border-2 border-[#008A44] py-4 text-center font-black uppercase text-[#008A44]"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/join'); }}
                className="min-h-11 bg-amber-400 cursor-pointer text-gray-900 py-4 rounded-xl font-black uppercase text-center"
              >
                Become a Member
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;


