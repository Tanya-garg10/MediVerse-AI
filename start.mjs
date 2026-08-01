process.env.PORT = process.env.PORT || "3000";
process.env.HOST = process.env.HOST || "0.0.0.0";

console.log("Starting MediVerse AI server...");
console.log("PORT:", process.env.PORT);
console.log("HOST:", process.env.HOST);
console.log("NODE_ENV:", process.env.NODE_ENV);

import("./dist/server/server.js")
    .then(() => {
        console.log("Server module loaded successfully");
    })
    .catch((err) => {
        console.error("Failed to start server:", err);
        process.exit(1);
    });
