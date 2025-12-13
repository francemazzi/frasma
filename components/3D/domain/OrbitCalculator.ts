import { OrbitSpec } from "./OrbitSpec";
import { Vec3Tuple } from "./PlanetLinkModel";

export class OrbitCalculator {
  public computePosition(
    orbit: OrbitSpec,
    timeSeconds: number,
    center: Vec3Tuple
  ): Vec3Tuple {
    const angle = timeSeconds * orbit.angularSpeed + orbit.phase;
    const x = center[0] + Math.cos(angle) * orbit.radius;
    const z = center[2] + Math.sin(angle) * orbit.radius;
    const y =
      center[1] +
      Math.sin(angle * 0.7) * orbit.bobAmplitude +
      Math.sin(angle) * orbit.inclination;

    return [x, y, z];
  }
}


