import subprocess, io

# 4:5 portrait crops centred on each slide's existing focal x, so full-bleed
# cover on a phone crops vertically (forgiving) instead of horizontally
# (which was cutting the Chairman out of the frame he shares with the President).
SLIDES = [
    ('ojtinubu', 0.46),
    ('oj5', 0.56),
    ('ojelabi31', 0.58),
    ('oj11', 0.50),
    ('ojelabi39', 0.50),
    ('oj10', 0.50),
]

ps = ['Add-Type -AssemblyName System.Drawing',
      '$dir = "$PWD\\src\\assets"',
      '$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq \'image/jpeg\' }']

for name, cx in SLIDES:
    ps += [
      '$f = Get-ChildItem "$dir\\%s.jpeg","$dir\\%s.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1' % (name, name),
      '$src = [System.Drawing.Image]::FromFile($f.FullName)',
      '$ow = $src.Width; $oh = $src.Height',
      # tallest 4:5 window that fits, centred on cx and clamped to the frame
      '$cw = [Math]::Min($ow, [int]($oh * 0.8))',
      '$ch = [int]($cw / 0.8)',
      'if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }',
      '$x = [int](%s * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }' % cx,
      '$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }',
      '$bmp = New-Object System.Drawing.Bitmap($cw, $ch)',
      '$g = [System.Drawing.Graphics]::FromImage($bmp)',
      "$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'",
      '$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)',
      '$p = New-Object System.Drawing.Imaging.EncoderParameters(1)',
      '$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)',
      '$bmp.Save("$dir\\gallery\\%s-m.jpg", $codec, $p)' % name,
      'Write-Output "%s -> $cw x $ch"' % name,
      '$g.Dispose(); $bmp.Dispose(); $src.Dispose()',
    ]

io.open('.tmp/crop.ps1', 'w', encoding='utf-8').write('\n'.join(ps))
print('wrote .tmp/crop.ps1')
