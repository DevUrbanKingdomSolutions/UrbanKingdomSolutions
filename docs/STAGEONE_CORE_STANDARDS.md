# StageOne Core Standards

This document is the current implementation guidance for StageOne. It captures the platform rules, legal entity standards, architecture principles, and shared operating patterns that should guide future development.

These standards are planning and implementation context. They do not require an immediate code change unless a task specifically asks to implement them.

For end-of-session knowledge capture, use [Urban Kingdom Solutions Office: Session Summary Standard](SESSION_SUMMARY_STANDARD.md).

## Legal Entity Standard

StageOne is owned, operated, maintained, and provided by:

**Urban Kingdom Solutions, LLC**

Urban Kingdom Solutions, LLC is the primary platform operator and contracting party for StageOne-related agreements, including:

- Terms of Service
- User Agreements
- Privacy Policies
- Subscription Agreements
- Enterprise Agreements
- Data Processing Agreements
- Platform support and security policies

The default legal relationship is:

```text
User / Customer <-> Urban Kingdom Solutions, LLC
```

**Urban Kingdom Management, LLC** is the parent holding company. It may be referenced as the parent company where appropriate, but customer/platform agreements should remain with Urban Kingdom Solutions, LLC unless specifically required.

Affiliated entities:

- **Excalibur Studios**: production and live event operations affiliate.
- **KreativeKingdom**: creative development and design affiliate.

Affiliates are not parties to StageOne platform agreements unless explicitly stated.

## Enterprise Systems Boundary

Project_TED owns StageOne product implementation, product-specific documentation, app code, Supabase schema/function files, release files, mobile source files, and feature-specific planning.

Company-wide infrastructure governance lives in:

```text
/Users/keithrichardsonii/Desktop/Urban-Kingdom-HQ/11-Enterprise-Systems
```

Use `11-Enterprise-Systems` for company-wide rules and maps involving:

- Supabase ownership, access policy, backups, retention, and cross-project usage
- GitHub repository ownership, branch/release policy, and review standards
- Vercel/deployment ownership, environment rules, domains, and promotion policy
- mobile distribution account ownership, signing, app store, and Google Play rules
- credential and secret handling
- cross-project security governance
- shared system architecture

Do not bury company-wide infrastructure decisions inside the StageOne app workspace unless they are project-specific implementation details.

## StageOne Platform Rule

StageOne must be built as a clean operational platform, not a collection of disconnected features.

The goal is:

```text
Clean code.
Clean data.
Clean screens.
Clean workflows.
```

Before adding or changing any feature, ask:

1. Where does this live?
2. Who owns this data?
3. Who can access it?
4. What suite does it belong to?
5. What client/account/event/tour/team scope controls it?
6. What permission model applies?
7. Does it need notes?
8. Does it need notifications?
9. Does it need messages?
10. Does it need documents/files?
11. Does it need audit logging?
12. Does it need data classification?
13. Does it appear on mobile, desktop, or both?
14. Does it generate or publish an approved output?

Avoid one-off logic when a shared StageOne pattern already exists.

If Local Production, Touring, and Awards/Broadcast need similar behavior, build or plan it as a reusable StageOne Core pattern.

## StageOne Core Patterns

The following patterns should be treated as shared platform systems:

- Identity
- Client/account scope
- Suite access
- Site-level role permissions
- Notes
- Needs Attention
- Attention Grace Windows
- Notifications
- Messaging
- Documents/files
- Generated documents
- Audit logs
- Data classification
- Published/approved outputs
- Mobile-first field workflows
- Desktop management workflows

Suites use StageOne Core. Suites do not redefine StageOne Core.

## Scope Model

Records should be scoped clearly. Not every record needs every scope field, but each record should have a defensible ownership model.

Common scope fields:

```text
accountId
clientId
officeSuiteId
eventId
tourId
tourStopId
teamId
workerId
promoterId
productionCompanyId
externalAccessLinkId
```

If a user has to wonder where something lives, the design failed.

## Permission Direction

