export function getRandomElement<T>(array: T[]): T  {
  // if (array.length === 0) {
  //   return [undefined]; // Return undefined for empty arrays
  // }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
export function getRandomElements<T>(array: T[], count: number): T[] {
  if (array.length === 0 || count <= 0) {
    return []; // Return empty array for invalid input
  }

  // Make a copy of the input array
  const arrayCopy = [...array];
  const selectedElements: T[] = [];

  for (let i = 0; i < count; i++) {
    if (arrayCopy.length === 0) {
      break; // Break if there are no more elements to select
    }

    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    const selectedElement = arrayCopy[randomIndex];

    // Remove the selected element from the copied array
    arrayCopy.splice(randomIndex, 1);

    selectedElements.push(selectedElement);
  }

  return selectedElements;
}
