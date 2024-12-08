import { exists } from "@std/fs";

export const TEST_SIGNAL = "AOC_TEST";

export function buildInputFolder(year: number, day: number): string {
    return `inputs/${year}/day${day.toString().padStart(2, '0')}`;
}

export function buildSolutionFolder(year: number): string {
    return `solutions/${year}`;
}

export function buildSolutionFile(year: number, day: number): string {
    return `${buildSolutionFolder(year)}/${day.toString().padStart(2, '0')}.ts`;
}

export async function readInput(year: number, day: number): Promise<string> {
    const isTest = Deno.env.get(TEST_SIGNAL) === "true";
    const folder = buildInputFolder(year, day);

    const file = isTest ? `${folder}/test-input.txt` : `${folder}/input.txt`;
    if (!await exists(file)) {
        throw new Error(`Input file not found: ${file}`);
    }

    return Deno.readTextFile(file);
}
