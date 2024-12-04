import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const geometries = [
  new THREE.BoxGeometry(0.5, 0.5, 1),
  new THREE.ConeGeometry(0.3, 1, 8),
  new THREE.CylinderGeometry(0.3, 0.3, 1, 8),
  new THREE.TetrahedronGeometry(0.5),
];

const colors = ["#ff6347", "#4682b4", "#32cd32", "#ffd700"];

export function StarshipField() {
  const shipsRef = useRef<THREE.Group>(null!);

  const shipCount = 100;
  const positions = new Float32Array(shipCount * 3);

  for (let i = 0; i < shipCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = (Math.random() - 0.5) * 100;
    positions[i3 + 2] = (Math.random() - 0.5) * 100;
  }

  useFrame((state, delta) => {
    if (shipsRef.current) {
      shipsRef.current.children.forEach((ship, index) => {
        ship.position.z += delta * 10;
        if (ship.position.z > 50) {
          ship.position.z = -50;
        }
      });
    }
  });

  return (
    <group ref={shipsRef}>
      {Array.from({ length: shipCount }).map((_, i) => {
        const geometry = geometries[i % geometries.length];
        const color = colors[i % colors.length];
        return (
          <mesh
            key={i}
            geometry={geometry}
            position={[
              positions[i * 3],
              positions[i * 3 + 1],
              positions[i * 3 + 2],
            ]}
          >
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}
