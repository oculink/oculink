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

  // Window layout - scattered, overlapping, slightly rotated
  const windowLayout = useMemo(() => ({
    header: { top: '20px', left: '50%', transform: 'translateX(-50%) rotate(-0.5deg)', width: 'min(650px, 92vw)' },
    about: { top: '260px', left: '2%', width: 'min(440px, 48vw)', transform: 'rotate(-0.8deg)' },
    fastfetch: { top: '180px', left: '38%', width: 'min(460px, 50vw)', transform: 'rotate(0.5deg)' },
    skills: { top: '500px', left: '50%', width: 'min(380px, 42vw)', transform: 'rotate(-0.4deg)' },
    contact: { top: '700px', left: '10%', width: 'min(520px, 58vw)', transform: 'rotate(0.3deg)' },
  }), []);

  return (
    <div className="main-bg scanlines">
      {/* Floating Decorations */}
      <FloatingDecorations />

      {/* Character Sprites */}
      <CharacterSprites />

      {/* Main Content Area - Scattered Windows */}
      <div className="desktop-area">
        {/* Header / Banner */}
        <Win95Window
          id="header"
          title="♡ omgkawaiiangel ♡"
          style={windowLayout.header}
          zIndex={zIndex['header'] || 5}
          onFocus={() => bringToFront('header')}
          isGothic
        >
          <HeaderContent viewerCount={viewerCount} />
        </Win95Window>

        {/* About Me */}
        <Win95Window
          id="about"
          title="about_me.txt"
          style={windowLayout.about}
          zIndex={zIndex['about'] || 6}
          onFocus={() => bringToFront('about')}
        >
          <AboutMeContent />
        </Win95Window>

        {/* Fastfetch */}
        <Win95Window
          id="fastfetch"
          title="oculink@archlinux: ~"
          style={windowLayout.fastfetch}
          zIndex={zIndex['fastfetch'] || 8}
          onFocus={() => bringToFront('fastfetch')}
          isTerminal
        >
          <FastfetchContent />
        </Win95Window>

        {/* Skills */}
        <Win95Window
          id="skills"
          title="skills.config"
          style={windowLayout.skills}
          zIndex={zIndex['skills'] || 3}
          onFocus={() => bringToFront('skills')}
        >
          <SkillsContent />
        </Win95Window>

        {/* Contact */}
        <Win95Window
          id="contact"
          title="contact.html"
          style={windowLayout.contact}
          zIndex={zIndex['contact'] || 2}
          onFocus={() => bringToFront('contact')}
        >
          <ContactContent />
        </Win95Window>
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
    </>
  );
}

function CharacterSprites() {
  return (
    <>
      {/* Demon girl sprite - right side */}
      <div 
        className="fixed bottom-10 right-4 z-40 pointer-events-none hidden md:block"
        style={{ filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.6))' }}
      >
        <img 
          src="https://image.qwenlm.ai/generated-images/4befd224-f2d9-44e7-a38a-d545cac10bb9/_result.png"
          alt="demon girl"
          className="w-40 h-40 object-contain character-sprite opacity-80"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      
      {/* Streamer girl sprite - left side */}
      <div 
        className="fixed bottom-10 left-4 z-40 pointer-events-none hidden md:block"
        style={{ filter: 'drop-shadow(0 0 15px rgba(176, 224, 255, 0.6))' }}
      >
        <img 
          src="https://image.qwenlm.ai/generated-images/b6e2cb70-3f50-49d4-9925-8484cd156cc1/_result.png"
          alt="streamer girl"
          className="w-36 h-36 object-contain character-sprite opacity-80"
          style={{ imageRendering: 'auto' }}
        />
      </div>
    </>
  );
}

