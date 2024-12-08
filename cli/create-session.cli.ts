import { exists } from "@std/fs";
import { readClipboard } from '@utils/os.ts';
import { writeSuccess, writeError } from '@utils/console.ts';

export async function run(args: string[]) {
    const sessionCookie = args[0] || await readClipboard();
    if (!sessionCookie) {
        writeError("Session cookie not defined");
        Deno.exit(1);
    }

    await writeSessionCookie(sessionCookie);
    writeSuccess("Session cookie set successfully");
}

export function help(_args: string[]): string {
    return `
    Usage: create-session [session-cookie]

    Set the session cookie to be used in the requests. This works by adding a line SESSION_COOKIE=cookie to the .env file.
    If the .env file does not exist, it will be created.
    If the session-cookie is not provided, it will be read from the clipboard.
`.trim();
}

async function writeSessionCookie(value: string): Promise<void> {
    let textContent = `SESSION_COOKIE=${value}`;

    if (await exists(".env")) {
        const fileContent = await Deno.readTextFile(".env");

        if (fileContent.includes("SESSION_COOKIE")) {
            textContent = fileContent.replace(/^SESSION_COOKIE=.*$/gm, textContent);
        }
    }   

    await Deno.writeTextFile(".env", textContent);
}
