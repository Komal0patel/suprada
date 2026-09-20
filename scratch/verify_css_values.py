import os
from PIL import Image, ImageDraw

folder = r'c:\Supradha_Komal\public\assets\Founders'
artifact_dir = r'C:\Users\hp\.gemini\antigravity-ide\brain\f7d9249f-4cf2-4fae-83f6-4871be4fa3f1'

members = [
    # Row 1
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg', 'pos': 'center 15%', 'scale': 1.06},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg', 'pos': 'center 65%', 'scale': 1.0},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg', 'pos': 'center 38%', 'scale': 1.0},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg', 'pos': 'center 42%', 'scale': 1.0},
    # Row 2
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg', 'pos': 'center 28%', 'scale': 1.02},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg', 'pos': 'center 50%', 'scale': 1.0},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg', 'pos': 'center 18%', 'scale': 1.14}
]

CARD_W = 285
CARD_H = 330
GAP = 16

canvas_w = 4 * CARD_W + 3 * GAP
canvas_h = 2 * CARD_H + GAP + 60

canvas = Image.new('RGB', (canvas_w, canvas_h), (245, 242, 238))
draw = ImageDraw.Draw(canvas)

def render_css_card(img_path, pos_str, scale_val):
    orig = Image.open(img_path).convert('RGB')
    
    # Scale image to simulate CSS transform scale & object-fit cover
    w = int(CARD_W * scale_val)
    h = int((CARD_W * scale_val) / 0.8)
    
    resized = orig.resize((w, h), Image.Resampling.LANCZOS)
    
    # parse object-position Y%
    pct_val = float(pos_str.split()[1].replace('%', '')) / 100.0
    
    max_left = w - CARD_W
    max_top = h - CARD_H
    
    left = int(max_left * 0.5)
    top = int(max_top * pct_val)
    
    cropped = resized.crop((left, top, left + CARD_W, top + CARD_H))
    return cropped

for idx, m in enumerate(members):
    img_path = os.path.join(folder, m['img'])
    card_cropped = render_css_card(img_path, m['pos'], m['scale'])
    
    if idx < 4:
        col = idx
        row_y = 30
    else:
        col = idx - 4
        x_start = int((canvas_w - (3 * CARD_W + 2 * GAP)) / 2)
        row_y = 30 + CARD_H + GAP
        
    x_pos = col * (CARD_W + GAP) if idx < 4 else x_start + col * (CARD_W + GAP)
    
    canvas.paste(card_cropped, (x_pos, row_y))
    draw.rectangle([x_pos, row_y, x_pos + CARD_W, row_y + CARD_H], outline=(60, 60, 60), width=1)

# Draw red laser line at head top (Y = 48px from card top)
# Draw green laser line at eye level (Y = 112px from card top)
draw.line([(0, 30 + 48), (canvas_w, 30 + 48)], fill=(255, 0, 0), width=2)
draw.line([(0, 30 + 112), (canvas_w, 30 + 112)], fill=(0, 220, 0), width=2)

r2_y = 30 + CARD_H + GAP
draw.line([(0, r2_y + 48), (canvas_w, r2_y + 48)], fill=(255, 0, 0), width=2)
draw.line([(0, r2_y + 112), (canvas_w, r2_y + 112)], fill=(0, 220, 0), width=2)

out_file = os.path.join(artifact_dir, 'final_css_verified_alignment.png')
canvas.save(out_file)
print(f"Verified CSS composite saved to {out_file}")
