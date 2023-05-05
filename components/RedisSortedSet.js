"use strict";
// noinspection SpellCheckingInspection
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
exports.RedisSortedSet = void 0;
const RedisBase_1 = require("./RedisBase");
const type_1 = require("../type");
const { BY_LEX, REV, BY_SCORE, WITH_SCORES, LIMIT } = type_1.RangeArgs;
class RedisSortedSet extends RedisBase_1.RedisBase {
    /**
     * Redis Zrevrank 命令;返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
     * @param key
     * @param member
     */
    zRevRank(key, member) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.zrevrank(key, member);
        });
    }
    /**
     * Redis Zlexcount 命令; 在有序集合中计算指定字典区间内成员数量
     * @param key
     * @param min
     * @param max
     */
    zLexCount(key, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.zlexcount(key, min, max);
        });
    }
    /**
     * Redis Zunionstore 命令; 计算给定的一个或多个有序集的并集，并存储在新的 key 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    zUnionStore(destination, sourceKey, otherKeys, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            destination = this.addKeyHeader(destination);
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            const result = yield this.redis.zunionstore(destination, sourceKey, otherKeys);
            if (seconds == null) {
                seconds = this.defaultTimeout;
            }
            if (seconds > 0) {
                yield this.expireInSide(destination, seconds);
            }
            return result;
        });
    }
    /**
     * Redis Zremrangebyrank 命令; 移除有序集合中给定的排名区间的所有成员
     * @param key
     * @param start
     * @param stop
     */
    zRemRangeByRank(key, start, stop) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zremrangebyrank(key, start, stop);
            return yield result;
        });
    }
    /**
     * Redis Zcard 命令; 获取有序集合的成员数
     * @param key
     */
    zCard(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zcard(key);
            return yield result;
        });
    }
    /**
     * Redis Zrem 命令; 移除有序集合中的一个或多个成员
     * @param key
     * @param members
     * @param seconds
     */
    zRem(key, members, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(members)) {
                members = [members];
            }
            const result = yield this.redis.zrem(this.addKeyHeader(key), members);
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
     * Redis Zinterstore 命令; 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
     * @param destination
     * @param sourceKey
     * @param otherKeys
     * @param seconds
     */
    zInterStore(destination, sourceKey, otherKeys, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(otherKeys)) {
                otherKeys = [otherKeys];
            }
            destination = this.addKeyHeader(destination);
            sourceKey = this.addKeyHeader(sourceKey);
            otherKeys = otherKeys.map(key => this.addKeyHeader(key));
            const result = yield this.redis.zinterstore(destination, sourceKey, otherKeys);
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
     * Redis Zrank 命令; 返回有序集合中指定成员的索引
     * @param key
     * @param member
     * @param seconds
     */
    zRank(key, member, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = yield this.redis.zrank(key, member);
            if (seconds == null) {
                seconds = this.defaultTimeout;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return result;
        });
    }
    /**
     * Redis Zincrby 命令;有序集合中对指定成员的分数加上增量 increment
     * @param key
     * @param increment
     * @param member
     * @param seconds
     */
    zIncrBy(key, increment, member, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zincrby(key, increment, member);
            if (seconds == null) {
                seconds = this.defaultTimeout;
            }
            if (seconds > 0) {
                yield this.expireInSide(member, seconds);
            }
            return yield result;
        });
    }
    /**
     * Redis Zrangebyscore 命令；通过分数返回有序集合指定区间内的成员
     * @param key
     * @param min
     * @param max
     */
    zRangeByScore(key, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zrangebyscore(key, min, max);
            return yield result;
        });
    }
    /**
     * Redis Zrangebylex 命令; 通过字典区间返回有序集合的成员
     * @param key
     * @param min
     * @param max
     * @param options
     */
    zRangeByLex(key, min, max, options) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            let result;
            const offset = options === null || options === void 0 ? void 0 : options.offset;
            const count = options === null || options === void 0 ? void 0 : options.count;
            if (offset != null && count != null) {
                result = yield this.redis.zrangebylex(key, min, max, "LIMIT", offset, count);
            }
            else {
                result = yield this.redis.zrangebylex(key, min, max);
            }
            return result;
        });
    }
    /**
     * Redis Zscore 命令;返回有序集中，成员的分数值
     * @param key
     * @param member
     */
    zScore(key, member) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zscore(key, member);
            return yield result;
        });
    }
    /**
     * Redis Zremrangebyscore 命令; 移除有序集合中给定的分数区间的所有成员
     * @param key
     * @param min
     * @param max
     */
    zRemRangeByScore(key, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zremrangebyscore(key, min, max);
            return yield result;
        });
    }
    /**
     * Redis Zscan 命令; 迭代有序集合中的元素（包括元素成员和元素分值）
     * @param key
     * @param cursor
     * @param options
     */
    zScan(key, cursor, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = options === null || options === void 0 ? void 0 : options.pattern;
            const count = options === null || options === void 0 ? void 0 : options.count;
            let result;
            if (pattern == null) {
                if (count == null) {
                    result = yield this.redis.zscan(this.addKeyHeader(key), cursor);
                }
                else {
                    result = yield this.redis.zscan(this.addKeyHeader(key), cursor, "COUNT", count);
                }
            }
            else {
                if (count == null) {
                    result = yield this.redis.zscan(this.addKeyHeader(key), cursor, "MATCH", pattern);
                }
                else {
                    result = yield this.redis.zscan(this.addKeyHeader(key), cursor, "MATCH", pattern, "COUNT", count);
                }
            }
            return result;
        });
    }
    /**
     * Redis Zrevrangebyscore 命令; 返回有序集中指定分数区间内的成员，分数从高到低排序
     * @param key
     * @param min
     * @param max
     */
    zRevRangeByScore(key, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zrevrangebyscore(key, min, max);
            return yield result;
        });
    }
    /**
     * Redis Zremrangebylex 命令; 移除有序集合中给定的字典区间的所有成员
     * @param key
     * @param min
     * @param max
     */
    zRemRangeByLex(key, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.zremrangebylex(key, min, max);
        });
    }
    /**
     * Redis Zrevrange 命令  返回有序集中指定区间内的成员，通过索引，分数从高到底
     * @param key
     * @param start
     * @param stop
     */
    zRevRange(key, start, stop) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.zrevrange(key, start, stop);
        });
    }
    /**
     * Redis Zrange 命令; 通过索引区间返回有序集合成指定区间内的成员
     * @param key
     * @param min
     * @param max
     * @param options
     */
    zRange(key, min, max, options) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const withScores = options === null || options === void 0 ? void 0 : options.withScores;
            const byScore = options === null || options === void 0 ? void 0 : options.byScore;
            const byLex = options === null || options === void 0 ? void 0 : options.byLex;
            const rev = options === null || options === void 0 ? void 0 : options.byScore;
            const offset = options === null || options === void 0 ? void 0 : options.offset;
            const count = options === null || options === void 0 ? void 0 : options.count;
            let result;
            if (byScore === true) {
                if (withScores === true) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE, REV, WITH_SCORES);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE, WITH_SCORES);
                    }
                }
                else if ((count != null) && (offset != null)) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE, REV, LIMIT, offset, count);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE, LIMIT, offset, count);
                    }
                }
                else {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE, REV);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_SCORE);
                    }
                }
            }
            else if (byLex === true) {
                if (withScores === true) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_LEX, REV, WITH_SCORES);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_LEX, WITH_SCORES);
                    }
                }
                else if ((count != null) && (offset != null)) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_LEX, REV, LIMIT, offset, count);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_LEX, LIMIT, offset, count);
                    }
                }
                else {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, BY_LEX, REV);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, BY_LEX);
                    }
                }
            }
            else {
                if (withScores === true) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, REV, WITH_SCORES);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, WITH_SCORES);
                    }
                }
                else if ((count != null) && (offset != null)) {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, REV, LIMIT, offset, count);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max, LIMIT, offset, count);
                    }
                }
                else {
                    if (rev === true) {
                        result = yield this.redis.zrange(key, min, max, REV);
                    }
                    else {
                        result = yield this.redis.zrange(key, min, max);
                    }
                }
            }
            return result;
        });
    }
    /**
     * Redis Zcount 命令; 计算在有序集合中指定区间分数的成员数
     * @param key
     * @param min
     * @param max
     * @param seconds
     */
    zCount(key, min, max, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zcount(key, min, max);
            if (seconds == null) {
                seconds = this.defaultTimeout;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return yield result;
        });
    }
    /**
     * Redis Zadd 命令; 向有序集合添加一个或多个成员，或者更新已存在成员的分数
     * @param key
     * @param values
     * @param seconds
     */
    zAdd(key, values, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            const result = this.redis.zadd(key, values);
            if (seconds == null) {
                seconds = this.defaultTimeout;
            }
            if (seconds > 0) {
                yield this.expireInSide(key, seconds);
            }
            return yield result;
        });
    }
}
exports.RedisSortedSet = RedisSortedSet;
