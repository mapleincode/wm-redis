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
/*
 * @Author: maple
 * @Date: 2023-02-23 18:07:55
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:08:47
 */
const RedisBase_1 = require("./RedisBase");
/**
 * @Author: maple
 * @Date: 2023-02-23 18:03:11
 * @LastEditors: maple
 * @LastEditTime: 2023-02-23 18:08:05
 */
class RedisSet extends RedisBase_1.RedisBase {
    /**
     * 向集合添加一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    sAdd(key, members, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(members)) {
                members = [members];
            }
            const result = yield this.redis.sadd(this.addKeyHeader(key), members);
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
     * 获取集合的成员数
     * @param key
     */
    sCard(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.scard(this.addKeyHeader(key));
        });
    }
    /**
       * 返回 set 成员数量
       * @param key ke
       * @param member 成员
       * @returns
       */
    sIsMember(key, member) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.sismember(key, member);
        });
    }
    /**
     * 返回所有给定集合的并集
     * @param sourceKey
     * @param otherKeys
     */
    sUnion(sourceKey, otherKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            return yield this.redis.sunion(sourceKey, ...otherKeys);
        });
    }
    /**
     * 返回集合中一个或多个随机数
     * @param key
     * @param count
     */
    sRandMember(key, count) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.srandmember(this.addKeyHeader(key), count);
        });
    }
    /**
     * 返回集合中的所有成员
     * @param key
     */
    sMembers(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.smembers(this.addKeyHeader(key));
        });
    }
    /**
     * 返回给定所有集合的交集
     * @param sourceKey
     * @param otherKeys
     */
    sInter(sourceKey, otherKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            return yield this.redis.sinter(sourceKey, ...otherKeys);
        });
    }
    /**
     * 移除集合中一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    sRem(key, members, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(members)) {
                members = [members];
            }
            const result = yield this.redis.srem(this.addKeyHeader(key), members);
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
     * 将 member 元素从 source 集合移动到 destination 集合
     * @param source
     * @param destination
     * @param member
     */
    sMove(source, destination, member) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.smove(this.addKeyHeader(source), this.addKeyHeader(destination), member);
        });
    }
    /**
     * Redis S diff store 命令 - 返回给定所有集合的差集并存储在 destination 中
     * @param destination 存储的 Set
     * @param sourceKey 源 Set
     * @param otherKeys 对比的 Sets
     * @param seconds
     */
    sDiffStore(destination, sourceKey, otherKeys, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            destination = this.addKeyHeader(destination);
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            const result = yield this.redis.sdiffstore(destination, sourceKey, ...otherKeys);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(destination, seconds);
            }
            return result;
        });
    }
    /**
     * 返回给定所有集合的差集
     * @param sourceKey
     * @param otherKeys
     */
    sDiff(sourceKey, otherKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            return yield this.redis.sdiff(sourceKey, ...otherKeys);
        });
    }
    /**
     * 迭代集合中的元素
     * @param key
     * @param cursor
     * @param options
     */
    sScan(key, cursor, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = options === null || options === void 0 ? void 0 : options.pattern;
            const count = options === null || options === void 0 ? void 0 : options.count;
            let result;
            if (pattern == null) {
                if (count == null) {
                    result = yield this.redis.sscan(this.addKeyHeader(key), cursor);
                }
                else {
                    result = yield this.redis.sscan(this.addKeyHeader(key), cursor, "COUNT", count);
                }
            }
            else {
                if (count == null) {
                    result = yield this.redis.sscan(this.addKeyHeader(key), cursor, "MATCH", pattern);
                }
                else {
                    result = yield this.redis.sscan(this.addKeyHeader(key), cursor, "MATCH", pattern, "COUNT", count);
                }
            }
            return result;
        });
    }
    /**
     * 返回给定所有集合的交集并存储在 destination 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    sInterStore(destination, sourceKey, otherKeys, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            destination = this.addKeyHeader(destination);
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            const result = yield this.redis.sinterstore(destination, sourceKey, otherKeys);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(destination, seconds);
            }
            return result;
        });
    }
    /**
     * 所有给定集合的并集存储在 destination 集合中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    sUnionStore(destination, sourceKey, otherKeys, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            destination = this.addKeyHeader(destination);
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            const result = yield this.redis.sunionstore(destination, sourceKey, otherKeys);
            if (seconds == null) {
                seconds = this.defaultExpireTime;
            }
            if (seconds > 0) {
                yield this.expireInSide(destination, seconds);
            }
            return result;
        });
    }
    /**
     * 移除并返回集合中的一个随机元素
     * @param key
     * @param count
     * @param seconds
     */
    sPop(key, count, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.redis.spop(this.addKeyHeader(key), count);
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
exports.default = RedisSet;
