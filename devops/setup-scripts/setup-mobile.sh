#!/usr/bin/env bash
set -e

# 사용법(help) 출력 함수
usage() {
  cat <<EOF
Usage: pnpm setup:mobile <appName>

This script sets up a specific mobile app by installing dependencies and setting up iOS pods.

Requirements:
- Ruby must be installed to run CocoaPods.
- The specified app must exist inside 'apps/mobile'.

Steps:
1. Runs 'pnpm install' inside 'apps/mobile/<appName>'.
2. Runs 'pod install' in 'apps/mobile/<appName>/ios' (if the folder exists).

Examples:
  pnpm setup:mobile pocha   # Sets up the 'pocha' mobile app
  pnpm setup:mobile --help   # Displays this help message
EOF
}

# Handle help command
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  usage
  exit 0
fi

# Check if an app name is provided
if [ -z "$1" ]; then
  echo "❌ Error: You must specify a mobile app name."
  usage
  exit 1
fi

APP_NAME="$1"
APP_PATH="./apps/mobile/$APP_NAME"
IOS_PATH="$APP_PATH/ios"

# Check if the app exists
if [ ! -d "$APP_PATH" ]; then
  echo "❌ Error: The app '$APP_NAME' does not exist in 'apps/mobile'."
  exit 1
fi

# Run pnpm install in the app's directory
echo "📦 Running 'pnpm install' in '$APP_PATH'..."
cd "$APP_PATH"
pnpm install
cd - > /dev/null

# Check if Ruby is installed (CocoaPods is required)
if ! command -v ruby &> /dev/null; then
  echo "❌ Error: Ruby is not installed. Please install Ruby before running this script."
  exit 1
fi

# If the iOS folder exists, run pod install
if [ -d "$IOS_PATH" ]; then
  echo "📱 Running 'pod install' in '$IOS_PATH'..."
  cd "$IOS_PATH"
  pod install
  cd - > /dev/null
else
  echo "⚠️ Warning: No iOS folder found in '$APP_PATH'. Skipping 'pod install'."
fi

echo "✅ Mobile app '$APP_NAME' setup completed successfully!"
