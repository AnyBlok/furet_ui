var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

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
}

module.exports = {
    entry: ['bootstrap-loader', "./src/client"],
    output: {
        path: "./build",
        filename: PROD ? 'bundle.min.js' : 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.jsx', '.scss', '.js', '.json']
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
                test: /(\.global\.css$|react-select.css)/,
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
                test: /^((?!\.global|react-select).)*\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                ],
            },
            { 
                test: /(\.js|\.jsx)$/, 
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                query: { presets: ['es2015', 'react'] }
            }
        ]
    },
    plugins
}
