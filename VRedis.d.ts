import Redis, { type RedisOptions } from "ioredis";
import { RedisKey } from "./components/RedisKey";
import { RedisAdvanced } from "./components/RedisAdvanced";
import RedisSet from "./components/RedisSet";
import { type VRedisOptions } from "./type";
import RedisString from "./components/RedisString";
import { RedisList } from "./components/RedisList";
import { RedisConfig } from "./RedisConfig";
declare class VRedis {
    private readonly $redis;
    private readonly $options;
    private readonly $redisKey;
    private readonly $redisAdvanced;
    private readonly $redisSet;
    private readonly $redisString;
    private readonly $redisList;
    private readonly $redisHash;
    private readonly $redisSortedSet;
    private readonly $redisTransaction;
    constructor(config: RedisOptions, options: VRedisOptions | undefined);
    /**
     * 获取 ioredis 对象
     */
    getRedis(): Redis;
    /**
     * 获取 options 参数
     */
    getOptions(): RedisConfig;
    /**
     * 获取 redis-key api
     */
    getRedisKey(): RedisKey;
    /**
     * 获取 redis-set api
     */
    getRedisSet(): RedisSet;
    /**
     * 获取 redis-advanced
     */
    getRedisAdvanced(): RedisAdvanced;
    /**
     * 获取 redis-string
     */
    getRedisString(): RedisString;
    /**
     * 获取 redis-list
     */
    getRedisList(): RedisList;
    delete(key: string): Promise<number>;
    expire(key: string, time?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, seconds?: number): Promise<void>;
    getJSON(key: string): Promise<Object | null>;
    setJSON(key: string, json: any, seconds?: number): Promise<void>;
}
export default VRedis;
