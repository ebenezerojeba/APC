// import React from 'react';
// import { motion } from 'framer-motion';
// import assets from '../assets/assets';

// const Footer = ({ scrollToSection }) => {
//   const currentYear = new Date().getFullYear();
//   const footerLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Join Us'];

//   return (
//     <footer className="bg-[#0a0f0d] text-white py-12 border-t border-white/5">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center">
          
//           {/* Minimal Logo */}
//           <motion.img 
//             src={assets.apc2} 
//             alt="APC Logo" 
//             className="h-12 w-auto mb-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
//             onClick={() => scrollToSection('home')}
//           />

//           {/* Navigation */}
//           <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
//             {footerLinks.map((link) => (
//               <motion.button
//                 key={link}
//                 onClick={() => scrollToSection(link.toLowerCase().replace(/\s+/g, ''))}
//                 className="text-gray-400 hover:text-amber-400 transition-colors text-sm font-bold uppercase tracking-widest"
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {link}
//               </motion.button>
//             ))}
//           </nav>

//           {/* Divider */}
//           <div className="w-full max-w-md h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-8" />

//           {/* Copyright & Credits */}
//           <div className="text-center space-y-2">
//             <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
//               &copy; {currentYear} APC Lagos State. All Rights Reserved.
//             </p>
//             <p className="text-[10px] text-gray-600 uppercase tracking-tighter">
//               Built for the people, by the people.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { motion } from 'framer-motion';
import assets from '../assets/assets';

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  const footerLinks = ['Home', 'About', 'Vision', 'News', 'Events', 'Join Us'];

  const developers = [
    { name: 'Alabi', url: 'https://portfolio-website-opal-nine-30.vercel.app/' },
    { name: 'Ojeba', url: 'https://ebenezerojeba.vercel.app/' },
  ];

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
            {/* <p className="text-[10px] text-gray-600 uppercase tracking-tighter">
              Built for the people, by the people.
            </p> */}

            {/* Developer Credits */}
            <p className="text-[10px] text-gray-600 uppercase tracking-tighter pt-1">
              Designed &amp; Built by{' '}
              {developers.map((dev, index) => (
                <React.Fragment key={dev.name}>
                  <motion.a
                    href={dev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 transition-colors duration-200 underline underline-offset-2 decoration-dotted"
                    whileHover={{ y: -1 }}
                  >
                    {dev.name}
                  </motion.a>
                  {index < developers.length - 1 && (
                    <span className="text-gray-700 mx-1">&amp;</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;