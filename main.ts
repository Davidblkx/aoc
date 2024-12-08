import { trimEnd } from "@utils/string.ts";
import type { CliModule } from "./cli/model.ts";
import { loadSignals, isDebug, isTest } from "@utils/signals.ts";
import { writeWarning } from "@utils/console.ts";

if (Deno.args.length === 0 || Deno.args[0] === "--help") {
  console.error("%cNo command provided, valid commands:", "color: red;");
  for await (const entry of Deno.readDir("./cli")) {
    if (entry.isFile && entry.name.endsWith(".cli.ts")) {
      console.log("%c  - " + trimEnd(entry.name, ".cli.ts"), "color: cyan;");
    }
  }
  Deno.exit(1);
}

const [cmd, ...fullArgs] = Deno.args;
const args = loadSignals(fullArgs);

if (isTest()) {
  writeWarning("Running in test mode");
}

if (isDebug()) {
  writeWarning("Running in debug mode");
}

const moduleFile = `./cli/${cmd}.cli.ts`;
const module: CliModule = await import(moduleFile);

if (args.includes("--help")) {
  console.log(module.help(args));
  Deno.exit(0);
}

try {
  await module.run(args);
} catch (e) {
  console.error(e);
  Deno.exit(1);
}
