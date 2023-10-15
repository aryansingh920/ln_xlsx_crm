export const SendEmailQuery = async (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string,
  Email: string
) => {
  return `
    for the full name "${FullName}" with first name as "${FirstName}" and last name as "${LastName}" working at company "${Company}" the email is "${Email},"
    `;
};

export const GetEmailQuery = async (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string
) => {
  return `
    for the full name "${FullName}" with first name as "${FirstName}" and last name as "${LastName}" working at company "${Company}" the email is, give it inside "" double quotes.Don't add any extra text apart from that
    `;
};

export const GetEmailPatternQuery = async (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string,
  Email: string
) => {
  return `
    ${SendEmailQuery(
      FullName,
      FirstName,
      LastName,
      Company,
      Email
    )}then give me the email pattern it follows inside "" double quotes. Don't add any extra text apart from that
    `;
};
