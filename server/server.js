const path = require('path')
const express = require('express')
const request = require('superagent')

const welcome = require('./routes/welcome')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)

// this is for CORS
// server.get('/public/collection/v1/objects', (req, res) => {
//     console.log(req.body)
//     request
//         .get('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//         .then(response => res.json(response.body))
//         .catch(e => console.log(e))
// })

module.exports = server
