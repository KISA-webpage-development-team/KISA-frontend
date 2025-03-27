# Pocha App

## [UPDATE] Session + API Connection Enabled
after pulling `pocha` branch,

First, clear the root node_modules at the root directory
```bash
# make sure you are in the root directory (KISA-frontend)
rm -rf node_modules
rm pnpm-lock.yaml
```

Then, cd to the `/apps/mobile/pocha` directory
```bash
cd /apps/mobile/pocha
```

Now clear node_modules and pod files
```bash
pnpm clear
pnpm clear-pod
```

Now, install pods and pnpm
```bash
pnpm full-install # checkout package.json for more details
```

Then, build the app again
```bash
pnpm run ios
```

Finally, run the app
```bash
pnpm start
```

## Getting Started

```bash
pnpm install
pnpm dlx pod-install ios
```

```bash
pnpm run ios
pnpm start
```

## Notes
### After Pulling
need to install pods and pnpm again
```bash
pnpm dlx pod-install ios
pnpm install
```

