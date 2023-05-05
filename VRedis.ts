/*
 * @Author: maple
 * @Date: 2023-02-23 17:35:07
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:18:01
 */

import Redis, { type RedisOptions } from "ioredis";
import { RedisKey } from "./components/RedisKey";
import { RedisAdvanced } from "./components/RedisAdvanced";
import RedisSet from "./components/RedisSet";
import { type VRedisOptions } from "./type";
import RedisString from "./components/RedisString";
import { RedisList } from "./components/RedisList";
import { RedisHash } from "./components/RedisHash";
import { RedisSortedSet } from "./components/RedisSortedSet";
import { RedisTransaction } from "./components/RedisTransaction";
import { RedisConfig } from "./RedisConfig";

class VRedis {
  private readonly $redis: Redis;
  private readonly $options: RedisConfig;
  private readonly $redisKey: RedisKey;
  private readonly $redisAdvanced: RedisAdvanced;
  private readonly $redisSet: RedisSet;
  private readonly $redisString: RedisString;
  private readonly $redisList: RedisList;
  private readonly $redisHash: RedisHash;
  private readonly $redisSortedSet: RedisSortedSet;
  private readonly $redisTransaction: RedisTransaction;

  constructor (config: RedisOptions, options: VRedisOptions | undefined) {
    this.$redis = new Redis(config);
    this.$options = new RedisConfig(options);

    this.$redisKey = new RedisKey(this);
    this.$redisSet = new RedisSet(this);
    this.$redisAdvanced = new RedisAdvanced(this);
    this.$redisString = new RedisString(this);
    this.$redisList = new RedisList(this);
    this.$redisHash = new RedisHash(this);
    this.$redisSortedSet = new RedisSortedSet(this);
    this.$redisTransaction = new RedisTransaction(this);
  }

  /**
   * 获取 ioredis 对象
   */
  getRedis (): Redis {
    return this.$redis;
  }

  /**
   * 获取 options 参数
   */
  getOptions (): RedisConfig {
    return this.$options;
  }

  /**
   * 获取 redis-key api
   */
  getRedisKey (): RedisKey {
    return this.$redisKey;
  }

  /**
   * 获取 redis-set api
   */
  getRedisSet (): RedisSet {
    return this.$redisSet;
  }

  /**
   * 获取 redis-advanced
   */
  getRedisAdvanced (): RedisAdvanced {
    return this.$redisAdvanced;
  }

  /**
   * 获取 redis-string
   */
  getRedisString (): RedisString {
    return this.$redisString;
  }

  /**
   * 获取 redis-list
   */
  getRedisList (): RedisList {
    return this.$redisList;
  }

  async delete (key: string): Promise<number> {
    return await this.$redisKey.delete(key);
  }

  async expire (key: string, time: number = 60): Promise<void> {
    await this.$redisKey.expire(key, time);
  }

  async get (key: string): Promise<string | null> {
    return await this.$redisString.get(key);
  }

  async set (key: string, value: string, seconds?: number): Promise<void> {
    await this.$redisString.set(key, value, seconds);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async getJSON (key: string): Promise<Object | null> {
    return await this.$redisAdvanced.getJSON(key);
  }

  async setJSON (key: string, json: any, seconds?: number): Promise<void> {
    await this.$redisAdvanced.setJSON(key, json, seconds);
  }
}

export default VRedis;
