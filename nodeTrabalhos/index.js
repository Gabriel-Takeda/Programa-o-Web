const http = require('http');
const fs = require("fs");
require('dotenv').config();

const PORT = process.env.PORT ?? 8080

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
        arquivos_nomes += arquivo + '\n'; 
        console.log(arquivo);
    });

    
    const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.write(arquivos_nomes); 
        res.end();
    });

    server.listen(PORT)
    console.log('i love minecraft')
});

console.log(arquivos_nomes);
