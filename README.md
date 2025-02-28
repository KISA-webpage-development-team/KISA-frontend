
![KISA logo only (1)](https://github.com/user-attachments/assets/e57b3b34-b3af-4e8b-9b14-cca2fe6f2b65)
# KISA Frontend Monorepo

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
