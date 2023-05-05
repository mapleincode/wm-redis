"use strict";
/*
 * @Author: maple
 * @Date: 2023-02-23 17:35:07
 * @LastEditors: maple
 * @LastEditTime: 2023-02-24 11:18:01
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const RedisKey_1 = require("./components/RedisKey");
const RedisAdvanced_1 = require("./components/RedisAdvanced");
const RedisSet_1 = __importDefault(require("./components/RedisSet"));
const RedisString_1 = __importDefault(require("./components/RedisString"));
const RedisList_1 = require("./components/RedisList");
const RedisHash_1 = require("./components/RedisHash");
const RedisSortedSet_1 = require("./components/RedisSortedSet");
const RedisTransaction_1 = require("./components/RedisTransaction");
const RedisConfig_1 = require("./RedisConfig");
class VRedis {
    constructor(config, options) {
        this.$redis = new ioredis_1.default(config);
        this.$options = new RedisConfig_1.RedisConfig(options);
        this.$redisKey = new RedisKey_1.RedisKey(this);
        this.$redisSet = new RedisSet_1.default(this);
        this.$redisAdvanced = new RedisAdvanced_1.RedisAdvanced(this);
        this.$redisString = new RedisString_1.default(this);
        this.$redisList = new RedisList_1.RedisList(this);
        this.$redisHash = new RedisHash_1.RedisHash(this);
        this.$redisSortedSet = new RedisSortedSet_1.RedisSortedSet(this);
        this.$redisTransaction = new RedisTransaction_1.RedisTransaction(this);
    }
    /**
     * 获取 ioredis 对象
     */
    getRedis() {
        return this.$redis;
    }
    /**
     * 获取 options 参数
     */
    getOptions() {
        return this.$options;
    }
    /**
     * 获取 redis-key api
     */
    getRedisKey() {
        return this.$redisKey;
    }
    /**
     * 获取 redis-set api
     */
    getRedisSet() {
        return this.$redisSet;
    }
    /**
     * 获取 redis-advanced
     */
    getRedisAdvanced() {
        return this.$redisAdvanced;
    }
    /**
     * 获取 redis-string
     */
    getRedisString() {
        return this.$redisString;
    }
    /**
     * 获取 redis-list
     */
    getRedisList() {
        return this.$redisList;
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$redisKey.delete(key);
        });
    }
    expire(key, time = 60) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$redisKey.expire(key, time);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$redisString.get(key);
        });
    }
    set(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$redisString.set(key, value, seconds);
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getJSON(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.$redisAdvanced.getJSON(key);
        });
    }
    setJSON(key, json, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$redisAdvanced.setJSON(key, json, seconds);
        });
    }
}
exports.default = VRedis;
