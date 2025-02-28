# KISA Frontend · ![pnpm](https://img.shields.io/badge/pnpm-v10-yellow) ![Next.js](https://img.shields.io/badge/Next.js-v14.2.14-blue) ![React Native](https://img.shields.io/badge/ReactNative-v0.78.0-skyblue)

**KISA Frontend Repository** is a Monorepo for the KISA Dev Team, managing all frontend code in one place.  
It contains two deployed applications (Web, Mobile) and includes modular subprojects along with shared packages for reusable components and utilities.

- **Web App** ([`apps/web/host`](./apps/web/host)) – The main **Next.js** application (deployed)
- **Mobile App** ([`apps/mobile/host`](./apps/mobile/host)) – The main **React Native** application (deployed)
- **Modular subprojects**:
  - [`apps/web/*`](./apps/web) – Independent Next.js modules integrated into the web app
  - [`apps/mobile/*`](./apps/mobile) – Independent React Native modules integrated into the mobile app
- **Shared Packages** ([`packages/`](./packages)) – Common UI components, utilities, and shared logic

## Prerequisites

### 1. Install node.js

https://nodejs.org/en/download

### 2. Install pnpm

> **About migration**:
> We are no longer using npm as our package manager. We are using pnpm instead.

> **Important**:
> Highly recommend to use corepack to install pnpm.

https://pnpm.io/installation#using-corepack

```bash
pnpm --version # check if pnpm is installed (should be >=10)
```

### 3. Install rvm & ruby

Ruby Version Manager (RVM) is necessary to install ruby.
Ruby is used to install cocoapods for react native applications.

```bash
curl -sSL https://get.rvm.io | bash -s stable
```

If a command above doesn't work, try to install ruby manually.

```bash
ruby -v # check if ruby is installed (should be >= 3.0.0)
```

### 4. Install CocoaPods

CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects.
This is necessary to convert the react native project to a native iOS project to run on a ios device or simulator.

```bash
sudo gem install cocoapods
```

### 5. Install XCode

XCode is necessary to run the react native project on a ios device or simulator.

Try using this command to install xcode.

```bash
brew install --cask xcode
```

Or download it from [App Store](https://apps.apple.com/app/xcode/id497799835).

### 6. Install Android Studio

> **Note**
> You can skip this step if you don't want to run the react native project on an android device or simulator.

Try following this youtube video to install android studio.

https://www.youtube.com/watch?v=i356Lxb9gEk

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KISA-webpage-development-team/KISA-frontend.git
cd KISA-frontend
```

### 2. Setup the monorepo

After opening the repository on your code editor, run the following command to install the dependencies.

```bash
pnpm setup:monorepo
```

> **Note** > `pnpm setup:monorepo` is equivalent to running `pnpm install` in the root directory and running `pod install` in the `apps/mobile/<app>/ios` directory. For more information, please refer to the [setup-monorepo.sh](./devops/setup-scripts/setup-monorepo.sh) script.

### 3. Run the development server

> [!IMPORTANT]
> This command doesn't directly run the mobile app on the simulator. For more information, **you must read the [Dev Scripts](./docs/dev-scripts.md)**.

#### Running all apps (web, mobile, packages)

```bash
pnpm dev
```

#### Running a mobile app (mobile host app)

```bash
pnpm dev:mobile
```

#### Running a web app (web host app)

```bash
pnpm dev:web
```

## Tech Stacks

#### Frontend - Web

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

#### Frontend - Mobile

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

#### Monorepo & Micro-frontend

![Turborepo](https://img.shields.io/badge/Turborepo-0C0606?style=for-the-badge&logo=turborepo&logoColor=EF4444) ![pnpm](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white) ![Re.pack](https://img.shields.io/badge/Re.pack-purple?style=for-the-badge&logo=repack&logoColor=EF4444)

## Appendix

- [Dev Scripts](./docs/dev-scripts.md)
  : When you want to know more about how to run the development server
- [Project Creation](./docs/project-creation.md)
  : When you want to create a new modular (mini) project
- [Project Deletion](./docs/project-deletion.md)
  : When you want to delete a modular (mini) project
