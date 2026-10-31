# BazaarVistaar Website

A responsive, static website starter built with HTML, CSS and vanilla JavaScript. It is ready to host on GitHub Pages.

## Files
- `index.html` — website content and sections
- `styles.css` — responsive styling and brand palette
- `script.js` — mobile navigation and enquiry form behaviour
- `config.js` — WhatsApp number and contact configuration
- `assets/` — logo and hero visual

## Before publishing
1. Open `config.js`.
2. Replace `91XXXXXXXXXX` with your WhatsApp Business number (country code + number, digits only). Example: `919876543210`.
3. Review the service descriptions and contact details in `index.html`.
4. Replace or update the logo/hero images in `assets/` if you have final transparent brand assets.

The enquiry form opens WhatsApp with the visitor's details pre-filled. It does not store submissions on a server.

## Publish with GitHub Pages
1. Create a new GitHub repository, e.g. `bazaarvistaar-website`.
2. Upload all files and folders from this package to the repository root. Keep `index.html` at the root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your website URL will look like `https://YOUR-USERNAME.github.io/bazaarvistaar-website/`.

## Important
This is a static front-end website. No hosting payment or backend is required for GitHub Pages. A custom domain can be connected later from Settings → Pages.
