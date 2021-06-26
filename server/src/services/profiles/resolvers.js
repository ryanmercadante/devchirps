import { UserInputError } from 'apollo-server-express'

const resolvers = {
  Account: {
    profile(account, args, { dataSources }, info) {
      return dataSources.profilesAPI.getProfile({
        accountId: account.id,
      })
    },
  },
  Profile: {
    __resolveReference(reference, { dataSources }, info) {
      return dataSources.profilesAPI.getProfileById(reference.id)
    },
    account(profile, args, context, info) {
      return { __typename: 'Account', id: profile.accountId }
    },
    id(profile, args, context, info) {
      return profile._id
    },
    viewerIsFollowing(profile, args, { dataSources }, info) {
      return dataSources.profilesAPI.checkViewerFollowsProfile(
        user.sub,
        provile._id
      )
    },
  },
  Query: {
    async profile(parent, { username }, { dataSources }, info) {
      const profile = await dataSources.profilesAPI.getProfile({ username })

      if (!profile) {
        throw new UserInputError('Profile does not exist.')
      }
      return profile
    },
    profiles(parent, args, { dataSources }, info) {
      return dataSources.profilesAPI.getProfiles()
    },
  },
  Mutation: {
    createProfile(parent, { data }, { dataSources }, info) {
      return dataSources.profilesAPI.createProfile(data)
    },
  },
}

export default resolvers
