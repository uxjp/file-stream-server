const http = require('http');

const data = new Uint8Array([1, 2, 3, 4, 5]);
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.on('error', (err) => {
  console.error(err);
});

req.write(Buffer.from(data));
req.end();
