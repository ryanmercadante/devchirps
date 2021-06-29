class Pagination {
  constructor(Model) {
    this.Model = Model
  }

  // Get documents and cast them into the correct edge/node shape
  async getEdges(queryArgs) {}

  // Get pagination information
  async getPageInfo(edges, queryArgs) {}

  // Add the cursor ID with the correct comparison operator to the query filter
  async _getFilterWithCursor(fromCursorId, filter, operator, sort) {}

  // Create the aggregation pipeline to paginate a full-text search
  async _getSearchPipeline(fromCursorId, filter, first, operator, sort) {}

  // Reverse the sort direction when queries need to look in the opposite
  // direction of the set sort order (e.g. next/previous page checks)
  _reverseSortDirection(sort) {}

  // Get the correct comparison operator based on the sort order
  _getOperator(sort, options = {}) {}

  // Determine if a query is a full-text search based on the sort expression
  _isSearchQuery(sort) {}

  // Check if a next page of results is available
  async _getHasNextPage(endCursor, filter, sort) {}

  // Check if a previous page of results is available
  async _getHasPreviousPage(startCursor, filter, sort) {}

  // Get the ID of the first document in the paging window
  _getStartCursor(edges) {}

  // Get the ID of the last document in the paging window
  _getEndCursor(edges) {}
}

export default Pagination
