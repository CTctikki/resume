import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const rootDir = process.cwd();
const outputDir = resolve(rootDir, ".vercel/output");
const configPath = join(outputDir, "config.json");
const functionsDir = join(outputDir, "functions");

if (!existsSync(configPath)) {
  console.error(`Missing Vercel output config: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf8"));
const routeCount = Array.isArray(config.routes) ? config.routes.length : 0;

if (!existsSync(functionsDir)) {
  console.error(
    `Expected server functions in ${functionsDir}, but the directory does not exist.\n` +
      `Current config only contains ${routeCount} route(s): ${JSON.stringify(config.routes, null, 2)}`
  );
  process.exit(1);
}

const functionEntries = readdirSync(functionsDir, { withFileTypes: true }).filter((entry) =>
  entry.isDirectory()
);

if (functionEntries.length === 0) {
  console.error(
    `Expected at least one Vercel function in ${functionsDir}, but none were generated.\n` +
      `Current config only contains ${routeCount} route(s): ${JSON.stringify(config.routes, null, 2)}`
  );
  process.exit(1);
}

console.log(
  `Detected ${functionEntries.length} Vercel function(s): ${functionEntries
    .map((entry) => entry.name)
    .join(", ")}`
);
