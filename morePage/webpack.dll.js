const webpack = require('webpack');

const path = require('path')


//打包优化 
/*
    1， 减少嵌套深度
    2/ 使用尽可能少的处理

    webpack 层面

    1/ dll 
    2/ 通过 include 减少 loader 范围
    3/ HappyPack
    4 / Uglify 优化
    5/  减少 resolve sourcemap cache-loader, 用新版的 node 和 webpack

*/
module.exports = {
    entry: {
        vendor: [
            'jquery',
            'lodash',
        ]
    },
    output: {
        path: __dirname + '/src/dll',
        filename: '[name].js',
        // 引用名 要和后面的一致；
        library: '[name]_library',
    },
    plugins: [
        // 生成一个json 文件 告诉 webpack 那些依赖库不用处理了
        // 这个 json 文件 在 打包文件里引入 DllReferencePlugin
        new webpack.DllPlugin({
            // context: __dirname,
            path: path.join(__dirname, './src/dll', '[name].json'),
            format: true,
            // 要和 输出的引用名一致 否则报错
            name: '[name]_library',
        })
    ]
}