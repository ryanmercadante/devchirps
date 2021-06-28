import { DataSource } from 'apollo-datasource'
import { UserInputError } from 'apollo-server-express'
// import gravatarUrl from 'gravatar-url'

class ProfilesDataSource extends DataSource {
  constructor({ auth0, Profile }) {
    super()
    this.auth0 = auth0
    this.Profile = Profile
  }

  getProfile(filter) {
    return this.Profile.findOne(filter).exec()
  }

  getProfileById(id) {
    return this.Profile.findById(id)
  }

  getProfiles() {
    return this.Profile.find({}).exec()
  }

  async checkViewerFollowsProfile(viewerAccountId, profileId) {
    const viewerProfile = await this.Profile.findOne({
      accountId: viewerAccountId,
    }).exec()
    return viewerProfile.following.includes(profileId)
  }

  async createProfile(profile) {
    // const account = await this.auth0.getUser({ id: profile.accountId })
    // const avatar = gravatarUrl(account.email, { default: 'mm' })
    // profile.avatar = avatar
    const newProfile = new this.Profile(profile)

    return newProfile.save()
  }

  updateProfile(currentUsername, { description, fullName, username }) {
    if (!description && !fullName && !username) {
      throw new UserInputError('You must supply some profile data to update.')
    }

    const data = {
      ...(description && { description }),
      ...(fullName && { fullName }),
      ...(username && { username }),
    }

    return this.Profile.findOneAndUpdate({ username: currentUsername }, data, {
      new: true,
    })
  }

  async deleteProfile(username) {
    const deletedProfile = await this.Profile.findOneAndDelete({
      username,
    }).exec()
    return deletedProfile._id
  }
}

export default ProfilesDataSource
