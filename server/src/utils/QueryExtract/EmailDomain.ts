// export function extractDomain(email: string): string {
//   const regex = /@(.+)/;
//   const match = email.match(regex);
//   return match ? match[1] : "";
// }

export function extractDomain(email: string ): string | null {

  // Regular expression for extracting the domain from an email address
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the input string is a valid email address
  if (!regex.test(email)) {
    throw new Error("Invalid email address");
  }

  // Extract the domain using the regular expression
  const domainMatch = email.match(/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  // Check if a domain is found
  if (domainMatch && domainMatch.length > 0) {
    // Remove the '@' symbol from the beginning
    const domain = domainMatch[0].substring(1);
    return domain;
  } else {
    throw new Error("Unable to extract domain from email address");
  }
}

// // Example usage:
// const email = "user@example.com";
// try {
//   const domain = extractDomain(email);
//   console.log(`Domain: ${domain}`);
// } catch (error) {
//   console.error(error.message);
// }
