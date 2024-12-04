import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface LinkCardProps {
  position: [number, number, number];
  emoji: string;
  link: string;
}

export function LinkCard({ position, emoji, link }: LinkCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const colors = {
    primary: "#2ec4b6",
    hover: "#ff9f1c",
    text: "#000000",
  };

  useFrame((state, delta) => {
    if (hovered && !clicked) {
      meshRef.current.rotation.y += delta * 2;
    }
  });

  const handleClick = () => {
    if (clicked) return;

    setClicked(true);
    meshRef.current.scale.set(1.2, 1.2, 1.2);

    const targetRotation = meshRef.current.rotation.y + Math.PI * 2;
    const animate = () => {
      if (meshRef.current.rotation.y < targetRotation) {
        meshRef.current.rotation.y += 0.2;
        requestAnimationFrame(animate);
      } else {
        window.open(link, "_blank");
        setClicked(false);
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.rotation.y = 0;
      }
    };
    animate();
  };

  return (
    <mesh
      position={position}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <group position={[0, 0, 0]}>
        <RoundedBox args={[2, 3, 0.2]} radius={0.2} smoothness={16}>
          <meshPhysicalMaterial
            color={hovered ? colors.hover : colors.primary}
            metalness={0.1}
            roughness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </RoundedBox>

        <Text
          position={[0, 0.5, 0.11]}
          fontSize={0.4}
          color={colors.text}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {emoji.split(" ")[1]}
        </Text>

        <Text
          position={[0, -0.3, 0.11]}
          fontSize={0.2}
          color={colors.text}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {emoji.split(" ")[0]}
        </Text>
      </group>

      <group position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <RoundedBox args={[2, 3, 0.2]} radius={0.2} smoothness={16}>
          <meshPhysicalMaterial
            color={hovered ? colors.hover : colors.primary}
            metalness={0.1}
            roughness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </RoundedBox>

        <Text
          position={[0, 0.5, 0.11]}
          fontSize={0.4}
          color={colors.text}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {emoji.split(" ")[1]}
        </Text>

        <Text
          position={[0, 0, 0.11]}
          fontSize={0.2}
          color={colors.text}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          Click to visit
        </Text>
        <Text
          position={[0, -0.3, 0.11]}
          fontSize={0.2}
          color={colors.text}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {emoji.split(" ")[0]}
        </Text>
      </group>
    </mesh>
  );
}
