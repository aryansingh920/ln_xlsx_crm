#!/bin/bash

# Run the check_node_python.sh script
./check_node_python.sh

# Specify the destination path for the .env file
DESTINATION_PATH="../.env"

echo "Node Server of Canverro-Backend"
# Get the PID listening on port 
port=3005
pid=$(lsof -t -i :$port)

# If PID exists, kill the process
if [ -n "$pid" ]; then
  echo "Killing process with PID $pid"
  kill $pid
else
  echo "No process listening on port $port"
fi


echo "Installing Python dependencies..."
pip install -r requirements.txt
pip install git+https://github.com/reach2ashish/geograpy.git
pip install newspaper3k

echo "Setting environment variables..."
export PORT=$port
export RAPID_API_KEY_VALUE="4749eed77fmsh282e13aab241c01p1c733djsn8a439686b347"
export ZERO_BOUNCE_API_KEY_VALUE="84fd6828a8d9427cb87d40e09d2c71db"


# Create the .env file
echo "Creating .env file..."
echo "PORT=$PORT" > "$DESTINATION_PATH"
echo "RAPID_API_KEY_VALUE=$RAPID_API_KEY_VALUE" >> "$DESTINATION_PATH"
echo "ZERO_BOUNCE_API_KEY_VALUE=$ZERO_BOUNCE_API_KEY_VALUE" >> "$DESTINATION_PATH"


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
bash sass.sh
# npm run debug
npm start
npm test
