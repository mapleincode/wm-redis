"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisAdvanced = void 0;
/**
 * @Author: maple
 * @Date: 2023-02-23 18:41:21
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 09:59:10
 */
const RedisBase_1 = require("./RedisBase");
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
class RedisAdvanced extends RedisBase_1.RedisBase {
    /**
     *
     * @param {string} key
     * @param {*} json
     * @param seconds
     * @returns
     */
    setJSON(key, json, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonStr = JSON.stringify(json);
            yield this.getVRedis().getRedisString().set(key, jsonStr, seconds);
        });
    }
    /**
     * 获取 json 数据
     * @param {string} key key
     * @returns {object} data
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    getJSON(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.getVRedis().getRedisString().get(key);
            if (value === null) {
                return value;
            }
            try {
                return JSON.parse(value);
            }
            catch (err) {
                throw new Error("value 无法格式化");
            }
        });
    }
    lock(key, options) {
        return __awaiter(this, void 0, void 0, function* () {
            key = "lock:" + key;
            const redisString = this.getVRedis().getRedisString();
            const incrValue = yield redisString.incr(key, options === null || options === void 0 ? void 0 : options.seconds);
            if (incrValue === 1) {
                return true;
            }
            if ((options === null || options === void 0 ? void 0 : options.blocking) === true) {
                const timeout = options === null || options === void 0 ? void 0 : options.timeout;
                let maxRetryTimes = options === null || options === void 0 ? void 0 : options.maxRetryTimes;
                let retryDelaySeconds = options === null || options === void 0 ? void 0 : options.retryDelaySeconds;
                if (retryDelaySeconds == null) {
                    retryDelaySeconds = this.defaultRetryDelaySeconds;
                }
                if (maxRetryTimes == null) {
                    if (timeout != null) {
                        maxRetryTimes = Math.floor(timeout / retryDelaySeconds);
                    }
                    else {
                        maxRetryTimes = this.defaultRetryTimes;
                    }
                }
                let times = 0;
                while (times <= maxRetryTimes) {
                    times++;
                    yield (0, utils_1.sleep)(retryDelaySeconds);
                    const result = yield redisString.incr(key, options === null || options === void 0 ? void 0 : options.seconds);
                    if (result === 1) {
                        return true;
                    }
                }
                throw new Error("Get lock timeout");
            }
            else {
                return false;
            }
        });
    }
    /**
     * 释放锁
     * @param key
     */
    unlock(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = "lock:" + key;
            yield this.getVRedis().getRedisKey().delete(key);
        });
    }
    lockWithValue(key, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.lock(key, options);
            const valueKey = "lock:value" + key;
            if (result) {
                const uuid = (0, uuid_1.v4)();
                yield this.getVRedis().set(valueKey, uuid, options === null || options === void 0 ? void 0 : options.seconds);
                return uuid;
            }
            return result;
        });
    }
    /**
     * 通过 lockWithValue 返回的 uuid 进行删除
     * 如果 uuid 和保存的 uuid 不符合（说明 lock 已被其他占有），则不做操作
     * @param key
     * @param value
     */
    unlockWithValue(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueKey = "lock:value" + key;
            const cacheValue = yield this.getVRedis().get(valueKey);
            if (cacheValue === value) {
                yield this.unlock(key);
            }
        });
    }
}
exports.RedisAdvanced = RedisAdvanced;
