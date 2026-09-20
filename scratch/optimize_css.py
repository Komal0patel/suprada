import os

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg'},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg'},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg'},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg'},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg'},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg'},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg'}
]

raw_eye = {'nagaraju_lady.jpg': 384, 'nagaraju_man.jpg': 371, 'sunil_jayaraj.jpg': 347, 'prema_ramadas.jpg': 353, 'priya_amaresh.jpg': 354, 'srinivas_ramadas.jpg': 360, 'vinaya.jpg': 359}
raw_head = {'nagaraju_lady.jpg': 160, 'nagaraju_man.jpg': 111, 'sunil_jayaraj.jpg': 101, 'prema_ramadas.jpg': 97, 'priya_amaresh.jpg': 122, 'srinivas_ramadas.jpg': 120, 'vinaya.jpg': 151}

CARD_W = 285
CARD_H = 330
TARGET_EYE = 110.0

print("Exact CSS configurations:")
print("=" * 70)

for m in members:
    name = m['name']
    img = m['img']
    ey = raw_eye[img]
    hd = raw_head[img]
    
    # We want (ey / 1000.0) * img_h - crop_top = TARGET_EYE
    # Let's pick scale so face size is consistent
    if name == 'Late Mrs. Renuka Nagaraju':
        scale = 1.12
    elif name == 'Dr. Vinaya, B.N.Y.S':
        scale = 1.20
    elif name == 'Smt. Priya Amaresh':
        scale = 1.05
    else:
        scale = 1.00
        
    img_w = CARD_W * scale
    img_h = img_w / 0.8
    max_top = img_h - CARD_H
    
    desired_crop_top = (ey / 1000.0) * img_h - TARGET_EYE
    
    if max_top > 0:
        pos_pct = max(0.0, min(100.0, (desired_crop_top / max_top) * 100.0))
        actual_crop_top = max_top * (pos_pct / 100.0)
    else:
        pos_pct = 0.0
        actual_crop_top = 0.0
        
    extra_trans_y = desired_crop_top - actual_crop_top
    
    eye_final = (ey / 1000.0) * img_h - actual_crop_top - extra_trans_y
    head_final = (hd / 1000.0) * img_h - actual_crop_top - extra_trans_y
    
    print(f"/* {name} */")
    print(f"objectPosition: 'center {pos_pct:.1f}%'")
    if scale != 1.0 or abs(extra_trans_y) > 0.1:
        trans_str = []
        if scale != 1.0:
            trans_str.append(f"scale({scale:.2f})")
        if abs(extra_trans_y) > 0.1:
            trans_str.append(f"translateY({-extra_trans_y:.1f}px)")
        print(f"transform: '{' '.join(trans_str)}'")
    print(f"// Result -> Eye Y: {eye_final:.1f}px, Head Top Y: {head_final:.1f}px\n")
