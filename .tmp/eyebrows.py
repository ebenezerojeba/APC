import io, re

FILES = [
    'src/components/Hero.jsx',
    'src/components/LagosData.jsx',
    'src/components/About.jsx',
    'src/components/Priorities.jsx',
    'src/components/Gallery.jsx',
    'src/components/Resources.jsx',
    'src/components/RoadAhead.jsx',
    'src/pages/ConstitutionPage.jsx',
    'src/pages/Appointment.jsx',
    'src/pages/NotFound.jsx',
]

# The decorative rule that preceded every section label.
RULE = re.compile(
    r'^[ \t]*<span className="h-(?:px|1) w-\d+(?: bg-\[#[0-9A-Fa-f]{6}\])?'
    r'(?: sm:w-\d+)?"[ ]*/>\n', re.M)

# Extreme tracking is the other half of the tell; 0.14em still reads as a
# kicker without looking machine-set.
TRACK = [
    ('tracking-[0.3em]', 'tracking-[0.14em]'),
    ('tracking-[0.25em]', 'tracking-[0.14em]'),
]

total_rules = 0
for p in FILES:
    try:
        s = io.open(p, encoding='utf-8').read()
    except FileNotFoundError:
        print('  missing', p)
        continue
    before = s
    s, n = RULE.subn('', s)
    total_rules += n
    for a, b in TRACK:
        s = s.replace(a, b)
    # A flex row that only held the rule + label no longer needs to be a row.
    s = s.replace('className="mb-6 flex items-center gap-3 sm:mb-8"', 'className="mb-6 sm:mb-8"')
    s = s.replace('className="mb-10 flex items-center gap-3 sm:mb-14"', 'className="mb-10 sm:mb-14"')
    s = s.replace('className="mb-12 flex items-center gap-3 sm:mb-16"', 'className="mb-12 sm:mb-16"')
    if s != before:
        io.open(p, 'w', encoding='utf-8').write(s)
        print('  %-38s rules removed: %d' % (p, n))

print('total decorative rules removed:', total_rules)
