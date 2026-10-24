<p align="center">
  <img src="icon.svg" alt="Joplin Server Logo" width="21%">
</p>

# Joplin Server on StartOS

> **Upstream docs:** <https://github.com/laurent22/joplin/tree/dev/packages/server>
>
> Everything not listed in this document should behave the same as upstream
> Joplin Server. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Joplin Server](https://github.com/laurent22/joplin) is the self-hosted sync
server and administration interface for Joplin desktop and mobile clients.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `joplin/server:3.7.1` (upstream unmodified) |
| Architectures | x86_64, aarch64 |
| Entrypoint | Default upstream entrypoint |

Joplin Server starts directly from the upstream image entrypoint. No ownership
fixup oneshot is used.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/home/joplin` | SQLite database, item storage, and server data |

The package pins SQLite explicitly with
`SQLITE_DATABASE=/home/joplin/joplin.sqlite` and stores note item payloads on
the filesystem at `/home/joplin/items`.

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Run Docker or Docker Compose | Install from marketplace or sideload `.s9pk` |
| First start | Run `joplin/server` with environment variables | Automatic via StartOS |
| Admin account | Default `admin@localhost` / `admin` | Same upstream default |

After first launch, open the **Joplin Server API** interface and sign in with
the upstream default admin credentials. Change the admin password immediately,
then create non-admin users for sync.

---

## Configuration Management

This package configures Joplin Server with these environment variables:

| Variable | Value |
|----------|-------|
| `APP_BASE_URL` | `http://localhost:22300` |
| `APP_PORT` | `22300` |
| `DB_CLIENT` | `sqlite3` |
| `SQLITE_DATABASE` | `/home/joplin/joplin.sqlite` |
| `STORAGE_DRIVER` | `Type=Filesystem; Path=/home/joplin/items` |
| `NODE_ENV` | `production` |

No user-configurable StartOS actions are currently exposed. PostgreSQL and S3
storage are not wired into this package yet.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Type | Description |
|-----------|------|----------|------|-------------|
| Joplin Server API | 22300 | HTTP | api | Admin UI and Joplin sync API |

Joplin clients should use the exported interface URL as their sync target and
authenticate with the user credentials created in the admin UI.

---

## Actions (StartOS UI)

None. Administration is handled in the Joplin Server web interface.

---

## Backups and Restore

**Included in backup:**

- `main` volume: SQLite database, item storage, users, notes, sync state, and
  server data

**Restore behavior:**

- All data is restored from the `main` volume
- No reconfiguration is needed for the default SQLite setup

---

## Health Checks

| Check | Display | Method | Messages |
|-------|---------|--------|----------|
| Primary daemon | "primary daemon" | Port listening (22300) | "The server is ready" / "The server is not ready" |

---

## Dependencies

None. This package uses SQLite by default and does not require PostgreSQL or
another StartOS service.

---

## Limitations and Differences

1. **SQLite-first**: suitable for simple self-hosted setups; PostgreSQL is not
   exposed as a package dependency or configuration option yet.
2. **Static app base URL**: `APP_BASE_URL` is set to `http://localhost:22300`
   because StartOS interface URLs are assigned by the platform.
3. **No email setup**: SMTP variables are not configured by default.
4. **No Transcribe service**: this package runs only Joplin Server.

---

## What Is Unchanged from Upstream

- Joplin Server admin UI
- Sync API for Joplin clients
- Default admin user behavior
- User and team management
- Filesystem item storage support

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development
workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: joplin-server
image: joplin/server:3.7.1
architectures:
  - x86_64
  - aarch64
volumes:
  main: /home/joplin
ports:
  api: 22300
dependencies: none
startos_managed_env_vars:
  APP_BASE_URL: http://localhost:22300
  APP_PORT: "22300"
  DB_CLIENT: sqlite3
  SQLITE_DATABASE: /home/joplin/joplin.sqlite
  STORAGE_DRIVER: "Type=Filesystem; Path=/home/joplin/items"
  NODE_ENV: production
actions: none
```
