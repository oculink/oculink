import { useState, useEffect, useMemo } from 'react';

function App() {
  const [zIndex, setZIndex] = useState<Record<string, number>>({});
  const [highestZ, setHighestZ] = useState(10);
  const [viewerCount, setViewerCount] = useState(1337);
  const [timestamp, setTimestamp] = useState('00:00:00');

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // VHS timestamp counter
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      setTimestamp(`${hours}:${minutes}:${seconds}`);
    }, 1000);
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
      {/* VHS Overlays */}
      <div className="vhs-rec">REC</div>
      <div className="vhs-timestamp">PLAY ▶ {timestamp}</div>
      <div className="noise-overlay"></div>

      {/* Main Content Area - Vertical Stack */}
      <div className="desktop-area" style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '40px 20px' }}>
        {/* Header / Banner - VHS Style */}
        <div 
          id="header"
          className="error-dialog"
          style={{ ...windowLayout.header, zIndex: zIndex['header'] || 5 }}
          onClick={() => bringToFront('header')}
        >
          <HeaderContent />
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
          <CommentSection theme="terminal" />
        </Win95Window>

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
          <CommentSection theme="dracula" />
        </Win95Window>

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
          <CommentSection theme="amber" />
        </Win95Window>

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
          <CommentSection theme="blood" />
        </Win95Window>

      </div>
    </div>
  );
}

// ===== COMPONENTS =====

