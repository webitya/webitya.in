import { LRUCache } from "lru-cache"

const rateLimit = (options = {}) => {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  })

  return {
    check: (limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit

        resolve({
          limit,
          current: currentUsage,
          remaining: Math.max(0, limit - currentUsage),
          reset: new Date(Date.now() + options.interval),
          success: !isRateLimited,
        })
      }),
  }
}

export default rateLimit
