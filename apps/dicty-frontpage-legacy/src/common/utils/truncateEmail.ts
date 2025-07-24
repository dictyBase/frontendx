import { replace as Sreplace } from "fp-ts/string"

const truncateEmail = (email: string) => Sreplace(/@.*/, "")(email)

export { truncateEmail }
