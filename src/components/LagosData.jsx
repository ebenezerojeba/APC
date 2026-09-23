/*
  Scale-of-Lagos figures.

  Shaped for the CMS the brief describes (label / value / context / source /
  year / order / isActive) so these can move to MongoDB without a rewrite.

  The voter and polling-unit counts are INEC's 2023 general election records.
  They are historical and are labelled as such on screen: continuous voter
  registration means the current roll differs, and presenting a 2023 count as
  today's electorate would be a false claim. Replace `value` and `year` only
  with a figure that can be sourced.
*/
const FIGURES = [
  {
    id: 'voters',
    value: '7.06',
    unit: 'M',
    label: 'Registered voters',
    context: 'Lagos State',
    source: 'INEC · 2023 general election',
    historical: true,
    order: 1,
    isActive: true,
  },
  {
    id: 'units',
    value: '13,325',
    unit: '',
    label: 'Polling units',
    context: 'Lagos State',
    source: 'INEC · 2023 general election',
    historical: true,
    order: 2,
    isActive: true,
  },
  {
    id: 'election',
    value: '2027',
    unit: '',
    label: 'General election',
    context: 'The road ahead',
    source: null,
    historical: false,
    order: 3,
    isActive: true,
  },
];

const active = FIGURES.filter((f) => f.isActive).sort((a, b) => a.order - b.order);

const LagosData = () => (
  <section id="lagos-data" className="relative bg-[#04100A] pb-20 pt-16 sm:pb-24 sm:pt-20">
    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-20">

      <div className="mb-10 flex items-center gap-3 sm:mb-14">
        <span className="h-px w-7 bg-[#D4A574] sm:w-10" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574] sm:text-[11px]">
          The scale of Lagos
        </h2>
      </div>

      <dl className="grid grid-cols-1 border-t border-white/12 sm:grid-cols-3">
        {active.map((f) => (
          <div
            key={f.id}
            className="border-b border-white/12 py-8 sm:border-b-0 sm:border-r sm:px-7 sm:py-10 sm:first:pl-0 sm:last:border-r-0"
          >
            <dd
              className="font-black leading-none text-white"
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              }}
            >
              {f.value}
              {f.unit && <span className="text-[#4ADE80]">{f.unit}</span>}
            </dd>

            <dt className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base">
              {f.label}
            </dt>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{f.context}</p>

            {/*
              The source line is the guard against a historical count reading
              as a current one, so it renders with the figure, not as a
              footnote somewhere further down the page.
            */}
            {f.source && (
              <p className="mt-4 border-l border-white/15 pl-3 text-[11px] leading-snug text-white/35">
                {f.source}
              </p>
            )}
          </div>
        ))}
      </dl>

      {active.some((f) => f.historical) && (
        <p className="mt-8 max-w-2xl text-[11px] leading-relaxed text-white/30">
          Voter and polling-unit figures are INEC records from the 2023 general election and are
          shown for scale. Continuous voter registration means the current roll differs.
        </p>
      )}
    </div>

    {/* Hand-off into the white section below, so the cut is not abrupt. */}
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white"
      aria-hidden="true"
    />
  </section>
);

export default LagosData;
