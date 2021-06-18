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

  input AccountWhereUniqueInput {
    id: ID!
  }

  input UpdateAccountInput {
    email: String
    newPassword: String
    password: String
  }

  extend type Mutation {
    createAccount(data: CreateAccountInput!): Account!
    deleteAccount(where: AccountWhereUniqueInput!): Boolean!
    updateAccount(
      data: UpdateAccountInput!
      where: AccountWhereUniqueInput!
    ): Account!
  }
`

export default typeDefs
