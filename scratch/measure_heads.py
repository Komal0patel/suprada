import os
from PIL import Image
import numpy as np

folder = r'c:\Supradha_Komal\public\assets\Founders'

members = [
    {'name': 'Late Mrs. Renuka Nagaraju', 'img': 'nagaraju_lady.jpg'},
    {'name': 'Acharya Dr. M. Nagaraju', 'img': 'nagaraju_man.jpg'},
    {'name': 'Mr. Sunil Jayaraj', 'img': 'sunil_jayaraj.jpg'},
    {'name': 'Dr. Prema Ramadas, MD', 'img': 'prema_ramadas.jpg'},
    {'name': 'Smt. Priya Amaresh', 'img': 'priya_amaresh.jpg'},
    {'name': 'Srinivas Ramadas', 'img': 'srinivas_ramadas.jpg'},
    {'name': 'Dr. Vinaya, B.N.Y.S', 'img': 'vinaya.jpg'}
]

print("Measuring head features in 800x1000 raw images:")
print("-" * 60)

for m in members:
    path = os.path.join(folder, m['img'])
    img = Image.open(path).convert('RGB')
    arr = np.array(img)
    
    # Analyze central region x=300 to 500
    center_strip = arr[:, 300:500, :]
    
    # Detect background vs hair/head top edge:
    # Most backgrounds are green garden or light off-white (Dr. Vinaya)
    # Let's find first row y where color significantly diverges from top background (y=0..30)
    bg_color = center_strip[0:30, :, :].mean(axis=(0,1))
    
    head_top_y = None
    for y in range(30, 400):
        row_color = center_strip[y, :, :].mean(axis=0)
        diff = np.linalg.norm(row_color - bg_color)
        if diff > 25:
            head_top_y = y
            break
            
    print(f"{m['name']:30s} | Head Top Y in 1000px height: {head_top_y}px ({head_top_y/1000*100:.1f}%)")
