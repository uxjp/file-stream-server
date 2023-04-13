const contentDisposition = require('content-disposition')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.post('/upload', (req, res) => {
  if (req.headers['content-type'] === 'application/octet-stream') {
    let data = []
    const filename = getFilename(req)

    req.on('data', (chunk) => {
      data.push(chunk)
    })

    req.on('end', () => {
      fs.writeFile(path.join(__dirname, filename), Buffer.concat(data), (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error saving file')
        } else {
          console.log('File saved')
          res.end(`File ${filename} saved.`)
        }
      })
    })
  } else {
    res.status(400).end('Bad Request')
  }
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

function getFilename(req) {
  const dispositionHeader = req.headers['content-disposition']
  const disposition = contentDisposition.parse(dispositionHeader)

  return disposition.parameters.filename
}