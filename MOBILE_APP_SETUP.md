# Mobile App Setup

This project now has a Capacitor foundation for the future iOS and Android beta apps.

## What Is Added

- Capacitor app config in `capacitor.config.json`
- Mobile package setup in `package.json`
- A prep script that copies the current static web app into `www/`
- Capacitor plugins reserved for future mobile work:
  - App lifecycle
  - Push notifications
  - Camera
  - Geolocation
  - Filesystem
  - Preferences

## First-Time Setup

Run these after `npm` is available on the computer:

```bash
npm install
npm run cap:prepare
npm run cap:add:ios
npm run cap:add:android
npm run cap:sync
```

## Opening The Native Projects

```bash
npm run cap:open:ios
npm run cap:open:android
```

## Notification Direction

Novu should remain the notification workflow system. Capacitor Push Notifications will be the native mobile bridge that lets the installed app receive alerts on iOS and Android.
