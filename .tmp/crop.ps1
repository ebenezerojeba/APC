Add-Type -AssemblyName System.Drawing
$dir = "$PWD\src\assets"
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
$f = Get-ChildItem "$dir\ojtinubu.jpeg","$dir\ojtinubu.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.46 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\ojtinubu-m.jpg", $codec, $p)
Write-Output "ojtinubu -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$f = Get-ChildItem "$dir\oj5.jpeg","$dir\oj5.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.56 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\oj5-m.jpg", $codec, $p)
Write-Output "oj5 -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$f = Get-ChildItem "$dir\ojelabi31.jpeg","$dir\ojelabi31.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.58 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\ojelabi31-m.jpg", $codec, $p)
Write-Output "ojelabi31 -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$f = Get-ChildItem "$dir\oj11.jpeg","$dir\oj11.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.5 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\oj11-m.jpg", $codec, $p)
Write-Output "oj11 -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$f = Get-ChildItem "$dir\ojelabi39.jpeg","$dir\ojelabi39.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.5 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\ojelabi39-m.jpg", $codec, $p)
Write-Output "ojelabi39 -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
$f = Get-ChildItem "$dir\oj10.jpeg","$dir\oj10.jpg" -ErrorAction SilentlyContinue | Select-Object -First 1
$src = [System.Drawing.Image]::FromFile($f.FullName)
$ow = $src.Width; $oh = $src.Height
$cw = [Math]::Min($ow, [int]($oh * 0.8))
$ch = [int]($cw / 0.8)
if ($ch -gt $oh) { $ch = $oh; $cw = [int]($ch * 0.8) }
$x = [int](0.5 * $ow - $cw / 2); if ($x -lt 0) { $x = 0 }; if ($x + $cw -gt $ow) { $x = $ow - $cw }
$y = [int](($oh - $ch) / 2); if ($y -lt 0) { $y = 0 }
$bmp = New-Object System.Drawing.Bitmap($cw, $ch)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($x,$y,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
$p = New-Object System.Drawing.Imaging.EncoderParameters(1)
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save("$dir\gallery\oj10-m.jpg", $codec, $p)
Write-Output "oj10 -> $cw x $ch"
$g.Dispose(); $bmp.Dispose(); $src.Dispose()