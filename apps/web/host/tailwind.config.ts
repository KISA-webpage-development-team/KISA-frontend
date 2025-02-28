import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "presets" | "content"> = {
  presets: [sharedConfig],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
