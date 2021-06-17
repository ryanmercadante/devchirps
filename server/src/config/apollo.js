import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'

const gateway = new ApolloGateway({
  serviceList: [{ name: 'accounts', url: process.env.ACCOUNTS_SERVICE_URL }],
})

const server = new ApolloServer({
  gateway,
  subscriptions: false,
})

export default server
