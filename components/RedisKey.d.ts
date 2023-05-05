import { RedisBase } from "./RedisBase";
export declare class RedisKey extends RedisBase {
    /**
       * 删除 key
       * @param {string} key key
       * @returns void
       */
    delete(key: string): Promise<number>;
    /**
       * 设置过期时间(外部调用)
       * @param {string} key key
       * @param {number} time 过期时间，默认 60s
       */
    expire(key: string, time?: number): Promise<void>;
    /**
     * 返回 key 所储存的值的类型。
     * @param key
     */
    type(key: string): Promise<string>;
    /**
     * 设置 key 的过期时间亿以毫秒计。
     * @param key
     * @param unixTimeMilliseconds
     */
    pExpireAt(key: string, unixTimeMilliseconds: number): Promise<number>;
    /**
     * 修改 key 的名称
     * @param key
     * @param newKey
     */
    rename(key: string, newKey: string): Promise<"OK">;
    /**
     * 移除 key 的过期时间，key 将持久保持。
     * @param key
     */
    persist(key: string): Promise<number>;
    /**
     * 将当前数据库的 key 移动到给定的数据库 db 当中。
     * @param key
     * @param db
     */
    move(key: string, db: string | number): Promise<number>;
    /**
     * 从当前数据库中随机返回一个 key 。
     */
    randomKey(): Promise<string | null>;
    /**
     * 序列化给定 key ，并返回被序列化的值
     * @param key
     */
    dump(key: string): Promise<string>;
    /**
     * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
     * @param key
     */
    ttl(key: string): Promise<number>;
    /**
     * 以毫秒为单位返回 key 的剩余的过期时间。
     * @param key
     */
    pttl(key: string): Promise<number>;
    /**
     * 仅当 newkey 不存在时，将 key 改名为 newkey 。
     * @param key
     * @param newKey
     */
    renamenx(key: string, newKey: string): Promise<number>;
    /**
     * 检查给定 key 是否存在。
     * @param keys
     */
    exists(keys: string[]): Promise<number>;
    /**
     * EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
     * @param key
     * @param unixTimeSeconds
     */
    expireat(key: string, unixTimeSeconds: number): Promise<number>;
    /**
     * 查找所有符合给定模式( pattern)的 key 。
     * @param pattern
     */
    keys(pattern: string): Promise<string[]>;
}
