import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, ArrowUpRight, Play, X, Share2, Clock, Loader2 } from 'lucide-react';

// ============================================================================
// Constants
// ============================================================================
const CATEGORY_STYLES = {
  'Official Statement': { bg: 'bg-red-50',     text: 'text-red-700' },
  'Mobilization':       { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Registration':       { bg: 'bg-amber-50',   text: 'text-amber-700' },
  'Obituary':           { bg: 'bg-gray-100',   text: 'text-gray-700' },
};

const VIDEO_CONFIG = {
  url: 'https://youtu.be/xiwPuBR8pCo?si=MQr2iKJUAWLn82Cp',
  title: 'Building a Greater Lagos Together',
  description: 'Pastor Cornelius Ojelabi outlines the strategic vision for the 2026–2027 political cycle.',
  get id() {
    const match = this.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  },
};

// Public API base (no auth needed for reading news)
const _raw = import.meta.env.VITE_API_URL;
const API_BASE = (_raw && _raw !== 'undefined')
  ? _raw.replace(/\/$/, '')
  : 'https://apcbackend.vercel.app/api';

// ============================================================================
// Utilities
// ============================================================================
const CategoryBadge = ({ category }) => {
  const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES['Official Statement'];
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styles.bg} ${styles.text}`}>
      {category}
    </span>
  );
};

const ShareButton = ({ title, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleShare = useCallback(async () => {
    const shareData = { title, text, url: window.location.href };
    if (navigator.share && window.innerWidth < 768) {
      try { await navigator.share(shareData); } catch (e) { if (e.name !== 'AbortError') console.error(e); }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } catch (e) { console.error(e); }
    }
  }, [title, text]);

  return (
    <button
      onClick={handleShare}
      className="relative flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-[#008A44] transition-colors"
      aria-label="Share article"
    >
      <Share2 size={12} />
      <span className="hidden sm:inline">Share</span>
      {showTooltip && (
        <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          Link copied!
        </span>
      )}
    </button>
  );
};

// ============================================================================
// Video Player
// ============================================================================
const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  if (!VIDEO_CONFIG.id) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#041a0b] shadow-2xl aspect-video">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_CONFIG.id}?rel=0&modestbranding=1${playing ? '&autoplay=1' : ''}`}
        title={VIDEO_CONFIG.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {!playing && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => setPlaying(true)}
          style={{ background: 'linear-gradient(to top, rgba(4,26,11,0.92) 0%, rgba(4,26,11,0.5) 55%, rgba(4,26,11,0.15) 100%)' }}
        >
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
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">{VIDEO_CONFIG.title}</h3>
            <p className="text-white/50 text-sm max-w-md leading-relaxed">{VIDEO_CONFIG.description}</p>
          </div>
          <div className="absolute bottom-4 left-4 sm:hidden">
            <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              Featured Video
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Article Modal
// ============================================================================
const ArticleModal = ({ article, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  // Normalise: support both direct shape and nested fullContent shape
  const paragraphs = article.fullContent?.paragraphs ?? article.paragraphs ?? [];
  const author     = article.fullContent?.author     ?? article.author     ?? '';
  const role       = article.fullContent?.role       ?? article.role       ?? '';
  const date       = article.fullContent?.date       ?? article.date       ?? '';

  const mobileVariants  = {
    hidden:  { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } },
    exit:    { opacity: 0, y: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
  };
  const desktopVariants = {
    hidden:  { opacity: 0, scale: 0.95, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 280 } },
    exit:    { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  const ModalContent = ({ headingId }) => (
    <>
      <div className="flex items-start justify-between px-4 sm:px-6 pt-4 pb-4 border-b border-gray-100 shrink-0">
        <div className="flex-1 pr-3">
          <CategoryBadge category={article.category} />
          <h2 id={headingId} className="text-base sm:text-xl font-bold text-gray-900 leading-snug mt-2 sm:mt-3">
            {article.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={16} className="text-gray-600" />
        </button>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-50 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <Clock size={11} /><span>{article.date}</span>
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="text-xs font-medium text-[#008A44] truncate flex-1">{author}</div>
        <ShareButton title={article.title} text={article.excerpt} />
      </div>
      <div className="overflow-y-auto flex-1 overscroll-contain px-4 sm:px-6 py-5 sm:py-6">
        {paragraphs.filter(Boolean).map((p, i) => (
          <p key={i} className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 last:mb-0">{p}</p>
        ))}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
          <p className="text-sm font-bold text-gray-900">{author}</p>
          {role && <p className="text-xs text-gray-500 mt-0.5">{role}</p>}
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      <motion.div
        className="sm:hidden relative bg-white w-full rounded-t-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{ maxHeight: '92dvh' }}
        variants={mobileVariants} initial="hidden" animate="visible" exit="exit"
        role="dialog" aria-modal="true" aria-labelledby="modal-m"
      >
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        <ModalContent headingId="modal-m" />
      </motion.div>

      <motion.div
        className="hidden sm:flex relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden flex-col shadow-2xl"
        style={{ maxHeight: '90vh' }}
        variants={desktopVariants} initial="hidden" animate="visible" exit="exit"
        role="dialog" aria-modal="true" aria-labelledby="modal-d"
      >
        <ModalContent headingId="modal-d" />
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// Skeleton loader for articles
// ============================================================================
const ArticleSkeleton = () => (
  <div className="py-5 first:pt-0 last:pb-0 border-b border-gray-200 last:border-0 animate-pulse">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-20 h-5 bg-gray-200 rounded-full" />
      <div className="w-16 h-4 bg-gray-100 rounded-full" />
    </div>
    <div className="w-full h-4 bg-gray-200 rounded mb-1" />
    <div className="w-3/4 h-4 bg-gray-200 rounded mb-3" />
    <div className="w-full h-3 bg-gray-100 rounded mb-1" />
    <div className="w-2/3 h-3 bg-gray-100 rounded" />
  </div>
);

// ============================================================================
// Main News Component
// ============================================================================
const News = () => {
  const [articles, setArticles]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [hoveredIndex, setHoveredIndex]       = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/news?limit=5`);
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        setArticles(data.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <section id="news" className="py-16 sm:py-20 lg:py-24 bg-gray-50" aria-labelledby="news-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#008A44]" aria-hidden="true" />
                <span className="text-[#008A44] text-xs font-bold uppercase tracking-widest">Media Center</span>
              </div>
              <h2 id="news-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Latest From <br className="hidden sm:block" />
                <span className="text-[#008A44]">The Secretariat</span>
              </h2>
            </div>
            {articles[0] && (
              <button
                onClick={() => setSelectedArticle(articles[0])}
                className="hidden sm:flex items-center gap-2 text-[#008A44] font-semibold text-sm uppercase tracking-wider group pb-1 border-b-2 border-[#008A44]/30 hover:border-[#008A44] transition-colors"
              >
                Latest Press Release
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </motion.div>

          {/* Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <VideoPlayer />
              <div className="mt-4 sm:hidden">
                <h3 className="text-lg font-bold text-gray-900">{VIDEO_CONFIG.title}</h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{VIDEO_CONFIG.description}</p>
              </div>
            </motion.div>

            {/* Articles */}
            <div className="lg:col-span-5">
              <div className="divide-y divide-gray-200" role="feed" aria-label="News articles">

                {/* Loading skeletons */}
                {loading && Array.from({ length: 4 }).map((_, i) => <ArticleSkeleton key={i} />)}

                {/* Error state */}
                {error && !loading && (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    Could not load articles. Please try again later.
                  </div>
                )}

                {/* Articles */}
                {!loading && !error && articles.map((article, index) => (
                  <motion.article
                    key={article._id || article.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative py-5 first:pt-0 last:pb-0"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute -inset-x-3 -inset-y-1 bg-[#008A44]/5 rounded-xl -z-10" aria-hidden="true" />
                    )}
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008A44] focus-visible:ring-offset-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <CategoryBadge category={article.category} />
                        <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                          <Calendar size={12} aria-hidden="true" />
                          <time dateTime={article.date}>{article.date}</time>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#008A44] transition-colors leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#008A44] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                        Read Full Statement <ChevronRight size={12} aria-hidden="true" />
                      </span>
                    </button>
                  </motion.article>
                ))}

                {/* Empty state */}
                {!loading && !error && articles.length === 0 && (
                  <div className="py-12 text-center text-gray-400 text-sm">
                    No articles published yet.
                  </div>
                )}
              </div>

              {articles[0] && (
                <div className="mt-6 sm:hidden">
                  <button
                    onClick={() => setSelectedArticle(articles[0])}
                    className="w-full bg-gray-900 hover:bg-[#008A44] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    Latest Press Release <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default News;