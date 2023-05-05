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
       * 删除 key
       * @param {string} key key
       * @returns void
       */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.del(key);
        });
    }
    /**
       * 设置过期时间(外部调用)
       * @param {string} key key
       * @param {number} time 过期时间，默认 60s
       */
    expire(key, time = 60) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            yield this.expireInSide(key, time);
        });
    }
    /**
     * 返回 key 所储存的值的类型。
     * @param key
     */
    type(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.type(key);
        });
    }
    /**
     * 设置 key 的过期时间亿以毫秒计。
     * @param key
     * @param unixTimeMilliseconds
     */
    pExpireAt(key, unixTimeMilliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.pexpireat(key, unixTimeMilliseconds);
        });
    }
    /**
     * 修改 key 的名称
     * @param key
     * @param newKey
     */
    rename(key, newKey) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            newKey = this.addKeyHeader(newKey);
            return yield this.redis.rename(key, newKey);
        });
    }
    /**
     * 移除 key 的过期时间，key 将持久保持。
     * @param key
     */
    persist(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.persist(key);
        });
    }
    /**
     * 将当前数据库的 key 移动到给定的数据库 db 当中。
     * @param key
     * @param db
     */
    move(key, db) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.move(key, db);
        });
    }
    /**
     * 从当前数据库中随机返回一个 key 。
     */
    randomKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield this.redis.randomkey();
            if (key === null) {
                return key;
            }
            return this.removeKeyHeader(key);
        });
    }
    /**
     * 序列化给定 key ，并返回被序列化的值
     * @param key
     */
    dump(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.dump(key);
        });
    }
    /**
     * 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
     * @param key
     */
    ttl(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.ttl(key);
        });
    }
    /**
     * 以毫秒为单位返回 key 的剩余的过期时间。
     * @param key
     */
    pttl(key) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.pttl(key);
        });
    }
    /**
     * 仅当 newkey 不存在时，将 key 改名为 newkey 。
     * @param key
     * @param newKey
     */
    renamenx(key, newKey) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            newKey = this.addKeyHeader(newKey);
            return yield this.redis.renamenx(key, newKey);
        });
    }
    /**
     * 检查给定 key 是否存在。
     * @param keys
     */
    exists(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            keys = keys.map(key => this.addKeyHeader(key));
            return yield this.redis.exists(keys);
        });
    }
    /**
     * EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置过期时间。 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
     * @param key
     * @param unixTimeSeconds
     */
    expireat(key, unixTimeSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            key = this.addKeyHeader(key);
            return yield this.redis.expireat(key, unixTimeSeconds);
        });
    }
    /**
     * 查找所有符合给定模式( pattern)的 key 。
     * @param pattern
     */
    keys(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.redis.keys(pattern);
            return keys.map(key => this.removeKeyHeader(key));
        });
    }
}
exports.RedisKey = RedisKey;
