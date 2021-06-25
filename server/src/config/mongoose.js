import mongoose from 'mongoose'

export default async function () {
  const connectionUrl = process.env.MONGODB_URL

  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
  } catch (err) {
    console.log('Err:', err)
  }

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection ready at ${connectionUrl}`)
  })

  mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error:', err)
  })
}
