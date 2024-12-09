// Advent of Code 2024 Day 3
export async function solve(input: string): Promise<[unknown, unknown]> {
    return [await solution1(input), await solution2(input)];
}

function solution1(input: string): Promise<unknown> | unknown {
    return calcMulOperations(input);
}

function solution2(input: string): Promise<unknown> | unknown {
    let stream = input;
    let enabledInput = '';

    while (true) {
        let index = stream.indexOf('don\'t()');
        if (index === -1) {
            enabledInput += stream;
            break;
        }

        enabledInput += input.slice(0, index);
        stream = stream.slice(index + 8);
        index = stream.indexOf('do()');
        if (index === -1) {
            break;
        }
        stream = stream.slice(index + 4);
    }

    return calcMulOperations(enabledInput);
}

function calcMulOperations(input: string): number {
    const reg = /mul\((\d+,\d+)\)/gm;
    const matches = input.matchAll(reg);
    let sum = 0;
    
    for (const m of matches) {
        const [a, b] = m[1].split(',').map(Number);
        sum += a * b;
    }

    return sum;
}