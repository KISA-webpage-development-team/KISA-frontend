# Delete a Modular Project

Follow the steps below when you want to delete a modular (mini) project.

**DO NOT DELETE the app with "rm -rf", please use the command below. This deletion command is synchronized with the [Project Creation](./docs/project-creation.md) to keep the monorepo clean and easy to manage.**

## Delete a mobile project

```bash
pnpm delete:mobile <project-name>
```

This command will remove the project from the host app and the monorepo.
But make sure the remove the import statement of the deleted project in the host app.

For example, after running the command above to delete "pocha" project, remove any related codes about "pocha" in the "host/App.tsx".

```ts
// apps/mobile/host/App.tsx

// DELETE THIS CODE
const Pocha = lazy(() => Federated.importModule('pocha', './App'));

// rest of the code...

// DELETE THIS CODE
<Suspense fallback={<Loading />}>
  <Pocha />
</Suspense>

// ...
```

## Delete a web project

WIP
