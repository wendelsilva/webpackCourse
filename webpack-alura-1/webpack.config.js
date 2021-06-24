const path = require('path');
// importando o plugin de compactação de html para as configurações do webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

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
            { test: /\.css$/, use: ['style-loader','css-loader'] }
        ]
    },
    // instanciando a classe onde o plugin foi importado para gerar o html com o bundle.js referenciado
    plugins: [new HtmlWebpackPlugin({
        template: './app/src/app.html',
        filename: 'app.html',
        // gerar um hash no arquivo bundle.js usado para não conflitar o js quando o mesmo fica armazenado no cache
        hash: true 
    })] 

};