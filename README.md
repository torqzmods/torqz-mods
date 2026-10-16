# Torqz Mods

The website for **Torqz Mods**, original mods for BeamNG.drive.
Live at https://torqzmods.github.io/torqz-mods/

## Pages

- `index.html`: all mods, build progress and latest updates
- `install.html`: downloads and how to install a mod
- `about.html`: about Torqz Mods and social links
- `404.html`: page-not-found

## Making changes

Almost everything you'll want to change lives in **`js/data.js`**:

- **Add a mod:** copy the Torqz Garage block inside `MODS` and change the details. It appears on the home page and the downloads list automatically.
- **Release a mod:** set `status: "Released"`, add the `version`, and put the .zip link in `download`.
- **Move a milestone forward:** change its `status` to `"done"`, `"now"` or `"next"`. The gauge on the home page follows the mod that's in development.
- **Post an update:** add a new entry at the top of `UPDATES`.
- **Turn on a social link:** paste the URL into `LINKS`. Empty links show "Coming soon".

Colors and fonts are at the top of `css/site.css`.

## Deploying

GitHub Pages deploys from the `main` branch. There's no build step.
