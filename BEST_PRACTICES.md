# 📘 Project Best Practices

## 1. Project Purpose
A Create React App–based single-page application for an online marketplace (Sindhuli Bazar) with routes for browsing stores and services, a cart persisted in localStorage, offer/landing pages, and a recipe generator that integrates with Google Gemini. The app targets mobile-first usage, includes Progressive Web App (PWA) configuration, and uses Material UI for layout, along with other UI libraries.

## 2. Project Structure
- Root
  - public/ — static assets, manifest.json, index.html, icons
  - src/
    - index.js — React entry point, BrowserRouter, CartProvider, service worker registration
    - App.js — Route definitions and top-level composition
    - components/
      - Navbar.js — main navigation (MUI)
      - homepagecom/ — homepage feature components (FeaturedProducts, Services buttons, etc.)
      - offerwalls/ — promotional/seasonal landing components (e.g., Raksha Bandhan)
      - Services/ — service-related components (e.g., vehicle booking)
      - ToastNotify.js, LoadingOverlay, etc. — cross-cutting UI components
    - context/
      - CartContext.js — global cart state persisted to localStorage
    - data/ — static data (JSON) and aggregator (Datacarrier.js)
    - messagecarrier/ — WhatsApp order helper (link generator/button)
    - pages/ — route-level pages (Homepage, AddToCart, FoodGenerator, GiftLandingPage, etc.)
    - tinyfunction/ — small utilities (e.g., scrollToTop)
    - serviceWorkerRegistration.js — PWA registration helper
- package.json — CRA scripts and dependencies
- README.md — CRA default docs plus deployment note

Conventions
- Pages are under src/pages and are routed in App.js (React Router v6).
- Static data is colocated under src/data and imported via Datacarrier.js.
- Global UI elements (Navbar, Footer, Toast) are used across pages.
- PWA setup uses manifest.json and a custom register() call.

Entry points and configuration
- index.js: wraps <App /> with BrowserRouter and CartProvider; registers SW.
- App.js: defines Routes including dynamic route /:producttypeStore.
- .env: expected for REACT_APP_GEMINI_API_KEY_1..3 (see FoodGenerator.js).

## 3. Test Strategy
Current state
- Testing dependencies present (React Testing Library, jest-dom, user-event), but no tests found.

Recommended approach
- Framework: Jest + React Testing Library.
- Organization:
  - Co-locate tests with components: ComponentName.test.jsx next to the source, or __tests__/ per feature directory.
  - Use file suffixes *.test.js(x) aligned with the implementation file’s extension.
- Unit tests:
  - Components with logic (e.g., FeaturedProducts, Navbar dropdown logic, CartContext behavior) including keyboard interactions and aria roles.
  - Utilities like scrollToTop (ensure no crashes and proper window.scrollTo usage with mocks).
- Integration tests:
  - Major pages (Homepage, AddToCart, FoodGenerator, GiftLandingPage) with MemoryRouter to assert routing, presence of sections, feature interactions, and cart badge updates.
  - Mock network calls (FoodGenerator) using MSW (Mock Service Worker) or jest mocks. Verify retries, error states, and UI messaging.
- Mocking guidelines:
  - Mock localStorage (jest.spyOn) for CartContext persistence.
  - For router-based tests, wrap under MemoryRouter and push routes with initialEntries.
  - For MUI components, interact via roles and text rather than implementation details.
- Coverage expectations:
  - Aim for 80%+ overall. Critical flows (routing, cart, recipe generation, gift claiming) should be near 100%.
- CI:
  - Add a test script with coverage reporting (npm test -- --coverage) and integrate in your CI when available.

## 4. Code Style
General
- Use functional components with React hooks (current codebase standard).
- Keep side-effects in useEffect and always provide correct dependency arrays. Clean up timers and subscriptions.
- Prefer early returns for loading and error states.

Naming and files
- Use PascalCase for React components and file names. Match import path case exactly to avoid production issues on case-sensitive file systems. Standardize pages (e.g., Homepage.jsx, VehiclePage.jsx) and components (Footer.jsx) naming.
- Keep one component per file when feasible. Export default for primary components.

Styling
- Current approach: global CSS files imported per component/page. Avoid leakage via specific class names or consider CSS Modules for isolation.
- Use consistent class naming (e.g., BEM-like) and avoid overly generic names.

Type safety and props
- Adopt PropTypes consistently (Navbar uses PropTypes) for all public components, or plan a gradual migration to TypeScript for stronger guarantees.

Async and data fetching
- Centralize fetch logic and error handling in a small client utility (retry, exponential backoff, status checks) to avoid duplicating logic across components.
- Abort in-flight requests on unmount where applicable (AbortController).

