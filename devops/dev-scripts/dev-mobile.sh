#!/usr/bin/env bash
set -e

# Function to display usage help
usage() {
  cat <<EOF
Usage: pnpm dev:mobile [app] [--ios|--android]

Examples:
  pnpm dev:mobile
    Runs the host app via:
      turbo run dev:mobile --filter=root-mobile
  
  pnpm dev:mobile --ios
    Runs the host app on ios simulator via:
      pnpm run ios

  pnpm dev:mobile --android
    Runs the host app on android emulator via:
      pnpm run android

  pnpm dev:mobile pocha
    Runs the "pocha" app in standalone mode via:
      pnpm run start:standalone

  pnpm dev:mobile pocha --ios
    Navigates to apps/mobile/pocha and runs:
      pnpm run ios

  pnpm dev:mobile pocha --android
    Navigates to apps/mobile/pocha and runs:
      pnpm run android

  pnpm dev:mobile --help
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


# If the first argument starts with "--", then no app name is provided.
if [ "$#" -eq 0 ]; then
  APP=""
elif [[ "$1" == --* ]]; then
  APP=""
else
  APP="$1"
  shift
fi



# Default command is "start:standalone"
SCRIPT="start:standalone"

# Process remaining flags
FLAG=""
for arg in "$@"; do
  case "$arg" in
    --ios)
      FLAG="ios"
      ;;
    --android)
      FLAG="android"
      ;;
    *)
      echo "Unknown option: $arg"
      usage
      exit 1
      ;;
  esac
done

if [ -z "$APP" ]; then
  # No app provided.
  if [ "$FLAG" = "ios" ]; then
    echo "No app specified. Running mobile folder command: dev:ios..."
    cd apps/mobile || { echo "apps/mobile not found"; exit 1; }
    pnpm run dev:ios
    exit $?
  elif [ "$FLAG" = "android" ]; then
    echo "No app specified. Running mobile folder command: dev:android..."
    cd apps/mobile || { echo "apps/mobile not found"; exit 1; }
    pnpm run dev:android
    exit $?
  else
    echo "No app specified. Running host app (root-mobile)..."
    turbo run dev --filter=root-mobile
    exit $?
  fi
fi

# If an app name is provided, verify that it exists
if [ ! -d "apps/mobile/$APP" ]; then
  echo "Error: App '$APP' does not exist in apps/mobile."
  exit 1
fi

# For an app, if a flag is given, set the script accordingly.
if [ "$FLAG" = "ios" ]; then
  SCRIPT="ios"
elif [ "$FLAG" = "android" ]; then
  SCRIPT="android"
fi

if [[ "$SCRIPT" == "start:standalone" ]]; then
  echo "Running standalone mode for app \"$APP\" using TurboRepo..."
  cd "apps/mobile/$APP" || { echo "Directory apps/mobile/$APP not found"; exit 1; }
  pnpm run "$SCRIPT"
else
  echo "Running app \"$APP\" with command \"$SCRIPT\"..."
  cd "apps/mobile/$APP" || { echo "Directory apps/mobile/$APP not found"; exit 1; }
  pnpm run "$SCRIPT"
fi