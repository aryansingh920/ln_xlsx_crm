export function getStringsInsideDoubleQuotes(input: string): string {
  const regex = /"([^"]*)"/g;
  let match;
  const matches = [];

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }

  return matches[0];
}
