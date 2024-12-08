import { exists } from '@std/fs';
import { writeError } from './console.ts';

export function buildInputFolder(year: number, day: number): string {
    return `inputs/${year}/day${day.toString().padStart(2, '0')}`;
}

export function buildSolutionFolder(year: number): string {
    return `solutions/${year}`;
}

export function buildSolutionFile(year: number, day: number): string {
    return `${buildSolutionFolder(year)}/${day.toString().padStart(2, '0')}.ts`;
}

export function readDateFromArgs(args: string[]): [number, number] {
    if (args.length === 0) {
        errorMissingArgument();
    }

    const input0 = args[0];
    const year = input0.length === 4 ? parseInt(input0) : new Date().getFullYear();

    const rawDay = input0.length === 4 ? args[1] : input0;
    const day = parseInt(rawDay, 10);
    if (isNaN(day) || day < 1 || day > 25) {
        writeError('Invalid day argument: ' + rawDay);
        errorMissingArgument();
    }

    return [year, day];
}

function errorMissingArgument(): void {
  writeError('Missing valid day argument');
  Deno.exit(1);
}

export async function readInput(year: number, day: number, isTest = false): Promise<string> {
    const folder = buildInputFolder(year, day);

    const file = isTest ? `${folder}/test-input.txt` : `${folder}/input.txt`;
    if (!await exists(file)) {
        throw new Error(`Input file not found: ${file}`);
    }

    return Deno.readTextFile(file);
}

export async function readTestSolution(year: number, day: number): Promise<[string, string]> {
    const folder = buildInputFolder(year, day);

    const file = `${folder}/test-expected.txt`;
    if (!await exists(file)) {
        throw new Error(`Solution file not found: ${file}`);
    }

    return (await Deno.readTextFile(file)).split('\n').filter(e => e !== '###') as [string, string];
}
