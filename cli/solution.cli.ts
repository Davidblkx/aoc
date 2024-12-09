import { buildSolutionFile, readDateFromArgs, readInput, readTestSolution } from '@utils/inputs.ts';
import { writeError, writeSuccess } from '@utils/console.ts';
import { writeClipboard } from '@utils/os.ts';
import { SKIP } from '@utils/exporters.ts';
import { isTest } from '@utils/signals.ts';

interface SolutionModule {
    solve: (input: string) => Promise<[unknown, unknown]>;
}

export async function run(args: string[]) {
    const [year, day] = readDateFromArgs(args);
    console.log(`Running solution for ${year} day ${day}`);
    const input = await readInput(year, day);

    const module: SolutionModule = await import('../' + buildSolutionFile(year, day));

    try {
        const t0 = performance.now();
        // TODO: Rewrite it to have 2 separate functions for each part
        const [s1, s2] = await module.solve(input);
        const t1 = performance.now();

        const [expected1, expected2] = await readTestSolution(year, day);

        console.log('Solution took ' + (t1 - t0).toFixed(3) + ' milliseconds');
        handleSolution(1, s1, expected1);
        handleSolution(2, s2, expected2);
    } catch (error) {
        console.log('Error running solution:');
        console.error(error);
    }
}

export function help(): string {
    return `
    Usage: solution [year] <day> --test --debug

    Options:
      year    The year of the advent of code challenge, defaults to the current year
      day     The day of the advent of code challenge, day must be between 1 and 25

    Description:
        This command will run the solution for the advent of code challenge for the given year and day
        If the --test flag is provided, it will run the test cases for the solution and match the expected output
        If the --debug flag is provided, it will print the debug information
    `.trim();
}

export function handleSolution(index: number, s: unknown, expected: string) {
    if (s === SKIP) {
        return;
    }

    console.log(`Solution ${index}:`);
    console.log(s);

    if (!isTest() && (typeof s === 'string' || typeof s === 'number')) {
        writeClipboard(s.toString());
        return;
    }

    if (!isTest()) { return; }

    console.log('Expected:');
    console.log(expected);

    const solutionString = (s && s.toString()) || '';

    if (solutionString === expected) {
        writeSuccess('Solution is correct');
    } else {
        writeError('Solution is incorrect');
    }
}
