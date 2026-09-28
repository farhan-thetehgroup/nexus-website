/* eslint-disable no-undef */
/**
 * Generates the dot-matrix world map used by the Nexus 2027 aurora study.
 *
 * Usage:
 *   curl -sL -o /tmp/countries.geo.json \
 *     https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json
 *   node scripts/generate-dot-map.mjs /tmp/countries.geo.json
 *
 * Output: src/labs/nexus-2027/data/dotMap.json
 * Each dot is [gridX, gridY, region] where region is
 *   0 = rest of world, 1 = Asia-Pacific, 2 = Indonesia.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const input = resolve(
  process.argv[2] ?? resolve(root, "tmp/countries.geo.json")
);
const output = resolve(root, "src/labs/nexus-2027/data/dotMap.json");

// Grid + projection window (equirectangular, Antarctica trimmed away).
const COLS = 200;
const LAT_TOP = 72;
const LAT_BOTTOM = -50;
const ROWS = Math.round((COLS * (LAT_TOP - LAT_BOTTOM)) / 360);

// Bounding boxes for the focus regions, [minLon, minLat, maxLon, maxLat].
const INDONESIA = [94, -12, 142, 8];
const APAC = [60, -25, 180, 46];

const inBox = ([lon, lat], [minLon, minLat, maxLon, maxLat]) =>
  lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;

const pointInRing = ([x, y], ring) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const crosses =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
};

const pointInPolygon = (point, polygon) => {
  if (!pointInRing(point, polygon[0])) return false;
  for (let i = 1; i < polygon.length; i++) {
    if (pointInRing(point, polygon[i])) return false; // hole
  }
  return true;
};

const geometryToPolygons = (geometry) => {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  if (geometry.type === "GeometryCollection") {
    return geometry.geometries.flatMap(geometryToPolygons);
  }
  return [];
};

const bboxOf = (polygon) => {
  let minLon = 180;
  let minLat = 90;
  let maxLon = -180;
  let maxLat = -90;
  for (const [lon, lat] of polygon[0]) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLon, minLat, maxLon, maxLat];
};

const data = JSON.parse(readFileSync(input, "utf8"));
const shapes = data.features
  .flatMap((feature) => geometryToPolygons(feature.geometry))
  .map((polygon) => ({ polygon, bbox: bboxOf(polygon) }));

console.log(`Loaded ${shapes.length} polygons from ${input}`);

const dots = [];
for (let iy = 0; iy < ROWS; iy++) {
  const lat = LAT_TOP - ((iy + 0.5) * (LAT_TOP - LAT_BOTTOM)) / ROWS;
  for (let ix = 0; ix < COLS; ix++) {
    const lon = -180 + ((ix + 0.5) * 360) / COLS;
    const point = [lon, lat];

    let onLand = false;
    for (const { polygon, bbox } of shapes) {
      if (!inBox(point, bbox)) continue;
      if (pointInPolygon(point, polygon)) {
        onLand = true;
        break;
      }
    }
    if (!onLand) continue;

    const region = inBox(point, INDONESIA) ? 2 : inBox(point, APAC) ? 1 : 0;
    dots.push([ix, iy, region]);
  }
}

const payload = {
  cols: COLS,
  rows: ROWS,
  latTop: LAT_TOP,
  latBottom: LAT_BOTTOM,
  count: dots.length,
  dots,
};

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(payload));

const counts = dots.reduce(
  (acc, [, , region]) => ((acc[region] = (acc[region] ?? 0) + 1), acc),
  {}
);
console.log(
  `Wrote ${dots.length} dots (${COLS}x${ROWS} grid) -> ${output}`,
  counts
);
