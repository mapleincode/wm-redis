export interface VRedisOptions {
    keyHeader?: string;
    defaultExpireTime?: number;
    defaultTimeout?: number;
    throwExpireError?: boolean;
    defaultRetryTimes?: number;
    defaultRetryDelaySeconds?: number;
}
export type keyInterpreter = (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
export interface RangByLexOptions {
    offset?: number;
    count?: number;
}
export interface ScanOptions {
    pattern?: string;
    count?: number;
}
export declare enum RangeArgs {
    WITH_SCORES = "WITHSCORES",
    LIMIT = "LIMIT",
    BY_SCORE = "BYSCORE",
    REV = "REV",
    BY_LEX = "BYLEX"
}
export interface RangeOptions {
    withScores?: boolean;
    byScore?: boolean;
    byLex?: boolean;
    rev?: boolean;
    offset?: number;
    count?: number;
}
export interface MultiOptions {
    pipeline: boolean;
}
export interface Command {
    command: string[];
    keyIndexes?: number[];
}
export interface LockOptions {
    blocking?: boolean;
    seconds?: number;
    timeout?: number;
    maxRetryTimes?: number;
    retryDelaySeconds?: number;
}
