export const LastNameQuery = async (query: string) => {
  return `Give me only the last name without accents with first letter capitalized and other letters in small case of ${query} inside "" double quotes.`;
};

export const FirstNameQuery = async (query: string) => {
  return `Give me only the first name without accents with first letter capitalized and other letters in small case of ${query} inside "" double quotes.`;
};

export const FullNameQuery = async (query: string) => {
  return `Give me the full name without accents with first letter capitalized and other letters in small case of ${query} inside "" double quotes.`;
};
