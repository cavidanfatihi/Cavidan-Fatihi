import { describe, expect, it } from "vitest";
import { filterGalleryItems, galleryItems } from "./siteContent";

describe("gallery content", () => {
  it("returns every supplied gallery item for the all filter", () => {
    expect(filterGalleryItems("all")).toHaveLength(galleryItems.length);
  });

  it("keeps category filters scoped to their intended image collection", () => {
    expect(filterGalleryItems("concert").every(item => item.category === "concert")).toBe(true);
    expect(filterGalleryItems("session").every(item => item.category === "session")).toBe(true);
    expect(filterGalleryItems("backstage").every(item => item.category === "backstage")).toBe(true);
  });
});
