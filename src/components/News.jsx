// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, Calendar, Newspaper, Play } from 'lucide-react';

// const News = () => {
//   const [playing, setPlaying] = useState(false);

//   const newsArticles = [
//     {
//       date: 'Feb 10, 2026',
//       category: 'Mobilization',
//       title: 'Ojelabi Urges Unity at Lagos East Mega Rally',
//       desc: 'Lagos APC Chairman, Pastor Cornelius Ojelabi, calls for internal cohesion and grassroots mobilization to consolidate the partys achievements.'
//     },
//     {
//       date: 'Feb 5, 2026',
//       category: 'Registration',
//       title: 'Lagos Leads in Nationwide APC E-Registration',
//       desc: 'The Chairman commends the Ikorodu division and others for record-breaking numbers in the ongoing digital party membership enrollment.'
//     },
//     {
//       date: 'Jan 28, 2026',
//       category: 'Governance',
//       title: 'Chairman Reviews Local Govt Election Readiness',
//       desc: 'Official briefing confirming election schedules for all 20 LGAs and 37 LCDAs, emphasizing the party\'s commitment to grassroots democracy.'
//     }
//   ];

//   return (
//     <section id="news" className="py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Section Header */}
//         <motion.div
//           className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <div className="max-w-2xl">
//             <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider mb-2">
//               <Newspaper size={20} />
//               <span>Media Center</span>
//             </div>
//             <h2 className="text-4xl md:text-6xl font-black text-[#008A44] uppercase leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>
//               Latest From The <br /> <span className="text-gray-900">Secretariat</span>
//             </h2>
//           </div>
//           <button className="hidden md:flex items-center gap-2 text-[#008A44] font-bold border-b-2 border-[#008A44] pb-1 hover:text-amber-500 hover:border-amber-500 transition-all">
//             View All Press Releases <ChevronRight size={20} />
//           </button>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-12">

//           {/* Featured Video */}
//           <motion.div
//             className="lg:col-span-2"
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//           >
//             <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
//               <iframe
//                 className="absolute inset-0 w-full h-full"
//                 src={`https://www.youtube-nocookie.com/embed/RFKid4BdQbg?rel=0&modestbranding=1${playing ? '&autoplay=1' : ''}`}
//                 title="Lagos APC Chairman"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />

//               {/* Overlay — hides completely once user taps play */}
//               {!playing && (
//                 <div
//                   className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 cursor-pointer"
//                   style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
//                   onClick={() => setPlaying(true)}
//                 >
//                   {/* Play button — centered */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/60 hover:bg-white/30 transition-all">
//                       <Play size={24} className="text-white fill-white ml-1" />
//                     </div>
//                   </div>

//                   {/* Text — bottom, hidden on small screens when it would cover controls */}
//                   <div className="hidden sm:block">
//                     <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md w-fit mb-3 inline-block">
//                       FEATURED VIDEO
//                     </span>
//                     <h3 className="text-xl md:text-3xl font-bold text-white mb-2 italic">
//                       Building a Greater Lagos Together
//                     </h3>
//                     <p className="text-gray-300 text-sm max-w-lg">
//                       Pastor Cornelius Ojelabi outlines the strategic vision for the 2026-2027 political cycle.
//                     </p>
//                   </div>

//                   {/* On mobile: just show the badge, no text blocking the video area */}
//                   <div className="sm:hidden">
//                     <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md w-fit inline-block">
//                       FEATURED VIDEO
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Caption below video on mobile (moved out of the overlay) */}
//             <div className="sm:hidden mt-3 px-1">
//               <h3 className="text-lg font-bold text-gray-900 italic">Building a Greater Lagos Together</h3>
//               <p className="text-gray-500 text-sm mt-1">
//                 Pastor Cornelius Ojelabi outlines the strategic vision for the 2026-2027 political cycle.
//               </p>
//             </div>
//           </motion.div>

//           {/* News Feed */}
//           <div className="space-y-8">
//             {newsArticles.map((news, index) => (
//               <motion.div
//                 key={index}
//                 className="group cursor-pointer"
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="flex items-center gap-3 text-xs font-bold text-amber-600 mb-2 uppercase">
//                   <Calendar size={14} />
//                   {news.date}
//                   <span className="text-gray-300">|</span>
//                   <span className="text-[#008A44]">{news.category}</span>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#008A44] transition-colors mb-2">
//                   {news.title}
//                 </h4>
//                 <p className="text-gray-600 text-sm line-clamp-2">{news.desc}</p>
//                 <div className="mt-4 w-10 h-1 bg-gray-100 group-hover:w-20 group-hover:bg-amber-400 transition-all duration-300" />
//               </motion.div>
//             ))}

