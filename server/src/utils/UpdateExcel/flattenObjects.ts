export function flattenAndOrganize(
  companies: string[],
  names: string[],
  firstNames: string[],
  lastNames: string[],
  emails: any[]
): {
  [key: string]: {
    Name: string;
    "First Name": string;
    "Last Name": string;
    Email: string[];
  }[];
} {
  const result: {
    [key: string]: {
      Name: string;
      "First Name": string;
      "Last Name": string;
      Email: string[];
    }[];
  } = {};

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const emailValue = emails[i];

    let emailList: string[] = [];

    if (typeof emailValue === "string") {
      emailList = emailValue.split(",").map((email) => email.trim());
    } else if (Array.isArray(emailValue)) {
      emailList = emailValue
        .map((emailObj) => (emailObj.text || "").trim()) // Trim email text
        .filter((email) => email.includes("@") && email.length > 0); // Check for non-empty emails
    } else if (
      emailValue !== null &&
      typeof emailValue === "object" &&
      emailValue.text
    ) {
      const email = emailValue.text.trim(); // Trim email text
      if (email.includes("@") && email.length > 0) {
        emailList.push(email);
      }
    }

    const formattedData: {
      Name: string;
      "First Name": string;
      "Last Name": string;
      Email: string[];
    } = {
      Name: names[i],
      "First Name": firstNames[i],
      "Last Name": lastNames[i],
      Email: emailList.length > 0 ? emailList : [], // Replace empty strings with an empty array
    };

    if (company in result) {
      result[company].push(formattedData);
    } else {
      result[company] = [formattedData];
    }
  }
  return result;
}
