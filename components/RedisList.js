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
exports.RedisList = void 0;
const RedisBase_1 = require("./RedisBase");
class RedisList extends RedisBase_1.RedisBase {
    /**
     * 通过索引获取列表中的元素
     * @param key
     * @param index
     */
    lIndex(key, index) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.lindex(key, index);
        });
    }
    /**
     * 列表中添加一个或多个值
     * @param key
     * @param value
     * @param seconds
     */
    rPush(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.rpush(key, value);
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
     * 获取列表指定范围内的元素
     * @param key
     * @param start
     * @param stop
     */
    lRange(key, start, stop) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.lrange(key, start, stop);
        });
    }
    /**
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     * @param source
     * @param destination
     */
    rPopLPush(source, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            source = this.addKeyHeader(source);
            destination = this.addKeyHeader(destination);
            return yield this.redis.rpoplpush(source, destination);
        });
    }
    /**
     * 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
     * @param source
     * @param destination
     * @param timeout
     */
    brPopLPush(source, destination, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            source = this.addKeyHeader(source);
            destination = this.addKeyHeader(destination);
            if (timeout == null) {
                timeout = this.defaultTimeout;
            }
            return yield this.redis.brpoplpush(source, destination, timeout);
        });
    }
    /**
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param keys
     * @param timeout
     */
    blPop(keys, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(keys)) {
                keys = keys.map(key => this.addKeyHeader(key));
            }
            else {
                keys = this.addKeyHeader(keys);
            }
            if (timeout == null) {
                timeout = this.defaultTimeout;
            }
            return yield this.redis.blpop(keys, timeout);
        });
    }
    /**
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
     * @param keys
     * @param timeout
     */
    brPop(keys, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(keys)) {
                keys = keys.map(key => this.addKeyHeader(key));
            }
            else {
                keys = this.addKeyHeader(keys);
            }
            if (timeout == null) {
                timeout = this.defaultTimeout;
            }
            return yield this.redis.brpop(keys, timeout);
        });
    }
    /**
     * 移除列表元素
     * @param key
     * @param count
     * @param element
     * @param seconds
     */
    lRem(key, count, element, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.lrem(key, count, element);
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
     * 获取列表长度
     * @param key
     */
    lLen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.llen(key);
        });
    }
    /**
     * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
     * @param key
     * @param start
     * @param stop
     * @param seconds
     */
    ltrim(key, start, stop, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.ltrim(key, start, stop);
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
       * 移出并获取列表的第一个元素
       * @param key
       * @param value
       * @param seconds 默认不设置过期时间
       */
    lPop(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.lpop(key, value);
            // if (seconds == null) {
            //   seconds = this.defaultExpireTime;
            // }
            if (seconds != null && seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 将一个或多个值插入到已存在的列表头部
     * @param key
     * @param value
     * @param seconds
     */
    lPushX(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.lpushx(key, value);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (result > 0 && seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 在列表的元素前或者后插入元素
     * @param key
     * @param pivot
     * @param element
     * @param seconds
     * @constructor
     */
    LInsert(key, pivot, element, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.linsert(key, "BEFORE", pivot, element);
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
       * 移除并获取列表最后一个元素
       * @param key
       * @param value
       * @param seconds 默认不设置过期时间
       */
    rPop(key, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.rpop(key);
            // if (seconds == null) {
            //   seconds = this.defaultExpireTime;
            // }
            if (seconds != null && seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * 通过索引设置列表元素的值
     * @param key
     * @param index
     * @param element
     * @param seconds
     */
    lSet(key, index, element, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.lset(key, index, element);
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
     * 将一个或多个值插入到列表头部
     * @param key
     * @param value
     * @param seconds
     */
    lPush(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.lpush(key, value);
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
     * 为已存在的列表添加值
     * @param key
     * @param value
     * @param seconds
     */
    rPushX(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.rpushx(key, value);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            // 判断插入成功
            if (result > 0 && seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
}
exports.RedisList = RedisList;
