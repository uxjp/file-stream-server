const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        const buffer = Buffer.from(data, 'binary');
        fs.writeFile('file.bin', buffer, (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('File saved');
          }
        });
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
    }
  });
  
  server.listen(3000, () => {
    console.log('Server started on port 3000 >>');
  });
  