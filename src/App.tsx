import { useState, useEffect, useMemo } from 'react';

function App() {
  const [zIndex, setZIndex] = useState<Record<string, number>>({});
  const [highestZ, setHighestZ] = useState(10);
  const [viewerCount, setViewerCount] = useState(1337);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const bringToFront = (id: string) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setZIndex(prev => ({ ...prev, [id]: newZ }));
  };

  // Window layout - vertical stack with slight rotations, no overlap
  const windowLayout = useMemo(() => ({
    header: { width: 'min(700px, 94vw)', transform: 'rotate(-0.3deg)', margin: '0 auto' },
    about: { width: 'min(500px, 92vw)', transform: 'rotate(0.4deg)', marginLeft: '5%' },
    fastfetch: { width: 'min(520px, 92vw)', transform: 'rotate(-0.5deg)', marginLeft: 'auto', marginRight: '3%' },
    skills: { width: 'min(480px, 92vw)', transform: 'rotate(0.3deg)', marginLeft: '8%' },
    contact: { width: 'min(600px, 94vw)', transform: 'rotate(-0.2deg)', margin: '0 auto' },
  }), []);

  return (
    <div className="main-bg scanlines">
      {/* Floating Decorations */}
      <FloatingDecorations />

      {/* Character Sprites */}
      <CharacterSprites />

      {/* Main Content Area - Vertical Stack */}
      <div className="desktop-area" style={{ display: 'flex', flexDirection: 'column', gap: '60px', padding: '40px 20px' }}>
        {/* Header / Banner - Pink Gothic */}
        <Win95Window
          id="header"
          title="♡ omgkawaiiangel ♡"
          theme="pink"
          style={windowLayout.header}
          zIndex={zIndex['header'] || 5}
          onFocus={() => bringToFront('header')}
        >
          <HeaderContent viewerCount={viewerCount} />
        </Win95Window>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          <span className="text-pink-400 text-2xl">♡</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
        </div>

        {/* About Me - Dark Terminal */}
        <Win95Window
          id="about"
          title="~/about_me.txt"
          theme="terminal"
          style={windowLayout.about}
          zIndex={zIndex['about'] || 6}
          onFocus={() => bringToFront('about')}
        >
          <AboutMeContent />
        </Win95Window>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <span className="text-cyan-400 text-2xl">⚡</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>

        {/* Fastfetch - Dracula */}
        <Win95Window
          id="fastfetch"
          title="oculink@archlinux: ~"
          theme="dracula"
          style={windowLayout.fastfetch}
          zIndex={zIndex['fastfetch'] || 8}
          onFocus={() => bringToFront('fastfetch')}
        >
          <FastfetchContent />
        </Win95Window>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          <span className="text-purple-400 text-2xl">✧</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>

        {/* Skills - Amber CRT */}
        <Win95Window
          id="skills"
          title="C:\SKILLS.CONFIG"
          theme="amber"
          style={windowLayout.skills}
          zIndex={zIndex['skills'] || 3}
          onFocus={() => bringToFront('skills')}
        >
          <SkillsContent />
        </Win95Window>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <span className="text-amber-400 text-2xl">{'>'}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>

        {/* Contact - Blood Red Gothic */}
        <Win95Window
          id="contact"
          title="⛧ CONTACT.SYS ⛧"
          theme="blood"
          style={windowLayout.contact}
          zIndex={zIndex['contact'] || 2}
          onFocus={() => bringToFront('contact')}
        >
          <ContactContent />
        </Win95Window>

        {/* Final decorative divider */}
        <div className="flex items-center gap-4 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
          <span className="text-red-400 text-2xl">⛧</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENTS =====

function FloatingDecorations() {
  const hearts = ['♡', '♥', '❤', '💕', '✦', '★', '⛧', '✧'];
  const decorations = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      symbol: hearts[i % hearts.length],
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 95}%`,
      delay: `${Math.random() * 4}s`,
      size: 12 + Math.random() * 20,
      color: i % 3 === 0 ? '#ff69b4' : i % 3 === 1 ? '#e0b0ff' : '#00ffff',
    }));
  }, []);

  return (
    <>
      {decorations.map((d, i) => (
        <div
          key={i}
          className="floating-deco"
          style={{
            top: d.top,
            left: d.left,
            fontSize: d.size,
            color: d.color,
            opacity: 0.4,
            animation: `float-heart ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: d.delay,
          }}
        >
          {d.symbol}
        </div>
      ))}

      {/* NSO Tutorial Cat - top right corner */}
      <div className="fixed top-20 right-4 z-30 pointer-events-none hidden md:block opacity-60">
        <img 
          src="https://www.spriters-resource.com/media/assets/198/201023.png?updated=1755488925"
          alt="tutorial cat"
          className="w-16 h-16 object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* NSO Hearts decoration - scattered */}
      <div className="fixed top-40 left-20 z-30 pointer-events-none hidden md:block opacity-40">
        <img 
          src="https://www.spriters-resource.com/media/assets/198/200970.png?updated=1755488923"
          alt="hearts"
          className="w-20 h-20 object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </>
  );
}

