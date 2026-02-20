import React, { useState, useEffect } from 'react';
import { Sun, Battery, Shield, ArrowRight, Instagram, Facebook, Twitter, Sparkles, Layout, Palette, Box, Heart, Zap, Award, Eye, Layers, Lightbulb, Camera, RefreshCw, Check, MousePointer2 } from 'lucide-react';

const BrandPortal = () => {
    const [activeTab, setActiveTab] = useState('logos');
    const [siteBg, setSiteBg] = useState('#FFF9F9'); // Default to Luminous Silk

    const renderContent = () => {
        switch (activeTab) {
            case 'icons':
                return <IconLab />;
            case 'logos':
                return <LogoShowcase />;
            case 'palette':
                return <PaletteGuide currentBg={siteBg} setBg={setSiteBg} />;
            case 'web':
                return <WebsiteMockup bg={siteBg} />;
            case 'nano':
                return <NanoBananaGuide />;
            default:
                return <IconLab />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFBFB] font-sans text-[#2D2424] flex flex-col text-sm md:text-base transition-colors duration-500">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Tenor+Sans&family=Oswald:300;400;500;700&display=swap');
          
          .font-title { font-family: 'Tenor Sans', sans-serif; }
          .font-display { font-family: 'Playfair Display', serif; }
          .font-main { font-family: 'Inter', sans-serif; }
          .font-condensed { font-family: 'Oswald', sans-serif; }
          
          .glow-pink {
            box-shadow: 0 0 20px rgba(235, 183, 185, 0.4);
          }
          .kerning-locked {
            letter-spacing: -0.08em;
          }
          .kerning-ultra {
            letter-spacing: -0.12em;
          }
        `}
            </style>

            {/* Portal Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F2C1C3] rounded-full glow-pink"></div>
                        <span className="text-2xl font-title tracking-tighter uppercase">base01</span>
                    </div>
                    <div className="flex space-x-1 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
                        {[
                            { id: 'icons', label: 'Icon Lab (Gemini Gen)', icon: Sparkles },
                            { id: 'logos', label: 'Master Archive (30)', icon: Layout },
                            { id: 'palette', label: 'Luminous Palette', icon: Palette },
                            { id: 'web', label: 'Luxury Web', icon: Box },
                            { id: 'nano', label: 'Nano Banana Pro', icon: Lightbulb }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab.id
                                    ? 'bg-[#F2C1C3] text-white shadow-lg shadow-pink-200'
                                    : 'text-gray-400 hover:text-[#F2C1C3]'
                                    }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {renderContent()}
            </main>
        </div>
    );
};

/* --- B01 ICON LAB --- */
const IconLab = () => (
    <div className="max-w-7xl mx-auto p-4 md:p-12 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-display italic text-[#2D2424]">B01 Icons</h2>
            <p className="text-gray-500 text-sm">Pristine vector typography for the B01 standalone mark. No compression, infinite scaling.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Iteration 1 */}
            <LogoBox title="01. The Signature Lock" theme="Playfair Serif / Overlap">
                <div className="flex items-baseline justify-center h-64">
                    <span className="font-display text-[180px] leading-none text-[#2D2424]">B</span>
                    <span className="font-display text-[140px] leading-none text-[#F2C1C3] italic -ml-8 tracking-tighter">01</span>
                </div>
            </LogoBox>

            {/* Iteration 2 */}
            <LogoBox title="02. The Editorial Stack" theme="Oswald Condensed / Vertical">
                <div className="flex flex-col items-center justify-center h-64 -space-y-4 mt-8">
                    <span className="font-condensed text-[160px] leading-[0.7] text-[#2D2424] font-bold">B</span>
                    <span className="font-condensed text-[160px] leading-[0.7] text-[#F2C1C3] font-bold">01</span>
                </div>
            </LogoBox>

            {/* Iteration 3 */}
            <LogoBox title="03. The Modernist" theme="Inter Black / Max Kerning">
                <div className="flex items-center justify-center h-64">
                    <span className="font-main text-[160px] leading-none text-[#2D2424] font-black tracking-tighter">B</span>
                    <span className="font-main text-[160px] leading-none text-[#F2C1C3] font-black tracking-tighter">01</span>
                </div>
            </LogoBox>

            {/* Iteration 4 */}
            <LogoBox title="04. The Classic Minimal" theme="Tenor Sans / Spaced">
                <div className="flex items-center justify-center h-64">
                    <span className="font-title text-[150px] leading-none text-[#2D2424]">B</span>
                    <span className="font-title text-[150px] leading-none text-[#F2C1C3] ml-2">01</span>
                </div>
            </LogoBox>

            {/* Iteration 5 */}
            <LogoBox title="05. The Negative Space" theme="Playfair / Obsidian Background">
                <div className="bg-[#2D2424] rounded-[2rem] w-full flex items-baseline justify-center h-64 shadow-2xl">
                    <span className="font-display text-[180px] leading-none text-[#FAFAF8]">B</span>
                    <span className="font-display text-[140px] leading-none text-[#F2C1C3] italic -ml-8 tracking-tighter">01</span>
                </div>
            </LogoBox>
        </div>
    </div>
);

/* --- 30 MASTER ARCHIVE (BREVITY VERSION) --- */
const initialLogos = [
    // V5 - Non-Bold, Base Black, 01 Red (New)
    { id: 't-mix-1', title: "V5. Sans Regular", theme: "Main Font / Not Bold", content: <h3 className="text-7xl font-main font-normal kerning-ultra text-[#2D2424]">Base<span className="text-[#EC0E19]">01</span></h3> },
    { id: 't-mix-2', title: "V5. Serif Light", theme: "Display Font / Not Bold", content: <h3 className="text-7xl font-display font-light kerning-locked text-[#2D2424]">Base<span className="text-[#EC0E19]">01</span></h3> },
    { id: 't-mix-3', title: "V5. Title Minimal", theme: "Title Font / Not Bold", content: <h3 className="text-7xl font-title kerning-ultra text-[#2D2424]">BASE<span className="text-[#EC0E19]">01</span></h3> },
    { id: 't-mix-4', title: "V5. Condensed Regular", theme: "Condensed / Not Bold", content: <h3 className="text-8xl font-condensed font-normal kerning-locked uppercase text-[#2D2424]">BASE<span className="text-[#EC0E19]">01</span></h3> },

    // Red Text Variations (New)
    { id: 't-red-2', title: "V4. Red Interlock", theme: "Overlapping / Red & Cocoa", content: <div className="flex items-center -space-x-4"><h3 className="text-8xl font-condensed font-bold text-[#EC0E19] opacity-90">base</h3><h3 className="text-8xl font-condensed font-bold text-[#2D2424]">01</h3></div> },
    { id: 't-red-3', title: "V4. Red Geometric", theme: "Interlocking / Red 01", content: <div className="flex items-center -space-x-6"><h3 className="text-8xl font-main font-black kerning-ultra uppercase text-[#2D2424]">BASE</h3><h3 className="text-8xl font-main font-black kerning-ultra uppercase text-[#EC0E19]">01</h3></div> },

    // V3
    { id: 'v3-1', title: "V3. All Red", theme: "Solid Heritage Red", content: <img src="/base01-whitebg-all-red.png" alt="All Red" className="max-w-full h-auto max-h-32 object-contain" /> },
    { id: 'v3-2', title: "V3. Red & Black", theme: "Red Base / Cocoa 01", content: <img src="/base01-whitebg-red-black.png" alt="Red & Black" className="max-w-full h-auto max-h-32 object-contain" /> },
    { id: 'v3-3', title: "V3. Black & Red", theme: "Cocoa Base / Red 01", content: <img src="/base01-whitebg-black-red.png" alt="Black & Red" className="max-w-full h-auto max-h-32 object-contain" /> },

    // V2
    { id: 'v2-2', title: "V2. All Black", theme: "Obsidian Cocoa", content: <img src="/base01-logo2-black.png" alt="Black Logo V2" className="max-w-full h-auto max-h-32 object-contain" /> },
    { id: 'v2-3', title: "V2. All Pink", theme: "Luminous Rose", content: <img src="/base01-logo2-pink.png" alt="Pink Logo V2" className="max-w-full h-auto max-h-32 object-contain" /> },
    { id: 'v2-4', title: "V2. Black & Pink", theme: "Dual Tone", content: <img src="/base01-logo2-black-pink.png" alt="Black and Pink Logo V2" className="max-w-full h-auto max-h-32 object-contain" /> },

    // V1
    { id: 'v1-3', title: "V1. All Pink", theme: "Luminous Rose", content: <img src="/base01-logo-pink.png" alt="Pink Logo" className="max-w-full h-auto max-h-32 object-contain" /> },

    // Repeating the archive logic for full history
    { id: 'arch-1', title: "01. Tall Mono", theme: "Condensed / Mono", content: <h3 className="text-7xl font-condensed font-bold kerning-locked uppercase text-[#2D2424]">base01</h3> },
    { id: 'arch-2', title: "02. Tall Pink", theme: "Condensed / Pink 01", content: <h3 className="text-7xl font-condensed font-bold kerning-locked uppercase text-[#2D2424]">base<span className="text-[#F2C1C3]">01</span></h3> },
    { id: 'arch-17', title: "17. Interlock Pink", theme: "Overlapping / Pink 01", content: <div className="flex items-center -space-x-4"><h3 className="text-8xl font-condensed font-bold text-[#2D2424] opacity-90">base</h3><h3 className="text-8xl font-condensed font-bold text-[#F2C1C3]">01</h3></div> },
    { id: 'arch-24', title: "24. Geometric Lock", theme: "Interlocking / Pink 01", content: <div className="flex items-center -space-x-6"><h3 className="text-8xl font-main font-black kerning-ultra uppercase text-[#2D2424]">BASE</h3><h3 className="text-8xl font-main font-black kerning-ultra uppercase text-[#F2C1C3]">01</h3></div> },
    { id: 'arch-25', title: "25. Absolute Regular", theme: "Sentence / Pink 01", content: <h3 className="text-7xl font-main font-normal kerning-ultra text-[#2D2424]">Base<span className="text-[#F2C1C3]">01</span></h3> },
    { id: 'arch-28', title: "28. Serene Serif", theme: "Light Serif / Pink 01", content: <h3 className="text-7xl font-display font-light kerning-locked text-[#2D2424]">Base<span className="text-[#F2C1C3]">01</span></h3> },
    { id: 'arch-29', title: "29. Ultra Fine", theme: "Thin Sans / Pink 01", content: <h3 className="text-6xl font-main font-thin kerning-ultra uppercase text-[#2D2424]">BASE<span className="text-[#F2C1C3] font-normal">01</span></h3> },
    { id: 'arch-30', title: "30. Sculpted Mono", theme: "Regular Condensed / Pink 01", content: <h3 className="text-8xl font-condensed font-normal kerning-locked uppercase text-[#2D2424]">BASE<span className="text-[#F2C1C3]">01</span></h3> }
];

const LogoShowcase = () => {
    const [logos, setLogos] = useState(initialLogos);

    const removeLogo = (id) => {
        setLogos(logos.filter(logo => logo.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-12 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-4xl font-display italic text-[#2D2424]">Archive Gallery</h2>
                <p className="text-gray-500 text-sm">Now with an editable list. Hover over a logo and click the '×' to delete variations that you don't want to keep.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {logos.map((logo, index) => (
                    <LogoBox key={logo.id} title={`[${index + 1}] ${logo.title}`} theme={logo.theme} onDelete={() => removeLogo(logo.id)}>
                        {logo.content}
                    </LogoBox>
                ))}

                <div className="flex items-center justify-center border-2 border-dashed border-pink-100 rounded-[3rem] p-12 opacity-50">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Archive Items 03-23 Cached</p>
                </div>
            </div>
        </div>
    );
};

const LogoBox = ({ title, theme, children, onDelete }) => (
    <div className="bg-white p-12 rounded-[2.5rem] border border-pink-50 shadow-sm hover:shadow-xl transition-all duration-700 flex flex-col items-center justify-center min-h-[300px] group relative overflow-hidden text-center">
        {onDelete && (
            <button
                onClick={onDelete}
                className="absolute top-6 right-8 text-gray-200 hover:text-red-500 transition-colors z-10 text-xl font-bold font-sans cursor-pointer focus:outline-none opacity-0 group-hover:opacity-100"
                title="Delete Variation"
            >
                ×
            </button>
        )}
        <div className="absolute top-6 left-8 flex flex-col items-start text-left">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#F2C1C3]">{theme}</span>
            <span className="text-[7px] font-bold uppercase tracking-widest text-gray-300 mt-0.5">{title}</span>
        </div>
        <div className="w-full transform transition-transform duration-500 group-hover:scale-105">{children}</div>
        <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-[9px] font-bold text-[#F2C1C3] uppercase tracking-widest border-b border-[#F2C1C3] pb-1 cursor-pointer">Select This Version</button>
        </div>
    </div>
);

/* --- COLOR & BACKGROUND STRATEGY --- */
const PaletteGuide = ({ currentBg, setBg }) => (
    <div className="max-w-5xl mx-auto p-12 space-y-24">
        <section className="space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-display italic mb-4 text-[#2D2424]">Luminous Blush Palette</h2>
                <p className="text-gray-500">The core colors for base01. Sophisticated, warm, and radiant.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <ColorCard hex="#F2C1C3" name="Luminous Rose" role="Primary Glow" />
                <ColorCard hex="#F9E8E8" name="Silk Blush" role="Highlight" />
                <ColorCard hex="#2D2424" name="Obsidian Cocoa" role="Typography" />
                <ColorCard hex="#FFF9F9" name="Ritual Base (ff9f9)" role="Saved Background" saved />
            </div>
        </section>

        {/* BACKGROUND TOGGLE STRATEGY */}
        <section className="space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-display italic mb-4">Website Background Strategy</h2>
                <p className="text-gray-500">Choose the canvas for your online boutique. Your choice updates the Web Mockup tab.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <button
                    onClick={() => setBg('#FAFAF8')}
                    className={`p-10 rounded-[3rem] border-2 transition-all text-left relative overflow-hidden ${currentBg === '#FAFAF8' ? 'border-[#F2C1C3] scale-105 shadow-2xl' : 'border-pink-50 opacity-60'}`}
                    style={{ backgroundColor: '#FAFAF8' }}
                >
                    <h4 className="font-title text-xl mb-2">Antique Bone</h4>
                    <p className="text-[10px] leading-relaxed text-gray-500 font-medium">Classic, Chanel-style luxury. Professional and high-end.</p>
                    {currentBg === '#FAFAF8' && <Check className="absolute top-4 right-6 text-[#F2C1C3]" size={24} />}
                </button>

                <button
                    onClick={() => setBg('#FFF9F9')}
                    className={`p-10 rounded-[3rem] border-2 transition-all text-left relative overflow-hidden ${currentBg === '#FFF9F9' ? 'border-[#F2C1C3] scale-105 shadow-2xl' : 'border-pink-50 opacity-60'}`}
                    style={{ backgroundColor: '#FFF9F9' }}
                >
                    <h4 className="font-title text-xl mb-2">Luminous Silk</h4>
                    <p className="text-[10px] leading-relaxed text-gray-500 font-medium italic">Your saved favorite (#FFF9F9). Ultra-premium soft glow effect.</p>
                    {currentBg === '#FFF9F9' && <Check className="absolute top-4 right-6 text-[#F2C1C3]" size={24} />}
                </button>
            </div>
        </section>
    </div>
);

const ColorCard = ({ hex, name, role, saved }) => (
    <div className="space-y-4 text-center">
        <div className={`h-48 rounded-[3rem] shadow-xl border ${saved ? 'border-[#F2C1C3] ring-4 ring-[#F2C1C3]/10' : 'border-white'}`} style={{ backgroundColor: hex }}></div>
        <div>
            <p className="font-title text-xl text-[#2D2424]">{name}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{hex}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${saved ? 'text-[#F2C1C3]' : 'text-gray-300'}`}>{role}</p>
        </div>
    </div>
);

/* --- WEBSITE MOCKUP (Using Dynamic Background) --- */
const WebsiteMockup = ({ bg }) => (
    <div className="min-h-screen text-[#2D2424] font-main transition-colors duration-1000" style={{ backgroundColor: bg }}>
        <header className="px-10 py-8 flex justify-between items-center bg-white/40 backdrop-blur-xl sticky top-0 z-40 border-b border-pink-50">
            <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-1">
                    <span className="font-condensed text-3xl font-bold uppercase">base</span>
                    <span className="font-condensed text-3xl font-bold uppercase text-[#F2C1C3]">01</span>
                </div>
            </div>
            <nav className="hidden lg:flex space-x-16 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-[#F2C1C3]">The Collection</a>
                <a href="#" className="hover:text-[#F2C1C3]">The Science</a>
                <a href="#" className="hover:text-[#F2C1C3]">About</a>
            </nav>
            <button className="text-[10px] font-bold uppercase bg-[#2D2424] text-white px-8 py-3 rounded-full">Cart (0)</button>
        </header>

        <section className="relative py-48 px-10 text-center">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-sm border border-pink-50">
                    <Sparkles size={14} className="text-[#F2C1C3]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#F2C1C3]">Luminous Technology Defined</span>
                </div>
                <h1 className="text-8xl md:text-[12rem] font-condensed font-bold leading-[0.75] tracking-tighter uppercase text-[#2D2424]">
                    Glow is the<br />
                    <span className="text-[#F2C1C3]">Foundation.</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
                    Clinical results. Fashion form. Discover the flexible mask designed for your ritual.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-12 justify-center">
                    <button className="bg-[#2D2424] text-white px-16 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl hover:bg-[#F2C1C3] transition-all">
                        Discover The Mask
                    </button>
                    <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 pb-2">
                        The Science <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </section>
    </div>
);

const NanoBananaGuide = () => (
    <div className="max-w-4xl mx-auto p-12 space-y-12">
        <div className="bg-[#2D2424] rounded-[4rem] p-16 text-white relative shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2C1C3] opacity-20 blur-[100px]"></div>
            <h2 className="text-4xl font-display italic tracking-widest text-[#F2C1C3]">Nano Banana Pro Guide</h2>
            <p className="text-gray-400 tracking-widest uppercase text-xs font-bold mb-12">Visual Asset Engine</p>
            <div className="space-y-12">
                <PromptItem title="The Studio Master" prompt="Ultra-high-end studio photography of a flexible matte blush-pink face mask, inner LEDs glowing soft rose light, on rose quartz stone, 8k resolution." />
                <PromptItem title="Atmospheric Morning" prompt="Cinematic medium shot of woman in minimalist bedroom, morning light, wearing blush-pink light therapy mask, editorial style." />
            </div>
        </div>
    </div>
);

const PromptItem = ({ title, prompt }) => (
    <div className="space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F2C1C3]">{title}</h4>
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] font-main text-lg leading-relaxed italic">
            &ldquo;{prompt}&rdquo;
        </div>
    </div>
);

export default BrandPortal;
