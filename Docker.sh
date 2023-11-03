#!/bin/bash

# Build the Docker image
docker build -t excel-manipulator .

# Run the Docker container
docker run -p 3000:3000 -d excel-manipulator
