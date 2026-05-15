import { atom, SetStateAction, PrimitiveAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { match, P } from "ts-pattern"
import {
  size as Asize,
  concat as Aconcat,
  concatW as AconcatW,
  uniq as Auniq,
} from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
  match as Omatch,
} from "fp-ts/Option"

type MessageEventWithInit<T> = MessageEvent<{ init?: boolean; value: T }>

function atomWithBroadcast<T>(baseAtom: PrimitiveAtom<T>, key: string) {
  const listeners = new Set<(event: MessageEventWithInit<T>) => void>()
  const channel = new BroadcastChannel(key)

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  channel.onmessage = (event: MessageEventWithInit<T>) => {
    listeners.forEach((l) => l(event))
  }

  const broadcastAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: { isEvent: boolean; value?: SetStateAction<T> }) => {
      pipe(
        update.value,
        OfromNullable,
        Omatch(
          () => {},
          (v) => {
            set(baseAtom, v)
          },
        ),
      )
      pipe(
        update.isEvent,
        Bmatch(
          () => {
            channel.postMessage({ value: get(baseAtom) })
          },
          () => {},
        ),
      )
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
    (_get, set, update: SetStateAction<T>) => {
      set(broadcastAtom, { isEvent: false, value: update })
    },
  )
}

export { atomWithBroadcast }
