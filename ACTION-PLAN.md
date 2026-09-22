# 🎯 Whizzly Lab — Prioritized SEO & Website Action Plan

| Priority | Task | File(s) | Impact |
| :---: | :--- | :--- | :---: |
| 🔴 **P0** | **Fix Ignored Metadata on Contact & Schedule**<br>Create `src/app/contact/layout.tsx` and `src/app/schedule/layout.tsx` Server Components with unique titles, descriptions, canonical URLs, and Open Graph tags. | `src/app/contact/layout.tsx`<br>`src/app/schedule/layout.tsx` | Critical |
| 🔴 **P0** | **Remove Non-Visible & Deprecated FAQPage Schema**<br>Delete the unrendered FAQPage JSON-LD schema from `src/app/page.tsx` to prevent Google Search Console manual action / spam flag. | `src/app/page.tsx` | Critical |
| 🟡 **P1** | **Fix Title Tag Truncation & Duplicate Brand Name**<br>Remove hardcoded `— Whizzly Lab` suffixes from page titles where `layout.tsx` template already appends `| Whizzly Lab`. Optimize titles to 40–55 chars. | `src/app/*/page.tsx` | High |
| 🟡 **P1** | **Expand Service Meta Descriptions to 145–160 chars**<br>Rewrite service `short` descriptions in `services.ts` from 70–90 chars to rich, keyword-complete SERP snippets. | `src/lib/services.ts` | High |
| 🟡 **P1** | **Add Structured Service Schema to `/services/[slug]`**<br>Inject Schema.org `@type: "Service"` JSON-LD linked to the primary organization identity. | `src/app/services/[slug]/page.tsx` | High |
| 🟡 **P1** | **Fix BreadcrumbList Schema Missing Item Property**<br>Ensure terminal breadcrumb item always resolves to absolute canonical URL in `Breadcrumbs.tsx`. | `src/components/Breadcrumbs.tsx` | Medium |
| 🟢 **P2** | **Add Explicit AI Search Bot Allowances in `robots.ts`**<br>Declare allow rules for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`, and `Google-Extended`. | `src/app/robots.ts` | Medium |
| 🟢 **P2** | **Enhance Homepage & Pricing Heading Hierarchy**<br>Add screen-reader topical context to Homepage H1 and refine Pricing H1 to `"Transparent AI & Engineering Pricing"`. | `src/components/HeroSection.tsx`<br>`src/components/PricingContent.tsx` | Medium |
| 🟢 **P2** | **Refine Image Alt Attributes for Screen Readers & SEO**<br>Add descriptive studio context to logo and service hero images. | `src/components/ServiceDetail.tsx`<br>`src/app/about/page.tsx` | Low |
