import React, { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────
const ELECTION_META = {
  party: 'ALL PROGRESSIVES CONGRESS — LAGOS STATE',
  title: 'SUMMARY RESULT OF GOVERNORSHIP PRIMARY ELECTION',
  date: '20th May, 2026',
  type: 'Gubernatorial Primary Election',
  method: 'Voice Vote / Affirmation',
  totalLGAs: 20,
  totalAccredited: 657974,
  winner: 'Dr. Kadri Obafemi Hamzat',
  winnerVotes: 657917,
  winnerPercent: 99.99,
}

const CANDIDATES = [
  { id: 'hamzat', name: 'Dr. Kadri Obafemi Hamzat', shortName: 'Hamzat', status: 'active' },
  { id: 'jimkamal', name: 'Otunba Lanre Jim-Kamal', shortName: 'Jim-Kamal', status: 'active' },
  { id: 'ajose', name: 'Mr. Samuel Mayunwon Ajose', shortName: 'Ajose', status: 'withdrawn' },
]

const LGA_RESULTS = [
  { lga: 'Agege',           accredited: 16259,  hamzat: 16257, jimkamal: 0, ajose: null },
  { lga: 'Ajeromi-Ifelodun',accredited: 31081,  hamzat: 31079, jimkamal: 0, ajose: null },
  { lga: 'Alimosho',        accredited: 74506,  hamzat: 74501, jimkamal: 0, ajose: null },
  { lga: 'Amuwo Odofin',    accredited: 20820,  hamzat: 20818, jimkamal: 0, ajose: null },
  { lga: 'Apapa',           accredited: 5432,   hamzat: 5430,  jimkamal: 0, ajose: null },
  { lga: 'Badagry',         accredited: 24631,  hamzat: 24631, jimkamal: 0, ajose: null },
  { lga: 'Epe',             accredited: 37683,  hamzat: 37680, jimkamal: 1, ajose: null },
  { lga: 'Eti-Osa',         accredited: 28756,  hamzat: 28754, jimkamal: 0, ajose: null },
  { lga: 'Ibeju Lekki',     accredited: 33864,  hamzat: 33861, jimkamal: 0, ajose: null },
  { lga: 'Ifako Ijaiye',    accredited: 38629,  hamzat: 38627, jimkamal: 0, ajose: null },
  { lga: 'Ikeja',           accredited: 21590,  hamzat: 21588, jimkamal: 0, ajose: null },
  { lga: 'Ikorodu',         accredited: 55150,  hamzat: 55148, jimkamal: 0, ajose: null },
  { lga: 'Kosofe',          accredited: 51609,  hamzat: 51600, jimkamal: 0, ajose: null },
  { lga: 'Lagos Island',    accredited: 27350,  hamzat: 27348, jimkamal: 0, ajose: null },
  { lga: 'Lagos Mainland',  accredited: 49081,  hamzat: 49079, jimkamal: 0, ajose: null },
  { lga: 'Mushin',          accredited: 38973,  hamzat: 38971, jimkamal: 0, ajose: null },
  { lga: 'Ojo',             accredited: 36376,  hamzat: 36372, jimkamal: 0, ajose: null },
  { lga: 'Oshodi-Isolo',    accredited: 31976,  hamzat: 31972, jimkamal: 0, ajose: null },
  { lga: 'Somolu',          accredited: 16709,  hamzat: 16706, jimkamal: 0, ajose: null },
  { lga: 'Surulere',        accredited: 17499,  hamzat: 17495, jimkamal: 0, ajose: null },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => n?.toLocaleString('en-NG') ?? '—'
const pct = (votes, total) => total > 0 ? ((votes / total) * 100).toFixed(2) + '%' : '—'

// ─── Sub-components ──────────────────────────────────────────────────────────

function WinnerBanner() {
  return (
    <div style={styles.winnerBanner}>
      <div style={styles.winnerBadge}>DECLARED WINNER</div>
      <div style={styles.winnerName}>{ELECTION_META.winner}</div>
      <div style={styles.winnerStats}>
        <span style={styles.winnerVoteCount}>{fmt(ELECTION_META.winnerVotes)} votes</span>
        <span style={styles.winnerDivider}>·</span>
        <span style={styles.winnerPct}>{ELECTION_META.winnerPercent}% of accredited voters</span>
      </div>
    </div>
  )
}

function MetaGrid() {
  const items = [
    { label: 'Election Type', value: ELECTION_META.type },
    { label: 'Date', value: ELECTION_META.date },
    { label: 'Voting Method', value: ELECTION_META.method },
    { label: 'Total LGAs', value: ELECTION_META.totalLGAs },
    { label: 'Total Accredited Voters', value: fmt(ELECTION_META.totalAccredited) },
  ]
  return (
    <div style={styles.metaGrid}>
      {items.map(({ label, value }) => (
        <div key={label} style={styles.metaItem}>
          <span style={styles.metaLabel}>{label}</span>
          <span style={styles.metaValue}>{value}</span>
        </div>
      ))}
    </div>
  )
}

function SummaryCards() {
  const cards = [
    {
      label: 'Hamzat',
      votes: 657917,
      pct: '99.99%',
      accent: '#006400',
      lightBg: '#f0faf0',
    },
    {
      label: 'Jim-Kamal',
      votes: 1,
      pct: '< 0.01%',
      accent: '#b45309',
      lightBg: '#fffbeb',
    },
    {
      label: 'Ajose',
      votes: null,
      pct: 'N/A',
      accent: '#6b7280',
      lightBg: '#f9fafb',
      tag: 'WITHDRAWN',
    },
  ]

  return (
    <div style={styles.summaryCards}>
      {cards.map((c) => (
        <div key={c.label} style={{ ...styles.summaryCard, borderTop: `3px solid ${c.accent}` }}>
          {c.tag && (
            <span style={{ ...styles.withdrawnTag }}>
              {c.tag}
            </span>
          )}
          <div style={styles.summaryCardName}>{c.label}</div>
          <div style={{ ...styles.summaryCardVotes, color: c.accent }}>
            {c.votes !== null ? fmt(c.votes) : '—'}
          </div>
          <div style={styles.summaryCardPct}>{c.pct}</div>
        </div>
      ))}
    </div>
  )
}

function ResultsTable() {
  const [sortKey, setSortKey] = useState('idx')
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  const sorted = [...LGA_RESULTS]
    .map((r, i) => ({ ...r, idx: i }))
    .sort((a, b) => {
      const va = a[sortKey] ?? -1
      const vb = b[sortKey] ?? -1
      if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      return sortDir === 'asc' ? va - vb : vb - va
    })

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span style={styles.sortIconInactive}>⇅</span>
    return <span style={styles.sortIconActive}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const cols = [
    { key: 'idx',       label: 'S/N',               align: 'center', width: 44 },
    { key: 'lga',       label: 'Local Government',   align: 'left',   width: 160 },
    { key: 'accredited',label: 'Accredited',         align: 'right',  width: 110 },
    { key: 'hamzat',    label: 'Hamzat',             align: 'right',  width: 110 },
    { key: 'jimkamal',  label: 'Jim-Kamal',          align: 'right',  width: 100 },
    { key: 'ajose',     label: 'Ajose',              align: 'center', width: 90  },
  ]

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {cols.map(({ key, label, align, width }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                style={{ ...styles.th, textAlign: align, width, minWidth: width, cursor: 'pointer' }}
              >
                {label} <SortIcon col={key} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={row.lga} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
              <td style={{ ...styles.td, textAlign: 'center', color: '#9ca3af' }}>{row.idx + 1}</td>
              <td style={{ ...styles.td, fontWeight: 500 }}>{row.lga}</td>
              <td style={{ ...styles.td, textAlign: 'right', color: '#374151' }}>{fmt(row.accredited)}</td>
              <td style={{ ...styles.td, textAlign: 'right', color: '#006400', fontWeight: 600 }}>{fmt(row.hamzat)}</td>
              <td style={{ ...styles.td, textAlign: 'right', color: row.jimkamal > 0 ? '#b45309' : '#9ca3af' }}>
                {row.jimkamal}
              </td>
              <td style={{ ...styles.td, textAlign: 'center' }}>
                {row.ajose === null
                  ? <span style={styles.withdrawnPill}>W/D</span>
                  : row.ajose}
              </td>
            </tr>
          ))}
          {/* Totals row */}
          <tr style={styles.trTotal}>
            <td style={{ ...styles.tdTotal, textAlign: 'center' }} colSpan={2}>TOTAL</td>
            <td style={{ ...styles.tdTotal, textAlign: 'right' }}>{fmt(ELECTION_META.totalAccredited)}</td>
            <td style={{ ...styles.tdTotal, textAlign: 'right', color: '#006400' }}>{fmt(ELECTION_META.winnerVotes)}</td>
            <td style={{ ...styles.tdTotal, textAlign: 'right' }}>1</td>
            <td style={{ ...styles.tdTotal, textAlign: 'center' }}>
              <span style={styles.withdrawnPill}>W/D</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GovernorshipPrimaryResults() {
  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        
        <div>
        
          <h2 style={styles.electionTitle}>{ELECTION_META.title}</h2>
        </div>
      </div>

      {/* Winner Banner */}
      <WinnerBanner />

      {/* Election Meta */}
      <MetaGrid />

      {/* Candidate Summary */}
      <div style={styles.sectionLabel}>Vote Summary</div>
      <SummaryCards />

      {/* Results Table */}
      <div style={styles.sectionLabel}>
        Results by Local Government Area
        <span style={styles.sortHint}>· Click column headers to sort</span>
      </div>
      <ResultsTable />

      {/* Footer */}
      <div style={styles.footer}>
        W/D = Withdrawn &nbsp;·&nbsp; Results are official as declared on {ELECTION_META.date}
      </div>
    </section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  section: {
    fontFamily: "'Georgia', serif",
    maxWidth: 900,
    margin: '0 auto',
    padding: '2rem 1.25rem',
    color: '#1a1a1a',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.5rem',
    paddingBottom: '1.25rem',
    borderBottom: '2px solid #006400',
  },
  partyLogo: {
    flexShrink: 0,
    width: 56,
    height: 56,
    borderRadius: 8,
    background: '#006400',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Arial Black', sans-serif",
    fontWeight: 900,
    fontSize: 18,
    letterSpacing: 1,
  },
  partyName: {
    margin: 0,
    fontSize: 11,
    fontFamily: 'sans-serif',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  electionTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    fontFamily: 'sans-serif',
    lineHeight: 1.3,
  },

  // Winner Banner
  winnerBanner: {
    background: 'linear-gradient(135deg, #004d00 0%, #006400 60%, #138600 100%)',
    borderRadius: 10,
    padding: '1.5rem 2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  winnerBadge: {
    display: 'inline-block',
    background: '#FFD700',
    color: '#003300',
    fontSize: 10,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    letterSpacing: 2,
    padding: '3px 12px',
    borderRadius: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  winnerName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
  },
  winnerStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    fontFamily: 'sans-serif',
  },
  winnerVoteCount: {
    color: '#a8f0a8',
    fontSize: 15,
    fontWeight: 600,
  },
  winnerDivider: { color: '#5a9a5a', fontSize: 15 },
  winnerPct: {
    color: '#d4f5d4',
    fontSize: 14,
  },

  // Meta grid
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 10,
    marginBottom: '1.5rem',
  },
  metaItem: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  metaLabel: {
    fontSize: 11,
    fontFamily: 'sans-serif',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metaValue: {
    fontSize: 13,
    fontFamily: 'sans-serif',
    fontWeight: 600,
    color: '#1f2937',
  },

  // Section label
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6b7280',
    marginBottom: 10,
    marginTop: '1.5rem',
  },
  sortHint: {
    fontWeight: 400,
    letterSpacing: 0,
    textTransform: 'none',
    color: '#9ca3af',
  },

  // Summary cards
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    marginBottom: '1rem',
  },
  summaryCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '14px 16px',
    position: 'relative',
  },
  summaryCardName: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryCardVotes: {
    fontFamily: 'sans-serif',
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 4,
  },
  summaryCardPct: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: '#9ca3af',
  },
  withdrawnTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: '#f3f4f6',
    color: '#6b7280',
    fontSize: 9,
    fontFamily: 'sans-serif',
    fontWeight: 700,
    letterSpacing: 1,
    padding: '2px 7px',
    borderRadius: 12,
  },

  // Table
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'sans-serif',
    fontSize: 13,
    minWidth: 580,
  },
  th: {
    background: '#1a1a1a',
    color: '#e5e7eb',
    padding: '10px 12px',
    fontWeight: 600,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '9px 12px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
    whiteSpace: 'nowrap',
  },
  trEven: { background: '#ffffff' },
  trOdd: { background: '#fafafa' },
  trTotal: { background: '#1a1a1a' },
  tdTotal: {
    padding: '10px 12px',
    color: '#e5e7eb',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  withdrawnPill: {
    display: 'inline-block',
    background: '#f3f4f6',
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.5,
    padding: '2px 8px',
    borderRadius: 12,
  },
  sortIconInactive: { color: '#6b7280', fontSize: 11, marginLeft: 2 },
  sortIconActive: { color: '#4ade80', fontSize: 11, marginLeft: 2 },

  // Footer
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb',
    fontFamily: 'sans-serif',
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
}