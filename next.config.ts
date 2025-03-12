import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/', // Match the root URL
        destination: '/xp', // Redirect to the desired path
        permanent: false, // Use `true` for 308 (permanent) or `false` for 307 (temporary)
      },
    ]
  },
}

export default nextConfig
