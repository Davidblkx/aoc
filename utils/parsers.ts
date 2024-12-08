export function parseLines(input: string): string[] {
    return input.trim().split('\n');
}

/**
 * 1  2 
 * 3  4  --> [[1, 3, 5], [2, 4, 6]]
 * 5  6
 * 
 */
export function parseSplitLines(input: string, separator: string | RegExp): string[][] {
    const lists: string[][] = [];
    const lines = parseLines(input);
    lines.forEach((line) => {
        const values = line.trim().split(separator);
        values.forEach((value, i) => {
            if (!lists[i]) {
                lists[i] = [];
            }
            lists[i].push(value);
        });
    });
    return lists;
}

/**
 * 1  2 
 * 3  4  --> [[1, 2], [3, 4]]
 * 
 */
export function parseLineNumbers(input: string): number[][] {
    return parseLines(input).map((line) => line.trim().split(' ').map((value) => parseInt(value, 10)));
}