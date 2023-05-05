import { RedisBase } from "./RedisBase";
import { type RangByLexOptions, type RangeOptions, type ScanOptions } from "../type";
export declare class RedisSortedSet extends RedisBase {
    /**
     * Redis Zrevrank 命令;返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
     * @param key
     * @param member
     */
    zRevRank(key: string, member: any): Promise<number | null>;
    /**
     * Redis Zlexcount 命令; 在有序集合中计算指定字典区间内成员数量
     * @param key
     * @param min
     * @param max
     */
    zLexCount(key: string, min: number, max: number): Promise<number>;
    /**
     * Redis Zunionstore 命令; 计算给定的一个或多个有序集的并集，并存储在新的 key 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    zUnionStore(destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number>;
    /**
     * Redis Zremrangebyrank 命令; 移除有序集合中给定的排名区间的所有成员
     * @param key
     * @param start
     * @param stop
     */
    zRemRangeByRank(key: string, start: number, stop: number): Promise<number>;
    /**
     * Redis Zcard 命令; 获取有序集合的成员数
     * @param key
     */
    zCard(key: string): Promise<number>;
    /**
     * Redis Zrem 命令; 移除有序集合中的一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    zRem(key: string, members: string | string[], seconds?: number): Promise<number>;
    /**
     * Redis Zinterstore 命令; 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    zInterStore(destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number>;
    /**
     * Redis Zrank 命令; 返回有序集合中指定成员的索引
     * @param key
     * @param member
     * @param seconds
     */
    zRank(key: string, member: any, seconds?: number): Promise<number | null>;
    /**
     * Redis Zincrby 命令;有序集合中对指定成员的分数加上增量 increment
     * @param key
     * @param increment
     * @param member
     * @param seconds
     */
    zIncrBy(key: string, increment: number, member: any, seconds?: number): Promise<string>;
    /**
     * Redis Zrangebyscore 命令；通过分数返回有序集合指定区间内的成员
     * @param key
     * @param min
     * @param max
     */
    zRangeByScore(key: string, min: number, max: number): Promise<string[]>;
    /**
     * Redis Zrangebylex 命令; 通过字典区间返回有序集合的成员
     * @param key
     * @param min
     * @param max
     * @param options
     */
    zRangeByLex(key: string, min: number, max: number, options?: RangByLexOptions): Promise<string[]>;
    /**
     * Redis Zscore 命令;返回有序集中，成员的分数值
     * @param key
     * @param member
     */
    zScore(key: string, member: string): Promise<string | null>;
    /**
     * Redis Zremrangebyscore 命令; 移除有序集合中给定的分数区间的所有成员
     * @param key
     * @param min
     * @param max
     */
    zRemRangeByScore(key: string, min: number, max: number): Promise<number>;
    /**
     * Redis Zscan 命令; 迭代有序集合中的元素（包括元素成员和元素分值）
     * @param key
     * @param cursor
     * @param options
     */
    zScan(key: string, cursor: number, options?: ScanOptions): Promise<[cursor: string, elements: string[]]>;
    /**
     * Redis Zrevrangebyscore 命令; 返回有序集中指定分数区间内的成员，分数从高到低排序
     * @param key
     * @param min
     * @param max
     */
    zRevRangeByScore(key: string, min: number, max: number): Promise<string[]>;
    /**
     * Redis Zremrangebylex 命令; 移除有序集合中给定的字典区间的所有成员
     * @param key
     * @param min
     * @param max
     */
    zRemRangeByLex(key: string, min: number, max: number): Promise<number>;
    /**
     * Redis Zrevrange 命令  返回有序集中指定区间内的成员，通过索引，分数从高到底
     * @param key
     * @param start
     * @param stop
     */
    zRevRange(key: string, start: number, stop: number): Promise<string[]>;
    /**
     * Redis Zrange 命令; 通过索引区间返回有序集合成指定区间内的成员
     * @param key
     * @param min
     * @param max
     * @param options
     */
    zRange(key: string, min: number, max: number, options?: RangeOptions): Promise<string[]>;
    /**
     * Redis Zcount 命令; 计算在有序集合中指定区间分数的成员数
     * @param key
     * @param min
     * @param max
     * @param seconds
     */
    zCount(key: string, min: number, max: number, seconds?: number): Promise<number>;
    /**
     * Redis Zadd 命令; 向有序集合添加一个或多个成员，或者更新已存在成员的分数
     * @param key
     * @param values
     * @param seconds
     */
    zAdd(key: string, values: string | string[], seconds?: number): Promise<number>;
}
