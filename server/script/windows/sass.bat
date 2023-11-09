@echo off
rem Debug: Print the current working directory
cd ../..
echo Current directory: %CD%

rem Set the source directory where SCSS files are located
set "source_dir=src\public\scss"

rem Set the target directory where CSS files will be generated
set "target_dir=src\public\css"

rem Debug: Print the source and target directories
echo Source directory: %source_dir%
echo Target directory: %target_dir%

rem Loop through each SCSS file in the source directory
for %%f in ("%source_dir%\*.scss") do (
    rem Check if the SCSS file exists
    if exist "%%f" (
        rem Get the base name of the SCSS file (without extension)
        set "scss_file=%%f"
        set "base_name=%%~nf"
        
        rem Generate the corresponding CSS file name
        set "css_file=%target_dir%\!base_name!.css"
        
        rem Debug: Print the file paths
        echo Converting !scss_file! to !css_file!
        
        rem Compile the SCSS to CSS and overwrite the CSS file
        sass "!scss_file!" "!css_file!" --style expanded
        
        rem Debug: Print a message
        echo Conversion complete for !base_name!
    )
)

echo Conversion complete.
echo Cleanup complete.
