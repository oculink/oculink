import { useState, useEffect, useMemo } from 'react';

// Seeded random for consistent but scattered layout
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function App() {
  const [time, setTime] = useState(new Date());
  const [zIndex, setZIndex] = useState<Record<string, number>>({});
  const [highestZ, setHighestZ] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bringToFront = (id: string) => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    setZIndex(prev => ({ ...prev, [id]: newZ }));
  };

  // Window layout - scattered, overlapping, slightly rotated
  const windowLayout = useMemo(() => ({
    header: { top: '10px', left: '50%', transform: 'translateX(-50%) rotate(-0.5deg)', width: 'min(600px, 90vw)' },
    about: { top: '200px', left: '3%', width: 'min(420px, 45vw)', transform: 'rotate(-0.8deg)' },
    fastfetch: { top: '120px', left: '35%', width: 'min(480px, 50vw)', transform: 'rotate(0.5deg)' },
    projects: { top: '480px', left: '8%', width: 'min(380px, 40vw)', transform: 'rotate(0.6deg)' },
    skills: { top: '380px', left: '55%', width: 'min(360px, 38vw)', transform: 'rotate(-0.4deg)' },
    stats: { top: '650px', left: '45%', width: 'min(400px, 42vw)', transform: 'rotate(0.3deg)' },
    contact: { top: '850px', left: '15%', width: 'min(500px, 55vw)', transform: 'rotate(-0.2deg)' },
  }), []);

  return (
    <div className="desktop-bg scanlines min-h-screen relative">
      {/* Floating Bubbles */}
      <Bubbles />
      
      {/* Gothic corner decorations */}
      <GothicCorners />

      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Main Content Area - Scattered Windows */}
      <div className="desktop-area">
        {/* Header / Banner */}
        <Win95Window
          id="header"
          title="readme.txt"
          style={windowLayout.header}
          zIndex={zIndex['header'] || 5}
          onFocus={() => bringToFront('header')}
          isGothic
        >
          <HeaderContent />
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

        {/* Projects */}
        <Win95Window
          id="projects"
          title="projects"
          style={windowLayout.projects}
          zIndex={zIndex['projects'] || 4}
          onFocus={() => bringToFront('projects')}
        >
          <ProjectsContent />
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

        {/* Stats */}
        <Win95Window
          id="stats"
          title="github_stats.log"
          style={windowLayout.stats}
          zIndex={zIndex['stats'] || 7}
          onFocus={() => bringToFront('stats')}
          isGothic
        >
          <StatsContent />
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

      {/* Taskbar */}
      <Taskbar time={time} />
    </div>
  );
}

// ===== COMPONENTS =====

function Bubbles() {
  const bubbles = [
    { size: 60, top: '10%', left: '5%', delay: '0s' },
    { size: 40, top: '30%', left: '85%', delay: '1s' },
    { size: 80, top: '60%', left: '10%', delay: '2s' },
    { size: 30, top: '80%', left: '75%', delay: '0.5s' },
    { size: 50, top: '15%', left: '60%', delay: '1.5s' },
    { size: 35, top: '70%', left: '45%', delay: '3s' },
    { size: 25, top: '45%', left: '90%', delay: '2.5s' },
  ];

  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            animationDelay: b.delay,
          }}
        />
      ))}
    </>
  );
}

function GothicCorners() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-4 left-4 text-purple-500/30 text-2xl font-[MedievalSharp]">⛧</div>
      <div className="absolute top-4 right-4 text-purple-500/30 text-2xl font-[MedievalSharp]">⛧</div>
      <div className="absolute bottom-16 left-4 text-purple-500/30 text-2xl font-[MedievalSharp]">⛧</div>
      <div className="absolute bottom-16 right-4 text-purple-500/30 text-2xl font-[MedievalSharp]">⛧</div>
    </div>
  );
}

