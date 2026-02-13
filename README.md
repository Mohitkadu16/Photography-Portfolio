# Photography Portfolio - loyalmanuka

A modern, minimal photography portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Typing Animation**: Dynamic job title display in hero section
- **Three Main Galleries**:
  - Street Photography
  - Timeline Photography (Instagram posts)
  - All Photos (with subcategories: Buildings, Animals, Nature, Cars)
- **Lightbox**: Professional image viewing with react-photo-view
- **Smooth Animations**: Framer Motion for elegant transitions
- **Fully Responsive**: Mobile-first design
- **SEO Optimized**: Proper metadata and semantic HTML
- **Image Optimization**: Automatic WebP/AVIF conversion with Next.js Image

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖼️ Adding Your Photos

### Required Images

Place your photography images in the following directories:

#### Hero & Profile

- `public/images/hero.jpg` - Hero background image (recommended: 1920x1080px or larger)
- `public/images/profile.jpg` - Profile photo (recommended: 400x400px, square)

#### Street Photography

- `public/images/street/street-1.jpg` through `street-6.jpg`
- Add more images by updating `lib/data.ts`

#### Timeline Photography (Instagram Posts)

- `public/images/timeline/timeline-1.jpg` through `timeline-4.jpg`
- Add more images by updating `lib/data.ts`

#### All Photos Categories

**Buildings/Structures:**

- `public/images/all-photos/buildings/building-1.jpg` through `building-3.jpg`

**Animals/Birds/Insects:**

- `public/images/all-photos/animals/animal-1.jpg` through `animal-3.jpg`

**Nature/Scenery:**

- `public/images/all-photos/nature/nature-1.jpg` through `nature-3.jpg`

**Cars:**

- `public/images/all-photos/cars/car-1.jpg` through `car-3.jpg`

### Image Optimization Tips

- Use high-quality images (Next.js will automatically optimize them)
- Recommended formats: JPG for photos
- Landscape orientation works best for most galleries
- Square format (1:1) works well for grid layouts

### Updating Gallery Data

Edit `lib/data.ts` to add/remove images or change categories:

```typescript
export const galleryData = {
  street: [
    { id: 1, src: "/images/street/your-image.jpg", alt: "Description" },
    // Add more images here
  ],
  // ... other galleries
};
```

## 📝 Customizing Content

### Personal Information

Edit `lib/data.ts` to update:

- **Bio**: `bioText` variable
- **Skills**: `skills` array
- **Gear**: `gear` array
- **Contact**: `contactInfo` object (email, Instagram, location)

### Resume

Place your resume PDF in `public/mohit-kadu-resume.pdf`

## 🎨 Styling

The portfolio uses a minimal black, white, and neutral grey color scheme. To customize colors, edit `tailwind.config.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Build for Production

```bash
npm run build
npm start
```

## 📱 Sections

1. **Hero** - Full-screen introduction with typing effect, skills, and gear
2. **Work** - Three main galleries with filtering
3. **About** - Bio and location
4. **Resume** - Skills and downloadable PDF
5. **Contact** - Email, Instagram, and availability status

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Lightbox**: react-photo-view
- **Typing Effect**: react-type-animation
- **Image Optimization**: Next.js Image (automatic WebP/AVIF)

## 📄 License

© 2026 loyalmanuka. All rights reserved.

## 🤝 Support

For issues or questions, please open an issue on GitHub or contact via email.
