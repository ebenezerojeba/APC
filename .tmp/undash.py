import io

# Sentence-level rewrites. Swapping the glyph alone would leave the same
# stitched-together cadence that reads as machine-written, so each of these
# is recast as an ordinary sentence.
EDITS = {
 'src/components/LagosData.jsx': [
  ("source: 'INEC — 2026 Voters in Lagos State',", "source: 'Source: INEC, 2026',"),
  ("source: 'INEC — 2026, Lagos State',", "source: 'Source: INEC, 2026',"),
  ("registration remains open — the official register for the 2027 general election is\n        published by the Commission on 15 December 2026.",
   "registration remains open, and the Commission publishes the official register for the\n        2027 general election on 15 December 2026."),
 ],
 'src/components/Gallery.jsx': [
  ("photographs from the Chairman&apos;s work across Lagos State — at the",
   "photographs from the Chairman&apos;s work across Lagos State: at the"),
 ],
 'src/components/Priorities.jsx': [
  ("My job is not to speak for Lagos — the people we elect do that.",
   "My job is not to speak for Lagos. The people we elect do that."),
  ("accountable for its own units — not a name on a list at the secretariat.",
   "accountable for its own units, not a name on a list at the secretariat."),
  ("up to the officials we elected — and report back on what came of them.",
   "up to the officials we elected, and report back on what came of them."),
 ],
 'src/components/Event.jsx': [
  ("'Lagos State — All 245 Wards'", "'Lagos State, all 245 wards'"),
  ("'Primary Election — House of Representatives'", "'Primary Election: House of Representatives'"),
  ("'Primary Election — Senate'", "'Primary Election: Senate'"),
  ("'Primary Election — State House of Assembly'", "'Primary Election: State House of Assembly'"),
  ("'Primary Election — Governorship'", "'Primary Election: Governorship'"),
  ("'Primary Election — Presidential'", "'Primary Election: Presidential'"),
  ("'TBC — Abuja, FCT'", "'TBC, Abuja, FCT'"),
  ("for all elective positions — House of Assembly, House of Representatives, Senate, Governorship, and Presidential — at the APC National Secretariat.",
   "for all elective positions (House of Assembly, House of Representatives, Senate, Governorship and Presidential) at the APC National Secretariat."),
  ("Window for screening appeals for all positions — State House of Assembly,",
   "Window for screening appeals for all positions: State House of Assembly,"),
 ],
 'src/components/Contact.jsx': [
  ("Welcome aboard — expect your first briefing shortly.",
   "Welcome aboard. Expect your first briefing shortly."),
  ("Questions, partnerships, or press enquiries — reach out to the APC Lagos State administrative office directly.",
   "For questions, partnerships or press enquiries, reach out to the APC Lagos State administrative office directly."),
 ],
 'src/pages/Join.jsx': [
  ("'Membership activated — you\\'re officially in'", "'Membership activated. You\\'re officially in'"),
  ("The Lagos APC is more than a party — it is a movement of over 4 million",
   "The Lagos APC is more than a party. It is a movement of over 4 million"),
 ],
 'src/pages/ConstitutionPage.jsx': [
  ("This is an overview — the full", "This is an overview. The full"),
  ("overview does not reproduce the Constitution in full — refer to{' '}",
   "overview does not reproduce the Constitution in full. Refer to{' '}"),
 ],
 'src/data/constitution.js': [
  ("All Progressives Congress — its aims and objectives",
   "All Progressives Congress: its aims and objectives"),
  ("title: 'APC Lagos State — Final Publication',",
   "title: 'APC Lagos State Final Publication',"),
 ],
}

for path, pairs in EDITS.items():
    s = io.open(path, encoding='utf-8').read()
    for old, new in pairs:
        if old in s:
            s = s.replace(old, new)
        else:
            print('  NOT FOUND in %s: %s' % (path, old[:70]))
    io.open(path, 'w', encoding='utf-8').write(s)

print('done')
