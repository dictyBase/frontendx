import publicHandlers from "./publicHandlers"
import privateHandlers from "./privateHandlers"

const handlers = [...publicHandlers, ...privateHandlers]

export default handlers
