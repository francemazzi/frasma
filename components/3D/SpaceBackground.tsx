import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { StarField } from "./StarField";

export function SpaceBackground() {
  const sunRef = useRef<THREE.Mesh>(null);
  const sunTexture = useTexture("/image/sun.jpg");

  const sunMaterial = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: new THREE.Color("#ff8a00"),
      emissiveIntensity: 1.2,
      roughness: 0.9,
      metalness: 0,
    });
    return m;
  }, [sunTexture]);

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
      sunRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <>
      <StarField />

      {/* Distant "sun" to give a reference point */}
      <mesh ref={sunRef} position={[18, 6, -35]}>
        <sphereGeometry args={[4.5, 64, 64]} />
        <primitive object={sunMaterial} attach="material" />
        <pointLight color="#ff8a00" intensity={1.2} distance={80} />
      </mesh>
    </>
  );
}


