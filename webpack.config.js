var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
var path = require('path');

const plugins = [
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        _: 'underscore',
    }),
];

if (PROD) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    )
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    )
}

module.exports = {
    entry: ["./src/client"],
    output: {
        path: path.resolve(__dirname,"./build"),
        filename: PROD ? 'bundle.min.js' : 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.scss', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: require.resolve('url-loader')
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: require.resolve('file-loader')
            },
            {
                test: /\.json$/,
                loader: require.resolve('json-loader')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.s(c|a)ss$/,
                loaders: [
                    {
                        loader: "style-loader", 
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "sass-loader",
                    }, 
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                query: { presets: ['es2015'] }
            }
        ]
    },
    plugins
}
