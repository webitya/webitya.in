import { Redis } from "ioredis"

let redis = null

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })
}

export const cache = {
  get: async (key) => {
    if (!redis) return null
    try {
      const value = await redis.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error("Cache get error:", error)
      return null
    }
  },

  set: async (key, value, ttl = 3600) => {
    if (!redis) return false
    try {
      await redis.setex(key, ttl, JSON.stringify(value))
      return true
    } catch (error) {
      console.error("Cache set error:", error)
      return false
    }
  },

  del: async (key) => {
    if (!redis) return false
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error("Cache delete error:", error)
      return false
    }
  },

  flush: async () => {
    if (!redis) return false
    try {
      await redis.flushall()
      return true
    } catch (error) {
      console.error("Cache flush error:", error)
      return false
    }
  },
}

export default cache
