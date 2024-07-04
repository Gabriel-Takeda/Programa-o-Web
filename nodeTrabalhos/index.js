const http = require('http');
const fs = require("fs");
const createLink = require('./link_helper');

const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 8080;

let valores = [];

// Coleta dos argumentos da linha de comando
process.argv.forEach((val, index) => {
    if (index > 1) {
        valores.push(val);
    }
});

let arquivos_nomes = [];

// Leitura do diretório passado como argumento
fs.readdir(valores[0], (err, arquivos) => {
    if (err) throw err;
    
    arquivos_nomes = arquivos; // Mantém arquivos_nomes como um array
    arquivos.forEach((arquivo) => {
        console.log(arquivo);
    });

    // Criação do servidor HTTP após a leitura dos arquivos
    const server = http.createServer((req, res) => {
        const { url } = req;

        if (url === '/') {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(createLink(arquivos_nomes)); // Passa o array para createLink
            res.end();
        } else {
            const fileName = url.slice(1); // Remove a barra inicial
            const filePath = `${valores[0]}/${fileName}`;

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                    res.write("<h1>Arquivo não encontrado</h1>");
                    res.end();
                } else {
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    res.write(`<pre>${data}</pre>`);
                    res.write('<br><a href="/">Voltar</a>'); // Link para voltar
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
