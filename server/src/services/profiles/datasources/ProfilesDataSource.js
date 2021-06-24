import { DataSource } from 'apollo-datasource'

class ProfilesDataSource extends DataSource {
  constructor({ Profile }) {
    super()
    this.Profile = Profile
  }
}

export default ProfilesDataSource
