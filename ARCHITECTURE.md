# Architecture decisions

## Public GitHub data only

The portfolio is public, therefore the API deliberately returns only repositories where GitHub reports `private: false`.

## Why NestJS exists separately

NestJS owns integration with GitHub, rate-limit protection, normalization and caching. The UI never depends directly on GitHub's raw payload.

## Why Redux Toolkit is used

Redux owns interactive project discovery state: text search, language filter, sort and archived visibility. Server state stays on the server; client UI state stays in Redux.

## Accessibility baseline

- semantic `header`, `nav`, `main`, `section`, `article`, `footer`
- skip link
- keyboard-visible focus treatment
- no hover-only interaction
- 44px+ primary touch targets
- meaningful accessible names for icon-only controls
- reduced-motion support
- responsive type/layout without horizontal overflow
- light/dark contrast tested through shared design tokens

## Performance baseline

- server-rendered first view
- Next Image for avatar
- optimized variable web fonts with `next/font`
- backend memory cache + CDN cache headers
- frontend revalidation every 5 minutes
- no heavy animation or component library
- minimal client JavaScript: only project filtering is client-side
