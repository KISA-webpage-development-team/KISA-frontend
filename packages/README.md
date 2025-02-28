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
