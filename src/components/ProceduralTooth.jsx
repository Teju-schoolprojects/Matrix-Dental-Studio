import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProceduralTooth({ materialType, exploded, showWireframe, activePart }) {
  const crownGeomRef = useRef();
  const screwGeomRef = useRef();
  
  // Refs for translation in exploded view
  const crownGroupRef = useRef();
  const abutmentGroupRef = useRef();
  const screwGroupRef = useRef();
  
  // Ref for rotating the whole assembly
  const assemblyGroupRef = useRef();

  // Sculpt the molar crown procedurally
  useEffect(() => {
    const geom = crownGeomRef.current;
    if (!geom) return;

    const posAttr = geom.getAttribute('position');
    const tempPos = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      tempPos.fromBufferAttribute(posAttr, i);
      
      const x = tempPos.x;
      const y = tempPos.y;
      const z = tempPos.z;
      
      const angle = Math.atan2(z, x);
      const dist2d = Math.sqrt(x * x + z * z);
      
      let factor = 1.0;
      
      if (y > 0) {
        factor += 0.2 * y * (1.0 + Math.cos(4 * angle));
        factor -= 0.12 * Math.pow(y, 2) * Math.max(0, 1.0 - dist2d * 1.5);
      } else {
        factor += 0.25 * y;
      }
      
      let newX = x * factor * 1.15;
      let newY = y * factor;
      let newZ = z * factor * 1.05;
      
      if (newY < -0.45) {
        newY = -0.45;
      }
      
      posAttr.setXYZ(i, newX, newY, newZ);
    }
    
    geom.computeVertexNormals();
    posAttr.needsUpdate = true;
  }, []);

  // Sculpt the titanium screw threads procedurally
  useEffect(() => {
    const geom = screwGeomRef.current;
    if (!geom) return;

    const posAttr = geom.getAttribute('position');
    const tempPos = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      tempPos.fromBufferAttribute(posAttr, i);
      
      const x = tempPos.x;
      const y = tempPos.y;
      const z = tempPos.z;
      
      const angle = Math.atan2(z, x);
      
      let baseRadius = 0.42;
      if (y < -0.4) {
        const taperT = (y + 0.4) / -0.6;
        baseRadius = 0.42 * (1.0 - taperT * 0.7);
      }
      
      const threadFreq = 22.0;
      const threadDepth = y < -0.9 ? 0.01 : 0.06;
      const radius = baseRadius + threadDepth * Math.sin(y * threadFreq + angle);
      
      const newX = Math.cos(angle) * radius;
      const newZ = Math.sin(angle) * radius;
      
      posAttr.setXYZ(i, newX, y, newZ);
    }

    geom.computeVertexNormals();
    posAttr.needsUpdate = true;
  }, []);

  // Interpolate positions & rotate the assembly
  useFrame((state, delta) => {
    // Target Y positions for each component in exploded vs collapsed state
    const targetCrownY = exploded ? 2.5 : 0.75;
    const targetAbutmentY = exploded ? 0.8 : 0.05;
    const targetScrewY = exploded ? -1.2 : -0.95;

    // Rotate the assembly group slowly over time
    if (assemblyGroupRef.current) {
      assemblyGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }

    // Smooth damp/lerp translations
    if (crownGroupRef.current) {
      crownGroupRef.current.position.y = THREE.MathUtils.lerp(
        crownGroupRef.current.position.y,
        targetCrownY,
        10 * delta
      );
    }
    if (abutmentGroupRef.current) {
      abutmentGroupRef.current.position.y = THREE.MathUtils.lerp(
        abutmentGroupRef.current.position.y,
        targetAbutmentY,
        10 * delta
      );
    }
    if (screwGroupRef.current) {
      screwGroupRef.current.position.y = THREE.MathUtils.lerp(
        screwGroupRef.current.position.y,
        targetScrewY,
        10 * delta
      );
    }
  });

  // Materials configuration
  const getMaterials = (partName) => {
    const isHighlighted = activePart === partName;
    const wireframe = showWireframe;
    
    if (materialType === 'porcelain') {
      if (partName === 'crown') {
        return {
          color: isHighlighted ? '#a3f3ff' : '#f8fafc',
          roughness: 0.15,
          metalness: 0.05,
          transmission: 0.35,
          thickness: 0.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          wireframe
        };
      }
      return {
        color: isHighlighted ? '#00f2fe' : '#94a3b8',
        roughness: 0.3,
        metalness: 0.95,
        wireframe
      };
    }

    if (materialType === 'gold') {
      return {
        color: isHighlighted ? '#fff277' : '#ffd700',
        roughness: 0.18,
        metalness: 0.95,
        clearcoat: 0.5,
        wireframe
      };
    }

    if (materialType === 'titanium') {
      return {
        color: isHighlighted ? '#8ef5ff' : '#64748b',
        roughness: 0.4,
        metalness: 0.9,
        wireframe
      };
    }

    if (materialType === 'matrix') {
      return {
        color: isHighlighted ? '#00ff88' : '#00f2fe',
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
        emissive: isHighlighted ? '#00ff88' : '#00f2fe',
        emissiveIntensity: 1.2
      };
    }
    
    return {};
  };

  return (
    <group ref={assemblyGroupRef} rotation={[0.15, 0, 0]}>
      {/* 1. Crown (Top Molar Tooth) */}
      <group ref={crownGroupRef} position={[0, 0.75, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry ref={crownGeomRef} args={[0.78, 64, 64]} />
          {materialType === 'matrix' ? (
            <meshStandardMaterial {...getMaterials('crown')} />
          ) : (
            <meshPhysicalMaterial {...getMaterials('crown')} />
          )}
        </mesh>
        
        {activePart === 'crown' && (
          <mesh scale={1.05}>
            <sphereGeometry args={[0.78, 32, 32]} />
            <meshBasicMaterial color="#00f2fe" transparent opacity={0.15} wireframe />
          </mesh>
        )}
      </group>

      {/* 2. Abutment (Middle Connector) */}
      <group ref={abutmentGroupRef} position={[0, 0.05, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.62, 0.52, 0.15, 32]} />
          <meshStandardMaterial {...getMaterials('abutment')} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.52, 0.42, 0.35, 32]} />
          <meshStandardMaterial {...getMaterials('abutment')} />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.15, 6]} />
          <meshStandardMaterial {...getMaterials('abutment')} />
        </mesh>

        {activePart === 'abutment' && (
          <mesh scale={1.1} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.52, 0.42, 0.6, 16]} />
            <meshBasicMaterial color="#00f2fe" transparent opacity={0.15} wireframe />
          </mesh>
        )}
      </group>

      {/* 3. Implant Screw (Base Fixture) */}
      <group ref={screwGroupRef} position={[0, -0.95, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry ref={screwGeomRef} args={[0.42, 0.42, 1.8, 64, 128]} />
          <meshStandardMaterial {...getMaterials('screw')} />
        </mesh>

        {activePart === 'screw' && (
          <mesh scale={1.1}>
            <cylinderGeometry args={[0.45, 0.2, 1.8, 16, 16]} />
            <meshBasicMaterial color="#00f2fe" transparent opacity={0.15} wireframe />
          </mesh>
        )}
      </group>
    </group>
  );
}
