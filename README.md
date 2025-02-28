# KISA Frontend · ![pnpm](https://img.shields.io/badge/pnpm-v10-yellow) ![Next.js](https://img.shields.io/badge/Next.js-v14.2.14-blue) ![React Native](https://img.shields.io/badge/ReactNative-v0.78.0-skyblue)

**KISA Frontend Repository** is a Monorepo for the KISA Dev Team, managing all frontend code in one place.  
It contains two deployed applications (Web, Mobile) and includes modular subprojects along with shared packages for reusable components and utilities.

- **Web App** ([`apps/web/host`](./apps/web/host)) – The main **Next.js** application (deployed)
- **Mobile App** ([`apps/mobile/host`](./apps/mobile/host)) – The main **React Native** application (deployed)
- **Modular subprojects**:
  - [`apps/web/*`](./apps/web) – Independent Next.js modules integrated into the web app
  - [`apps/mobile/*`](./apps/mobile) – Independent React Native modules integrated into the mobile app
- **Shared Packages** ([`packages/`](./packages)) – Common UI components, utilities, and shared logic

## Create a New Mobile App Project (React Native)

```bash
pnpm create:mobile
```

This command will generate a new react native application in the `apps/mobile` folder.

Example usage of internal packages (no additional setup is needed):

```ts
import { Button } from "@repo/ui/button";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button text="Click me" onClick={() => {}} />
    </View>
  );
}
```

## Generate Web Application [WIP]

```bash
pnpm create:web
```

## Useful Commands

#### `pnpm turbo ls`

list all the packages and apps in the monorepo. Also shows where they are located.

#### `pnpm turbo ls --filter ...<package-name>`

List all the package and apps that depends on (or itself) the given filter package

#### `pnpm turbo run`

List all the tasks that can be run in the monorepo. Each task also includes app and package names that it can be run on.

## Dev Notes

`rn-web` branch: I will try using "react-native-web" for ui package.

### Tool & Dependency Versions

- pnpm: 10.2.1
