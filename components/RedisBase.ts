/*
 * @Author: maple
 * @Date: 2023-02-23 18:11:14
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 13:45:54
 */
import type VRedis from "../VRedis";
import type Redis from "ioredis";
import { type RedisConfig } from "../RedisConfig";

export class RedisBase {
  readonly redis: Redis;
  readonly options: RedisConfig;
  readonly vRedis: VRedis;
  readonly keyHeader: string;
  readonly defaultExpireTime: number;
  readonly defaultTimeout: number;
  readonly throwExpireError: boolean;
  readonly defaultRetryTimes: number;
  readonly defaultRetryDelaySeconds: number;

  constructor (vRedis: VRedis) {
    this.vRedis = vRedis;
    this.redis = vRedis.getRedis();
    this.options = vRedis.getOptions();

    this.keyHeader = this.options.keyHeader;
    this.defaultExpireTime = this.options.defaultExpireTime;
    this.defaultTimeout = this.options.defaultTimeout;
    this.throwExpireError = this.options.throwExpireError;
    this.defaultRetryTimes = this.options.defaultRetryTimes;
    this.defaultRetryDelaySeconds = this.options.defaultRetryDelaySeconds;
  }

  getVRedis (): VRedis {
    return this.vRedis;
  }

  getRedis (): Redis {
    return this.redis;
  }

  /**
     * 设置过期时间(内部调用)
     * @param {string} newKey 已经转换过的 key
     * @param {number} time 过期时间，默认 60s
     */
  async expireInSide (newKey: string, time?: number): Promise<number> {
    if (time == null) {
      time = this.defaultExpireTime;
    }

    if (!this.throwExpireError) {
      try {
        return await this.redis.expire(newKey, time);
      } catch (err) {
        return 1;
      }
    }
    return await this.redis.expire(newKey, time);
  }

  /**
     * 获取原始 key
     * @param {string} orgKey 原始 key
     * @returns {string} newKey 附加 keyHeader 之后的 key
     */
  addKeyHeader (orgKey = ""): string {
    return this.keyHeader + orgKey;
  }

  /**
   * 批量获取 Key
   * @param args
   */
  mAddKeyHeader (args: Record<string, any>): Record<string, any> {
    const newArgs: Record<string, any> = {};
    for (const key of Object.keys(args)) {
      newArgs[this.addKeyHeader(key)] = args[key];
    }
    return newArgs;
  }

  /**
   * 把 db key 转换成 orgKey
   * @param dbKey
   */
  removeKeyHeader (dbKey: string): string {
    return dbKey.replace(this.keyHeader, "");
  }
}
