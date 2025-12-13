import { OrbitSpec } from "./OrbitSpec";
import { PlanetLinkModel, Vec3Tuple } from "./PlanetLinkModel";

export class OrbitingPlanetLinkModel extends PlanetLinkModel {
  public readonly orbit: OrbitSpec;

  public constructor(params: {
    id: string;
    name: string;
    url: string;
    texturePath: string;
    orbit: OrbitSpec;
    radius?: number;
    rotationSpeed?: number;
  }) {
    super({
      id: params.id,
      name: params.name,
      url: params.url,
      texturePath: params.texturePath,
      position: [0, 0, 0] as Vec3Tuple,
      radius: params.radius,
      rotationSpeed: params.rotationSpeed,
    });
    this.orbit = params.orbit;
  }
}


