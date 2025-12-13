import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PlanetLinkCatalog } from "../components/3D/domain/PlanetLinkCatalog";
import { SolarSystemScene } from "../components/3D/SolarSystemScene";

export default function Linktree() {
  const sun = PlanetLinkCatalog.buildSun();
  const planets = PlanetLinkCatalog.buildDefault();

  return (
    <div className="relative h-screen w-full bg-black">
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-full p-4 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between rounded-xl bg-black/40 px-4 py-3 backdrop-blur">
          <div className="text-sm font-medium">
            Esplora lo spazio: passa col mouse sui pianeti e clicca per &quot;saltare&quot;
            al link.
          </div>
          <div className="text-xs opacity-80">Zoom/drag attivi</div>
        </div>
      </div>

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 3, 18], fov: 45, near: 0.1, far: 2000 }}
      >
        <color attach="background" args={["#000000"]} />

        <SolarSystemScene sun={sun} planets={planets} />

        <ambientLight intensity={0.35} />
        <pointLight position={[8, 6, 8]} intensity={0.9} />

        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          enablePan
          enableZoom
          minDistance={10}
          maxDistance={60}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
