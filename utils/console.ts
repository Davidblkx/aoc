export function writeSuccess(message: string) {
    console.log("%c" + message, "color: green");
}

export function writeError(message: string) {
    console.log("%c" + message, "color: red");
}

export function writeWarning(message: string) {
    console.log("%c" + message, "color: orange");
}
