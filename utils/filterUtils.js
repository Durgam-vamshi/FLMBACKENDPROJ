// Utility function to build MongoDB query from filters
function buildFilterQuery(filters) {
  const query = {};

  if (filters.search) {
    query.name = { $regex: filters.search, $options: "i" }; // case-insensitive search
  }

  if (filters.location) {
    query.location = filters.location;
  }

  if (filters.industry) {
    query.industry = filters.industry;
  }

  return query;
}

module.exports = { buildFilterQuery };
