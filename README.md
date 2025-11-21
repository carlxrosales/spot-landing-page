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

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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
