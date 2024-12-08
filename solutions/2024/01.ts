// Advent of Code 2024 Day 1
import { parseSplitLines } from '@utils/parsers.ts';

export async function solve(input: string): Promise<[unknown, unknown]> {
    return [await solution1(input), await solution2(input)];
}

function solution1(input: string): Promise<unknown> | unknown {
    const [left, right] = parseSplitLines(input, /\s+/);

    const l1 = left.map(Number).sort((a, b) => a - b);
    const l2 = right.map(Number).sort((a, b) => a - b);

    return l1.map((v, i) => Math.abs(v - l2[i])).reduce((a, b) => a + b, 0);
}

function solution2(input: string): Promise<unknown> | unknown {
    const [left, right] = parseSplitLines(input, /\s+/);

    const l1 = left.map(Number);
    const l2 = right.map(Number);

    return l1.map((v) => v * l2.filter(v2 => v2 === v).length).reduce((a, b) => a + b, 0);
}
