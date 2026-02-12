// import React from 'react';
// import { motion } from 'framer-motion';
// import { Award, Briefcase, Heart } from 'lucide-react';
// import assets from '../assets/assets';

// const About = () => {
//  const achievements = [
//     { 
//       icon: Award, 
//       title: 'Education Champion', 
//       desc: 'Established 15 scholarship programs benefiting over 5,000 students' 
//     },
//     { 
//       icon: Briefcase, 
//       title: 'Economic Empowerment', 
//       desc: 'Created skills acquisition centers in 10 LGAs, training 10,000+ youths' 
//     },
//     { 
//       icon: Heart, 
//       title: 'Healthcare Access', 
//       desc: 'Championed free medical outreach programs reaching 25,000+ residents annually' 
//     }
//   ];

//   return (
//     <section id="about" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <motion.div
//               className="absolute -right-6 -bottom-6 w-full h-full bg-amber-400 rounded-3xl -z-10"
//               animate={{ 
//                 x: [0, 10, 0],
//                 y: [0, 10, 0]
//               }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             />
//             <img
//             src={assets.oj12}
//             //   src="data:image/svg+xml,%3Csvg width='600' height='700' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='600' height='700' fill='%23047857'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23FFF8E7' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3EChairman Photo%3C/text%3E%3C/svg%3E"
//               alt="Chairman"
//               className="w-full rounded-3xl shadow-2xl relative z-10"
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-5xl font-black text-emerald-700 mb-6" style={{ fontFamily: 'Impact, sans-serif' }}>
//               Meet the Chairman
//             </h2>
//             <p className="text-lg text-gray-700 mb-6 leading-relaxed">
//               A visionary leader with over two decades of dedicated service to Lagos State. From grassroots activism to policy implementation, our chairman has consistently championed the cause of ordinary Lagosians.
//             </p>
//             <p className="text-lg text-gray-700 mb-8 leading-relaxed">
//               Born and raised in Lagos, he understands the challenges facing our communities—from traffic congestion to housing shortages, from youth unemployment to inadequate infrastructure.
//             </p>

//             <div className="space-y-4">
//               {achievements.map((achievement, index) => (
//                 <motion.div
//                   key={achievement.title}
//                   className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border-l-4 border-emerald-700"
//                   initial={{ opacity: 0, x: -50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ x: 10, backgroundColor: '#FEF3C7' }}
//                 >
//                   <achievement.icon className="text-amber-400 flex-shrink-0 mt-1" size={32} />
//                   <div>
//                     <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
//                     <p className="text-gray-600">{achievement.desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About


import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Heart, BookOpen, Users, MapPin } from 'lucide-react';
import assets from '../assets/assets';

const About = () => {
  // Actual historical achievements of Pastor Cornelius Ojelabi
  const achievements = [
    { 
      icon: Users, 
      title: 'Grassroots Mobilizer', 
      desc: 'Former Chairman of Ojo LG and Oto-Awori LCDA, pioneered grassroots daycare and health centers.' 
    },
    { 
      icon: Briefcase, 
      title: 'State Executive Experience', 
      desc: 'Former Commissioner for Rural Development; transformed neighborhood watch and rural road networks.' 
    },
    { 
      icon: BookOpen, 
      title: 'Youth & Sports Patron', 
      desc: 'Founder of the Ojelabi Foundation, bankrolling scholarships and biennial secondary school sports championships.' 
    }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#008A44]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <img
                src={assets.oj13} // Actual asset path
                alt="Pastor Cornelius Ojelabi"
                className="w-full rounded-[2rem] shadow-2xl border-8 border-white object-cover aspect-[4/5]"
              />
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border-l-8 border-[#008A44] hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-[#008A44] font-black text-3xl italic">25+</p>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-tight">Years of Public Service</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-[#008A44] font-bold uppercase tracking-widest mb-4">
              <div className="w-10 h-[2px] bg-[#008A44]"></div>
              <span>The People's Chairman</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Impact, sans-serif' }}>
              Meet Pastor <br/>
              <span className="text-[#008A44]">Cornelius Ojelabi</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
              <p>
                A graduate of History and International Relations from LASU, Pastor Cornelius Ojelabi is a seasoned administrator who rose through the ranks—from a Sunday School teacher to a federal lawmaker and Lagos State Commissioner.
              </p>
              <p>
                As the State Chairman of the APC, he is the "manager of men" tasked with unifying the party and driving the <strong>Renewed Hope</strong> agenda across all 20 LGAs and 37 LCDAs in Lagos.
              </p>
            </div>

            {/* Achievement Grid */}
            <div className="grid gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-5 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-amber-400 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-[#008A44] shrink-0">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;