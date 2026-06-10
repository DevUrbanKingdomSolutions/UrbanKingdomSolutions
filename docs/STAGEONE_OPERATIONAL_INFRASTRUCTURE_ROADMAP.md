# StageOne Strategic Roadmap: Operational Infrastructure & Device Ecosystem

## Status

Strategic Direction Approved / Implementation Deferred

## Purpose

This document provides long-term architectural guidance for StageOne development.

No immediate build work is required.

Future StageOne architecture should preserve space for operational infrastructure management, including devices, credentials, workstations, security access points, rental technology, and production office equipment.

## Core Direction

StageOne should not be viewed only as a production management app.

StageOne should be planned as a future operational platform capable of supporting:

- people
- credentials
- access levels
- workstations
- printers
- scanners
- mobile devices
- check-in stations
- security access points
- production office infrastructure
- temporary event technology
- rental equipment

The goal is not to become a traditional IT management platform.

The goal is to make production technology part of the operational ecosystem.

## Key Principle

```text
Infrastructure participates in operations.
```

StageOne should eventually understand not only who is working and what needs to happen, but also what devices, tools, access points, and workstations support the operation.

## Future Capability Areas

### 1. Device Registry

Reserve architectural space for a future Device Registry.

Potential fields:

- Device ID
- Device Name
- Device Type
- Device Role
- Serial Number
- Asset Number
- Assigned Department
- Assigned User
- Assigned Venue
- Assigned Tour
- Assigned Event
- Device Status
- Device Location
- Last Activity Date
- Check-In Status
- Check-Out Status
- Rental Information
- Vendor Information
- Return Condition

### 2. Workstation Profiles

StageOne may eventually support different workstation types:

- Production Office Workstation
- Credential Office Workstation
- Tour Office Workstation
- Venue Management Workstation
- Security Checkpoint Workstation
- Runner / Field Device
- Mobile Production Tablet
- Executive CityHall Workstation

Each workstation may show a different interface depending on its operational role.

### 3. Credential Operations Network

Credentialing should not be treated only as badge printing.

Future planning should support the full credential lifecycle:

- credential creation
- badge printing
- reprints
- check-in terminals
- registration stations
- credential inventory
- access verification
- zone validation
- access denial logging
- security checkpoint monitoring
- mobile credential scanning

Credential operations should be planned as an operational network.

### 4. Apple Device / Managed Workstation Strategy

Future StageOne and CityHall deployments may use Apple hardware as dedicated operational workstations.

Potential device types:

- iPads
- Mac Minis
- MacBooks
- kiosk stations
- credential check-in stations
- security scanning stations

Strategic idea:

```text
The hardware remains an Apple device.
The user experience becomes StageOne or CityHall.
```

This allows production teams to deploy purpose-built workstations without eliminating normal OS capability when needed.

### 5. Rental & Event Technology Management

StageOne should eventually support rented event technology tracking.

Examples:

- laptops
- printers
- badge printers
- tablets
- scanners
- mobile hotspots
- network equipment

Future tracking should include:

- vendor
- rental dates
- return dates
- assigned user
- assigned department
- assigned venue
- operational status
- damage notes
- return verification

## Architectural Guidance

Do not build this immediately.

Do not overcomplicate current development.

Avoid architecture that would block future support for:

- Device Registry
- Workstation Profiles
- Credential Access Stations
- Security Checkpoint Systems
- Rental Asset Tracking
- Managed Apple Device Deployments
- Event Technology Management

Areas that should remain flexible:

- database models
- permissions
- profiles
- asset relationships
- credential records
- event assignments
- venue assignments
- role-based interfaces
- audit logging

## Registry Recommendation

Add future roadmap item:

Title:

```text
Operational Infrastructure & Device Ecosystem
```

Status:

```text
Strategic Direction Approved / Implementation Deferred
```

Summary:

StageOne should preserve architectural support for devices, workstations, credentials, access points, rental technology, and production infrastructure.

Impact:

Future StageOne planning should account for operational infrastructure as part of the production ecosystem, not as disconnected equipment.

## Final Codex Note

This is roadmap guidance, not a current sprint requirement.

The current priority remains core StageOne functionality.

Future planning should recognize that live events are operated by people using devices, credentials, access points, workstations, and temporary infrastructure.

StageOne should eventually connect those pieces.
