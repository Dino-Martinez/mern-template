// Requirements
const express = require('express')
const helmet = require('helmet') // Security and HTTP header middleware
const cors = require('cors') // Handling CORS for accessible APIs
const morgan = require('morgan') // Request logging
const compression = require('compression') // GZIP middleware for compressing responses
const path = require('path')
require('./utils/dbConnection').config()
require('dotenv').config()

// App
const routes = express()
const api = express()

// Have Node serve the files for our built React app
api.use(express.static(path.resolve(__dirname, '../client/build')))

// Middleware
api.use(morgan('common'))
api.use(helmet())
api.use(cors())
api.use(express.urlencoded({ extended: true })) // Handling form data
api.use(express.json()) // Handling JSON data
api.use(compression())

// Routes - if you add new files, don't forget to require them here
require('./routes/index.js')(routes)

// Prepend /api to all routes
api.use('/api', routes)

// Route all other endpoints to our frontend
api.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Export App for server/testing
module.exports = api
