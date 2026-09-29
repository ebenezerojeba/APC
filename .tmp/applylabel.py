import io

# (path, import-target, old eyebrow block, new block)
EDITS = [
 ('src/components/Hero.jsx', './SectionLabel',
  """          <div className="mb-6 sm:mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4A574] sm:text-[11px]">
              APC Lagos State
            </span>
          </div>""",
  """          <SectionLabel as="p" tone="gold" className="mb-6 sm:mb-8">
            APC Lagos State
          </SectionLabel>"""),

 ('src/components/LagosData.jsx', './SectionLabel',
  """      <div className="mb-10 sm:mb-14">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4A574] sm:text-[11px]">
          The scale of Lagos
        </h2>
      </div>""",
  """      <SectionLabel tone="gold" className="mb-10 sm:mb-14">
        The scale of Lagos
      </SectionLabel>"""),

 ('src/components/About.jsx', './SectionLabel',
  """      <motion.div {...reveal} className="mb-12 sm:mb-16">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#008A44] sm:text-[11px]">
          Profile
        </h2>
      </motion.div>""",
  """      <motion.div {...reveal} className="mb-12 sm:mb-16">
        <SectionLabel tone="green" onDark={false}>Profile</SectionLabel>
      </motion.div>"""),

 ('src/components/Priorities.jsx', './SectionLabel',
  """        <div className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-[#008A44]">
          The Agenda
        </div>""",
  """        <SectionLabel tone="green" onDark={false} className="mb-4">
          The Agenda
        </SectionLabel>"""),

 ('src/components/Gallery.jsx', './SectionLabel',
  """          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A574]">
            The Archive
          </div>""",
  """          <SectionLabel tone="gold" className="mb-4">
            The Archive
          </SectionLabel>"""),

 ('src/components/Resources.jsx', './SectionLabel',
  """      <div className="mb-10 sm:mb-14">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#008A44] sm:text-[11px]">
          Official Documents
        </h2>
      </div>""",
  """      <SectionLabel tone="green" onDark={false} className="mb-10 sm:mb-14">
        Official Documents
      </SectionLabel>"""),

 ('src/components/RoadAhead.jsx', './SectionLabel',
  """        <div className="mb-10 sm:mb-14">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4A574] sm:text-[11px]">
            The Road Ahead
          </h2>
        </div>""",
  """        <SectionLabel tone="gold" className="mb-10 sm:mb-14">
          The Road Ahead
        </SectionLabel>"""),

 ('src/pages/ConstitutionPage.jsx', '../components/SectionLabel',
  """          <div className="mt-8 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4A574] sm:text-[11px]">
              Official Documents / 01
            </span>
          </div>""",
  """          <SectionLabel as="p" tone="gold" className="mt-8">
            Official Documents / 01
          </SectionLabel>"""),

 ('src/pages/Appointment.jsx', '../components/SectionLabel',
  """          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4A574] sm:text-[11px]">
              Office of the Chairman
            </span>
          </div>""",
  """          <SectionLabel as="p" tone="gold">
            Office of the Chairman
          </SectionLabel>"""),
]

for path, imp, old, new in EDITS:
    s = io.open(path, encoding='utf-8').read()
    if old not in s:
        print('  NOT FOUND -> %s' % path)
        continue
    s = s.replace(old, new)
    if 'SectionLabel' not in s.split('\n')[0] and "import SectionLabel" not in s:
        lines = s.split('\n')
        last = max(i for i, l in enumerate(lines[:40]) if l.startswith('import '))
        lines.insert(last + 1, "import SectionLabel from '%s';" % imp)
        s = '\n'.join(lines)
    io.open(path, 'w', encoding='utf-8').write(s)
    print('  updated %s' % path)
