import { RedisBase } from "./RedisBase";

export class RedisList extends RedisBase {
  /**
   * 通过索引获取列表中的元素
   * @param key
   * @param index
   */
  async lIndex (key: string, index: number): Promise<string | null> {
    key = this.addKeyHeader(key);
    return await this.redis.lindex(key, index);
  }

  /**
   * 列表中添加一个或多个值
   * @param key
   * @param value
   * @param seconds
   */
  async rPush (key: string, value: any | any[], seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.rpush(key, value);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 获取列表指定范围内的元素
   * @param key
   * @param start
   * @param stop
   */
  async lRange (key: string, start: number, stop: number): Promise<string[]> {
    key = this.addKeyHeader(key);
    return await this.redis.lrange(key, start, stop);
  }

  /**
   * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
   * @param source
   * @param destination
   */
  async rPopLPush (source: string, destination: string): Promise<string> {
    source = this.addKeyHeader(source);
    destination = this.addKeyHeader(destination);
    return await this.redis.rpoplpush(source, destination);
  }

  /**
   * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
   * @param source
   * @param destination
   * @param timeout
   */
  async brPopLPush (source: string, destination: string, timeout?: number): Promise<string | null> {
    source = this.addKeyHeader(source);
    destination = this.addKeyHeader(destination);

    if (timeout == null) {
      timeout = this.defaultTimeout;
    }

    return await this.redis.brpoplpush(source, destination, timeout);
  }

  /**
   * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
   * @param keys
   * @param timeout
   */
  async blPop (keys: string | string[], timeout?: number): Promise<[string, string] | null> {
    if (Array.isArray(keys)) {
      keys = keys.map(key => this.addKeyHeader(key));
    } else {
      keys = this.addKeyHeader(keys);
    }

    if (timeout == null) {
      timeout = this.defaultTimeout;
    }

    return await this.redis.blpop(keys, timeout);
  }

  /**
   * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
   * @param keys
   * @param timeout
   */
  async brPop (keys: string | string[], timeout?: number): Promise<[string, string] | null> {
    if (Array.isArray(keys)) {
      keys = keys.map(key => this.addKeyHeader(key));
    } else {
      keys = this.addKeyHeader(keys);
    }

    if (timeout == null) {
      timeout = this.defaultTimeout;
    }

    return await this.redis.brpop(keys, timeout);
  }

  /**
   * 移除列表元素
   * @param key
   * @param count
   * @param element
   * @param seconds
   */
  async lRem (key: string, count: number, element: any, seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.lrem(key, count, element);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 获取列表长度
   * @param key
   */
  async lLen (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.llen(key);
  }

  /**
   * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
   * @param key
   * @param start
   * @param stop
   * @param seconds
   */
  async ltrim (key: string, start: number, stop: number, seconds?: number): Promise<"OK"> {
    key = this.addKeyHeader(key);
    const result = await this.redis.ltrim(key, start, stop);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
     * 移出并获取列表的第一个元素
     * @param key
     * @param value
     * @param seconds 默认不设置过期时间
     */
  async lPop (key: string, value: any | any[], seconds?: number): Promise<string | null> {
    key = this.addKeyHeader(key);
    const result = await this.redis.lpop(key, value);

    // if (seconds == null) {
    //   seconds = this.defaultExpireTime;
    // }

    if (seconds != null && seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将一个或多个值插入到已存在的列表头部
   * @param key
   * @param value
   * @param seconds
   */
  async lPushX (key: string, value: any | any[], seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.lpushx(key, value);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (result > 0 && seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 在列表的元素前或者后插入元素
   * @param key
   * @param pivot
   * @param element
   * @param seconds
   * @constructor
   */
  async LInsert (key: string, pivot: any, element: any, seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.linsert(key, "BEFORE", pivot, element);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
     * 移除并获取列表最后一个元素
     * @param key
     * @param value
     * @param seconds 默认不设置过期时间
     */
  async rPop (key: string, seconds?: number): Promise<string | null> {
    key = this.addKeyHeader(key);
    const result = await this.redis.rpop(key);

    // if (seconds == null) {
    //   seconds = this.defaultExpireTime;
    // }

    if (seconds != null && seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 通过索引设置列表元素的值
   * @param key
   * @param index
   * @param element
   * @param seconds
   */
  async lSet (key: string, index: number, element: any, seconds?: number): Promise<"OK"> {
    key = this.addKeyHeader(key);
    const result = await this.redis.lset(key, index, element);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 将一个或多个值插入到列表头部
   * @param key
   * @param value
   * @param seconds
   */
  async lPush (key: string, value: any | any[], seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.lpush(key, value);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    if (seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }

  /**
   * 为已存在的列表添加值
   * @param key
   * @param value
   * @param seconds
   */
  async rPushX (key: string, value: any | any[], seconds?: number): Promise<number> {
    key = this.addKeyHeader(key);
    const result = await this.redis.rpushx(key, value);

    if (seconds == null) {
      seconds = this.defaultExpireTime;
    }

    // 判断插入成功
    if (result > 0 && seconds > 0) {
      await this.expireInSide(key, seconds);
    }

    return result;
  }
}
