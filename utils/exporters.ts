export const SKIP = Symbol('skip');

export function skipSolution(_input?: unknown): unknown {
    return SKIP;
}