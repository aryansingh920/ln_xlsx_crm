#!/bin/bash

# Get the current branch name
cd ../
current_branch=$(git symbolic-ref --short HEAD)

# Function to check for merge conflicts
check_for_merge_conflicts() {
  if git diff --name-only --diff-filter=U | grep -q '.'; then
    echo "Merge conflicts detected. Please resolve conflicts before proceeding."
    exit 1
  fi
}

# Check if the current branch is "master"
if [ "$current_branch" == "m" ]; then
  read -p "Enter a new branch name: " branch_name
  # Create a new branch from "master"
  git checkout -b "$branch_name"
  # If not on "master," push to the current branch
  read -p "Enter a commit message: " commit_msg

  if [ ! -d "node_modules" ]; then
    npm install
  fi

  current_date=$(date +%Y-%m-%d)
  current_time=$(date +%H:%M:%S)

  current_datetime="$current_date $current_time"

  git add .
  git commit -m "$current_datetime - $commit_msg"
  git pull origin master  # Pull changes from master
  check_for_merge_conflicts  # Check for merge conflicts
  git push -u origin "$branch_name"
  git push -u origin1 "$branch_name"
else
  # If not on "master," push to the current branch
  read -p "Enter a commit message: " commit_msg

  if [ ! -d "node_modules" ]; then
    npm install
  fi

  current_date=$(date +%Y-%m-%d)
  current_time=$(date +%H:%M:%S)

  current_datetime="$current_date $current_time"

  git add .
  git commit -m "$current_datetime - $commit_msg"
  git pull origin master  # Pull changes from master
  check_for_merge_conflicts  # Check for merge conflicts
  git push -u origin "$current_branch"
  git push -u origin1 "$current_branch"
fi
