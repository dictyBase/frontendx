import { fromEvent, filter, buffer, map } from "rxjs"
import type { RefObject } from "react"

const keyObserver = (reference: RefObject<HTMLDivElement>) =>
  fromEvent<KeyboardEvent>(reference.current as HTMLDivElement, "keyup").pipe(
    filter((event) => event.key === "Enter"),
  )

const inputObserver = (reference: RefObject<HTMLDivElement>) =>
  fromEvent<InputEvent>(reference.current as HTMLDivElement, "input").pipe(
    map((event) => (event.target as HTMLInputElement).value),
  )

const obsToSubs = (reference: RefObject<HTMLDivElement>) =>
  inputObserver(reference).pipe(
    buffer(keyObserver(reference)),
    map((value) => value.at(-1)),
    filter((value) => value !== ""),
  )

export default obsToSubs
