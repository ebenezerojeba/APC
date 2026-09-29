Add-Type -AssemblyName System.Drawing
$dir = "$PWD\src\assets"
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

# name, focal-x fraction, focal-y fraction
$slides = @(
  @('ojtinubu', 0.46, 0.42),
  @('oj5',      0.56, 0.42),
  @('ojelabi31',0.58, 0.45),
  @('oj11',     0.50, 0.45),
  @('ojelabi39',0.50, 0.42),
  @('oj10',     0.50, 0.45)
)

# Target mobile crop ratio. 0.55 keeps subjects together while staying close
# enough to a phone viewport (~0.46) that little further cropping happens.
$RATIO = 0.55
$VW = 390; $VH = 844   # simulated phone

$cols = 6; $tileW = 200; $tileH = 433
$sheet = New-Object System.Drawing.Bitmap(($cols * $tileW), ($tileH + 22))
$gx = [System.Drawing.Graphics]::FromImage($sheet)
$gx.InterpolationMode = 'HighQualityBicubic'
$gx.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(15,15,15))), 0, 0, $sheet.Width, $sheet.Height)
$fnt = New-Object System.Drawing.Font('Segoe UI', 8, [System.Drawing.FontStyle]::Bold)
$wb = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

for ($i = 0; $i -lt $slides.Count; $i++) {
  $name = $slides[$i][0]; $fx = [double]$slides[$i][1]; $fy = [double]$slides[$i][2]
  $f = Get-ChildItem "$dir\$name.jpeg","$dir\$name.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
  $src = [System.Drawing.Image]::FromFile($f.FullName)
  $ow = $src.Width; $oh = $src.Height

  # 1. Build the mobile crop at $RATIO, centred on the focal point.
  $cw = [Math]::Min($ow, [int]($oh * $RATIO)); $ch = [int]($cw / $RATIO)
  if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * $RATIO) }
  $cx = [int]($fx * $ow - $cw / 2); if ($cx -lt 0) { $cx = 0 }; if ($cx + $cw -gt $ow) { $cx = $ow - $cw }
  $cy = [int]($fy * $oh - $ch / 2); if ($cy -lt 0) { $cy = 0 }; if ($cy + $ch -gt $oh) { $cy = $oh - $ch }

  $crop = New-Object System.Drawing.Bitmap($cw, $ch)
  $g1 = [System.Drawing.Graphics]::FromImage($crop)
  $g1.InterpolationMode = 'HighQualityBicubic'
  $g1.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($cx,$cy,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
  $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
  $crop.Save("$dir\gallery\$name-m.jpg", $codec, $p)

  # 2. Simulate object-fit: cover into a 390x844 phone.
  $scale = [Math]::Max($VW / $crop.Width, $VH / $crop.Height)
  $sw = $crop.Width * $scale; $sh = $crop.Height * $scale
  $offX = -($sw - $VW) * 0.5     # object-position 50% horizontally
  $offY = -($sh - $VH) * 0.4     # ~40% vertically
  $phone = New-Object System.Drawing.Bitmap($VW, $VH)
  $g2 = [System.Drawing.Graphics]::FromImage($phone)
  $g2.InterpolationMode = 'HighQualityBicubic'
  $g2.DrawImage($crop, $offX, $offY, $sw, $sh)

  $s2 = [Math]::Min($tileW / $VW, $tileH / $VH)
  $gx.DrawImage($phone, $i * $tileW + 4, 0, [int]($VW * $s2), [int]($VH * $s2))
  $gx.DrawString("$name  crop $cw x $ch", $fnt, $wb, $i * $tileW + 4, $tileH + 4)

  $g1.Dispose(); $g2.Dispose(); $crop.Dispose(); $phone.Dispose(); $src.Dispose()
}
$sheet.Save("$env:TEMP\phone-sim.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gx.Dispose(); $sheet.Dispose()
Write-Output "simulated 390x844 for $($slides.Count) slides"
