import { fromEvent, filter, buffer, map } from "rxjs"
import type { RefObject } from "react"

const keyObserver = (ref: RefObject<HTMLDivElement>) =>
  fromEvent<KeyboardEvent>(ref.current as HTMLDivElement, "keyup").pipe(
    filter((event) => event.key === "Enter"),
  )

const inputObserver = (ref: RefObject<HTMLDivElement>) =>
  fromEvent<InputEvent>(ref.current as HTMLDivElement, "input").pipe(
    map((event) => (event.target as HTMLInputElement).value),
  )

const obsToSubs = (ref: RefObject<HTMLDivElement>) =>
  inputObserver(ref).pipe(
    buffer(keyObserver(ref)),
    map((value) => value[value.length - 1]),
    filter((value) => value !== ""),
  )

export default obsToSubs
