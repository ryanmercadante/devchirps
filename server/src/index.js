import waitOn from 'wait-on'
import app from './config/app'
import server from './config/apollo'

const port = process.env.PORT

const options = {
  resources: ['tcp:4001', 'tcp:4002', 'tcp:4003'],
}

waitOn(options)
  .then(() => {
    server.applyMiddleware({ app })
    app.listen({ port }, () => {
      console.log(
        `Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    })
  })
  .catch((err) => {
    console.error('ERR:', err)
  })
