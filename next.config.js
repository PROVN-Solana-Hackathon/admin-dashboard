/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'dev.updg8.com',
            },
          ],
        },
      
}

module.exports = nextConfig

