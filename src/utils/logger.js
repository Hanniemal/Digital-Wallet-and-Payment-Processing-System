const timestamp = () => new Date().toISOString();

const log = (level, message, meta) => {
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  const output = `[${timestamp()}] [${level.toUpperCase()}] ${message}${payload}`;
  if (level === "error") {
    console.error(output);
    return;
  }
  console.log(output);
};

const logger = {
  info: (message, meta) => log("info", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  error: (message, meta) => log("error", message, meta),
  debug: (message, meta) => {
    if (process.env.NODE_ENV !== "production") {
      log("debug", message, meta);
    }
  },
  morganStream: {
    write: (message) => log("info", message.trim()),
  },
};

module.exports = logger;

