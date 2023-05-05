// noinspection SpellCheckingInspection

import { RedisBase } from "./RedisBase";
import { type RangByLexOptions, RangeArgs, type RangeOptions, type ScanOptions } from "../type";

const { BY_LEX, REV, BY_SCORE, WITH_SCORES, LIMIT } = RangeArgs;

export class RedisSortedSet extends RedisBase {
  /**
   * Redis Zrevrank 命令;返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
   * @param key
   * @param member
   */
  async zRevRank (key: string, member: any): Promise<number | null> {
    key = this.addKeyHeader(key);
    return await this.redis.zrevrank(key, member);
  }

  /**
   * Redis Zlexcount 命令; 在有序集合中计算指定字典区间内成员数量
   * @param key
   * @param min
   * @param max
   */
  async zLexCount (key: string, min: number, max: number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.zlexcount(key, min, max);
  }

  /**
   * Redis Zunionstore 命令; 计算给定的一个或多个有序集的并集，并存储在新的 key 中
   * @param destination
   * @param sourceKey
   * @param otherKeys
   * @param seconds
   */
  async zUnionStore (destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    destination = this.addKeyHeader(destination);
    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    const result = await this.redis.zunionstore(destination, sourceKey, otherKeys);

    if (seconds == null) {
      seconds = this.defaultTimeout;
    }

    if (seconds > 0) {
      await this.expireInSide(destination, seconds);
    }

    return result;
  }

  /**
   * Redis Zremrangebyrank 命令; 移除有序集合中给定的排名区间的所有成员
   * @param key
   * @param start
   * @param stop
   */
  async zRemRangeByRank (key: string, start: number, stop: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = this.redis.zremrangebyrank(key, start, stop);

    return await result;
  }

  /**
   * Redis Zcard 命令; 获取有序集合的成员数
   * @param key
   */
  async zCard (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    const result = this.redis.zcard(key);

    return await result;
  }

  /**
   * Redis Zrem 命令; 移除有序集合中的一个或多个成员
   * @param key
   * @param members
   * @param seconds
   */
  async zRem (key: string, members: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(members)) {
      members = [members];
    }

    const result = await this.redis.zrem(this.addKeyHeader(key), members);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * Redis Zinterstore 命令; 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
   * @param destination
   * @param sourceKey
   * @param otherKeys
   * @param seconds
   */
  async zInterStore (destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number> {
    if (!Array.isArray(otherKeys)) {
      otherKeys = [otherKeys];
    }

    destination = this.addKeyHeader(destination);
    sourceKey = this.addKeyHeader(sourceKey);
    otherKeys = otherKeys.map(key => this.addKeyHeader(key));

    const result = await this.redis.zinterstore(destination, sourceKey, otherKeys);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(destination, seconds);
    }
    return result;
  }

