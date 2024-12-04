import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const starVertexShader = `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
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

export function StarField() {
  const starsRef = useRef<THREE.Points>(null!);

  const starCount = 5000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    // Posizione casuale in un cubo
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = (Math.random() - 0.5) * 100;
    positions[i3 + 2] = (Math.random() - 0.5) * 100;

    // Colori con tendenza al blu/viola per effetto iperspazio
    colors[i3] = 0.6 + Math.random() * 0.4;
    colors[i3 + 1] = 0.6 + Math.random() * 0.4;
    colors[i3 + 2] = 1;

    // Dimensione casuale delle stelle
    sizes[i] = Math.random() * 2;
  }

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Movimento delle stelle
      const positions = starsRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += delta * 20; // Velocità del movimento
        if (positions[i + 2] > 50) {
          positions[i + 2] = -50;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        vertexColors
        transparent
        depthWrite={false}
      />
    </points>
  );
}
