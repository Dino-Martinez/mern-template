const mongoose = require('mongoose')

const config = () => {
  const mongoDB = process.env.Mongo_URI
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  db.once('open', () => {
    console.log('Connected to DB')
  })
  return db
}

export default config
