import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

type SceneProps = {
  reducedMotion: boolean;
};

type Vec3 = [number, number, number];

const treePositions: Vec3[] = [
  [-7.2, 0.25, -3.4],
  [-6.4, 0.25, 1.2],
  [-4.9, 0.25, 3.6],
  [5.9, 0.25, -3.2],
  [7.1, 0.25, 0.8],
  [3.8, 0.25, 4.4],
  [-2.5, 0.25, -5.1],
  [1.5, 0.25, 5.5],
];

const markerPositions: Vec3[] = [
  [-3.8, 0.5, -1.8],
  [3.5, 0.5, -2.3],
  [0.3, 0.5, 3.5],
];

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => onStoreChange();

      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function LowPolyTree({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.13, 0.2, 0.9, 6]} />
        <meshStandardMaterial color="#6d3e24" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.15, 0]}>
        <coneGeometry args={[0.72, 1.35, 6]} />
        <meshStandardMaterial color="#285c3b" roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.72, 0]}>
        <coneGeometry args={[0.48, 0.96, 6]} />
        <meshStandardMaterial color="#4f7c43" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

function TotemMarker({ position, color }: { position: Vec3; color: string }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.1, 5]} />
        <meshStandardMaterial color="#4b3021" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.72, 0.52, 0.14]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.27, 0.08]}>
        <boxGeometry args={[0.48, 0.08, 0.03]} />
        <meshStandardMaterial color="#fff1c2" emissive="#fff1c2" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function StudioOutpost() {
  return (
    <group position={[0, 0.38, -0.35]}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2.6, 1, 2.1]} />
        <meshStandardMaterial color="#c6854a" roughness={0.82} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.05, 1.15, 4]} />
        <meshStandardMaterial color="#6f2d20" roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, 0.4, 1.08]}>
        <boxGeometry args={[0.65, 0.72, 0.08]} />
        <meshStandardMaterial color="#18251f" roughness={0.5} />
      </mesh>
      <mesh position={[-0.72, 0.68, 1.09]}>
        <boxGeometry args={[0.42, 0.3, 0.06]} />
        <meshStandardMaterial color="#83d7cc" emissive="#4bb1a7" emissiveIntensity={0.22} />
      </mesh>
      <mesh position={[0.72, 0.68, 1.09]}>
        <boxGeometry args={[0.42, 0.3, 0.06]} />
        <meshStandardMaterial color="#ffd166" emissive="#ff9f1c" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function Beacon({ reducedMotion }: SceneProps) {
  const beaconRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;

    const pulse = 0.65 + Math.sin(clock.elapsedTime * 2.5) * 0.25;
    if (beaconRef.current) {
      beaconRef.current.scale.setScalar(1 + pulse * 0.08);
      const material = beaconRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.35 + pulse * 0.45;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0.55 + pulse * 0.55;
    }
  });

  return (
    <group position={[0, 0.85, -0.35]}>
      <mesh castShadow position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 1.8, 6]} />
        <meshStandardMaterial color="#2d2b23" roughness={0.75} />
      </mesh>
      <mesh ref={beaconRef} position={[0, 2.35, 0]}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#8ee6d8"
          emissive="#33d6c7"
          emissiveIntensity={0.72}
          roughness={0.38}
        />
      </mesh>
      <pointLight ref={lightRef} color="#65f0df" distance={16} intensity={0.8} />
    </group>
  );
}

function PathStones() {
  const stones = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const t = index / 17;
        return {
          position: [
            -4.4 + t * 8.8,
            0.52,
            2.75 - Math.sin(t * Math.PI) * 2.7,
          ] as Vec3,
          rotation: [0, t * Math.PI * 2, 0] as Vec3,
          scale: 0.52 + (index % 3) * 0.07,
        };
      }),
    []
  );

  return (
    <group>
      {stones.map((stone, index) => (
        <mesh
          key={index}
          receiveShadow
          position={stone.position}
          rotation={stone.rotation}
          scale={stone.scale}
        >
          <boxGeometry args={[0.82, 0.08, 0.48]} />
          <meshStandardMaterial color="#d9bd7a" roughness={0.95} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingSignals({ reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3].map((index) => {
        const angle = (index / 4) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 3.6, 2.6 + index * 0.12, Math.sin(angle) * 3.6]}
          >
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ffd166" : "#6ee7d8"}
              emissive={index % 2 === 0 ? "#c47a22" : "#2dd4bf"}
              emissiveIntensity={0.52}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TribalStudioScene({ reducedMotion }: SceneProps) {
  const islandRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (waterRef.current && !reducedMotion) {
      waterRef.current.rotation.z += delta * 0.035;
    }
    if (islandRef.current && !reducedMotion) {
      islandRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <>
      <color attach="background" args={["#9ecfc8"]} />
      <fog attach="fog" args={["#cfe8dd", 22, 58]} />

      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#e9ffef", "#6a452f", 1.25]} />
      <directionalLight
        castShadow
        position={[7, 9, 5]}
        intensity={1.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <mesh ref={waterRef} receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[16, 14]} />
        <meshStandardMaterial
          color="#3c8f98"
          emissive="#174d57"
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      <group ref={islandRef}>
        <mesh castShadow receiveShadow position={[0, 0.12, 0]} rotation={[0, Math.PI / 14, 0]}>
          <cylinderGeometry args={[7.9, 6.8, 0.75, 12]} />
          <meshStandardMaterial color="#7f9b4d" roughness={0.94} flatShading />
        </mesh>
        <mesh receiveShadow position={[0.2, 0.51, 0.25]} rotation={[0, -Math.PI / 7, 0]}>
          <cylinderGeometry args={[5.4, 5.05, 0.14, 10]} />
          <meshStandardMaterial color="#a9b962" roughness={0.92} flatShading />
        </mesh>
        <mesh receiveShadow position={[-1.4, 0.61, 1.6]} rotation={[0, Math.PI / 5, 0]}>
          <cylinderGeometry args={[2.35, 2.1, 0.12, 8]} />
          <meshStandardMaterial color="#d2b26d" roughness={0.96} flatShading />
        </mesh>

        <PathStones />
        <StudioOutpost />
        <Beacon reducedMotion={reducedMotion} />
        <OrbitingSignals reducedMotion={reducedMotion} />

        {treePositions.map((position, index) => (
          <LowPolyTree key={index} position={position} scale={0.82 + (index % 3) * 0.1} />
        ))}

        {markerPositions.map((position, index) => (
          <TotemMarker
            key={index}
            position={position}
            color={["#a8412b", "#2f6971", "#d8a13f"][index]}
          />
        ))}
      </group>
    </>
  );
}

export function TribalStudioCanvas() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Base operativa 3D low-poly di Frasma Studio su un'isola digitale."
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [8.5, 6.2, 10.5], fov: 38, near: 0.1, far: 100 }}
      >
        <TribalStudioScene reducedMotion={reducedMotion} />
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          enableZoom={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 4.2}
          maxPolarAngle={Math.PI / 2.25}
          target={[0, 0.9, 0]}
        />
      </Canvas>
      <noscript>
        <div className="flex h-full items-center justify-center bg-[#0f241d] px-6 text-center text-sm text-[#fbf6e5]">
          Frasma Studio: base operativa per software su misura, AI agent e
          automazioni.
        </div>
      </noscript>
    </div>
  );
}

export default TribalStudioCanvas;
