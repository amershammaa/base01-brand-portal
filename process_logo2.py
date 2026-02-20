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
    
    # Obsidian Cocoa: #2D2424 -> 45, 36, 36
    cocoa = (45, 36, 36, 255)
    # Luminous Rose: #F2C1C3 -> 242, 193, 195
    rose = (242, 193, 195, 255)
    # Antique Bone: #FAFAF8 -> 250, 250, 248
    bone = (250, 250, 248, 255)
    
    # Create the transparent base
    transparent_img = Image.new("RGBA", (width, height))
    
    pixels = img.load()
    t_pixels = transparent_img.load()
    
    fg_x_proj = [0] * width
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2) ** 0.5
            
            # This logo is also red on pink bg, so distance acts as alpha
            alpha = min(255, int(dist * 2))
            
            # THRESHOLD FIX to remove compression artifact halo
            if alpha > 120:
                alpha = 255
            elif alpha < 80:
                alpha = 0
            else:
                # Smooth the edge a bit
                alpha = int(((alpha - 80) / 40.0) * 255)
            
            t_pixels[x, y] = (0, 0, 0, alpha)
            if alpha > 50:
                fg_x_proj[x] += 1

    def generate_variation(name, color_func):
        out = Image.new("RGBA", (width, height))
        out_p = out.load()
        for y in range(height):
            for x in range(width):
                _, _, _, a = t_pixels[x, y]
                if a > 0:
                    c = color_func(x, y)
                    out_p[x, y] = (c[0], c[1], c[2], a)
                else:
                    out_p[x, y] = (0, 0, 0, 0)
        out.save(f"public/base01-logo2-{name}.png")

    generate_variation("black", lambda x, y: cocoa)
    generate_variation("pink", lambda x, y: rose)
    generate_variation("bone", lambda x, y: bone)
    
    # For Black + Pink, we need to separate BASE and 01.
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
    print(f"Largest gap starts at {gap_start}, width {max_gap}. Splitting at {split_x}")

    def black_pink_func(x, y):
        # Everything after the split is 01 -> pink
        if x >= split_x:
            return rose
        return cocoa
        
    generate_variation("black-pink", black_pink_func)

if __name__ == '__main__':
    process()
