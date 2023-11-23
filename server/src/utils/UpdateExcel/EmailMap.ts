export interface Employee {
  Name: string;
  "First Name": string;
  "Last Name": string;
  Email: string | string[];
}

export interface EmployeeWithFilteredEmail {
  Name: string;
  "First Name": string;
  "Last Name": string;
  Email: string;
}

export interface CompanyData {
  [key: string]: Employee[];
}

export interface CompanyDataWithFilteredEmail {
  [key: string]: EmployeeWithFilteredEmail[];
}

export function generateNewObject(input: CompanyData): CompanyDataWithFilteredEmail {
  const result: CompanyDataWithFilteredEmail = {};

  for (const companyName in input) {
    const employees: EmployeeWithFilteredEmail[] = [];

    for (const employee of input[companyName]) {
      const emailKeywords = companyName
        .toLowerCase()
        .replace(/[^a-z]+/g, " ")
        .split(" ");

      if (Array.isArray(employee.Email)) {
        const matchingEmails = employee.Email.filter((email) => {
          const domain = email.split("@")[1].toLowerCase();
          return emailKeywords.some((keyword) => domain.includes(keyword));
        });

        if (matchingEmails.length > 0) {
          employees.push({
            Name: employee.Name,
            "First Name": employee["First Name"],
            "Last Name": employee["Last Name"],
            Email: matchingEmails[0], // Use the first matching email
          });
        } else {
          employees.push({
            Name: employee.Name,
            "First Name": employee["First Name"],
            "Last Name": employee["Last Name"],
            Email: "", // Empty string for no matching email
          });
        }
      } else if (typeof employee.Email === "string") {
        const domain = employee.Email.split("@")[1].toLowerCase();
        if (emailKeywords.some((keyword) => domain.includes(keyword))) {
          employees.push({
            Name: employee.Name,
            "First Name": employee["First Name"],
            "Last Name": employee["Last Name"],
            Email: employee.Email,
          });
        } else {
          employees.push({
            Name: employee.Name,
            "First Name": employee["First Name"],
            "Last Name": employee["Last Name"],
            Email: "", // Empty string for no matching email
          });
        }
      }
    }

    if (employees.length > 0) {
      result[companyName] = employees;
    }
  }

  return result;
}

export function filterEmployeesWithEmail(
  input: CompanyDataWithFilteredEmail,
  companyName: string
): CompanyDataWithFilteredEmail {
  const result: CompanyDataWithFilteredEmail = {};

  if (input.hasOwnProperty(companyName)) {
    result[companyName] = input[companyName].filter(
      (employee) =>
        employee.Email !== "" &&
        employee.Email !== undefined &&
        employee.Email !== null
    );
  }

  return result;
}

export function filterEmployeesWithOutEmail(
  input: CompanyDataWithFilteredEmail,
  companyName: string
): CompanyDataWithFilteredEmail {
  const result: CompanyDataWithFilteredEmail = {};

  // for (const companyName in input) {
  if (input.hasOwnProperty(companyName)) {
    result[companyName] = input[companyName].filter(
      (employee) =>
        employee.Email === "" ||
        employee.Email === undefined ||
        employee.Email === null
    );
  }
  // }

  return result;
}
