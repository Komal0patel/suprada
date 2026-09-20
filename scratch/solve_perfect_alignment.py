import os, cv2
from PIL import Image, ImageDraw, ImageFont

folder = r'c:\Supradha_Komal\public\assets\Founders'
artifact_dir = r'C:\Users\hp\.gemini\antigravity-ide\brain\f7d9249f-4cf2-4fae-83f6-4871be4fa3f1'

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg', 'eye_raw': 384, 'head_raw': 160, 'face_h': 320},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg', 'eye_raw': 371, 'head_raw': 111, 'face_h': 374},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg', 'eye_raw': 347, 'head_raw': 101, 'face_h': 353},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg', 'eye_raw': 353, 'head_raw': 97, 'face_h': 367},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg', 'eye_raw': 354, 'head_raw': 122, 'face_h': 334},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg', 'eye_raw': 360, 'head_raw': 120, 'face_h': 345},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg', 'eye_raw': 359, 'head_raw': 151, 'face_h': 298}
]

CARD_W = 285
CARD_H = 330
GAP = 15

# Target in card (330px height):
# We want top of head to be at Y = 40px
# We want eye level to be at Y = 110px
TARGET_HEAD_Y = 40
TARGET_EYE_Y = 110

results = {}

canvas_w = 4 * CARD_W + 3 * GAP
canvas_h = 2 * CARD_H + GAP + 60

canvas = Image.new('RGB', (canvas_w, canvas_h), (242, 238, 234))
draw = ImageDraw.Draw(canvas)

print(f"{'Member':30s} | {'Scale':6s} | {'Object-Position Y%':20s} | {'Transform Y Shift':18s}")
print("-" * 80)

for idx, m in enumerate(members):
    path = os.path.join(folder, m['img'])
    orig = Image.open(path).convert('RGB')
    
    # Target face height in card: ~110px
    target_face_h = 110.0
    scale = (target_face_h / m['face_h']) * (1000.0 / CARD_H)
    # Ensure scale is at least 1.0 so image covers card width
    scale = max(1.0, scale)
    
    # Resized image dimensions:
    img_w = int(CARD_W * scale)
    img_h = int((CARD_W * scale) / 0.8) # 800x1000 aspect ratio = 0.8
    
    resized = orig.resize((img_w, img_h), Image.Resampling.LANCZOS)
    
    # In resized image:
    eye_in_resized = (m['eye_raw'] / 1000.0) * img_h
    head_in_resized = (m['head_raw'] / 1000.0) * img_h
    
    # We want eye_in_resized - crop_top = TARGET_EYE_Y
    crop_top = eye_in_resized - TARGET_EYE_Y
    
    # Calculate object-position Y% or crop parameters:
    max_crop_top = img_h - CARD_H
    if max_crop_top > 0:
        obj_pos_pct = (crop_top / max_crop_top) * 100.0
    else:
        obj_pos_pct = 0.0
        
    # Clamp crop_top between 0 and max_crop_top
    clamped_crop_top = max(0, min(crop_top, max_crop_top))
    y_trans = crop_top - clamped_crop_top # remaining shift needed via transform
    
    left = int((img_w - CARD_W) / 2)
    top = int(clamped_crop_top)
    
    cropped = resized.crop((left, top, left + CARD_W, top + CARD_H))
    
    # Apply y_trans shift if needed by pasting onto card background
    card_img = Image.new('RGB', (CARD_W, CARD_H), (200, 200, 200))
    card_img.paste(cropped, (0, -int(y_trans)))
    
    # Store results
    obj_pos_str = f"center {obj_pos_pct:.1f}%"
    print(f"{m['name']:30s} | {scale:.3f} | {obj_pos_str:20s} | {y_trans:.1f}px")
    results[m['name']] = {
        'scale': scale,
        'obj_pos': obj_pos_pct,
        'y_trans': y_trans
    }
    
    # Paste on composite canvas
    if idx < 4:
        col = idx
        row_y = 30
    else:
        col = idx - 4
        x_start = int((canvas_w - (3 * CARD_W + 2 * GAP)) / 2)
        row_y = 30 + CARD_H + GAP
        
    x_pos = col * (CARD_W + GAP) if idx < 4 else x_start + col * (CARD_W + GAP)
    
    canvas.paste(card_img, (x_pos, row_y))
    draw.rectangle([x_pos, row_y, x_pos + CARD_W, row_y + CARD_H], outline=(80, 80, 80), width=1)
    draw.text((x_pos + 10, row_y + CARD_H - 25), m['name'].split()[0], fill=(255, 255, 255))

# Draw perfect alignment horizontal guidelines
draw.line([(0, 30 + TARGET_HEAD_Y), (canvas_w, 30 + TARGET_HEAD_Y)], fill=(255, 30, 30), width=2)
draw.line([(0, 30 + TARGET_EYE_Y), (canvas_w, 30 + TARGET_EYE_Y)], fill=(30, 255, 30), width=2)

r2_y = 30 + CARD_H + GAP
draw.line([(0, r2_y + TARGET_HEAD_Y), (canvas_w, r2_y + TARGET_HEAD_Y)], fill=(255, 30, 30), width=2)
draw.line([(0, r2_y + TARGET_EYE_Y), (canvas_w, r2_y + TARGET_EYE_Y)], fill=(30, 255, 30), width=2)

out_file = os.path.join(artifact_dir, 'perfect_aligned_heads.png')
canvas.save(out_file)
print(f"\nSaved perfectly aligned composite preview to: {out_file}")
