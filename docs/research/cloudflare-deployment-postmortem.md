# Cloudflare Deployment Post-Mortem

**Date:** 2026-01-02  
**Duration:** ~2 hours  
**Outcome:** Site successfully deployed

## What Went Wrong

### 1. Conflicting Projects
- Two projects existed: `token-tickr` (Workers) and `tokentickr` (Pages)
- Both connected to the same GitHub repo
- Domain `tokentickr.com` was being served by the wrong project

### 2. Outdated Configuration
- Legacy `workers-site/` folder used KV-based asset handler requiring `__STATIC_CONTENT` binding
- Should have used modern `[assets]` configuration in `wrangler.toml`

### 3. Wrong Deploy Commands
- `npx wrangler deploy` (Workers) vs `npx wrangler pages deploy` (Pages)
- `true` command makes build succeed but deploys nothing

### 4. API Token Permissions
- Token lacked Cloudflare Pages permissions
- Token was named for wrong project (`token-tickr`)

## Solution

1. Deleted `token-tickr` Workers project (or disconnected Git)
2. Updated `wrangler.toml` to use `[assets]` config:
   ```toml
   [assets]
   directory = "./out"
   ```
3. Updated deploy command to `npx wrangler deploy`
4. Deployed from local CLI (already authenticated)

## Lessons Learned

- Cloudflare Pages and Workers are now unified; use `[assets]` for static files
- Don't have multiple projects connected to same repo
- Verify API token has correct permissions before troubleshooting other issues
- When in doubt, deploy locally to see actual errors
