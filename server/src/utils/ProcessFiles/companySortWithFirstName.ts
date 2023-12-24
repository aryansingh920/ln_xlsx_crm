export interface GroupedElements {
  [key: string]: string[];
}

// Function to group similar elements
export function groupSimilarElements(inputArray: string[]): GroupedElements {
  const groups: GroupedElements = {};

  for (const element of inputArray) {
    const words = element.split(" ");

    if (words[0].length >= 3) {
      // Only consider words with at least 3 letters
      if (!groups[words[0]]) {
        groups[words[0]] = [];
      }
      groups[words[0]].push(element);
    }
  }

  return groups;
}
