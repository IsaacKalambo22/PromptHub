/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '', // Leave this empty if no specific port is required
              pathname: '/**', // Allow all paths
            },
          ],
    },      
    webpack(config){
        config.experiments ={
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
};

export default nextConfig;
