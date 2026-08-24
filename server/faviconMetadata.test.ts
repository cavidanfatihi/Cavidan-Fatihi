import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const manifest = JSON.parse(readFileSync(new URL("../client/public/site.webmanifest", import.meta.url), "utf8"));

describe("favicon metadata", () => {
  it("exposes a standard CF favicon and manifest", () => {
    expect(indexHtml).toContain('href="/favicon.ico"');
    expect(indexHtml).toContain('sizes="48x48" href="/favicon-48.png"');
    expect(indexHtml).toContain('href="/site.webmanifest"');
    expect(manifest.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: "/favicon-192.png", sizes: "192x192" }),
      expect.objectContaining({ src: "/favicon-512.png", sizes: "512x512" }),
    ]));
  });
});
