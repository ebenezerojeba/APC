import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Search, ChevronUp, ChevronDown, X } from 'lucide-react';

// ============================================================================
// Data
// ============================================================================

const officers = [
  { id: 1,  designation: "State Chairman",                        name: "Hon. Cornelius Oyefolu Ojelabi" },
  { id: 2,  designation: "Deputy State Chairman",                 name: "Moshood Olanrewaju Mayegun" },
  { id: 3,  designation: "State Secretary",                       name: "Hon. Muhyideen Adeola Jokomba, PhD" },
  { id: 4,  designation: "Asst. State Secretary",                 name: "Animawun Adejumoke Mariam" },
  { id: 5,  designation: "State Vice Chairman (West)",            name: "Aboyade Babatunde Sunday" },
  { id: 6,  designation: "State Vice Chairman (East)",            name: "Chief (Mrs) Olayinka Bolanle Olusanya" },
  { id: 7,  designation: "State Vice Chairman (Central)",         name: "Daramola Muideen Abayomi" },
  { id: 8,  designation: "State Legal Adviser",                   name: "Folashade Khafayat Bakare" },
  { id: 9,  designation: "Asst. State Legal Adviser",             name: "Adebola Adewunmi-Ladigbolu" },
  { id: 10, designation: "State Treasurer",                       name: "Mr. Abiodun Akhigbe" },
  { id: 11, designation: "Asst. State Treasurer",                 name: "Chief Oludele Sonola" },
  { id: 12, designation: "State Financial Secretary",             name: "Banjo Adedoyin Wasiu" },
  { id: 13, designation: "Asst. State Financial Secretary",       name: "Olaleye Ganiat Olufunke" },
  { id: 14, designation: "State Organising Secretary",            name: "Ayodele Adebowale Adewale" },
  { id: 15, designation: "Asst. State Organising Secretary",      name: "Sanwo-Olu Adebayo Oladimeji" },
  { id: 16, designation: "State Publicity Secretary",             name: "Hon. Oluseye Olaniran Oladejo" },
  { id: 17, designation: "Asst. State Publicity Secretary",       name: "Hon. Yesiru Karamo (Late)", isLate: true },
  { id: 18, designation: "State Welfare Secretary",               name: "Adeniyi Kehinde M." },
  { id: 19, designation: "Asst. State Welfare Secretary",         name: "Kafilat Oluwatoyin Pedro-Akanni" },
  { id: 20, designation: "State Auditor",                         name: "Pikuda Adedoyin Tolulope" },
  { id: 21, designation: "Asst. State Auditor",                   name: "Wusu Shakiru Ajiyon" },
  { id: 22, designation: "State Women Leader",                    name: "Mrs Iyabosola Eletu" },
  { id: 23, designation: "Asst. State Women Leader",              name: "Damilola Sonayon James" },
  { id: 24, designation: "State Youth Leader",                    name: "Seriki Muritala" },
  { id: 25, designation: "Asst. State Youth Leader",              name: "Vincent Adukwu" },
  { id: 26, designation: "Special (Physically Challenged) Leader",name: "Dada Afolabi" },
  { id: 27, designation: "Senatorial Youth Leader (West)",        name: "Gboshe Oyebola Rasheed" },
  { id: 28, designation: "Senatorial Youth Leader (East)",        name: "Balogun Olugbenga" },
  { id: 29, designation: "Senatorial Youth Leader (Central)",     name: "Matti Eshilokun Olawale" },
  { id: 30, designation: "Senatorial Women Leader (West)",        name: "Mariam Anita Balogun" },
  { id: 31, designation: "Senatorial Women Leader (East)",        name: "Dcns. Ajewonuola O.A. Oshinowo" },
  { id: 32, designation: "Senatorial Women Leader (Central)",     name: "Olawoyin Modupe" },
  { id: 33, designation: "Ex-Officio I",                          name: "Aisha Sani Kachako" },
  { id: 34, designation: "Ex-Officio II",                         name: "Sunday Olubamido" },
  { id: 35, designation: "Ex-Officio III",                        name: "Hon. Bamidele Olufemi" },
  { id: 36, designation: "Ex-Officio IV",                         name: "Ngozi Catherine Chinwuko" },
];

