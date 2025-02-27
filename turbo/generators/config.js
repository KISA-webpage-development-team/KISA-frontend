import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default function generator(plop) {
  plop.setActionType("runCommand", function (answers, config) {
    try {
      console.log(`Running command: ${config.command}`);
      const output = execSync(config.command, { stdio: "inherit" }); // Sync execution
      return null;
    } catch (error) {
      throw new Error(`Command failed: ${error.message}`);
    }
  });

  // next.js application generator
  plop.setGenerator("next", {
    description: "Generate a new Next.js app with monorepo support",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "appName",
        message: "What should we call this app?",
      },
    ],
    // perform actions based on the prompts
    actions(answers) {
      const actions = [];
      if (!answers) return actions;

      const { appName } = answers;
      const appPath = `./apps/web/${appName}`;

      // 0. check if the web folder exists
      if (!fs.existsSync("apps/web")) {
        fs.mkdirSync("apps/web");
      }

      // 0. check if the app already exists
      if (fs.existsSync(appPath)) {
        throw new Error("App already exists");
      }

      // 1. run `pnpm create next-app`
      actions.push({
        type: "runCommand",
        command: `pnpm create next-app@14 ${appPath} --use-pnpm --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --skip-install 2>/dev/null`,
      });

      actions.push(() => {
        const filesToDelete = [
          "package.json",
          "tsconfig.json",
          "next.config.mjs",
          "tailwind.config.ts",
        ];
        filesToDelete.forEach((file) => {
          const filePath = path.join(appPath, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });

      const data = {
        appName: appName,
      };

      // 2. add the template files
      actions.push({
        type: "addMany",
        templateFiles: `templates/next/**`,
        destination: `./apps/web/{{appName}}`,
        base: `templates/next`,
        data,
        abortOnFail: true,
      });

      // 4. run `pnpm install`
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && pnpm install --silent`, // Pass appName as an argument
        description: `Running install to install dependencies for ${appName}...`,
      });

      return actions;
    },
  });

  // bare react native application generator
  plop.setGenerator("react-native", {
    description: "Generate a new React Native app with monorepo support",
    prompts: [
      {
        type: "confirm",
        name: "isHost",
        message: "Is this app a host?",
        default: false,
      },
      {
        type: "input",
        name: "appName",
        message: "What should we call this app?",
        validate: (input, answers) => {
          if (!input.trim()) return "App name cannot be empty";
          if (answers.isHost && input !== "host") {
            return "App name must be 'host' if it is a host";
          }
          return true;
        },
      },
    ],
    actions(answers) {
      if (!answers) return [];

      const { appName, isHost } = answers;
      const nativeAppsPath = "./apps/native";
      const appPath = `${nativeAppsPath}/${appName}`;

      // Preliminary checks ---------------------------------------------------
      // Ensure the native folder exists
      if (!fs.existsSync(nativeAppsPath)) {
        fs.mkdirSync(nativeAppsPath);
      }

      // Enforce uniqueness for host app
      const nativeHostAppPath = `${nativeAppsPath}/host`;
      if (isHost && fs.existsSync(nativeHostAppPath)) {
        throw new Error("Host app already exists");
      }

      // Prevent duplicate app creation
      if (fs.existsSync(appPath)) {
        throw new Error("App already exists");
      }

      // Actions ----------------------------------------------------------------
      const actions = [];
      // 1. run `npx @react-native-community/cli`
      actions.push({
        type: "runCommand",
        command: `cd ./apps/native && npx @react-native-community/cli@latest init ${appName} --skip-install 2>/dev/null`,
      });

      // 2. convert the project to use Repack
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && npx @callstack/repack-init`,
        description: `Converting project to use Repack...`,
      });

      // 3. install project cocoapods dependencies
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && bundle install && bundle exec pod repo update && cd ios && bundle exec pod install`,
        description: `Installing project cocoapods dependencies...`,
      });

      // [TODO] add template to enable internal package sharing

      // 4. run `pnpm install`
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && pnpm install --silent`,
        description: `Running install to install dependencies for ${appName}...`,
      });

      return actions;
    },
  });

  // expo react native application generator
  plop.setGenerator("expo", {
    description: "Generate a new Expo React Native app with monorepo support",
    prompts: [
      {
        type: "input",
        name: "appName",
        message: "What should we call this app?",
      },
    ],
    actions(answers) {
      const actions = [];
      if (!answers) return actions;

      const { appName } = answers;
      const appPath = `./apps/native/${appName}`;

      // 0. check if the native folder exists
      if (!fs.existsSync("apps/native")) {
        fs.mkdirSync("apps/native");
      }

      // 0. check if the app already exists
      if (fs.existsSync(appPath)) {
        throw new Error("App already exists");
      }

      // 1. run `npx create-expo-app@latest`
      actions.push({
        type: "runCommand",
        command: `pnpm create expo-app ${appPath} --template blank-typescript --no-install 2>/dev/null`,
      });

      actions.push(() => {
        const filesToDelete = ["package.json", "tsconfig.json"];
        filesToDelete.forEach((file) => {
          const filePath = path.join(appPath, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });

      const data = {
        appName: appName,
      };

      // 2. add the template files
      actions.push({
        type: "addMany",
        templateFiles: `templates/native/**`,
        destination: `./apps/native/{{appName}}`,
        base: `templates/native`,
        data,
        abortOnFail: true,
      });

      // 3. run `pnpm install`
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && pnpm install --silent`,
        description: `Running install to install dependencies for ${appName}...`,
      });

      return actions;
    },
  });
}
