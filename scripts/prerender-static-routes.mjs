import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const outputDirectory = new URL("../dist/public/", import.meta.url);
const siteUrl = "https://www.cavidanfatihi.com";
const pages = {
  "/": { title: "Cavidan Fatihi — Official Website", description: "Cavidan Fatihi — Azərbaycanlı müğənni, musiqiçi və gitara ifaçısı. Canlı musiqi, retro mahnılar, konsertlər, toy, ad günü və korporativ tədbirlər üçün əməkdaşlıq." },
  "/about": { title: "Cavidan Fatihi haqqında | Bioqrafiya", description: "Cavidan Fatihinin bioqrafiyası, musiqi yolunun başlanğıcı və yaradıcılıq hekayəsi." },
  "/concerts": { title: "Cavidan Fatihi konsertləri | Canlı çıxışlar", description: "Cavidan Fatihinin canlı çıxışları, konsert görüntüləri, retro musiqilər və gitara ifalı səhnə anları." },
  "/music": { title: "Cavidan Fatihi musiqiləri | Rəsmi platformalar", description: "Cavidan Fatihinin rəsmi musiqilərini Spotify, Apple Music, Deezer və YouTube-da dinləyin." },
  "/media": { title: "Cavidan Fatihi media | Foto və videolar", description: "Cavidan Fatihinin konsert, səhnəarxası və fotosessiya görüntülərindən seçilmiş media arxivi." },
  "/shop": { title: "Cavidan Fatihi məhsulları | Rəsmi kataloq", description: "Cavidan Fatihinin rəsmi məhsul kataloqu: vinil, hoodie, kepka, fincan, çanta və açarlıqlar." },
  "/contact": { title: "Cavidan Fatihi ilə əlaqə | Əməkdaşlıq", description: "Toy, nişan, ad günü, korporativ tədbir, konsert və canlı musiqi üçün Cavidan Fatihi ilə əlaqə saxlayın." },
};

function replaceMeta(html, attribute, key, value) {
  const expression = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*/?>)`, "i");
  return html.replace(expression, `$1${value}$2`);
}

function routeDocument(baseHtml, path, metadata) {
  const canonicalUrl = `${siteUrl}${path}`;
  const routeSchema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, description: metadata.description, url: canonicalUrl, inLanguage: "az", isPartOf: { "@type": "WebSite", name: "Cavidan Fatihi", url: `${siteUrl}/` }, about: { "@type": "Person", name: "Cavidan Fatihi", url: `${siteUrl}/` } });
  let html = baseHtml.replace(/<title>[^<]*<\/title>/i, `<title>${metadata.title}</title>`);
  html = replaceMeta(html, "name", "description", metadata.description);
  html = replaceMeta(html, "property", "og:title", metadata.title);
  html = replaceMeta(html, "property", "og:description", metadata.description);
  html = replaceMeta(html, "property", "og:url", canonicalUrl);
  html = replaceMeta(html, "name", "twitter:title", metadata.title);
  html = replaceMeta(html, "name", "twitter:description", metadata.description);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  return html.replace("</head>", `    <script type="application/ld+json" data-cavidan-static-route="true">${routeSchema}</script>\n  </head>`);
}

const baseHtml = await readFile(new URL("index.html", outputDirectory), "utf8");
for (const [path, metadata] of Object.entries(pages)) {
  const target = path === "/" ? "index.html" : join(path.slice(1), "index.html");
  const outputPath = new URL(target, outputDirectory);
  await mkdir(dirname(outputPath.pathname), { recursive: true });
  await writeFile(outputPath, routeDocument(baseHtml, path, metadata));
}

console.log(`Generated static SEO metadata for ${Object.keys(pages).length} routes.`);
