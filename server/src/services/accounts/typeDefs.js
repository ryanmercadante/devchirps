import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar DateTime

  type Account @key(fields: "id") {
    id: ID!
    createdAt: DateTime!
    email: String
    isBlocked: Boolean
    isModerator: Boolean
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
    changeAccountBlockedStatus(where: AccountWhereUniqueInput!): Account!
    changeAccountModeratorRole(where: AccountWhereUniqueInput!): Account!
    createAccount(data: CreateAccountInput!): Account!
    deleteAccount(where: AccountWhereUniqueInput!): Boolean!
    updateAccount(
      data: UpdateAccountInput!
      where: AccountWhereUniqueInput!
    ): Account!
  }
`

export default typeDefs
