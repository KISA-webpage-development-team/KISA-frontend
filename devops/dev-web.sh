#!/usr/bin/env bash
set -e

# Function to display usage help
usage() {
  cat <<EOF
Usage: pnpm dev:web [app]

Examples:
  pnpm dev:web
    Runs the host web app via:
      turbo run dev:web --filter=root-web

  pnpm dev:web course-eval
    Runs the "course-eval" app in standalone mode via:
      pnpm run start

  pnpm dev:web --help
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

# No positional argument: run host app (root-web)
if [ "$#" -eq 0 ]; then
  # Verify that the host app exists as a directory
  if [ ! -d "apps/web/root-web" ]; then
    echo "Error: Host app (root-web) does not exist in apps/web."
    exit 1
  fi

  echo "No app specified. Running host app (root-web)..."
  turbo run dev:web --filter=root-web
  exit $?
fi

# First argument is the app name
APP="$1"
shift

# Verify that the specified app exists as a directory
if [ ! -d "apps/web/$APP" ]; then
  echo "Error: App '$APP' does not exist in apps/web."
  exit 1
fi

# Default command is "start"
SCRIPT="start"

# Process remaining flags (for web, we don't expect any flags)
for arg in "$@"; do
  echo "Unknown option: $arg"
  usage
  exit 1
done

# Change directory into the app folder and run the command
echo "Running app \"$APP\" with command \"$SCRIPT\"..."
cd "apps/web/$APP" || { echo "Directory apps/web/$APP not found"; exit 1; }
pnpm run "$SCRIPT"
