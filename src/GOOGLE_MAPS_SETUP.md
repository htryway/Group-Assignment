# Setting up the Google Maps Embed API key

## 1. Get a key

1. Go to https://console.cloud.google.com/ and create a project (or pick an
   existing one).
2. In the search bar, find **"Maps Embed API"** and click **Enable**.
3. Go to **APIs & Services → Credentials → Create Credentials → API key**.
4. Copy the key it gives you.

## 2. One key, shared with the website (current setup)

This key is used unrestricted in both the app and the website
(`next-level-gaming-website`'s `js/config.js`) — the simplest setup for a
demo or prototype. Nothing to restrict for now, just copy the same key
value into both places (step 3 below, and `js/config.js` on the website).

**Before a public launch**, split this into two separate keys instead — one
per platform, each restricted to just that platform:
- **Website key**: Application restrictions → HTTP referrers → your domain.
- **App key**: Application restrictions → Android apps / iOS apps → your
  app's package name (and SHA-1 fingerprint, for Android).

A single key can only carry *one* of these restriction types, which is why
an unrestricted key is what makes sharing one key across both platforms
possible in the first place — restricting it for one platform would break
it on the other. Either way, restrict **API restrictions** to just "Maps
Embed API" so a leaked key can't be used for anything else on the bill.

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
