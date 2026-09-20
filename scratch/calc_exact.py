import os

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg', 'pos': 0.0, 'scale': 1.05},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg', 'pos': 0.85, 'scale': 1.0},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg', 'pos': 0.50, 'scale': 1.0},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg', 'pos': 0.55, 'scale': 1.0},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg', 'pos': 0.35, 'scale': 1.02},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg', 'pos': 0.65, 'scale': 1.0},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg', 'pos': 0.05, 'scale': 1.15}
]

raw_eye = {'nagaraju_lady.jpg': 384, 'nagaraju_man.jpg': 371, 'sunil_jayaraj.jpg': 347, 'prema_ramadas.jpg': 353, 'priya_amaresh.jpg': 354, 'srinivas_ramadas.jpg': 360, 'vinaya.jpg': 359}
raw_head = {'nagaraju_lady.jpg': 160, 'nagaraju_man.jpg': 111, 'sunil_jayaraj.jpg': 101, 'prema_ramadas.jpg': 97, 'priya_amaresh.jpg': 122, 'srinivas_ramadas.jpg': 120, 'vinaya.jpg': 151}

CARD_W = 285
CARD_H = 330

for m in members:
    img_name = m['img']
    scale = m['scale']
    pos_pct = m['pos']
    
    img_w = CARD_W * scale
    img_h = img_w / 0.8
    
    max_top = img_h - CARD_H
    crop_top = max_top * pos_pct
    
    eye_in_card = (raw_eye[img_name] / 1000.0) * img_h - crop_top
    head_in_card = (raw_head[img_name] / 1000.0) * img_h - crop_top
    
    print(f"{m['name']:30s} -> Head Top Y: {head_in_card:.1f}px, Eye Y: {eye_in_card:.1f}px")
