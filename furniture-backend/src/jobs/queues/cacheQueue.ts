import { Queue } from "bullmq";

// import { redis } from "../../../config/redisClient";

export const cacheQueue = new Queue("cache-invalidation", {
  // connection: redis,
  connection: {
    host: process.env.REDIS_HOST || "172.0.0.1",
    port: Number(process.env.REDIS_PORT!) || 6379,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: 1000,
  },
});
