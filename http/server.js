const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/txt') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      })

      req.on('end', () => {

        fs.writeFile(path.join(__dirname, 'file1.txt'), data, (err) => {
          if (err) {
            console.error(err)
            res.statusCode = 500
            res.end('Error writing to file')
          } else {
            res.statusCode = 200
            res.end('File saved successfully')
          }
        });
      })

    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
    }
  });
  
  server.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  