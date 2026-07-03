import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import ProceduralTooth from './ProceduralTooth';

export default function DentalScene({ materialType, exploded, showWireframe, activePart, showGrid = true }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Futuristic Cyber Lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Main key light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Cool cyber purple rim light */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={1.2}
          color="#9d4edd"
        />

        {/* Cyber cyan fill light from bottom */}
        <directionalLight
          position={[3, -5, 3]}
          intensity={0.8}
          color="#00f2fe"
        />

        {/* Soft point light for center glow */}
        <pointLight position={[0, 0, 0]} intensity={0.4} color="#00f2fe" />

        <Suspense fallback={null}>
          <Center>
            <ProceduralTooth
              materialType={materialType}
              exploded={exploded}
              showWireframe={showWireframe}
              activePart={activePart}
            />
          </Center>

          {/* Cyber Floor Grid */}
          {showGrid && (
            <group position={[0, -2.1, 0]}>
              <gridHelper 
                args={[20, 20, '#00ff88', 'rgba(0, 242, 254, 0.15)']} 
                position={[0, 0, 0]}
              />
            </group>
          )}
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={7.0}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
