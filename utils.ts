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

import { type keyInterpreter } from "./type";

export function toJson (argsIndex?: number): keyInterpreter {
  let index = 1;
  if (argsIndex !== undefined) {
    index = argsIndex;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void {
    if (descriptor.value != null) {
      const method = descriptor.value;

      descriptor.value = function (...args: any[]) {
        const data = args[index];
        args[index] = JSON.stringify(data);
        return method.apply(this, args as any);
      };
    }
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function testType<D extends Object, E extends D> (s: D, fields: string[] | string): s is E {
  if (typeof fields === "string") {
    fields = [fields];
  }

  return fields.every(field => field in s);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function testTypeX<D extends Object, E extends D> (s: D, field: string): s is E {
  return field in s;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function testTypeList<D extends Object, E extends D> (items: D[], fields: string | string[]): items is E[] {
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

export async function sleep (seconds: number): Promise<number> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, seconds);
  });
}
