import { OrbitingPlanetLinkModel } from "./OrbitingPlanetLinkModel";
import { PlanetLinkModel } from "./PlanetLinkModel";
import { OrbitSpec } from "./OrbitSpec";

export class PlanetLinkCatalog {
  public static buildSun(): PlanetLinkModel {
    return new PlanetLinkModel({
      id: "linkedin-sun",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/francesco-saverio-mazzi-1a76b4159/",
      texturePath: "/image/sun.jpg",
      position: [0, 0, -10],
      radius: 2.6,
      rotationSpeed: 0.15,
    });
  }

  public static buildDefault(): OrbitingPlanetLinkModel[] {
    return [
      // Real order (inner -> outer): Mercury, Jupiter (Earth/LinkedIn is now the Sun)
      new OrbitingPlanetLinkModel({
        id: "github",
        name: "GitHub",
        url: "https://github.com/francemazzi",
        texturePath: "/image/mercury.jpg",
        radius: 1.0,
        rotationSpeed: 0.55,
        orbit: new OrbitSpec({
          radius: 4.2,
          angularSpeed: 0.55,
          phase: 0.2,
          inclination: 0.08,
          bobAmplitude: 0.15,
        }),
      }),
      new OrbitingPlanetLinkModel({
        id: "spotify",
        name: "Spotify",
        url: "https://open.spotify.com/playlist/0CZjfbV2kqCjtDBQTwoPzd?si=1857c09296d04f6a",
        texturePath: "/image/jupiter.jpg",
        radius: 1.75,
        rotationSpeed: 0.22,
        orbit: new OrbitSpec({
          radius: 10.8,
          angularSpeed: 0.22,
          phase: 2.6,
          inclination: 0.16,
          bobAmplitude: 0.35,
        }),
      }),
    ];
  }
}


