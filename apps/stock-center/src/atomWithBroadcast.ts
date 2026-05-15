import { atom, WritableAtom } from "jotai"
import { SetStateActionWithReset } from "./types"

type MessageEventWithInit<T> = MessageEvent<{ init?: boolean; value: T }>
type UpdateWithBroadcast<T> = {
  isEvent: boolean
  value?: SetStateActionWithReset<T>
}

const atomWithBroadcast = <T>(
  baseAtom: WritableAtom<T, [SetStateActionWithReset<T>], void>,
  key: string,
) => {
  const listeners = new Set<(event: MessageEventWithInit<T>) => void>()
  const channel = new BroadcastChannel(key)

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  channel.onmessage = (event: MessageEventWithInit<T>) => {
    listeners.forEach((l) => l(event))
  }

  const broadcastAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: UpdateWithBroadcast<T>) => {
      if (update.value) set(baseAtom, update.value)
      if (!update.isEvent) channel.postMessage({ value: get(baseAtom) })
    },
  )

  broadcastAtom.onMount = (setAtom) => {
    channel.postMessage({ init: true })

    const listener = (event: MessageEventWithInit<T>) => {
      if (event.data.init) setAtom({ isEvent: false })
      setAtom({ isEvent: true, value: event.data.value })
    }

    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  return atom(
    (get) => get(broadcastAtom),
    (_get, set, update: SetStateActionWithReset<T>) => {
      set(broadcastAtom, { isEvent: false, value: update })
    },
  )
}

export { atomWithBroadcast }
