# This script is used to cancel the build if the commit is not on the "main" or "dev" branch

#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# Add any other branch you want to allow to deploy with its own URL on Vercel
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "dev"  ]] ; then
    echo "✅ - Build can proceed"
  exit 1;

else
  echo "🛑 - Build cancelled"
  exit 0;
fi