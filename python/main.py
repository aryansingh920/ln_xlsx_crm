import os
from excel_manipulator import ExcelFile
# from file_dialog import select_excel_file, get_output_directory, get_user_input
import sys


def main():
    # Check if the script is run with the expected number of arguments
    # if len(sys.argv) != 3:
    #     print("Usage: python main.py arg1 arg2")
    #     return

    # Access the command-line arguments
    FilePath = sys.argv[1]
    Action = sys.argv[2]
    columns = sys.argv[3]
    output_file_path = sys.argv[4]

    print(f"Argument 1: {FilePath}")
    print(f"Argument 2: {Action}")
    print(f"Argument 3: {columns.split(',')}")
    print(f"Argument 4: {output_file_path}")

    excel_file = ExcelFile(FilePath)
    excel_file.display_details()
    
        # Your script logic here




    if(Action == "deleteColumn"):
        print("deleteColumn",columns)
        for col in columns.split(','):
            excel_file.delete_column(column_name=col)
    excel_file.save_to_excel(output_file_path=output_file_path)

        


if __name__ == "__main__":
    print("Python : main")
    main()






# if __name__ == "__main__":
#     parent_directory = os.path.abspath(os.path.join(os.getcwd()))
    
#     # Call the select_excel_file function to get the selected file path
#     file_path = select_excel_file()
#     if not file_path:
#         print("No file selected. Exiting.")
#     else:
#         # Get the output directory from the user
#         output_directory = get_output_directory()
#         if not output_directory:
#             print("No output directory selected. Exiting.")
#         else:
#             output_file_path = os.path.join(output_directory, "output_data.xlsx")

#             # Check if the output file already exists and delete it if necessary
#             if os.path.exists(output_file_path):
#                 os.remove(output_file_path)

#             excel_file = ExcelFile(file_path)
#             excel_file.display_details()

#             # Get user input for column, row, and cell to delete
#             column_name, row_index, cell_details = get_user_input()

#             print(f"Column(s) to delete: {column_name}")
#             print(f"Row(s) to delete: {row_index}")
#             print(f"Cell(s) to delete: {cell_details}")

#             # Delete specified columns
#             for col in column_name:
#                 excel_file.delete_column(column_name=col)
            
#             # Delete specified rows
#             for idx in row_index:
#                 excel_file.delete_row(row_index=idx)
            
#             # Delete specified cells
#             for cell in cell_details:
#                 if "-" in cell:
#                     row, col = cell.split("-")
#                     excel_file.delete_cell(row_index=int(row), column_name=col)
#                 else:
#                     print(f"Invalid cell format: {cell}")

#             # Save the modified Excel file
#             excel_file.save_to_excel(output_file_path=output_file_path)

#             print(f"Modified Excel file saved to: {output_file_path}")
