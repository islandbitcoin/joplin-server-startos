import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'joplin-server',
  title: 'Joplin Server',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/islandbitcoin/joplin-server-startos',
  upstreamRepo: 'https://github.com/laurent22/joplin',
  marketingUrl: 'https://joplinapp.org',
  donationUrl: null,
  description: i18n.description,
  volumes: ['main'],
  images: {
    joplinserver: {
      source: { dockerTag: 'joplin/server:3.7.1' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
