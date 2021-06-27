const path = require('path');
// importando o plugin de compactação de html para as configurações do webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// importando plugin para criar um arquivo de main.css fora do bundle.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// plugin para minimizar os arquivos css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// plugin para concatenar os arquivos
const webpack = require('webpack');

module.exports = {
    //ponto de entrada onde será analisado o código a ser compactado
    entry: './app/src/js/app.js', 
    output: {
        // compacta o arquivo da entry em bundle.js
        filename: 'bundle.js', 
        // salva o arquivo compactado em uma pasta seguindo o path absoluto concatenado e resolvido pelo require
        path: path.resolve(__dirname, 'app/dist'), 
        // apaga a pasta dist e os arquivos toda vez que for feita uma nova build
        clean: true
    },
    // utiliza o modulo css-loader para compilar arquivos que terminam com .css importados no app.js no bundle.js
    module: {
        rules: [
            { test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,'css-loader'] }
        ]
    },
    // aplica as minificações que nos definimos e remove as minificações padrões do webpack
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            // mantem o comportamento de minificar os arquivos padrão do webpack pois ao adicionar uma tag optimize ele para de aplicar essas minificações por padrão
            '...'
        ]
    },
    // instanciando a classe onde o plugin foi importado para gerar o html com o bundle.js referenciado
    plugins: [new HtmlWebpackPlugin({
            template: './app/src/index.html',
            filename: 'index.html',
            // gerar um hash no arquivo bundle.js usado para não conflitar o js quando o mesmo fica armazenado no cache
            hash: true 
        }),
        // plugin cria um arquivo de css separado do bundle.js na pasta dist
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        // concatena os arquivos
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    // utilizando o servidor de desenvolvimento do webpack
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000
    }
};