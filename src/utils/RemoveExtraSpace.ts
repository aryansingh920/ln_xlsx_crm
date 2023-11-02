export function removeExtraSpaces(inputString: string): string {
  return inputString.replace(/\s+/g, " ").trim();
}
