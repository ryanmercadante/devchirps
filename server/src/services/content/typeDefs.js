import { gql } from 'apollo-server'

const typeDefs = gql`
  """
  An ISO 8601-encoded UTC date string.
  """
  scalar DateTime

  """
  A post contains content authored by a user.
  """
  type Post {
    "The unique MongoDB document ID of the post."
    id: ID!
    "The profile of the user who authored the post."
    author: Profile!
    "The date and time the post was created."
    createdAt: DateTime!
    "Whether the post is blocked."
    isBlocked: Boolean
    "The URL of a media file associated with the content."
    media: String
    "The body content of the post (max. 256 characters)."
    text: String!
  }
`

export default typeDefs
