#!/usr/bin/env bash
set -e

# Function to display usage help
usage() {
  cat <<EOF
Usage: pnpm dev:native [app] [--ios|--android]

Examples:
  pnpm dev:native
    Runs the host app via:
      turbo run dev:native --filter=root-native

  pnpm dev:native pocha
    Runs the "pocha" app in standalone mode via:
      pnpm run start:standalone

  pnpm dev:native pocha --ios
    Navigates to apps/native/pocha and runs:
      pnpm run ios

  pnpm dev:native pocha --android
    Navigates to apps/native/pocha and runs:
      pnpm run android

  pnpm dev:native --help
    Displays this help message.
EOF
}

# Check for help flag anywhere in the arguments
for arg in "$@"; do
  if [[ "$arg" == "--help" || "$arg" == "-h" ]]; then
    usage
    exit 0
  fi
done

# No positional argument: run host app (root-native)
if [ "$#" -eq 0 ]; then
  # Verify that the host app exists as a directory
  if [ ! -d "apps/native/root-native" ]; then
    echo "Error: Host app (root-native) does not exist in apps/native."
    exit 1
  fi

  echo "No app specified. Running host app (root-native)..."
  turbo run dev:native --filter=root-native
  exit $?
fi

# First argument is the app name
APP="$1"
shift

# Verify that the specified app exists as a directory
if [ ! -d "apps/native/$APP" ]; then
  echo "Error: App '$APP' does not exist in apps/native."
  exit 1
fi

# Default command is "start"
SCRIPT="start:standalone"

# Process remaining flags
for arg in "$@"; do
  case "$arg" in
    --ios)
      SCRIPT="ios"
      ;;
    --android)
      SCRIPT="android"
      ;;
    *)
      echo "Unknown option: $arg"
      usage
      exit 1
      ;;
  esac
done

if [[ "$SCRIPT" == "start" ]]; then
  # Run standalone mode via TurboRepo for the given app
  echo "Running standalone mode for app \"$APP\" using TurboRepo..."
  turbo run dev:native --filter="$APP"
else
  # Otherwise, change directory into the app folder and run the platform-specific command
  echo "Running app \"$APP\" with command \"$SCRIPT\"..."
  cd "apps/native/$APP" || { echo "Directory apps/native/$APP not found"; exit 1; }
  pnpm run "$SCRIPT"
fi
