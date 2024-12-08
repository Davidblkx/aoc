import { writeError, writeSuccess, writeWarning } from '@utils/console.ts';
import { exists, ensureDir } from '@std/fs';
import { buildInputFolder, buildSolutionFile, buildSolutionFolder } from '@utils/inputs.ts';

export async function run(args: string[]): Promise<void> {
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

  await setup(year, day);
}

export function help(): string {
  return `
    Usage: setup [year] <day>

    Options:
      year    The year of the advent of code challenge, defaults to the current year
      day     The day of the advent of code challenge, day must be between 1 and 25

    Description:
        This command will setup the boilerplate for the advent of code challenge for the given year and day
    `.trim();
}

function errorMissingArgument(): void {
  writeError('Missing valid day argument');
  console.log(help());
  Deno.exit(1);
}

async function setup(year: number, day: number): Promise<void> {
  writeSuccess(`Setting up boilerplate for year ${year} day ${day}`);

  const inputFolder = buildInputFolder(year, day);
  const outputFolder = buildSolutionFolder(year);

  await ensureDir(inputFolder);
  await ensureDir(outputFolder);

  await writeIfMissing(`${inputFolder}/test-input.txt`, '');
  await writeIfMissing(`${inputFolder}/test-expected.txt`, '');
  await writeIfMissing(buildSolutionFile(year, day), buildTemplate(year, day));
  
  const inputContent = await fetchInput(year, day);
  await writeIfMissing(`${inputFolder}/input.txt`, inputContent);
}

async function writeIfMissing(file: string, content: string): Promise<void> {
  if (await exists(file)) {
    writeWarning(`File already exists: ${file}`);
  } else {
    await Deno.writeTextFile(file, content);
  }
}

async function fetchInput(year: number, day: number): Promise<string> {
  const session = Deno.env.get('SESSION_COOKIE');
  if (!session) {
    writeWarning('No session cookie found, input file will be empty');
    return '';
  }

  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      cookie: `session=${session}`
    }
  });

  if (!response.ok) {
    writeError(`Failed to fetch input from ${url}`);
    console.log(await response.text());
    return '';
  }
  
  return await response.text();
}

function buildTemplate(year: number, day: number): string {
  return `
// Advent of Code ${year} Day ${day}
export async function solve(input: string): Promise<string> {
  throw new Error('Not implemented');
}
`.trim();
}