import { flow } from "fp-ts/function"
import { parseISO, format } from "date-fns/fp"

const formatDate = flow(parseISO, format("PPP"))

export { formatDate }
