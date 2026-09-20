import os
from PIL import Image, ImageDraw

folder = r'c:\Supradha_Komal\public\assets\Founders'
artifact_dir = r'C:\Users\hp\.gemini\antigravity-ide\brain\f7d9249f-4cf2-4fae-83f6-4871be4fa3f1'

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg', 'pos': 62.6, 'scale': 1.12},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg', 'pos': 84.5, 'scale': 1.00},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg', 'pos': 51.9, 'scale': 1.00},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg', 'pos': 60.0, 'scale': 1.00},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg', 'pos': 50.9, 'scale': 1.05},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg', 'pos': 69.5, 'scale': 1.00},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg', 'pos': 44.6, 'scale': 1.20}
]

CARD_W = 285
CARD_H = 330
GAP = 16

canvas_w = 4 * CARD_W + 3 * GAP
canvas_h = 2 * CARD_H + GAP + 60

canvas = Image.new('RGB', (canvas_w, canvas_h), (245, 242, 238))
draw = ImageDraw.Draw(canvas)

for idx, m in enumerate(members):
    path = os.path.join(folder, m['img'])
    orig = Image.open(path).convert('RGB')
    
    scale = m['scale']
    pos_pct = m['pos'] / 100.0
    
    img_w = int(CARD_W * scale)
    img_h = int((CARD_W * scale) / 0.8)
    
    resized = orig.resize((img_w, img_h), Image.Resampling.LANCZOS)
    
    max_left = img_w - CARD_W
    max_top = img_h - CARD_H
    
    left = int(max_left * 0.5)
    top = int(max_top * pos_pct)
    
    cropped = resized.crop((left, top, left + CARD_W, top + CARD_H))
    
    if idx < 4:
        col = idx
        row_y = 30
    else:
        col = idx - 4
        x_start = int((canvas_w - (3 * CARD_W + 2 * GAP)) / 2)
        row_y = 30 + CARD_H + GAP
        
    x_pos = col * (CARD_W + GAP) if idx < 4 else x_start + col * (CARD_W + GAP)
    
    canvas.paste(cropped, (x_pos, row_y))
    draw.rectangle([x_pos, row_y, x_pos + CARD_W, row_y + CARD_H], outline=(60, 60, 60), width=1)
    draw.text((x_pos + 10, row_y + CARD_H - 25), m['name'], fill=(255, 255, 255))

# Draw exact laser lines across Row 1 and Row 2 at Eye Level = 110px
draw.line([(0, 30 + 110), (canvas_w, 30 + 110)], fill=(0, 255, 0), width=2)

r2_y = 30 + CARD_H + GAP
draw.line([(0, r2_y + 110), (canvas_w, r2_y + 110)], fill=(0, 255, 0), width=2)

out_file = os.path.join(artifact_dir, 'perfect_laser_aligned.png')
canvas.save(out_file)
print(f"Saved perfect laser aligned image to {out_file}")
