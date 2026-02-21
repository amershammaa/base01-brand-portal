import sys
from PIL import Image

def process():
    try:
        img = Image.open('public/base01-logo2-original.png').convert('RGBA')
    except Exception as e:
        print("Failed to open image:", e)
        return

    width, height = img.size
    bg_color = img.getpixel((0, 0)) # (253, 230, 232, ...)
    
    cocoa = (45, 36, 36, 255)
    rose = (242, 193, 195, 255)
    bone = (250, 250, 248, 255)
    
    # NEW Deep Luxury Red (Dark Red)
    deep_red = (139, 0, 0, 255) # Hex: #8B0000
    
    gray = (160, 160, 160, 255)
    white_bg = (255, 255, 255, 255)

    pixels = img.load()
    
    # Calculate alpha map
    alphas = []
    fg_x_proj = [0] * width
    for y in range(height):
        row = []
        for x in range(width):
            r, g, b, a = pixels[x, y]
            dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2) ** 0.5
            alpha = min(255, int(dist * 2))
            
            if alpha > 120:
                alpha = 255
            elif alpha < 80:
                alpha = 0
            else:
                alpha = int(((alpha - 80) / 40.0) * 255)
            row.append(alpha)
            if alpha > 50:
                fg_x_proj[x] += 1
        alphas.append(row)

    # Find the split for BASE and 01
    gap_start = 0
    max_gap = 0
    current_gap = 0
    current_gap_start = 0
    
    for x in range(width):
        if fg_x_proj[x] == 0:
            if current_gap == 0:
                current_gap_start = x
            current_gap += 1
        else:
            if current_gap > max_gap:
                max_gap = current_gap
                gap_start = current_gap_start
            current_gap = 0
            
    split_x = gap_start + (max_gap // 2)

    def generate_variation(name, base_color, zero1_color):
        out = Image.new("RGBA", (width, height), white_bg)
        out_p = out.load()
        for y in range(height):
            for x in range(width):
                a = alphas[y][x]
                if a > 0:
                    c = base_color if x < split_x else zero1_color
                    
                    # Alpha blend over white background
                    bg = white_bg
                    final_r = int((c[0] * a + bg[0] * (255 - a)) / 255)
                    final_g = int((c[1] * a + bg[1] * (255 - a)) / 255)
                    final_b = int((c[2] * a + bg[2] * (255 - a)) / 255)
                    
                    out_p[x, y] = (final_r, final_g, final_b, 255)
        out.save(f"public/base01-darkred-{name}.png")

    variations = [
        ("all-darkred", deep_red, deep_red),
        ("darkred-black", deep_red, cocoa),
        ("black-darkred", cocoa, deep_red),
        ("darkred-pink", deep_red, rose),
        ("pink-darkred", rose, deep_red),
        ("darkred-bone", deep_red, bone),
        ("bone-darkred", bone, deep_red),
        ("darkred-gray", deep_red, gray),
        ("gray-darkred", gray, deep_red),
        ("darkred-white", deep_red, white_bg), # Using white explicitly here
    ]

    for name, c1, c2 in variations:
        generate_variation(name, c1, c2)
        print(f"Generated {name}")

if __name__ == '__main__':
    process()
