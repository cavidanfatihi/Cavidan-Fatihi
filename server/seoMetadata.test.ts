import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");

describe("SEO metadata", () => {
  it("uses the approved concise official title in every sharing surface", () => {
    expect(indexHtml).toContain("<title>Cavidan Fatihi — Rəsmi Sayt</title>");
    expect(indexHtml).toContain('property="og:title" content="Cavidan Fatihi — Rəsmi Sayt"');
    expect(indexHtml).toContain('name="twitter:title" content="Cavidan Fatihi — Rəsmi Sayt"');
    expect(indexHtml).not.toContain("Azərbaycanlı Müğənni");
  });
});
