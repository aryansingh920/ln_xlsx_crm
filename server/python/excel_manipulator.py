#excel_manipulator.py
import pandas as pd
from typing import Optional
import numpy as np

class ExcelFile:
    def __init__(self, file_path: str):
        self.original_df = pd.read_excel(file_path)
        self.df = self.original_df.copy()  # Create a copy for modifications

    def display_details(self) -> None:
        """
        Display the details of the DataFrame.
        """
        print(self.df)

    def replace_column_values(self, column_name: str, new_values: list) -> None:
        """
        Replace the values in a specific column with new values provided in an array.

        Args:
            column_name (str): The name of the column to replace values in.
            new_values (list): A list of new values to replace the column values.
        """
        new_values = new_values[1:]
        if column_name in self.df.columns:
            if len(new_values) == len(self.df):
                self.df[column_name] = new_values
                print(f"Replaced values in column '{column_name}'")
            else:
                print(
                    "The number of new values must match the number of rows in the DataFrame.")
        else:
            print(f"Column '{column_name}' not found")



    def delete_column(self, column_name: str) -> None:
        """
        Delete a column from the DataFrame.

        Args:
            column_name (str): The name of the column to delete.
        """
        if column_name in self.df.columns:
            self.df = self.df.drop(columns=[column_name])
        else:
            print(f"Column '{column_name}' not found")

    def delete_row(self, row_index: int) -> None:
        """
        Delete a row from the DataFrame.

        Args:
            row_index (int): The index of the row to delete.
        """
        if row_index in self.df.index:
            self.df = self.df.drop(index=row_index)
        else:
            print(f"Row index '{row_index}' not found")

    def delete_cell(self, row_index: int, column_name: str) -> None:
        """
        Delete the content of a specific cell in the DataFrame.

        Args:
            row_index (int): The index of the row.
            column_name (str): The name of the column.
        """
        if (row_index) in self.df.index and column_name in self.df.columns:
            cell_value = self.df.at[row_index, column_name]
            if isinstance(cell_value, (int, float)):
                self.df.at[row_index, column_name] = None  # Set numeric cells to None
            else:
                self.df.at[row_index, column_name] = np.nan  # Set other cells to an empty string
            print(f"Cleared cell at row {row_index} and column {column_name}")
        else:
            print(f"Cell at row {row_index} and column {column_name} not found")
        # if int(row_index) in self.df.index and column_name in self.df.columns:
        #     self.df.at[row_index, column_name] = None
        #     print("Here3",self.df)
        #     print(f"Deleted cell at row {row_index} and column {column_name}")
        # else:
        #     print(f"Cell at row {row_index} and column {column_name} not found")

        # print("Clear",self.df)

    def update_cell(self, row_index: int, column_name: str, new_value: Optional[str] = None) -> None:
        """
        Update the content of a specific cell in the DataFrame.

        Args:
            row_index (int): The index of the row.
            column_name (str): The name of the column.
            new_value (Optional[str]): The new value to set in the cell. If None, the cell is cleared.
        """
        if (row_index) in self.df.index and column_name in self.df.columns:
            if new_value is not None:
                self.df.at[row_index, column_name] = new_value
                print(f"Updated cell at row {row_index} and column {column_name} with '{new_value}'")
            else:
                cell_value = self.df.at[row_index, column_name]
                if isinstance(cell_value, (int, float)):
                    self.df.at[row_index, column_name] = None  # Set numeric cells to None
                else:
                    self.df.at[row_index, column_name] = np.nan  # Set other cells to an empty string
                print(f"Cleared cell at row {row_index} and column {column_name}")
        else:
            print(f"Cell at row {row_index} and column {column_name} not found")


    def update_column_name(self, old_column_name: str, new_column_name: str) -> None:
        """
        Update the name of a column.

        Args:
            old_column_name (str): The current name of the column.
            new_column_name (str): The new name for the column.
        """
        if old_column_name in self.df.columns:
            self.df = self.df.rename(columns={old_column_name: new_column_name})
            print(f"Updated column name from '{old_column_name}' to '{new_column_name}'")


    def save_to_excel(self, output_file_path: str) -> None:
        """
        Save the modified DataFrame to a new Excel file.

        Args:
            output_file_path (str): The path to the new Excel file.
        """
        try:
            self.df.to_excel(output_file_path, index=False)
            print(f"Saved to {output_file_path}")
        except Exception as e:
            print(f"Error saving to Excel file: {str(e)}")


