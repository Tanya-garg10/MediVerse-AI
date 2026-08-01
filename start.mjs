import { createServer } from "http";

const PORT = process.env.PORT || "3000";
const HOST = "0.0.0.0";

console.log(`Starting MediVerse AI on ${HOST}:${PORT}...`);

// Import the built SSR handler (exports a fetch-compatible default)
const { default: handler } = await import("./dist/server/server.js");

const server = createServer(async (req, res) => {
    try {
        // Build a Web API Request from the Node.js req
        const protocol = "https";
        const host = req.headers.host || `localhost:${PORT}`;
        const url = `${protocol}://${host}${req.url}`;

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

        const request = new Request(url, {
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
