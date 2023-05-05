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
exports.RedisKey = void 0;
/*
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:35:20
 */
const RedisBase_1 = require("./RedisBase");
class RedisKey extends RedisBase_1.RedisBase {
    /**
     * set key
     * 时间过期时间推荐使用 setEx
     * @param {string} key key
     * @param {string} value value
     * @param seconds
     */
    set(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            yield this.getRedis().set(key, value);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
        });
    }
    /**
       * 通过 key 获取 value
       * @param {string} key key
       * @returns value
       */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.get(key);
        });
    }
    /**
     * 自增
     * @param {string} key key
     * @param seconds
     * @returns {number} value
     */
    incr(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.incr(key);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 只有在 key 不存在时设置 key 的值
     * @param key
     * @param data
     * @param seconds
     */
    setNX(key, data, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.setnx(key, data);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (result > 0 && seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 返回 key 中字符串值的子字符
     * @param key
     * @param start
     * @param end
     */
    getRange(key, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.getrange(key, start, end);
        });
    }
    /**
     * 同时设置一个或多个 key-value 对。
     * @param args
     * @param seconds 可选；设置会导致循环调用 expire 方法导致时间变长
     */
    mSet(args, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArgs = this.mAddKeyHeader(args);
            const result = yield this.redis.mset(newArgs);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds !== undefined && seconds > 0) {
                for (const key of Object.keys(newArgs)) {
                    yield this.expireInSide(key, seconds);
                }
            }
            return result;
        });
    }
    /**
     * 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。
     * @param key
     * @param seconds
     * @param data
     */
    setExpire(key, seconds, data) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.setex(key, seconds, data);
        });
    }
    /**
     * 对 key 所储存的字符串值，获取指定偏移量上的位(bit)。
     * @param key
     * @param offset
     */
    getBit(key, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.getbit(key, offset);
        });
    }
    /**
     * 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)。
     * @param key
     * @param offset
     * @param data
     * @param seconds
     */
    setBit(key, offset, data, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.setbit(key, offset, data);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 将 key 中储存的数字值减一。
     * @param key
     * @param seconds
     */
    decr(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.decr(key);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * key 所储存的值减去给定的减量值（decrement） 。
     * @param key
     * @param decrement
     * @param seconds
     */
    decrBy(key, decrement, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.decrby(key, decrement);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 返回 key 所储存的字符串值的长度。
     * @param key
     */
    strlen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.strlen(key);
        });
    }
    /**
     * 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
     * @param args
     * @param seconds 可选；设置会导致循环调用 seconds 方法导致时间变长
     */
    mSetNX(args, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArgs = this.mAddKeyHeader(args);
            const result = yield this.redis.msetnx(newArgs);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds !== undefined && seconds > 0) {
                for (const key of Object.keys(newArgs)) {
                    try {
                        yield this.expireInSide(key, seconds);
                    }
                    catch (err) {
                    }
                }
            }
            return result;
        });
    }
    /**
     * 将 key 所储存的值加上给定的增量值（increment） 。
     * @param key
     * @param increment
     * @param seconds
     */
    incrBy(key, increment, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.incrby(key, increment);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 将 key 所储存的值加上给定的浮点增量值（increment） 。
     * @param key
     * @param increment
     * @param seconds
     */
    incrByFloat(key, increment, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.incrbyfloat(key, increment);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始。
     * @param key
     * @param offset
     * @param data
     * @param seconds
     */
    setRange(key, offset, data, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.setrange(key, offset, data);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。
     * @param key
     * @param milliseconds
     * @param data
     */
    pSetExpire(key, milliseconds, data) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.psetex(key, milliseconds, data);
        });
    }
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。
     * @param key
     * @param value
     * @param seconds
     */
    append(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.append(key, value);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
     * @param key
     * @param value
     * @param seconds
     */
    getSet(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.getset(key, value);
            // 默认 0 以上设置过期时间，如果小于 0 则无限
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 获取所有(一个或多个)给定 key 的值。
     * @param keys
     */
    mGet(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            keys = keys.map(key => this.addKeyHeader(key));
            return yield this.redis.mget(keys);
        });
    }
}
exports.RedisKey = RedisKey;
exports.default = RedisKey;
