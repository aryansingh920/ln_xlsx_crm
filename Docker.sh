#!/bin/bash

# Prompt the user for the volume path
read -p "Enter the volume path (e.g., /path/to/your/volume): " volume_path

if [ -z "$volume_path" ]; then
    echo "Volume path cannot be empty. Exiting."
    exit 1
fi

# Build the Docker image
docker build -t excel-manipulator .

# Run the Docker container with the volume mount option
docker run -p 3005:3005 -d -v "$volume_path":/app/output excel-manipulator
