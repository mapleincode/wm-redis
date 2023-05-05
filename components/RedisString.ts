/*
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:35:20
 */
import { RedisBase } from "./RedisBase";

export class RedisKey extends RedisBase {
  /**
   * set key
   * 时间过期时间推荐使用 setEx
   * @param {string} key key
   * @param {string} value value
   * @param seconds
   */
  async set (key: string, value: string, seconds?: number): Promise<void> {
    key = this.addKeyHeader(key);

    await this.getRedis().set(key, value);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
  }

  /**
     * 通过 key 获取 value
     * @param {string} key key
     * @returns value
     */
  async get (key: string): Promise<string | null> {
    key = this.addKeyHeader(key);
    return await this.redis.get(key);
  }

  /**
   * 自增
   * @param {string} key key
   * @param seconds
   * @returns {number} value
   */
  async incr (key: string, seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.incr(key);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 只有在 key 不存在时设置 key 的值
   * @param key
   * @param data
   * @param seconds
   */
  async setNX (key: string, data: any, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.setnx(key, data);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (result > 0 && seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 返回 key 中字符串值的子字符
   * @param key
   * @param start
   * @param end
   */
  async getRange (key: string, start: number, end: number): Promise<string> {
    key = this.addKeyHeader(key);
    return await this.redis.getrange(key, start, end);
  }

  /**
   * 同时设置一个或多个 key-value 对。
   * @param args
   * @param seconds 可选；设置会导致循环调用 expire 方法导致时间变长
   */
  async mSet (args: Record<string, any>, seconds?: number): Promise<"OK"> {
    const newArgs = this.mAddKeyHeader(args);

    const result = await this.redis.mset(newArgs);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds !== undefined && seconds > 0) {
      for (const key of Object.keys(newArgs)) {
        await this.expireInSide(key, seconds);
      }
    }

    return result;
  }

  /**
   * 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。
   * @param key
   * @param seconds
   * @param data
   */
  async setExpire (key: string, seconds: number, data: any): Promise<"OK"> {
    key = this.addKeyHeader(key);
    return await this.redis.setex(key, seconds, data);
  }

  /**
   * 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
   * @param key
   * @param offset
   */
  async getBit (key: string, offset: number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.getbit(key, offset);
  }

  /**
   * 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
   * @param key
   * @param offset
   * @param data
   * @param seconds
   */
  async setBit (key: string, offset: number, data: any, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.setbit(key, offset, data);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将 key 中储存的数字值减一。
   * @param key
   * @param seconds
   */
  async decr (key: string, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.decr(key);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * key 所储存的值减去给定的减量值（decrement） 。
   * @param key
   * @param decrement
   * @param seconds
   */
  async decrBy (key: string, decrement: number, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.decrby(key, decrement);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 返回 key 所储存的字符串值的长度。
   * @param key
   */
  async strlen (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.strlen(key);
  }

  /**
   * 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
   * @param args
   * @param seconds 可选；设置会导致循环调用 seconds 方法导致时间变长
   */
  async mSetNX (args: Record<string, any>, seconds: number | undefined): Promise<"OK"> {
    const newArgs = this.mAddKeyHeader(args);
    const result = await this.redis.msetnx(newArgs);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds !== undefined && seconds > 0) {
      for (const key of Object.keys(newArgs)) {
        try {
          await this.expireInSide(key, seconds);
        } catch (err: any) {

        }
      }
    }

    return result;
  }

  /**
   * 将 key 所储存的值加上给定的增量值（increment） 。
   * @param key
   * @param increment
   * @param seconds
   */
  async incrBy (key: string, increment: number, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.incrby(key, increment);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将 key 所储存的值加上给定的浮点增量值（increment） 。
   * @param key
   * @param increment
   * @param seconds
   */
  async incrByFloat (key: string, increment: number, seconds: number | undefined): Promise<string> {
    key = this.addKeyHeader(key);
    const result = await this.redis.incrbyfloat(key, increment);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。
   * @param key
   * @param offset
   * @param data
   * @param seconds
   */
  async setRange (key: string, offset: number, data: any, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.setrange(key, offset, data);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) { seconds = this.defaultExpireTime; } if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。
   * @param key
   * @param milliseconds
   * @param data
   */
  async pSetExpire (key: string, milliseconds: number, data: any): Promise<unknown> {
    key = this.addKeyHeader(key);
    return await this.redis.psetex(key, milliseconds, data);
  }

  /**
   * 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。
   * @param key
   * @param value
   * @param seconds
   */
  async append (key: string, value: any, seconds: number | undefined): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.append(key, value);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    } if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
   * @param key
   * @param value
   * @param seconds
   */
  async getSet (key: string, value: any, seconds: number | undefined): Promise<string | null> {
    key = this.addKeyHeader(key);
    const result = await this.redis.getset(key, value);

    // 默认 0 以上设置过期时间，如果小于 0 则无限
    if (seconds == null) { seconds = this.defaultExpireTime; } if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 获取所有(一个或多个)给定 key 的值。
   * @param keys
   */
  async mGet (keys: string[]): Promise<Array<string | null>> {
    keys = keys.map(key => this.addKeyHeader(key));

    return await this.redis.mget(keys);
  }
}

export default RedisKey;
