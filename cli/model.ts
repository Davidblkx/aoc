export interface CliModule {
  run(args: string[]): void | Promise<void>;
}
