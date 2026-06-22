# Joplin Server

Joplin Server provides the web administration interface and sync API for your
Joplin desktop and mobile apps.

## Documentation

- [Joplin Server docs](https://github.com/laurent22/joplin/tree/dev/packages/server) — upstream installation and operating notes.
- [Joplin sync docs](https://joplinapp.org/help/apps/sync/joplin_server/) — configuring Joplin clients to use Joplin Server.

## What you get on StartOS

- A **Joplin Server API** interface on port 22300 — the web admin UI and the sync endpoint used by Joplin clients.
- SQLite storage by default, persisted in the `main` volume at `/home/joplin`.
- Filesystem item storage at `/home/joplin/items`, also persisted in the `main` volume.

## Getting set up

1. Start the service.
2. Open the **Joplin Server API** interface.
3. Sign in with the upstream default administrator account:
   - Email: `admin@localhost`
   - Password: `admin`
4. Change the administrator password immediately from the profile menu.
5. Create a separate user account for note synchronization.

## Connecting Joplin clients

In each Joplin desktop or mobile client:

1. Open the synchronization settings.
2. Choose **Joplin Server** as the sync target.
3. Paste the **Joplin Server API** interface URL from StartOS.
4. Enter the email and password for the non-admin user you created.
5. Run synchronization.

## Backups

StartOS backups include the full `main` volume: the SQLite database, user
accounts, sync state, and note item storage. Keep backups current before
upgrading or making major account changes.
