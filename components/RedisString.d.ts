import { RedisBase } from "./RedisBase";
export declare class RedisKey extends RedisBase {
    /**
     * set key
     * 时间过期时间推荐使用 setEx
     * @param {string} key key
     * @param {string} value value
     * @param seconds
     */
    set(key: string, value: string, seconds?: number): Promise<void>;
    /**
       * 通过 key 获取 value
       * @param {string} key key
       * @returns value
       */
    get(key: string): Promise<string | null>;
    /**
     * 自增
     * @param {string} key key
     * @param seconds
     * @returns {number} value
     */
    incr(key: string, seconds?: number): Promise<number>;
    /**
     * 只有在 key 不存在时设置 key 的值
     * @param key
     * @param data
     * @param seconds
     */
    setNX(key: string, data: any, seconds: number | undefined): Promise<number>;
    /**
     * 返回 key 中字符串值的子字符
     * @param key
     * @param start
     * @param end
     */
    getRange(key: string, start: number, end: number): Promise<string>;
    /**
     * 同时设置一个或多个 key-value 对。
     * @param args
     * @param seconds 可选；设置会导致循环调用 expire 方法导致时间变长
     */
    mSet(args: Record<string, any>, seconds?: number): Promise<"OK">;
    /**
     * 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。
     * @param key
     * @param seconds
     * @param data
     */
    setExpire(key: string, seconds: number, data: any): Promise<"OK">;
    /**
     * 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
     * @param key
     * @param offset
     */
    getBit(key: string, offset: number): Promise<number>;
    /**
     * 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
     * @param key
     * @param offset
     * @param data
     * @param seconds
     */
    setBit(key: string, offset: number, data: any, seconds: number | undefined): Promise<number>;
    /**
     * 将 key 中储存的数字值减一。
     * @param key
     * @param seconds
     */
    decr(key: string, seconds: number | undefined): Promise<number>;
    /**
     * key 所储存的值减去给定的减量值（decrement） 。
     * @param key
     * @param decrement
     * @param seconds
     */
    decrBy(key: string, decrement: number, seconds: number | undefined): Promise<number>;
    /**
     * 返回 key 所储存的字符串值的长度。
     * @param key
     */
    strlen(key: string): Promise<number>;
    /**
     * 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
     * @param args
     * @param seconds 可选；设置会导致循环调用 seconds 方法导致时间变长
     */
    mSetNX(args: Record<string, any>, seconds: number | undefined): Promise<"OK">;
    /**
     * 将 key 所储存的值加上给定的增量值（increment） 。
     * @param key
     * @param increment
     * @param seconds
     */
    incrBy(key: string, increment: number, seconds: number | undefined): Promise<number>;
    /**
     * 将 key 所储存的值加上给定的浮点增量值（increment） 。
     * @param key
     * @param increment
     * @param seconds
     */
    incrByFloat(key: string, increment: number, seconds: number | undefined): Promise<string>;
    /**
     * 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。
     * @param key
     * @param offset
     * @param data
     * @param seconds
     */
    setRange(key: string, offset: number, data: any, seconds: number | undefined): Promise<number>;
    /**
     * 这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。
     * @param key
     * @param milliseconds
     * @param data
     */
    pSetExpire(key: string, milliseconds: number, data: any): Promise<unknown>;
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。
     * @param key
     * @param value
     * @param seconds
     */
    append(key: string, value: any, seconds: number | undefined): Promise<number>;
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
     * @param key
     * @param value
     * @param seconds
     */
    getSet(key: string, value: any, seconds: number | undefined): Promise<string | null>;
    /**
     * 获取所有(一个或多个)给定 key 的值。
     * @param keys
     */
    mGet(keys: string[]): Promise<Array<string | null>>;
}
export default RedisKey;
