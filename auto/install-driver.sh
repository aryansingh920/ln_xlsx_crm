#!/bin/bash

# Function to download and extract Chrome or ChromeDriver
download_and_extract() {
    local tool_name="$1"
    local platform="$2"
    local download_url="$3"

    echo "Downloading $tool_name for $platform..."
    wget "$download_url" -O "$tool_name.zip"

    echo "Extracting $tool_name..."
    unzip -q "$tool_name.zip"

    echo "Cleaning up..."
    rm "$tool_name.zip"
}

# Install Chrome
download_and_extract "chrome" "linux64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chrome-linux64.zip"
download_and_extract "chrome" "mac-arm64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-arm64/chrome-mac-arm64.zip"
download_and_extract "chrome" "mac-x64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-x64/chrome-mac-x64.zip"
download_and_extract "chrome" "win32" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win32/chrome-win32.zip"
download_and_extract "chrome" "win64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win64/chrome-win64.zip"

# Install ChromeDriver
download_and_extract "chromedriver" "linux64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chromedriver-linux64.zip"
download_and_extract "chromedriver" "mac-arm64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-arm64/chromedriver-mac-arm64.zip"
download_and_extract "chromedriver" "mac-x64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-x64/chromedriver-mac-x64.zip"
download_and_extract "chromedriver" "win32" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win32/chromedriver-win32.zip"
download_and_extract "chromedriver" "win64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win64/chromedriver-win64.zip"

# Install Chrome Headless Shell
download_and_extract "chrome-headless-shell" "linux64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/linux64/chrome-headless-shell-linux64.zip"
download_and_extract "chrome-headless-shell" "mac-arm64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-arm64/chrome-headless-shell-mac-arm64.zip"
download_and_extract "chrome-headless-shell" "mac-x64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/mac-x64/chrome-headless-shell-mac-x64.zip"
download_and_extract "chrome-headless-shell" "win32" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win32/chrome-headless-shell-win32.zip"
download_and_extract "chrome-headless-shell" "win64" "https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win64/chrome-headless-shell-win64.zip"

echo "All downloads and extractions completed successfully."
