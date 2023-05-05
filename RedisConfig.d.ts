import { type VRedisOptions } from "./type";
export declare class RedisConfig {
    private readonly config?;
    private readonly $keyHeader;
    private readonly $defaultExpireTime;
    private readonly $defaultTimeout;
    private readonly $throwExpireError;
    private readonly $defaultRetryTimes;
    private readonly $defaultRetryDelaySeconds;
    constructor(props?: VRedisOptions);
    get keyHeader(): string;
    get defaultExpireTime(): number;
    get defaultTimeout(): number;
    get throwExpireError(): boolean;
    get defaultRetryTimes(): number;
    get defaultRetryDelaySeconds(): number;
}
