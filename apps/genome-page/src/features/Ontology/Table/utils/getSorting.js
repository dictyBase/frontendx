// helper function for table sorting
const getSorting = (order, orderBy) =>
  order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)

export default getSorting
