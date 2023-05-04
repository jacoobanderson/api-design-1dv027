import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @param {string} connectionString - The connection used to open the MongoDB database.
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async (connectionString) => {
  const { connection } = mongoose

  mongoose.set('strict', 'throw')
  mongoose.set('strictQuery', true)

  connection.on('connected', () => console.log('MongoDB connection opened.'))
  connection.on('error', err => console.error(`MongoDB connection error occurred: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('MongoDB disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(connectionString)
}