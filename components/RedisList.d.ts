import { RedisBase } from "./RedisBase";
export declare class RedisList extends RedisBase {
    /**
     * 通过索引获取列表中的元素
     * @param key
     * @param index
     */
    lIndex(key: string, index: number): Promise<string | null>;
    /**
     * 列表中添加一个或多个值
     * @param key
     * @param value
     * @param seconds
     */
    rPush(key: string, value: any | any[], seconds?: number): Promise<number>;
    /**
     * 获取列表指定范围内的元素
     * @param key
     * @param start
     * @param stop
     */
    lRange(key: string, start: number, stop: number): Promise<string[]>;
    /**
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     * @param source
     * @param destination
     */
    rPopLPush(source: string, destination: string): Promise<string>;
    /**
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     * @param source
     * @param destination
     * @param timeout
     */
    brPopLPush(source: string, destination: string, timeout?: number): Promise<string | null>;
    /**
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param keys
     * @param timeout
     */
    blPop(keys: string | string[], timeout?: number): Promise<[string, string] | null>;
    /**
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param keys
     * @param timeout
     */
    brPop(keys: string | string[], timeout?: number): Promise<[string, string] | null>;
    /**
     * 移除列表元素
     * @param key
     * @param count
     * @param element
     * @param seconds
     */
    lRem(key: string, count: number, element: any, seconds?: number): Promise<number>;
    /**
     * 获取列表长度
     * @param key
     */
    lLen(key: string): Promise<number>;
    /**
     * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
     * @param key
     * @param start
     * @param stop
     * @param seconds
     */
    ltrim(key: string, start: number, stop: number, seconds?: number): Promise<"OK">;
    /**
       * 移出并获取列表的第一个元素
       * @param key
       * @param value
       * @param seconds 默认不设置过期时间
       */
    lPop(key: string, value: any | any[], seconds?: number): Promise<string | null>;
    /**
     * 将一个或多个值插入到已存在的列表头部
     * @param key
     * @param value
     * @param seconds
     */
    lPushX(key: string, value: any | any[], seconds?: number): Promise<number>;
    /**
     * 在列表的元素前或者后插入元素
     * @param key
     * @param pivot
     * @param element
     * @param seconds
     * @constructor
     */
    LInsert(key: string, pivot: any, element: any, seconds?: number): Promise<number>;
    /**
       * 移除并获取列表最后一个元素
       * @param key
       * @param value
       * @param seconds 默认不设置过期时间
       */
    rPop(key: string, seconds?: number): Promise<string | null>;
    /**
     * 通过索引设置列表元素的值
     * @param key
     * @param index
     * @param element
     * @param seconds
     */
    lSet(key: string, index: number, element: any, seconds?: number): Promise<"OK">;
    /**
     * 将一个或多个值插入到列表头部
     * @param key
     * @param value
     * @param seconds
     */
    lPush(key: string, value: any | any[], seconds?: number): Promise<number>;
    /**
     * 为已存在的列表添加值
     * @param key
     * @param value
     * @param seconds
     */
    rPushX(key: string, value: any | any[], seconds?: number): Promise<number>;
}
