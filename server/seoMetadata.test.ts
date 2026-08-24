import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");

describe("SEO metadata", () => {
  it("uses the approved concise official title in every sharing surface", () => {
    expect(indexHtml).toContain("<title>Cavidan Fatihi — Official Website</title>");
    expect(indexHtml).toContain('property="og:title" content="Cavidan Fatihi — Official Website"');
    expect(indexHtml).toContain('name="twitter:title" content="Cavidan Fatihi — Official Website"');
    expect(indexHtml).not.toContain("Azərbaycanlı Müğənni");
  });
});
