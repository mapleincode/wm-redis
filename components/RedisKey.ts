/*
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:35:20
 */
import { RedisBase } from "./RedisBase";

export class RedisKey extends RedisBase {
  /**
     * 删除 key
     * @param {string} key key
     * @returns void
     */
  async delete (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.del(key);
  }

  /**
     * 设置过期时间(外部调用)
     * @param {string} key key
     * @param {number} time 过期时间，默认 60s
     */
  async expire (key: string, time: number = 60): Promise<void> {
    key = this.addKeyHeader(key);
    await this.expireInSide(key, time);
  }

  /**
   * 返回 key 所储存的值的类型。
   * @param key
   */
  async type (key: string): Promise<string> {
    key = this.addKeyHeader(key);
    return await this.redis.type(key);
  }

  /**
   * 设置 key 的过期时间亿以毫秒计。
   * @param key
   * @param unixTimeMilliseconds
   */
  async pExpireAt (key: string, unixTimeMilliseconds: number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.pexpireat(key, unixTimeMilliseconds);
  }

  /**
   * 修改 key 的名称
   * @param key
   * @param newKey
   */
  async rename (key: string, newKey: string): Promise<"OK"> {
    key = this.addKeyHeader(key);
    newKey = this.addKeyHeader(newKey);
    return await this.redis.rename(key, newKey);
  }

  /**
   * 移除 key 的过期时间，key 将持久保持。
   * @param key
   */
  async persist (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.persist(key);
  }

  /**
   * 将当前数据库的 key 移动到给定的数据库 db 当中。
   * @param key
   * @param db
   */
  async move (key: string, db: string | number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.move(key, db);
  }

  /**
   * 从当前数据库中随机返回一个 key 。
   */
  async randomKey (): Promise<string | null> {
    const key = await this.redis.randomkey();

    if (key === null) {
      return key;
    }
    return this.removeKeyHeader(key);
  }

  /**
   * 序列化给定 key ，并返回被序列化的值
   * @param key
   */
  async dump (key: string): Promise<string> {
    key = this.addKeyHeader(key);
    return await this.redis.dump(key);
  }

  /**
   * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
   * @param key
   */
  async ttl (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.ttl(key);
  }

  /**
   * 以毫秒为单位返回 key 的剩余的过期时间。
   * @param key
   */
  async pttl (key: string): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.pttl(key);
  }

  /**
   * 仅当 newkey 不存在时，将 key 改名为 newkey 。
   * @param key
   * @param newKey
   */
  async renamenx (key: string, newKey: string): Promise<number> {
    key = this.addKeyHeader(key);
    newKey = this.addKeyHeader(newKey);
    return await this.redis.renamenx(key, newKey);
  }

  /**
   * 检查给定 key 是否存在。
   * @param keys
   */
  async exists (keys: string[]): Promise<number> {
    keys = keys.map(key => this.addKeyHeader(key));
    return await this.redis.exists(keys);
  }

  /**
   * EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
   * @param key
   * @param unixTimeSeconds
   */
  async expireat (key: string, unixTimeSeconds: number): Promise<number> {
    key = this.addKeyHeader(key);
    return await this.redis.expireat(key, unixTimeSeconds);
  }

  /**
   * 查找所有符合给定模式( pattern)的 key 。
   * @param pattern
   */
  async keys (pattern: string): Promise<string[]> {
    const keys = await this.redis.keys(pattern);
    return keys.map(key => this.removeKeyHeader(key));
  }
}
