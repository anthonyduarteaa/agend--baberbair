var http = require('http');
var fs   = require('fs');
var path = require('path');

var PORTA = 3000;

var TIPOS = {
  '.html':  'text/html; charset=utf-8',
  '.css' :  'text/css; charset=utf-8',
  '.js'  :  'text/javascript; charset=utf-8',
  '.svg' :  'image/svg+xml',
  '.png' :  'image/png',
  '.jpg' :  'image/jpeg',
  '.jpeg':  'image/jpeg',
  '.webp':  'image/webp',
  '.ico' :  'image/x-icon',
  '.woff2': 'font/woff2'
};

var ROTAS = {
  '/':      '/public/index.html',
  '/sobre': '/public/sobre.html'
};

var servidor = http.createServer(function (req, res) {

  var rota = req.url.split('?')[0];

  if (ROTAS[rota]) {
    rota = ROTAS[rota];
  }

  var arquivo = path.join(__dirname, rota);
  var ext = path.extname(arquivo).toLowerCase();

  fs.readFile(arquivo, function (erro, dados) {
    if (erro) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>Não achei: ' + rota + '</p>');
      return;
    }

    res.writeHead(200, { 'Content-Type': TIPOS[ext] || 'application/octet-stream' });
    res.end(dados);
  });
});

servidor.listen(PORTA, function () {
  console.log('Ligado em http://localhost:' + PORTA);
});