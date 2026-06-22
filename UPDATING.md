# Updating the upstream version

Joplin Server ships as a prebuilt Docker image. The package pulls that image
directly, so the only upstream pin to bump is the Docker image tag.

## Determining the upstream version

- **Joplin Server release** ([laurent22/joplin](https://github.com/laurent22/joplin)) — canonical version:

  ```
  gh release view -R laurent22/joplin --json tagName -q .tagName
  ```

  Release tags are prefixed with `v` (for example, `v3.7.1`); strip the `v`
  when comparing against the package version below.

- **`joplin/server` Docker image** ([Docker Hub](https://hub.docker.com/r/joplin/server/tags)) — confirms the corresponding image tag has been published:

  ```
  curl -fsSL "https://hub.docker.com/v2/repositories/joplin/server/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  The manifest pins `joplin/server:<version>` in
  `startos/manifest/index.ts`.

## Applying the bump

- **`startos/manifest/index.ts`** — update
  `images.joplinserver.source.dockerTag` from `joplin/server:<old>` to
  `joplin/server:<new>`.
- **`startos/versions/current.ts`** — update `version` and release notes.
- **`README.md` and `instructions.md`** — update user-visible version or
  behavior notes if the upstream release changes setup, defaults, ports, or
  storage.
