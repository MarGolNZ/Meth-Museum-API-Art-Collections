const express = require('express')
const request = require('superagent')
const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 3600 })

const departmentsRouter = express.Router()
departmentsRouter.get('/', async (req, res) => {
  const cachedData = cache.get('departments')
  if (cachedData) {
    return res.json(cachedData)
  }

  try {
    const response = await request.get('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    cache.set('departments', response.body)
    res.json(response.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const objectsRouter = express.Router()

objectsRouter.get('/', async (req, res) => {
  const { departmentIds = 1 } = req.query
  const cacheKey = `objects-${departmentIds}`
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    return res.json(cachedData)
  }

  try {
    const response = await request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentIds}`)
    cache.set(cacheKey, response.body)
    res.json(response.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

objectsRouter.get('/search', async (req, res) => {
  const { depId, q = 'painting' } = req.query
  const cacheKey = `search-${depId}-${q}`
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    return res.json(cachedData)
  }

  try {
    const response = await request.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}&departmentId=${depId}`)
    cache.set(cacheKey, response.body)
    res.json(response.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = {
  departmentsRouter,
  objectsRouter
}
