# Pocha Mobile App Module

## Getting Started

Make sure you have followed "Install Mobile App on Simulator" section in [Dev Scripts](../../../docs/dev-scripts.md) before running the following the steps below.

> [!NOTE]
> If you are Windows user, you can skip the "Install Mobile App on Simulator" section and run the following command to start the development server. Because the current android installation script is not implemented yet.

### 1. Open the "pocha" folder in your favorite IDE.

### 2. Install depedencies (if needed, you can skip this step if you have already installed the dependencies)

```bash
pnpm install
```

### 3-1. Open iOS simulator (for Mac)

- Open XCode
- Click "XCode" menu on the top left corner of the whole screen
- Select "Open Developer Tool > Simulator"
- After the simulator app is opened, right click on the simulator
- Select "Devices" and choose the simulator you installed the "pocha" app
- After the simulator is opened, you can see the "pocha" app icon on the simulator
- Click the "pocha" app icon to open the app

### 3-2. Open Android simulator (for Windows or Mac with Android Studio installed)

- Open Android Studio
- Click "More Actions" dropdown menu on the center of the screen
- Select "Virtual Device Manager"
- Choose the simulator you installed the "pocha" app
- Launch the simulator by pressing "Play" icon on the Actions tab

### 4. Start the development server

```bash
pnpm start:standalone # if you are using Mac
pnpm run android # if you are using Windows (this will automatically open the Android Studio Simulator)
```

If you want to run the app directly on the simulator, you can run the following command instead.

```bash
pnpm run ios # for iOS (Mac)
pnpm run android # for Android (Windows or Mac with Android Studio installed)
```

### 5. Run the app on the simulator

- After the development server is started, you can reload the app on the simulator

### 6. Stop the development server

Simply press `Ctrl + C` on the terminal where the development server is running, and close the simulator.

## Web-to-Mobile UI Migration Guide
