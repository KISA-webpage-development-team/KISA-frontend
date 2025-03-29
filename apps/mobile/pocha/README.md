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

Then, go to the "mobile .env.local" file in google drive and copy the contents back to your .env.local file in the "pocha" directory
https://docs.google.com/document/d/19-yPsUh6Z2ZY-jnRyMDnM4l3IT3IEjaZv1jLeqEtcN8/edit?tab=t.0

Then, build the app again

```bash
pnpm run ios
```

Finally, run the app

```bash
pnpm start
```

## Sample User usage

```ts
import { useUser } from "@/contexts/UserContext";
...

const {user} = useUser();

// user is the logged in user
console.log(user.email);
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

### JWT

react-native-pure-jwt

#### Token usage example

```ts
import {getToken} from '@/shared/lib/react-native-keychain/keychain';

const token = await getToken();

console.log(token);

// Then, token can be used for API calls
```
