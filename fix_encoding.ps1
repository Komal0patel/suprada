$path = "c:\Supradha_Komal\src\pages\Spaces.jsx"
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# These are the corrupted character sequences from double-encoding
# Map of bad char (U+00E2 based sequences) to their correct Unicode equivalents

# Build replacement table: each bad sequence -> correct char
$replacements = @{
    # ✦ U+2726: UTF-8 E2 9C A6 -> W1252 misread as U+00E2 U+0153 U+00A6
    ([char]0x00E2 + [char]0x0153 + [char]0x00A6) = [char]0x2726
    # • U+2022: UTF-8 E2 80 A2 -> W1252 misread as U+00E2 U+20AC U+00A2
    ([char]0x00E2 + [char]0x20AC + [char]0x00A2) = [char]0x2022
    # — U+2014: UTF-8 E2 80 94 -> W1252 as U+00E2 U+20AC U+201D  
    ([char]0x00E2 + [char]0x20AC + [char]0x201D) = [char]0x2014
    # ' U+2019: UTF-8 E2 80 99 -> W1252 as U+00E2 U+20AC U+2122
    ([char]0x00E2 + [char]0x20AC + [char]0x2122) = [char]0x2019
    # → U+2192: UTF-8 E2 86 92 -> W1252 as U+00E2 U+2020 U+2019 (already partially fixed)
    ([char]0x00E2 + [char]0x2020 + [char]0x2019) = [char]0x2192
    # ← U+2190: UTF-8 E2 86 90 -> W1252 as U+00E2 U+2020 U+0090
    ([char]0x00E2 + [char]0x2020 + [char]0x0090) = [char]0x2190
    # ↓ U+2193: UTF-8 E2 86 93 -> W1252 as U+00E2 U+2020 U+201C
    ([char]0x00E2 + [char]0x2020 + [char]0x201C) = [char]0x2193
    # ↑ U+2191: UTF-8 E2 86 91 -> W1252 as U+00E2 U+2020 U+2018
    ([char]0x00E2 + [char]0x2020 + [char]0x2018) = [char]0x2191
}

foreach ($bad in $replacements.Keys) {
    $good = $replacements[$bad]
    $count = ([regex]::Matches($text, [regex]::Escape($bad))).Count
    if ($count -gt 0) {
        Write-Host "Replacing '$bad' ($('{0:X4}' -f [int]$bad[0])) x$count -> '$good'"
        $text = $text.Replace($bad, $good)
    }
}

# Also fix emoji that got corrupted: 4-byte UTF-8 sequences read as W1252
# These appear as sequences starting with U+00EF U+00BF or U+00F0
# Replace with simple text alternatives to avoid further corruption
$text = $text -replace [char]0x00EF + '.{0,2}', ''  # Remove corrupted emoji sequences

[System.IO.File]::WriteAllText($path, $text, [System.Text.Encoding]::UTF8)
Write-Host "Done!"
