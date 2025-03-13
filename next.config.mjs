import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Add runtime caching for video sources
  runtimeCaching: [
    {
      urlPattern: ({ url }) => {
        const videoHosts = [
          'vidlink.pro',
          'player.autoembed.cc',
          '2embed.cc',
          'multiembed.mov',
          '2embed.org',
          'autoembed.co',
          'vidsrc.xyz',
          'moviesapi.club',
          'nontongo.win',
          '111movies.com',
          'flicky.host',
          'vidjoy.pro',
          'embed.su',
          'primewire.tf',
          'smashystream.com',
          'vidstream.site'
        ];
        return videoHosts.some(host => url.hostname.includes(host));
      },
      handler: 'CacheFirst',
      options: {
        cacheName: 'video-embeds-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    }
  ]
})(nextConfig)