//             <button className="w-full md:hidden bg-[#008A44] text-white py-4 rounded-xl font-bold">
//               Read More News
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default News;



import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, ArrowUpRight, Play, X, Share2, Clock } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    date: 'Mar 4, 2026',
    category: 'Official Statement',
    categoryColor: 'bg-red-100 text-red-700',
    title: 'Lagos APC Debunks False Report on SLG Recall',
    excerpt: 'The Lagos State APC has categorically denied reports claiming the State Chairman recalled all SLGs and supervisors to Acme in connection with alleged Villa directives.',
    fullContent: {
      author: 'Mogaji (Hon) Seye Oladejo',
      role: 'Lagos APC Spokesman',
      date: '04/03/26',
      paragraphs: [
        'The Lagos State Chapter of the All Progressives Congress (APC) has been made aware of reports claiming that the State Chairman has recalled all SLGs and supervisors to Acme in connection with directives allegedly issued at the Villa.',
        'We wish to categorically state that this report is false, misleading, and clearly intended to create unnecessary tension within our party and among the public.',
        'At no time did the State Chairman issue any such directive, nor is there any emergency meeting scheduled as being speculated. The Lagos APC remains a disciplined, transparent, and law-abiding political party, guided strictly by due process and collective decision-making.',
        'Our primary focus at this critical time remains putting every necessary structure in place as we count down to the forthcoming national elections. We are fully committed to strengthening our internal processes and mobilizing effectively to ensure continued progress and victory at the polls.',
        'We therefore advise party members, supporters, and the general public to desist from spreading or entertaining rumors capable of needlessly heating up the polity. The party will continue to keep the public informed of any official updates through our usual and recognized communication channels.',
      ],
    },
  },
  {
    id: 2,
    date: 'Feb 10, 2026',
    category: 'Mobilization',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    title: 'Ojelabi Urges Unity at Lagos East Mega Rally',
    excerpt: "Lagos APC Chairman, Pastor Cornelius Ojelabi, calls for internal cohesion and grassroots mobilization to consolidate the party's achievements ahead of 2027.",
    fullContent: {
      author: 'Lagos APC Media Unit',
      role: 'Official Press Release',
      date: '10/02/26',
      paragraphs: [
        'Lagos APC Chairman, Pastor Cornelius Ojelabi, delivered a powerful address at the Lagos East Mega Rally, calling on all party members to close ranks and present a united front ahead of the 2027 general elections.',
        "Speaking before thousands of APC faithful gathered at the rally grounds, the Chairman emphasized that the party's greatest strength lies in its unity and its deep roots in every ward across Lagos State.",
        '"Our party is built on a foundation of service, discipline, and shared vision. The time for division is over — the time for victory is now," Chairman Ojelabi declared to thunderous applause.',
        'He also commended ward and local government leaders for their dedication to the Renewed Hope agenda, and urged all members to intensify voter mobilization in their respective areas.',
        "The rally, which drew participants from all 20 LGAs, was a testament to the party's organizational strength and its readiness to deliver results in the upcoming electoral cycle.",
      ],
    },
  },
  {
    id: 3,
    date: 'Feb 5, 2026',
    category: 'Registration',
    categoryColor: 'bg-amber-100 text-amber-700',
    title: 'Lagos Leads in Nationwide APC E-Registration',
    excerpt: 'The Chairman commends the Ikorodu division for record-breaking numbers in the ongoing digital party membership enrollment drive.',
    fullContent: {
      author: 'Lagos APC Secretariat',
      role: 'Official Statement',
      date: '05/02/26',
      paragraphs: [
        'Lagos State has emerged as the leading chapter in the All Progressives Congress nationwide digital membership enrollment exercise, with the Ikorodu division recording the highest numbers in the ongoing e-registration drive.',
        "State Chairman Pastor Cornelius Ojelabi praised the remarkable achievement, noting that Lagos's performance reflects the party's deep grassroots penetration and the enthusiasm of Lagosians to participate in the democratic process.",
        'The e-registration exercise leverages a new digital platform developed by the national party secretariat, allowing members to update their details, register new members, and obtain digital party cards.',
        'Over 250,000 new and returning members have been enrolled in Lagos State alone in the first two weeks of the exercise. The Ikorodu, Alimosho, and Ikeja divisions have been recognized as top performers.',
        'Chairman Ojelabi urged all LGA chairmen and ward coordinators to sustain the momentum and ensure that every APC member in Lagos is captured in the new digital register before the deadline.',
      ],
    },
  },
];

