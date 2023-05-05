import type VRedis from "../VRedis";
import type Redis from "ioredis";
import { type RedisConfig } from "../RedisConfig";
export declare class RedisBase {
    readonly redis: Redis;
    readonly options: RedisConfig;
    readonly vRedis: VRedis;
    readonly keyHeader: string;
    readonly defaultExpireTime: number;
    readonly defaultTimeout: number;
    readonly throwExpireError: boolean;
    readonly defaultRetryTimes: number;
    readonly defaultRetryDelaySeconds: number;
    constructor(vRedis: VRedis);
    getVRedis(): VRedis;
    getRedis(): Redis;
    /**
       * 设置过期时间(内部调用)
       * @param {string} newKey 已经转换过的 key
       * @param {number} time 过期时间，默认 60s
       */
    expireInSide(newKey: string, time?: number): Promise<number>;
    /**
       * 获取原始 key
       * @param {string} orgKey 原始 key
       * @returns {string} newKey 附加 keyHeader 之后的 key
       */
    addKeyHeader(orgKey?: string): string;
    /**
     * 批量获取 Key
     * @param args
     */
    mAddKeyHeader(args: Record<string, any>): Record<string, any>;
    /**
     * 把 db key 转换成 orgKey
     * @param dbKey
     */
    removeKeyHeader(dbKey: string): string;
}
