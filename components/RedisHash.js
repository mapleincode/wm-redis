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
exports.RedisHash = void 0;
const RedisBase_1 = require("./RedisBase");
class RedisHash extends RedisBase_1.RedisBase {
    /**
     * 同时将多个 field-value (域-值)对设置到哈希表 key 中。
     * @param key
     * @param args
     * @param seconds
     * @constructor
     */
    HMSet(key, args, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hmset(key, args);
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
     * 将哈希表 key 中的字段 field 的值设为 value 。
     * @param key
     * @param field
     * @param value
     * @param seconds
     * @constructor
     */
    HSet(key, field, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hset(key, { [field]: value });
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
     * 获取所有给定字段的值
     * @param key
     * @param fields
     * @constructor
     */
    HMGet(key, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.hmget(key, fields);
        });
    }
    /**
     * 获取在哈希表中指定 key 的所有字段和值
     * @param key
     * @constructor
     */
    HGetAll(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.hgetall(key);
        });
    }
    /**
     * 获取存储在哈希表中指定字段的值
     * @param key
     * @param field
     * @constructor
     */
    HGet(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.hget(key, field);
        });
    }
    /**
     * 查看哈希表 key 中，指定的字段是否存在。
     * @param key
     * @param field
     */
    hExists(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.hexists(key, field);
        });
    }
    /**
     * 为哈希表 key 中的指定字段的整数值加上增量 increment 。
     * @param key
     * @param field
     * @param increment
     * @param seconds
     * @constructor
     */
    HIncrBy(key, field, increment, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hincrby(key, field, increment);
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
     * 获取哈希表中字段的数量
     * @param key
     * @constructor
     */
    HLen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hlen(key);
            return result;
        });
    }
    /**
     * 删除一个或多个哈希表字段
     * @param key
     * @param fields
     * @constructor
     */
    HDel(key, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.hdel(key, fields);
        });
    }
    /**
     * 获取哈希表中所有值
     * @param key
     * @constructor
     */
    HVals(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hvals(key);
            return result;
        });
    }
    /**
     * 为哈希表 key 中的指定字段的浮点数值加上增量 increment 。
     * @param key
     * @param field
     * @param increment
     * @param seconds
     * @constructor
     */
    HIncrByFloat(key, field, increment, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hincrbyfloat(key, field, increment);
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
     * 获取所有哈希表中的字段
     * @param key
     * @param subKey
     * @param value
     * @param seconds
     * @constructor
     */
    HKeys(key, subKey, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const keys = yield this.redis.hkeys(key);
            return keys.map(key => this.removeKeyHeader(key));
        });
    }
    /**
     * 只有在字段 field 不存在时，设置哈希表字段的值。
     * @param key
     * @param field
     * @param value
     * @param seconds
     * @constructor
     */
    HSetNX(key, field, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.hsetnx(key, field, value);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
}
exports.RedisHash = RedisHash;
