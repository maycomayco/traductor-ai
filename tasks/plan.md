# Implementation Plan: OpenAI SDK and Model Refresh for Issue #8

## Plan Mode
This document is written in planning mode only. It is based on the approved `SPEC.md` and the current translation flow in the repository. No product code changes are included in this phase.

## Overview
The goal is to replace the legacy OpenAI Node SDK integration with the current stable SDK and move the translation service to the `Responses API`, while preserving the existing end-to-end user flow and the exact translation contract `{ writing, speaking, coloquial }`. The plan prioritizes the highest-risk work first: modernizing the service boundary and response parsing without changing UI behavior.

## Current Flow Summary
- `src/app/page.tsx` owns translation state via `useTranslation()`.
- `src/components/translation-form.tsx` validates text and submits `FormData` to `getTranslations()`.
- `src/action/translation-action.ts` checks Clerk auth, reads `query`, and calls `createTranslation()`.
- `src/lib/services/open-ai.ts` builds the prompt, calls legacy `openai.createChatCompletion()`, and parses JSON into the `Translation` type.
- `src/components/translation-results.tsx` renders the returned translation or an error state.

## Dependency Graph
Implementation order should follow this dependency chain:

1. Dependency definition
   - `package.json`
   - `pnpm-lock.yaml`

2. OpenAI service foundation
   - `src/lib/services/open-ai.ts`
   - Depends on the installed SDK version and the existing translation schema/type contract

3. Server action integration
   - `src/action/translation-action.ts`
   - Depends on the updated service function signature and service-level error behavior

4. End-to-end UI flow verification
   - `src/components/translation-form.tsx`
   - `src/app/page.tsx`
   - `src/components/translation-results.tsx`
   - Depends on the server action preserving the response shape and failure semantics

5. Final validation and documentation alignment
   - `SPEC.md`
   - `README.md` only if approved and necessary
   - Depends on the final implementation choice being complete and verified

## Architecture Decisions
- Use `openai@6.1.0` as the target SDK version because it is the latest stable version confirmed in the approved spec.
- Use `Responses API` as the preferred implementation path, not `chat.completions`.
- Keep `gpt-4o-mini` fixed in code to optimize for cost.
- Preserve the server action contract and UI behavior so the migration stays internal to the OpenAI path.
- Use runtime schema validation where helpful to protect the `{ writing, speaking, coloquial }` contract during response parsing.

## Vertical Slices
The work is sliced as complete paths rather than horizontal layers:

1. SDK and service migration slice
   - Upgrade dependency
   - Replace legacy client initialization
   - Implement modern request and response parsing
   - Return validated translation data from the service

2. Server action compatibility slice
   - Keep auth behavior intact
   - Ensure the action still returns the same success/error envelope
   - Align error handling with the migrated service

3. End-to-end validation slice
   - Verify the existing client form still submits successfully
   - Confirm results rendering remains unchanged
   - Run required project checks and manual translation scenarios

## Phase Plan

### Phase 1: Foundation and High-Risk Migration

## Task 1: Upgrade the OpenAI dependency to the approved stable SDK

**Description:**
Replace `openai@3.3` with `openai@6.1.0` in the project dependency graph so the codebase can adopt the modern client API.

**Acceptance criteria:**
- [x] `package.json` declares `openai@6.1.0`
- [x] Lockfile is updated consistently with the new SDK version
- [x] No other dependency changes are introduced unless required by the package manager

**Verification:**
- [x] Dependency install succeeds: `pnpm install`
- [x] The installed dependency graph reflects `openai@6.1.0`

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `pnpm-lock.yaml`

**Estimated scope:** Small

## Task 2: Migrate the translation service to the modern OpenAI client and Responses API

**Description:**
Refactor `src/lib/services/open-ai.ts` to replace `Configuration` and `OpenAIApi` with the modern `OpenAI` client, send the translation request through the `Responses API`, and parse the result back into the existing translation contract.

**Acceptance criteria:**
- [x] Legacy SDK imports and `createChatCompletion()` usage are removed
- [x] The service uses the modern `OpenAI` client and `Responses API`
- [x] The model is fixed to `gpt-4o-mini`
- [x] The service returns a validated object with `writing`, `speaking`, and `coloquial`
- [x] Parsing failures produce a controlled service error rather than leaking malformed data

**Verification:**
- [ ] Static validation passes for the service file with `pnpm check` *(blocked by pre-existing repository-wide Biome formatting issues unrelated to this task)*
- [x] Manual inspection confirms the service still exposes the expected return shape

**Dependencies:** Task 1

**Files likely touched:**
- `src/lib/services/open-ai.ts`
- `src/lib/schemas/index.ts` only if runtime parsing support needs a minimal schema-based helper
- `src/types.ts` only if type alignment needs cleanup

