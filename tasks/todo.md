# Task List: OpenAI SDK and Model Refresh for Issue #8

## Phase 1: Foundation and High-Risk Migration
- [x] Task 1: Upgrade the OpenAI dependency to `openai@6.1.0`
  - Acceptance: `package.json` and `pnpm-lock.yaml` reflect the approved SDK version only
  - Verify: `pnpm install`
  - Files: `package.json`, `pnpm-lock.yaml`

- [x] Task 2: Migrate the translation service to the modern client and `Responses API`
  - Acceptance: `src/lib/services/open-ai.ts` uses the current SDK, `Responses API`, fixed model `gpt-4o-mini`, and returns validated `{ writing, speaking, coloquial }`
  - Verify: `pnpm check`
  - Files: `src/lib/services/open-ai.ts`, optionally `src/lib/schemas/index.ts`, `src/types.ts`

## Checkpoint: Phase 1 Review
- [ ] Dependency upgrade completed
- [x] Legacy OpenAI client usage removed
- [x] Translation service contract still preserved
- [ ] Human review before continuing if parsing strategy changed materially

## Phase 2: Server Action Compatibility
- [ ] Task 3: Align the server action with the migrated service
  - Acceptance: auth, empty-query handling, and `{ success, error, translations }` response shape remain unchanged
  - Verify: `pnpm check`
  - Files: `src/action/translation-action.ts`, optionally `src/lib/services/open-ai.ts`

- [ ] Task 4: Preserve end-to-end UI behavior with minimal or no client changes
  - Acceptance: form submission, loading, error handling, and results rendering still work without UX changes
  - Verify: manual authenticated flow check, `pnpm build`
  - Files: only if required: `src/components/translation-form.tsx`, `src/app/page.tsx`, `src/components/translation-results.tsx`

## Checkpoint: Phase 2 Review
- [ ] Authenticated flow works end-to-end
- [ ] No UI-facing contract changes introduced
- [ ] Build passes
- [ ] Human review before final validation

## Phase 3: Validation and Closeout
- [ ] Task 5: Run final checks and manual translation validation
  - Acceptance: `pnpm check` and `pnpm build` pass; three manual translation scenarios succeed while authenticated
  - Verify: `pnpm check`, `pnpm build`, manual validation
  - Files: none required unless approved doc follow-up is needed

## Checkpoint: Complete
- [ ] All spec success criteria satisfied
- [ ] `Responses API` and `gpt-4o-mini` confirmed in implementation
- [ ] Translation contract preserved
- [ ] Ready for implementation signoff
