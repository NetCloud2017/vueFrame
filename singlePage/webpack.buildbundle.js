
const HappyPack = require('happypack')

const os = require('os')
// 创建线程池
const happyThreadPool = HappyPack.ThreadPool({size:os.cpus().length})

const webpack = require('webpack');
const path = require('path');   

const htmlWebpackPlugin =  require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
    console.log(env, 'eeee');
    
    const commonConfig = {
         
        entry: {
            app: './index.js',
            app2: './index2.js',
        },
        output: {
            path: __dirname + '/dist', // 想将大包的文件存放到哪里
            filename: './js/[name].[chunkhash:4].js',
        },
        module: {
            rules: [
                {
                    test:/\.js$/,
                    use: {
                        loader: 'happypack/loader?id=happybabel',
                    }
                },
                
            ]
        },
        optimization: {
            splitChunks: {
                name: true,  
                chunks: 'initial', 
                minSize: 0, // 默认是 5kb 以上才的包才打包成公共的；
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minChunks: 2
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        priority: -10
                    }
                }
            },
            runtimeChunk: {
                name: 'runtime', 
            }
        },
        plugins: [
            new webpack.NamedChunksPlugin(),
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin(),
            new HappyPack({
                id: 'happybabel',
                loaders: [
                    {
                        path: 'babel-loader',
                        cache: true, // 允许线程处理缓存
                    }
                ],
                threadPool: happyThreadPool,
            }),
            new webpack.DllReferencePlugin({
                // context: __dirname,
                manifest: require('./src/dll/vendor.json')
            }),
            new htmlWebpackPlugin({
                vendorPath: '../src/dll/vendor.js',  // 这个路径是相对dist 里面的html 的 路径
                template: './index.html', // 以哪个为模板
                filename: 'index.html',
                chunks: ['app', 'runtime'], //  多入口多页面时 可以指定
            }),
            new htmlWebpackPlugin({
                vendorPath: '../src/dll/vendor.js',  // 这个路径是相对dist 里面的html 的 路径
                template: './index.html',
                filename: 'index2.html',
                chunks: ['app2','runtime'],
                // templateContent: ({htmlWebpackPlugin}) => {
                //     console.log(htmlWebpackPlugin);
                //     return `
                //     <html>
                //     <head>
                //       ${htmlWebpackPlugin.tags.headTags}
                //     </head>
                //     <body>
                //       <h1>Hello World</h1>
                //       ${htmlWebpackPlugin.tags.bodyTags}
                //       <script src="${htmlWebpackPlugin.options.vendorPath}"></script>
                //     </body>
                //   </html>
                //     `
                // }
              
            }),
            
            
        ]
    }

    return commonConfig;
}
 