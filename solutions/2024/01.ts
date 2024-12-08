// Advent of Code 2024 Day 1
import { parseLines } from '@utils/parsers.ts';
import { skipSolution } from '@utils/exporters.ts';

export async function solve(input: string): Promise<[unknown, unknown]> {
    return [await solution1(input), await solution2(input)];
}

function solution1(input: string): Promise<unknown> | unknown {
    const lines = parseLines(input);
    return skipSolution(lines);
}

function solution2(input: string): Promise<unknown> | unknown {
    const lines = parseLines(input);
    return skipSolution(lines);
}
