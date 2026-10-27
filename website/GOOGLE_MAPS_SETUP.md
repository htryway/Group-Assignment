# Setting up the Google Maps Embed API key (website)

This uses the same key as the mobile app — see the app's
`GOOGLE_MAPS_SETUP.md` for how to get one. Once you have it:

1. Open `js/config.js`.
2. Paste the key in:
   ```js
   const GOOGLE_MAPS_API_KEY = "AIzaSy...";
   ```
3. Refresh `contact.html` — the map now loads through the official Maps
   Embed API instead of the free keyless fallback.

If you're hosting this site from a git repo, add `js/config.js` to
`.gitignore` once the real key is in it, and keep `js/config.js` (with the
key blanked out) as the template others copy from — otherwise the real key
ends up committed to source control.

## Sharing one key with the app

Right now this is deliberately the *same, unrestricted* key used in the
Expo app's `.env` (`EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`) — simplest option
while this is a demo/prototype. Before a public launch, split it into two
keys instead (one restricted to this domain via HTTP referrers, one
restricted to the app's package name) — a single key can only carry one of
those restriction types, so leaving it unrestricted is what lets it work on
both platforms at once. Full details in the app's `GOOGLE_MAPS_SETUP.md`.
