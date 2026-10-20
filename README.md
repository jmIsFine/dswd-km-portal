# 2026 National KM Learning & Innovation Program Portal

A modern Philippine Government Program & Activity Microsite built with **Vue 3 Composition API (`<script setup lang="ts">`)**, **strict TypeScript (zero `any` types)**, **Tailwind CSS**, and a reference **Laravel API Controller** contract.

Inspired by the [DSWD 2026 KM Activity Google Site](https://sites.google.com/DSWD.gov.ph/2026kmactivity?usp=sharing) and enhanced with interactive micro-animations modeled after the [BrewedOps Motion Library](https://brewedops.cloud/motionlibrary/).

## Tech Stack
- **Frontend SPA**: Vue 3 (`<script setup lang="ts">`), Vite, Tailwind CSS, Lucide Icons
- **Type Safety**: 100% Strict TypeScript (`"noImplicitAny": true`, `"strictNullChecks": true`)
- **Backend Contract**: Laravel API Controller (`laravel-backend-reference/app/Http/Controllers/Api/V1/ProgramPortalController.php`)
- **Deployment**: Configured for **Netlify** (`netlify.toml`, `public/_redirects`, `.nvmrc`)

## Key Features
- **GOV.PH Header & Glass-on-Scroll Navigation**: Sliding active indicator pill, scroll progress bar, and `Ctrl+K` global site search modal.
- **Hero & Live Countdown**: Shimmering headline, live kick-off countdown timer, and Quick Links hub.
- **Advisory Bulletins**: Expandable Bento compliance cards with priority badges (`Urgent`, `High`, `Normal`).
- **Participant Groupings**: Real-time delegate/Field Office search and island cluster filtering (`Luzon`, `Visayas`, `Mindanao`, `Central Office`) with `<TransitionGroup>` FLIP animations.
- **Interactive Schedule**: Day 1 / Day 2 / Day 3 segmented switcher with a growing timeline spine.
- **The Team & Embedded Files**: Secretariat directory and filterable resource cards with interactive download states.
- **Venue & Logistics**: DSWD Academy (SWADCAP Bldg., Taguig City) gate protocols, route landmarks, and institutional footer.

## Local Development

```bash
# Install dependencies
npm install

# Run strict TypeScript check
npm run typecheck

# Start local development server
npm run dev

# Build for production (Netlify)
npm run build
```

## Author
- **GitHub**: [@jmIsFine](https://github.com/jmIsFine)
- **Portfolio**: [jmdp-portfolio.netlify.app](https://jmdp-portfolio.netlify.app/)
