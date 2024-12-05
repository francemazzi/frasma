import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const starVertexShader = `
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  void main() {
    float r = 0.5 * length(2.0 * gl_PointCoord - 1.0);
    if (r > 1.0) {
        discard;
    }
    gl_FragColor = vec4(vColor, 1.0 - r);
  }
`;

export function SpaceScene() {
  const starsRef = useRef<THREE.Points>(null!);
  const planetsRef = useRef<THREE.Group>(null!);

  const starCount = 10000;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 1000;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 1000;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 1000;

    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, 0.7);
    starColors[i3] = color.r;
    starColors[i3 + 1] = color.g;
    starColors[i3 + 2] = color.b;
  }

  const sunTexture = useLoader(THREE.TextureLoader, "/image/sun.jpg");
  const jupiterTexture = useLoader(THREE.TextureLoader, "/image/jupiter.jpg");

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
    }
    if (planetsRef.current) {
      planetsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      {/* Campo stellare con stelle luminose */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Pianeti con texture realistiche */}
      <group ref={planetsRef}>
        {/* Stella tipo sole */}
        <mesh position={[5, 0, -20]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={sunTexture}
            emissive="#ff8a00"
            emissiveIntensity={1}
          />
          <pointLight color="#ff8a00" intensity={1} distance={50} />
        </mesh>

        {/* Pianeta tipo Giove */}
        <mesh position={[-10, 5, -30]}>
          <sphereGeometry args={[3, 64, 64]} />
          <meshStandardMaterial
            map={jupiterTexture}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      </group>
    </>
  );
}
