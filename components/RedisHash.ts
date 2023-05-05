import { RedisBase } from "./RedisBase";

export class RedisHash extends RedisBase {
  /**
   * 同时将多个 field-value (域-值)对设置到哈希表 key 中。
   * @param key
   * @param args
   * @param seconds
   * @constructor
   */
  async HMSet (key: string, args: Record<string, string>, seconds: number): Promise<"OK"> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hmset(key, args);
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }

  /**
   * 将哈希表 key 中的字段 field 的值设为 value 。
   * @param key
   * @param field
   * @param value
   * @param seconds
   * @constructor
   */
  async HSet (key: string, field: string, value: any, seconds: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hset(key, { [field]: value });
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }

  /**
   * 获取所有给定字段的值
   * @param key
   * @param fields
   * @constructor
   */
  async HMGet (key: string, fields: string[]): Promise<Array<string | null>> {
    key = this.addKeyHeader(key);
    return await this.redis.hmget(key, fields);
  }

  /**
   * 获取在哈希表中指定 key 的所有字段和值
   * @param key
   * @constructor
   */
  async HGetAll (key: string): Promise<Record<string, string>> {
    key = this.addKeyHeader(key);
    return await this.redis.hgetall(key);
  }

  /**
   * 获取存储在哈希表中指定字段的值
   * @param key
   * @param field
   * @constructor
   */
  async HGet (key: string, field: string): Promise<string | null> {
    key = this.addKeyHeader(key);
    return await this.redis.hget(key, field);
  }

  /**
   * 查看哈希表 key 中，指定的字段是否存在。
   * @param key
   * @param field
   */
  async hExists (key: string, field: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.hexists(key, field);
  }

  /**
   * 为哈希表 key 中的指定字段的整数值加上增量 increment 。
   * @param key
   * @param field
   * @param increment
   * @param seconds
   * @constructor
   */
  async HIncrBy (key: string, field: string, increment: number, seconds: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hincrby(key, field, increment);
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }

  /**
   * 获取哈希表中字段的数量
   * @param key
   * @constructor
   */
  async HLen (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hlen(key);
    return result;
  }

  /**
   * 删除一个或多个哈希表字段
   * @param key
   * @param fields
   * @constructor
   */
  async HDel (key: string, fields: string[]): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.hdel(key, fields);
  }

  /**
   * 获取哈希表中所有值
   * @param key
   * @constructor
   */
  async HVals (key: string): Promise<string[]> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hvals(key);
    return result;
  }

  /**
   * 为哈希表 key 中的指定字段的浮点数值加上增量 increment 。
   * @param key
   * @param field
   * @param increment
   * @param seconds
   * @constructor
   */
  async HIncrByFloat (key: string, field: string, increment: number, seconds: number): Promise<string> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hincrbyfloat(key, field, increment);
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }

  /**
   * 获取所有哈希表中的字段
   * @param key
   * @param subKey
   * @param value
   * @param seconds
   * @constructor
   */
  async HKeys (key: string, subKey: string, value: any, seconds: number): Promise<string[]> {
    key = this.addKeyHeader(key);
    const keys = await this.redis.hkeys(key);
    return keys.map(key => this.removeKeyHeader(key));
  }

  /**
   * 只有在字段 field 不存在时，设置哈希表字段的值。
   * @param key
   * @param field
   * @param value
   * @param seconds
   * @constructor
   */
  async HSetNX (key: string, field: string, value: any, seconds: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.hsetnx(key, field, value);
    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }
    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }
}
