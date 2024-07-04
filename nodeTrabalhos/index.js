const http = require('http');
const fs = require("fs");
const createLink = require('./link_helper');

const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 8080;

let valores = [];

process.argv.forEach((val, index) => {
    if (index > 1) {
        valores.push(val);
    }
});

let arquivos_nomes = [];

fs.readdir(valores[0], (err, arquivos) => {
    if (err) throw err;
    
    arquivos_nomes = arquivos; 
    arquivos.forEach((arquivo) => {
        console.log(arquivo);
    });

    const server = http.createServer((req, res) => {
        const { url } = req;

        if (url === '/') {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(createLink(arquivos_nomes)); 
            res.end();
        } else {
            const fileName = url.slice(1); 
            const filePath = `${valores[0]}/${fileName}`;

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write("<h1>Arquivo não encontrado</h1>");
                    res.end();
                } else {
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(`<pre>${data}</pre>`);
                    res.write('<br><a href="/">Voltar</a>'); 
                    res.end();
                }
            });
        }
    });

    server.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log('I love Minecraft');
    });
});

console.log(arquivos_nomes);
