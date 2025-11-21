# spot Landing Page

Landing page for the spot mobile app - find places that match your vibe.

## Overview

This is a Next.js landing page that matches the styling and branding of the spot mobile app, featuring:
- Animated sparkle background
- Groen font family
- Neon green and pink color scheme
- Responsive design

## Pages

- **Landing Page** (`/`) - Main landing page with app description and download links
- **Help** (`/help`) - Contact information and FAQs
- **Terms** (`/terms`) - Terms of Service
- **Privacy** (`/privacy`) - Privacy Policy
- **Zone** (`/zone`) - Coming soon page

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your environment variables:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

   Get your Mapbox token from: https://account.mapbox.com/access-tokens/

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Font**: Groen (custom font)

## Project Structure

```
spot-landing/
├── app/
│   ├── page.tsx          # Landing page
│   ├── help/
│   │   └── page.tsx      # Help page
│   ├── terms/
│   │   └── page.tsx      # Terms of Service
│   ├── privacy/
│   │   └── page.tsx      # Privacy Policy
│   ├── zone/
│   │   └── page.tsx      # Zone page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles and theme
├── components/
│   ├── animated-background.tsx  # Animated sparkle background
│   ├── navigation.tsx           # Navigation component
│   └── page-layout.tsx          # Page layout wrapper
└── public/
    └── fonts/
        └── Groen.ttf     # Custom font file
```

## Styling

The landing page uses the same color palette and font as the spot mobile app:

- **Neon Green**: `rgb(225, 255, 91)` - Primary background
- **Neon Pink**: `rgb(255, 45, 155)` - Accent color
- **Black**: `rgb(30, 30, 30)` - Text color
- **White**: `rgb(248, 248, 248)` - Light text/backgrounds
- **Gray**: `rgb(100, 100, 100)` - Secondary text
- **Font**: Groen (custom font)

## Environment Variables

This project requires the following environment variable:

- `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox access token (required for map functionality)

### Local Development

Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Get your Mapbox token from: https://account.mapbox.com/access-tokens/

### Production Deployment

**Important:** You must add environment variables to your deployment platform. The `.env.local` file is only for local development and is not deployed.

#### Vercel
1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox token
4. Select all environments (Production, Preview, Development) for the variable
5. Click **Save**
6. Go to **Deployments** tab and click **Redeploy** on the latest deployment

#### Netlify
1. Go to your site settings on Netlify
2. Navigate to **Site configuration** → **Environment variables**
3. Add the following variable:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox token
4. Click **Save**
5. Go to **Deploys** tab and click **Trigger deploy** → **Deploy site**

#### Other Platforms
Add the `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable to your platform's environment variables configuration, then redeploy.

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## License

Private project - All rights reserved
