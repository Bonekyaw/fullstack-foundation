// Must Read.
// In the latest version of bullMQ, bullmq controls Redis server using its ioredis
// Therefore we don't need to install manually "ioredis"
// This file is not needed any more now
import { Redis } from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT!) || 6379,
  // password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // for bullMQ
});
