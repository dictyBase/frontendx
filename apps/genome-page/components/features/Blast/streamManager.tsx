import { fromEvent, Observable } from "rxjs"
import { map, share } from "rxjs/operators"
import { ChangeEvent, MutableRefObject, useState, useEffect } from "react"

type InputEvent = ChangeEvent<HTMLInputElement>

interface StreamManagerProps {
  element: MutableRefObject<HTMLInputElement>
}

export function useStreamManager({ element }: StreamManagerProps) {
  const [streamer, setStreamer] = useState<Observable<string>>(null)
  useEffect(() => {
    const obs = fromEvent<InputEvent>(
      element.current as HTMLInputElement,
      "change",
    ).pipe(
      map((event: InputEvent) => event?.target?.value),
      share(),
    )
    setStreamer(obs)
  }, [element])
  return streamer
}
