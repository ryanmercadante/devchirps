import { gql } from 'apollo-server'

const typeDefs = gql`
  type Profile @key(fields: "id") {
    "The unique MongoDB document ID of the user's profile."
    id: ID!
  }
`

export default typeDefs
