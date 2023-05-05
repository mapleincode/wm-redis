/**
 * @Author: maple
 * @Date: 2023-02-23 18:41:21
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 09:59:10
 */
import { RedisBase } from "./RedisBase";
import { type LockOptions } from "../type";
import { sleep } from "../utils";
import { v4 } from "uuid";

export class RedisAdvanced extends RedisBase {
  /**
   *
   * @param {string} key
   * @param {*} json
   * @param seconds
   * @returns
   */
  async setJSON (key: string, json: any, seconds?: number): Promise<void> {
    const jsonStr = JSON.stringify(json);
    await this.getVRedis().getRedisString().set(key, jsonStr, seconds);
  }

  /**
   * 获取 json 数据
   * @param {string} key key
   * @returns {object} data
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getJSON (key: string): Promise<Object | null> {
    const value = await this.getVRedis().getRedisString().get(key);
    if (value === null) {
      return value;
    }
    try {
      return JSON.parse(value);
    } catch (err) {
      throw new Error("value 无法格式化");
    }
  }

  /**
   * 利用 incr 的锁
   * @param key
   * @param options
   */
  async lock (key: string, options: { blocking: true } & LockOptions): Promise<true>;
  async lock (key: string, options: undefined | ({ blocking: undefined | false } & LockOptions)): Promise<boolean>;
  async lock (key: string): Promise<boolean>;
  async lock (key: string, options?: LockOptions): Promise<boolean>;
  async lock (key: string, options?: LockOptions): Promise<boolean> {
    key = "lock:" + key;
    const redisString = this.getVRedis().getRedisString();

    const incrValue = await redisString.incr(key, options?.seconds);
    if (incrValue === 1) {
      return true;
    }

    if ((options?.blocking) === true) {
      const timeout = options?.timeout;
      let maxRetryTimes = options?.maxRetryTimes;
      let retryDelaySeconds = options?.retryDelaySeconds;

      if (retryDelaySeconds == null) {
        retryDelaySeconds = this.defaultRetryDelaySeconds;
      }

      if (maxRetryTimes == null) {
        if (timeout != null) {
          maxRetryTimes = Math.floor(timeout / retryDelaySeconds);
        } else {
          maxRetryTimes = this.defaultRetryTimes;
        }
      }

      let times = 0;
      while (times <= maxRetryTimes) {
        times++;

        await sleep(retryDelaySeconds);
        const result = await redisString.incr(key, options?.seconds);
        if (result === 1) {
          return true;
        }
      }
      throw new Error("Get lock timeout");
    } else {
      return false;
    }
  }

  /**
   * 释放锁
   * @param key
   */
  async unlock (key: string): Promise<void> {
    key = "lock:" + key;
    await this.getVRedis().getRedisKey().delete(key);
  }

  /**
   * 除了通过 incr 还会添加一个 key 映射。防止因为操作时间过长，导致删除了后续操作新建的 key 的值。
   * 会返回一个 uuid，用于删除
   * @param key
   * @param options
   * @return string 用于删除的 uuid
   */
  async lockWithValue (key: string, options: { blocking: true } & LockOptions): Promise<string>;
  async lockWithValue (key: string, options: undefined | { blocking?: false } & LockOptions): Promise<string | false>;
  async lockWithValue (key: string, options?: LockOptions): Promise<string | false> {
    const result = await this.lock(key, options);

    const valueKey = "lock:value" + key;

    if (result) {
      const uuid = v4();
      await this.getVRedis().set(valueKey, uuid, options?.seconds);
      return uuid;
    }
    return result;
  }

  /**
   * 通过 lockWithValue 返回的 uuid 进行删除
   * 如果 uuid 和保存的 uuid 不符合（说明 lock 已被其他占有），则不做操作
   * @param key
   * @param value
   */
  async unlockWithValue (key: string, value: string): Promise<void> {
    const valueKey = "lock:value" + key;
    const cacheValue = await this.getVRedis().get(valueKey);

    if (cacheValue === value) {
      await this.unlock(key);
    }
  }
}