Move toward one reusable permission question:

```text
canUser(action, record)
```

Actions may include:

- view
- create
- edit
- delete
- approve
- publish
- archive
- message
- notify
- export

The permission engine should consider:

- server role
- site-level access
- account/client scope
- suite scope
- event/tour/team scope
- record ownership
- data classification
- visibility
- approved/published status

## Data Classification Dictionary

Use one shared classification vocabulary across StageOne.

Current classification tags:

```text
public
internal
client_confidential
account_administrative
worker_personal
business_contact
event_operational
operational_intelligence
timekeeping
location
financial_payroll
media_photo
vehicle_operational
incident_sensitive
communications
travel
legal_compliance
system_admin
external_approved
```

Do not create suite-specific synonyms unless there is a clear reason.

Example metadata shape:

```text
classification: {
  tags: ["timekeeping", "worker_personal", "client_confidential"],
  visibility: "client_admin",
  sensitivity: "restricted",
  externalShareable: false
}
```

Most classifications should be assigned automatically from record type. Users should not have to classify routine records manually.

## Local Production Classification Starting Points

Start classification work with sensitive Local Production workflows:

1. Timecards
2. Geolocation/time punch exceptions
3. Vehicle photos
4. Admin notes / Needs Attention
5. Worker profiles
6. Incident reports
7. Messages
8. Documents/files

This is the proving ground before applying the same patterns to Touring and Awards/Broadcast.

## Geolocation Boundary Rule

StageOne does not track runners.

Current approved geolocation use:

```text
Capture location at the moment of a time punch / clock-in event.
Compare that location to the scheduled venue/location when needed.
Create an exception notice if the user is more than 2 miles away.
```

Not approved:

- continuous runner tracking
- live location tracking
- background movement tracking
- route tracking
- location history outside punch events
- map-based runner monitoring
- production watching where runners are

Use this language:

- time punch location verification
- clock-in location exception
- location captured at punch time
- distance exception from scheduled location

Avoid this language:

- runner tracking
- live runner location
- route monitoring
- location surveillance

Privacy framing:

```text
StageOne may collect device location at the time a user records a time punch, such as clock-in, for timekeeping verification and exception handling. StageOne does not provide continuous location tracking or live runner tracking.
```

## Notes System Direction

Notes should become a shared StageOne Core pattern, not disconnected text fields per page.

Target note structure:

```text
noteId
scopeType
scopeId
visibility
classificationTags
status
sourceType
sourceId
createdBy
createdAt
resolvedAt
archivedAt
```

Example visibility values:

```text
internal
client_admin
account_owner
production_team
promoter_scoped
crew_self
team_scoped
external_approved
system_admin
```

Internal notes should never appear in external documents unless explicitly marked shareable/approved.

## Needs Attention System Direction

Needs Attention items should become structured operational issues.

Target structure:

```text
condition
owner
scope
severity
target record
target page
created note
notification behavior
resolved condition
archive behavior
```

Needs Attention should show what matters now, not every missing item in the system.

## Attention Grace Windows

An Attention Grace Window is the amount of time or condition-based delay StageOne allows before a missing, incomplete, or pending item becomes an active Needs Attention item.

Core principle:

```text
Missing is not always urgent.
Pending is not failure.
Needs Attention means the timing now matters.
```

Status lifecycle:

```text
Not Required
Pending
Soft Reminder
Needs Attention
Escalated
Resolved
Archived
```

Each Attention Grace Window may define:

- trigger condition
- pending state
- soft reminder timing
- Needs Attention timing
- escalation timing
- notification recipients
- target record/page
- resolution condition
- archive behavior

Example: rental vehicle start photos

```text
Required when: Runner clocks in and has rental vehicle assigned
Soft reminder: Immediately or shortly after clock-in
Needs Attention: After 30-45 minutes
Notify Client Admin: When Needs Attention begins
Escalate: Optional later window
Archive: When required photos/plate are submitted
```

The dashboard should not become a wall of panic. It should show operational issues whose timing now matters.

