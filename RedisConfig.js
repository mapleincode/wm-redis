"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = void 0;
class RedisConfig {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f;
        this.config = props;
        const keyHeader = (_a = this.config) === null || _a === void 0 ? void 0 : _a.keyHeader;
        const defaultExpireTime = (_b = this.config) === null || _b === void 0 ? void 0 : _b.defaultExpireTime;
        const defaultTimeout = (_c = this.config) === null || _c === void 0 ? void 0 : _c.defaultTimeout;
        const throwExpireError = (_d = this.config) === null || _d === void 0 ? void 0 : _d.throwExpireError;
        const defaultRetryTimes = (_e = this.config) === null || _e === void 0 ? void 0 : _e.defaultRetryTimes;
        const defaultRetryDelaySeconds = (_f = this.config) === null || _f === void 0 ? void 0 : _f.defaultRetryDelaySeconds;
        this.$keyHeader = keyHeader == null ? "" : keyHeader;
        this.$defaultTimeout = defaultTimeout == null ? 600 : defaultTimeout;
        this.$defaultRetryTimes = defaultRetryTimes == null ? 250 : defaultRetryTimes;
        this.$defaultExpireTime = defaultExpireTime == null ? 600 : defaultExpireTime;
        this.$throwExpireError = throwExpireError == null ? false : throwExpireError;
        this.$defaultRetryDelaySeconds = defaultRetryDelaySeconds == null ? 2 : defaultRetryDelaySeconds;
    }
    get keyHeader() {
        return this.$keyHeader;
    }
    get defaultExpireTime() {
        return this.$defaultExpireTime;
    }
    get defaultTimeout() {
        return this.$defaultTimeout;
    }
    get throwExpireError() {
        return this.$throwExpireError;
    }
    get defaultRetryTimes() {
        return this.$defaultRetryTimes;
    }
    get defaultRetryDelaySeconds() {
        return this.$defaultRetryDelaySeconds;
    }
}
exports.RedisConfig = RedisConfig;
