const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode:'development',
    devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8082,
        overlay: {
            warnings: true,
            errors:true
        }
    },
    plugins: [
        
    ]
})

module.exports = new Promise((resolve, reject)=> {
    resolve(devWebpackConfig)
})