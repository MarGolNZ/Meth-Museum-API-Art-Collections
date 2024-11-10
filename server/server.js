const path = require('path')
const express = require('express')
const { departmentsRouter, objectsRouter } = require('./routes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/departments', departmentsRouter)
server.use('/api/v1/objects', objectsRouter)

module.exports = server
