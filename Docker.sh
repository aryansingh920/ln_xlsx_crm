#!/bin/bash

while true; do
    # Prompt the user for the volume path
    read -p "Enter the volume path (e.g., /path/to/your/volume): " volume_path

    if [ -z "$volume_path" ]; then
        echo "Volume path cannot be empty. Please provide a valid path."
    elif [ ! -d "$volume_path" ]; then
        echo "The specified path does not exist or is not a directory. Please provide a valid path."
    else
        break  # Valid path provided, exit the loop
    fi
done

# Build the Docker image
docker build -t excel-manipulator .

# Run the Docker container with the volume mount option
docker run -p 3005:3005 -d -v "$volume_path":/app/output excel-manipulator
