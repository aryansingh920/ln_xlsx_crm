#!/bin/bash

# Check for Node.js
if command -v node &> /dev/null; then
    echo "Node.js is installed on your system."
else
    echo "Node.js is not installed on your system."
fi

# Check for Python
if command -v python3 &> /dev/null; then
    echo "Python is installed on your system."
else
    echo "Python is not installed on your system."
fi
