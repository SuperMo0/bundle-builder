# Bundle Builder

A Wyze-style camera & sensor bundle picker built with React, TypeScript, and Vite — pick your cameras, plan, and add-ons, and watch the live review panel update as you go.

## Live

- **App** — <https://supermo0.github.io/bundle-builder/>
- **Storybook** — <https://supermo0.github.io/bundle-builder/storybook/>
- **Test coverage report** — <https://supermo0.github.io/bundle-builder/coverage/>

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build locally
```

## Quality & Accessibility

- **Error boundary** — the bundle builder is wrapped in a `react-error-boundary`, so a crash shows a friendly "Something went wrong, try again" screen instead of a blank page.
- **Built on Radix UI** — the variant picker, plan selector, and step accordion use Radix primitives rather than hand-rolled widgets, which gets us correct keyboard navigation, focus management, and ARIA wiring for free instead of us reinventing it.
- **Live regions** — the quantity stepper and the "N selected" step counter use `aria-live="polite"`, so screen readers announce changes as you adjust the bundle, not just on page load.
- Controls are labeled with `aria-label` ("Increase quantity", "Color", ...), decorative icons are `aria-hidden`, and the error fallback uses `role="alert"`.

## CI/CD

![CI](https://github.com/SuperMo0/bundle-builder/actions/workflows/ci.yml/badge.svg)

Every push and pull request runs through GitHub Actions:

- Type-checking (`tsc -b`)
- Linting (`eslint .`)
- The full test suite, with coverage (`vitest run --coverage`)

On every push to `main`, a second workflow builds the app, Storybook, and the coverage report and deploys all three to GitHub Pages.

### Running tests locally

```bash
npm test              # run once
npm run test:coverage # run with a coverage report
```

Current coverage:

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 30.57%   |
| Branches   | 24.34%   |
| Functions  | 36.36%   |
| Lines      | 36.55%   |

## A note on scope

There's no backend here — the bundle catalog is a static JSON file. That was a deliberate choice: with limited time, it mattered more to get the actual interaction right (variant-aware quantities, live review panel, persistence, tests, accessibility) than to stand up an API just to serve data that never changes.

If this grows a real backend later, the seam is already there: `useBundleSteps` just returns the static catalog today, but it's already shaped like a data-fetching hook. Swapping it to fetch from an API with **React Query** wouldn't touch any of the components that consume it.
