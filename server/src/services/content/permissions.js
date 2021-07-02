import { and, rule, shield } from 'graphql-shield'

import getPermissions from '../../lib/getPermissions'

const permissions = shield(
  {},
  { debug: process.env.NODE_ENV === 'development' }
)

export default permissions
