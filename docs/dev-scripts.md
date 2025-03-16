# Dev Scripts

**You must be familiar with the commands here.** Understanding the dev commands is the key for seamless development with the KISA frontend repository.

## Install Mobile App on Simulator

**Before mobile app development, you need to first install the mobile apps on the simulator.** This ensures that you can run the apps on the simulator while running `dev:mobile` or `start` commands.

> [!IMPORTANT]
> These installation commands below only needs to be run once when you first clone the repository or created a new project.

### 1. Install the "host" mobile app on the IOS simulator

(currently, only iOS is supported)

```bash
pnpm dev:mobile --ios
```

> [!NOTE]
> This command may fail, but unless you can see an app installed on the simulator, you can ignore the error.

### 2. Install the modular apps on the IOS simulator

(currently, only iOS is supported)

```bash
pnpm dev:mobile <app-name> --ios
```

> [!NOTE]
> This command may fail, but unless you can see an app installed on the simulator, you can ignore the error.

## Root Directory Commands

Here, root directory means the "KISA-frontend" directory's root.

### To run all apps in the repository (web, mobile, packages)

```bash
pnpm dev
```

This command will run all the apps in parallel using `turbo run dev`. For more information about how this command runs all the dev tasks inside the repository, please refer to the [Turborepo](https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks) documentation.

> [!IMPORTANT]
> This command **doesn't directly run the mobile app on the simulator.** Instead, it runs the mobile app's metro bundler in local server. This means if you have a running simulator with a "host" app installed, you can simply open the "host" app on the simulator and start developing the mobile app.

### To run only the Host Mobile App

```bash
pnpm dev:mobile
```

This command will run the "host" mobile app in local server.
You will see the following output in the terminal.

```bash
[host] [DevServer] Server listening at http://[::1]:8081
[pocha] [DevServer] Server listening at http://[::1]:9000
[host] [DevServer] Server listening at http://127.0.0.1:8081
[pocha] [DevServer] Server listening at http://127.0.0.1:9000
```

This means the "host" mobile app is running at `http://[::1]:8081` or `http://127.0.0.1:8081`.
And modular app (e.g. `pocha`) is running at `http://[::1]:9000` or `http://127.0.0.1:9000`.

Now, you can **open the "host" mobile app on the simulator** and start developing the "host" app.

> [!NOTE]
> While running "host" mobile app on the simulator, you can edit modular apps as well, but it won't support HMR (hot reloading) yet. So if there's a code change on modular app, you need to manually reload the "host" app on the simulator.

### To run only the Modular Mobile App

```bash
pnpm dev:mobile <app-name>
```

This command will run the modular mobile app (e.g. `pocha`) in local server with standalone mode. Here, the entry point of the app is `./apps/mobile/<app-name>/App.tsx`. And the exported module is `./apps/mobile/<app-name>/src/App.tsx`. Make sure you are aware of this when you are developing the modular app.

### To run only the Host Web App

```bash
pnpm dev:web
```

This command will run the "host" web app in local server.

This command is still under development, so if you add more web modular apps, this command will run all the web apps, not just the "host" web app.

## ⭐ Most Common Scenario: Working on the Modular Mobile App ⭐

Here, we will assume you are working on the `pocha` modular mobile app.

### 1. Open the "pocha" app with your favorite IDE

or You can just work on the root directory of the repository with [Root Directory Commands](#root-directory-commands)

### 2. Run the "pocha" mobile app on the simulator

```bash
pnpm start:standalone
```

> [!NOTE]
> This command is different from `pnpm dev:mobile` command. `pnpm dev:mobile` command only works when you run at the root directory. It's basically the same as running `cd ./apps/mobile/pocha && pnpm start:standalone`. So if you open the "pocha" app independently, you need to run `pnpm start:standalone` instead.

### 3. Open the "pocha" app on the simulator

If nothing appears, try reloading the app with `Cmd + R` or `R` on either terminal or simulator.

### 4. Make changes to the "pocha" app

Make changes to the `./apps/mobile/pocha` directory's codes.

### 5. See the changes on the "pocha" app

If you see the changes on the "pocha" app (simulator), you can be sure that your changes are applied correctly.

### 6. Happy Coding~

## Notes

To know more about how `pnpm dev:mobile` and `pnpm dev:web` work, please refer to scripts: [dev:mobile](./devops/dev-scripts/dev-mobile.sh) and [dev:web](./devops/dev-scripts/dev-web.sh).