function CharacterSprites() {
  return (
    <>
      {/* Femme Soule - Drunken Goddess Reflux / PUKEY GODDESS SHOT TRICK - right side */}
      <div 
        className="fixed bottom-10 right-2 z-40 pointer-events-none hidden md:block"
        style={{ filter: 'drop-shadow(0 0 15px rgba(139, 0, 0, 0.6))' }}
      >
        <img 
          src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4150720/c6067e139d8dd2cbf79c41a9c4e41e3bb088c95a/ss_c6067e139d8dd2cbf79c41a9c4e41e3bb088c95a.1920x1080.jpg?t=1778427552"
          alt="Femme Soule - Drunken Goddess Reflux"
          className="w-56 h-72 object-cover object-top rounded-lg border-2 border-red-900/50 opacity-70"
          style={{ imageRendering: 'auto' }}
        />
        <div className="text-center mt-1 text-xs font-[VT323] text-red-400/60">
          Femme Soule
        </div>
      </div>
      
      {/* KAngel Dark Angel - Needy Streamer Overload - left side */}
      <div 
        className="fixed bottom-10 left-2 z-40 pointer-events-none hidden md:block"
        style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.6))' }}
      >
        <img 
          src="https://www.spriters-resource.com/media/assets/198/200786.png?updated=1755488910"
          alt="KAngel Dark Angel - Needy Streamer Overload"
          className="w-36 h-52 object-contain character-sprite opacity-80"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="text-center mt-1 text-xs font-[VT323] text-pink-400/60">
          KAngel
        </div>
      </div>
    </>
  );
}

function Win95Window({ 
  id,
  title, 
  children, 
  theme = 'pink',
  style,
  zIndex = 1,
  onFocus 
}: { 
  id: string;
  title: string; 
  children: React.ReactNode; 
  theme?: 'pink' | 'terminal' | 'dracula' | 'amber' | 'blood';
  style?: React.CSSProperties;
  zIndex?: number;
  onFocus?: () => void;
}) {
  return (
    <div 
      id={id}
      className={`win95-window theme-${theme}`}
      style={{ ...style, zIndex }}
      onClick={onFocus}
    >
      <div className={`title-bar theme-${theme}`}>
        <span className="title-bar-text">
          {title}
        </span>
        <div className="title-bar-buttons">
          <button className="title-btn">_</button>
          <button className="title-btn">□</button>
          <button className="title-btn">×</button>
        </div>
      </div>
      <div className={`window-content theme-${theme}`}>
        {children}
      </div>
    </div>
  );
}