function CommentSection({ theme }: { theme: 'terminal' | 'dracula' | 'amber' | 'blood' }) {
  const [comments, setComments] = useState<Array<{ name: string; text: string; time: string }>>([
    { name: 'anon_user', text: 'cool setup bro', time: '2h ago' },
    { name: 'linux_fan', text: 'nice specs', time: '5h ago' },
  ]);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim()) {
      setComments([{ name: newName, text: newComment, time: 'just now' }, ...comments]);
      setNewName('');
      setNewComment('');
    }
  };

  const themeColors = {
    terminal: { border: '#00ffff', bg: '#0a0a1e', text: '#00ffff', input: '#1a1a2e' },
    dracula: { border: '#bd93f9', bg: '#282a36', text: '#f8f8f2', input: '#44475a' },
    amber: { border: '#ffb000', bg: '#1a0f05', text: '#ffb000', input: '#2a1a0f' },
    blood: { border: '#8b0000', bg: '#1a0505', text: '#ff4444', input: '#2d0a0a' },
  };

  const colors = themeColors[theme];

  return (
    <div className="comment-section" style={{ marginTop: '20px', borderTop: `2px solid ${colors.border}`, paddingTop: '15px' }}>
      <h3 style={{ color: colors.text, fontSize: '18px', marginBottom: '10px', fontFamily: 'VT323, monospace' }}>
        Comments
      </h3>
      
      {/* Comment list */}
      <div className="comment-list" style={{ marginBottom: '15px', maxHeight: '200px', overflowY: 'auto' }}>
        {comments.map((comment, i) => (
          <div key={i} style={{ 
            background: colors.input, 
            border: `1px solid ${colors.border}`,
            padding: '8px',
            marginBottom: '8px',
            fontFamily: 'VT323, monospace'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: colors.text, fontWeight: 'bold' }}>{comment.name}</span>
              <span style={{ color: colors.text, fontSize: '12px', opacity: 0.7 }}>{comment.time}</span>
            </div>
            <div style={{ color: colors.text }}>{comment.text}</div>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            background: colors.input,
            border: `2px solid ${colors.border}`,
            color: colors.text,
            padding: '6px',
            fontFamily: 'VT323, monospace',
            fontSize: '14px'
          }}
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          style={{
            background: colors.input,
            border: `2px solid ${colors.border}`,
            color: colors.text,
            padding: '6px',
            fontFamily: 'VT323, monospace',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            padding: '6px 16px',
            fontFamily: 'VT323, monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}
        >
          Post Comment
        </button>
      </form>
    </div>
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

function HeaderContent() {
  return (
    <div className="vhs-header">
      {/* Title bar */}
      <div className="error-title-bar">
        <span className="error-title-text">oculink.exe</span>
        <div className="error-title-buttons">
          <button className="error-title-btn">_</button>
          <button className="error-title-btn">□</button>
          <button className="error-title-btn">×</button>
        </div>
      </div>

      {/* Main content - minimal with VHS glitch */}
      <div className="vhs-content">
        <div className="vhs-glitch-container">
          <h1 className="vhs-name">oculink</h1>
        </div>

        {/* Social buttons */}
        <div className="social-buttons">
          <a href="https://github.com/oculink" target="_blank" rel="noopener noreferrer" className="social-btn">
            <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="social-icon" />
            <span>GitHub</span>
          </a>
          <a href="#" className="social-btn">
            <img src="https://cdn.simpleicons.org/x/white" alt="Twitter" className="social-icon" />
            <span>Twitter</span>
          </a>
          <a href="#" className="social-btn">
            <img src="https://cdn.simpleicons.org/discord/white" alt="Discord" className="social-icon" />
            <span>Discord</span>
          </a>
          <a href="#" className="social-btn">
            <img src="https://cdn.simpleicons.org/gmail/white" alt="Email" className="social-icon" />
            <span>Email</span>
          </a>
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
          <div className="border-2 border-cyan-400/30 bg-black/40 p-4 text-lg font-[VT323] backdrop-blur-sm">
            <p className="text-cyan-400">
              <span className="text-green-400 font-bold">~ $</span> cat about.txt
            </p>
            <p className="text-cyan-200 mt-3">
              Hey, I'm oculink. I spend most of my time writing code, tweaking my Arch setup, 
              and figuring out how to make things look cool on a screen. I've been running 
              Arch as my daily driver because I enjoy having full control over my system.
            </p>
            <p className="text-cyan-200 mt-3">
              When I'm not coding, I'm probably researching hardware, messing with my rig 
              (currently rocking a 7900 XTX and an 8845HS), or going down some rabbit hole 
              on the Arch Wiki at 3am.
            </p>
          </div>
        </div>
      </div>

      {/* Info table */}
      <div className="border-2 border-cyan-400/30 bg-black/40 p-4 backdrop-blur-sm">
        <table className="w-full text-lg font-[VT323]">
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
      <pre className="text-lg leading-relaxed whitespace-pre p-4" style={{ fontFamily: "'VT323', monospace" }}>
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
    <div className="space-y-4">
      <div className="text-center mb-6 font-[VT323] text-amber-400 text-lg">
        ╔══════════════════════════╗<br/>
        ║  SYSTEM SKILLS ANALYSIS  ║<br/>
        ╚══════════════════════╝
      </div>
      
      {skills.map((skill, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-[VT323] text-lg">{skill.icon}</span>
              <span className="text-lg font-[VT323] text-amber-300">{skill.name}</span>
            </div>
            <span className="text-base font-[VT323] text-amber-400">{skill.level}%</span>
          </div>
          <div className="h-5 bg-black/60 border border-amber-600/50 relative overflow-hidden">
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
    <div className="space-y-5">
      {/* Gothic header */}
      <div className="text-center font-[VT323] text-red-400 text-lg">
        SUMMONING RITUAL
      </div>

      {/* Marquee */}
      <div className="border-2 border-red-800/50 bg-black/60 overflow-hidden py-2">
        <div className="marquee-text text-red-400 font-[VT323] text-lg">
          Reach out through the void. Contact me if you dare to discuss code, hardware, or the secrets of the digital realm
        </div>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 py-4 text-center border-2 border-red-800/50 bg-black/40 hover:bg-red-900/30 transition-all hover:shadow-[0_0_15px_rgba(139,0,0,0.5)] hover:border-red-600"
          >
            <img src={link.icon} alt="" style={{ width: 24, height: 24, imageRendering: 'auto' }} />
            <span className="text-base font-[VT323] text-red-300">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Stream chat at bottom */}
      <div className="border-2 border-red-800/50 bg-black/60 p-4 mt-5">
        <div className="text-base text-red-400 font-bold mb-2 font-[VT323]">Dark Chat</div>
        <div className="border-b border-red-900/30 pb-2 mb-2">
          <span className="text-red-500 font-[VT323] text-base">demon_lord:</span>
          <span className="text-red-300/70 font-[VT323] text-base"> nice page, very cursed</span>
        </div>
        <div className="border-b border-red-900/30 pb-2 mb-2">
          <span className="text-purple-400 font-[VT323] text-base">femme_soule:</span>
          <span className="text-red-300/70 font-[VT323] text-base"> surrender your soul to this aesthetic</span>
        </div>
        <div>
          <span className="text-pink-400 font-[VT323] text-base">dark_angel:</span>
          <span className="text-red-300/70 font-[VT323] text-base"> first!!</span>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center space-y-3">
        <div className="flex items-center gap-2 justify-center opacity-60">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <span className="text-red-400/60 text-sm font-[MedievalSharp]">fin</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>
        <p className="text-base text-red-400/60 font-[VT323]">
          {new Date().getFullYear()} oculink | Forged in the fires of Arch Linux
        </p>
      </div>
    </div>
  );
}

export default App;
