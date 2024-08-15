/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
        missingSuspenseWithCSRBailout: false,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '', // Leave this empty if no specific port is require  
              pathname: '/**', // Allow all paths
            },
          ],
    },      
    // webpack(config){
    //     config.experiments ={
    //         ...config.experiments,
    //         topLevelAwait: true,
    //     }
    //     return config
    // }
};

export default nextConfig;

