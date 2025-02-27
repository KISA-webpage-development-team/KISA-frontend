#!/usr/bin/env bash
set -e

# Function to display usage help
usage() {
  cat <<EOF
Usage: pnpm delete:mobile [app]

Examples:
  pnpm delete:mobile host
    -> [WIP] Currently, the host app cannot be deleted.

  pnpm delete:mobile pocha
    -> Performs the following:
         1) Removes the "pocha" entry from the containers object in the host app's index.js.
         2) Deletes the "pocha" folder from apps/mobile.
         3) Decrements the port number in devops/config/native-port.json by one.
         4) Removes the "start:pocha" script from apps/mobile/root-mobile/package.json.

  pnpm delete:mobile --help
    -> Displays this help message.
EOF
}

# If --help or -h option is present, display usage
for arg in "$@"; do
  if [[ "$arg" == "--help" || "$arg" == "-h" ]]; then
    usage
    exit 0
  fi
done

# If no app name is provided as an argument
if [ $# -eq 0 ]; then
  usage
  exit 1
fi

APP="$1"

# The host app cannot be deleted
if [ "$APP" = "host" ]; then
  echo "Error: Deleting the host app is not allowed."
  exit 1
fi

# Check if the app to be deleted exists under apps/mobile
if [ ! -d "apps/mobile/$APP" ]; then
  echo "Error: App '$APP' does not exist in apps/mobile."
  exit 1
fi

# 1) Remove the entry of the app from the host app's index.js file
HOST_INDEX="apps/mobile/host/index.js"
if [ ! -f "$HOST_INDEX" ]; then
  echo "Error: Host index file not found at $HOST_INDEX."
  exit 1
fi

echo "Removing '$APP' entry from host app's containers in $HOST_INDEX..."
# Create a backup (for possible recovery)
cp "$HOST_INDEX" "${HOST_INDEX}.bak"
# Remove the line with the app name (with or without quotes) followed by a colon (:)
sed -i.bak -E "/['\"]?$APP['\"]?\s*:/d" "$HOST_INDEX"

# 2) Delete the app folder
echo "Deleting app folder apps/mobile/$APP..."
rm -rf "apps/mobile/$APP"

# 3) Decrement the port number in devops/config/native-port.json
PORT_FILE="devops/config/native-port.json"
if [ ! -f "$PORT_FILE" ]; then
  echo "Error: Port file not found at $PORT_FILE."
  exit 1
fi

echo "Decrementing port number in $PORT_FILE..."
node -e "const fs = require('fs'); const file = '$PORT_FILE'; let data = JSON.parse(fs.readFileSync(file, 'utf8')); data.lastPort = data.lastPort - 1; fs.writeFileSync(file, JSON.stringify(data, null, 2));"

# 4) Remove the "start:<app>" script from the root mobile package.json
ROOT_PKG="apps/mobile/package.json"
if [ ! -f "$ROOT_PKG" ]; then
  echo "Error: Root mobile package.json not found at $ROOT_PKG."
  exit 1
fi

echo "Removing start:$APP script from $ROOT_PKG..."
node -e "const fs = require('fs'); const file = '$ROOT_PKG'; let pkg = JSON.parse(fs.readFileSync(file, 'utf8')); if(pkg.scripts && pkg.scripts['start:$APP']) { delete pkg.scripts['start:$APP']; fs.writeFileSync(file, JSON.stringify(pkg, null, 2)); }"

# 5) Remove the backup index.js file
rm "${HOST_INDEX}.bak"

echo "App '$APP' deleted successfully."
