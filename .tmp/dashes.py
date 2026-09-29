import io, re, os

MOUNTED = """
src/components/Hero.jsx src/components/hero/HeroBackdrop.jsx
src/components/LagosData.jsx src/components/About.jsx src/components/Priorities.jsx
src/components/Gallery.jsx src/components/gallery/Lightbox.jsx src/components/News.jsx
src/components/Event.jsx src/components/RoadAhead.jsx src/components/Resources.jsx
src/components/Contact.jsx src/components/Navbar.jsx src/components/Footer.jsx
src/pages/Appointment.jsx src/pages/Join.jsx src/pages/NotFound.jsx
src/pages/ConstitutionPage.jsx src/data/galleryPhotos.js src/data/constitution.js
src/data/electionTimetable.js src/data/heroSlides.js
""".split()

# Lines that are clearly comments, not rendered copy.
COMMENT = re.compile(r'^\s*(//|\*|/\*|\{/\*)')

hits = 0
for p in MOUNTED:
    if not os.path.exists(p):
        continue
    for i, line in enumerate(io.open(p, encoding='utf-8'), 1):
        if '—' not in line or COMMENT.match(line):
            continue
        hits += 1
        print('%s:%d: %s' % (p, i, line.strip()[:130]))

print()
print('total user-facing em-dashes in mounted files:', hits)
