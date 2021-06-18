import { UserInputError } from 'apollo-server-express'
import auth0 from '../../config/auth0'
import getToken from '../../lib/getToken'

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
    async deleteAccount(parent, { where: { id } }, context, info) {
      await auth0.deleteUser({ id })
      return true
    },
    async updateAccount(
      parent,
      { data: { email, newPassword, password }, where: { id } },
      context,
      info
    ) {
      // Handle user input-related errors:
      if (!email && !newPassword && !password) {
        throw new UserInputError('You must supply some account data to update.')
      } else if (email && newPassword && password) {
        throw new UserInputError(
          'Email and password cannot be updated simultaneously.'
        )
      } else if ((!password && newPassword) || (password && !newPassword)) {
        throw new UserInputError(
          'Provide the existing and new passwords when updating the password.'
        )
      }
      // If no email was submitted, we know we're updating the password:
      if (!email) {
        const user = await auth0.getUser({ id })
        await getToken(user.email, password)
        return auth0.updateUser({ id }, { password: newPassword })
      }
      // We know we have an email, so update it:
      return auth0.updateUser({ id }, { email })
    },
  },
}

export default resolvers
