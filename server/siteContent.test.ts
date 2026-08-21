import { describe, expect, it } from "vitest";
import { galleryItems, getGalleryObjectPosition, getLocalizedGalleryAlt } from "../shared/siteContent";

describe("gallery localisation", () => {
  it("keeps the supplied Azerbaijani alt text for the AZ experience", () => {
    const item = galleryItems.find(entry => entry.category === "concert");
    expect(item).toBeDefined();
    expect(getLocalizedGalleryAlt(item!, "az")).toBe(item!.alt);
  });

  it("provides a descriptive English alt text by gallery category", () => {
    const item = galleryItems.find(entry => entry.category === "backstage");
    expect(item).toBeDefined();
    expect(getLocalizedGalleryAlt(item!, "en")).toBe("Cavidan Fatihi behind the scenes");
  });

  it("uses a tailored top-weighted position for key portrait images", () => {
    const portrait = galleryItems.find(entry => entry.src.includes("IMG_8446"));
    expect(portrait).toBeDefined();
    expect(getGalleryObjectPosition(portrait!)).toBe("object-[50%_6%]");
  });

  it("keeps an upper focal point for gallery images without custom overrides", () => {
    const concert = galleryItems.find(entry => entry.src.includes("IMG_2412"));
    expect(concert).toBeDefined();
    expect(getGalleryObjectPosition(concert!)).toBe("object-top");
  });
});
