import { buildSolutionFile, readDateFromArgs, readInput, readTestSolution } from '@utils/inputs.ts';
import { writeError, writeSuccess } from '@utils/console.ts';
import { writeClipboard } from '@utils/os.ts';

interface SolutionModule {
    solve: (input: string) => Promise<unknown>;
}

export async function run(args: string[]) {
    const [year, day] = readDateFromArgs(args);
    const input = await readInput(year, day, args.includes('--test'));

    const module: SolutionModule = await import('../' + buildSolutionFile(year, day));

    try {
        const t0 = performance.now();
        const solution = await module.solve(input);
        const t1 = performance.now();

        console.log('Solution took ' + (t1 - t0).toFixed(3) + ' milliseconds');
        if (args.includes('--test')) {
            const expected = await readTestSolution(year, day);
            console.log('Expected:\n', expected);
            console.log('Received:\n', solution);
            if (solution === expected) {
                writeSuccess('Test passed');
            } else {
                writeError('Test failed');
            }
        } else {
            console.log(solution);
            if (typeof solution === 'string' || typeof solution === 'number') {
                await writeClipboard(solution.toString().trim());
                writeSuccess('Output copied to clipboard');
            }
        }
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