function HeaderContent({ viewerCount }: { viewerCount: number }) {
  return (
    <div className="relative text-center py-4 px-2">
      {/* Stream UI elements */}
      <div className="absolute top-2 right-2">
        <span className="viewer-badge">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          LIVE {viewerCount.toLocaleString()}
        </span>
      </div>

      {/* Username */}
      <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mt-2 glitch-text font-[MedievalSharp]">
        oculink
      </h1>
      
      {/* Subtitle */}
      <div className="mt-3 text-lg text-purple-300 font-[VT323] cursor-blink">
        &gt; streaming code into existence_
      </div>

      {/* Decorative divider */}
      <div className="gothic-divider mt-4">
        <span className="text-pink-400/80 text-xs font-[MedievalSharp]">♡ internet angel ♡</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {[
          { text: 'Developer', icon: '♡' },
          { text: 'Arch Linux', icon: '★' },
          { text: '7900 XTX', icon: '⛧' },
          { text: '64GB DDR5', icon: '✧' },
        ].map((tag) => (
          <span
            key={tag.text}
            className="px-3 py-1 text-sm font-[VT323] bg-black/30 text-pink-300 border border-pink-500/40 rounded-full"
          >
            {tag.icon} {tag.text}
          </span>
        ))}
      </div>

      {/* Game References Strip */}
      <div className="flex justify-center gap-4 mt-4 items-end">
        <div className="text-center">
          <img 
            src="https://www.spriters-resource.com/media/assets/198/200786.png?updated=1755488910"
            alt="KAngel - Needy Streamer Overload"
            className="w-12 h-16 object-contain mx-auto"
            style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 5px rgba(255,105,180,0.5))' }}
          />
          <div className="text-xs font-[VT323] text-pink-400/70 mt-1">NSO</div>
        </div>
        <div className="text-center">
          <img 
            src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4150720/9cac3280375ef488625362200f3167e4bee94ed5/ss_9cac3280375ef488625362200f3167e4bee94ed5.1920x1080.jpg?t=1778427552"
            alt="Femme Soule - Drunken Goddess Reflux"
            className="w-16 h-16 object-cover object-top rounded border border-red-900/50"
            style={{ filter: 'drop-shadow(0 0 5px rgba(139,0,0,0.5))' }}
          />
          <div className="text-xs font-[VT323] text-red-400/70 mt-1">PGST</div>
        </div>
      </div>

      {/* Stream chat preview */}
      <div className="stream-chat mt-4 max-w-xs mx-auto text-left">
        <div className="chat-message">
          <span className="chat-user">xX_dark_coder_Xx:</span>
          <span className="text-gray-600"> nice setup!! is that a 7900 xtx??</span>
        </div>
        <div className="chat-message">
          <span className="chat-user" style={{ color: '#6b3fa0' }}>archbtw_fan:</span>
          <span className="text-gray-600"> btw</span>
        </div>
        <div className="chat-message">
          <span className="chat-user" style={{ color: '#d63384' }}>demon_girl:</span>
          <span className="text-gray-600"> 64gb of ram is overkill lol</span>
        </div>
      </div>
    </div>
  );
}

