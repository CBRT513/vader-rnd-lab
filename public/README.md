# Vader R&D Lab (Prompt→PR→Preview)

Describe what you want in an issue. A bot opens a PR with code + Preview URL. Approve via comments.

## Use
1. **New Issue** → choose "Feature / Change Request" → write plain English.
2. Watch the PR that appears → open the **Preview URL**.
3. If good: comment `/promote staging` (or `/promote prod`).

## Secrets Needed
- AI_PROVIDER, AI_API_KEY
- FIREBASE_SERVICE_ACCOUNT
- FIREBASE_PREVIEW_PROJECT, FIREBASE_STAGING_PROJECT, (optional) FIREBASE_PROD_PROJECT
