import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject('CACHE_MANAGER') private readonly cacheManager: Redis.Redis,
  ) {}

  async setString(key: string, value: any, ttl?: number): Promise<void> {
    if (ttl) {
      await this.cacheManager.set(key, value, 'EX', ttl);
    } else {
      await this.cacheManager.set(key, value);
    }
  }

  async getString(key: string): Promise<any | null> {
    return await this.cacheManager.get(key);
  }

  async deleteKey(key: string): Promise<any | null> {
    return await this.cacheManager.del(key);
  }

  async setHash(
    key: string,
    field: string,
    value: any,
    ttl?: any,
  ): Promise<void> {
    await this.cacheManager.hset(key, field, value);
    if (ttl) {
      await this.cacheManager.expire(key, ttl);
    }
  }

  async getHash(key: string, field: string): Promise<any | null> {
    return await this.cacheManager.hget(key, field);
  }
  async getHashAll(key: string): Promise<any | null> {
    return await this.cacheManager.hgetall(key);
  }

  async setList(key: string, values: string[], ttl?: number): Promise<void> {
    await this.cacheManager.lpush(key, ...values);
    if (ttl) {
      await this.cacheManager.expire(key, ttl);
    }
  }

  async getList(key: string, start: number, end: number): Promise<string[]> {
    return await this.cacheManager.lrange(key, start, end);
  }

  async setSet(key: string, members: string[], ttl?: number): Promise<void> {
    await this.cacheManager.sadd(key, ...members);
    if (ttl) {
      await this.cacheManager.expire(key, ttl);
    }
  }

  async getSet(key: string): Promise<string[]> {
    return await this.cacheManager.smembers(key);
  }

  async setSortedSet(
    key: string,
    score: number,
    member: string,
    ttl?: number,
  ): Promise<void> {
    await this.cacheManager.zadd(key, score, member);
    if (ttl) {
      await this.cacheManager.expire(key, ttl);
    }
  }

  async getSortedSetByRank(
    key: string,
    start: number,
    stop: number,
  ): Promise<string[]> {
    return await this.cacheManager.zrange(key, start, stop);
  }
}