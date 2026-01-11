import { Queue } from "bullmq";

// import { redis } from "../../../config/redisClient";

// const ImageQueue = new Queue("imageQueue", { connection: redis });
const ImageQueue = new Queue("imageQueue", {
  connection: {
    host: process.env.REDIS_HOST || "172.0.0.1",
    port: Number(process.env.REDIS_PORT!) || 6379,
  },
});

export default ImageQueue;
