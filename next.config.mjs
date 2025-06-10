/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg', 'res.cloudinary.com', 'img.youtube.com'],
    unoptimized: true,
  },
  experimental: {
    // Fix: Changed from boolean to object
    serverActions: {
      allowedOrigins: ['localhost:3000', 'webitya.in', '*.webitya.in', 'webitya.vercel.app'],
    },
  },
  webpack: (config, { isServer }) => {
    // Exclude winston from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      }
    }
    return config
  },
}

export default nextConfig
