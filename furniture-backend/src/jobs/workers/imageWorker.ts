import { Worker } from "bullmq";
import { Redis } from "ioredis";
import sharp, { concurrency } from "sharp";
import path from "path";

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT!) || 6379,
  // password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

// Create a worker to process the image optimization job
const imageWorker = new Worker(
  "imageQueue",
  async (job) => {
    const { filePath, fileName, width, height, quality } = job.data;

    const optimizedImagePath = path.join(
      __dirname,
      "../../..",
      "/uploads/optimize",
      fileName
    );
    await sharp(filePath)
      .resize(width, height)
      .webp({ quality: quality })
      .toFile(optimizedImagePath);
  },
  { connection }
);

imageWorker.on("completed", (job) => {
  console.log(`Job completed with result ${job.id}`);
});

imageWorker.on("failed", (job: any, err) => {
  console.log(`Job ${job.id} failed with ${err.message}`);
});
