import { useEffect } from "react"
import { render } from "@testing-library/react"
import { pipe } from "fp-ts/function"
import { expect, test } from "vitest"
import {
  foldCleanups,
  foldEffects,
  fromMount,
  MonoidCleanup,
  MonoidEffect,
  whenEffect,
  type Cleanup,
  type Effect,
} from "../index"

const CLEANUP_FIRST = "cleanup:first"
const MOUNT_SOCKET = "mount:socket"
const MOUNT_FOCUS = "mount:focus"

const createTrackedEffect = (name: string, target: Array<string>): Effect => {
  const runEffect: Effect = () => {
    target.push(`mount:${name}`)
    const runCleanup: Cleanup = () => {
      target.push(`cleanup:${name}`)
    }
    return runCleanup
  }
  return runEffect
}

const cleanupFirst = (target: Array<string>): Cleanup => {
  const runCleanup: Cleanup = () => {
    target.push(CLEANUP_FIRST)
  }
  return runCleanup
}

const cleanupSecond = (target: Array<string>): Cleanup => {
  const runCleanup: Cleanup = () => {
    target.push("cleanup:second")
  }
  return runCleanup
}

const cleanupThird = (target: Array<string>): Cleanup => {
  const runCleanup: Cleanup = () => {
    target.push("cleanup:third")
  }
  return runCleanup
}

test("MonoidCleanup is lazy until invoked and satisfies monoid laws", () => {
  const { concat, empty } = MonoidCleanup
  const leftLog: Array<string> = []
  const rightLog: Array<string> = []

  const leftGrouped = concat(
    concat(cleanupFirst(leftLog), cleanupSecond(leftLog)),
    cleanupThird(leftLog),
  )
  const rightGrouped = concat(
    cleanupFirst(rightLog),
    concat(cleanupSecond(rightLog), cleanupThird(rightLog)),
  )

  expect(leftLog).toEqual([])
  expect(rightLog).toEqual([])

  leftGrouped()
  rightGrouped()
  expect(leftLog).toEqual([CLEANUP_FIRST, "cleanup:second", "cleanup:third"])
  expect(rightLog).toEqual(leftLog)

  const identityLog: Array<string> = []
  foldCleanups([empty, cleanupFirst(identityLog), empty])()
  expect(identityLog).toEqual([CLEANUP_FIRST])
})

test("MonoidEffect composes mount and cleanup phases lazily in sequence", () => {
  const lifecycleLog: Array<string> = []
  const composed = foldEffects([
    createTrackedEffect("socket", lifecycleLog),
    fromMount(() => {
      lifecycleLog.push(MOUNT_FOCUS)
    }),
    createTrackedEffect("shortcut", lifecycleLog),
  ])

  expect(lifecycleLog).toEqual([])

  const teardown = composed()
  expect(lifecycleLog).toEqual([MOUNT_SOCKET, MOUNT_FOCUS, "mount:shortcut"])

  teardown()
  expect(lifecycleLog).toEqual([
    MOUNT_SOCKET,
    MOUNT_FOCUS,
    "mount:shortcut",
    "cleanup:socket",
    "cleanup:shortcut",
  ])
})

test("MonoidEffect satisfies associativity and identity laws", () => {
  const leftLog: Array<string> = []
  const rightLog: Array<string> = []

  const leftGrouped = MonoidEffect.concat(
    MonoidEffect.concat(
      createTrackedEffect("A", leftLog),
      createTrackedEffect("B", leftLog),
    ),
    createTrackedEffect("C", leftLog),
  )
  const rightGrouped = MonoidEffect.concat(
    createTrackedEffect("A", rightLog),
    MonoidEffect.concat(
      createTrackedEffect("B", rightLog),
      createTrackedEffect("C", rightLog),
    ),
  )

  const cleanupLeft = leftGrouped()
  cleanupLeft()
  const cleanupRight = rightGrouped()
  cleanupRight()

  expect(leftLog).toEqual([
    "mount:A",
    "mount:B",
    "mount:C",
    "cleanup:A",
    "cleanup:B",
    "cleanup:C",
  ])
  expect(rightLog).toEqual(leftLog)

  const identityLog: Array<string> = []
  const leftIdentity = MonoidEffect.concat(
    MonoidEffect.empty,
    createTrackedEffect("solo", identityLog),
  )
  const cleanupIdentity = leftIdentity()
  cleanupIdentity()
  expect(identityLog).toEqual(["mount:solo", "cleanup:solo"])
})

test("Effect and whenEffect integrate directly with React useEffect mount and unmount", () => {
  const lifecycleLog: Array<string> = []

  const EffectComponent = ({ active }: { readonly active: boolean }) => {
    useEffect(
      () =>
        pipe(
          foldEffects([
            createTrackedEffect("listener", lifecycleLog),
            createTrackedEffect("timer", lifecycleLog),
          ]),
          whenEffect(active),
        )(),
      [active],
    )
    return <div>EffectHost</div>
  }

  const inactiveView = render(<EffectComponent active={false} />)
  expect(lifecycleLog).toEqual([])
  inactiveView.unmount()
  expect(lifecycleLog).toEqual([])

  const activeView = render(<EffectComponent active />)
  expect(lifecycleLog).toEqual(["mount:listener", "mount:timer"])
  activeView.unmount()
  expect(lifecycleLog).toEqual([
    "mount:listener",
    "mount:timer",
    "cleanup:listener",
    "cleanup:timer",
  ])
})
