import { AnyType } from "../types";

export type State = { [k: string]: AnyType };
export type GetState<T> = [T, (v: T) => T];