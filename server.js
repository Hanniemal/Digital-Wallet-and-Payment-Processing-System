require("dotenv").config();
const app = require("./app");
const { initDb } = require("./config/db");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await initDb();
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    logger.error("Startup failed", { message: err.message });
    process.exit(1);
  }
};

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled promise rejection", {
    reason: reason instanceof Error ? reason.message : String(reason),
  });
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", { message: error.message });
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

startServer();
