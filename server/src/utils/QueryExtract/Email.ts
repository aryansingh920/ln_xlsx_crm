export const SendEmailQuery = (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string,
  Email: string | string[]
): string => {
  return `for the full name "${FullName}" with first name as "${FirstName}" and last name as "${LastName}" working at company "${Company}" the email is "${Email},"`;
};

export const GetEmailQuery = (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string
): string => {
  return `for the full name "${FullName}" with first name as "${FirstName}" and last name as "${LastName}" working at company "${Company}" the email is? give it inside "" double quotes.Don't add any extra text apart from that`;
};

export const GetEmailPatternQuery = (
  FullName: string,
  FirstName: string,
  LastName: string,
  Company: string,
  Email: string | string[],
  FullName1?: string,
  FirstName1?: string,
  LastName1?: string,
  Company1?: string,
  Email1?: string | string[]
): string => {
  if (FullName1 && FirstName1 && LastName1 && Company1 && Email1) {
    const sendMailQuery = SendEmailQuery(
      FullName,
      FirstName,
      LastName,
      Company,
      Email
    );
    const sendMailQuery1 = SendEmailQuery(
      FullName1,
      FirstName1,
      LastName1,
      Company1,
      Email1
    );
    const returnQuery = `${sendMailQuery} and ${sendMailQuery1} what is the pattern of the email, Example:{first}{last}@domain or {f}{last}@domain or {first}{l}@domain or {f}{l}@domain or anything else, give it inside "" double quotes.Don't add any extra text apart from that,give it in a similar format to that of the example`;
    return returnQuery;
  } else {
    const sendMailQuery = SendEmailQuery(
      FullName,
      FirstName,
      LastName,
      Company,
      Email
    );
    const returnQuery = `${sendMailQuery} what is the pattern of the email, Example:{first}{last}@domain or {f}{last}@domain or {first}{l}@domain or {f}{l}@domain or anything else, give it inside "" double quotes.Don't add any extra text apart from that,give it in a similar format to that of the example`;
    return returnQuery;
  }
};


export function extractEmail(text: string): string | null {
  const emailRegex = /"([^"]+@[\w.-]+\.\w+(\.\w+)*)\.?"/;
  const match = text.match(emailRegex);
  return match ? match[1] : null;
}
