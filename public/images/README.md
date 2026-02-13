# Photography Portfolio - Image Setup Guide

## 📸 Required Images

You need to add your actual photography images to make the portfolio functional. Here's what you need:

### 1. Hero & Profile Images

- **Hero Image**: `public/images/hero.jpg`
  - Full-screen background for the homepage
  - Recommended size: 1920x1080px or larger
  - Should be a striking street or portrait photo

- **Profile Photo**: `public/images/profile.jpg`
  - Your profile picture
  - Recommended size: 400x400px (square)
  - Professional headshot or creative self-portrait

### 2. Street Photography Gallery

Add 6 street photography images:

- `public/images/street/street-1.jpg`
- `public/images/street/street-2.jpg`
- `public/images/street/street-3.jpg`
- `public/images/street/street-4.jpg`
- `public/images/street/street-5.jpg`
- `public/images/street/street-6.jpg`

### 3. Timeline Photography (Instagram Posts)

Add 4 Instagram post images:

- `public/images/timeline/timeline-1.jpg`
- `public/images/timeline/timeline-2.jpg`
- `public/images/timeline/timeline-3.jpg`
- `public/images/timeline/timeline-4.jpg`

### 4. All Photos Categories

**Buildings/Structures** (3 images):

- `public/images/all-photos/buildings/building-1.jpg`
- `public/images/all-photos/buildings/building-2.jpg`
- `public/images/all-photos/buildings/building-3.jpg`

**Animals/Birds/Insects** (3 images):

- `public/images/all-photos/animals/animal-1.jpg`
- `public/images/all-photos/animals/animal-2.jpg`
- `public/images/all-photos/animals/animal-3.jpg`

**Nature/Scenery** (3 images):

- `public/images/all-photos/nature/nature-1.jpg`
- `public/images/all-photos/nature/nature-2.jpg`
- `public/images/all-photos/nature/nature-3.jpg`

**Cars** (3 images):

- `public/images/all-photos/cars/car-1.jpg`
- `public/images/all-photos/cars/car-2.jpg`
- `public/images/all-photos/cars/car-3.jpg`

### 5. Resume PDF

- `public/mohit-kadu-resume.pdf`
  - Your resume in PDF format
  - Will be available for download

## 🎨 Image Guidelines

- **Format**: JPG or PNG (JPG recommended for photos)
- **Quality**: High resolution (Next.js will optimize automatically)
- **Orientation**: Landscape or square works best
- **File Size**: Don't worry about file size - Next.js optimizes automatically

## ➕ Adding More Images

To add more images to any gallery:

1. Add the image file to the appropriate directory
2. Edit `lib/data.ts`
3. Add a new entry to the corresponding array:

```typescript
{
  id: 7, // increment the ID
  src: "/images/street/street-7.jpg",
  alt: "Description of your photo"
}
```

## 🚀 Quick Start

1. Add all required images to their directories
2. Run `npm run dev`
3. Open http://localhost:3000
4. Your portfolio is ready!

## ⚠️ Important Notes

- Without images, the site will show broken image placeholders
- Make sure image filenames match exactly (case-sensitive)
- All paths start with `/images/` (not `public/images/`)
- Next.js automatically optimizes images for web performance
