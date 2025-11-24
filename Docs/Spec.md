You are an expert full-stack developer. Create a complete Next.js + Tailwind CSS project that looks and feels like the Stripe Press website (press.stripe.com).  

🎯 Goal: A clean editorial site with 3D book cards.

====================================
PROJECT REQUIREMENTS
====================================

🖥️ TECH STACK
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion (for subtle animations)
- Optional: Three.js or pure CSS 3D transforms (prefer pure CSS unless needed)
- Shadcn UI for buttons + layout components

====================================
FEATURES TO IMPLEMENT
====================================

1️⃣ **Homepage Layout**
- Elegant, minimal grid of books (3–4 columns)
- Clean typography similar to Stripe (large, spacious)
- Each book card contains:
  - Book cover image
  - Title
  - Subtitle / description
  - Author
  - Subtle hover animation

2️⃣ **3D Book Hover Card**
Make each book appear like a 3D object:
- Use `perspective`, `transform-style: preserve-3d`
- Small rotateY/rotateX on hover
- Slight shadow shift
- Smooth transitions (200–300ms)
- Works on mobile (fallback: flat image)

Code structure:
- `/components/Book3DCard.tsx`
- Props: { title, author, coverImage }

3️⃣ **Book Detail Page**
- Dynamic route `/book/[slug]`
- Large hero banner with book cover
- Clean article-style layout
- Sections: description, author, “Buy / Read” button
- Supports markdown content

4️⃣ **CMS-Ready Structure**
Prepare folder structure so I can later plug in a CMS like Sanity or Strapi:
- `/lib/getBooks.ts` (mock data → later replace with CMS)
- `/content/books/*.mdx` (fallback option)

5️⃣ **Responsive Design**
- Mobile-first
- Collapsible menu
- Books stack into 1–2 columns on small screens

6️⃣ **Animation Requirements**
- Subtle fade/slide on page load
- Hover tilt for 3D cards using CSS or Framer Motion
- No heavy animations that hurt performance

====================================
STYLE REQUIREMENTS
====================================

🎨 Styling / Aesthetic:
- Very clean, editorial, Stripe-like design
- Large serif headings + clean sans-serif body
- White background with generous spacing
- Tailwind utility classes only

Use this palette:
- White
- Near-black #0A0A0A
- Gray-200 / Gray-300 for lines
- Accent color: #635BFF (Stripe purple) but used sparingly

====================================
OUTPUT
====================================

Generate:
- folder structure
- all required components
- homepage
- book detail page
- mock data
- 3D book card component
- Tailwind config
- Example content (2–3 sample books)

Code should be clean, production-ready, and compatible with Cursor’s “apply” flow.

====================================

Start by scaffolding the project and generating the components/pages.
