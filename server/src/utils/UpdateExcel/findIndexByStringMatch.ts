export function findIndexByStringMatch(arr: string[], target: string): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the matching element
    }
  }
  return -1; // Return -1 if the element is not found in the array
}
