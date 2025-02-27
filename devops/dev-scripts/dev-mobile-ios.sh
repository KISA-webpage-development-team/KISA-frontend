#!/usr/bin/env bash
set -e

# dev-mobile-ios.sh
# This script runs the iOS command for the host app
# and the start command for every remote app in apps/mobile.
# It is intended to be run from within the apps/mobile directory.

echo "Starting host app (ios)..."
# Run the host app's ios command in the background
(cd host && pnpm run ios) &

# Run remote apps: iterate through each directory except 'host'
for dir in $(find . -maxdepth 1 -type d ! -name '.' -exec basename {} \;); do
  if [ ! -f "$dir/package.json" ]; then
    continue
  fi

  # run the start command for every remote app in apps/mobile
  pnpm --prefix "$dir" run start &
done

echo "All commands initiated. Waiting for processes to complete..."
wait
