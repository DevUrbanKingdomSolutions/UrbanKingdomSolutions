# StageOne Feature Brief: Document Workspace

## Purpose

StageOne needs a Document Workspace system for large operational packets such as tour advance riders, production books, venue packets, promoter packets, and event documents.

The goal is not just to generate PDFs.

The goal is to make large operational documents easier to navigate, search, publish, print, and share.

Large tour packets can be hundreds of pages and contain many different document types inside one file. Users should not be forced to scroll through unrelated information to find what they need.

Core rule:

```text
A user should never be forced to scroll through unrelated information to find the information they need.
```

## Core Concept

A Document Workspace is a container that holds multiple related documents and sections.

Example:

```text
Document Workspace: Tour Advance Packet

Tabs:
- Overview
- Contacts
- Crew Calls
- Dressing Rooms
- Hospitality
- Support Acts
- Stage / Plots
- Power
- Audio
- Wireless
- Internet / IT
- Engineering
- Inventory
- Attachments
```

Each tab may contain multiple sections or pages.

## Why This Exists

Current large PDFs are organized for creation, not consumption.

A production manager, venue manager, dressing room coordinator, catering team, IT contact, or rigger may each need completely different parts of the same packet.

StageOne should allow users to open the correct section directly instead of digging through a massive PDF.

The problem is not that the document is long.

The problem is that the document is hard to navigate.

## Internal Workspace vs Published Workspace

### Internal Document Workspace

Used by authorized StageOne users.

Supports:

- editing
- draft sections
- notes
- attachments
- versioning
- review
- approval
- publishing

### Published Document Workspace

External-facing view.

Supports:

- view-only access
- public or shared link
- no account required when published as public
- search
- tabs
- section navigation
- print button
- download/export options when allowed

## Published Public View

When approved/published, StageOne should generate a public web view.

Example:

```text
stageone.app/p/[published-workspace-id]
```

This view should:

- require no login if marked public
- be read-only
- show tour/event branding
- show tabs for each major document/section
- include a print button
- allow printing of current section, current tab, or full workspace
- support mobile and desktop viewing

## Navigation Requirements

Document Workspace navigation should prioritize how users search for information, not how PDFs are paginated.

### Level 1: Tabs

Top-level tabs represent major document areas.

Examples:

- Hospitality
- Dressing Rooms
- Power
- Crew Calls
- Engineering

### Level 2: Sections

Inside each tab, content may be broken into sections.

Examples under Dressing Rooms:

- Room Grid
- Furniture Rider
- Hospitality Requirements
- Reference Photos
- Office Setup

### Level 3: Page / Section Arrows

If a tab or section contains multiple pages or subsections, the viewer should include large previous/next arrows.

Desktop:

- left arrow
- right arrow
- section title
- page/section indicator

Mobile:

- large touch-friendly arrows
- swipe support if practical
- fixed navigation controls

Example:

```text
Previous Section <-
Female Dressing Room
-> Next Section
```

## Search Requirements

Search should work across the whole workspace.

Search results should identify:

- tab
- section
- matching text
- jump link

Example search:

```text
bath towels
```

Results may show:

- Dressing Rooms
- Hospitality
- Production Office
- Support Act Rider

User taps a result and jumps directly to the matching section.

## Print Requirements

The published viewer should support:

1. Print Current Section
2. Print Current Tab / Document
3. Print Full Workspace

The print button should use the device/system print function.

Users should not have to download the full PDF just to print one relevant part.

## Download / Export Requirements

Future options may include:

- download current section as PDF
- download current tab as PDF
- download full workspace as PDF
- export approved packet
- archive previous version

Download access should depend on permissions and published settings.

## Approval / Publishing Lifecycle

Document Workspaces should follow the Generated Outputs Standard.

Statuses:

- Draft
- Review
- Approved
- Published
- Archived

Rules:

- Draft content is not externally visible.
- Review content is internal only.
- Approved content is ready for publishing.
- Published content is external-facing based on permissions.
- Archived content is retained for history.

## Classification / Security Rules

Document Workspaces inherit classification from source data.

Rules:

- Most restrictive classification wins.
- Public links can only expose approved/published information.
- Internal notes should never appear in public output unless explicitly marked shareable.
- Sensitive data should not be included in public views unless intentionally approved.
- Published output must respect source visibility rules.

## Relationship To StageOne Core

Document Workspace should be treated as a StageOne Core object.

It should support:

- owner
- scope
- suite
- permissions
- classification
- notes
- notifications
- audit history
- attachments
- version history
- published output

It should not be built as a one-off Touring feature only.

Use cases include:

- Touring advance packets
- Awards production books
- Local production event packets
- Venue packets
- Promoter packets
- Travel packets
- Department packets

## Touring Use Case

A Touring Advance Packet may include:

- Site Co Advance Rider
- Site Co Office Rider
- Hospitality
- Truck Inventory Grid
- Runner Grid
- Bad Weather Protocols
- Venue Information
- Power Requirements
- Dressing Rooms
- Contacts
- Travel
- Support Acts
- Engineering Attachments

All sections collectively form one rider packet, but the viewer should keep them organized as separate navigable tabs.

## Product Philosophy

StageOne should not simply make PDFs.

StageOne should make operational information easier to consume.

Large packets should become navigable workspaces.

Core principle:

```text
Documents should have a home.
```

Users should be able to find what they need quickly, print what they need, and avoid scrolling through hundreds of unrelated pages.

Document Workspace is a core StageOne concept, not just a file viewer.
