/*
 * @Author: maple
 * @Date: 2023-02-23 18:07:55
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:08:47
 */
import { RedisBase } from "./RedisBase";
import { type ScanOptions } from "../type";

/**
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-23 18:08:05
 */
class RedisSet extends RedisBase {
  /**
   * 向集合添加一个或多个成员
   * @param key
   * @param members
   * @param seconds
   */
  async sAdd (key: string, members: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(members)) {
      members = [members];
    }

    const result = await this.redis.sadd(this.addKeyHeader(key), members);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }

  /**
   * 获取集合的成员数
   * @param key
   */
  async sCard (key: string): Promise<number> {
    return await this.redis.scard(this.addKeyHeader(key));
  }

  /**
     * 返回 set 成员数量
     * @param key ke
     * @param member 成员
     * @returns
     */
  async sIsMember (key: string, member: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.sismember(key, member);
  }

  /**
   * 返回所有给定集合的并集
   * @param sourceKey
   * @param otherKeys
   */
  async sUnion (sourceKey: string, otherKeys: string | string[]): Promise<string[]> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));
    return await this.redis.sunion(sourceKey, ...otherKeys);
  }

  /**
   * 返回集合中一个或多个随机数
   * @param key
   * @param count
   */
  async sRandMember (key: string, count: number): Promise<string[]> {
    return await this.redis.srandmember(this.addKeyHeader(key), count);
  }

  /**
   * 返回集合中的所有成员
   * @param key
   */
  async sMembers (key: string): Promise<string[]> {
    return await this.redis.smembers(this.addKeyHeader(key));
  }

  /**
   * 返回给定所有集合的交集
   * @param sourceKey
   * @param otherKeys
   */
  async sInter (sourceKey: string, otherKeys: string | string[]): Promise<string[]> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    return await this.redis.sinter(sourceKey, ...otherKeys);
  }

  /**
   * 移除集合中一个或多个成员
   * @param key
   * @param members
   * @param seconds
   */
  async sRem (key: string, members: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(members)) {
      members = [members];
    }

    const result = await this.redis.srem(this.addKeyHeader(key), members);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将 member 元素从 source 集合移动到 destination 集合
   * @param source
   * @param destination
   * @param member
   */
  async sMove (source: string, destination: string, member: any): Promise<number> {
    return await this.redis.smove(this.addKeyHeader(source), this.addKeyHeader(destination), member);
  }

  /**
   * Redis S diff store 命令 - 返回给定所有集合的差集并存储在 destination 中
   * @param destination 存储的 Set
   * @param sourceKey 源 Set
   * @param otherKeys 对比的 Sets
   * @param seconds
   */
  async sDiffStore (destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    destination = this.addKeyHeader(destination);
    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    const result = await this.redis.sdiffstore(destination, sourceKey, ...otherKeys);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(destination, seconds);
    }
    return result;
  }

  /**
   * 返回给定所有集合的差集
   * @param sourceKey
   * @param otherKeys
   */
  async sDiff (sourceKey: string, otherKeys: string | string[]): Promise<string[]> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    return await this.redis.sdiff(sourceKey, ...otherKeys);
  }

  /**
   * 迭代集合中的元素
   * @param key
   * @param cursor
   * @param options
   */
  async sScan (key: string, cursor: number, options?: ScanOptions): Promise<[cursor: string, elements: string[]]> {
    const pattern = options?.pattern;
    const count = options?.count;

    let result: [cursor: string, elements: string[]];

    if (pattern == null) {
      if (count == null) {
        result = await this.redis.sscan(this.addKeyHeader(key), cursor);
      } else {
        result = await this.redis.sscan(this.addKeyHeader(key), cursor, "COUNT", count);
      }
    } else {
      if (count == null) {
        result = await this.redis.sscan(this.addKeyHeader(key), cursor, "MATCH", pattern);
      } else {
        result = await this.redis.sscan(this.addKeyHeader(key), cursor, "MATCH", pattern, "COUNT", count);
      }
    }

    return result;
  }

  /**
   * 返回给定所有集合的交集并存储在 destination 中
   * @param destination
   * @param sourceKey
   * @param otherKeys
   * @param seconds
   */
  async sInterStore (destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    destination = this.addKeyHeader(destination);
    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    const result = await this.redis.sinterstore(destination, sourceKey, otherKeys);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(destination, seconds);
    }
    return result;
  }

  /**
   * 所有给定集合的并集存储在 destination 集合中
   * @param destination
   * @param sourceKey
   * @param otherKeys
   * @param seconds
   */
  async sUnionStore (destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    destination = this.addKeyHeader(destination);
    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    const result = await this.redis.sunionstore(destination, sourceKey, otherKeys);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(destination, seconds);
    }
    return result;
  }

  /**
   * 移除并返回集合中的一个随机元素
   * @param key
   * @param count
   * @param seconds
   */
  async sPop (key: string, count: number, seconds?: number): Promise<string[]> {
    const result = await this.redis.spop(this.addKeyHeader(key), count);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }
    return result;
  }
}

export default RedisSet;
