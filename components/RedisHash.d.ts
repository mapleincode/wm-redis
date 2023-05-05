import { RedisBase } from "./RedisBase";
export declare class RedisHash extends RedisBase {
    /**
     * 同时将多个 field-value (域-值)对设置到哈希表 key 中。
     * @param key
     * @param args
     * @param seconds
     * @constructor
     */
    HMSet(key: string, args: Record<string, string>, seconds: number): Promise<"OK">;
    /**
     * 将哈希表 key 中的字段 field 的值设为 value 。
     * @param key
     * @param field
     * @param value
     * @param seconds
     * @constructor
     */
    HSet(key: string, field: string, value: any, seconds: number): Promise<number>;
    /**
     * 获取所有给定字段的值
     * @param key
     * @param fields
     * @constructor
     */
    HMGet(key: string, fields: string[]): Promise<Array<string | null>>;
    /**
     * 获取在哈希表中指定 key 的所有字段和值
     * @param key
     * @constructor
     */
    HGetAll(key: string): Promise<Record<string, string>>;
    /**
     * 获取存储在哈希表中指定字段的值
     * @param key
     * @param field
     * @constructor
     */
    HGet(key: string, field: string): Promise<string | null>;
    /**
     * 查看哈希表 key 中，指定的字段是否存在。
     * @param key
     * @param field
     */
    hExists(key: string, field: string): Promise<number>;
    /**
     * 为哈希表 key 中的指定字段的整数值加上增量 increment 。
     * @param key
     * @param field
     * @param increment
     * @param seconds
     * @constructor
     */
    HIncrBy(key: string, field: string, increment: number, seconds: number): Promise<number>;
    /**
     * 获取哈希表中字段的数量
     * @param key
     * @constructor
     */
    HLen(key: string): Promise<number>;
    /**
     * 删除一个或多个哈希表字段
     * @param key
     * @param fields
     * @constructor
     */
    HDel(key: string, fields: string[]): Promise<number>;
    /**
     * 获取哈希表中所有值
     * @param key
     * @constructor
     */
    HVals(key: string): Promise<string[]>;
    /**
     * 为哈希表 key 中的指定字段的浮点数值加上增量 increment 。
     * @param key
     * @param field
     * @param increment
     * @param seconds
     * @constructor
     */
    HIncrByFloat(key: string, field: string, increment: number, seconds: number): Promise<string>;
    /**
     * 获取所有哈希表中的字段
     * @param key
     * @param subKey
     * @param value
     * @param seconds
     * @constructor
     */
    HKeys(key: string, subKey: string, value: any, seconds: number): Promise<string[]>;
    /**
     * 只有在字段 field 不存在时，设置哈希表字段的值。
     * @param key
     * @param field
     * @param value
     * @param seconds
     * @constructor
     */
    HSetNX(key: string, field: string, value: any, seconds: number): Promise<number>;
}
