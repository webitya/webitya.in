// Server-side error handler
export class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"

    Error.captureStackTrace(this, this.constructor)
  }
}

export const handleError = (error, req = null) => {
  // Only use Winston logger on server side
  if (typeof window === "undefined") {
    try {
      const logger = require("./logger").default
      logger.error({
        message: error.message,
        stack: error.stack,
        statusCode: error.statusCode,
        url: req?.url,
        method: req?.method,
        userAgent: req?.headers?.["user-agent"],
        ip: req?.ip || req?.connection?.remoteAddress,
        timestamp: new Date().toISOString(),
      })
    } catch (logError) {
      console.error("Logging error:", logError)
      console.error("Original error:", error)
    }
  } else {
    // Client-side error handling
    console.error("Client error:", error)
  }

  if (process.env.NODE_ENV === "production" && !error.isOperational) {
    // Don't leak error details in production
    return {
      message: "Something went wrong",
      statusCode: 500,
    }
  }

  return {
    message: error.message,
    statusCode: error.statusCode || 500,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  }
}

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
