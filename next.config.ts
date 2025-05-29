import path from 'path';

const nextConfig = {
  allowedDevOrigins: [
    'scinet-dev.hyper-data.ai',
    '*.hyper-data.ai',
  ],
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Additional Turbopack configurations can be added here
  },
  experimental: {
    serverActions: {
      enabled: true,
    },
    reactCompiler: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
