import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText } from 'lucide-react';

import { CONSTITUTION_META, SECTIONS } from '../data/constitution';

/*
  Only documents that actually exist in the project are listed. The two PDFs
  ship in public/ alongside the Constitution; anything else belongs here only
  once its file does.
*/
const OTHER_DOCUMENTS = [
  {
    title: 'Electoral Act',
    fileUrl: '/ElectoralAct2026.pdf',
    fileName: 'ElectoralAct2026.pdf',
    fileType: 'PDF',
    fileSize: '1.4 MB',
  },
  {
    title: '2026 State Officers',
    fileUrl: '/LIST_OF_2026_STATE_OFFICERS.pdf',
    fileName: 'LIST_OF_2026_STATE_OFFICERS.pdf',
    fileType: 'PDF',
    fileSize: '47 KB',
  },
];

const Resources = () => (
  <section id="resources" className="bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">

      <div className="mb-10 flex items-center gap-3 sm:mb-14">
        <span className="h-px w-7 bg-[#008A44] sm:w-10" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#008A44] sm:text-[11px]">
          Official Documents
        </h2>
      </div>

      <div className="lg:flex lg:gap-16">
        {/* Feature: the Constitution */}
        <div className="lg:w-[46%] lg:shrink-0">
          <span className="text-sm font-black tabular-nums text-gray-300">01</span>
          <h3
            className="mt-3 font-black uppercase leading-[0.9] text-gray-900"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            }}
          >
            <span className="block">APC</span>
            <span className="block text-[#008A44]">Constitution</span>
          </h3>

          <p className="mt-5 max-w-md leading-relaxed text-gray-600">
            Access the constitutional framework of the All Progressives Congress.
          </p>

          <div className="mt-7 flex items-center gap-3 border-y border-gray-200 py-3.5 text-xs text-gray-500">
            <FileText size={16} className="shrink-0 text-[#008A44]" />
            <span>
              {CONSTITUTION_META.fileType} · {CONSTITUTION_META.fileSize} ·{' '}
              {CONSTITUTION_META.category}
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
            <Link
              to="/resources/apc-constitution"
              className="group inline-flex min-h-11 items-center justify-center gap-2 bg-[#008A44] px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white outline-none transition-colors duration-200 hover:bg-[#04140B] focus-visible:ring-2 focus-visible:ring-[#008A44] focus-visible:ring-offset-2 sm:text-[11px]"
            >
              Read the Constitution
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href={CONSTITUTION_META.fileUrl}
              download={CONSTITUTION_META.fileName}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-6 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-gray-900 outline-none transition-colors duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:text-[11px]"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>

        {/* Document structure + the other files that exist */}
        <div className="mt-14 min-w-0 flex-1 lg:mt-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Document structure
          </p>
          <ol className="mt-5 border-t border-gray-200">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/resources/apc-constitution#${s.id}`}
                  className="group flex min-h-11 items-center gap-5 border-b border-gray-200 py-3.5 outline-none focus-visible:bg-gray-50"
                >
                  <span className="text-[11px] font-bold tabular-nums text-gray-300 transition-colors group-hover:text-[#008A44]">
                    {s.number}
                  </span>
                  <span className="flex-1 text-sm font-semibold uppercase tracking-wide text-gray-700 transition-colors group-hover:text-[#008A44]">
                    {s.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#008A44]"
                  />
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Also available
          </p>
          <ul className="mt-5 border-t border-gray-200">
            {OTHER_DOCUMENTS.map((doc) => (
              <li key={doc.fileName}>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-5 border-b border-gray-200 py-3.5 outline-none focus-visible:bg-gray-50"
                >
                  <FileText size={15} className="shrink-0 text-gray-300 group-hover:text-[#008A44]" />
                  <span className="flex-1 text-sm font-semibold text-gray-700 transition-colors group-hover:text-[#008A44]">
                    {doc.title}
                  </span>
                  <span className="shrink-0 text-[11px] text-gray-400">
                    {doc.fileType} · {doc.fileSize}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Resources;
