import { isDebug } from '@utils/signals.ts';

export function writeSuccess(message: string) {
    console.log("%c" + message, "color: green");
}

export function writeError(message: string) {
    console.log("%c" + message, "color: red");
}

export function writeWarning(message: string) {
    console.log("%c" + message, "color: orange");
}

// deno-lint-ignore no-explicit-any
export function debug(...args: any[]) {
    if (!isDebug()) {
        return;
    }

    console.log(...args);
}
