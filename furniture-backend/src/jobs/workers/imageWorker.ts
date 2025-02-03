import { Worker } from "bullmq";
import sharp, { concurrency } from "sharp";
import path from "path";

import { redis } from "../../../config/redisClient";

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
  { connection: redis }
);

imageWorker.on("completed", (job) => {
  console.log(`Job completed with result ${job.id}`);
});

imageWorker.on("failed", (job: any, err) => {
  console.log(`Job ${job.id} failed with ${err.message}`);
});
