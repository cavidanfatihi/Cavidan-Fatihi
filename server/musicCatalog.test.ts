import { describe, expect, it } from "vitest";
import { musicPlatforms, officialYouTubeReleases } from "../shared/musicCatalog";

describe("official music catalogue", () => {
  it("lists every catalogued official YouTube release with a direct video identity", () => {
    expect(officialYouTubeReleases).toHaveLength(34);
    expect(officialYouTubeReleases.every(release => release.id.length > 0 && release.title.length > 0)).toBe(true);
  });

  it("includes Spotify, Apple Music, Deezer and YouTube artist destinations", () => {
    expect(musicPlatforms.map(platform => platform.id)).toEqual(["spotify", "appleMusic", "deezer", "youtube"]);
    expect(musicPlatforms.every(platform => platform.href.startsWith("https://"))).toBe(true);
  });
});
