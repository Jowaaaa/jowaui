import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(".");
const serverEntry = resolve(root, "build/server/index.js");
const clientOutput = resolve(root, "build/client");
const serverCli = resolve(root, "node_modules/@react-router/serve/dist/cli.js");
const port = 4173;
const basePath = "/example";
const routes = ["/", "/forms", "/data", "/interactions", "/content"];

const server = spawn(process.execPath, [serverCli, serverEntry], {
  env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
  stdio: "ignore",
});

const stopServer = () => server.kill();
process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${basePath}/`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // The server may need another moment to start.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }

  if (!ready) {
    throw new Error("The example server did not start in time.");
  }

  for (const route of routes) {
    const response = await fetch(`http://127.0.0.1:${port}${basePath}${route}`);
    if (!response.ok) {
      throw new Error(`Could not prerender ${route}: HTTP ${response.status}`);
    }

    const outputDirectory = resolve(clientOutput, route.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(resolve(outputDirectory, "index.html"), await response.text());
  }
} finally {
  stopServer();
}
