import { atom, WritableAtom } from "jotai"
import type { SetStateAction } from "jotai/vanilla"
import { SetStateActionWithReset } from "./types"

type MessageEventWithInit<Action> = MessageEvent<{
  init?: boolean
  value: Action
}>
type UpdateWithBroadcast<Action> = {
  isEvent: boolean
  value?: Action
}

const atomWithBroadcast = <
  T,
  Action extends SetStateAction<T> | SetStateActionWithReset<T>,
>(
  baseAtom: WritableAtom<T, [Action], void>,
  key: string,
): WritableAtom<T, [Action], void> => {
  const listeners = new Set<(event: MessageEventWithInit<Action>) => void>()
  const channel = new BroadcastChannel(key)

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  channel.onmessage = (event: MessageEventWithInit<Action>) => {
    listeners.forEach((l) => l(event))
  }

  const broadcastAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: UpdateWithBroadcast<Action>) => {
      if (update.value) set(baseAtom, update.value)
      if (!update.isEvent) channel.postMessage({ value: get(baseAtom) })
    },
  )

  broadcastAtom.onMount = (setAtom) => {
    channel.postMessage({ init: true })

    const listener = (event: MessageEventWithInit<Action>) => {
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
    (_get, set, update: Action) => {
      set(broadcastAtom, { isEvent: false, value: update })
    },
  )
}

export { atomWithBroadcast }
