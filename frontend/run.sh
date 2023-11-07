#!/bin/bash

# Specify the destination path for the .env file
DESTINATION_PATH="./.env"

# Set your environment variables here
export BASE_URL="http://localhost:3005"  # Replace with your API URL
# export REACT_APP_API_KEY="your-api-key"           # Replace with your API key

# Create the .env file
echo "BASE_URL=$BASE_URL" > "$DESTINATION_PATH"
# echo "REACT_APP_API_KEY=$REACT_APP_API_KEY" >> "$DESTINATION_PATH"

# Install dependencies and start the React application
echo "Starting server..."
echo "Node Version"
node -v
echo "NPM Version"
npm -v

# Install dependencies
rm -rf node_modules

if [ -e package-lock.json ]; then
 npm ci
else
 npm i
fi


npm ls
echo "Compiling SCSS to CSS..."
# bash sass.sh
npm start
npm test
