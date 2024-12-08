import { buildSolutionFile, readDateFromArgs, readInput, readTestSolution } from '@utils/inputs.ts';
import { writeError, writeSuccess } from '@utils/console.ts';
import { writeClipboard } from '@utils/os.ts';
import { SKIP } from '@utils/exporters.ts';

interface SolutionModule {
    solve: (input: string) => Promise<[unknown, unknown]>;
}

export async function run(args: string[]) {
    const [year, day] = readDateFromArgs(args);
    const input = await readInput(year, day, args.includes('--test'));

    const module: SolutionModule = await import('../' + buildSolutionFile(year, day));

    try {
        const t0 = performance.now();
        const [s1, s2] = await module.solve(input);
        const t1 = performance.now();

        const [expected1, expected2] = await readTestSolution(year, day);

        console.log('Solution took ' + (t1 - t0).toFixed(3) + ' milliseconds');
        handleSolution(1, s1, expected1, args.includes('--test'));
        handleSolution(2, s2, expected2, args.includes('--test'));
    } catch (error) {
        console.log('Error running solution:');
        console.error(error);
    }
}

export function help(): string {
    return `
    Usage: solution [year] <day> --test

    Options:
      year    The year of the advent of code challenge, defaults to the current year
      day     The day of the advent of code challenge, day must be between 1 and 25

    Description:
        This command will run the solution for the advent of code challenge for the given year and day
        If the --test flag is provided, it will run the test cases for the solution and match the expected output
    `.trim();
}

export function handleSolution(index: number, s: unknown, expected: string, isTest: boolean) {
    if (s === SKIP) {
        return;
    }

    console.log(`Solution ${index}:`);
    console.log(s);

    if (!isTest && typeof s === 'string') {
        writeClipboard(s);
        return;
    }

    console.log('Expected:');
    console.log(expected);

    if (s === expected) {
        writeSuccess('Solution is correct');
    } else {
        writeError('Solution is incorrect');
    }
}
