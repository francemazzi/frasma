import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LinkCard } from "../components/3D/LinkCard";
import { SpaceScene } from "../components/3D/SpaceScene";

type LinkMap = {
  [key: string]: string;
};
const linkMap: LinkMap = {
  LinkedIn: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
  Github: "https://github.com/francemazzi",
  Spotify:
    "https://open.spotify.com/playlist/0CZjfbV2kqCjtDBQTwoPzd?si=1857c09296d04f6a",
};

export default function Linktree() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
        <SpaceScene />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />

        {Object.entries(linkMap).map(([emoji, link], index) => (
          <LinkCard
            key={emoji}
            position={[index * 4 - 4, Math.sin(index) * 2, 0]}
            emoji={emoji}
            link={link}
          />
        ))}
      </Canvas>
    </div>
  );
}
