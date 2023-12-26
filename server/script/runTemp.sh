#!/bin/bash

# Run the check_node_python.sh script
./check_node_python.sh

# Specify the destination path for the .env file
DESTINATION_PATH="../.env"

echo "Node Server of Canverro-Backend"

# Function to create and activate Python virtual environment
create_activate_venv() {
  # Create a virtual environment named "server"
  python3 -m venv ../python/server

  # Activate the virtual environment
  source server/bin/activate
}

# Function to deactivate the Python virtual environment
deactivate_venv() {
  deactivate
}


# Get the PID listening on port 
port=3001
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

export RAPID_API_KEY_VALUE=""
export ZERO_BOUNCE_API_KEY_VALUE=""
export PROXYCURL_API_KEY=""


# Create the .env file
echo "Creating .env file..."
echo "PORT=$PORT" > "$DESTINATION_PATH"
echo "RAPID_API_KEY_VALUE=$RAPID_API_KEY_VALUE" >> "$DESTINATION_PATH"
echo "ZERO_BOUNCE_API_KEY_VALUE=$ZERO_BOUNCE_API_KEY_VALUE" >> "$DESTINATION_PATH"
echo "PROXYCURL_API_KEY=$PROXYCURL_API_KEY" >> "$DESTINATION_PATH"

# Check the command-line argument and set environment variables accordingly
if [ "$1" == "dev" ]; then
  echo "Setting up development environment..."
  # Set development environment variables
  export LOCALHOSTLINK="http://localhost"
  export PYTHON_RUNNER="python"
  echo "PYTHON_RUNNER=$PYTHON_RUNNER" >> "$DESTINATION_PATH"
  echo "LOCALHOSTLINK=$LOCALHOSTLINK" >> "$DESTINATION_PATH"

elif [ "$1" == "prod" ]; then
  echo "Setting up production environment..."
  # Set production environment variables
  export LOCALHOSTLINK="http://34.155.224.21"
  export PYTHON_RUNNER="python"
  echo "PYTHON_RUNNER=$PYTHON_RUNNER" >> "$DESTINATION_PATH"
  echo "LOCALHOSTLINK=$LOCALHOSTLINK" >> "$DESTINATION_PATH"
else
  echo "Invalid or no environment specified. Using default environment."
fi


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
