// import redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisClient = () => {
//   if (process.env.REDIS_URL) {
//     console.log("Redis connected");
//     return process.env.REDIS_URL;
//   }
//   throw new Error("Redis not connected");
// };

// export const redisConnection = new redis(redisClient());

// export { redis };

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redisClient;
