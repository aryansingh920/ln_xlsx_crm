#!/bin/bash

# Create a virtual environment named "automation"
python -m venv automation

# Activate the virtual environment
source automation/bin/activate

# Upgrade pip in the virtual environment
python -m pip install --upgrade pip

# Install required modules
pip install -r requirements.txt

# Set environment variables
export LINKEDIN_USERNAME=""
export LINKEDIN_PASSWORD=""

# Change to the linkedin directory
cd linkedin/

# Check if the virtual environment is activated
if [ "$VIRTUAL_ENV" != "" ]; then
    # Run the Python script within the virtual environment
    python login.py
else
    echo "Error: Virtual environment is not activated. Please activate the 'automation' environment."
fi

# Deactivate the virtual environment
deactivate
