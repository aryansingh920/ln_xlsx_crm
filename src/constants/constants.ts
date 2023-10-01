// Export a constant with default values
export const Constants: {
  FileName: string;
  Columns_To_Keep: string[];
} = {
  FileName: "output.xlsx",
  Columns_To_Keep: [
    "Name",
    "First Name",
    "Last Name",
    "Emails",
    "Phones",
    "Company",
    "Title",
    "Country",
    "Source",
    "Industry",
    "Assigned User",
  ],
};

// // You can use Constants.FileName to access the default value
// console.log(Constants.FileName); // "output.xlsx"
