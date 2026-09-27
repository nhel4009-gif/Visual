# FRIZUR Visuals

Premium one-page landing page for the FRIZUR Visuals Minecraft visual mod.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Replace screenshots

Open `src/config.js` and replace the URLs in `images.hero`, `images.comparison` and `images.gallery`.

## Replace social/download links

Edit the `links` object in `src/config.js`.

## Notes

The showcase slider is fully interactive on mouse and touch. Feature cards have 3D tilt. The page includes cursor-following glow, particles, reveal animations, parallax, glassmorphism, scanlines and responsive navigation.

The supplied image URLs are intentionally isolated in `src/config.js` so they can be swapped for real FRIZUR Minecraft screenshots without touching the UI code.
