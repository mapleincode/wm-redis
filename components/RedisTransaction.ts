import { RedisBase } from "./RedisBase";
import { type ChainableCommander } from "ioredis";
import { type Command } from "../type";
import { testType } from "../utils";

type CommandsUnion = unknown[][] | Command[];

export class RedisTransaction extends RedisBase {
  /**
   * pipeline （非事务）
   */
  pipeline (): ChainableCommander {
    return this.redis.pipeline();
  }

  /**
   * 事务，直接执行
   * Command 对象的 key 会自动加 key Header (unknown[][] 不会添加 key)
   * @param commands
   */
  async multiWithExec (commands: CommandsUnion): Promise<Array<[error: Error | null, result: unknown]> | null> {
    if (testType<CommandsUnion, Command[]>(commands, "command")) {
      commands = this.createCommands(commands);
    }
    return await this.redis.multi(commands).exec();
  }

  /**
   * 返回 ChainableCommander 对象
   * 可以手动拼接参数（key 默认不会添加 KeyHeader)
   * 最后 exec() 执行
   */
  multi (): ChainableCommander {
    return this.redis.multi();
  }

  /**
   * 创建 Command 对象，主要弥补 key 需要添加 keyHeader 的情况
   * @param command 参数数组
   * @param keyIndexes 定义那些是 key，需要添加 keyHeader， 默认 [1]
   */
  createCommand (command: string[], keyIndexes?: number[]): string[] {
    if (keyIndexes == null) {
      keyIndexes = [1];
    }

    for (const keyIndex of keyIndexes) {
      if (keyIndex >= command.length) {
        continue;
      }
      command[keyIndex] = this.addKeyHeader(command[keyIndex]);
    }

    return command;
  }

  /**
   * 根据 Command[] 创建最后已经添加 keyHeader 的命令二层数组
   * @param commands
   */
  createCommands (commands: Command[]): string[][] {
    const resultCommands: string[][] = [];
    for (const command of commands) {
      const commandFields = command.command;
      const keyIndexes = command.keyIndexes == null ? [1] : command.keyIndexes;

      for (const keyIndex of keyIndexes) {
        if (keyIndex >= commandFields.length) {
          continue;
        }
        commandFields[keyIndex] = this.addKeyHeader(commandFields[keyIndex]);
        resultCommands.push(commandFields);
      }
    }
    return resultCommands;
  }
}
