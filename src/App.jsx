import React, { useState } from 'react';
import { 
  Smile, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Activity, 
  Layers, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import DentalScene from './components/DentalScene';
import ScannerOverlay from './components/ScannerOverlay';

export default function App() {
  // Customizer States
  const [materialType, setMaterialType] = useState('porcelain');
  const [exploded, setExploded] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [activePart, setActivePart] = useState(null); // 'crown' | 'abutment' | 'screw' | null
  
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'implants',
    date: '',
    time: '',
    notes: '',
    enable3DScan: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert("Please fill in required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  const services = [
    {
      id: 'implants',
      title: 'Guided Dental Implants',
      desc: 'Computer-guided, high-precision implant surgery with 99.8% placement accuracy. Procedurally osseointegrated for lifetime support.',
      time: '1-2 Sessions',
      tech: 'CBCT 3D Scan & SLA Screws'
    },
    {
      id: 'crowns',
      title: 'Same-Day CAD/CAM Crowns',
      desc: 'Direct scanning and high-precision milling of translucent ceramic/porcelain crowns right in our studio. Complete in under 2 hours.',
      time: 'Same-day (1.5 hrs)',
      tech: 'Cerec PrimeMill & Zirconia'
    },
    {
      id: 'cosmetic',
      title: '3D Smile Design & Veneers',
      desc: 'Virtual digital preview of cosmetic teeth adjustments before bonding. Sculpting hyper-realistic shape and shade matching.',
      time: '2 Sessions',
      tech: 'IPS e.max Porcelain'
    },
    {
      id: 'ortho',
      title: 'Digital Aligners (Invisalign)',
      desc: 'Continuous 3D tracking and mapping of teeth movement. Custom-milled clear aligners calculated via AI orthodontic algorithms.',
      time: '6-18 Months',
      tech: 'iTero 3D Dental Scanner'
    }
  ];

  const testimonialReviews = [
    {
      name: 'Dr. Sarah Lin',
      role: 'Biomedical Consultant',
      text: 'The 3D scanning accuracy at Matrix Dental is astonishing. Being able to see the exploded view of my ceramic crown implant before placement was a complete game-changer.',
      rating: 5,
      date: 'June 2026'
    },
    {
      name: 'Marcus Vance',
      role: 'Software Architect',
      text: 'This is the sci-fi movie version of dentistry. The titanium screw integrates beautifully. Same-day milled crown meant no messy clay molds and no temporary teeth!',
      rating: 5,
      date: 'May 2026'
    },
    {
      name: 'Elena Rostova',
      role: 'Creative Director',
      text: 'Their custom shade matching is spectacular. My front tooth veneer looks completely natural, capturing the depth and translucency of actual porcelain.',
      rating: 5,
      date: 'April 2026'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Matrix Grid Overlay */}
      <div className="cyber-grid"></div>

      {/* 1. Sleek Navigation Header */}
      <header className="header-sticky glass">
        <div className="header-container container">
          <a href="#" className="flex-row gap-3">
            <img 
              src="/matrix_dental_logo.jpg" 
              alt="Matrix Logo" 
              style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.2)' }} 
            />
            <div>
              <span className="font-mono font-black text-lg tracking-wider text-white flex-center-y gap-1.5">
                MATRIX <span className="text-[#00f2fe] text-glow-cyan">DENTAL</span>
              </span>
              <span className="block text-[9px] font-mono text-slate-400 tracking-widest uppercase">3D Aesthetic Lab</span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="nav-links">
            <a href="#lab" className="flex-center-y gap-1">
              <span className="text-[#00f2fe]/50 font-bold">01.</span> 3D Lab
            </a>
            <a href="#services" className="flex-center-y gap-1">
              <span className="text-[#9d4edd]/50 font-bold">02.</span> Treatments
            </a>
            <a href="#tech" className="flex-center-y gap-1">
              <span className="text-[#00ff88]/50 font-bold">03.</span> Architecture
            </a>
            <a href="#booking" className="flex-center-y gap-1">
              <span className="text-white/30 font-bold">04.</span> Book Terminal
            </a>
          </nav>

          {/* Right Header Buttons */}
          <div className="header-actions">
            <div className="pulse-badge">
              <span className="pulse-dot-green"></span>
              SURGERY ONLINE
            </div>
            <a href="#booking" className="btn-premium">
              Book 3D Consult
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="mobile-toggle pointer-events-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer gap-5 font-mono text-sm uppercase tracking-wide z-50">
            <a href="#lab" onClick={() => setMobileMenuOpen(false)} className="py-2">01. 3D customizer lab</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2">02. services</a>
            <a href="#tech" onClick={() => setMobileMenuOpen(false)} className="py-2">03. tech specs</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="py-2">04. booking terminal</a>
            <div className="flex-col gap-4 mt-4 pt-4 border-top">
              <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="btn-premium w-full text-center">
                Book Consult
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Digital Dental Concept) */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="hero-layout container relative z-10">
          
          {/* Left Column: Premium Dentistry copy */}
          <div className="flex-col gap-8">
            <div className="flex-center-y gap-2.5 px-4 py-2 rounded-full border border-[#00f2fe]/20 bg-[#00f2fe]/5 w-fit">
              <Sparkles className="w-4 h-4 text-[#00f2fe] float-slow" />
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest">
                Rebuilding Smiles at 10-Micron Precision
              </span>
            </div>
            
            <div className="flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                THE NEXT DIMENSION <br />
                OF DIGITAL <br />
                <span className="matrix-title text-glow-cyan">DENTISTRY</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Matrix Dental Studio fuses clinical grade biomaterials, high-resolution 3D digital oral scanning, and robotic CAD/CAM milling to deliver dental restorations that last a lifetime. Inspect your structure, interact with components, and book your custom smile design.
              </p>
            </div>

            <div className="flex-wrap gap-4">
              <a href="#lab" className="btn-premium">
                Launch 3D Lab
              </a>
              <a href="#booking" className="btn-premium-secondary">
                Book Consultation
              </a>
            </div>

            {/* Micro details stats grid */}
            <div className="stats-grid pt-6 border-top font-mono">
              <div>
                <div className="text-2xl font-bold text-[#00f2fe] text-glow-cyan">&lt; 10μ</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Milling Tolerance</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Implant Success</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#9d4edd] text-glow-purple">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Procedural 3D Fit</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Preview 3D canvas (Scanning look) */}
          <div className="h-400 relative glass border-cyan-500/10 p-2 overflow-hidden rounded-2xl">
            {/* Ambient matrix style indicators overlaying the scene */}
            <div className="absolute top-4 left-4 z-20 hud-box flex-col gap-1 opacity-75">
              <div className="flex-center-y gap-1.5">
                <span className="pulse-dot-green"></span>
                <span>PREVIEW MODE: DETECTED</span>
              </div>
              <div>SCAN STABILITY: 99.98%</div>
            </div>
            
            <div className="absolute bottom-4 right-4 z-20 hud-box text-[9px] text-slate-500 text-right">
              <div>MATRIX_GRID // ORTHO</div>
              <div>DRAG TO ROTATE MODEL</div>
            </div>

            <div className="scanner-beam-green"></div>

            {/* Embedded 3D Scene in Wireframe matrix mode */}
            <DentalScene 
              materialType="matrix" 
              exploded={false} 
              showWireframe={true} 
              activePart={null}
              showGrid={false}
            />
          </div>

        </div>
        
        {/* Subtle decorative glowing lights in background */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#00f2fe]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-[#00ff88]/5 blur-[100px] pointer-events-none"></div>
      </section>

      {/* 3. Interactive 3D Customizer Lab (Main Feature) */}
      <section id="lab" className="section-padding border-white/5 relative bg-[var(--bg-secondary)]">
        <div className="container flex-col gap-12">
          
          {/* Section title */}
          <div className="flex-col gap-4 text-center items-center">
            <div className="flex-center-y gap-2 px-3 py-1 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 text-[10px] font-mono tracking-widest text-[#00ff88] text-glow-green uppercase">
              Interact & Customize
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              MATRIX 3D <span className="text-[#00f2fe]">IMPLANT LAB</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Deconstruct a dental implant. Switch between clinical-grade materials, toggle exploded layers, and hover or select elements to view detailed structural specs.
            </p>
          </div>

          {/* Interactive Workspace Grid */}
          <div className="lab-layout items-stretch">
            
            {/* Left Box: 3D Viewport container */}
            <div className="h-400 relative glass border-cyan-500/20 bg-[var(--bg-primary)] rounded-2xl overflow-hidden">
              
              {/* Telemetry diagnostics overlay component */}
              <ScannerOverlay 
                activePart={activePart} 
                exploded={exploded} 
                materialType={materialType} 
                showWireframe={showWireframe} 
              />

              {/* R3F WebGL Scene */}
              <DentalScene 
                materialType={materialType} 
                exploded={exploded} 
                showWireframe={showWireframe} 
                activePart={activePart}
                showGrid={true}
              />
            </div>

            {/* Right Box: Control dashboard panel */}
            <div className="flex-col gap-6 justify-between p-8 glass border-white/5 rounded-2xl">
              <div className="flex-col gap-6">
                
                {/* 3D Component selectors (Telemetry Tabs) */}
                <div className="flex-col gap-2.5">
                  <span className="font-mono text-xs uppercase text-slate-500 tracking-wider flex-center-y gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#00f2fe]" /> Choose Implant Component:
                  </span>
                  <div className="stats-grid font-mono text-[10px] uppercase font-semibold">
                    <button 
                      onClick={() => setActivePart(activePart === 'crown' ? null : 'crown')}
                      className={`px-3 py-3 rounded-lg border text-center transition-all ${
                        activePart === 'crown' 
                          ? 'border-[#00f2fe] bg-[#00f2fe]/10 text-white text-glow-cyan' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      Molar Crown
                    </button>
                    <button 
                      onClick={() => setActivePart(activePart === 'abutment' ? null : 'abutment')}
                      className={`px-3 py-3 rounded-lg border text-center transition-all ${
                        activePart === 'abutment' 
                          ? 'border-[#00f2fe] bg-[#00f2fe]/10 text-white text-glow-cyan' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      Abutment Link
                    </button>
                    <button 
                      onClick={() => setActivePart(activePart === 'screw' ? null : 'screw')}
                      className={`px-3 py-3 rounded-lg border text-center transition-all ${
                        activePart === 'screw' 
                          ? 'border-[#00f2fe] bg-[#00f2fe]/10 text-white text-glow-cyan' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      Fixture Screw
                    </button>
                  </div>
                </div>

                {/* Exploded view control toggle */}
                <div className="flex-between p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex-col gap-1">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wide">Deconstruct Assembly</span>
                    <span className="text-[10px] text-slate-500">Isolate layers along vertical coordinate axis</span>
                  </div>
                  <button 
                    onClick={() => setExploded(!exploded)}
                    className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 pointer-events-auto ${exploded ? 'bg-[#00f2fe]' : 'bg-slate-700'}`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${exploded ? 'translate-x-7' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Material customization selectors */}
                <div className="flex-col gap-3">
                  <span className="font-mono text-xs uppercase text-slate-500 tracking-wider">
                    Biomaterial Glaze & Finish:
                  </span>
                  <div className="materials-grid font-mono text-[10px] uppercase font-bold">
                    <button 
                      onClick={() => setMaterialType('porcelain')}
                      className={`py-3.5 px-2.5 rounded-xl border flex-col items-center gap-1.5 transition-all ${
                        materialType === 'porcelain' 
                          ? 'border-white bg-white/5 text-white' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-slate-300 shadow"></div>
                      <span>Porcelain</span>
                    </button>
                    
                    <button 
                      onClick={() => setMaterialType('gold')}
                      className={`py-3.5 px-2.5 rounded-xl border flex-col items-center gap-1.5 transition-all ${
                        materialType === 'gold' 
                          ? 'border-[#ffd700] bg-[#ffd700]/5 text-[#ffd700]' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#ffd700] border border-yellow-300 shadow"></div>
                      <span>Polished Gold</span>
                    </button>
                    
                    <button 
                      onClick={() => setMaterialType('titanium')}
                      className={`py-3.5 px-2.5 rounded-xl border flex-col items-center gap-1.5 transition-all ${
                        materialType === 'titanium' 
                          ? 'border-[#94a3b8] bg-[#94a3b8]/5 text-white' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#64748b] border border-slate-500 shadow"></div>
                      <span>Titanium</span>
                    </button>
                    
                    <button 
                      onClick={() => setMaterialType('matrix')}
                      className={`py-3.5 px-2.5 rounded-xl border flex-col items-center gap-1.5 transition-all ${
                        materialType === 'matrix' 
                          ? 'border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]' 
                          : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-400 border border-cyan-300 shadow animate-pulse"></div>
                      <span>Matrix Hologram</span>
                    </button>
                  </div>
                </div>

                {/* Wireframe Mesh Toggle */}
                <div className="flex-between p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex-col gap-1">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wide">Wireframe Mesh Overlay</span>
                    <span className="text-[10px] text-slate-500">Display polygons and vertex geometry mappings</span>
                  </div>
                  <button 
                    onClick={() => setShowWireframe(!showWireframe)}
                    className="flex-center-y gap-2 text-xs font-mono font-bold text-[#00f2fe] pointer-events-auto hover:text-cyan-300"
                  >
                    {showWireframe ? (
                      <>
                        <Eye className="w-4 h-4" /> WIRE ON
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4" /> WIRE OFF
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Exploded clinical info summary panel */}
              <div className="mt-8 pt-6 border-top font-mono text-[11px] text-slate-400 flex-between">
                <span>LAB_SECTOR: B-3D</span>
                <span className="flex-center-y gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#00ff88]" /> SCAN_FREQUENCY: 60HZ
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Precision Services Grid */}
      <section id="services" className="section-padding border-white/5 relative">
        <div className="container flex-col gap-16">
          
          <div className="flex-between flex-wrap gap-6">
            <div className="flex-col gap-4">
              <div className="flex-center-y gap-2 px-3 py-1 rounded-full border border-[#00f2fe]/20 bg-[#00f2fe]/5 text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase w-fit">
                Clinical Treatments
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                DIGITAL CLINICAL <span className="text-[#00ff88]">SERVICES</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Combining robotic milling speeds with cellular biocompatibility standards to offer structural implants and aesthetics.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc) => (
              <div key={svc.id} className="service-card glass glow-border">
                <div className="flex-col">
                  <div className="service-icon">
                    {svc.id === 'implants' && <Cpu className="w-6 h-6" />}
                    {svc.id === 'crowns' && <Layers className="w-6 h-6" />}
                    {svc.id === 'cosmetic' && <Sparkles className="w-6 h-6" />}
                    {svc.id === 'ortho' && <Smile className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">{svc.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{svc.desc}</p>
                </div>
                <div className="flex-between pt-4 border-top font-mono text-[10px] text-slate-500 uppercase">
                  <span>Duration: <strong className="text-white">{svc.time}</strong></span>
                  <span>Tech: <strong className="text-[#00f2fe]">{svc.tech}</strong></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Cyber Dental Technology Stack (The Architecture Section) */}
      <section id="tech" className="section-padding border-white/5 bg-[var(--bg-secondary)] relative">
        <div className="tech-layout container">
          
          {/* Left Column: Tech Grid breakdown */}
          <div className="flex-col gap-8">
            <div className="flex-center-y gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono tracking-widest text-[#00ff88] uppercase w-fit">
              Advanced Hardware Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              HIGH PRECISION <br />
              <span className="text-[#00f2fe]">LABORATORY</span> HARDWARE
            </h2>
            
            <div className="flex-col gap-6 font-mono text-xs">
              <div className="flex-row items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/10 flex-center text-[#00f2fe] shrink-0 border border-[#00f2fe]/20">
                  <span className="font-bold">1</span>
                </div>
                <div className="flex-col gap-1">
                  <h4 className="text-white font-bold text-sm">3D INTRAORAL SCANNING</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                    Say goodbye to messy dental trays. Our iTero high-definition laser scans map oral geometry in seconds, capturing teeth boundaries at 0.005mm volumetric spacing.
                  </p>
                </div>
              </div>

              <div className="flex-row items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 flex-center text-[#00ff88] shrink-0 border border-[#00ff88]/20">
                  <span className="font-bold">2</span>
                </div>
                <div className="flex-col gap-1">
                  <h4 className="text-white font-bold text-sm">CAD/CAM ROBOTIC MILLING</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                    Restorations milled live in-studio. Using multi-axis CNC micro-cutters, ceramic and zirconium crown assemblies are carved under water jets for perfect occlusion fitting.
                  </p>
                </div>
              </div>

              <div className="flex-row items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex-center text-[#00ff88] shrink-0 border border-emerald-500/20">
                  <span className="font-bold">3</span>
                </div>
                <div className="flex-col gap-1">
                  <h4 className="text-white font-bold text-sm">OSSEOINTEGRATED SURFACE TREATMENT</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                    Implant screws use sandblasted, large-grit, acid-etched (SLA) titanium structures, drawing cell integration speeds to double standard timeline parameters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium stats visual block */}
          <div className="glass p-8 border-cyan-500/15 flex-col gap-8 justify-between relative overflow-hidden rounded-2xl">
            <img 
              src="/high_tech_dental_lab.jpg" 
              alt="Futuristic Dental Lab" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, zIndex: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04080f] via-[#04080f]/75 to-transparent" style={{ zIndex: 1 }}></div>
            <div className="scanner-beam-green" style={{ zIndex: 2 }}></div>
            
            <div className="flex-col gap-1" style={{ zIndex: 3 }}>
              <span className="text-[10px] font-mono text-[#00f2fe] uppercase tracking-widest flex-center-y gap-1.5">
                <span className="pulse-dot-green"></span> Diagnostics Report
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wide text-white">Biocompatible Standards</h3>
            </div>

            <div className="flex-col gap-4 font-mono text-[11px] text-slate-300" style={{ zIndex: 3 }}>
              <div className="flex-between py-2.5 border-top">
                <span>Material Purity (Grade 5 Titanium)</span>
                <span className="text-[#00ff88] font-bold">99.98%</span>
              </div>
              <div className="flex-between py-2.5 border-top">
                <span>Milling Axis Freedom</span>
                <span className="text-white">5-Axis CNC</span>
              </div>
              <div className="flex-between py-2.5 border-top">
                <span>Surface Roughness (Ra)</span>
                <span className="text-white">1.8 - 2.2 μm</span>
              </div>
              <div className="flex-between py-2.5 border-top">
                <span>Mean Healing Duration</span>
                <span className="text-[#00f2fe] font-bold">6 - 8 Weeks</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[11px] leading-relaxed font-sans" style={{ zIndex: 3 }}>
              <strong>Clinical Note:</strong> Guided implants are computer mapped prior to execution. This eliminates surgical cutting incisions, allowing rapid recovery schedules.
            </div>
          </div>

        </div>
      </section>

      {/* 6. Testimonials Reviews Slider */}
      <section className="section-padding border-white/5 relative">
        <div className="container flex-col gap-12">
          
          <div className="flex-col gap-4 text-center items-center">
            <div className="flex-center-y gap-2 px-3 py-1 rounded-full border border-[#00f2fe]/20 bg-[#00f2fe]/5 text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              PATIENT RECOVERY <span className="text-white">JOURNEYS</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {testimonialReviews.map((rev, idx) => (
              <div key={idx} className="glass p-8 border-white/5 flex-col justify-between gap-6 rounded-2xl">
                <div className="flex-col gap-4">
                  <div className="flex-center-y gap-1 text-yellow-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs italic leading-relaxed font-sans">
                    "{rev.text}"
                  </p>
                </div>
                
                <div className="flex-between pt-4 border-top font-mono text-[10px]">
                  <div>
                    <div className="text-white font-bold">{rev.name}</div>
                    <div className="text-slate-500 text-[9px] mt-0.5">{rev.role}</div>
                  </div>
                  <span className="text-slate-500">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Interactive Booking Terminal (Contact Form) */}
      <section id="booking" className="section-padding border-white/5 relative bg-[var(--bg-primary)]">
        <div className="container max-w-4xl flex-col gap-12">
          
          <div className="flex-col gap-4 text-center items-center">
            <div className="flex-center-y gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono tracking-widest text-white uppercase">
              Secure Terminal Connection
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white">
              BOOK DIGITAL CONSULTATION
            </h2>
            <p className="text-slate-200 text-base max-w-xl leading-relaxed">
              Transmit your medical profile securely to our laboratory. Select a time block below to initiate 3D scanning presets.
            </p>
          </div>

          {/* Form container */}
          <div className="booking-card glass p-8 border-cyan-500/20 bg-[var(--bg-secondary)] rounded-2xl relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00f2fe] to-[#9d4edd]"></div>

            {isSubmitted ? (
              // Success State
              <div className="py-12 flex-col items-center text-center gap-6 font-mono">
                <CheckCircle className="w-16 h-16 text-[#00ff88] text-glow-green" />
                <div className="flex-col gap-2">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">TRANSMISSION CONFIRMED</h3>
                  <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                    Appointment request log compiled successfully. Our digital coordinators will ping your terminal at <strong className="text-[#00f2fe]">{bookingForm.email}</strong> to finalize scanning.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white text-xs max-w-md">
                  Reference ID: <strong className="text-white select-all">MTX-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-premium-secondary text-xs mt-4"
                >
                  New Transmission
                </button>
              </div>
            ) : (
              // Interactive Form State
              <form onSubmit={handleBookingSubmit} className="cyber-form flex-col gap-6">
                
                <div className="form-grid">
                  <div>
                    <label htmlFor="form-name" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Patient Name *</label>
                    <input 
                      id="form-name"
                      type="text" 
                      placeholder="e.g. John Doe"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Contact Email *</label>
                    <input 
                      id="form-email"
                      type="email" 
                      placeholder="e.g. jdoe@domain.com"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500' }}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label htmlFor="form-phone" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Terminal Phone *</label>
                    <input 
                      id="form-phone"
                      type="tel" 
                      placeholder="e.g. +1 (555) 019-2834"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-service" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Select Treatment Focus</label>
                    <select 
                      id="form-service"
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500' }}
                    >
                      <option value="implants">Guided Dental Implants</option>
                      <option value="crowns">Same-Day CAD/CAM Crowns</option>
                      <option value="cosmetic">3D Veneers / Smile Design</option>
                      <option value="ortho">Clear Aligners (Invisalign)</option>
                      <option value="general">Comprehensive Dental Scan</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label htmlFor="form-date" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Consultation Date</label>
                    <input 
                      id="form-date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500', colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-time" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Preferred Time slot</label>
                    <input 
                      id="form-time"
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-notes" style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Treatment notes / clinical goals</label>
                  <textarea 
                    id="form-notes"
                    rows="3" 
                    placeholder="Describe any sensitivity, tooth damage, cosmetic objectives..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    style={{ color: '#ffffff', backgroundColor: '#070b12', border: '1px solid #334155', fontSize: '16px', fontWeight: '500' }}
                  />
                </div>

                {/* 3D scan pre-booking opt-in */}
                <div className="flex-center-y gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 pointer-events-auto">
                  <input 
                    id="form-scan"
                    type="checkbox" 
                    className="w-5 h-5 cursor-pointer accent-[#00ff88]"
                    checked={bookingForm.enable3DScan}
                    onChange={(e) => setBookingForm({...bookingForm, enable3DScan: e.target.checked})}
                  />
                  <label htmlFor="form-scan" className="cursor-pointer select-none text-sm text-white font-mono m-0 uppercase tracking-wider">
                    Enable 3D Dental Pre-Scan (Bypasses general waiting list)
                  </label>
                </div>

                <button 
                  type="submit" 
                  style={{ 
                    background: '#00f2fe', 
                    color: '#000000', 
                    fontWeight: '800', 
                    fontSize: '16px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em', 
                    border: 'none', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 20px rgba(0, 242, 254, 0.35)',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '8px'
                  }}
                >
                  Transmit Booking request
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* 8. Premium Futuristic Footer */}
      <footer className="py-16 border-white/5 bg-[var(--bg-secondary)] relative">
        <div className="footer-layout container font-mono text-xs text-slate-500">
          
          <div className="flex-col gap-4">
            <span className="font-mono font-black text-sm tracking-wider text-white">
              MATRIX <span className="text-[#00f2fe] text-glow-cyan">DENTAL</span>
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              High-fidelity digital aesthetic studio fusing computational technology with biomedical grade tooth restoration sciences.
            </p>
            <div className="flex-center-y gap-2 text-[#00ff88] text-[10px] mt-2">
              <span className="pulse-dot-green"></span>
              SSL SECURED DATA LINK
            </div>
          </div>

          <div className="flex-col gap-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-widest border-b border-white/5 pb-2">LOCATION</h4>
            <div className="flex-col gap-2 font-sans text-slate-400">
              <span className="flex-row items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00f2fe] shrink-0 mt-0.5" />
                <span>Suite 404, Matrix Cyber Towers, <br />Tech District, City Center</span>
              </span>
            </div>
          </div>

          <div className="flex-col gap-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-widest border-b border-white/5 pb-2">CONTACT</h4>
            <div className="flex-col gap-2 font-sans text-slate-400">
              <a href="tel:+15559873210" className="flex-center-y gap-2 hover:text-[#00f2fe] transition-colors">
                <Phone className="w-4 h-4 text-[#00f2fe]" /> +1 (555) 987-3210
              </a>
              <a href="mailto:telemetry@matrixdental.io" className="flex-center-y gap-2 hover:text-[#00f2fe] transition-colors">
                <Mail className="w-4 h-4 text-[#00f2fe]" /> contact@matrixdental.io
              </a>
            </div>
          </div>

          <div className="flex-col gap-3">
            <h4 className="text-white text-xs uppercase font-bold tracking-widest border-b border-white/5 pb-2">HOURS // TIMELOG</h4>
            <div className="flex-col gap-2 font-sans text-slate-400">
              <div className="flex-between">
                <span>Monday - Friday</span>
                <span className="font-mono text-white text-[11px]">08:00 - 20:00</span>
              </div>
              <div className="flex-between">
                <span>Saturday</span>
                <span className="font-mono text-white text-[11px]">09:00 - 16:00</span>
              </div>
              <div className="flex-between text-slate-600">
                <span>Sunday</span>
                <span className="font-mono text-[11px]">CLOSED // OFFLINE</span>
              </div>
            </div>
          </div>

        </div>

        <div className="container border-top pt-8 mt-12 flex-between flex-wrap gap-4 text-[10px] text-slate-600 font-mono">
          <div>© {new Date().getFullYear()} Matrix Dental Studio. All rights reserved. SECURE CONNECTION STABLE.</div>
          <div className="flex-row gap-4">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <span>//</span>
            <a href="#" className="hover:text-white">TERMS OF TRANSMISSION</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
