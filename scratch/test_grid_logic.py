import re, os

pages_dir = r'c:\Supradha_Komal\src\pages'

files_to_check = [
    'DetoxCleansing.jsx',
    'Physiotherapy.jsx',
    'Ayurveda.jsx',
    'NutritionLifestyle.jsx',
    'MentalEmotional.jsx',
    'HolisticTherapies.jsx',
    'YogaMeditation.jsx',
    'Naturopathy.jsx'
]

def get_layout_info(count):
    if count % 4 == 0:
        cols = 4
        rows = count // 4
        leftover = 0
    elif count % 3 == 0:
        cols = 3
        rows = count // 3
        leftover = 0
    elif count == 5:
        cols = 3
        rows = 2 # 3 in row 1, 2 centered in row 2
        leftover = 2
    elif count == 7:
        cols = 4
        rows = 2 # 4 in row 1, 3 centered in row 2
        leftover = 3
    else:
        cols = 4 if count > 4 else count
        rows = (count + cols - 1) // cols
        leftover = count % cols

    return f"Count={count:2d} -> {cols} cols layout (Rows={rows}, Last Row={leftover if leftover else cols} centered)"

print("Testing Card Count Layout Distribution:")
print("=" * 60)
for c in range(1, 14):
    print(get_layout_info(c))
