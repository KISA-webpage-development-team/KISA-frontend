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
- After the simulator app is opened, right-click the simulator's icon on the Mac Dock.
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

## Web-to-Mobile Migration Guide: Folder Structure
`/src/App.tsx` is an entry point of the pocha mobile application. All the migrated codes should be located under the `src` folder. This migration guide assumes that all the mobile folders are located under the `src` folder of the "pocha" project.

### 1. `app` folder (web) -> `screens` folder (mobile)

### 2. `features/pocha/components` folder (web) -> `components` folder (mobile)

### 3. `features/pocha/hooks` folder (web) -> `hooks` folder (mobile)

### 4. `features/pocha/utils` folder (web) -> `utils` folder (mobile)

### 5. `types/pocha.ts`(web) -> `types/pocha.ts` (mobile)

### 6. `apis/pocha` folder (web) -> `apis` (mobile)

### 7. Any other folders or codes not specified from #1 to #6 -> `shared` with same folder structure as web (mobile)
#### Example 1: `final_refactor_src/components/feedback/LoadingSpinners.tsx` (web) -> `shared/components/feedback/LoadingSpinners.tsx`
**Web**

![스크린샷 2025-03-01 오후 1 24 50](https://github.com/user-attachments/assets/42db1fb6-998c-43a2-8f6a-60353dacdbb4)

**Mobile**

![스크린샷 2025-03-01 오후 1 25 23](https://github.com/user-attachments/assets/4236231b-2415-4bde-aa00-802eaf1fadfb)

#### Example 2: `lib/axios` folder (web) -> `shared/lib/axios` folder (mobile)
**Web**

![스크린샷 2025-03-01 오후 1 26 23](https://github.com/user-attachments/assets/7aa684ca-2b6e-486b-b54f-93b3b3598a8d)

**Mobile**

![스크린샷 2025-03-01 오후 1 27 01](https://github.com/user-attachments/assets/08002637-846b-49d6-8833-bd645d8392d5)

## Web-to-Mobile Migration Guide: UI

### Converting HTML tags to Native tags
**Web**

```ts
{/* components/home/HomeHeading.tsx */}
<div
      className="flex flex-col items-center px-4 pt-2 gap-2"
      id="pocha-heading"
    >
      {/* Title - pocha name */}
      <h1 className={`${sejongHospitalBold.className} text-xl`}>
        {pochaInfo?.title}
      </h1>

      {/* Description - pocha description */}
      <p className="text-center text-sm">{pochaInfo?.description}</p>
    </div>
```

**Mobile**


