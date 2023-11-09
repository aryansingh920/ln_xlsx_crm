#!/bin/bash

# Run the check_node_python.sh script
./check_node_python.sh

# Specify the destination path for the .env file
DESTINATION_PATH="../.env"

echo "Node Server of Canverro-Backend"
# Get the PID listening on port 
port=3000
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

echo "Setting environment variables..."
export PORT=$port
export OPENAI_API_KEY=
export BARD_1PSID_cookie_value=
export BARD_1PSIDTS_cookie_value=
export BARD_1PSIDCC_cookie_value=
export RAPID_API_KEY_VALUE=
export ZERO_BOUNCE_API_KEY_VALUE=

# Create the .env file
echo "Creating .env file..."
echo "PORT=$PORT" > "$DESTINATION_PATH"
echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> "$DESTINATION_PATH"
echo "BARD_1PSID_cookie_value=$BARD_1PSID_cookie_value" >> "$DESTINATION_PATH"
echo "BARD_1PSIDTS_cookie_value=$BARD_1PSIDTS_cookie_value" >> "$DESTINATION_PATH"
echo "BARD_1PSIDCC_cookie_value=$BARD_1PSIDCC_cookie_value" >> "$DESTINATION_PATH"
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
npm start
npm test
