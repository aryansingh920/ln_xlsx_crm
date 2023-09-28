#!/bin/bash

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

echo "Setting environment variables..."
export PORT=$port
export OPENAI_API_KEY=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
export BARD_1PSID_cookie_value=bQjVCw4WGycbgM4nWjFD-yftefuq5MSZO8mcMJtmK5iEM5VWgbiOR8atk4zUEUw-ofy1AQ
export BARD_1PSIDTS_cookie_value=sidts-CjEB3e41hWwoR57IMF25qesAjAdZZWKwAO7uYTSbC83a1Djg3ooTjRtxUhgFlh7sj-rvEAA
export BARD_1PSIDCC_cookie_value=APoG2W8JW1f-0GrRmvbZDFz6A98ek8hKkD3bHDMyyZmJekaX9Bm-kKB2nrRFGoRLeYcIwkOwrg
export RAPID_API_KEY_VALUE="787f1ab0d7msh00b27427955fd1cp1fc1b8jsn2cb7314ce4bb"

# Create the .env file
echo "Creating .env file..."
echo "PORT=$PORT" > "$DESTINATION_PATH"
echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> "$DESTINATION_PATH"
echo "BARD_1PSID_cookie_value=$BARD_1PSID_cookie_value" >> "$DESTINATION_PATH"
echo "BARD_1PSIDTS_cookie_value=$BARD_1PSIDTS_cookie_value" >> "$DESTINATION_PATH"
echo "BARD_1PSIDCC_cookie_value=$BARD_1PSIDCC_cookie_value" >> "$DESTINATION_PATH"
echo "RAPID_API_KEY_VALUE=$RAPID_API_KEY_VALUE" >> "$DESTINATION_PATH"

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
