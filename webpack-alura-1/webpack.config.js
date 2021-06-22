const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // importando o plugin de compactação de html para as configurações do webpack

module.exports = {
    entry: './app/src/js/app.js', //ponto de entrada onde será analisado o código a ser compactado
    output: {
        filename: 'bundle.js', // compacta o arquivo da entry em bundle.js
        path: path.resolve(__dirname, 'app/dist'), // salva o arquivo compactado em uma pasta seguindo o path absoluto concatenado e resolvido pelo require
        clean: true // apaga a pasta dist e os arquivos toda vez que for feita uma nova build
    },
    plugins: [new HtmlWebpackPlugin({
        template: './app/src/app.html',
        filename: 'app.html',
        hash: true // gerar um hash no arquivo bundle.js usado para não conflitar o js quando o mesmo fica armazenado no cache
    })] // instanciando a classe onde o plugin foi importado para gerar o html com o bundle.js referenciado

};