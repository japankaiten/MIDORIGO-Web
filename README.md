# MIDORIGO Web

Static landing and support website for MIDORIGO, a Japan-focused circular economy app with local listings,
community trade, and municipality-oriented waste support. Built with Vite, React, TypeScript, React Router, and plain
CSS.

## Local Development

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Routes

- `/` - Home landing page
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/contact` - Contact
- `/support` - Support and troubleshooting
- `/delete-account` - Account and data deletion instructions

## Brand Assets and Metadata

The header and footer use `public/assets/midorigo-logo.png`. Generated web icons live in `public/assets`:

- `favicon-16.png`
- `favicon-32.png`
- `favicon-48.png`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`

The static site also includes:

- `public/site.webmanifest` for browser install metadata and mobile home-screen icons.
- `public/sitemap.xml` for search engines.
- `public/robots.txt` pointing crawlers to the sitemap.

The favicon files used by browser tabs are generated from `public/assets/midorigo-logo-white.png`. The home-screen
icons are generated from `public/assets/midorigo-logo.png`. Regenerate them after replacing either logo:

```bash
sips -z 16 16 public/assets/midorigo-logo-white.png --out public/assets/favicon-16.png
sips -z 32 32 public/assets/midorigo-logo-white.png --out public/assets/favicon-32.png
sips -z 48 48 public/assets/midorigo-logo-white.png --out public/assets/favicon-48.png
sips -z 180 180 public/assets/midorigo-logo.png --out public/assets/apple-touch-icon.png
sips -z 192 192 public/assets/midorigo-logo.png --out public/assets/icon-192.png
sips -z 512 512 public/assets/midorigo-logo.png --out public/assets/icon-512.png
```

## Deploying to Vercel

1. Import the repository in Vercel.
2. Set the framework preset to `Vite`.
3. Use `pnpm install` as the install command if Vercel asks for one.
4. Use `pnpm build` as the build command.
5. Use `dist` as the output directory.
6. Keep `vercel.json` in the project root so direct route refreshes work for React Router:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Pre-Publishing Checklist

- Replace the support email if `japankaiten@gmail.com` is not the final monitored inbox.
- Replace the operator/company name.
- Add the effective date for Privacy Policy and Terms of Service.
- Add final App Store and Google Play URLs after approval.
- Complete privacy and terms legal review.
- Decide whether the contact form should remain `mailto:` or connect to a production backend/form service.
- Configure a stable production domain.
- Replace `https://midorigo.app` in `sitemap.xml` and `robots.txt` if the production domain changes.
- Add the legal entity address if required by app stores, platform rules, or applicable law.
