// import React from 'react'
// import { motion } from 'framer-motion';

// const Footer = ({scrollToSection}) => {
// const footerLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Join Us', 'Contact'];

//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-wrap justify-center gap-8 mb-8">
//           {footerLinks.map(link => (
//             <motion.button
//               key={link}
//               onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
//               className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
//               whileHover={{ y: -3 }}
//             >
//               {link}
//             </motion.button>
//           ))}
//         </div>
//         <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
//           <p>&copy; 2026 Leaders for Lagos. All rights reserved. | Built for the people, by the people.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer
import React from 'react';
import { motion } from 'framer-motion';
import assets from '../assets/assets';

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  const footerLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Join Us'];

  return (
    <footer className="bg-[#0a0f0d] text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          
          {/* Minimal Logo */}
          <motion.img 
            src={assets.apc2} 
            alt="APC Logo" 
            className="h-12 w-auto mb-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => scrollToSection('home')}
          />

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {footerLinks.map((link) => (
              <motion.button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase().replace(/\s+/g, ''))}
                className="text-gray-400 hover:text-amber-400 transition-colors text-sm font-bold uppercase tracking-widest"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.button>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-8" />

          {/* Copyright & Credits */}
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
              &copy; {currentYear} APC Lagos State. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-600 uppercase tracking-tighter">
              Built for the people, by the people.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;