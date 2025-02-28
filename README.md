# Nextjs + ReactNative Monorepo Micro Frontend

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

## Internal Packages

#### `tsconfig.json`

- `extends`: "@repo/typescript-config/base"

  > [NOTE]
  > You can use different extends options provided by "@repo/typescript-config"

- `compilerOptions`

  - `strict`: if it's true, it will enable all the strict type checking options
    > [NOTE]
    > most of the `tsconfig.json` in this repo are using `strict: true` option.
  - `paths`: defines the paths to the packages
  - `plugins`: defines the plugins to be used in the project

  check out more options [here](https://www.typescriptlang.org/tsconfig/#compilerOptions)

- `include`: defines the files that should be compiled in TS

- `exclude`: defines the files that should not be compiled in TS

  > ex) `node_modules` - packages are compiled in their own packages, no need to compile them again with TS

  > **[IMPORTANT]** > `include` and `exclude` are not inherited from the base config,
  > you must define them in each package's `tsconfig.json`.

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