State management
- Keep global state minimal. CartContext is appropriate; memoize provided value to avoid unnecessary re-renders: const value = useMemo(() => ({ cart, setCart }), [cart]).
- If Redux Toolkit is adopted, remove unused dependencies or fully integrate with a store and Provider; avoid duplicating Context + Redux for the same domain.

Accessibility
- Maintain keyboard operability (e.g., onKeyDown handlers for Enter/Space on interactive cards) and use semantic roles/aria-* (already present in multiple components).
- Always provide alt text for images (done in many places). Ensure buttons/links have descriptive labels.

Error and exception handling
- For user-facing operations (e.g., FoodGenerator API), show clear error messages and retry hints. Log with levels (info/warn/error) behind a small logger wrapper if needed.

## 5. Common Patterns
- Routing: React Router v6 with a mix of static and dynamic routes. Consider route-based code splitting with React.lazy and Suspense for faster initial load.
- Persistence: localStorage for cart and daily API call counters. Encapsulate storage keys and parsing in helpers to avoid duplication.
- Data: src/data JSON files aggregated via Datacarrier.js, then sliced/shuffled with memoization on pages.
- UI libraries: Material UI (layout/navigation), framer-motion (animation), react-toastify (notifications). Avoid mixing many UI kits (Bootstrap + MUI + Reactstrap) on the same view to prevent styling conflicts.
- Messaging: WhatsApp order generator composes a formatted message and opens an external link with proper rel attributes.

## 6. Do's and Don'ts
Do
- Keep component files small and focused. Extract complex logic into custom hooks (useCart, useRecipeIdeas).
- Validate props with PropTypes (or TypeScript) and write tests for interactive elements.
- Use useMemo/useCallback to avoid unnecessary renders for derived data and handlers.
- Guard side-effects and clean up timers (e.g., splash screen timeout clear).
- Use consistent route paths and update Navbar when adding new pages.
- Store secrets on the server. For Gemini or other APIs, proxy requests from a backend; never expose production API keys in client code.
- Register the service worker only in production builds and ensure a valid service-worker is produced.

Don't
- Don’t rely on case-insensitive imports. Align file names and import cases.
- Don’t mix multiple UI kits on the same screen without a plan; prefer one design system (MUI or styled-components) per screen.
- Don’t hardcode external URLs where assets can be imported/bundled. Prefer local assets or a CDN config.
- Don’t mutate state directly; always create new arrays/objects for updates.
- Don’t call navigation by setting window.location; prefer React Router navigate for SPA behavior.

## 7. Tools & Dependencies
Key libraries
- react, react-dom, react-router-dom (v6): SPA and routing.
- @mui/material, @mui/icons-material: component library and icons.
- styled-components: optional styling solution (ensure no conflict with MUI styling).
- framer-motion: animations.
- react-toastify: toasts.
- @react-three/fiber, drei, three: 3D/GLTF support (assets present under public/).
- testing-library/*: unit/integration testing.

Setup
- Node.js LTS recommended. Install dependencies with npm ci (for CI) or npm install.
- Scripts:
  - npm start — development server
  - npm run build — production build (note: CI=false to avoid treating warnings as errors)
  - npm test — runs tests in watch mode

Environment variables (.env at project root)
- REACT_APP_GEMINI_API_KEY_1, REACT_APP_GEMINI_API_KEY_2, REACT_APP_GEMINI_API_KEY_3 (FoodGenerator)
- Never commit real API keys. Use per-env files and Netlify/host environment config.

PWA
- Ensure a valid service worker is generated/available at /service-worker.js when calling serviceWorkerRegistration.register().
- Recommended: register service worker conditionally in production and rely on CRA Workbox setup or a custom Workbox config.

## 8. Other Notes
- File/Import casing must match exactly across the repo to avoid Linux deployment issues (e.g., footer.js vs Footer imports, homepage.js vs Homepage usage). Standardize on PascalCase for components and .jsx extension where JSX is used.
- Consider code splitting for routes (React.lazy) and for heavy libraries (three.js scenes) to improve TTI.
- If Redux Toolkit remains unused, remove it from dependencies and resolutions. If used, add a store (configureStore) and <Provider> at index.js and migrate CartContext state there or keep them separated by domain.
- For API client patterns (FoodGenerator), centralize retry/backoff and consider exponential backoff with jitter; bubble user-friendly errors to the UI.
- Add linting/formatting automation (ESLint + Prettier) and pre-commit hooks (Husky) to enforce consistency.
- When adding new store categories, update Datacarrier.js and ensure FeaturedProducts receives consistent shape (id, name, image, price, category), plus route handler.
