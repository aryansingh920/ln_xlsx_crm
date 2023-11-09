export function extractNamesFullNameRE(data: string[]): string[] {
  // const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*/;
  const namePattern = "^[A-Z][a-z]+(?: [A-Z][a-z]+)*";
  const names: string[] = [];

  for (const item of data) {
    const match = item.match(namePattern);
    if (match) {
      names.push(match[0]);
    }
  }

  return names;
}
