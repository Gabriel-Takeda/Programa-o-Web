require('dotenv').config();
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

// Função para listar arquivos e subdiretórios
function listDirectoryContents(dirPath, callback) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return callback(err);
        }
        const result = files.map(file => {
            const filePath = path.join(dirPath, file.name);
            return file.isDirectory() ? `${file.name}/` : file.name;
        });
        callback(null, result);
    });
}

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const dirPath = query.dir || '.';

    listDirectoryContents(dirPath, (err, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error reading directory: ${err.message}`);
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>');
        res.write(`<h1>Contents of ${dirPath}</h1>`);
        res.write('<ul>');
        files.forEach(file => {
            const fileName = path.basename(file);
            res.write(`<li><a href="?dir=${path.join(dirPath, fileName)}">${fileName}</a></li>`);
        });
        res.write('</ul>');
        res.write('</body></html>');
        res.end();
    });
}).listen(PORT);
