import winston from "winston"

let logger = null

if (typeof window === "undefined") {
  // Only import Winston on server side
  logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    defaultMeta: { service: "webitya-lms" },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  })

  // Add file transports only in production
  if (process.env.NODE_ENV === "production") {
    logger.add(new winston.transports.File({ filename: "logs/error.log", level: "error" }))
    logger.add(new winston.transports.File({ filename: "logs/combined.log" }))
  }
} else {
  // Client-side logger fallback
  logger = {
    info: (...args) => console.log("[INFO]", ...args),
    error: (...args) => console.error("[ERROR]", ...args),
    warn: (...args) => console.warn("[WARN]", ...args),
    debug: (...args) => console.debug("[DEBUG]", ...args),
  }
}

export default logger
