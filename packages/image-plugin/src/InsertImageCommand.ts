import { createCommand } from "lexical"

export type InsertBasicImagePayload = {
  source: string
  key?: string
}

export type InsertImagePayload = {
  source: string
  alt?: string
  width?: number
  height?: number
  key?: string
  alignment?: "left" | "right"
}

const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>("INSERT_IMAGE")
const INSERT_BASIC_IMAGE_COMMAND =
  createCommand<InsertBasicImagePayload>("INSERT_BASIC_IMAGE")

export { INSERT_IMAGE_COMMAND, INSERT_BASIC_IMAGE_COMMAND }
