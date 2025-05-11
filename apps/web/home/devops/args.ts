const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const useLocalBackend = args.includes("-l");

const envPath = path.join(process.cwd(), ".env.local");

// Read existing .env.local file
let envContent = "";
try {
  envContent = fs.readFileSync(envPath, "utf8");
} catch (error) {
  // File doesn't exist, which is fine
}

// Split the content into lines
const envLines = envContent.split("\n");

// Find and replace or add the NEXT_PUBLIC_USE_LOCAL_BACKEND variable
let found = false;
const updatedEnvLines = envLines.map((line) => {
  if (line.startsWith("NEXT_PUBLIC_USE_LOCAL_BACKEND=")) {
    found = true;
    return `NEXT_PUBLIC_USE_LOCAL_BACKEND=${
      useLocalBackend ? "true" : "false"
    }`;
  }
  if (line.startsWith("NEXT_PUBLIC_USE_LOCAL_WEBSOCKET=")) {
    found = true;
    return `NEXT_PUBLIC_USE_LOCAL_WEBSOCKET=${
      useLocalBackend ? "true" : "false"
    }`;
  }
  return line;
});

if (!found) {
  updatedEnvLines.push(
    `NEXT_PUBLIC_USE_LOCAL_BACKEND=${useLocalBackend ? "true" : "false"}`
  );
  updatedEnvLines.push(
    `NEXT_PUBLIC_USE_LOCAL_WEBSOCKET=${useLocalBackend ? "true" : "false"}`
  );
}

// Join the lines back together
const updatedEnvContent = updatedEnvLines.join("\n");

// Write the updated content back to .env.local
fs.writeFileSync(envPath, updatedEnvContent, "utf8");

console.log(
  `Setting up to use ${useLocalBackend ? "LOCAL" : "PRODUCTION"} backend`
);
