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
exports.RedisTransaction = void 0;
const RedisBase_1 = require("./RedisBase");
const utils_1 = require("../utils");
class RedisTransaction extends RedisBase_1.RedisBase {
    /**
     * pipeline （非事务）
     */
    pipeline() {
        return this.redis.pipeline();
    }
    /**
     * 事务，直接执行
     * Command 对象的 key 会自动加 key Header (unknown[][] 不会添加 key)
     * @param commands
     */
    multiWithExec(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, utils_1.testType)(commands, "command")) {
                commands = this.createCommands(commands);
            }
            return yield this.redis.multi(commands).exec();
        });
    }
    /**
     * 返回 ChainableCommander 对象
     * 可以手动拼接参数（key 默认不会添加 KeyHeader)
     * 最后 exec() 执行
     */
    multi() {
        return this.redis.multi();
    }
    /**
     * 创建 Command 对象，主要弥补 key 需要添加 keyHeader 的情况
     * @param command 参数数组
     * @param keyIndexes 定义那些是 key，需要添加 keyHeader， 默认 [1]
     */
    createCommand(command, keyIndexes) {
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
    createCommands(commands) {
        const resultCommands = [];
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
exports.RedisTransaction = RedisTransaction;
