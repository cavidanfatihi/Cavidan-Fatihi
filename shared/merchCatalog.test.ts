import { describe, expect, it } from "vitest";
import { getLocalizedMerch, localizedMerchByHandle } from "./merchCatalog";

const EXPECTED_EN_TITLES = [
  "Xatirə - Limited Edition Vinyl",
  "FATİHİ - Tote Bag",
  "CavidanFatihi - Keyrings",
  "FATİHİ - Cup",
  "FATİHİ - Pullover Hoodie",
  "CF - Hat",
];

describe("localized merch catalog", () => {
  it("provides Azerbaijani and English copy for each approved product", () => {
    expect(Object.keys(localizedMerchByHandle)).toHaveLength(6);

    for (const entry of Object.values(localizedMerchByHandle)) {
      expect(entry.az.title).not.toHaveLength(0);
      expect(entry.az.description).not.toHaveLength(0);
      expect(entry.en.title).not.toHaveLength(0);
      expect(entry.en.description).not.toHaveLength(0);
    }
  });

  it("keeps the English storefront titles aligned with the approved catalog", () => {
    expect(Object.values(localizedMerchByHandle).map(entry => entry.en.title)).toEqual(expect.arrayContaining(EXPECTED_EN_TITLES));
  });

  it("uses the Shopify title only as a safe fallback for unknown handles", () => {
    expect(getLocalizedMerch("unknown-product", "az", "Unknown product")).toEqual({ title: "Unknown product", description: "" });
  });
});
