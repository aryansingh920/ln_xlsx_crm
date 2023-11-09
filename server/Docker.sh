#!/bin/bash

while true; do
    # Prompt the user for the upload volume path
    read -p "Enter the upload volume path (e.g., /path/to/your/upload/volume): " upload_volume_path

    if [ -z "$upload_volume_path" ]; then
        echo "Upload volume path cannot be empty. Please provide a valid path."
    elif [ ! -d "$upload_volume_path" ]; then
        echo "The specified upload path does not exist or is not a directory. Please provide a valid path."
    else
        break  # Valid upload path provided, exit the loop
    fi
done

while true; do
    # Prompt the user for the output volume path
    read -p "Enter the output volume path (e.g., /path/to/your/output/volume): " output_volume_path

    if [ -z "$output_volume_path" ]; then
        echo "Output volume path cannot be empty. Please provide a valid path."
    elif [ ! -d "$output_volume_path" ]; then
        echo "The specified output path does not exist or is not a directory. Please provide a valid path."
    else
        break  # Valid output path provided, exit the loop
    fi
done

# Build the Docker image
docker build -t excel-manipulator .

# Run the Docker container with the volume mount options for both upload and output directories
docker run -p 3005:3005 -d -v "$upload_volume_path":/app/upload -v "$output_volume_path":/app/output excel-manipulator
