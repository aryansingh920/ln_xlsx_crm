#!/bin/bash

# Debug: Print the current working directory
cd ../
echo "Current directory: $(pwd)"

# Set the source directory where SCSS files are located
source_dir="src/public/scss"

# Set the target directory where CSS files will be generated
target_dir="src/public/css"

# Debug: Print the source and target directories
echo "Source directory: $source_dir"
echo "Target directory: $target_dir"

# Loop through each SCSS file in the source directory
for scss_file in "$source_dir"/*.scss; do
    # Check if the SCSS file exists
    if [ -e "$scss_file" ]; then
        # Get the base name of the SCSS file (without extension)
        base_name=$(basename "${scss_file%.*}")

        # Generate the corresponding CSS file name
        css_file="$target_dir/$base_name.css"

        # Debug: Print the file paths
        echo "Converting $scss_file to $css_file"

        # Compile the SCSS to CSS and overwrite the CSS file
        sass "$scss_file" "$css_file" --style expanded

        # Debug: Print a message
        echo "Conversion complete for $base_name"
    fi
done

echo "Conversion complete."

echo "Cleanup complete."
