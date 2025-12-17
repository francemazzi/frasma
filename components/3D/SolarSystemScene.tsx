import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { StarField } from "./StarField";
import { PlanetLink } from "./PlanetLink";
import { OrbitingPlanetLinkModel } from "./domain/OrbitingPlanetLinkModel";
import { PlanetLinkModel, Vec3Tuple } from "./domain/PlanetLinkModel";
import { OrbitCalculator } from "./domain/OrbitCalculator";

export function SolarSystemScene(props: {
  sun: PlanetLinkModel;
  planets: OrbitingPlanetLinkModel[];
}) {
  const orbitCalculator = useMemo(() => new OrbitCalculator(), []);
  const planetGroupRefs = useRef<Array<THREE.Group | null>>([]);
  const sunCenter = useMemo(() => [0, 0, -10] as Vec3Tuple, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < props.planets.length; i++) {
      const g = planetGroupRefs.current[i];
      if (!g) continue;
      const p = props.planets[i];
      const [x, y, z] = orbitCalculator.computePosition(p.orbit, t, sunCenter);
      g.position.set(x, y, z);
    }
  });

  return (
    <>
      {/* Only stars in the background */}
      <StarField />

      {/* Sun at the center (clickable LinkedIn link) */}
      <PlanetLink model={props.sun} positionOverride={sunCenter} />
      <pointLight position={sunCenter} color="#ff8a00" intensity={1.4} distance={120} />

      {/* Orbiting planets around the sun */}
      {props.planets.map((p, i) => (
        <group
          key={p.id}
          ref={(el) => {
            planetGroupRefs.current[i] = el;
          }}
        >
          <PlanetLink model={p} positionOverride={[0, 0, 0]} />
        </group>
      ))}
    </>
  );
}


