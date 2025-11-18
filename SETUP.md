# Portfolio V2 - Setup Guide

## Quick Start

1. **Install dependencies:**

   ```bash
   cd portfolio-v3
   npm install
   ```

2. **Set up EmailJS (for contact form):**

   - Copy `.env.local.example` to `.env.local`
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Get your service ID, template ID, and public key
   - Add them to `.env.local`:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## What's New

### Design

- **Modern Brutalist Aesthetic** - Bold typography, sharp edges, confident layout
- **Electric Color Scheme** - Electric blue (#0ea5e9), Cyber purple (#a855f7), Neon green (#22c55e)
- **Dark-First Design** - Black background with vibrant accents
- **No fluff** - Clean, direct, professional presentation

### Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4 (CSS-first configuration)
- Framer Motion (smooth animations)
- EmailJS (contact form)
- Lucide React (icons)

### Features

- Smooth scroll animations
- Interactive project cards with modal details
- Fixed side navigation (desktop) / mobile menu
- Skills visualization with progress bars
- Contact form with validation
- Fully responsive design
- Performance optimized

### Structure

```
portfolio-v3/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (all sections)
│   └── globals.css      # Global styles + Tailwind v4 config
├── components/
│   ├── sections/        # Page sections (Hero, About, Projects, Skills, Contact)
│   └── ui/              # UI components (Navigation)
├── data/
│   ├── profile.ts       # Personal info, skills, experience
│   └── projects.ts      # All project data
└── lib/
    └── utils.ts         # Helper functions
```

## Customization

### Update Personal Info

Edit `data/profile.ts`:

- Name, title, bio
- Social links
- Skills and tech stack
- Experience history
- Stats

### Add/Edit Projects

Edit `data/projects.ts`:

- Add new projects to the array
- Each project includes: title, description, tech stack, features, links, etc.

### Change Colors

Edit `app/globals.css` in the `@theme` section:

- Modify `--color-electric-*`, `--color-cyber-*`, `--color-neon-*` values
- Update gradients in utility classes

### Modify Animations

Framer Motion animations are in each component:

- `initial` - Starting state
- `animate` - End state
- `transition` - Animation timing

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables for EmailJS
4. Deploy!

### Other Platforms

Build static export:

```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## Notes

- **No Google Fonts** - Uses system fonts for reliability
- **Tailwind CSS v4** - Configuration via CSS `@theme`, not JS config file
- **All sections on one page** - Smooth scroll navigation
- **EmailJS required** - Contact form needs setup (or remove that section)

## Support

For issues or questions, check:

- Next.js docs: https://nextjs.org/docs
- Tailwind v4 docs: https://tailwindcss.com/docs
- Framer Motion docs: https://www.framer.com/motion/

---

Built by Taiwo Babarinde
