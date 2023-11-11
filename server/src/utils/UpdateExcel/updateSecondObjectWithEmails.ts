import { CompanyData } from "./EmailMap";
export function updateSecondObjectWithEmails(
  firstObject: CompanyData,
  secondObject: Record<string, string>
): Record<string, string> {
  for (const company in firstObject) {
    const employees = firstObject[company];

    for (const employee of employees) {
      if (employee.Email) {
        if (typeof employee.Email === "string") {
          // Handle when Email is a string
          const trimmedEmail = employee.Email.trim();
          if (trimmedEmail !== "") {
            const fullName = employee.Name;
            secondObject[fullName] = trimmedEmail;
          }
        } else if (Array.isArray(employee.Email)) {
          // Handle when Email is an array
          const trimmedEmails = employee.Email.map((email) =>
            typeof email === "string" ? email.trim() : email
          );
          const nonEmptyEmails = trimmedEmails.filter((email) => email !== "");
          if (nonEmptyEmails.length > 0) {
            const fullName = employee.Name;
            secondObject[fullName] = nonEmptyEmails.join(", ");
          }
        }
      }
    }
  }

  return secondObject;
}
