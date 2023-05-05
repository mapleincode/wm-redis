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
exports.RedisBase = void 0;
class RedisBase {
    constructor(vRedis) {
        this.vRedis = vRedis;
        this.redis = vRedis.getRedis();
        this.options = vRedis.getOptions();
        this.keyHeader = this.options.keyHeader;
        this.defaultExpireTime = this.options.defaultExpireTime;
        this.defaultTimeout = this.options.defaultTimeout;
        this.throwExpireError = this.options.throwExpireError;
        this.defaultRetryTimes = this.options.defaultRetryTimes;
        this.defaultRetryDelaySeconds = this.options.defaultRetryDelaySeconds;
    }
    getVRedis() {
        return this.vRedis;
    }
    getRedis() {
        return this.redis;
    }
    /**
       * 设置过期时间(内部调用)
       * @param {string} newKey 已经转换过的 key
       * @param {number} time 过期时间，默认 60s
       */
    expireInSide(newKey, time) {
        return __awaiter(this, void 0, void 0, function* () {
            if (time == null) {
                time = this.defaultExpireTime;
            }
            if (!this.throwExpireError) {
                try {
                    return yield this.redis.expire(newKey, time);
                }
                catch (err) {
                    return 1;
                }
            }
            return yield this.redis.expire(newKey, time);
        });
    }
    /**
       * 获取原始 key
       * @param {string} orgKey 原始 key
       * @returns {string} newKey 附加 keyHeader 之后的 key
       */
    addKeyHeader(orgKey = "") {
        return this.keyHeader + orgKey;
    }
    /**
     * 批量获取 Key
     * @param args
     */
    mAddKeyHeader(args) {
        const newArgs = {};
        for (const key of Object.keys(args)) {
            newArgs[this.addKeyHeader(key)] = args[key];
        }
        return newArgs;
    }
    /**
     * 把 db key 转换成 orgKey
     * @param dbKey
     */
    removeKeyHeader(dbKey) {
        return dbKey.replace(this.keyHeader, "");
    }
}
exports.RedisBase = RedisBase;
