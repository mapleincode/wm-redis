import { type keyInterpreter } from "./type";
export declare function toJson(argsIndex?: number): keyInterpreter;
export declare function testType<D extends Object, E extends D>(s: D, fields: string[] | string): s is E;
export declare function testTypeX<D extends Object, E extends D>(s: D, field: string): s is E;
export declare function testTypeList<D extends Object, E extends D>(items: D[], fields: string | string[]): items is E[];
export declare function sleep(seconds: number): Promise<number>;
