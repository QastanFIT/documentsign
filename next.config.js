/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // if(isServer){
        //     config.externals = {
        //         'pkcs11js': 'commonjs pkcs11js'
        //     }
        //     config.module.rules.push({
        //         test: /\.node$/,
        //         loader: 'node-loader'
        //     });
        //     config.target = 'node';
        // }
        // else {
            config.resolve.alias.canvas = false;
            config.resolve.alias.encoding = false;
        //}
        
        return config;
    },
    experimental: { 
        //webpackBuildWorker:true 
    },
}

module.exports = nextConfig
