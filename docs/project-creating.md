# Create a New Modular Project

Follow the steps below when you start a new mini project (mobile or web) under the monorepo + micro-frontend architecture.

## Generate a new mobile project (React Native)

```bash
pnpm create:mobile
```

This command will generate a new react native application in the `apps/mobile` folder.

All the setup for the new mobile project is done automatically.

### How to load the new mobile project at the host app

Example code to load the new "pocha" mobile project at the host app.

```ts
// apps/mobile/host/App.tsx

const Pocha = lazy(() => Federated.importModule('pocha', './App'));

export default function App() {
  return (
    {/* rest of the code... */}
    <Suspense fallback={<Loading />}>
      <Pocha />
    </Suspense>
  )
}
```

> [!IMPORTANT]
> Entry point of the exported module from the new mobile project should be `./src/App.tsx`. There is a `/App.tsx` file in the root directory of the new mobile project, which is used for the entry point of the new mobile project itself for testing purposes, not for the host app.

### How to use the internal packages at the new mobile project

```ts
import { Button } from "@repo/ui/button";

export default function App() {
  return (
    <View>
      <Button text="Click me" onClick={() => {}} />
    </View>
  );
}
```

## Generate a new web project (Next.js)

```bash
pnpm create:web
```

This command will generate a new next.js application in the `apps/web` folder.

All the setup for the new web project is done automatically.

### How to load the new web project at the host app

WIP

### How to use the internal packages at the new web project

```ts
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div>
      <Button text="Click me" onClick={() => {}} />
    </div>
  )
}
```
