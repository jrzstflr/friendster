# Friendster Social Media Platform - Setup & Implementation Guide

A modern, feature-rich social media platform built with Next.js 15, React 19, and TypeScript. This guide provides comprehensive instructions for setting up, installing, and deploying the Friendster platform.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Project Overview](#project-overview)
3. [Installation & Setup](#installation--setup)
4. [Dependencies & Libraries](#dependencies--libraries)
5. [Project Structure](#project-structure)
6. [Configuration](#configuration)
7. [Running the Project](#running-the-project)
8. [Building & Deployment](#building--deployment)
9. [Features Overview](#features-overview)
10. [Troubleshooting](#troubleshooting)
11. [Future Enhancements](#future-enhancements)

---

## System Requirements

### Minimum Requirements
- **Node.js**: v18.17 or higher
- **npm**: v9+ or **pnpm**: v8+ (recommended for faster installation)
- **Operating System**: Windows, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for node_modules and project files

### Recommended Setup
- **Node.js**: v20 LTS or higher
- **pnpm**: v9+ (faster and more efficient than npm)
- **Git**: v2.30+ for version control
- **VS Code**: Latest version with TypeScript support
- **RAM**: 8GB or more for optimal development experience

---

## Project Overview

**Friendster** is a modern social media platform featuring:

### Core Features
- **User Authentication**: Secure login and registration system
- **Social Feed**: Real-time feed with posts, likes, and comments
- **User Profiles**: Customizable user profiles with stats and interests
- **Friend Management**: Add, remove, and manage friends
- **Direct Messaging**: Private messaging between users
- **Notifications**: Real-time notifications for interactions
- **Media Upload**: Support for images and videos in posts
- **Trending System**: Trending hashtags and content discovery
- **User Discovery**: Find and connect with new users
- **Explore Page**: Browse trending and popular content

### Technology Stack
- **Frontend Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9 with custom design tokens
- **Component Library**: shadcn/ui with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate
- **Notifications**: Sonner Toast Library
- **Theme Support**: next-themes for dark/light mode

---

## Installation & Setup

### Step 1: Clone or Download the Project

\`\`\`bash
# If using Git
git clone <repository-url>
cd friendster

# Or extract the ZIP file and navigate to the directory
cd friendster
\`\`\`

### Step 2: Install Dependencies

Using **pnpm** (recommended):
\`\`\`bash
pnpm install
\`\`\`

Using **npm**:
\`\`\`bash
npm install
\`\`\`

Using **yarn**:
\`\`\`bash
yarn install
\`\`\`

### Step 3: Verify Installation

\`\`\`bash
# Check Node version
node --version  # Should be v18.17+

# Check npm/pnpm version
npm --version   # or pnpm --version

# List installed dependencies
npm list        # or pnpm list
\`\`\`

### Step 4: Environment Variables (Optional)

Create a `.env.local` file in the root directory for any environment-specific configurations:

\`\`\`bash
# .env.local
NEXT_PUBLIC_APP_NAME=Friendster
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

---

## Dependencies & Libraries

### Core Dependencies

#### Framework & Runtime
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.5.4 | React framework with App Router |
| `react` | 19.1.0 | UI library |
| `react-dom` | 19.1.0 | React DOM rendering |
| `typescript` | ^5 | Type safety and development |

#### UI & Component Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/*` | Latest | Unstyled, accessible components |
| `shadcn/ui` | Latest | Pre-built component library |
| `lucide-react` | ^0.454.0 | Icon library (450+ icons) |
| `tailwindcss` | ^4.1.9 | Utility-first CSS framework |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |
| `class-variance-authority` | ^0.7.1 | Component variant management |
| `clsx` | ^2.1.1 | Conditional className utility |
| `tailwind-merge` | ^3.3.1 | Merge Tailwind classes safely |

#### Form & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.60.0 | Performant form handling |
| `@hookform/resolvers` | ^3.10.0 | Form validation resolvers |
| `zod` | 3.25.76 | TypeScript-first schema validation |

#### UI Components & Interactions
| Package | Version | Purpose |
|---------|---------|---------|
| `sonner` | ^1.7.4 | Toast notifications |
| `cmdk` | 1.0.4 | Command menu component |
| `embla-carousel-react` | 8.5.1 | Carousel/slider component |
| `react-day-picker` | 9.8.0 | Date picker component |
| `input-otp` | 1.4.1 | OTP input component |
| `react-resizable-panels` | ^2.1.7 | Resizable panel layouts |
| `vaul` | ^1.1.2 | Drawer component |

#### Utilities & Helpers
| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | 4.1.0 | Date manipulation and formatting |
| `next-themes` | ^0.4.6 | Theme management (dark/light mode) |
| `recharts` | 2.15.4 | Charts and data visualization |
| `@vercel/analytics` | 1.3.1 | Analytics tracking |

#### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4.1.9 | PostCSS plugin for Tailwind |
| `postcss` | ^8.5 | CSS transformation tool |
| `autoprefixer` | ^10.4.20 | CSS vendor prefixes |
| `@types/node` | ^22 | Node.js type definitions |
| `@types/react` | ^18 | React type definitions |
| `@types/react-dom` | ^18 | React DOM type definitions |

### Installation of Specific Dependencies

If you need to add a specific dependency later:

\`\`\`bash
# Add a new dependency
pnpm add package-name

# Add a dev dependency
pnpm add -D package-name

# Update all dependencies
pnpm update

# Check for outdated packages
pnpm outdated
\`\`\`

---

## Project Structure

\`\`\`
friendster/
├── app/
│   ├── layout.tsx              # Root layout with metadata & SEO
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles & design tokens
│   └── favicon.ico             # App favicon
│
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── toast.tsx
│   │   └── ... (60+ components)
│   │
│   ├── dashboard.tsx           # Main dashboard layout
│   ├── feed.tsx                # Social feed component
│   ├── post-card.tsx           # Individual post card
│   ├── create-post.tsx         # Post creation form
│   ├── media-upload.tsx        # Media upload component
│   ├── profile-sidebar.tsx     # User profile sidebar
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── friends-page.tsx        # Friends management
│   ├── messages-page.tsx       # Direct messaging
│   ├── discover-page.tsx       # User discovery
│   ├── explore-page.tsx        # Trending & explore
│   ├── notifications-panel.tsx # Notifications UI
│   ├── notification-bell.tsx   # Notification bell icon
│   ├── trending-sidebar.tsx    # Trending content
│   ├── login-form.tsx          # Login form
│   └── theme-provider.tsx      # Theme provider wrapper
│
├── hooks/
│   ├── use-notifications.ts    # Notifications state management
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notifications hook
│
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
│
├── public/
│   ├── placeholder.svg         # Placeholder images
│   ├── placeholder-user.jpg    # User avatar placeholder
│   ├── placeholder-logo.png    # App logo
│   └── ... (other assets)
│
├── styles/
│   └── globals.css             # Additional global styles
│
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── components.json             # shadcn/ui configuration
├── package.json                # Project dependencies
├── pnpm-lock.yaml              # Dependency lock file
└── README.md                   # Project documentation
\`\`\`

---

## Configuration

### 1. TypeScript Configuration (`tsconfig.json`)

The project uses strict TypeScript settings:
- **Target**: ES6
- **Module**: ESNext
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` maps to root directory

### 2. Tailwind CSS Configuration

Design tokens are defined in `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: #0066ff;
  --color-secondary: #ff6b35;
  --color-accent: #00d9ff;
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-muted: #f5f5f5;
  --color-border: #e0e0e0;
  --radius: 0.5rem;
}
\`\`\`

### 3. Next.js Configuration (`next.config.mjs`)

Key configurations:
- React Compiler support (optional)
- Image optimization
- Font optimization
- Analytics integration

### 4. PostCSS Configuration (`postcss.config.mjs`)

Includes:
- Tailwind CSS plugin
- Autoprefixer for vendor prefixes

---

## Running the Project

### Development Mode

Start the development server with hot reload:

\`\`\`bash
# Using pnpm (recommended)
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev
\`\`\`

The application will be available at: **http://localhost:3000**

### Development Features
- Hot Module Replacement (HMR) for instant updates
- Fast Refresh for React components
- TypeScript type checking
- ESLint linting

### Production Build

Create an optimized production build:

\`\`\`bash
# Build the project
pnpm build

# Start production server
pnpm start
\`\`\`

### Linting

Check code quality:

\`\`\`bash
# Run ESLint
pnpm lint

# Fix linting issues automatically
pnpm lint --fix
\`\`\`

---

## Building & Deployment

### Local Build & Testing

\`\`\`bash
# Build the project
pnpm build

# Start the production server locally
pnpm start

# Visit http://localhost:3000
\`\`\`

### Deployment Options

#### Option 1: Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides seamless deployment:

\`\`\`bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
\`\`\`

**Benefits:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Environment variables management
- Analytics and monitoring

#### Option 2: Deploy to Other Platforms

**Netlify:**
\`\`\`bash
# Connect your Git repository to Netlify
# Build command: pnpm build
# Publish directory: .next
\`\`\`

**Docker (Self-hosted):**
\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
\`\`\`

**AWS, Google Cloud, Azure:**
- Use their respective deployment guides
- Ensure Node.js 18+ runtime support
- Configure environment variables in their dashboards

### Environment Variables for Production

Create a `.env.production` file or set in your deployment platform:

\`\`\`bash
NEXT_PUBLIC_APP_NAME=Friendster
NEXT_PUBLIC_APP_URL=https://your-domain.com
# Add any API keys, database URLs, etc.
\`\`\`

---

## Features Overview

### 1. Authentication & User Management
- Secure login/registration system
- User profile creation and customization
- Password management
- Session handling

### 2. Social Feed
- Real-time post feed
- Like and comment functionality
- Post creation with rich text
- Media attachments (images/videos)
- Engagement metrics display

### 3. User Profiles
- Customizable profile pages
- User statistics (followers, posts, etc.)
- Interest/tag system
- Profile picture and bio
- Follow/unfollow functionality

### 4. Friend Management
- Add/remove friends
- Friend suggestions
- Mutual friends display
- Friend list management

### 5. Direct Messaging
- Private messaging between users
- Message history
- Real-time message delivery
- Typing indicators

### 6. Notifications
- Real-time notifications
- Like notifications
- Comment notifications
- Friend request notifications
- Message notifications
- Notification bell with unread count

### 7. Media Management
- Image upload support
- Video upload support
- Multiple media per post (up to 4)
- Image preview and editing
- Drag-and-drop upload

### 8. Discovery & Trending
- Trending hashtags
- Trending posts
- User recommendations
- Category-based discovery
- Search functionality

### 9. Theme Support
- Light mode
- Dark mode
- System preference detection
- Theme persistence

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: Port 3000 Already in Use

\`\`\`bash
# Use a different port
pnpm dev -- -p 3001

# Or kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

#### Issue: Dependencies Installation Fails

\`\`\`bash
# Clear cache and reinstall
pnpm store prune
pnpm install

# Or with npm
npm cache clean --force
npm install
\`\`\`

#### Issue: TypeScript Errors

\`\`\`bash
# Rebuild TypeScript
pnpm tsc --noEmit

# Check for type errors
pnpm type-check
\`\`\`

#### Issue: Tailwind Styles Not Applying

1. Ensure `app/globals.css` is imported in `app/layout.tsx`
2. Check that Tailwind classes are spelled correctly
3. Rebuild the project: `pnpm build`
4. Clear `.next` folder: `rm -rf .next && pnpm dev`

#### Issue: Hot Reload Not Working

\`\`\`bash
# Restart the development server
# Press Ctrl+C to stop
# Run pnpm dev again
\`\`\`

#### Issue: Build Fails

\`\`\`bash
# Check for TypeScript errors
pnpm tsc --noEmit

# Check for ESLint errors
pnpm lint

# Clear build cache
rm -rf .next
pnpm build
\`\`\`

---

## Performance Optimization

### Best Practices

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images before upload
   - Use appropriate formats (WebP, AVIF)

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic with App Router)

3. **Caching**
   - Leverage browser caching
   - Use SWR for data fetching
   - Implement service workers

4. **Database Optimization**
   - Index frequently queried fields
   - Implement pagination
   - Use connection pooling

5. **Bundle Size**
   - Monitor bundle size: `pnpm build --analyze`
   - Remove unused dependencies
   - Tree-shake unused code

---

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use `.env.example` for documentation
   - Rotate secrets regularly

2. **Authentication**
   - Implement secure password hashing
   - Use HTTPS only
   - Implement rate limiting
   - Use secure session management

3. **Data Protection**
   - Validate all user inputs
   - Sanitize HTML content
   - Implement CSRF protection
   - Use Content Security Policy (CSP)

4. **API Security**
   - Implement API rate limiting
   - Validate API requests
   - Use API keys securely
   - Implement CORS properly

---

## Future Enhancements

### Planned Features
- [ ] Real-time notifications with WebSockets
- [ ] Video streaming support
- [ ] Live streaming capability
- [ ] Advanced search with filters
- [ ] User verification badges
- [ ] Content moderation system
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Payment integration for premium features
- [ ] API for third-party integrations
- [ ] Advanced privacy controls

### Technology Upgrades
- [ ] Implement database (Supabase, Neon, or similar)
- [ ] Add authentication service (Auth0, Supabase Auth)
- [ ] Implement caching layer (Redis)
- [ ] Add message queue (Bull, RabbitMQ)
- [ ] Implement CDN for media
- [ ] Add monitoring and logging (Sentry, LogRocket)

---

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://react.dev/community)
- [Tailwind CSS Discord](https://discord.gg/tailwindcss)

### Tools
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [Vercel Dashboard](https://vercel.com/dashboard) - Deployment platform
- [GitHub](https://github.com) - Version control

---

## License

This project is provided as-is for educational and commercial use.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-26 | Initial release with core features |

---

**Last Updated**: October 26, 2025

For questions or issues, please refer to the troubleshooting section or contact support.
