import { writeError, writeSuccess, writeWarning } from '@utils/console.ts';
import { exists, ensureDir } from '@std/fs';
import { buildInputFolder, buildSolutionFile, buildSolutionFolder, readDateFromArgs } from '@utils/inputs.ts';

export async function run(args: string[]): Promise<void> {
  const [year, day] = readDateFromArgs(args);
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
export function solve(_input: string): Promise<unknown> {
  throw new Error('Not implemented');
}
`.trim();
}