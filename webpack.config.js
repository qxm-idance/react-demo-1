
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pkg = require('./package');
const validate = require('webpack-validator');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifyCSSPlugin = require('purifycss-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isBuild = ENV === 'build';
var isDev = ENV === 'dev';

const PATHS = {
    dev: path.resolve(__dirname, 'dev'),
    style: [
        path.resolve(__dirname, 'dev', 'balance.css')
    ],
    build: path.resolve(__dirname, 'build'),
    images: path.resolve(__dirname, 'img')
};

const common = {
    entry: {
        style: PATHS.style,
        app: PATHS.dev
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'demo',
        }),
        new webpack.DefinePlugin({
           __DEV__: isDev,
           __DEV_IP_ADDRESS__: '"' + ip()[0] + '"'
        })
    ]
}

var cfg;

switch(process.env.npm_lifecycle_event) {
    case 'build':
    cfg = merge(common, {
        devtool: 'source-map',
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash:8].js',
            // This is used for require.ensure. The setup
            // will work without but this is useful to set.
            chunkFilename: '[chunkhash:8].js'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                mangle: {
                    // Mangle matching properties
                    props: /matching_props/,
                    // Don't mangle these
                    except: ['Array', 'BigInteger', 'Boolean', 'Buffer']
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
            new cleanWebpackPlugin([PATHS.build], {
                //without `root` cleanWebpackPlugin won't point to our
                //project and will fail to work
                root: process.cwd()
            }),
            new extractTextPlugin('[name].[contenthash:8].css'),
            new purifyCSSPlugin({
                basePath: process.cwd(),
                paths: [PATHS.dev]
            })
        ],
        entry: {
            vendor: Object.keys(pkg.dependencies)
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: extractTextPlugin.extract('style', 'css')
                }
            ]
        }
    });
    break;
    default:
    cfg = merge(common, {
        devtool: 'eval-source-map',
        module: {
          loaders: [
            {
              test: /\.css$/,
              loaders: ['style', 'css'],
              include: PATHS.dev
            },{
              test: /\.(jpg|png)$/,
              loader: 'url?limit=25000',
              include: PATHS.images
            },{
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets: ['es2015','react']
              }
            }
          ]
        }
    });
}

module.exports = validate(cfg);
function ip() {
    var addresses = [],
        os = require('os'),
        interfaces = os.networkInterfaces();

    for (var ifaces in interfaces) {
        var iface = interfaces[ifaces].filter(function(detail) {
            return detail.family === 'IPv4' && detail.internal === false;
        });
        addresses = addresses.concat(iface);
    }

    return addresses.map(function(detail) {
        return detail.address;
    })
}
