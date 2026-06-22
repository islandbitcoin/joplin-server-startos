import { sdk } from './sdk'
import { port } from './utils'
import { i18n } from './i18n'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Joplin Server!'))

  const mountpoint = '/home/joplin/data'

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'joplinserver' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint,
        readonly: false,
      }),
      'joplin-server-sub',
    ),
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        APP_BASE_URL: `http://localhost:${port}`,
        APP_PORT: String(port),
        DB_CLIENT: 'sqlite3',
        SQLITE_DATABASE: `${mountpoint}/joplin.sqlite`,
        STORAGE_DRIVER: `Type=Filesystem; Path=${mountpoint}/items`,
        NODE_ENV: 'production',
        MAX_TIME_DRIFT: '0',
      },
    },
    ready: {
      display: i18n('primary daemon'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, port, {
          successMessage: i18n('The server is ready'),
          errorMessage: i18n('The server is not ready'),
        }),
    },
    requires: [],
  })
})
