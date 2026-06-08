# StageOne Governance Package v1

## Approved Architecture Standards

## Purpose

This document captures the approved governance decisions from the StageOne Architecture Room. These are platform standards and architectural rules. They should guide future development across Local Production, Touring, Awards/Broadcast, Corporate Events, Stage Intelligence, mobile, desktop, and future suites.

These are governance standards first and implementation tasks second.

## 1. Notification Trigger Rules

Core philosophy:

```text
Notifications exist to drive action, not to report everything.
```

Users should only be notified when:

- action is required
- awareness is important
- a workflow is blocked
- an exception occurred

Notifications should not exist simply because data changed.

Notification categories:

- Informational: no action required.
- Action Required: user must perform an action.
- Exception: workflow deviation requiring visibility.
- Critical: immediate attention required.

Official rule:

```text
A notification should never exist without:

1. a recipient
2. a reason
3. a resolution path
```

## 2. Notification Delivery Matrix

Every notification trigger should define:

- recipient
- in-app delivery
- push delivery
- Needs Attention status
- audit requirement
- escalation rules

Examples:

- Direct Message -> recipient
- Clock-In Exception -> Client Admin
- Timecard Edit -> Client Admin
- System Error -> System Admin
- Missing Vehicle Photos -> Runner + Client Admin

Notification escalation levels:

```text
Level 1: Notification
Level 2: Reminder
Level 3: Escalation
Level 4: Administrative Visibility
```

## 3. Notes Lifecycle Rules

Purpose:

```text
Notes preserve operational context.
```

Lifecycle:

```text
Created
-> Active
-> Resolved
-> Archived
-> Retention Archive
```

Note types:

- User Notes
- System Notes
- Administrative Notes
- Resolution Notes

Rules:

- Every note must have a source record.
- Notes inherit source record classification.
- Notes inherit source record permissions.
- System notes cannot be edited.
- Notes do not contain discussion threads.
- Notes remain operationally focused.

Timestamp requirements:

- Created Date/Time
- Created By
- Resolved Date/Time
- Resolved By
- Archived Date/Time
- Archived By

Dismiss vs Resolve:

- Dismiss: temporary suppression. If the issue remains unresolved, the note may return.
- Resolve: issue actually fixed. Resolved notes move to history.

Retention:

Deleted notes are not immediately destroyed. They move to a Retention Archive accessible to System Admin.

## 4. Generated Outputs Standard

Generated outputs include:

Touring:

- Advance Riders
- Travel Documents
- Team Sheets
- Venue Packets

Local:

- Staffing Sheets
- Reports
- Payroll Outputs

Awards/Broadcast:

- Production Books
- Credentials Lists
- Rundowns

Lifecycle:

```text
Draft
-> Review
-> Approved
-> Published
-> Archived
```

Rules:

- Only Published outputs may be externally shared.
- Every published revision creates a new version.
- Revision summaries are required.

Example revision summary:

```text
v2.4
- Updated Hospitality
- Updated Dressing Rooms
```

Operational versioning:

Users see operational changes, not editing history.

Component versioning:

Individual sections maintain independent version history.

Examples:

- Hospitality
- Dressing Rooms
- Truck Inventory
- Contacts

Component restore:

Users may restore a single section or multiple sections without rolling back the entire workspace.

## 5. System Error Reporting Standard

Purpose:

```text
Errors are operational intelligence.
```

Error levels:

- User Error: guidance only.
- Workflow Error: workflow prevented completion.
- System Error: application malfunction.
- Critical Error: platform-impacting issue.

Error records must capture:

- Error ID
- User
- Server Role
- Site Role
- Suite
- Workflow
- Record
- Timestamp
- Error Description

Rules:

- Errors should be human-readable.
- Every significant error should have an owner.
- Errors should be actionable.
- Notes and errors remain separate systems.

## 6. Audit Logging Standard

Purpose:

```text
Audit Logs preserve truth.
```

Audit Logs are:

- immutable
- searchable
- administrative

Always audit:

Authentication:

- Login Success
- Login Failure
- Password Reset
- MFA Changes
- Account Lock/Unlock

