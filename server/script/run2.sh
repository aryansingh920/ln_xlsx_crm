#!/bin/bash

port=3002
pid=$(lsof -t -i :$port)

# If PID exists, kill the process
if [ -n "$pid" ]; then
  echo "Killing process with PID $pid"
  kill $pid
else
  echo "No process listening on port $port"
fi
DESTINATION_PATH="../.env"
export UPLOAD_PORT=3002
echo "UPLOAD_PORT=$UPLOAD_PORT" >> "$DESTINATION_PATH"

npm install
npm run start-upload