function Win95Window({ 
  id,
  title, 
  children, 
  isGothic = false, 
  isTerminal = false,
  style,
  zIndex = 1,
  onFocus 
}: { 
  id: string;
  title: string; 
  children: React.ReactNode; 
  isGothic?: boolean;
  isTerminal?: boolean;
  style?: React.CSSProperties;
  zIndex?: number;
  onFocus?: () => void;
}) {
  return (
    <div 
      id={id}
      className="win95-window"
      style={{ ...style, zIndex }}
      onClick={onFocus}
    >
      <div className={`title-bar ${isGothic ? 'title-bar-gothic' : ''}`}>
        <span className="title-bar-text">
          {title}
        </span>
        <div className="title-bar-buttons">
          <button className="title-btn">_</button>
          <button className="title-btn">□</button>
          <button className="title-btn">×</button>
        </div>
      </div>
      <div className="window-content" style={isTerminal ? { padding: 0, background: '#0c0c0c' } : {}}>
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
        <div className="w-20 h-20 win95-inset flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400 flex-shrink-0 overflow-hidden">
          <img 
            src="https://github.com/oculink.png" 
            alt="oculink" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span style="font-size:2rem;color:#ff69b4;">♡</span>';
            }}
          />
        </div>
        <div className="flex-1">
          <div className="win95-inset bg-white p-3 text-sm font-[VT323]">
            <p className="text-pink-600">
              <span className="text-purple-600 font-bold">~ $</span> cat about.txt
            </p>
            <p className="text-gray-700 mt-2">
              Hey, I'm oculink. I spend most of my time writing code, tweaking my Arch setup, 
              and figuring out how to make things look cool on a screen. I've been running 
              Arch as my daily driver because I enjoy having full control over my system.
            </p>
            <p className="text-gray-700 mt-2">
              When I'm not coding, I'm probably researching hardware, messing with my rig 
              (currently rocking a 7900 XTX and an 8845HS), or going down some rabbit hole 
              on the Arch Wiki at 3am.
            </p>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="win95-inset bg-white p-3">
        <table className="w-full text-sm font-[VT323] text-black">
          <tbody>
            <tr><td className="pr-4 text-pink-600 font-bold">OS:</td><td>Arch Linux (btw)</td></tr>
            <tr><td className="pr-4 text-pink-600 font-bold">CPU:</td><td>Ryzen 7 8845HS</td></tr>
            <tr><td className="pr-4 text-pink-600 font-bold">GPU:</td><td>RX 7900 XTX</td></tr>
            <tr><td className="pr-4 text-pink-600 font-bold">RAM:</td><td>64GB DDR5 5600MHz</td></tr>
            <tr><td className="pr-4 text-pink-600 font-bold">Status:</td><td className="text-pink-500">♡ Currently coding</td></tr>
          </tbody>
        </table>
      </div>

      {/* Decorative accent */}
      <div className="text-center text-purple-400/60 text-xs font-[MedievalSharp]">
        ♡ the machine is an extension of the mind ♡
      </div>
    </div>
  );
}

