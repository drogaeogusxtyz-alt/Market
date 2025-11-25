# Design Guidelines: Marketplace de Mods de Games

## Design Approach
**Reference-Based Approach** inspired by modern gaming marketplaces like Steam, Epic Games Store, and Gumroad. The design prioritizes visual impact, immersive product showcasing, and seamless e-commerce flow with gaming-centric aesthetics.

## Core Design Principles
- **Gaming-First Aesthetics**: Bold, energetic interface with gradient overlays and card-based layouts
- **Visual Hierarchy**: Large product imagery dominates, with clear CTAs and pricing
- **Smooth Interactions**: Subtle hover effects and transitions enhance the browsing experience
- **Trust & Security**: Payment interface emphasizes security badges and clear pricing

## Typography System

**Primary Font**: Inter or Poppins (Google Fonts)
- **Hero/Headers**: 700 weight, 48px-72px (desktop), 32px-48px (mobile)
- **Section Titles**: 600 weight, 32px-40px
- **Product Names**: 600 weight, 20px-24px
- **Body Text**: 400 weight, 16px-18px
- **Labels/Meta**: 500 weight, 14px
- **Buttons**: 600 weight, 16px uppercase tracking-wide

**Secondary Font**: JetBrains Mono for pricing and technical details
- **Prices**: 700 weight, 24px-32px
- **Stats/Numbers**: 500 weight, 14px-16px

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 lg:py-32
- Card padding: p-6
- Element spacing: gap-6 to gap-8
- Container max-width: max-w-7xl

**Grid System**:
- Product grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Featured mods: grid-cols-1 lg:grid-cols-2
- Checkout layout: grid-cols-1 lg:grid-cols-3 (2 cols content, 1 col summary)

## Page Structure

### Homepage
1. **Hero Section** (80vh minimum)
   - Full-width gradient overlay on gaming background image
   - Centered headline "Descubra os Melhores Mods para Seus Games"
   - Subheadline describing the marketplace value
   - Primary CTA "Explorar Mods" with blur backdrop
   - Secondary stats bar: "1000+ Mods | 50k+ Downloads | Pagamento Seguro"

2. **Featured Mods Section**
   - 2-column grid showcasing premium/trending mods
   - Large product cards with hover zoom effect on images
   - Gradient overlay on card images with title and price
   - "Destaque" badge on featured items

3. **Categories Section**
   - Horizontal scrollable category pills with icons
   - 6-8 game categories (Minecraft, GTA V, Skyrim, etc.)
   - Icon + label format

4. **All Mods Grid**
   - 3-4 column responsive grid
   - Infinite scroll or pagination
   - Filter sidebar (collapsible on mobile)

5. **Trust Section**
   - 3-column grid: Secure Payment | Instant Download | 24/7 Support
   - Icons with short descriptions

6. **Footer**
   - 4-column layout: About | Popular Games | Support | Newsletter
   - Social media links with gaming platform icons
   - Payment method badges (Stripe, PIX)

### Product Detail Page
- **Hero Product Gallery**: Large image carousel (60% width) + thumbnail strip
- **Product Info Panel** (40% width, sticky):
  - Mod name (large, bold)
  - Creator name with avatar
  - Star rating + review count
  - Price (large, prominent)
  - "Adicionar ao Carrinho" primary button (full-width)
  - Compatible games list with icons
  - Download info (file size, version, update date)
- **Tabbed Content**: Description | Screenshots | Requirements | Reviews
- **Related Mods**: 4-column grid below

### Shopping Cart / Checkout
- **Cart Summary Card**: Sticky right column
  - Line items with thumbnail, name, price
  - Subtotal, taxes clearly separated
  - Prominent total amount
  - Payment method selector (Stripe badge)
- **Checkout Form**: Left 2 columns
  - Email address (bolded label)
  - Payment method tabs: Cartão de Crédito | PIX
  - Stripe Elements integration with blur backdrop container
  - Security badges below form
  - "Finalizar Compra" button (large, full-width)

## Component Library

### Product Card
- Aspect ratio 3:4 image
- Gradient overlay from bottom (transparent to solid)
- Title and price overlay at bottom
- Hover: scale-105 transform, shadow-2xl
- Creator avatar (small, bottom-left corner)
- Quick action icon (heart/bookmark, top-right)

### Navigation Header
- Sticky top navigation with blur backdrop
- Logo left, search bar center (w-96), cart icon + user menu right
- Category mega-menu on hover
- Search with autocomplete dropdown

### Buttons
**Primary CTA**: Rounded-xl, px-8 py-4, bold, shadow-lg
**Secondary**: Outlined variant, same size
**Icon Buttons**: Rounded-full, p-3, backdrop-blur
- All buttons implement hover:scale-105 transition

### Filter Sidebar
- Collapsible sections (Price Range, Game, Rating, Creator)
- Range sliders for price
- Checkbox groups for categories
- "Aplicar Filtros" sticky bottom button

### Payment Method Selector
- Radio button cards with payment method logos
- Stripe card element with rounded-xl border
- PIX QR code display area (when selected)
- Security badges: SSL certificate, secure payment icons

## Images

**Hero Image**: Full-width gaming montage showing popular games with mods - vibrant, action-packed composition with multiple game screenshots blended together

**Product Images**: High-quality mod screenshots showing in-game features, before/after comparisons, or character models. Minimum 1200x1600px

**Category Icons**: Use Font Awesome gaming icons (fa-gamepad, fa-dice-d20, etc.)

**Trust Badges**: Stripe logo, PIX logo, SSL certificate icon, payment security icons

## Icons
**Library**: Font Awesome via CDN
- Navigation: fa-search, fa-shopping-cart, fa-user
- Product actions: fa-heart, fa-download, fa-share
- Categories: fa-gamepad, fa-dragon, fa-car, fa-sword
- Trust: fa-lock, fa-shield-alt, fa-bolt

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation for product grids and filters
- Focus indicators with 2px offset ring
- Alt text for all product images
- Form validation with clear error states
- Minimum touch target: 44x44px for mobile

## Animations
**Sparingly Used**:
- Hero entrance: Fade-in with slight upward translate (1s ease-out)
- Product card hover: Transform scale + shadow transition (300ms)
- Cart item addition: Slide-in notification (top-right corner)
- Page transitions: Fade only, no elaborate effects