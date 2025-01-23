/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_S3_BUCKET_URL,
         },
      ],
   },
   webpack: (config) => {
      config.resolve.fallback = { fs: false };

      return config;
   },
};

export default nextConfig;
