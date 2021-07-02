import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { buildFederatedSchema } from '@apollo/federation'
import initMongoose from '../../config/mongoose'
import permissions from './permissions'
import Profile from '../../models/Profile'
import Post from '../../models/Post'
import Reply from '../../models/Reply'
import ContentDataSource from './datasources/ContentDataSource'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
;(async () => {
  const port = process.env.CONTENT_SERVICE_PORT

  const schema = applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  )

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user) : null
      return { user }
    },
    dataSources: () => {
      return {
        contentAPI: new ContentDataSource({ Post, Profile, Reply }),
      }
    },
  })

  initMongoose()

  try {
    const { url } = await server.listen({ port })
    console.log(`Content service ready at ${url}`)
  } catch (err) {
    console.error('Error starting Content service:', err)
  }
})()
