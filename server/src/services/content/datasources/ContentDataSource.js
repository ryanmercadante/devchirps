import { DataSource } from 'apollo-datasource'

import Pagination from '../../../lib/Pagination'

class ContentDataSource extends DataSource {
  constructor({ Post, Profile, Reply }) {
    super()
    this.Post = Post
    this.Profile = Profile
    this.Reply = Reply
    this.postPagination = new Pagination(Post)
    this.replyPagination = new Pagination(Reply)
  }
}

export default ContentDataSource
