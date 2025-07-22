# AI Coding Agent Instructions for Platforms

This is a **Next.js 15 App Router multi-tenant application** using subdomain-based routing. Each tenant gets their own subdomain with custom branding.

## Architecture Overview

**Core Flow**: `middleware.ts` → subdomain extraction → rewrite to `/s/[subdomain]` → Redis lookup → tenant page render

- **Middleware** (`middleware.ts`): Handles subdomain extraction across environments (localhost, production, Vercel previews)
- **Tenant Storage**: Redis with `subdomain:{name}` key pattern storing `{emoji, createdAt}`
- **Route Structure**: 
  - Root domain: Landing page + admin panel
  - Subdomains: Rewritten to `/app/s/[subdomain]/page.tsx`
  - Admin blocked on subdomains via middleware

## Key Patterns

### 1. Subdomain Detection
The middleware handles complex subdomain extraction:
```typescript
// Supports: localhost, production, and Vercel preview URLs (tenant---branch.vercel.app)
const subdomain = extractSubdomain(request);
if (subdomain && pathname === '/') {
  return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
}
```

### 2. Redis Data Layer
- **Connection**: Upstash Redis via `@upstash/redis` 
- **Key Pattern**: `subdomain:{sanitized-name}` stores `{emoji: string, createdAt: number}`
- **Validation**: `isValidIcon()` validates emoji input (Unicode regex with fallback)
- **Operations**: `getSubdomainData()`, `getAllSubdomains()` in `lib/subdomains.ts`

### 3. Server Actions Pattern
Server actions in `app/actions.ts` handle tenant CRUD:
- Input sanitization: `subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '')`
- Validation before Redis operations
- Redirect to newly created subdomain on success

### 4. Environment Configuration
Critical env vars in `lib/utils.ts`:
- `NEXT_PUBLIC_ROOT_DOMAIN` (default: `localhost:3000`)
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` for Redis

## Development Workflow

### Local Setup
```bash
pnpm install
# Configure .env.local with Redis credentials
pnpm dev  # Uses --turbopack
```

### Testing Subdomains Locally
- Use `[tenant].localhost:3000` URLs
- Middleware handles `.localhost` detection automatically
- No hosts file modification needed

### Component Architecture
- **shadcn/ui** components in `components/ui/`
- **Client components**: Forms with `useActionState` for server actions
- **Server components**: Async components fetching Redis data
- **Styling**: Tailwind 4 with custom gradient backgrounds

## Critical Implementation Details

### Middleware Matcher
```typescript
export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)']
};
```
Excludes API routes, Next.js internals, and static files.

### Data Validation
- Subdomain: Alphanumeric + hyphens only
- Emoji: Unicode pattern validation with 10 char limit
- Duplicate prevention via Redis key existence check

### Admin Interface
- Accessible only on root domain (`/admin` blocked on subdomains)
- Lists all tenants via `getAllSubdomains()`
- Includes deletion functionality with `revalidatePath()`

## Common Tasks

**Adding new tenant fields**: Update the `SubdomainData` type in `lib/subdomains.ts` and migration logic.

**Custom tenant pages**: Create new routes under `/app/s/[subdomain]/` - they automatically receive subdomain context.

**Environment handling**: Update `extractSubdomain()` for new deployment platforms.

**Redis operations**: Always sanitize subdomain input and handle null/undefined Redis responses.

## Dependencies
- **Core**: Next.js 15, React 19, TypeScript
- **Data**: @upstash/redis for tenant storage
- **UI**: @radix-ui components, Tailwind 4, shadcn/ui
- **Extras**: frimousse (emoji picker), lucide-react (icons)

The app prioritizes simplicity: tenant creation → Redis storage → subdomain routing. Focus on this core flow when making changes.
