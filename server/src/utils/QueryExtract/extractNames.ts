export function extractNames(inputList: string[]): {
  firstName: string[];
  lastName: string[];
} {
  const firstName: string[] = [];
  const lastName: string[] = [];

  inputList.forEach((entry) => {
    const words = entry.trim().split(/\s+/);

    if (words.length > 0) {
      firstName.push(words[0]);
      lastName.push(words[words.length - 1]);
    }
  });

  return { firstName, lastName };
}
