import { Worker } from "bullmq";
import { redis } from "../../../config/redisClient";

export const caheWorker = new Worker(
  "cache-invalidation",
  async (job) => {
    const { pattern } = job.data;
    await invalidateCache(pattern);
  },
  {
    //connection: redis,
    connection: {
      host: process.env.REDIS_HOST || "172.0.0.1",
      port: Number(process.env.REDIS_PORT!) || 6379,
    },
    concurrency: 5, // Proccess 5 jobs concurrently
  }
);

caheWorker.on("completed", (job) => {
  console.log(`Job completed with result ${job.id}`);
});

caheWorker.on("failed", (job: any, err) => {
  console.log(`Job ${job.id} failed with ${err.message}`);
});

const invalidateCache = async (pattern: string) => {
  try {
    const stream = redis.scanStream({
      match: pattern,
      count: 100,
    });

    const pipeline = redis.pipeline();
    let totalKeys = 0;

    // Process keys in batches
    stream.on("data", (keys: string[]) => {
      if (keys.length > 0) {
        keys.forEach((key) => {
          pipeline.del(key);
          totalKeys++;
        });
      }
    });

    // Wrap stream events in a Promise
    await new Promise<void>((resolve, reject) => {
      stream.on("end", async () => {
        try {
          if (totalKeys > 0) {
            await pipeline.exec();
            console.log(`Invalidated ${totalKeys} keys`);
          }
          resolve();
        } catch (execError) {
          reject(execError);
        }
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Cache Invalidation error: ", error);
    throw error;
  }
};