function FastfetchContent() {
  return (
    <div className="terminal overflow-x-auto">
      <pre className="text-sm leading-relaxed whitespace-pre" style={{ fontFamily: "'VT323', monospace" }}>
        {'\n'}
        {'  '}<span className="terminal-user">oculink</span><span className="terminal-at">@</span><span className="terminal-host">archlinux</span>
        {'\n  '}<span className="terminal-cyan">-----------------</span>
        {'\n  '}<span className="ff-label">OS:</span><span className="ff-value"> Arch Linux x86_64</span>
        {'\n  '}<span className="ff-label">Host:</span><span className="ff-value"> oculink</span>
        {'\n  '}<span className="ff-label">Kernel:</span><span className="ff-value"> 6.12.1-arch1-1</span>
        {'\n  '}<span className="ff-label">Uptime:</span><span className="ff-value"> since the last reboot</span>
        {'\n  '}<span className="ff-label">Shell:</span><span className="ff-value"> bash 5.2.37</span>
        {'\n  '}<span className="ff-label">CPU:</span><span className="ff-value"> AMD Ryzen 7 8845HS (16) @ 5.1GHz</span>
        {'\n  '}<span className="ff-label">GPU:</span><span className="ff-value"> AMD Radeon RX 7900 XTX [Discrete]</span>
        {'\n       '}<span className="ff-value"> AMD Radeon 780M Graphics [Integrated]</span>
        {'\n  '}<span className="ff-label">Memory:</span><span className="ff-value"> 64GB DDR5 5600MHz</span>
        {'\n  '}<span className="ff-label">Disk:</span><span className="ff-value"> too much SSD</span>
        {'\n  '}<span className="ff-label">Locale:</span><span className="ff-value"> en_US.UTF-8</span>
        {'\n'}
        {'\n  '}<span className="terminal-magenta">███</span><span className="terminal-red">███</span><span className="terminal-green">███</span><span className="terminal-yellow">███</span><span style={{color:'#6272a4'}}>███</span><span className="terminal-cyan">███</span><span className="terminal-white">███</span>
        {'\n'}
        {'\n  '}<span className="terminal-prompt">❯</span> <span className="cursor-blink" style={{ color: '#ff69b4' }}> </span>
      </pre>
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { name: 'JavaScript / TypeScript', level: 90, icon: '♡' },
    { name: 'React / Next.js', level: 85, icon: '★' },
    { name: 'Rust', level: 60, icon: '⛧' },
    { name: 'Python', level: 75, icon: '✧' },
    { name: 'Linux / Arch', level: 92, icon: '♡' },
    { name: 'CSS / Tailwind', level: 88, icon: '★' },
    { name: 'Node.js', level: 80, icon: '✦' },
    { name: 'WebGL / Graphics', level: 55, icon: '♥' },
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-pink-500">{skill.icon}</span>
              <span className="text-sm font-[VT323] text-gray-800">{skill.name}</span>
            </div>
            <span className="text-xs font-[VT323] text-pink-400">{skill.level}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
      
      {/* Decorative accent */}
      <div className="aero-card p-3 mt-4">
        <p className="text-xs text-pink-600 font-[VT323] text-center">
          ♡ always learning, always breaking things, always fixing them again ♡
        </p>
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    { icon: 'https://cdn.simpleicons.org/github/white', label: 'GitHub', url: 'https://github.com/oculink', color: 'text-gray-800' },
    { icon: 'https://cdn.simpleicons.org/x/white', label: 'Twitter/X', url: '#', color: 'text-gray-800' },
    { icon: 'https://cdn.simpleicons.org/discord/white', label: 'Discord', url: '#', color: 'text-indigo-500' },
    { icon: 'https://cdn.simpleicons.org/gmail/white', label: 'Email', url: '#', color: 'text-red-500' },
    { icon: 'https://cdn.simpleicons.org/firefox/white', label: 'Website', url: '#', color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Marquee */}
      <div className="win95-inset bg-black overflow-hidden py-1">
        <div className="marquee-text text-pink-400 font-[VT323] text-sm">
          ♡ ♡ ♡ Thanks for visiting my corner of the internet. Feel free to reach out if you want to chat about code, hardware, or anything in between ♡ ♡ ♡
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
            className="retro-btn flex flex-col items-center gap-1 py-3 text-center"
          >
            <img src={link.icon} alt="" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
            <span className={`text-sm font-[VT323] ${link.color}`}>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Stream chat at bottom */}
      <div className="stream-chat mt-4">
        <div className="text-xs text-pink-500 font-bold mb-1">♡ Live Chat ♡</div>
        <div className="chat-message">
          <span className="chat-user">p-chan:</span>
          <span className="text-gray-600"> thanks for checking out the page!</span>
        </div>
        <div className="chat-message">
          <span className="chat-user" style={{ color: '#6b3fa0' }}>femme_soule:</span>
          <span className="text-gray-600"> nice aesthetic, very demon girl coded</span>
        </div>
        <div className="chat-message">
          <span className="chat-user" style={{ color: '#d63384' }}>kamelie:</span>
          <span className="text-gray-600"> first!! ♡♡♡</span>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center space-y-2">
        <div className="gothic-divider">
          <span className="text-pink-400/60 text-xs font-[MedievalSharp]">♡ fin ♡</span>
        </div>
        <p className="text-xs text-pink-400/60 font-[VT323]">
          {new Date().getFullYear()} oculink | Made with Arch, caffeine, and a little bit of chaos
        </p>
      </div>
    </div>
  );
}

export default App;