function AboutMeContent() {
  return (
    <div className="space-y-4">
      {/* Profile section */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-20 h-20 border-2 border-cyan-400/50 flex items-center justify-center bg-black/50 flex-shrink-0 overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <img 
            src="https://github.com/oculink.png" 
            alt="oculink" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span style="font-size:2rem;color:#00ffff;">⚡</span>';
            }}
          />
        </div>
        <div className="flex-1">
          <div className="border-2 border-cyan-400/30 bg-black/40 p-3 text-sm font-[VT323] backdrop-blur-sm">
            <p className="text-cyan-400">
              <span className="text-green-400 font-bold">~ $</span> cat about.txt
            </p>
            <p className="text-cyan-200 mt-2">
              Hey, I'm oculink. I spend most of my time writing code, tweaking my Arch setup, 
              and figuring out how to make things look cool on a screen. I've been running 
              Arch as my daily driver because I enjoy having full control over my system.
            </p>
            <p className="text-cyan-200 mt-2">
              When I'm not coding, I'm probably researching hardware, messing with my rig 
              (currently rocking a 7900 XTX and an 8845HS), or going down some rabbit hole 
              on the Arch Wiki at 3am.
            </p>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="border-2 border-cyan-400/30 bg-black/40 p-3 backdrop-blur-sm">
        <table className="w-full text-sm font-[VT323]">
          <tbody>
            <tr><td className="pr-4 text-green-400 font-bold">OS:</td><td className="text-cyan-200">Arch Linux (btw)</td></tr>
            <tr><td className="pr-4 text-green-400 font-bold">CPU:</td><td className="text-cyan-200">Ryzen 7 8845HS</td></tr>
            <tr><td className="pr-4 text-green-400 font-bold">GPU:</td><td className="text-cyan-200">RX 7900 XTX</td></tr>
            <tr><td className="pr-4 text-green-400 font-bold">RAM:</td><td className="text-cyan-200">64GB DDR5 5600MHz</td></tr>
            <tr><td className="pr-4 text-green-400 font-bold">Status:</td><td className="text-green-400">● Currently coding</td></tr>
          </tbody>
        </table>
      </div>

      {/* Decorative accent */}
      <div className="text-center text-cyan-400/60 text-xs font-[MedievalSharp]">
        ⚡ the machine is an extension of the mind ⚡
      </div>
    </div>
  );
}

