module.exports = (query) => {
  const { sort, limit, contains, page } = query
  console.log(query)
  const filters = {}
  if (sort) {
    filters.sort = getSortParams(sort)
  }
  if (limit) {
    filters.limit = limit
  }
  if (contains) {
    filters.contains = getContainsParams(contains)
  }

  if (page) {
    filters.page = page * 10
  }
  return filters
}

const getSortParams = (sort) => {
  const sortArr = sort.split(',')
  const sortObj = sortArr.reduce((previous, current) => {
    const sortInfo = current.match(new RegExp(/(\w+)\W(\w+)\W/))
    const [sortOption, sortItem] = sortInfo.slice(1)
    return {
      ...previous,
      [sortItem]: sortOption === 'desc' ? -1 : 1
    }
  }, {})
  return sortObj
}

const getContainsParams = (contains) => {
  const containsArr = contains.split(',')
  const containsObj = containsArr.reduce((previous, current) => {
    const contains = current.match(new RegExp(/(\w+)\W(\w+)\W/))
    const [containsOption, containsItem] = contains.slice(1)
    return [
      ...previous,
      { [containsOption]: { $regex: `.*${containsItem}.*` } }
    ]
  }, [])
  return { $or: containsObj }
}
