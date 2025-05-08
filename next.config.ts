const nextConfig = {
  allowedDevOrigins: [
    'scinet-dev.hyper-data.ai',
    '*.hyper-data.ai',
  ],
  experimental: {
    serverActions: {
      enabled: true, // Properly enable server actions as an object
    },
    reactCompiler: false, // Disable React Compiler to avoid Babel conflicts
  },
  reactStrictMode: true, // Keep strict mode enabled for better error handling
};

export default nextConfig;