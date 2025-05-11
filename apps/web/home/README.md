# KISA Website Frontend

## Tech Stacks

- **Framework**: NextJS (^14.2.4)
- **Styling**: TailwindCSS
- **UI Library**: NextUI + Aceternity UI | React-icons
- **State Management**: React Context API
- **HTTP Client**: Axios (^1.7.2) + SWR (^2.2.5)

## Getting Started

1. run following command to install necessary packages

`npm install`

2. run following command to start running server in localhost

`npm run dev`

3. run following command to build the project and run the server

`npm run build && npm run start`

## Folder Structure (WIP)

### `public`

Contains all public assets like images and logos. Image name follows the format `{id}.png`

- `carousel` folder: Contains images for carousel in home page
- `events` folder: Contains images for events in events page (/about/events)
- `images` folder: Contains images for info pages (/info)
- `quick_links` folder: Contains images for quick links in home page
- `kisa_all.png`: KISA all photo (/about/kisa)

### `src`

- `apis`

  - `[API Name]` folders: API call services (backend connection) and data fetching functions (/apis/[API Name])
    - `mutations.ts`: Mutations for CRUD operations (POST, PUT, DELETE)
    - `queries.ts`: Queries for fetching data (GET)
    - `swrHooks.ts`: Custom SWR hooks for data fetching (GET)

- `app`

  - `layout.js`: Global layout including header & footer
  - `page.js`: Home page
  - `[Page Name]` folders: Different pages with their own `page.js` and `layout.js` (/[Page Name])
  - `api`: NextJS API routes (/api)

- `assets`

  - `fonts` folder: Fonts used in the website

- `constants`

  - `[Constant Name]`: Related constants for [Constant Name] (/constants/[Constant Name])
  - `env.ts`: load environment variables (MUST import env variables ONLY from this file)

- `components` (WIP)

- `lib`

  - `[Library Name]` folders: Third Party Library-related codes (/lib/[Library Name])

- `types`
  - `[Type Name]` folders: Types for the project (/types/[Type Name]) (type name is mostly same as the "entity" name)

## Local Development Setup for Stripe

To use Stripe's payment methods, we need to set up a local development environment by following the steps below.

### 1. Add following keys to `.env.local` file (project source code)

You can get the keys from the Stripe Dashboard.
Or, you can get it from [google docs](https://drive.google.com/file/d/145J_x80rj5XSflhTg_q1UHLaPEzAXdxk/view?usp=drive_link)

**NOTE**: Current keys are for development Stripe account. For deployment, we will use different Stripe account and keys to accept real payments.

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<stripe_publishable_key>
STRIPE_SECRET_KEY=<stripe_secret_key>
```

**NOTE**: There are two types of keys in Stripe: **Test** and **Live** keys. Make sure to use the **Test** keys for local development.

### 2. Run the following command to install necessary packages (project VSCode terminal or terminal)

```
npm install --save stripe @stripe/react-stripe-js @stripe/stripe-js
```

### 3. Open a new terminal (not VSCode) at project folder (KISA-Website-Frontend)

### 4. Set up Ngrok to expose the local server to the internet with HTTPS (required for Stripe Apple Pay and Google Pay)

Sign up Ngrok from [here](https://ngrok.com/)

**NOTE**: From here, you can follow instruction on Ngrok dashboard instead of the following steps. Following steps are ONLY for Mac.

1. Install **ngrok with homebrew** on terminal with a project opened:

```
brew install ngrok/ngrok/ngrok
```

(If you haven't installed homebrew, you can install it from [here](https://brew.sh/))

2. Run the following command to add your authtoken to the default ngrok configuration file:

```
ngrok config add-authtoken <YOUR NGROK TOKEN>
```

### 5. Run the following command to expose the local server to the internet:

```
ngrok http --url=<YOUR NGROK STATIC DOMAIN> 80
```

**NOTE**: YOUR NGROK TOKEN and YOUR NGROK STATIC DOMAIN are provided in the Ngrok dashboard.

### 6. [DO IT ONLY ONCE] Login to Stripe Dashboard and Register YOUR NGROK STATIC DOMAIN as a custom domain

please contact @retz8 for easy domain registration

### 7. Open the project in VSCode and run the following command to start the server:

```
npm run dev
```

### 8. Open the browser and go to the following

```
<YOUR NGROK STATIC DOMAIN>
```

**NOTE**: development port has now changed from 3000 to 80 to match with Ngrok port.

**I CAN'T BELIEVE IT! You are ready to test the Stripe payment methods on your local environment!**
