export class OrbitSpec {
  public readonly radius: number;
  public readonly angularSpeed: number;
  public readonly phase: number;
  public readonly inclination: number;
  public readonly bobAmplitude: number;

  public constructor(params: {
    radius: number;
    angularSpeed: number;
    phase?: number;
    inclination?: number;
    bobAmplitude?: number;
  }) {
    this.radius = params.radius;
    this.angularSpeed = params.angularSpeed;
    this.phase = params.phase ?? 0;
    this.inclination = params.inclination ?? 0.12;
    this.bobAmplitude = params.bobAmplitude ?? 0.35;
  }
}


