import { useState, useEffect, useMemo } from 'react';

function App() {
  const [zIndex, setZIndex] = useState<Record<string, number>>({});
  const [highestZ, setHighestZ] = useState(10);
  const [timestamp, setTimestamp] = useState('00:00:00');
  const [webcamOpacity, setWebcamOpacity] = useState(0.7);

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

  // Window layout - side by side with inconsistent heights
  const windowLayout = useMemo(() => ({
    header: { width: 'min(700px, 94vw)', transform: 'rotate(-0.3deg)', margin: '0 auto' },
    about: { width: '45%', height: '400px', transform: 'rotate(0.4deg)' },
    fastfetch: { width: '50%', height: '500px', transform: 'rotate(-0.5deg)' },
  }), []);

  // Mobile layout - stacked
  const mobileLayout = useMemo(() => ({
    header: { width: '100%', transform: 'none', margin: '0' },
    about: { width: '100%', height: 'auto', minHeight: '400px', transform: 'none' },
    fastfetch: { width: '100%', height: 'auto', minHeight: '500px', transform: 'none' },
  }), []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentLayout = isMobile ? mobileLayout : windowLayout;

  return (
    <div className="main-bg scanlines">
      {/* VHS Overlays */}
      <div className="vhs-rec">REC</div>
      <div className="vhs-timestamp">PLAY ▶ {timestamp}</div>
      <div className="noise-overlay"></div>

      {/* Main Content Area - Side by Side */}
      <div className="desktop-area" style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '40px 20px' }}>
        {/* Header - Full width */}
        <div 
          id="header"
          className="error-dialog"
          style={{ ...currentLayout.header, zIndex: zIndex['header'] || 5 }}
          onClick={() => bringToFront('header')}
        >
          <HeaderContent />
        </div>

        {/* Windows Row - Side by side on desktop, stacked on mobile */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center', 
          alignItems: 'flex-start',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* About Me - Dark Terminal */}
          <Win95Window
            id="about"
            title="~/about_me.txt"
            theme="terminal"
            style={currentLayout.about}
            zIndex={zIndex['about'] || 6}
            onFocus={() => bringToFront('about')}
          >
            <AboutMeContent />
          </Win95Window>

          {/* Fastfetch - Dracula */}
          <Win95Window
            id="fastfetch"
            title="oculink@archlinux: ~"
            theme="dracula"
            style={currentLayout.fastfetch}
            zIndex={zIndex['fastfetch'] || 8}
            onFocus={() => bringToFront('fastfetch')}
          >
            <FastfetchContent />
          </Win95Window>

        </div>

      </div>

      {/* Floating Webcam Overlay - Qtie */}
      <div className="webcam-overlay-fixed" style={{ opacity: webcamOpacity }}>
        <div className="webcam-slider-container">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={webcamOpacity}
            onChange={(e) => setWebcamOpacity(parseFloat(e.target.value))}
            className="webcam-slider"
          />
        </div>
        <div className="webcam-rgb-frame">
          <div className="webcam-inner">
            <img 
              src="https://media1.tenor.com/m/DTD6MHUBbdQAAAAC/yunyun-yunyun-syndrome-rythm-psychosis.gif"
              alt="Qtie"
              className="webcam-gif"
            />
            <div className="webcam-overlay-effects">
              <div className="webcam-rec">● REC</div>
              <div className="webcam-timestamp">CAM 01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENTS =====

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
  theme?: 'pink' | 'terminal' | 'dracula' | 'amber' | 'blood' | 'webcam';
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



export default App;