const getYouTubeId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
};

const VIDEO_ID = getYouTubeId('https://youtu.be/xiwPuBR8pCo?si=MQr2iKJUAWLn82Cp');

// ─── Article Modal ────────────────────────────────────────────────────────────
const ArticleModal = ({ article, onClose }) => {
  const handleShare = async () => {
    const shareData = { title: article.title, text: article.excerpt, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-4 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex-1 pr-4">
            <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${article.categoryColor}`}>
              {article.category}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">{article.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Clock size={11} />
            {article.date}
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="text-xs font-bold text-[#008A44] truncate">{article.fullContent.author}</div>
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#008A44] transition-colors cursor-pointer shrink-0"
          >
            <Share2 size={12} />
            Share
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {article.fullContent.paragraphs.map((para, i) => (
            <p key={i} className="text-gray-700 text-[15px] leading-[1.9] mb-5 last:mb-0">
              {para}
            </p>
          ))}

          {/* Byline */}
          <div className="mt-8 pt-6 border-t border-gray-100 bg-gray-50 -mx-6 px-6 py-5 -mb-6">
            <p className="text-sm font-black text-gray-900">{article.fullContent.author}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{article.fullContent.role}</p>
            <p className="text-xs text-gray-400 mt-0.5">{article.fullContent.date}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const News = () => {
  const [playing, setPlaying] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <section id="news" className="py-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-12 bg-[#008A44]" />
                <span className="text-[#008A44] text-[10px] font-black uppercase tracking-[0.35em]">Media Center</span>
              </div>
              <h2
                className="text-[clamp(3rem,8vw,6rem)] font-black text-gray-900 leading-[0.95] uppercase"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
              >
                Latest From <br />
                <span className="text-[#008A44]">The Secretariat</span>
              </h2>
            </div>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => setActiveArticle(newsArticles[0])}
              className="hidden sm:flex items-center gap-2 text-[#008A44] font-black text-sm uppercase tracking-widest group shrink-0 pb-1 border-b-2 border-[#008A44]/30 hover:border-[#008A44] transition-colors cursor-pointer"
            >
              All Press Releases
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="relative rounded-3xl overflow-hidden bg-[#041a0b] shadow-2xl aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1${playing ? '&autoplay=1' : ''}`}
                  title="Lagos APC — Chairman's Address"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {!playing && (
                  <div
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={() => setPlaying(true)}
                    style={{ background: 'linear-gradient(to top, rgba(4,26,11,0.92) 0%, rgba(4,26,11,0.5) 55%, rgba(4,26,11,0.15) 100%)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <Play size={24} className="text-white fill-white ml-1.5" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 hidden sm:block">
                      <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-4">
                        Featured Video
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                        Building a Greater Lagos Together
                      </h3>
                      <p className="text-white/50 text-sm max-w-md leading-relaxed">
                        Pastor Cornelius Ojelabi outlines the strategic vision for the 2026–2027 political cycle.
                      </p>
                    </div>

                    <div className="absolute bottom-4 left-4 sm:hidden">
                      <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                        Featured Video
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="sm:hidden mt-4">
                <h3 className="text-lg font-black text-gray-900">Building a Greater Lagos Together</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  Pastor Cornelius Ojelabi outlines the strategic vision for the 2026–2027 political cycle.
                </p>
              </div>
            </motion.div>

            {/* News feed */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-gray-100">
              {newsArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative py-6 cursor-pointer first:pt-0"
                  onClick={() => setActiveArticle(article)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveArticle(article)}
                  aria-label={`Read: ${article.title}`}
                >
                  <motion.div
                    className="absolute -inset-x-3 inset-y-1 rounded-2xl bg-[#008A44]/[0.05]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${article.categoryColor}`}>
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                        <Calendar size={11} />
                        {article.date}
                      </span>
                    </div>

                    <h4 className="text-[15px] font-black text-gray-900 group-hover:text-[#008A44] transition-colors leading-snug mb-1.5">
                      {article.title}
                    </h4>

                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#008A44] transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                      Read Full Statement
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </motion.article>
              ))}

              <div className="pt-6 sm:hidden">
                <button
                  onClick={() => setActiveArticle(newsArticles[0])}
                  className="w-full bg-gray-900 hover:bg-[#008A44] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  All Press Releases
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeArticle && (
          <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default News;