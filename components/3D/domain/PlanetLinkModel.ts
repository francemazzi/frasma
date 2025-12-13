export type Vec3Tuple = [number, number, number];

export class PlanetLinkModel {
  public readonly id: string;
  public readonly name: string;
  public readonly url: string;
  public readonly texturePath: string;
  public readonly position: Vec3Tuple;
  public readonly radius: number;
  public readonly rotationSpeed: number;

  public constructor(params: {
    id: string;
    name: string;
    url: string;
    texturePath: string;
    position: Vec3Tuple;
    radius?: number;
    rotationSpeed?: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.url = params.url;
    this.texturePath = params.texturePath;
    this.position = params.position;
    this.radius = params.radius ?? 1.25;
    this.rotationSpeed = params.rotationSpeed ?? 0.35;
  }
}
