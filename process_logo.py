import sys
from PIL import Image

def process():
    try:
        img = Image.open('public/base01-logo-original.png').convert('RGBA')
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
    
    # We will build masks and determine foreground
    fg_x_proj = [0] * width
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2) ** 0.5
            
            # If dist is small, it's background (alpha -> 0)
            # If dist is large, it's foreground (alpha -> 255)
            # The red is (236, 14, 25) vs bg (253, 230, 232). dist is very large (~216)
            alpha = min(255, int(dist * 2))
            
            t_pixels[x, y] = (0, 0, 0, alpha) # grayscale alpha mask basically
            if alpha > 50:
                fg_x_proj[x] += 1

    # Let's find the 'A'
    # Start of words is around x=44
    # End is around x=365
    # The minimums in fg_x_proj could tell us letter boundaries.
    
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
        out.save(f"public/base01-logo-{name}.png")

    # 1. All Black (Cocoa)
    generate_variation("black", lambda x, y: cocoa)
    
    # 2. All Pink (Rose)
    generate_variation("pink", lambda x, y: rose)
    
    # 3. All Bone
    generate_variation("bone", lambda x, y: bone)
    
    # Now for Black + Pink
    # We need to guess the 'A' boundaries.
    # We can write the projection to a file to debug, or just make an educated guess.
    # Total width 320. 6 characters. A is approx x=90 to x=150.
    
    # Let's do a strict boundary finding:
    # We want local minima in fg_x_proj.
    minima = []
    # Smooth the projection slightly
    smooth = [0]*width
    for i in range(2, width-2):
        smooth[i] = sum(fg_x_proj[i-2:i+3])/5
        
    for i in range(45, 360):
        if smooth[i] < smooth[i-1] and smooth[i] < smooth[i+1]:
            if smooth[i] < 20: # deep enough valley
                minima.append(i)
                
    print("Valleys (potential letter bounds):", minima)
    # We will just guess A is between x=100 and x=150 if no valleys found
    
    def black_pink_func(x, y):
        # A is likely the second letter
        if 90 < x < 155:
            return rose
        return cocoa
        
    generate_variation("black-pink", black_pink_func)

if __name__ == '__main__':
    process()
