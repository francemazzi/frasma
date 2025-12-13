import * as THREE from "three";

export class ExplosionParticleField {
  private readonly particleCount: number;
  private readonly originRadius: number;
  private readonly speedMin: number;
  private readonly speedMax: number;

  private readonly positions: Float32Array;
  private readonly velocities: Float32Array;

  public constructor(params?: {
    particleCount?: number;
    originRadius?: number;
    speedMin?: number;
    speedMax?: number;
  }) {
    this.particleCount = params?.particleCount ?? 1200;
    this.originRadius = params?.originRadius ?? 1.0;
    this.speedMin = params?.speedMin ?? 2.0;
    this.speedMax = params?.speedMax ?? 8.0;

    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    this.reset();
  }

  public reset(): void {
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      const r = this.originRadius * (0.4 + Math.random() * 0.6);

      this.positions[i3] = dir.x * r;
      this.positions[i3 + 1] = dir.y * r;
      this.positions[i3 + 2] = dir.z * r;

      const speed = this.speedMin + Math.random() * (this.speedMax - this.speedMin);
      this.velocities[i3] = dir.x * speed;
      this.velocities[i3 + 1] = dir.y * speed;
      this.velocities[i3 + 2] = dir.z * speed;
    }
  }

  public update(deltaSeconds: number): void {
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      this.positions[i3] += this.velocities[i3] * deltaSeconds;
      this.positions[i3 + 1] += this.velocities[i3 + 1] * deltaSeconds;
      this.positions[i3 + 2] += this.velocities[i3 + 2] * deltaSeconds;
    }
  }

  public getPositions(): Float32Array {
    return this.positions;
  }

  public getParticleCount(): number {
    return this.particleCount;
  }
}


