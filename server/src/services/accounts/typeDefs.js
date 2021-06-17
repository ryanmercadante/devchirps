import { gql } from 'apollo-server'

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    createdAt: String!
    email: String
  }

  extend type Query {
    account(id: ID!): Account!
    accounts: [Account]
    viewer: Account
  }

  input CreateAccountInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    createAccount(data: CreateAccountInput!): Account!
  }
`

export default typeDefs
