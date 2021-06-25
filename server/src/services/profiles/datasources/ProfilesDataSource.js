import { DataSource } from 'apollo-datasource'

class ProfilesDataSource extends DataSource {
  constructor({ Profile }) {
    super()
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
}

export default ProfilesDataSource
