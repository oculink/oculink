import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>('about');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="desktop-bg scanlines min-h-screen relative">
      {/* Floating Bubbles - Fruitiger Aero */}
      <Bubbles />
      
      {/* Gothic corner decorations */}
      <GothicCorners />

      {/* Main Content Area */}
      <div className="relative z-10 p-4 md:p-8 pb-16">
        {/* Header Banner */}
        <HeaderBanner />

        {/* Windows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* About Me Window */}
          <Win95Window
            title="about_me.exe"
            isGothic={true}
            isActive={activeWindow === 'about'}
            onFocus={() => setActiveWindow('about')}
          >
            <AboutMeContent />
          </Win95Window>

          {/* Projects Window */}
          <Win95Window
            title="projects.dll"
            isActive={activeWindow === 'projects'}
            onFocus={() => setActiveWindow('projects')}
          >
            <ProjectsContent />
          </Win95Window>

          {/* Skills Window */}
          <Win95Window
            title="skills.dat"
            isActive={activeWindow === 'skills'}
            onFocus={() => setActiveWindow('skills')}
          >
            <SkillsContent />
          </Win95Window>

          {/* Stats / GitHub Window */}
          <Win95Window
            title="stats.log"
            isGothic={true}
            isActive={activeWindow === 'stats'}
            onFocus={() => setActiveWindow('stats')}
          >
            <StatsContent />
          </Win95Window>
        </div>

        {/* Contact / Links Section */}
        <div className="mt-6">
          <Win95Window
            title="connect.bat"
            isActive={activeWindow === 'connect'}
            onFocus={() => setActiveWindow('connect')}
          >
            <ContactContent />
          </Win95Window>
        </div>
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

