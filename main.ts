import { trimEnd } from "./utils/string.utils.ts";
import type { CliModule } from "./cli/model.ts";

if (Deno.args.length === 0) {
  console.error("%cNo command provided, valid commands:", "color: red;");
  for await (const entry of Deno.readDir("./cli")) {
    if (entry.isFile && entry.name.endsWith(".cli.ts")) {
      console.log("%c  - " + trimEnd(entry.name, ".cli.ts"), "color: cyan;");
    }
  }
  Deno.exit(1);
}

const [cmd, ...args] = Deno.args;
const moduleFile = `./cli/${cmd}.cli.ts`;
const module: CliModule = await import(moduleFile);

try {
  await module.run(args);
} catch (e) {
  console.error(e);
}
