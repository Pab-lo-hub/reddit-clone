/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (nextConfig, { isServer }) => {
      if (!isServer) {
          // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
          config.resolve.fallback = {
              fs: false
          }
      }

      return nextConfig;
  }
}
