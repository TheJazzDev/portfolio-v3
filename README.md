# Portfolio V2

Modern, brutalist portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: EmailJS
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

   - Copy `.env.local.example` to `.env.local`
   - Add your EmailJS credentials

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Design Features

- Modern brutalist design with bold typography
- Electric blue, cyber purple, and neon green color scheme
- Smooth scroll animations with Framer Motion
- Interactive project showcases
- Responsive mobile-first design
- Fixed side navigation on desktop
- Contact form with EmailJS integration

## Project Structure

```
portfolio-v3/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   └── contact.tsx
│   └── ui/
│       └── navigation.tsx
├── data/
│   ├── profile.ts
│   └── projects.ts
└── lib/
    └── utils.ts
```
