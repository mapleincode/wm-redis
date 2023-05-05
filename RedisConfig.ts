import { type VRedisOptions } from "./type";

export class RedisConfig {
  private readonly config?: VRedisOptions;
  private readonly $keyHeader: string;
  private readonly $defaultExpireTime: number;
  private readonly $defaultTimeout: number;
  private readonly $throwExpireError: boolean;
  private readonly $defaultRetryTimes: number;
  private readonly $defaultRetryDelaySeconds: number;
  constructor (props?: VRedisOptions) {
    this.config = props;

    const keyHeader = this.config?.keyHeader;
    const defaultExpireTime = this.config?.defaultExpireTime;
    const defaultTimeout = this.config?.defaultTimeout;
    const throwExpireError = this.config?.throwExpireError;
    const defaultRetryTimes = this.config?.defaultRetryTimes;
    const defaultRetryDelaySeconds = this.config?.defaultRetryDelaySeconds;

    this.$keyHeader = keyHeader == null ? "" : keyHeader;
    this.$defaultTimeout = defaultTimeout == null ? 600 : defaultTimeout;
    this.$defaultRetryTimes = defaultRetryTimes == null ? 250 : defaultRetryTimes;
    this.$defaultExpireTime = defaultExpireTime == null ? 600 : defaultExpireTime;
    this.$throwExpireError = throwExpireError == null ? false : throwExpireError;
    this.$defaultRetryDelaySeconds = defaultRetryDelaySeconds == null ? 2 : defaultRetryDelaySeconds;
  }

  get keyHeader (): string {
    return this.$keyHeader;
  }

  get defaultExpireTime (): number {
    return this.$defaultExpireTime;
  }

  get defaultTimeout (): number {
    return this.$defaultTimeout;
  }

  get throwExpireError (): boolean {
    return this.$throwExpireError;
  }

  get defaultRetryTimes (): number {
    return this.$defaultRetryTimes;
  }

  get defaultRetryDelaySeconds (): number {
    return this.$defaultRetryDelaySeconds;
  }
}
