import { RedisBase } from "./RedisBase";
import { type ChainableCommander } from "ioredis";
import { type Command } from "../type";
type CommandsUnion = unknown[][] | Command[];
export declare class RedisTransaction extends RedisBase {
    /**
     * pipeline （非事务）
     */
    pipeline(): ChainableCommander;
    /**
     * 事务，直接执行
     * Command 对象的 key 会自动加 key Header (unknown[][] 不会添加 key)
     * @param commands
     */
    multiWithExec(commands: CommandsUnion): Promise<Array<[error: Error | null, result: unknown]> | null>;
    /**
     * 返回 ChainableCommander 对象
     * 可以手动拼接参数（key 默认不会添加 KeyHeader)
     * 最后 exec() 执行
     */
    multi(): ChainableCommander;
    /**
     * 创建 Command 对象，主要弥补 key 需要添加 keyHeader 的情况
     * @param command 参数数组
     * @param keyIndexes 定义那些是 key，需要添加 keyHeader， 默认 [1]
     */
    createCommand(command: string[], keyIndexes?: number[]): string[];
    /**
     * 根据 Command[] 创建最后已经添加 keyHeader 的命令二层数组
     * @param commands
     */
    createCommands(commands: Command[]): string[][];
}
export {};
