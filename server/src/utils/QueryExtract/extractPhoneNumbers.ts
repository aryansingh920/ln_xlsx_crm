function extractValidPhoneNumbers(input: string): string {
  const regex = /\+\d{1,4}[-\s]\d{3}-\d{3}-\d{4}/g;
  //   const regex = /\+\d{1,4} \d{3}-\d{3}-\d{4}/g;
  const matches = input.match(regex);

  if (matches) {
    const result = matches.join(" , ");
    if (result.length > 0) return result;
    else return "No valid phone numbers found";
  } else {
    return "No valid phone numbers found";
  }
}

export function updatePhoneNumberArray(inputArray: string[]): string[] {
  console.log("Inside updatePhoneNumberArray", inputArray);
  let finalPhoneNumberArray: string[] = [];
  for (let input of inputArray) {
    if (input === undefined || input === null) {
      finalPhoneNumberArray.push("");
      continue;
    }
    const result: string = extractValidPhoneNumbers(input);
    console.log(`Phone Number: ${result}`);
    finalPhoneNumberArray.push(result);
  }
  return finalPhoneNumberArray;
}
