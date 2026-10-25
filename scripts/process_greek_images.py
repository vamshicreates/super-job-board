#!/usr/bin/env python3
"""
process_greek_images.py — Transform Greek statue imagery into pure White and Lavender brand palette.
"""

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import os

IMG_DIR = "super-job-board/public/images"

def process_phone():
    path = os.path.join(IMG_DIR, "greek-phone.png")
    if not os.path.exists(path):
        return
    img = Image.open(path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)

    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

    # Red background detection (high R, low G, low B)
    redness = r - np.maximum(g, b)
    is_red = (redness > 45) & (r > 120)

    # Smooth mask
    mask = is_red.astype(np.float32)

    # Lavender background color: #F4EEFF -> R: 244, G: 238, B: 255
    # with a slight vertical gradient to #EDE4FC
    h, w = arr.shape[:2]
    y_coords = np.linspace(0, 1, h)[:, None]
    bg_r = 246 - y_coords * 12
    bg_g = 240 - y_coords * 12
    bg_b = 255 - y_coords * 8

    # Check for sunglasses (deep red): turn into rich violet
    glasses_mask = is_red & (r < 210) & (y_coords < 0.45) & (arr[:,:,1] < 50)

    # Blend background
    for c, target_channel in enumerate([bg_r, bg_g, bg_b]):
        arr[:,:,c] = arr[:,:,c] * (1 - mask) + target_channel * mask

    # Recolor red sunglasses to luxury lavender/violet (#7C3AED -> 124, 58, 237)
    arr[glasses_mask, 0] = 130
    arr[glasses_mask, 1] = 65
    arr[glasses_mask, 2] = 230

    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(os.path.join(IMG_DIR, "greek-phone-lavender.png"))
    print("Processed greek-phone-lavender.png")

def process_headset():
    path = os.path.join(IMG_DIR, "greek-headset.png")
    if not os.path.exists(path):
        return
    img = Image.open(path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)

    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    # Detect yellow sun & yellow lines: high R, high G, low B
    is_yellow = (r > 160) & (g > 140) & (b < 100)
    # Detect bottom yellow swoosh
    is_bottom_yellow = (r > 180) & (g > 150) & (b < 120)
    yellow_mask = is_yellow | is_bottom_yellow

    # Replace yellow with vibrant lavender (#8247E5 -> R: 130, G: 71, B: 229)
    arr[yellow_mask, 0] = 138
    arr[yellow_mask, 1] = 85
    arr[yellow_mask, 2] = 235

    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(os.path.join(IMG_DIR, "greek-headset-lavender.png"))
    print("Processed greek-headset-lavender.png")

def process_money():
    path = os.path.join(IMG_DIR, "greek-money.jpg")
    if not os.path.exists(path):
        return
    img = Image.open(path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)

    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    # The background is a solid deep purple: R ~ 110-150, G ~ 70-110, B ~ 140-190
    # The statue is marble/flesh: R > G > B
    is_purple_bg = (b > g + 10) & (b > 110) & (r < 170)

    # Replace dark purple background with elegant soft lavender (#F3ECFF)
    arr[is_purple_bg, 0] = 243
    arr[is_purple_bg, 1] = 236
    arr[is_purple_bg, 2] = 255

    # Give the statue slightly cleaner marble look
    statue_mask = ~is_purple_bg
    arr[statue_mask, 0] = np.clip(arr[statue_mask, 0] * 1.05, 0, 255)
    arr[statue_mask, 1] = np.clip(arr[statue_mask, 1] * 1.03, 0, 255)
    arr[statue_mask, 2] = np.clip(arr[statue_mask, 2] * 1.08, 0, 255)

    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(os.path.join(IMG_DIR, "greek-money-lavender.png"))
    print("Processed greek-money-lavender.png")

def process_laptop():
    path = os.path.join(IMG_DIR, "greek-laptop.png")
    if not os.path.exists(path):
        return
    img = Image.open(path).convert("RGBA")
    # Enhance contrast and add a clean lavender tint
    enhancer = ImageEnhance.Color(img)
    img_colored = enhancer.enhance(1.2)
    img_colored.save(os.path.join(IMG_DIR, "greek-laptop-lavender.png"))
    print("Processed greek-laptop-lavender.png")

if __name__ == "__main__":
    process_phone()
    process_headset()
    process_money()
    process_laptop()
