import re, zlib, io, sys

raw = io.open('public/APC-Constitution.pdf', 'rb').read()
chunks = []
for m in re.finditer(rb'stream\r?\n(.*?)endstream', raw, re.S):
    try:
        data = zlib.decompress(m.group(1))
    except Exception:
        continue
    if b'TJ' not in data and b'Tj' not in data:
        continue
    for t in re.findall(rb'\((?:\\.|[^\\()])*\)', data):
        chunks.append(t[1:-1])

s = b''.join(chunks).decode('latin-1', 'replace')
s = re.sub(r'\\([()\\])', r'\1', s)
s = ''.join(ch if 32 <= ord(ch) < 127 else ' ' for ch in s)
s = re.sub(r'\s+', ' ', s).strip()

out = io.open('.tmp/constitution-pdf.txt', 'w', encoding='utf-8')
out.write(s)
out.close()

print('clean chars:', len(s))
print('--- opening 400 ---')
print(s[:400])
print()
for kw in ['ARTICLE', 'NATIONAL CONVENTION', 'Board of Trustees',
           'AIMS AND OBJECTIVES', 'MEMBERSHIP', 'DISCIPLINE', 'FINANCE',
           'Polling Unit', 'JUSTICE, PEACE AND UNITY']:
    print('  %-26s %d' % (kw, s.count(kw)))
