import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildOfferWidgetHtml } from "../src/widgetHtml.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "public"), { recursive: true });
const html = buildOfferWidgetHtml();
writeFileSync(join(root, "public", "widget-standalone.html"), html, "utf8");
writeFileSync(join(root, "public", "widget.html"), html, "utf8");
console.log("Wrote public/widget-standalone.html and public/widget.html");
