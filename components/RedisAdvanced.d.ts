/**
 * @Author: maple
 * @Date: 2023-02-23 18:41:21
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 09:59:10
 */
import { RedisBase } from "./RedisBase";
import { type LockOptions } from "../type";
export declare class RedisAdvanced extends RedisBase {
    /**
     *
     * @param {string} key
     * @param {*} json
     * @param seconds
     * @returns
     */
    setJSON(key: string, json: any, seconds?: number): Promise<void>;
    /**
     * 获取 json 数据
     * @param {string} key key
     * @returns {object} data
     */
    getJSON(key: string): Promise<Object | null>;
    /**
     * 利用 incr 的锁
     * @param key
     * @param options
     */
    lock(key: string, options: {
        blocking: true;
    } & LockOptions): Promise<true>;
    lock(key: string, options: undefined | ({
        blocking: undefined | false;
    } & LockOptions)): Promise<boolean>;
    lock(key: string): Promise<boolean>;
    lock(key: string, options?: LockOptions): Promise<boolean>;
    /**
     * 释放锁
     * @param key
     */
    unlock(key: string): Promise<void>;
    /**
     * 除了通过 incr 还会添加一个 key 映射。防止因为操作时间过长，导致删除了后续操作新建的 key 的值。
     * 会返回一个 uuid，用于删除
     * @param key
     * @param options
     * @return string 用于删除的 uuid
     */
    lockWithValue(key: string, options: {
        blocking: true;
    } & LockOptions): Promise<string>;
    lockWithValue(key: string, options: undefined | {
        blocking?: false;
    } & LockOptions): Promise<string | false>;
    /**
     * 通过 lockWithValue 返回的 uuid 进行删除
     * 如果 uuid 和保存的 uuid 不符合（说明 lock 已被其他占有），则不做操作
     * @param key
     * @param value
     */
    unlockWithValue(key: string, value: string): Promise<void>;
}
