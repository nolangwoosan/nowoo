/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'maplestory.io',
      },
      {
        protocol: 'https',
        hostname: 'maplestory.io',
      },
      {
        protocol: 'https',
        hostname: 'vcsbnusyecxmogxxeoww.supabase.co',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