**Estimated scope:** Medium

### Checkpoint: After Phase 1
- [ ] The dependency upgrade is complete
- [x] The legacy OpenAI client usage is removed from the service layer
- [x] The service-level contract is still clearly defined as `{ writing, speaking, coloquial }`
- [ ] Human review before proceeding to server-action integration if the response parsing approach changed materially

### Phase 2: Server Action Compatibility

## Task 3: Align the server action with the migrated service boundary

**Description:**
Update `src/action/translation-action.ts` only as needed so it continues to authenticate the user, validate the incoming query, call the migrated translation service, and return the same response envelope consumed by the UI.

**Acceptance criteria:**
- [ ] Clerk auth behavior is unchanged
- [ ] Empty-query handling remains intact
- [ ] Successful translations are still returned under `translations`
- [ ] Service failures are mapped to the existing error response shape
- [ ] No contract changes are introduced for the client caller

**Verification:**
- [ ] `pnpm check` passes for the action and related code
- [ ] Manual review confirms the action response shape remains `success`, `error`, `translations`

**Dependencies:** Task 2

**Files likely touched:**
- `src/action/translation-action.ts`
- `src/lib/services/open-ai.ts` if small signature alignment is required

**Estimated scope:** Small

## Task 4: Preserve end-to-end UI behavior without changing product-facing flow

**Description:**
Confirm the existing client flow continues to work with the migrated backend path. Only apply minimal code changes if the server-action contract or runtime behavior requires them.

**Acceptance criteria:**
- [ ] The form can still submit valid text through the existing action call
- [ ] Loading and error states still work in the current UI flow
- [ ] Successful translations still render in the results panel without UI contract changes
- [ ] No copy, validation-limit, or layout changes are introduced

**Verification:**
- [ ] Manual flow check through the app UI
- [ ] `pnpm build` succeeds

**Dependencies:** Task 3

**Files likely touched:**
- `src/components/translation-form.tsx` only if minimal compatibility changes are required
- `src/app/page.tsx` only if wiring needs minimal adjustment
- `src/components/translation-results.tsx` only if rendering assumptions need minimal correction

**Estimated scope:** Small

### Checkpoint: After Phase 2
- [ ] Authenticated translation flow works end-to-end
- [ ] No UI-facing contract changes were introduced
- [ ] Build succeeds cleanly
- [ ] Human review before final validation and closeout

### Phase 3: Validation and Closeout

## Task 5: Execute manual translation validation and final project checks

**Description:**
Run the required verification pass for the migrated flow, including project checks and the manual scenarios defined in `SPEC.md`.

**Acceptance criteria:**
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes
- [ ] Manual translation validation covers a short casual sentence
- [ ] Manual translation validation covers a longer work-related sentence
- [ ] Manual translation validation covers an idiomatic or informal sentence
- [ ] Returned data remains usable and correctly structured in all manual checks

**Verification:**
- [ ] Run `pnpm check`
- [ ] Run `pnpm build`
- [ ] Perform the three manual translation scenarios while authenticated

**Dependencies:** Task 4

**Files likely touched:**
- No product code required if implementation is already complete
- `README.md` only if a documented behavior or setup note needs approved follow-up

**Estimated scope:** Small

### Checkpoint: Complete
- [ ] All approved spec success criteria are met
- [ ] The OpenAI SDK is updated to `6.1.0`
- [ ] The service uses `Responses API` with `gpt-4o-mini`
- [ ] The translation contract remains unchanged
- [ ] Required checks and manual validation are complete
- [ ] Ready for human review and implementation signoff

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| `Responses API` output shape is harder to parse deterministically than the legacy chat completion content string | High | Use explicit parsing and schema validation at the service boundary; stop and ask before changing API choice |
| The current server action uses unsafe narrowing (`formData.get("query") as string`) and may need cleanup during migration | Medium | Keep changes minimal and align query extraction with TypeScript-safe handling while preserving behavior |
| Upgrading the SDK exposes unrelated typing or import issues | Medium | Limit code changes to the OpenAI integration path first and verify with `pnpm check` after each slice |
| Manual-only validation may miss edge cases in malformed model output | Medium | Use runtime schema validation to guard the contract and capture failures as controlled errors |

## Parallelization Notes
- Sequential work only is recommended for implementation because the service layer is the dependency root for the rest of the flow.
- Manual validation and documentation review can happen after the core migration is stable.

## Open Questions
- None at planning time.
- If implementation reveals that `Responses API` cannot preserve the contract without fragile parsing, the work must pause for user approval before switching to `chat.completions`.

## Review Gate
Do not start implementation until the human reviews and approves this plan and the task list in `tasks/todo.md`.
