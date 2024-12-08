const signalsMap = {
    isTest: false,
    isDebug: false,
}

export function loadSignals(args: string[]): string[] {
    const signalsIndex: number[] = [];
    for (let i = 0; i < args.length; i++) {
        const v = args[i];
        if (v === '--test' || v === '-t') {
            signalsMap.isTest = true;
            signalsIndex.push(i);
        } else if (v === '--debug' || v === '-d') {
            signalsMap.isDebug = true;
            signalsIndex.push(i);
        }
    }

    return args.filter((_, i) => !signalsIndex.includes(i));
}

export function isTest(): boolean {
    return signalsMap.isTest;
}

export function isDebug(): boolean {
    return signalsMap.isDebug;
}