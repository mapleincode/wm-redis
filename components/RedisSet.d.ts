import { RedisBase } from "./RedisBase";
import { type ScanOptions } from "../type";
/**
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-23 18:08:05
 */
declare class RedisSet extends RedisBase {
    /**
     * 向集合添加一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    sAdd(key: string, members: string | string[], seconds?: number): Promise<number>;
    /**
     * 获取集合的成员数
     * @param key
     */
    sCard(key: string): Promise<number>;
    /**
       * 返回 set 成员数量
       * @param key ke
       * @param member 成员
       * @returns
       */
    sIsMember(key: string, member: string): Promise<number>;
    /**
     * 返回所有给定集合的并集
     * @param sourceKey
     * @param otherKeys
     */
    sUnion(sourceKey: string, otherKeys: string | string[]): Promise<string[]>;
    /**
     * 返回集合中一个或多个随机数
     * @param key
     * @param count
     */
    sRandMember(key: string, count: number): Promise<string[]>;
    /**
     * 返回集合中的所有成员
     * @param key
     */
    sMembers(key: string): Promise<string[]>;
    /**
     * 返回给定所有集合的交集
     * @param sourceKey
     * @param otherKeys
     */
    sInter(sourceKey: string, otherKeys: string | string[]): Promise<string[]>;
    /**
     * 移除集合中一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    sRem(key: string, members: string | string[], seconds?: number): Promise<number>;
    /**
     * 将 member 元素从 source 集合移动到 destination 集合
     * @param source
     * @param destination
     * @param member
     */
    sMove(source: string, destination: string, member: any): Promise<number>;
    /**
     * Redis S diff store 命令 - 返回给定所有集合的差集并存储在 destination 中
     * @param destination 存储的 Set
     * @param sourceKey 源 Set
     * @param otherKeys 对比的 Sets
     * @param seconds
     */
    sDiffStore(destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number>;
    /**
     * 返回给定所有集合的差集
     * @param sourceKey
     * @param otherKeys
     */
    sDiff(sourceKey: string, otherKeys: string | string[]): Promise<string[]>;
    /**
     * 迭代集合中的元素
     * @param key
     * @param cursor
     * @param options
     */
    sScan(key: string, cursor: number, options?: ScanOptions): Promise<[cursor: string, elements: string[]]>;
    /**
     * 返回给定所有集合的交集并存储在 destination 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    sInterStore(destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number>;
    /**
     * 所有给定集合的并集存储在 destination 集合中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    sUnionStore(destination: string, sourceKey: string, otherKeys: string | string[], seconds?: number): Promise<number>;
    /**
     * 移除并返回集合中的一个随机元素
     * @param key
     * @param count
     * @param seconds
     */
    sPop(key: string, count: number, seconds?: number): Promise<string[]>;
}
export default RedisSet;
