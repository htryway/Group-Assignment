# Setting up the Google Maps Embed API key

## 1. Get a key

1. Go to https://console.cloud.google.com/ and create a project (or pick an
   existing one).
2. In the search bar, find **"Maps Embed API"** and click **Enable**.
3. Go to **APIs & Services → Credentials → Create Credentials → API key**.
4. Copy the key it gives you.

## 2. Restrict the key (important)

An API key baked into a mobile app's JS bundle can technically be pulled out
by anyone who inspects the app, so restrict what it can be used for:

1. Click into the key you just created → **Application restrictions**.
2. Pick **Android apps** and/or **iOS apps** and add your app's package name
   (`com.yourcompany.yourapp` from `app.json`'s `"package"` / `"bundleIdentifier"`)
   and, for Android, the SHA-1 fingerprint of your signing certificate.
3. Under **API restrictions**, restrict the key to just **Maps Embed API** —
   so even if it leaked, it couldn't be used for anything else on your
   Google Cloud bill.

## 3. Add it to your project

1. Copy `.env.example` to a new file named `.env` in your project root.
2. Replace `your_key_here` with the real key:
   ```
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
   ```
3. Make sure `.env` is in your `.gitignore` (add the line if it isn't
   already there) so the real key never gets committed.
4. Restart Metro completely — env vars are only read at startup:
   ```
   npx expo start -c
   ```

## How it's wired up

`app/contact.tsx` reads `process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`. The
`EXPO_PUBLIC_` prefix is required — that's what tells Expo to make an env
var available to your app's JS code (anything without that prefix stays
server-side only, which doesn't apply here since there's no server, but
Expo enforces the naming rule regardless).

If the key isn't set yet, the map still works — it falls back to the
keyless embed URL used before, so nothing breaks while you're setting this
up.