function FastfetchContent() {
  return (
    <div className="overflow-x-auto" style={{ background: '#282a36' }}>
      <pre className="text-sm leading-relaxed whitespace-pre p-4" style={{ fontFamily: "'VT323', monospace" }}>
        {'\n'}
        {'  '}<span className="terminal-user">oculink</span><span className="terminal-at">@</span><span className="terminal-host">archlinux</span>
        {'\n  '}<span style={{color:'#6272a4'}}>-----------------</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>OS:</span><span className="ff-value"> Arch Linux x86_64</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Host:</span><span className="ff-value"> oculink</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Kernel:</span><span className="ff-value"> 6.12.1-arch1-1</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Uptime:</span><span className="ff-value"> since the last reboot</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Shell:</span><span className="ff-value"> bash 5.2.37</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>CPU:</span><span className="ff-value"> AMD Ryzen 7 8845HS (16) @ 5.1GHz</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>GPU:</span><span className="ff-value"> AMD Radeon RX 7900 XTX [Discrete]</span>
        {'\n       '}<span className="ff-value"> AMD Radeon 780M Graphics [Integrated]</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Memory:</span><span className="ff-value"> 64GB DDR5 5600MHz</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Disk:</span><span className="ff-value"> too much SSD</span>
        {'\n  '}<span style={{color:'#ff79c6'}}>Locale:</span><span className="ff-value"> en_US.UTF-8</span>
        {'\n'}
        {'\n  '}<span style={{color:'#ff79c6'}}>███</span><span style={{color:'#ff5555'}}>███</span><span style={{color:'#50fa7b'}}>███</span><span style={{color:'#f1fa8c'}}>███</span><span style={{color:'#6272a4'}}>███</span><span style={{color:'#8be9fd'}}>███</span><span style={{color:'#f8f8f2'}}>███</span>
        {'\n'}
        {'\n  '}<span style={{color:'#bd93f9'}}>❯</span> <span className="cursor-blink" style={{ color: '#bd93f9' }}> </span>
      </pre>
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { name: 'JavaScript / TypeScript', level: 90, icon: '>' },
    { name: 'React / Next.js', level: 85, icon: '>' },
    { name: 'Rust', level: 60, icon: '>' },
    { name: 'Python', level: 75, icon: '>' },
    { name: 'Linux / Arch', level: 92, icon: '>' },
    { name: 'CSS / Tailwind', level: 88, icon: '>' },
    { name: 'Node.js', level: 80, icon: '>' },
    { name: 'WebGL / Graphics', level: 55, icon: '>' },
  ];

  return (
    <div className="space-y-3">
      <div className="text-center mb-4 font-[VT323] text-amber-400 text-sm">
        ╔══════════════════════════╗<br/>
        ║  SYSTEM SKILLS ANALYSIS  ║<br/>
        ╚══════════════════════╝
      </div>
      
      {skills.map((skill, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-[VT323]">{skill.icon}</span>
              <span className="text-sm font-[VT323] text-amber-300">{skill.name}</span>
            </div>
            <span className="text-xs font-[VT323] text-amber-400">{skill.level}%</span>
          </div>
          <div className="h-4 bg-black/60 border border-amber-600/50 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000"
              style={{ width: `${skill.level}%`, boxShadow: '0 0 10px rgba(255, 176, 0, 0.5)' }}
            />
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
          </div>
        </div>
      ))}
      
      {/* Decorative accent */}
      <div className="border border-amber-600/50 bg-black/40 p-3 mt-4">
        <p className="text-xs text-amber-400 font-[VT323] text-center">
          {'>'} always learning, always breaking things, always fixing them again {'<'}
        </p>
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    { icon: 'https://cdn.simpleicons.org/github/white', label: 'GitHub', url: 'https://github.com/oculink' },
    { icon: 'https://cdn.simpleicons.org/x/white', label: 'Twitter/X', url: '#' },
    { icon: 'https://cdn.simpleicons.org/discord/white', label: 'Discord', url: '#' },
    { icon: 'https://cdn.simpleicons.org/gmail/white', label: 'Email', url: '#' },
    { icon: 'https://cdn.simpleicons.org/firefox/white', label: 'Website', url: '#' },
  ];

  return (
    <div className="space-y-4">
      {/* Gothic header */}
      <div className="text-center font-[VT323] text-red-400 text-sm">
        ⛧ ⛧ ⛧ SUMMONING RITUAL ⛧ ⛧ ⛧
      </div>

      {/* Marquee */}
      <div className="border-2 border-red-800/50 bg-black/60 overflow-hidden py-1">
        <div className="marquee-text text-red-400 font-[VT323] text-sm">
          ⛧ ⛧ ⛧ Reach out through the void. Contact me if you dare to discuss code, hardware, or the secrets of the digital realm ⛧ ⛧ ⛧
        </div>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 text-center border-2 border-red-800/50 bg-black/40 hover:bg-red-900/30 transition-all hover:shadow-[0_0_15px_rgba(139,0,0,0.5)] hover:border-red-600"
          >
            <img src={link.icon} alt="" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
            <span className="text-sm font-[VT323] text-red-300">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Stream chat at bottom */}
      <div className="border-2 border-red-800/50 bg-black/60 p-3 mt-4">
        <div className="text-xs text-red-400 font-bold mb-1 font-[VT323]">⛧ Dark Chat ⛧</div>
        <div className="border-b border-red-900/30 pb-1 mb-1">
          <span className="text-red-500 font-[VT323] text-xs">demon_lord:</span>
          <span className="text-red-300/70 font-[VT323] text-xs"> nice page, very cursed</span>
        </div>
        <div className="border-b border-red-900/30 pb-1 mb-1">
          <span className="text-purple-400 font-[VT323] text-xs">femme_soule:</span>
          <span className="text-red-300/70 font-[VT323] text-xs"> surrender your soul to this aesthetic</span>
        </div>
        <div>
          <span className="text-pink-400 font-[VT323] text-xs">dark_angel:</span>
          <span className="text-red-300/70 font-[VT323] text-xs"> first!! ⛧⛧⛧</span>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center space-y-2">
        <div className="flex items-center gap-2 justify-center opacity-60">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <span className="text-red-400/60 text-xs font-[MedievalSharp]">⛧ fin ⛧</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>
        <p className="text-xs text-red-400/60 font-[VT323]">
          {new Date().getFullYear()} oculink | Forged in the fires of Arch Linux
        </p>
      </div>
    </div>
  );
}

export default App;