function DesktopIcons() {
  const icons = [
    { label: 'GitHub', img: 'https://cdn.simpleicons.org/github/white', top: '20px' },
    { label: 'Terminal', img: 'https://cdn.simpleicons.org/gnometerminal/white', top: '100px' },
    { label: 'Arch Wiki', img: 'https://cdn.simpleicons.org/archlinux/white', top: '180px' },
    { label: 'My Files', img: 'https://cdn.simpleicons.org/openstreetmap/white', top: '260px' },
  ];

  return (
    <div className="absolute top-0 left-0 z-5 flex flex-col gap-2 p-2">
      {icons.map((icon, i) => (
        <div key={i} className="desktop-icon">
          <img src={icon.img} alt={icon.label} style={{ imageRendering: 'auto' }} />
          <span>{icon.label}</span>
        </div>
      ))}
    </div>
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
          {isTerminal && (
            <img 
              src="https://cdn.simpleicons.org/gnometerminal/white" 
              alt="" 
              style={{ width: 14, height: 14, imageRendering: 'auto' }}
            />
          )}
          {isGothic && !isTerminal && <span style={{ color: '#bf9fff' }}>⛧</span>}
          {!isGothic && !isTerminal && (
            <img 
              src="https://cdn.simpleicons.org/windows95/000080" 
              alt="" 
              style={{ width: 14, height: 14, imageRendering: 'auto' }}
            />
          )}
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

function HeaderContent() {
  return (
    <div className="relative text-center py-4 px-2">
      {/* Gothic ornamental top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="text-purple-400/40 text-sm tracking-[1em]">⸙ ⸙ ⸙ ⸙ ⸙</div>
      </div>

      {/* Username */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 glitch-text font-[MedievalSharp]">
        oculink
      </h1>
      
      {/* Subtitle */}
      <div className="mt-3 text-lg text-green-400/80 font-[VT323] cursor-blink">
        &gt; building things on the internet
      </div>

      {/* Decorative divider */}
      <div className="gothic-divider mt-4">
        <span className="text-purple-400/60 text-xs font-[MedievalSharp]">from the void, code emerges</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {['Developer', 'Linux Enjoyer', 'Hardware Enthusiast', 'Open Source'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-sm font-[VT323] bg-black/30 text-blue-300 border border-blue-500/30 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Leaf decorations */}
      <div className="absolute top-4 left-4 text-2xl leaf-deco opacity-30">
        <img src="https://cdn.simpleicons.org/gnu/white" alt="" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
      </div>
      <div className="absolute bottom-4 right-4 text-2xl leaf-deco opacity-30" style={{ animationDelay: '1s' }}>
        <img src="https://cdn.simpleicons.org/archlinux/white" alt="" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
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
        <div className="w-20 h-20 win95-inset flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 flex-shrink-0 overflow-hidden">
          <img 
            src="https://github.com/oculink.png" 
            alt="oculink" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span style="font-size:2rem;color:#bf9fff;">⚡</span>';
            }}
          />
        </div>
        <div className="flex-1">
          <div className="win95-inset bg-white p-3 text-sm font-[VT323]">
            <p className="text-black">
              <span className="text-purple-700 font-bold">~ $</span> cat about.txt
            </p>
            <p className="text-gray-700 mt-2">
              Hey, I'm oculink. I spend most of my time writing code, tweaking my Arch setup, 
              and figuring out how to make things look cool on a screen. I've been running 
              Arch as my daily driver because I enjoy having full control over my system.
            </p>
            <p className="text-gray-700 mt-2">
              When I'm not coding, I'm probably researching hardware, messing with my rig 
              (currently rocking a 7900 XTX and a 8845HS), or going down some rabbit hole 
              on the Arch Wiki at 3am.
            </p>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="win95-inset bg-white p-3">
        <table className="w-full text-sm font-[VT323] text-black">
          <tbody>
            <tr><td className="pr-4 text-purple-700 font-bold">OS:</td><td>Arch Linux (btw)</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">CPU:</td><td>Ryzen 7 8845HS</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">GPU:</td><td>RX 7900 XTX</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">RAM:</td><td>64GB DDR5</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">Status:</td><td className="text-green-600">● Currently coding</td></tr>
          </tbody>
        </table>
      </div>

      {/* Gothic accent */}
      <div className="text-center text-purple-500/50 text-xs font-[MedievalSharp]">
        — the machine is an extension of the mind —
      </div>
    </div>
  );
}

function FastfetchContent() {
  return (
    <div className="terminal overflow-x-auto">
      <pre className="text-sm leading-tight whitespace-pre" style={{ fontFamily: "'VT323', monospace" }}>
        <span className="ff-arch-blue">{`
                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo+
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++   ++++:
           \`++++++++  ++++:
          \`++++++++   ++++:
         /++++++oooooo/++++:
        /++++++++++++++oooo/
       o++++++++++++++oooooo\`
      ooooooooooooooooooooooo\`
     ooooooooooooooooooooooooo\`
    ooooooooooooooooooooooooooo\`
   ooooooooooooooooooooooooooooo
  \`oooooooooooooooooooooooooooooo
   \`ooooooooooooooooooooooooooooo
    \`ooooooooooooooooooooooooooo
      \`oooooooooooooooooooooooo
        \`oooooooooooooooooooooo
          \`oooooooooooooooooo
            \`oooooooooooooo
               \`ooooooooo
                  \`oooo
                   \`o
`}</span>
        <span className="terminal-user">oculink</span><span className="terminal-at">@</span><span className="terminal-host">archlinux</span>
        {'\n'}<span className="terminal-cyan">-----------------</span>
        {'\n'}<span className="ff-label">OS:</span><span className="ff-value"> Arch Linux x86_64</span>
        {'\n'}<span className="ff-label">Host:</span><span className="ff-value"> oculink</span>
        {'\n'}<span className="ff-label">Kernel:</span><span className="ff-value"> 6.12.1-arch1-1</span>
        {'\n'}<span className="ff-label">Uptime:</span><span className="ff-value"> since the last reboot</span>
        {'\n'}<span className="ff-label">Shell:</span><span className="ff-value"> bash 5.2.37</span>
        {'\n'}<span className="ff-label">CPU:</span><span className="ff-value"> AMD Ryzen 7 8845HS (16) @ 5.1GHz</span>
        {'\n'}<span className="ff-label">GPU:</span><span className="ff-value"> AMD Radeon RX 7900 XTX [Discrete]</span>
        {'\n'}     <span className="ff-value"> AMD Radeon 780M Graphics [Integrated]</span>
        {'\n'}<span className="ff-label">Memory:</span><span className="ff-value"> 64GB DDR5 5600MHz</span>
        {'\n'}<span className="ff-label">Disk:</span><span className="ff-value"> too much SSD</span>
        {'\n'}<span className="ff-label">Locale:</span><span className="ff-value"> en_US.UTF-8</span>
        {'\n'}
        {'\n'}<span className="terminal-cyan">███</span><span className="terminal-red">███</span><span className="terminal-green">███</span><span className="terminal-yellow">███</span><span className="terminal-blue">███</span><span className="terminal-magenta">███</span><span className="terminal-white">███</span>
        {'\n'}
        {'\n'}<span className="terminal-prompt">❯</span> <span className="cursor-blink" style={{ color: '#50fa7b' }}> </span>
      </pre>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { 
      name: 'void_engine', 
      desc: 'A custom rendering engine I\'ve been working on for creative projects. Still rough around the edges but getting there.', 
      tech: ['WebGL', 'GLSL', 'TypeScript'], 
      status: 'wip',
      icon: 'https://cdn.simpleicons.org/webgl/white'
    },
    { 
      name: 'retro_shell', 
      desc: 'Terminal emulator that brings back the nostalgia of old CRT monitors. Because modern terminals are too clean.', 
      tech: ['Rust', 'WASM'], 
      status: 'active',
      icon: 'https://cdn.simpleicons.org/gnometerminal/white'
    },
    { 
      name: 'pixel_forge', 
      desc: 'Browser-based pixel art tool. Made it because I was tired of switching between apps just to draw sprites.', 
      tech: ['Canvas', 'TypeScript'], 
      status: 'beta',
      icon: 'https://cdn.simpleicons.org/figma/white'
    },
    { 
      name: 'dotfiles', 
      desc: 'My Arch Linux configuration. Hyprland, Neovim, the whole rice. Updated more than my actual projects.', 
      tech: ['Lua', 'Shell', 'Nix'], 
      status: 'active',
      icon: 'https://cdn.simpleicons.org/archlinux/white'
    },
  ];

  return (
    <div className="space-y-3">
      {projects.map((project, i) => (
        <div key={i} className="win95-inset bg-white p-3 hover:bg-blue-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={project.icon} alt="" style={{ width: 16, height: 16, imageRendering: 'auto' }} />
              <span className="font-[VT323] text-blue-800 text-lg font-bold">
                {project.name}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 font-[VT323] rounded ${
              project.status === 'active' ? 'bg-green-100 text-green-700 border border-green-300' :
              project.status === 'wip' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
              'bg-blue-100 text-blue-700 border border-blue-300'
            }`}>
              {project.status === 'active' ? '● ACTIVE' : project.status === 'wip' ? '◐ WIP' : '◑ BETA'}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-[VT323] mt-1">{project.desc}</p>
          <div className="flex gap-1 mt-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-600 font-[VT323]">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
      
      <div className="text-center mt-3">
        <a href="https://github.com/oculink" target="_blank" rel="noopener noreferrer" className="retro-btn inline-block">
          <span className="flex items-center gap-2">
            <img src="https://cdn.simpleicons.org/github/black" alt="" style={{ width: 14, height: 14, imageRendering: 'auto' }} />
            View All on GitHub
          </span>
        </a>
      </div>
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { name: 'JavaScript / TypeScript', level: 90, icon: 'https://cdn.simpleicons.org/typescript/white' },
    { name: 'React / Next.js', level: 85, icon: 'https://cdn.simpleicons.org/react/white' },
    { name: 'Rust', level: 60, icon: 'https://cdn.simpleicons.org/rust/white' },
    { name: 'Python', level: 75, icon: 'https://cdn.simpleicons.org/python/white' },
    { name: 'Linux / Arch', level: 92, icon: 'https://cdn.simpleicons.org/archlinux/white' },
    { name: 'CSS / Tailwind', level: 88, icon: 'https://cdn.simpleicons.org/tailwindcss/white' },
    { name: 'Node.js', level: 80, icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
    { name: 'WebGL / Graphics', level: 55, icon: 'https://cdn.simpleicons.org/webgl/white' },
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={skill.icon} alt="" style={{ width: 14, height: 14, imageRendering: 'auto' }} />
              <span className="text-sm font-[VT323] text-black">{skill.name}</span>
            </div>
            <span className="text-xs font-[VT323] text-gray-500">{skill.level}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
      
      {/* Aero glass accent */}
      <div className="aero-card p-3 mt-4">
        <p className="text-xs text-blue-200 font-[VT323] text-center">
          always learning, always breaking things, always fixing them again
        </p>
      </div>
    </div>
  );
}

function StatsContent() {
  return (
    <div className="space-y-4">
      {/* Terminal-style stats */}
      <div className="win95-inset bg-black p-4 font-[VT323] text-sm">
        <p className="text-green-400">$ neofetch --github oculink</p>
        <p className="text-gray-400 mt-2">Fetching data from the void...</p>
        <div className="mt-3 space-y-1">
          <p className="text-cyan-400">┌────────────────────────────────┐</p>
          <p className="text-cyan-400">│ <span className="text-white">Repositories:</span>  <span className="text-yellow-400">42+</span>             │</p>
          <p className="text-cyan-400">│ <span className="text-white">Stars Earned:</span>   <span className="text-yellow-400">128</span>              │</p>
          <p className="text-cyan-400">│ <span className="text-white">Contributions:</span> <span className="text-yellow-400">1,337</span>            │</p>
          <p className="text-cyan-400">│ <span className="text-white">Commits Today:</span> <span className="text-yellow-400">∞</span>                │</p>
          <p className="text-cyan-400">│ <span className="text-white">Coffee Cup:</span>    <span className="text-yellow-400">empty</span>            │</p>
          <p className="text-cyan-400">└────────────────────────────────┘</p>
        </div>
        <p className="text-green-400 mt-2 cursor-blink">$ _</p>
      </div>

      {/* Contribution graph */}
      <div className="win95-inset bg-white p-3">
        <p className="text-xs font-[VT323] text-black mb-2">Contribution Activity (last 12 weeks):</p>
        <div className="grid grid-cols-12 gap-0.5">
          {Array.from({ length: 84 }, (_, i) => {
            const intensity = seededRandom(i * 7 + 42);
            const color = intensity > 0.8 ? 'bg-purple-600' : 
                         intensity > 0.6 ? 'bg-purple-400' : 
                         intensity > 0.4 ? 'bg-purple-300' : 
                         intensity > 0.2 ? 'bg-purple-200' : 'bg-gray-100';
            return <div key={i} className={`w-full aspect-square ${color} rounded-sm`} />;
          })}
        </div>
        <div className="flex items-center gap-1 mt-2 justify-end">
          <span className="text-xs font-[VT323] text-gray-500">Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-purple-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-purple-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
          <span className="text-xs font-[VT323] text-gray-500">More</span>
        </div>
      </div>

      {/* Gothic flourish */}
      <div className="text-center">
        <span className="text-purple-500/60 font-[MedievalSharp] text-sm">numbers from the ethereal planes</span>
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
        <div className="marquee-text text-green-400 font-[VT323] text-sm">
          ★ ★ ★ Thanks for visiting my corner of the internet. Feel free to reach out if you want to chat about code, hardware, or anything in between ★ ★ ★
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
            className="retro-btn flex flex-col items-center gap-1 py-3 text-center hover:bg-blue-50 transition-colors"
          >
            <img src={link.icon} alt="" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
            <span className={`text-sm font-[VT323] ${link.color}`}>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Footer message */}
      <div className="text-center space-y-2">
        <div className="gothic-divider">
          <span className="text-purple-400/50 text-xs font-[MedievalSharp]">fin</span>
        </div>
        <p className="text-xs text-gray-500 font-[VT323]">
          {new Date().getFullYear()} oculink | Best viewed at 1024x768 | 
          <span className="text-purple-500"> Made with Arch and too much caffeine</span>
        </p>
      </div>
    </div>
  );
}

function Taskbar({ time }: { time: Date }) {
  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="taskbar">
      <button className="start-btn">
        <img src="https://cdn.simpleicons.org/archlinux/black" alt="" style={{ width: 16, height: 16, imageRendering: 'auto' }} />
        <span>Start</span>
      </button>
      
      {/* Quick launch */}
      <div className="flex gap-1 ml-2">
        <span className="w-6 h-6 flex items-center justify-center border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">
          <img src="https://cdn.simpleicons.org/firefox/black" alt="" style={{ width: 14, height: 14, imageRendering: 'auto' }} />
        </span>
        <span className="w-6 h-6 flex items-center justify-center border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">
          <img src="https://cdn.simpleicons.org/gnometerminal/black" alt="" style={{ width: 14, height: 14, imageRendering: 'auto' }} />
        </span>
        <span className="w-6 h-6 flex items-center justify-center border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">
          <img src="https://cdn.simpleicons.org/neovim/black" alt="" style={{ width: 14, height: 14, imageRendering: 'auto' }} />
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System tray */}
      <div className="win95-inset px-3 py-1 flex items-center gap-2">
        <img src="https://cdn.simpleicons.org/pulseaudio/black" alt="" style={{ width: 12, height: 12, imageRendering: 'auto' }} />
        <img src="https://cdn.simpleicons.org/wifi/black" alt="" style={{ width: 12, height: 12, imageRendering: 'auto' }} />
        <span className="font-[VT323] text-sm text-black">{timeStr}</span>
      </div>
    </div>
  );
}

export default App;
