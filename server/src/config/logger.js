const winston = require("winston");
const path = require("path");
const config = require("./index");

const logsDir = path.resolve(__dirname, "../../logs");

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "zolvex-backend" },
  transports: [
    new winston.transports.File({ 
      filename: path.join(logsDir, "error.log"), 
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: path.join(logsDir, "combined.log"),
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

if (config.env !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ""}`;
        })
      )
    })
  );
}

module.exports = logger;
