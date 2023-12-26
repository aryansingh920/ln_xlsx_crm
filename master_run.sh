#!/bin/bash

# Function to create a tmux session if it doesn't exist
create_tmux_session() {
    local session_name=$1
    tmux has-session -t $session_name 2>/dev/null

    if [ $? != 0 ]; then
        tmux new-session -d -s $session_name
    else
        echo "Session $session_name already exists. Skipping creation."
    fi
}

# Function to execute commands in a tmux session
execute_in_tmux_session() {
    local session_name=$1
    local commands=$2

    tmux send-keys -t $session_name "$commands" C-m
}

# Create tmux sessions
create_tmux_session frontend
create_tmux_session upload-server
create_tmux_session main-server

# Execute commands in each tmux session
execute_in_tmux_session frontend 'cd frontend/ && sudo chmod +x run.sh && bash run.sh prod'
execute_in_tmux_session upload-server 'cd server/script/ && sudo chmod +x run2.sh && bash run2.sh prod'
execute_in_tmux_session main-server 'cd server/script/ && sudo chmod +x run.sh && bash run.sh prod'

# Attach to each tmux session to see the output
tmux attach-session -t frontend
tmux attach-session -t upload-server
tmux attach-session -t main-server
