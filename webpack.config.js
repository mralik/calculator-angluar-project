const ngToolsWebpack = require('@ngtools/webpack'),
      webpack = require('webpack'),
      path = require('path');

var aotPlugin = new ngToolsWebpack.AotPlugin({
    tsConfigPath: "./tsconfig.aot.json",
    entryModule: path.resolve(__dirname, "./src/app/app.module#AppModule"),
});

aotPlugin._compilerHost._resolve = function(path_to_resolve) {
    path_1 = require("path");
    path_to_resolve = aotPlugin._compilerHost._normalizePath(path_to_resolve);
    if (path_to_resolve[0] == '.') {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost.getCurrentDirectory(), path_to_resolve));
    }
    else if (path_to_resolve[0] == '/' || path_to_resolve.match(/^\w:\//)) {
        return path_to_resolve;
    }
    else {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost._basePath, path_to_resolve));
    }
};

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: './src/app/main.aot.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        publicPath: 'src/dist/',
        filename: 'app.main.js'
    },
    plugins: [
        // new ngToolsWebpack.AotPlugin({
        //     mainPath: "src/app/main.ts",
        //     tsConfigPath: './tsconfig.aot.json'
        // }),
        aotPlugin,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.ts$/, loader: '@ngtools/webpack'}
        ]
    },
    // devServer: {
    //     historyApiFallback: true
    // }
};