// ============================================================================
// Highlight matching text in green
// ============================================================================
const Highlight = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#008A44]/20 text-[#005c2e] font-bold rounded px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
};

// ============================================================================
// Leadership Component
// ============================================================================

const Leadership = () => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = officers
    .filter(o =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.designation.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = sortField === 'id' ? a.id : a[sortField].toLowerCase();
      const bVal = sortField === 'id' ? b.id : b[sortField].toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={12} className="text-gray-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-[#008A44]" />
      : <ChevronDown size={12} className="text-[#008A44]" />;
  };

  return (
    <section id="leadership" className="py-16 sm:py-20 lg:py-24 bg-white" aria-labelledby="leadership-heading">
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
              <span className="text-[#008A44] text-xs font-bold uppercase tracking-widest">Party Structure</span>
            </div>
            <h2 id="leadership-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              2026 State <br className="hidden sm:block" />
              <span className="text-[#008A44]">Executive Officers</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl">
              The duly elected executive leadership of the Lagos State Chapter of the All Progressives Congress (APC).
            </p>
          </div>

          {/* Download button */}
    
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        >
          <div className="relative w-full sm:w-96">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or designation…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008A44]/30 focus:border-[#008A44] bg-gray-50 placeholder-gray-400 transition"
              autoComplete="off"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {search && (
            <p className="text-xs text-gray-400 font-medium shrink-0">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
            </p>
          )}
        </motion.div>

        {/* Body — prompt or results */}
        <AnimatePresence mode="wait">
          {!search ? (

            /* ── Empty prompt ── */
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#008A44]/10 flex items-center justify-center mb-4">
                <Search size={22} className="text-[#008A44]" />
              </div>
              <p className="text-gray-700 font-semibold text-base mb-1">Search the Executive Officers</p>
              <p className="text-gray-400 text-sm max-w-xs">
                Type a name or designation above to find an officer, or download the full list.
              </p>
            </motion.div>

          ) : (

            /* ── Results table ── */
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            >
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#008A44] text-white">
                      {[
                        { label: 'S/N', field: 'id', w: 'w-14' },
                        { label: 'Designation', field: 'designation', w: '' },
                        { label: 'Name', field: 'name', w: '' },
                      ].map(col => (
                        <th
                          key={col.field}
                          onClick={() => handleSort(col.field)}
                          className={`${col.w} px-5 py-4 text-left text-xs font-bold uppercase tracking-wider cursor-pointer select-none hover:bg-[#007a3c] transition-colors`}
                        >
                          <span className="flex items-center gap-1.5">
                            {col.label}
                            <SortIcon field={col.field} />
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-5 py-12 text-center text-gray-400 text-sm">
                          No officers match &ldquo;<span className="font-semibold text-gray-600">{search}</span>&rdquo;.
                        </td>
                      </tr>
                    ) : filtered.map((officer, i) => (
                      <tr
                        key={officer.id}
                        className={`transition-colors hover:bg-[#008A44]/5 ${
                          officer.id === 1 ? 'bg-[#e8f5ee]' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        }`}
                      >
                        <td className="px-5 py-3.5 text-xs font-bold text-gray-400 text-center">{officer.id}</td>
                        <td className="px-5 py-3.5 font-medium text-gray-800">
                          <Highlight text={officer.designation} query={search} />
                        </td>
                        <td className="px-5 py-3.5 text-gray-700">
                          <span className="flex items-center gap-2">
                            <Highlight text={officer.name} query={search} />
                            {officer.isLate && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">
                                Late
                              </span>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <div className="px-5 py-12 text-center text-gray-400 text-sm">
                    No officers match &ldquo;<span className="font-semibold text-gray-600">{search}</span>&rdquo;.
                  </div>
                ) : filtered.map((officer, i) => (
                  <div
                    key={officer.id}
                    className={`px-4 py-4 ${officer.id === 1 ? 'bg-[#e8f5ee]' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#008A44] mb-0.5">
                          <Highlight text={officer.designation} query={search} />
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          <Highlight text={officer.name} query={search} />
                          {officer.isLate && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                              Late
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-gray-300 mt-0.5">{String(officer.id).padStart(2, '0')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          Lagos State All Progressives Congress (APC) — 2026 State Executive Officers
        </p>
      </div>
    </section>
  );
};

export default Leadership;