## Stage Intelligence

Stage Intelligence is the operational logic layer that helps StageOne understand status, timing, risk, visibility, readiness, and next actions across the platform.

Stage Intelligence is not just an AI chat box.

It should help answer:

```text
What kind of data is this?
Who should see it?
Is it resolved?
Does someone need to act?
Can this be published?
Should this become a note?
Should this trigger a notification?
Should this stay internal?
Is now the right time to bother someone?
```

Examples:

- Clear Needs Attention after rental photos are submitted.
- Create a restricted admin note when a clock-in location exception occurs.
- Flag a tour city when required advance information is due.
- Keep team workspace data internal until approved for the shared tour layer.
- Mark travel readiness as Action Required when documents expire before international travel.

## Documents And Generated Outputs

StageOne should support one shared document foundation for:

- uploaded files
- generated documents
- templates
- PDFs
- version history
- approval status
- published status
- visibility
- external access

Generated documents should only pull data that is:

```text
approved
publishable
visible to the intended audience
```

Every shared/published output should be traceable back to the source records and approval state that created it.

## Touring Suite Direction

Touring should use StageOne Core patterns rather than becoming a separate app.

Major objects:

- Tour
- Tour Stop / City Workspace
- Team Workspace
- Shared Tour Layer
- Advance Tracker
- Crew Personnel
- Travel & Accommodations
- Documents
- Unified Advance Builder

Multi-team touring rule:

```text
Separate teams should be able to work independently.
StageOne should make them look unified when it matters.
```

Internal flexibility. External consistency.

## International Touring Direction

International Touring should extend existing records, not duplicate them.

Do not create separate international-only records such as:

```text
International Person
International Venue
International Contact
```

Extend:

```text
Person
Venue
Contact
Company
Tour
Event
Document
Note
```

Version 1 pillars:

- International Personnel Mobility
- Operational Intelligence

New core object:

- Country Profile

Deferred:

- International Freight & Customs Management

Freight/customs remains parked until real freight forwarders, customs brokers, touring logistics managers, and international production managers validate the workflow.

## Awards / Broadcast / Specials Direction

Awards, broadcast specials, and corporate events should use StageOne Core patterns while preserving show-specific language.

Major objects:

- Show / Special / Corporate Event
- Departments
- Rundown
- Production Book
- Staffing
- Credentials
- Documents
- Approvals
- Published packets

## Mobile And Desktop Workflow Rule

Mobile is for field work:

- crew/runner actions
- time punches
- vehicle photos
- assigned tasks
- messages
- quick reminders

Desktop is for management:

- setup
- review
- approvals
- bulk editing
- documents
- reporting
- payroll
- account/client management

Same data. Different workflows.

## Immediate Implementation Roadmap

1. Write StageOne Core standards into the project.
2. Stabilize Local Production workflows using those standards.
3. Add Core metadata/patterns workflow by workflow.
4. Apply proven Core patterns to Touring.
5. Apply proven Core patterns to Awards/Broadcast/Specials.
6. Prepare legal documents and deployment readiness.

Practical Local Production order:

1. Timecards
2. Vehicle photos
3. Notes / Needs Attention
4. Notifications
5. Worker profiles
6. Incident reports
7. Messages
8. Documents/files

## Build Checklist

Before implementing a feature, answer:

```text
Is this suite-specific, or is this a StageOne Core pattern?
Where does this record live?
Who owns it?
Who can view/edit/delete/approve/publish it?
What scope controls it?
What data classification applies?
Does it need notes?
Does it need Needs Attention?
Does it need an Attention Grace Window?
Does it notify anyone?
Does it appear on mobile, desktop, or both?
Can it be externally shared?
Does it generate or publish output?
Does it require audit history?
```

## Guiding Principles

```text
Simple screens, serious structure.
Internal flexibility, external consistency.
Clean platform. Clear ownership. Scoped access. Reusable patterns. Traceable outputs.
Technology should support the user. Users should not have to adapt themselves to software.
```
