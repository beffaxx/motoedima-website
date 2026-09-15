/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/servizi',
        destination: '/',
      },
      {
        source: '/recensioni',
        destination: '/',
      },
      {
        source: '/approfondimenti',
        destination: '/',
      },
      {
        source: '/contatti',
        destination: '/',
      },
    ]
  },
}

export default nextConfig