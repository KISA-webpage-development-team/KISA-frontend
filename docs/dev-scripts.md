# Dev Scripts

You must be familiar with the commands here. Understanding the dev commands is the key for seamless development with the KISA frontend repository.

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

### To run only the mobile app

#### Case 1. Running Host App

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

### To run only the web app

````

### To run only the web app

```bash
pnpm dev:web
````

This command will run the "host" web app in local server.
This command is still under development, so if you add more web modular apps, this command will run all the web apps, not just the "host" web app.
