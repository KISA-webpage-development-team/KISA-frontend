#!/usr/bin/env bash
set -e

# 사용법(help) 출력 함수
usage() {
  cat <<EOF
Usage: ./setup-monorepo.sh

This script sets up the monorepo by installing dependencies and setting up iOS pods.

Requirements:
- Ruby must be installed to run CocoaPods.

Steps:
1. Runs 'pnpm install' at the root directory.
2. Finds all apps in 'apps/mobile' (excluding node_modules).
3. Runs 'pod install' in each app's iOS folder.

Examples:
  ./setup-monorepo.sh   # Runs the full setup
  ./setup-monorepo.sh --help   # Displays this help message
EOF
}

# Check for help flag
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  usage
  exit 0
fi

# Run pnpm install in the root directory
echo "Running 'pnpm install' in the root directory..."
pnpm install

# Check if Ruby is installed (CocoaPods is required)
if ! command -v ruby &> /dev/null; then
  echo "❌ Error: Ruby is not installed. Please install Ruby >= 3.0.0 before running this script."
  exit 1
fi

# Find all React Native apps in the 'apps/mobile' folder 
# and run 'pod install' in their iOS folders
MOBILE_APPS_DIR="./apps/mobile"

echo "Finding all React Native apps in '$MOBILE_APPS_DIR'..."
for app in "$MOBILE_APPS_DIR"/*; do
  if [[ -d "$app" && "$app" != *node_modules* ]]; then
    IOS_DIR="$app/ios"
    
    if [[ -d "$IOS_DIR" ]]; then
      echo "Running `bundle install` in $IOS_DIR..."
      cd "$IOS_DIR"
      bundle install
      cd - > /dev/null
      echo "📦 Running 'pod install' in $IOS_DIR..."
      cd "$IOS_DIR"
      pod install
      cd - > /dev/null
    fi
  fi
done

echo "✅ Monorepo setup completed successfully!"
