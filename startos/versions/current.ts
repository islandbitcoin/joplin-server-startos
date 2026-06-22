import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.7.1:0',
  releaseNotes: {
    en_US: `**Bumps**

- Joplin Server → 3.7.1

**Internal**

- start-sdk → 1.5.3`,
    es_ES: `**Actualizaciones**

- Joplin Server → 3.7.1

**Interno**

- start-sdk → 1.5.3`,
    de_DE: `**Aktualisierungen**

- Joplin Server → 3.7.1

**Intern**

- start-sdk → 1.5.3`,
    pl_PL: `**Aktualizacje**

- Joplin Server → 3.7.1

**Wewnętrzne**

- start-sdk → 1.5.3`,
    fr_FR: `**Mises à jour**

- Joplin Server → 3.7.1

**Interne**

- start-sdk → 1.5.3`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