  /**
   * Redis Zrank 命令; 返回有序集合中指定成员的索引
   * @param key
   * @param member
   * @param seconds
   */
  async zRank (key: string, member: any, seconds?: number): Promise<number | null> {
    key = this.addKeyHeader(key);
    const result = await this.redis.zrank(key, member);

    if (seconds == null) {
      seconds = this.defaultTimeout;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * Redis Zincrby 命令;有序集合中对指定成员的分数加上增量 increment
   * @param key
   * @param increment
   * @param member
   * @param seconds
   */
  async zIncrBy (key: string, increment: number, member: any, seconds?: number): Promise<string> {
    key = this.addKeyHeader(key);
    const result = this.redis.zincrby(key, increment, member);

    if (seconds == null) {
      seconds = this.defaultTimeout;
    }

    if (seconds > 0) {
      await this.expireInSide(member, seconds);
    }

    return await result;
  }

  /**
   * Redis Zrangebyscore 命令；通过分数返回有序集合指定区间内的成员
   * @param key
   * @param min
   * @param max
   */
  async zRangeByScore (key: string, min: number, max: number): Promise<string[]> {
    key = this.addKeyHeader(key);
    const result = this.redis.zrangebyscore(key, min, max);

    return await result;
  }

  /**
   * Redis Zrangebylex 命令; 通过字典区间返回有序集合的成员
   * @param key
   * @param min
   * @param max
   * @param options
   */
  async zRangeByLex (key: string, min: number, max: number, options?: RangByLexOptions): Promise<string[]> {
    key = this.addKeyHeader(key);
    let result: string[];

    const offset = options?.offset;
    const count = options?.count;

    if (offset != null && count != null) {
      result = await this.redis.zrangebylex(key, min, max, "LIMIT", offset, count);
    } else {
      result = await this.redis.zrangebylex(key, min, max);
    }

    return result;
  }

  /**
   * Redis Zscore 命令;返回有序集中，成员的分数值
   * @param key
   * @param member
   */
  async zScore (key: string, member: string): Promise<string | null> {
    key = this.addKeyHeader(key);
    const result = this.redis.zscore(key, member);

    return await result;
  }

  /**
   * Redis Zremrangebyscore 命令; 移除有序集合中给定的分数区间的所有成员
   * @param key
   * @param min
   * @param max
   */
  async zRemRangeByScore (key: string, min: number, max: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = this.redis.zremrangebyscore(key, min, max);
    return await result;
  }

  /**
   * Redis Zscan 命令; 迭代有序集合中的元素（包括元素成员和元素分值）
   * @param key
   * @param cursor
   * @param options
   */
  async zScan (key: string, cursor: number, options?: ScanOptions): Promise<[cursor: string, elements: string[]]> {
    const pattern = options?.pattern;
    const count = options?.count;

    let result: [cursor: string, elements: string[]];

    if (pattern == null) {
      if (count == null) {
        result = await this.redis.zscan(this.addKeyHeader(key), cursor);
      } else {
        result = await this.redis.zscan(this.addKeyHeader(key), cursor, "COUNT", count);
      }
    } else {
      if (count == null) {
        result = await this.redis.zscan(this.addKeyHeader(key), cursor, "MATCH", pattern);
      } else {
        result = await this.redis.zscan(this.addKeyHeader(key), cursor, "MATCH", pattern, "COUNT", count);
      }
    }

    return result;
  }

  /**
   * Redis Zrevrangebyscore 命令; 返回有序集中指定分数区间内的成员，分数从高到低排序
   * @param key
   * @param min
   * @param max
   */

  async zRevRangeByScore (key: string, min: number, max: number): Promise<string[]> {
    key = this.addKeyHeader(key);
    const result = this.redis.zrevrangebyscore(key, min, max);
    return await result;
  }

  /**
   * Redis Zremrangebylex 命令; 移除有序集合中给定的字典区间的所有成员
   * @param key
   * @param min
   * @param max
   */
  async zRemRangeByLex (key: string, min: number, max: number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.zremrangebylex(key, min, max);
  }

  /**
   * Redis Zrevrange 命令  返回有序集中指定区间内的成员，通过索引，分数从高到底
   * @param key
   * @param start
   * @param stop
   */
  async zRevRange (key: string, start: number, stop: number): Promise<string[]> {
    key = this.addKeyHeader(key);
    return await this.redis.zrevrange(key, start, stop);
  }

  /**
   * Redis Zrange 命令; 通过索引区间返回有序集合成指定区间内的成员
   * @param key
   * @param min
   * @param max
   * @param options
   */
  async zRange (key: string, min: number, max: number, options?: RangeOptions): Promise<string[]> {
    key = this.addKeyHeader(key);

    const withScores = options?.withScores;
    const byScore = options?.byScore;
    const byLex = options?.byLex;
    const rev = options?.byScore;
    const offset = options?.offset;
    const count = options?.count;

    let result: string[];

    if (byScore === true) {
      if (withScores === true) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_SCORE, REV, WITH_SCORES);
        } else {
          result = await this.redis.zrange(key, min, max, BY_SCORE, WITH_SCORES);
        }
      } else if ((count != null) && (offset != null)) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_SCORE, REV, LIMIT, offset, count);
        } else {
          result = await this.redis.zrange(key, min, max, BY_SCORE, LIMIT, offset, count);
        }
      } else {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_SCORE, REV);
        } else {
          result = await this.redis.zrange(key, min, max, BY_SCORE);
        }
      }
    } else if (byLex === true) {
      if (withScores === true) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_LEX, REV, WITH_SCORES);
        } else {
          result = await this.redis.zrange(key, min, max, BY_LEX, WITH_SCORES);
        }
      } else if ((count != null) && (offset != null)) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_LEX, REV, LIMIT, offset, count);
        } else {
          result = await this.redis.zrange(key, min, max, BY_LEX, LIMIT, offset, count);
        }
      } else {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, BY_LEX, REV);
        } else {
          result = await this.redis.zrange(key, min, max, BY_LEX);
        }
      }
    } else {
      if (withScores === true) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, REV, WITH_SCORES);
        } else {
          result = await this.redis.zrange(key, min, max, WITH_SCORES);
        }
      } else if ((count != null) && (offset != null)) {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, REV, LIMIT, offset, count);
        } else {
          result = await this.redis.zrange(key, min, max, LIMIT, offset, count);
        }
      } else {
        if (rev === true) {
          result = await this.redis.zrange(key, min, max, REV);
        } else {
          result = await this.redis.zrange(key, min, max);
        }
      }
    }

    return result;
  }

  /**
   * Redis Zcount 命令; 计算在有序集合中指定区间分数的成员数
   * @param key
   * @param min
   * @param max
   * @param seconds
   */
  async zCount (key: string, min: number, max: number, seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = this.redis.zcount(key, min, max);

    if (seconds == null) {
      seconds = this.defaultTimeout;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return await result;
  }

  /**
   * Redis Zadd 命令; 向有序集合添加一个或多个成员，或者更新已存在成员的分数
   * @param key
   * @param values
   * @param seconds
   */
  async zAdd (key: string, values: string | string[], seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = this.redis.zadd(key, values);

    if (seconds == null) {
      seconds = this.defaultTimeout;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return await result;
  }
}
