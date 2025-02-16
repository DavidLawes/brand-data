import Redis from "ioredis";

export class Cache {
  redis: Redis;
  ttl: number = 3600;

  constructor() {
    this.redis = new Redis();
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, "EX", this.ttl);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
}
