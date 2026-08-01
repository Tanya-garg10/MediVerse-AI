// Render/Railway startup wrapper
// Sets PORT env var and imports the built SSR server
process.env.PORT = process.env.PORT || "3000";
process.env.HOST = process.env.HOST || "0.0.0.0";

import("./dist/server/server.js").catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
