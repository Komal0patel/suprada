import os
from PIL import Image, ImageDraw, ImageFont

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

# Card dimensions in preview composite
CARD_W = 285
CARD_H = 330
GAP = 15

# Let's test custom crop parameters for each person:
# scale: zoom factor
# y_offset: vertical shift in percentage or pixels
# object_position: e.g. 'center top', 'center 20%', etc.

configs = {
    'Late Mrs. Renuka Nagaraju': {'scale': 1.15, 'y_shift': -10},
    'Acharya Dr. M. Nagaraju': {'scale': 1.0, 'y_shift': 30},
    'Mr. Sunil Jayaraj': {'scale': 1.0, 'y_shift': 15},
    'Dr. Prema Ramadas, MD': {'scale': 1.0, 'y_shift': 15},
    'Smt. Priya Amaresh': {'scale': 1.1, 'y_shift': -5},
    'Srinivas Ramadas': {'scale': 1.0, 'y_shift': 15},
    'Dr. Vinaya, B.N.Y.S': {'scale': 1.05, 'y_shift': -5}
}

# Create composite canvas for 7 cards in 1 row (or 4 in row 1, 3 in row 2)
canvas_w = 4 * CARD_W + 3 * GAP
canvas_h = 2 * CARD_H + GAP + 40

canvas = Image.new('RGB', (canvas_w, canvas_h), (245, 240, 235))
draw = ImageDraw.Draw(canvas)

for idx, member in enumerate(members):
    img_path = os.path.join(folder, member['img'])
    orig = Image.open(img_path).convert('RGB')
    
    # Calculate row and col
    if idx < 4:
        row = 0
        col = idx
    else:
        row = 1
        col = idx - 4 # or offset for center
    
    x_pos = col * (CARD_W + GAP)
    if row == 1:
        x_pos = int((canvas_w - (3 * CARD_W + 2 * GAP)) / 2) + (idx - 4) * (CARD_W + GAP)
    
    y_pos = row * (CARD_H + GAP) + 30
    
    # Simple object-fit cover simulation with object-position / shift
    cfg = configs.get(member['name'], {'scale': 1.0, 'y_shift': 0})
    sc = cfg['scale']
    ys = cfg['y_shift']
    
    # Base cover crop:
    # 800x1000 -> card aspect ratio CARD_W / CARD_H = 285 / 330 = 0.8636
    # Source aspect ratio = 0.8
    # To cover CARD_W x CARD_H:
    # Scale source so width = CARD_W * sc, height = (CARD_W * sc) / 0.8
    new_w = int(CARD_W * sc)
    new_h = int((CARD_W * sc) / 0.8)
    
    resized = orig.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Crop CARD_W x CARD_H from resized
    left = int((new_w - CARD_W) / 2)
    top = int(ys) # vertical offset
    top = max(0, min(top, new_h - CARD_H))
    
    cropped = resized.crop((left, top, left + CARD_W, top + CARD_H))
    canvas.paste(cropped, (x_pos, y_pos))
    
    # Draw name label
    draw.text((x_pos + 5, y_pos + CARD_H - 25), member['name'].split()[0], fill=(255, 255, 255))

# Draw horizontal alignment reference lines
line_y1 = 30 + 45 # Head top guideline
line_y2 = 30 + 110 # Eye line guideline
line_y3 = 30 + CARD_H + GAP + 45 # Row 2 Head top
line_y4 = 30 + CARD_H + GAP + 110 # Row 2 Eye line

draw.line([(0, line_y1), (canvas_w, line_y1)], fill=(255, 0, 0), width=2)
draw.line([(0, line_y2), (canvas_w, line_y2)], fill=(0, 255, 0), width=2)
draw.line([(0, line_y3), (canvas_w, line_y3)], fill=(255, 0, 0), width=2)
draw.line([(0, line_y4), (canvas_w, line_y4)], fill=(0, 255, 0), width=2)

out_path = os.path.join(artifact_dir, 'head_alignment_test.png')
canvas.save(out_path)
print(f'Saved test render to {out_path}')
