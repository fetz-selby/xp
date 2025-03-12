import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_URL}`, // Match the root URL
        destination: `${process.env.NEXT_PUBLIC_API_URL}/xp`, // Redirect to the desired path
        permanent: false, // Use `true` for 308 (permanent) or `false` for 307 (temporary)
      },
    ]
  },
}

export default nextConfig
