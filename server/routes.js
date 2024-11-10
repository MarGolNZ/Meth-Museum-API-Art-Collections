const express = require('express')
const request = require('superagent')
const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 3600 })

const departmentsRouter = express.Router()

// Fetch departments
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

// Fetch objects by department ID
objectsRouter.get('/', async (req, res) => {
  const { departmentIds = 1, page = 1, pageSize = 10 } = req.query
  const cacheKey = `objects-${departmentIds}`

  let cachedData = cache.get(cacheKey)

  // Fetch objects if not cached
  if (!cachedData) {
    try {
      const response = await request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentIds}`)
      cachedData = response.body.objectIDs || []
      cache.set(cacheKey, cachedData)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
  const totalItems = cachedData.length
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + parseInt(pageSize), totalItems)
  const paginatedItems = cachedData.slice(startIndex, endIndex)

  res.json({
    totalItems,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    totalPages: Math.ceil(totalItems / pageSize),
    items: paginatedItems,
  })
})

// Search objects by department and query
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

// Fetch details for a specific object by objectID
objectsRouter.get('/:objectID', async (req, res) => {
  const { objectID } = req.params
  const cacheKey = `object-${objectID}`
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    return res.json(cachedData)
  }

  try {
    const response = await request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
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
