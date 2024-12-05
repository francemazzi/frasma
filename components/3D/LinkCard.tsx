import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

interface LinkCardProps {
  position: [number, number, number];
  emoji: string;
  link: string;
}

export function LinkCard({ position, emoji, link }: LinkCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [exploding, setExploding] = useState(false);
  const particlesRef = useRef<THREE.Points>(null!);

  const earthTexture = useLoader(THREE.TextureLoader, "image/earth.jpg");

  useFrame((state, delta) => {
    if (!exploding) {
      meshRef.current.rotation.y += delta * 0.5;
    }

    if (exploding && particlesRef.current) {
      const particles = particlesRef.current;
      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= 1.05;
        positions[i + 1] *= 1.05;
        positions[i + 2] *= 1.05;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }
  });

  const createExplosion = () => {
    const geometry = new THREE.BufferGeometry();
    const particles = 1000;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
      const r = 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  };

  const handleClick = () => {
    if (exploding) return;
    setExploding(true);

    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;

    setTimeout(() => {
      // Eventuali altre azioni post-esplosione
    }, 1500);

    setTimeout(() => {
      setExploding(false);
    }, 5000);
  };

  const createCircularText = (text: string) => {
    const segments = 12; // Numero di ripetizioni del testo
    const radius = 1.5; // Raggio dell'anello di testo
    const textElements = [];

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      textElements.push(
        <Text
          key={i}
          position={[x, 0, z]} // Y rimane a 0 per seguire l'equatore
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -angle, 0]} // Modifica la rotazione per far guardare il testo verso l'esterno
        >
          {text}
        </Text>
      );
    }
    return textElements;
  };

  return (
    <group position={position}>
      {!exploding ? (
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial
              map={earthTexture}
              metalness={0.1}
              roughness={0.7}
            />
          </Sphere>
          <group rotation={[0, 0, 0]}>{createCircularText(emoji)}</group>
        </mesh>
      ) : (
        <points ref={particlesRef}>
          <primitive object={createExplosion()} />
          <pointsMaterial
            size={0.05}
            color="#ff4d4d"
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
