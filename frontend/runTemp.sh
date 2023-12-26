#!/bin/bash

# Specify the destination path for the .env file
DESTINATION_PATH="./src/api/baseUrl.ts"
PORT=3002



# Check the command-line argument and set environment variables accordingly
if [ "$1" == "dev" ]; then
  echo "Setting up development environment..."
  export BASE_URL="http://localhost:$PORT"  
  echo "export const baseUrl: string = '$BASE_URL/api';" > "$DESTINATION_PATH"
elif [ "$1" == "prod" ]; then
  echo "Setting up production environment..."
  export BASE_URL="$PORT"  
  echo "export const baseUrl: string = '$BASE_URL/api';" > "$DESTINATION_PATH"
else
  echo "Invalid or no environment specified. Using default environment."
fi

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
npm start
npm test
