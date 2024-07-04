const http = require('http');
const fs = require("fs");

let valores = [];

process.argv.forEach((val, index) => {
    if (index > 1) {
        valores.push(val);
    }
});

let arquivos_nomes = '';

fs.readdir(valores[0], (err, arquivos) => {
    if (err) throw err;
    
    arquivos.forEach((arquivo) => {
        arquivos_nomes += arquivo + '\n'; // Concatena cada nome de arquivo com uma quebra de linha
        console.log(arquivo);
    });

    // Após preencher arquivos_nomes, podemos iniciar o servidor HTTP aqui dentro do callback
    const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.write(arquivos_nomes); // Escreve os nomes dos arquivos na resposta HTTP
        res.end();
    });

    server.listen(3333)
});

// Este console.log será executado antes de arquivos_nomes ser preenchido completamente
console.log(arquivos_nomes);
