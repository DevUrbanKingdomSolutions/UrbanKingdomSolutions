# StageOne Development Session Summary Standard

## Purpose

At the end of major coding, testing, debugging, release, mobile sync, backend, integration, or deployment sessions, Codex should generate a structured development session summary.

The purpose of the development summary is to preserve implementation history, make future work easier to resume, and give the Urban Kingdom Solutions Office a clean record of what changed in the product.

This summary is different from the Office Session Summary:

```text
Office Session Summary = why decisions were made.
Development Session Summary = what changed in the product and how it was verified.
```

## When To Use

Use this standard after sessions involving:

- app code changes
- UI or workflow changes
- permission/access changes
- Supabase/backend changes
- messaging/notification changes
- mobile/Capacitor changes
- release/version updates
- testing/debugging passes
- git commits/pushes
- implementation of StageOne Core patterns

Do not use this for pure planning sessions unless code or project files were changed.

## Summary Template

### Session Title

Short descriptive title.

Examples:

- Timecard Profile Controls
- Archive Resolved Notes
- StageOne Core Standards Documentation
- Mobile Header Refinement

### Date

Session date.

### Build / Version

Include current release/version information.

Example:

```text
Release: V1.06.xxx
Mobile shell/package version: 1.x.x
Branch: main
Commit: abc1234
Push status: pushed
```

### Area

Examples:

- StageOne Local Production
- StageOne Core
- Messaging
- Notifications
- Timecards
- Vehicles
- Mobile App
- Supabase
- Documentation
- Release / Deployment

### Summary

Concise overview of:

- what was changed
- what issue or need it addressed
- what user or system behavior was affected

Keep this readable by technical and non-technical stakeholders.

### User-Facing Changes

List visible or behavioral changes users may notice.

Examples:

- Timecard rows now open a profile popup.
- Runner punch edits notify Client Admin.
- Resolved vehicle photo notes stop appearing in Recent Notes.

If none, state:

```text
No user-facing changes.
```

### Technical Changes

Summarize implementation changes without excessive code detail.

Examples:

- Added helper for timecard punch reset behavior.
- Updated release notice metadata.
- Added documentation standard file.
- Synced Capacitor web assets.

### Files / Areas Changed

List the important files or folders changed.

Example:

```text
app.js
styles.css
sw.js
index.html
package.json
package-lock.json
android/app/build.gradle
docs/STAGEONE_CORE_STANDARDS.md
```

### Verification Performed

List checks/tests run.

Common checks:

```text
node --check app.js
node --check sw.js
git diff --check
npm run cap:prepare
npm run cap:check
```

If a check was not run, state why.

### Mobile Sync Status

State whether Capacitor/mobile preparation was run.

Example:

```text
Mobile shell synced through npm run cap:prepare.
Native readiness check passed.
```

### Git Status

Include:

- staged status
- commit message
- push status
- branch
- untracked files intentionally ignored

Example:

```text
Committed: V1.06.xxx Example commit title
Pushed: yes
Branch: main
Known untracked generated files ignored: android/.idea, iOS workspace files, tmp_award_docs
```

### Data / Permission Impact

Document whether the change affects:

- user roles
- site access
- scoped records
- data classification
- notes
- notifications
- geolocation/timekeeping
- privacy-sensitive areas

If none, state:

```text
No data or permission impact identified.
```

### Security / Privacy Impact

Document any impact on:

- authentication
- authorization
- sensitive data visibility
- geolocation
- media/photo uploads
- messages
- audit/history
- external sharing

If none, state:

```text
No security or privacy impact identified.
```

### Known Issues / Follow-Up

List unresolved technical issues or next checks.

Examples:

- Notification duplication still needs later review.
- Touring UI still needs workflow pass.
- HQ-level governance files are local only because Urban-Kingdom-HQ is not a Git repo.

### Next Technical Steps

Provide practical next steps.

Examples:

- Apply Core metadata to timecards.
- Add Attention Grace Window behavior for rental start photos.
- Continue Local Production permission cleanup.

### Development Summary For ChatGPT

Provide a short paste-ready paragraph for the Urban Kingdom Solutions Office or ChatGPT review.

It should explain what changed without requiring code context.

## Output Rule

When the user asks for a development summary, Codex should produce a paste-ready summary using this structure.

Keep the summary factual. Mention code only where it helps preserve implementation history.
