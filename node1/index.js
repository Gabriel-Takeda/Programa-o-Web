const fs = require('fs');

async function getFilesList() {
  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(__dirname, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
    return files.join(', ');
  } catch (err) {
    console.error(err);
    return '';
  }
}

const http = require('http');

let filesTODOS;

getFilesList().then(files => {
  const server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write(`Arquivos no diretório: ${files}`);
    res.end();
  });

  server.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
  });
}).catch(console.error);
