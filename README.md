# RestyStudio 🌸

A beautiful printed products shop for Filipino students — built with React + Vite + Tailwind CSS.

## Features

- 🎨 6 beautiful notebook label designs with live preview
- ✏️ Real-time customization (subject, name, section)
- 🛒 Shopping cart with local storage persistence
- 💸 GCash & Maya payment flow
- 🧾 Order receipt page
- 🌙 Dark mode
- 📱 Fully mobile-responsive

## Deploy to GitHub Pages (Free)

1. Fork or push this repo to GitHub
2. Go to **Settings → Pages → Source: GitHub Actions**
3. Push to `main` — GitHub Actions will auto-deploy!

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## Local Development

```bash
npm install
npm run dev
```

## Adding New Products

Edit `src/data/products.json` — each product follows this schema:

```json
{
  "id": "your-product-id",
  "name": "Product Name",
  "tagline": "Short tagline",
  "description": "Full description",
  "category": "category",
  "price": 25,
  "unit": "per set",
  "featured": false,
  "badge": "New",
  "designs": [...],
  "fields": [
    { "id": "field_id", "label": "Label", "placeholder": "...", "required": true, "maxLength": 30 }
  ]
}
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router v6
- Lucide React icons
- GitHub Pages (free hosting)

## Payment Setup

GCash and Maya payment numbers are set in `src/pages/Checkout.jsx`:
```js
const GCASH_NUMBER = '09944153353'  // RestyStudio GCash number
const MAYA_NUMBER = '09944153353'   // RestyStudio Maya number
const STORE_NAME = 'RestyStudio' // Store name
```

## Optional: EmailJS Integration

1. Sign up at emailjs.com (free tier available)
2. `npm install @emailjs/browser`
3. In `Checkout.jsx`, replace the mock submit with EmailJS send

Made with 💕 in the Philippines
