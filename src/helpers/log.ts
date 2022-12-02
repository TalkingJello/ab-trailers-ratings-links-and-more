import { NAME } from "../constants";

export function log(...rest: any[]) {
  console.log(`[${NAME}]`, ...rest);
}

export function logError(...rest: any[]) {
  console.error(`[${NAME}]`, ...rest);
}
