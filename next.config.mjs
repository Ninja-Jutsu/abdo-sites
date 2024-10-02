/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skqlmtegscpqbgdsrwop.supabase.co',
      },
    ],
  },
}

export default nextConfig
