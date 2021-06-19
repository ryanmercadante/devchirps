import { rule, shield } from 'graphql-shield'
import getPermissions from '../../lib/getPermissions'

const canReadAnyAccount = rule()((parent, args, { user }, info) => {
  const userPermissions = getPermissions(user)
  return userPermissions && userPermissions.includes('read:any_account')
})

const permissions = shield(
  {
    Query: {
      accounts: canReadAnyAccount,
    },
  },
  {
    debug: process.env.NODE_ENV === 'deveopment',
  }
)

export default permissions
