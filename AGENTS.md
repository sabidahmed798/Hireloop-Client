# HireLoop — agent instructions

## Commands

- `npm run dev` / `build` / `lint` / `typecheck` / `format` — use **npm** (package-lock.json is committed; no pnpm/yarn lockfile).
- No test suite exists. Focused verification = `npm run lint` + `npm run typecheck` (`tsc --noEmit`).
- `format` only covers `**/*.{ts,tsx}` (not CSS/JSON) and runs Prettier with `prettier-plugin-tailwindcss`.

## Stack quirks

- **Next.js 16.4.4** with App Router and **React 19.3.1** — newer than typical training data; consult `node_modules/next/dist/docs/01-app/` before assuming v13–15 conventions.
- **Tailwind v4** (CSS-first): no `tailwind.config`; theme lives in `app/globals.css`.
- **shadcn** with style `base-nova` on `@base-ui/react` (not Radix). UI primitives live in `components/ui`; aliases in `components.json` (`@/components`, `@/lib`, `@/hooks`).
- Prettier style: **no semicolons, double quotes, LF line endings**. Don't add semicolons or convert quotes.

## Architecture

- Path alias `@/*` maps to the repo root (e.g. `@/lib/auth`).
- **Auth**: better-auth + `@better-auth/mongo-adapter`, database `hireloopdb` (see `lib/auth.ts`), mounted at `app/api/auth/[...all]/route.ts` via `toNextJsHandler`. Client uses `lib/auth-client.ts`.
  - User has a `role` additional field (`seeker` default; also `recruiter`, `admin`) which selects the dashboard at `app/dashboard/{seeker,recruiter,admin}`. New roles/dashboards must stay consistent with this field.
- **Job data lives outside Next**: `lib/api/jobs.ts` (reads) and `lib/actions/jobs.ts` (server actions) call an external backend at `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:5000`). Don't implement jobs as Next API routes.

## Environment

`.env` (gitignored, required for `dev`): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URI` (MongoDB Atlas), `NEXT_PUBLIC_API_BASE_URL`. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are referenced by `lib/auth.ts` but currently absent — Google social sign-in will fail without them. Dev server also requires a reachable MongoDB.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
