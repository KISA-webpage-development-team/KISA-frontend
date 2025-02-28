import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Custom action to assign the next available port
function assignPort() {
  const configPath = path.resolve("devops/config/native-port.json");
  let config = { lastPort: 8999 };
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }
  // Calculate next port: e.g., start at 9000
  const newPort = config.lastPort + 1;
  // Update the config
  config.lastPort = newPort;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  // Return the new port for use in templates
  return newPort;
}

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
      const mobileAppsPath = "./apps/mobile";
      const appPath = `${mobileAppsPath}/${appName}`;

      // Preliminary checks ---------------------------------------------------
      // Ensure the mobile folder exists
      if (!fs.existsSync(mobileAppsPath)) {
        fs.mkdirSync(mobileAppsPath);
      }

      // Enforce uniqueness for host app
      const mobileHostAppPath = `${mobileAppsPath}/host`;
      if (isHost && fs.existsSync(mobileHostAppPath)) {
        throw new Error("Host app already exists");
      }

      // Prevent duplicate app creation
      if (fs.existsSync(appPath)) {
        throw new Error("App already exists");
      }

      // Actions ----------------------------------------------------------------
      const actions = [];
      // Run `npx @react-native-community/cli` to initialize the project
      actions.push({
        type: "runCommand",
        command: `cd ./apps/mobile && npx @react-native-community/cli@latest init ${appName} --skip-git-init --skip-install 2>/dev/null`,
      });

      // Convert the project to use Repack
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && pnpm dlx @callstack/repack-init`,
        description: `Converting project to use Repack...`,
      });

      // Install project cocoapods dependencies
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && bundle install && bundle exec pod repo update && cd ios && bundle exec pod install`,
        description: `Installing project cocoapods dependencies...`,
      });

      // Delete existing replacement files
      // package.json, tsconfig.json, webpack.config.mjs
      actions.push(() => {
        const filesToDelete = [
          "package.json",
          "tsconfig.json",
          "webpack.config.mjs",
        ];
        filesToDelete.forEach((file) => {
          const filePath = path.join(appPath, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });

      // [TODO] below code is for the project app (not host)
      // Add template files necessary for module federation
      if (!isHost) {
        const port = assignPort();

        const data = {
          appName: appName,
          port: port,
        };

        actions.push({
          type: "addMany",
          templateFiles: `templates/react-native/**`,
          destination: `./apps/mobile/{{appName}}`,
          base: `templates/react-native`,
          data,
          abortOnFail: true,
        });

        // modify mobile root package.json to add start script
        actions.push({
          type: "modify",
          path: "./apps/mobile/package.json",
          pattern: /("scripts":\s*{)/,
          template:
            '$1\n    "start:{{appName}}": "cd {{appName}} && pnpm start",',
        });

        // modify host app's index.js to add new url resolver
        // but first, check if the host app exists, if not, throw an error
        if (fs.existsSync(mobileHostAppPath)) {
          actions.push({
            type: "modify",
            path: `${mobileHostAppPath}/index.js`,
            pattern: /(containers:\s*{)/,
            template:
              '$1\n    {{appName}}: "http://localhost:{{port}}/[name][ext]",',
            data,
          });
        } else {
          throw new Error("Host app does not exist");
        }
      }
      // Run `pnpm install`
      actions.push({
        type: "runCommand",
        command: `cd ${appPath} && pnpm install --silent`,
        description: `Running install to install dependencies for ${appName}...`,
      });

      return actions;
    },
  });
}
