import { createCommand } from "lexical"

export type InsertImagePayload = {
  source: string
  alt?: string
  width: number
  height: number
  key?: string
  x?: number
}

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>()
