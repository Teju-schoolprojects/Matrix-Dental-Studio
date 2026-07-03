import React from 'react';

export default function ScannerOverlay({ activePart, exploded, materialType, showWireframe }) {
  // Telemetry information based on the active part
  const getPartTelemetry = () => {
    switch (activePart) {
      case 'crown':
        return {
          title: 'Molar Crown (Porcelain/Zirconia Cap)',
          specs: [
            'Function: Mastication & Dental Aesthetics',
            'Density: 6.05 g/cm³ (High-grade Zirconia)',
            'Translucency: 35% - 45% (Natural glaze)',
            'Cementation: Resin-bonded, zero-margin fit',
            'Tolerance: < 10 Microns (CAD/CAM Milled)'
          ]
        };
      case 'abutment':
        return {
          title: 'Abutment Post (Intermediary Connector)',
          specs: [
            'Function: Multi-axis locking & crown support',
            'Material: Grade 5 Titanium (Ti-6Al-4V ELI)',
            'Anti-Rotation: Hexagonal primary lock',
            'Screw torque: 35 Ncm seating requirement',
            'Platform: Internal cone connection (11.5°)'
          ]
        };
      case 'screw':
        return {
          title: 'Endosseous Fixture (Implant Screw)',
          specs: [
            'Function: Osseointegrated bone anchor',
            'Surface: SLA Active (Sandblasted/Acid-etched)',
            'Pitch depth: 0.12mm high-stability threads',
            'Osseointegration: 98.7% success rating',
            'Diameter: 4.1mm standard surgical width'
          ]
        };
      default:
        return {
          title: 'Matrix 3D Dental Scanner v4.8',
          specs: [
            'System status: ONLINE',
            'Resolution: 0.005mm volumetric spacing',
            'Scan latency: 0.18ms dynamic tracking',
            'Grid alignment: Ortho-referenced',
            'Select any component to display telemetry'
          ]
        };
    }
  };

  const telemetry = getPartTelemetry();

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4" style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Corner Bracket styling via border lines */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>

      {/* Top HUD Row */}
      <div className="flex justify-between items-start">
        {/* Left Side: System Telemetry status */}
        <div className="hud-box glass px-4 py-2 border-cyan-500/20 text-cyan-400 text-xs flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="pulse-dot-green"></span>
            <span className="font-semibold text-white">SYS.LINK: ACTIVE</span>
          </div>
          <div>FPS: 60 / RT_SHADERS: ON</div>
          <div>AXIS: X/Y/Z REALTIME</div>
        </div>

        {/* Right Side: Configuration status */}
        <div className="hud-box glass px-4 py-2 border-cyan-500/20 text-cyan-400 text-xs flex flex-col gap-1 text-right pointer-events-auto">
          <div>MAT: <span className="text-white font-bold uppercase">{materialType}</span></div>
          <div>EXPLODE: <span className="text-white font-bold">{exploded ? 'ACTIVE' : 'INACTIVE'}</span></div>
          <div>MESH: <span className="text-white font-bold">{showWireframe ? 'WIREFRAME' : 'SOLID'}</span></div>
        </div>
      </div>

      {/* Center Reticle - purely cosmetic futuristic crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-25">
        <div className="w-16 h-16 border border-cyan-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
        </div>
        <div className="absolute w-24 h-px bg-cyan-400"></div>
        <div className="absolute h-24 w-px bg-cyan-400"></div>
      </div>

      {/* Bottom HUD Row: Selected Component Detail Box */}
      <div className="flex justify-between items-end mt-auto">
        <div className="hud-box glass px-5 py-4 border-cyan-500/20 text-cyan-400 w-full max-w-sm pointer-events-auto">
          <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2 mb-2">
            <h4 className="text-white font-bold text-sm tracking-wide">{telemetry.title}</h4>
            <span className="text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400">
              {activePart ? 'TELEMETRY' : 'STANDBY'}
            </span>
          </div>
          <ul className="list-none flex flex-col gap-1.5 text-[11px] text-slate-300">
            {telemetry.specs.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400/70 rounded-sm"></span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right side: quick control legends */}
        <div className="hud-box text-[10px] text-slate-500 flex flex-col items-end gap-0.5 pr-2 hidden md:flex">
          <div>[DRAG] Rotates model</div>
          <div>[SCROLL] Zooms viewport</div>
          <div>[CLICK PART] View clinical details</div>
        </div>
      </div>

      {/* Scanning laser beam overlay */}
      <div className="scanner-beam"></div>
    </div>
  );
}
