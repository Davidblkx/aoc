export function trimEnd(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, str.length - suffix.length);
  }
  return str;
}
