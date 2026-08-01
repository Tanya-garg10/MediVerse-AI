import { createServer } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || "3000";
const HOST = "0.0.0.0";
const clientDir = join(__dirname, "dist", "client");

const MIME_TYPES = {
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".webmanifest": "application/manifest+json",
};

console.log(`Starting MediVerse AI on ${HOST}:${PORT}...`);

const { default: handler } = await import("./dist/server/server.js");

const server = createServer(async (req, res) => {
    try {
        const url = req.url || "/";

        // Serve static files from dist/client
        const staticFiles = ["/favicon.ico", "/favicon.svg", "/manifest.webmanifest", "/robots.txt"];
        if (url.startsWith("/assets/") || staticFiles.includes(url)) {
            const filePath = join(clientDir, url);
            if (existsSync(filePath) && statSync(filePath).isFile()) {
                const ext = extname(filePath);
                const mime = MIME_TYPES[ext] || "application/octet-stream";
                res.setHeader("Content-Type", mime);
                res.setHeader("Cache-Control", url.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=3600");
                createReadStream(filePath).pipe(res);
                return;
            }
        }

        // All other requests go to SSR handler
        const protocol = "https";
        const host = req.headers.host || `localhost:${PORT}`;
        const fullUrl = `${protocol}://${host}${url}`;

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

        const request = new Request(fullUrl, {
            method: req.method,
            headers: req.headers,
            body: body && body.length > 0 ? body : undefined,
            duplex: "half",
        });

        const response = await handler.fetch(request, {}, {});

        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));

        const buffer = await response.arrayBuffer();
        res.end(Buffer.from(buffer));
    } catch (err) {
        console.error("Request error:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
    }
});

server.listen(Number(PORT), HOST, () => {
    console.log(`✓ MediVerse AI running at http://${HOST}:${PORT}`);
});
