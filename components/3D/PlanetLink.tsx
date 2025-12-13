import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PlanetLinkModel } from "./domain/PlanetLinkModel";
import { ExplosionParticleField } from "./domain/ExplosionParticleField";
import { PlanetLinkController, PlanetLinkPhase } from "./domain/PlanetLinkController";

interface PlanetLinkProps {
  model: PlanetLinkModel;
  positionOverride?: [number, number, number];
}

export function PlanetLink({ model, positionOverride }: PlanetLinkProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const controller = useMemo(() => new PlanetLinkController(), []);
  const particles = useMemo(() => new ExplosionParticleField({ originRadius: model.radius }), [model.radius]);

  const [phase, setPhase] = useState<PlanetLinkPhase>("idle");
  const phaseRef = useRef<PlanetLinkPhase>("idle");
  const [hovered, setHovered] = useState(false);

  const texture = useTexture(model.texturePath);

  useEffect(() => {
    return () => controller.dispose();
  }, [controller]);

  useFrame((_, delta) => {
    controller.update(delta);

    const nextPhase = controller.getPhase();
    if (nextPhase !== phaseRef.current) {
      phaseRef.current = nextPhase;
      setPhase(nextPhase);
      if (nextPhase === "exploding") particles.reset();
    }

    if (meshRef.current && nextPhase === "idle") {
      meshRef.current.rotation.y += delta * model.rotationSpeed;
      meshRef.current.rotation.x += delta * (model.rotationSpeed * 0.25);
    }

    if (pointsRef.current && nextPhase !== "idle") {
      particles.update(delta);
      const attr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }
  });

  const handleClick = () => {
    if (phaseRef.current !== "idle") return;
    const started = controller.start(model.url);
    if (!started) return;
    phaseRef.current = "exploding";
    setPhase("exploding");
    particles.reset();
  };

  const explosionProgress = controller.getExplosionProgress01();
  const planetVisible = phase === "idle";
  const particlesVisible = phase !== "idle";

  return (
    <group position={positionOverride ?? model.position}>
      {planetVisible && (
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <sphereGeometry args={[model.radius, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            metalness={model.id === "linkedin-sun" ? 0 : 0.15}
            roughness={model.id === "linkedin-sun" ? 0.85 : 0.85}
            emissive={
              model.id === "linkedin-sun"
                ? new THREE.Color("#ff8a00")
                : hovered
                ? new THREE.Color("#2a6bff")
                : new THREE.Color("#000000")
            }
            emissiveIntensity={model.id === "linkedin-sun" ? 1.3 : hovered ? 0.25 : 0}
          />

          {hovered && (
            <Billboard position={[0, model.radius + 0.85, 0]}>
              <Text
                fontSize={0.28}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
              >
                {model.name}
              </Text>
            </Billboard>
          )}
        </mesh>
      )}

      {particlesVisible && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particles.getPositions(), 3]}
              count={particles.getParticleCount()}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.06}
            color="#ffcc66"
            transparent
            opacity={1 - explosionProgress}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}


