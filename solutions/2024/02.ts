// Advent of Code 2024 Day 2
import { parseLines, parseLineNumbers } from '@utils/parsers.ts';
import { skipSolution } from '@utils/exporters.ts';

export async function solve(input: string): Promise<[unknown, unknown]> {
    return [await solution1(input), await solution2(input)];
}

function solution1(input: string): Promise<unknown> | unknown {
    const lines = parseLineNumbers(input);
    return lines.map((line) => isSafe(line, 3)).filter((safe) => safe).length;
}

function solution2(input: string): Promise<unknown> | unknown {
    const lines = parseLineNumbers(input);
    return lines.map((line) => isSafeByIter(line, 3)).filter((safe) => safe).length;
}

function isSafe(input: number[], maxDiff: number): boolean {
    const dir = direction(input[0], input[1]);
    for (let i = 1; i < input.length; i++) {
        const a = input[i - 1];
        const b = input[i];
        const diff = Math.abs(a - b);
        if (direction(a, b) !== dir || diff > maxDiff || diff <= 0) {
            return false;
        }
    }
    return true;
}

const direction = (a: number, b: number) => a - b > 0 ? 1 : -1;

function isSafeByIter(input: number[], maxDiff: number): boolean {
    if (isSafe(input, maxDiff)) {
        return true;
    }

    for (let i = 0; i < input.length; i++) {
        if (isSafe(input.filter((_, index) => index != i), maxDiff)) {
            return true;
        }
    }

    return false;
}