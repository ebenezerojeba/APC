import zipfile, re, io

Z = zipfile.ZipFile('public/GENERAL ELECTION TIMETABLE_101041.docx')
xml = Z.read('word/document.xml').decode('utf-8', 'replace')

# <w:t> only. `<w:t[^>]*>` also matches <w:tcPr>, which pulled raw XML in.
T = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)


def text_of(frag):
    t = ''.join(T.findall(frag))
    for a, b in (('&amp;', '&'), ('&lt;', '<'), ('&gt;', '>'),
                 ('&quot;', '"'), ('&#39;', "'")):
        t = t.replace(a, b)
    return re.sub(r'\s+', ' ', t).strip()


out = []
for m in re.finditer(r'(<w:tbl>.*?</w:tbl>)|(<w:p\b[^>]*>.*?</w:p>)', xml, re.S):
    if m.group(1):
        for row in re.findall(r'<w:tr\b.*?</w:tr>', m.group(1), re.S):
            cells = [text_of(c) for c in re.findall(r'<w:tc>.*?</w:tc>', row, re.S)]
            if any(cells):
                out.append(('ROW', cells))
    else:
        t = text_of(m.group(2))
        if t:
            out.append(('P', [t]))

io.open('.tmp/timetable.txt', 'w', encoding='utf-8').write(
    '\n'.join(k + ' | ' + ' || '.join(v) for k, v in out))

print('blocks:', len(out))
for k, v in out:
    print(k, '|', ' || '.join(v))
