import sys
from PIL import Image

def process():
    try:
        img = Image.open('public/base01-logo2-original.png').convert('RGBA')
    except Exception as e:
        print("Failed to open image:", e)
        return

    width, height = img.size
    bg_color = img.getpixel((0, 0))
    
    # Obsidian Cocoa: #2D2424 -> 45, 36, 36
    cocoa = (45, 36, 36, 255)
    # Luminous Rose: #F2C1C3 -> 242, 193, 195
    rose = (242, 193, 195, 255)
    # Antique Bone: #FAFAF8 -> 250, 250, 248
    bone = (250, 250, 248, 255)

    pixels = img.load()
    
    # We will build a clean alpha channel first
    alphas = []
    
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
        alphas.append(row)

    # B is (65, 142)
    # 01 is (395, 477)
    
    b_start, b_end = 65, 142
    zero_start, one_end = 395, 477
    
    b_width = b_end - b_start
    # To grab the full vertical, we take the whole height.
    # 01 width:
    zero1_width = one_end - zero_start
    
    spacing = 15
    new_width = b_width + spacing + zero1_width
    
    def generate_variation(name, bg_rgba, fg_func):
        out = Image.new("RGBA", (new_width, height), bg_rgba)
        out_p = out.load()
        
        # Paste B
        for y in range(height):
            for x in range(b_width):
                orig_x = b_start + x
                a = alphas[y][orig_x]
                if a > 0:
                    c = fg_func('B')
                    # Blend with background if necessary, but we can just use the alpha mask
                    bg = bg_rgba
                    out_p[x, y] = (
                        int((c[0] * a + bg[0] * (255 - a)) / 255),
                        int((c[1] * a + bg[1] * (255 - a)) / 255),
                        int((c[2] * a + bg[2] * (255 - a)) / 255),
                        255 if bg[3] == 255 else a
                    )
                    
        # Paste 01
        for y in range(height):
            for x in range(zero1_width):
                orig_x = zero_start + x
                a = alphas[y][orig_x]
                if a > 0:
                    c = fg_func('01')
                    bg = bg_rgba
                    target_x = b_width + spacing + x
                    out_p[target_x, y] = (
                        int((c[0] * a + bg[0] * (255 - a)) / 255),
                        int((c[1] * a + bg[1] * (255 - a)) / 255),
                        int((c[2] * a + bg[2] * (255 - a)) / 255),
                        255 if bg[3] == 255 else a
                    )
        
        # Save keeping transparency if bg_rgba is (0,0,0,0)
        # We need actual transparency when bg_rgba == (0,0,0,0)
        # So wait, if bg is transparent, the blend above sets alpha=a
        if bg_rgba[3] == 0:
            for y in range(height):
                for x in range(new_width):
                    if x < b_width:
                        a = alphas[y][b_start + x]
                        if a > 0:
                            c = fg_func('B')
                            out_p[x, y] = (c[0], c[1], c[2], a)
                    elif x >= b_width + spacing:
                        offset_x = x - (b_width + spacing)
                        a = alphas[y][zero_start + offset_x]
                        if a > 0:
                            c = fg_func('01')
                            out_p[x, y] = (c[0], c[1], c[2], a)
                        
        out.save(f"public/icon-b01-{name}.png")

    # Original Red
    # Find average color of B
    red = (236, 14, 25, 255)
    
    generate_variation("original", (0, 0, 0, 0), lambda letter: red)
    generate_variation("black", (0, 0, 0, 0), lambda letter: cocoa)
    generate_variation("pink", (0, 0, 0, 0), lambda letter: rose)
    generate_variation("bone", (45, 36, 36, 255), lambda letter: bone) # On dark bg
    generate_variation("black-pink", (0, 0, 0, 0), lambda letter: cocoa if letter == 'B' else rose)
    
if __name__ == '__main__':
    process()
