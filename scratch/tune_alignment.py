import os
from PIL import Image, ImageDraw

folder = r'c:\Supradha_Komal\public\assets\Founders'
artifact_dir = r'C:\Users\hp\.gemini\antigravity-ide\brain\f7d9249f-4cf2-4fae-83f6-4871be4fa3f1'

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg'},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg'},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg'},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg'},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg'},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg'},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg'}
]

# We want the head top (hair/forehead top) of EVERY person to be at y = 45px from top of card (13.6% of 330px height)
# And eyes at y = 105px from top of card.

# Card dimensions
CARD_W = 285
CARD_H = 330
GAP = 15

# Let's define transform parameters for each card:
# scale: zoom factor
# y_percent: object-position vertical percentage (0% to 100%) or y_offset in pixels relative to cropped card
params = {
    'Late Mrs. Renuka Nagaraju': {'scale': 1.08, 'y_pos_pct': 0, 'y_trans': 0},
    'Acharya Dr. M. Nagaraju': {'scale': 1.0, 'y_pos_pct': 100, 'y_trans': 18},
    'Mr. Sunil Jayaraj': {'scale': 1.0, 'y_pos_pct': 100, 'y_trans': 12},
    'Dr. Prema Ramadas, MD': {'scale': 1.0, 'y_pos_pct': 80, 'y_trans': 10},
    'Smt. Priya Amaresh': {'scale': 1.08, 'y_pos_pct': 0, 'y_trans': 0},
    'Srinivas Ramadas': {'scale': 1.0, 'y_pos_pct': 90, 'y_trans': 10},
    'Dr. Vinaya, B.N.Y.S': {'scale': 1.12, 'y_pos_pct': 0, 'y_trans': -8}
}

canvas_w = 4 * CARD_W + 3 * GAP
canvas_h = 2 * CARD_H + GAP + 60

canvas = Image.new('RGB', (canvas_w, canvas_h), (240, 235, 230))
draw = ImageDraw.Draw(canvas)

for idx, m in enumerate(members):
    img_path = os.path.join(folder, m['img'])
    orig = Image.open(img_path).convert('RGB')
    
    p = params[m['name']]
    sc = p['scale']
    y_pct = p['y_pos_pct'] / 100.0
    y_trans = p['y_trans']
    
    # Scale image
    w = int(CARD_W * sc)
    h = int((CARD_W * sc) / 0.8)
    resized = orig.resize((w, h), Image.Resampling.LANCZOS)
    
    # Calculate crop window
    left = int((w - CARD_W) / 2)
    max_top = h - CARD_H
    top = int(max_top * y_pct) + int(y_trans)
    top = max(0, min(top, h - CARD_H))
    
    cropped = resized.crop((left, top, left + CARD_W, top + CARD_H))
    
    # Position on canvas
    if idx < 4:
        col = idx
        row_y = 30
    else:
        col = idx - 4
        x_start = int((canvas_w - (3 * CARD_W + 2 * GAP)) / 2)
        row_y = 30 + CARD_H + GAP
        
    if idx < 4:
        x_pos = col * (CARD_W + GAP)
    else:
        x_pos = x_start + col * (CARD_W + GAP)
        
    canvas.paste(cropped, (x_pos, row_y))
    
    # Card outline & label
    draw.rectangle([x_pos, row_y, x_pos + CARD_W, row_y + CARD_H], outline=(100, 100, 100), width=1)
    draw.text((x_pos + 10, row_y + CARD_H - 30), m['name'], fill=(255, 255, 255))

# Draw horizontal alignment guidelines across Row 1 and Row 2
# Guideline 1: Target Top of Head = 45px down from card top
draw.line([(0, 30 + 45), (canvas_w, 30 + 45)], fill=(255, 50, 50), width=2)

# Guideline 2: Target Eye Line = 105px down from card top
draw.line([(0, 30 + 105), (canvas_w, 30 + 105)], fill=(50, 255, 50), width=2)

# Row 2 Guidelines
r2_top = 30 + CARD_H + GAP
draw.line([(0, r2_top + 45), (canvas_w, r2_top + 45)], fill=(255, 50, 50), width=2)
draw.line([(0, r2_top + 105), (canvas_w, r2_top + 105)], fill=(50, 255, 50), width=2)

out_file = os.path.join(artifact_dir, 'aligned_heads_preview.png')
canvas.save(out_file)
print(f"Saved aligned heads preview to {out_file}")
