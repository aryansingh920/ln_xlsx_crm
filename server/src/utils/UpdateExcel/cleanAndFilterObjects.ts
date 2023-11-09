export function cleanAndFilterEmails(
  data: Record<string, string[]>
): Record<string, string[]> {
  const cleanedData: Record<string, string[]> = {};

  for (const key in data) {
    const values = data[key]
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== ""); // Remove empty strings

    if (values.length > 0) {
      cleanedData[key] = values;
    } else {
      cleanedData[key] = []; // Empty array if no valid values found
    }
  }

  return cleanedData;
}
