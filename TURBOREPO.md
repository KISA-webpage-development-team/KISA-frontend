# Guide to TurboRepo

## Task Configuration

### `turbo.json`

#### `build`

building apps and packages throughout the monorepo

```json
"tasks": {
    "build": {
        "dependsOn": ["^build"],
        "inputs": ["$TURBO_DEFAULT$", ".env*", "**/*.md"],
        "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    }
}
```

- `dependsOn`: when running the task, it will run the tasks with same name in "dependencies" first, then run the task on "dependents".
  (This is critical for running the task in the expected order)

- `inputs`: defines which files and directories should be checked for changes.

  - `$TURBO_DEFAULT$`: this default inputs behavior is often what you want
  - **rest of the inputs**: build task will hit cache, ignoring the changes in the rest of the inputs

- `outputs`: defines which files and directories should be cached. It uses glob pattern, so dist/\*\* handles dist folder for each package, respectively.
  (Current build's output is set to cover Next.js and tsup's build output )

#### `dev`

running the dev (local) server for the apps and packages throughout the monorepo

```json
"dev": {
    "cache": false,
    "persistent": true
}
```

- `cache`: disables caching for this task (this is obvious, because dev environment is meant to be volatile)
- `persistent`: ensures the task continues running indefinitely instead of stopping after execution

#### `clean`

cleaning the cache for the monorepo (node_modules, dist, .expo, etc.)

```json
"clean": {
    "cache": false
}
```

#### `lint`

WIP

## Remote Caching

```bash
pnpm dlx turbo login
```

```bash
pnpm dlx turbo link
```

To disable remote caching,

```bash
pnpm dlx turbo unlink
```
