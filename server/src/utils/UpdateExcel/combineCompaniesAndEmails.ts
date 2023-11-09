export function combineCompaniesAndEmails(
  companies: string[],
  emails: string[]
): { [key: string]: string[] } {
  const companyEmailsMap: { [key: string]: string[] } = {};

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const email = emails[i];

    if (!companyEmailsMap[company]) {
      companyEmailsMap[company] = [email];
    } else {
      companyEmailsMap[company].push(email);
    }
  }

  return companyEmailsMap;
}
