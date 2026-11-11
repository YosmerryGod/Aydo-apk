# AYDO Mobile

AYDO native mobile app for Android and iOS, migrated from the Xkalkultor Next.js application to React Native, Expo SDK 58, TypeScript, Expo Router, Zustand, and TanStack Query.

## Features
- Merchant selling-price calculator for ShopeeFood, GrabFood, and GoFood.
- Admin fee and fixed fee calculations.
- Promo stages, promo packages, merchant subsidy, minimum purchase, maximum discount, and discount-strikethrough calculation engine.
- Saved menu list and calculation history.
- Marketplace fee and percentage-promo settings.
- Email/username login and registration through the existing AYDO API.
- Local device persistence and API account-data synchronization.
- Light and dark themes; shared Android/iOS codebase.

## Stack
React Native 0.88, React 19, Expo SDK 58, Expo Router, TypeScript, Zustand, TanStack Query, Axios, AsyncStorage, Lucide React Native.

## Requirements
Node.js 22.13+, npm, Android Studio for Android emulators, macOS and Xcode for local iOS builds, and an Expo account for EAS Build.

## Install and run
```bash
git clone https://github.com/YosmerryGod/Aydo-apk.git
cd Aydo-apk
npm install
cp .env.example .env
npx expo install --fix
npm start
```
Set `EXPO_PUBLIC_API_URL` in `.env` if the backend URL differs from the current production API. Press `a` for Android or `i` for iOS Simulator.

## EAS build
```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform ios --profile production
```
Replace the EAS project ID placeholder in `app.json` after running build configuration. Android preview builds can be distributed as APK; production Android builds are intended for Play Store AAB. iOS distribution requires Apple Developer membership.

## Structure
```
app/                         Expo Router routes
  (auth)/                    Login and registration
  (tabs)/                    Home, calculator, menu, history, account
  settings.tsx               Marketplace and promo settings
src/
  features/                  Feature modules
  providers/                 React Query and bootstrap providers
  shared/                    API client, UI primitives, theme
  store/                     Zustand application state
  utils/                     Formatting and currency helpers
```

## Backend
The existing Next.js/PostgreSQL API remains a separate service. The mobile app calls its authentication and user-data endpoints over HTTPS. Database URLs, OAuth client secrets, and server credentials must never be bundled into the mobile app. The previous web Google OAuth callback still needs a native deep-link redirect integration before enabling Google sign-in inside this app.

## Checks
```bash
npm run typecheck
npx expo-doctor
```