function HeaderBanner() {
  return (
    <div className="relative">
      {/* Aero glass banner */}
      <div className="aero-card p-6 md:p-8 text-center relative overflow-hidden">
        {/* Gothic ornamental top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="text-purple-400/40 text-sm tracking-[1em]">⸙ ⸙ ⸙ ⸙ ⸙</div>
        </div>

        {/* Username */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 glitch-text font-[MedievalSharp]">
          oculink
        </h1>
        
        {/* Subtitle with retro terminal feel */}
        <div className="mt-3 text-lg text-green-400/80 font-[VT323] cursor-blink">
          &gt; crafting digital experiences from the void_
        </div>

        {/* Decorative divider */}
        <div className="gothic-divider mt-4">
          <span className="text-purple-400/60 text-xs">☽ ★ ☾</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['Developer', 'Creator', 'Digital Architect', 'Code Alchemist'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-[VT323] text-sm bg-black/30 text-blue-300 border border-blue-500/30 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Leaf decorations - Fruitiger Aero nature vibes */}
        <div className="absolute top-4 left-4 text-2xl leaf-deco opacity-30">🍃</div>
        <div className="absolute bottom-4 right-4 text-2xl leaf-deco opacity-30" style={{ animationDelay: '1s' }}>🌿</div>
      </div>
    </div>
  );
}

function Win95Window({ 
  title, 
  children, 
  isGothic = false, 
  isActive = false,
  onFocus 
}: { 
  title: string; 
  children: React.ReactNode; 
  isGothic?: boolean;
  isActive?: boolean;
  onFocus?: () => void;
}) {
  return (
    <div 
      className={`win95-window ${isActive ? 'z-20' : 'z-10'} transition-all`}
      onClick={onFocus}
      style={{ opacity: isActive ? 1 : 0.95 }}
    >
      <div className={`title-bar ${isGothic ? 'title-bar-gothic' : ''}`}>
        <span className="title-bar-text">
          {isGothic ? '⛧ ' : '📁 '}{title}
        </span>
        <div className="title-bar-buttons">
          <button className="title-btn">_</button>
          <button className="title-btn">□</button>
          <button className="title-btn">×</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

function AboutMeContent() {
  return (
    <div className="space-y-4">
      {/* Profile section */}
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div className="w-20 h-20 win95-inset flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 flex-shrink-0">
          <span className="text-3xl">⚡</span>
        </div>
        <div className="flex-1">
          <div className="win95-inset bg-white p-3 text-sm font-[VT323]">
            <p className="text-black">
              <span className="text-purple-700 font-bold">C:\Users\oculink&gt;</span> whoami
            </p>
            <p className="text-gray-700 mt-2">
              A developer who exists somewhere between the glow of CRT monitors 
              and the ethereal light of modern displays. I build things that live on the internet.
            </p>
            <p className="text-gray-700 mt-2">
              Passionate about clean code, creative interfaces, and pushing pixels 
              into new dimensions. Part retro enthusiast, part futurist.
            </p>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="win95-inset bg-white p-3">
        <table className="w-full text-sm font-[VT323] text-black">
          <tbody>
            <tr><td className="pr-4 text-purple-700 font-bold">Location:</td><td>The Digital Realm</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">OS:</td><td>Reality.exe (buggy)</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">Editor:</td><td>VS Code / Vim</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">Status:</td><td className="text-green-600">● Online</td></tr>
            <tr><td className="pr-4 text-purple-700 font-bold">Mood:</td><td>☕ Caffeinated</td></tr>
          </tbody>
        </table>
      </div>

      {/* Gothic accent */}
      <div className="text-center text-purple-500/50 text-xs font-[MedievalSharp]">
        — In the beginning was the Code —
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { name: 'project_alpha', desc: 'A web application built with modern frameworks', tech: 'React, TypeScript', status: 'active' },
    { name: 'void_engine', desc: 'Custom rendering engine for creative projects', tech: 'WebGL, GLSL', status: 'wip' },
    { name: 'retro_shell', desc: 'Terminal emulator with nostalgic aesthetics', tech: 'Rust, WASM', status: 'active' },
    { name: 'pixel_forge', desc: 'Pixel art creation tool for the browser', tech: 'Canvas, TypeScript', status: 'beta' },
  ];

  return (
    <div className="space-y-3">
      {projects.map((project, i) => (
        <div key={i} className="win95-inset bg-white p-3 hover:bg-blue-50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-[VT323] text-blue-800 text-lg font-bold">
              📂 {project.name}
            </span>
            <span className={`text-xs px-2 py-0.5 font-[VT323] rounded ${
              project.status === 'active' ? 'bg-green-100 text-green-700 border border-green-300' :
              project.status === 'wip' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
              'bg-blue-100 text-blue-700 border border-blue-300'
            }`}>
              {project.status === 'active' ? '● ACTIVE' : project.status === 'wip' ? '◐ WIP' : '◑ BETA'}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-[VT323] mt-1">{project.desc}</p>
          <p className="text-xs text-gray-400 font-[VT323] mt-1">[{project.tech}]</p>
        </div>
      ))}
      
      <div className="text-center mt-3">
        <button className="retro-btn text-sm">📁 View All Projects</button>
      </div>
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React/Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Rust', level: 60 },
    { name: 'CSS/Tailwind', level: 88 },
    { name: 'Databases', level: 70 },
    { name: 'DevOps/Cloud', level: 65 },
  ];

  return (
    <div className="space-y-3">
      {skills.map((skill, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-[VT323] text-black">{skill.name}</span>
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
          ✧ Always learning, always building ✧
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
        <p className="text-green-400">$ github-stats --user oculink</p>
        <p className="text-gray-400 mt-2">Loading repository data...</p>
        <div className="mt-3 space-y-1">
          <p className="text-cyan-400">┌──────────────────────────────┐</p>
          <p className="text-cyan-400">│ <span className="text-white">Repositories:</span> <span className="text-yellow-400">42+</span>           │</p>
          <p className="text-cyan-400">│ <span className="text-white">Stars Earned:</span>  <span className="text-yellow-400">★ 128</span>         │</p>
          <p className="text-cyan-400">│ <span className="text-white">Contributions:</span> <span className="text-yellow-400">1,337</span>        │</p>
          <p className="text-cyan-400">│ <span className="text-white">Followers:</span>    <span className="text-yellow-400">∞</span>              │</p>
          <p className="text-cyan-400">└──────────────────────────────┘</p>
        </div>
        <p className="text-green-400 mt-2 cursor-blink">$ _</p>
      </div>

      {/* Contribution graph (simplified) */}
      <div className="win95-inset bg-white p-3">
        <p className="text-xs font-[VT323] text-black mb-2">Contribution Activity:</p>
        <div className="grid grid-cols-12 gap-0.5">
          {Array.from({ length: 84 }, (_, i) => {
            const intensity = Math.random();
            const color = intensity > 0.8 ? 'bg-purple-600' : 
                         intensity > 0.6 ? 'bg-purple-400' : 
                         intensity > 0.4 ? 'bg-purple-300' : 
                         intensity > 0.2 ? 'bg-purple-200' : 'bg-gray-100';
            return <div key={i} className={`w-full aspect-square ${color} rounded-sm`} />;
          })}
        </div>
      </div>

      {/* Gothic flourish */}
      <div className="text-center">
        <span className="text-purple-500/60 font-[MedievalSharp] text-sm">⸙ Data from the ethereal planes ⸙</span>
      </div>
    </div>
  );
}

function ContactContent() {
  const links = [
    { icon: '🐙', label: 'GitHub', url: 'https://github.com/oculink', color: 'text-gray-800' },
    { icon: '🐦', label: 'Twitter/X', url: '#', color: 'text-blue-500' },
    { icon: '💬', label: 'Discord', url: '#', color: 'text-indigo-500' },
    { icon: '📧', label: 'Email', url: '#', color: 'text-red-500' },
    { icon: '🌐', label: 'Website', url: '#', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-4">
      {/* Marquee */}
      <div className="win95-inset bg-black overflow-hidden py-1">
        <div className="marquee-text text-green-400 font-[VT323] text-sm">
          ★ ★ ★ Thanks for visiting my digital sanctum! Feel free to connect! ★ ★ ★ Built with ♥ and too much coffee ★ ★ ★
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
            <span className="text-xl">{link.icon}</span>
            <span className={`text-sm font-[VT323] ${link.color}`}>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Footer message */}
      <div className="text-center space-y-2">
        <div className="gothic-divider">
          <span className="text-purple-400/50 text-xs font-[MedievalSharp]">✠ fin ✠</span>
        </div>
        <p className="text-xs text-gray-500 font-[VT323]">
          © {new Date().getFullYear()} oculink | Best viewed at 1024x768 | 
          <span className="text-purple-500"> Made with retro love</span>
        </p>
      </div>
    </div>
  );
}

function Taskbar({ time }: { time: Date }) {
  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 z-50">
      <button className="start-btn">
        <span className="text-sm">🏁</span>
        <span>Start</span>
      </button>
      
      {/* Quick launch icons */}
      <div className="flex gap-1 ml-2">
        <span className="w-6 h-6 flex items-center justify-center text-sm border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">🌐</span>
        <span className="w-6 h-6 flex items-center justify-center text-sm border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">📁</span>
        <span className="w-6 h-6 flex items-center justify-center text-sm border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300">💻</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System tray */}
      <div className="win95-inset px-3 py-1 flex items-center gap-2">
        <span className="text-xs">🔊</span>
        <span className="text-xs">🔌</span>
        <span className="font-[VT323] text-sm text-black">{timeStr}</span>
      </div>
    </div>
  );
}

export default App;