Permissions:

- Access Changes
- Role Changes

Timecards:

- Punch Edits
- Resets
- Deletes

Payroll:

- Rate Changes
- Payroll Edits

Documents:

- Approvals
- Publishing
- Version Restores

Governance:

- Classification Changes
- Security Changes

Visibility:

- Crew: no audit access
- Standard Users: no audit access
- Client Admin: audit access within scope
- System Admin: full audit access

Rule:

```text
Audit Logs are an administrative tool, not a user-facing workflow.
```

No reason field is required. Audit records stand on their own. Notes provide context.

## 7. Mobile vs Desktop Workflow Rules

Core philosophy:

```text
Permissions remain consistent.
Experience adapts to the device.
```

Official rule:

```text
Users do not lose capabilities because they switch devices.
Workflow presentation changes based on usability.
```

Desktop is optimized for:

- Scheduling
- Documents
- Reports
- Permissions
- Administration
- Bulk Operations

Tablet supports:

- Single Entry
- Batch Creation
- Bulk Editing

with touch optimization.

Phone supports:

- Single Entry
- Single Edit
- Operational Workflows

Phone does not support:

- Batch Creation
- Bulk Editing
- Mass Actions

Reason:

```text
User fatigue and usability.
```

Official rule:

```text
StageOne should not encourage high-volume data entry on phone-sized devices.
```

## 8. Suite Scope Rules

Core philosophy:

```text
Suites do not own data.
Suites consume and contribute data.
```

Global objects:

- Profiles
- Companies
- Venues
- Hotels
- Airports
- Vehicles

Global operational objects:

- Events
- Tours
- Teams
- Departments

Suite-owned workflows:

Touring:

- Advancing
- Travel
- Accommodations

Local:

- Staffing
- Timecards
- Payroll

Awards/Broadcast:

- Credentials
- Rundowns
- Production Books

Shared platform services:

- Notes
- Notifications
- Messaging
- Documents
- Audit Logs

Information sharing layers:

```text
Private
-> Shared
-> Published
```

Suites may expose selected information to other suites.

Examples:

- Touring may share staffing requirements with Local Production.
- Awards may share approved schedules with Local Production.

Events and Tours remain single global objects.

## 9. Permission Action Dictionary

Purpose:

All permission checks should eventually route through:

```text
canUser(action, record)
```

Core actions:

View:

- view
- view_restricted
- view_audit

Create:

- create
- duplicate
- import

Edit:

- edit
- bulk_edit
- reassign

Archive:

- archive
- restore
- purge

Approval:

- review
- approve
- reject
- publish

Communication:

- message
- notify
- mention

Assignment:

- assign
- unassign
- schedule

Governance:

- classify
- manage_access
- override
- grant_temporary_access

Outputs:

- generate
- export
- distribute
- version_restore

Administrative:

- manage_suite
- manage_account
- manage_system

Permission engine inputs:

- Server Role
- Site Role
- Client Scope
- Event Scope
- Tour Scope
- Team Scope
- Ownership
- Classification
- Status
- Temporary Access

Official rule:

```text
Permissions should be action-based, not page-based.
```

Ask:

```text
Can the user perform this action on this record?
```

Not:

```text
Can the user open this page?
```

## Temporary Elevated Access Framework

Future governance feature:

Users may request temporary access to restricted functions.

Examples:

- Audit History
- Sensitive Records
- Restricted Documents

Rules:

- Requires approval
- Time-limited
- Automatically revoked
- Audited

Example:

```text
24-hour access window
Maximum: 3 requests per 30 days
No rollover
```

Purpose:

Support legitimate operational needs without granting permanent elevated access.

## StageOne Governance Philosophy

- Notifications drive action.
- Needs Attention tracks urgency.
- Notes preserve operational context.
- Audit Logs preserve truth.
- Permissions are action-based.
- Suites consume and contribute data.
- Generated outputs follow approval and publishing workflows.
- Mobile and Desktop share permissions but optimize workflows differently.

The goal is a clean, scalable, enterprise-grade operational ecosystem that remains simple for end users while maintaining strong governance behind the scenes.
