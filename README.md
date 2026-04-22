# Passant-Ecoway (Static React + Tailwind)

A mobile-first eco-friendly e-commerce website for GitHub Pages.

## Features

- Home page with auto-rotating 3-image banner
- Product categories:
  - Natural Detergents & Soaps
  - Cleaning Cloths
  - Skin Cleansing Products
  - Perfumes & Bags
- Animated "Join the Team" button and registration form
- Shopping cart with quantity controls
- Checkout form with Egypt governorates
- Admin control panel at `/admin-cp`
  - Password: `9607330`
  - Add/delete products
  - Review order and team form counts
- Persistent floating WhatsApp button (`01157563840`)
- Local persistence for products, cart, orders, and registrations
- Optional Google Sheets integration via Apps Script webhook URL

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

Upload contents of `dist/` to your GitHub Pages branch (or use GitHub Actions deploy).

## Google Sheets integration

1. Create a Google Apps Script Web App that accepts POST JSON.
2. In the Admin panel, paste the Web App URL into **Apps Script URL** and click **Save URL**.
3. New orders are still saved in browser storage, and also posted to Google Sheets webhook when configured.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
