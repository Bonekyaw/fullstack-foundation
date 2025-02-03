import { Queue } from "bullmq";

import { redis } from "../../../config/redisClient";

const ImageQueue = new Queue("imageQueue", { connection: redis });

export default ImageQueue;
