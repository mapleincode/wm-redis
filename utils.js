"use strict";
// export function setHeader (header: string) {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {
//     if (descriptor.value != null) {
//       const method = descriptor.value;
//
//       descriptor.value = function () {
//         const args = [...arguments];
//         const key = args[0] as string;
//         args[0] = header + key;
//         return method.apply(this, args as any);
//       };
//     }
//   };
// }
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
exports.sleep = exports.testTypeList = exports.testTypeX = exports.testType = exports.toJson = void 0;
function toJson(argsIndex) {
    let index = 1;
    if (argsIndex !== undefined) {
        index = argsIndex;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target, propertyKey, descriptor) {
        if (descriptor.value != null) {
            const method = descriptor.value;
            descriptor.value = function (...args) {
                const data = args[index];
                args[index] = JSON.stringify(data);
                return method.apply(this, args);
            };
        }
    };
}
exports.toJson = toJson;
// eslint-disable-next-line @typescript-eslint/ban-types
function testType(s, fields) {
    if (typeof fields === "string") {
        fields = [fields];
    }
    return fields.every(field => field in s);
}
exports.testType = testType;
// eslint-disable-next-line @typescript-eslint/ban-types
function testTypeX(s, field) {
    return field in s;
}
exports.testTypeX = testTypeX;
// eslint-disable-next-line @typescript-eslint/ban-types
function testTypeList(items, fields) {
    if (items.length === 0) {
        return true;
    }
    if (!Array.isArray(fields)) {
        fields = [fields];
    }
    for (const item of items) {
        const test = fields.every(field => field in item);
        if (!test) {
            return false;
        }
    }
    return true;
}
exports.testTypeList = testTypeList;
function sleep(seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            setTimeout(() => {
                resolve(1);
            }, seconds);
        });
    });
}
exports.sleep = sleep;
