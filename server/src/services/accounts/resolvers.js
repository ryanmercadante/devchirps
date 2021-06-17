import auth0 from '../../config/auth0'

const resolvers = {
  Account: {
    __resolveReference(reference, context, info) {
      return auth0.getUser({ id: reference.id })
    },
    id(account, args, context, info) {
      return account.user_id
    },
    createdAt(account, args, context, info) {
      return account.created_at
    },
  },
  Query: {
    account(parent, { id }, context, info) {
      return auth0.getUser({ id })
    },
    accounts(parent, args, context, info) {
      return auth0.getUsers()
    },
    viewer(parent, args, { user }, info) {
      if (user && user.sub) {
        return auth0.getUser({ id: user.sub })
      }
      return null
    },
  },
  Mutation: {
    createAccount(parent, { data: { email, password } }, context, info) {
      return auth0.createUser({
        connection: 'Username-Password-Authentication',
        email,
        password,
      })
    },
  },
}

export default resolvers
