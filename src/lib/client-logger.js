// Client-side safe logger
const clientLogger = {
  info: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[INFO]", ...args)
    }
  },
  error: (...args) => {
    console.error("[ERROR]", ...args)
    // In production, you might want to send errors to a service like Sentry
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      // Send to error tracking service
    }
  },
  warn: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[WARN]", ...args)
    }
  },
  debug: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[DEBUG]", ...args)
    }
  },
}

export default clientLogger
