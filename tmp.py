from PIL import Image
import os

root = 'static/img/cert'
for file in os.listdir(root):
    if '-720x350' in file:
        continue

    img = Image.open(os.path.join(root, file))
    resized = img.resize((720, 400), Image.Resampling.NEAREST)
    new_name = os.path.splitext(file)[0] + '-720x400.jpg'
    resized.save(os.path.join(root, new_name))
