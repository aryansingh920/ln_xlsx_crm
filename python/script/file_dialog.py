import tkinter as tk
from tkinter import filedialog, simpledialog

def select_excel_file():
    # Create a Tkinter root window (hidden)
    root = tk.Tk()
    root.withdraw()

    # Ask the user to select the input Excel file
    file_path = filedialog.askopenfilename(title="Select an Excel file", filetypes=[("Excel Files", "*.xlsx *.xls")])

    return file_path

def get_output_directory():
    # Create a Tkinter root window (hidden)
    root = tk.Tk()
    root.withdraw()

    # Ask the user to select the output directory
    output_directory = filedialog.askdirectory(title="Select the output directory")

    return output_directory

def get_user_input():
    root = tk.Tk()
    root.withdraw()

    column_name_input = simpledialog.askstring("Input", "Enter column name(s) to delete (comma-separated, leave blank for none):")
    row_index_input = simpledialog.askstring("Input", "Enter row index to delete (comma-separated, leave blank for none):")
    cell_details_input = simpledialog.askstring("Input", "Enter cell detail(s) in the format `[row_index]-[column_name] to delete (comma-separated, leave blank for none) Eg-[5-Col_1,98-Col_5] :")

    # Split comma-separated values into lists
    column_name = [col.strip() for col in column_name_input.split(",")] if column_name_input else []
    row_index = [int(idx.strip()) for idx in row_index_input.split(",")] if row_index_input else []
    cell_details = [cell.strip() for cell in cell_details_input.split(",")] if cell_details_input else []

    return column_name, row_index, cell_details
