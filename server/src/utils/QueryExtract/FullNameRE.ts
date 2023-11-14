export function extractNamesFullNameRE(data: string[]): string[] {
  // const namePattern = "^[A-Z][a-z]+(?: [A-Z][a-z]+)*";
  const namePattern: RegExp =
    /\b(?:[A-Za-z][a-z]*(?:\s[A-Za-z][a-z]*)*)(?:(?:\s\([^\)]+\))?\s(?:[A-Z][a-z]+(?:\.[A-Z])?(?:\s?[A-Z][a-z]+)?)?)?\b/;

  const names: string[] = [];

  for (const item of data) {
    const match = item.match(namePattern);
    console.log("match", match);
    if (match) {
      names.push(match[0]);
    }
  }

  return names;
}
