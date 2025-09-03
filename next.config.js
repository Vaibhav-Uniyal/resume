/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  },
  webpack: (config, { isServer }) => {
    // Add a fallback for node-specific modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        canvas: false,
        crypto: false,
        os: false,
        util: false,
        buffer: false,
        process: false,
        assert: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
        querystring: false,
        net: false,
        tls: false,
        child_process: false
      };
    }
    
    // Exclude binary modules from being processed by webpack
    config.module.noParse = [/pdf.worker.min.js$/];
    
    // Rules to handle binary files
    config.module.rules.push(
      {
        test: /\.node$/,
        use: 'null-loader',
      },
      {
        test: /node_modules[/\\]canvas[/\\].*?\.node$/,
        use: 'null-loader',
      }
    );
    
    return config;
  }
}

module.exports = nextConfig 