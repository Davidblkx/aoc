export function readClipboard(): Promise<string> {
    switch (Deno.build.os) {
        case "windows":
            return readClipboardWindows();
        default:
            throw new Error("Readind from clipboard is not implemented for this OS: " + Deno.build.os);
    }
}

export function writeClipboard(text: string): Promise<void> {
    switch (Deno.build.os) {
        case "windows":
            return writeClipboardWindows(text);
        default:
            throw new Error("Writing to clipboard is not implemented for this OS: " + Deno.build.os);
    }
}

async function readClipboardWindows(): Promise<string> {
    const cmd = new Deno.Command("powershell", {
        args: ["Get-Clipboard", "-Raw"],
        stdout: "piped",
    })

    const { code, stdout, stderr, success } = await cmd.output();

    if (!success) {
        throw new Error(`Failed to read clipboard: ${code} ${stderr}`);
    }

    return new TextDecoder().decode(stdout).trim();
}

async function writeClipboardWindows(text: string): Promise<void> {
    const cmd = new Deno.Command("powershell", {
        args: ["Set-Clipboard", "-Value", text],
        stdout: "null",
    });

    const { code, stderr, success } = await cmd.output();

    if (!success) {
        throw new Error(`Failed to write to clipboard: ${code} ${stderr}`);
    }
}
