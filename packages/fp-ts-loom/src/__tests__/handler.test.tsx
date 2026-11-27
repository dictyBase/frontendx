import type { ChangeEvent } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { flow, pipe } from "fp-ts/function"
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import {
  and as Pand,
  contramap as Pcontramap,
  getMonoidAll as PgetMonoidAll,
  getMonoidAny as PgetMonoidAny,
  not as Pnot,
  type Predicate,
} from "fp-ts/Predicate"
import { expect, test, vi } from "vitest"
import {
  contramapHandler,
  foldHandlers,
  getHandlerMonoid,
  when,
  type Handler,
} from "../index"

type SubmissionEvent = {
  readonly query: string
  readonly disabled: boolean
  readonly isAdmin: boolean
}

const recordFirst = (target: Array<string>): Handler<string> => {
  const handleFirst: Handler<string> = (value) => {
    target.push(`first:${value}`)
  }
  return handleFirst
}

const recordSecond = (target: Array<string>): Handler<string> => {
  const handleSecond: Handler<string> = (value) => {
    target.push(`second:${value}`)
  }
  return handleSecond
}

const recordThird = (target: Array<string>): Handler<string> => {
  const handleThird: Handler<string> = (value) => {
    target.push(`third:${value}`)
  }
  return handleThird
}

const isNonEmptyString: Predicate<string> = (text) => text.trim().length > 0
const hasMinLengthThree: Predicate<string> = (text) => text.trim().length >= 3
const isAdminBypass: Predicate<SubmissionEvent> = ({ isAdmin }) => isAdmin

test("getHandlerMonoid satisfies associativity and left/right identity laws", () => {
  const { concat, empty } = getHandlerMonoid<string>()
  const leftLog: Array<string> = []
  const rightLog: Array<string> = []

  const leftGrouped = concat(
    concat(recordFirst(leftLog), recordSecond(leftLog)),
    recordThird(leftLog),
  )
  const rightGrouped = concat(
    recordFirst(rightLog),
    concat(recordSecond(rightLog), recordThird(rightLog)),
  )

  leftGrouped("click")
  rightGrouped("click")
  expect(leftLog).toEqual(["first:click", "second:click", "third:click"])
  expect(rightLog).toEqual(leftLog)

  const identityLog: Array<string> = []
  concat(empty, recordFirst(identityLog))("ping")
  concat(recordSecond(identityLog), empty)("pong")
  expect(identityLog).toEqual(["first:ping", "second:pong"])
})

test("when guards handlers with fp-ts/Predicate monoids and composes as an Endomorphism", () => {
  const hasValidQuery = pipe(
    MconcatAll(PgetMonoidAll<string>())([isNonEmptyString, hasMinLengthThree]),
    Pcontramap((event: SubmissionEvent) => event.query),
  )
  const isEnabled = pipe(({ disabled }: SubmissionEvent) => disabled, Pnot)

  const canSubmit = MconcatAll(PgetMonoidAny<SubmissionEvent>())([
    MconcatAll(PgetMonoidAll<SubmissionEvent>())([isEnabled, hasValidQuery]),
    isAdminBypass,
  ])

  const submitSpy = vi.fn<Handler<SubmissionEvent>>()
  const guardedSubmit = pipe(submitSpy, when(canSubmit))

  guardedSubmit({ query: "ab", disabled: false, isAdmin: false })
  guardedSubmit({ query: "dicty", disabled: true, isAdmin: false })
  expect(submitSpy).not.toHaveBeenCalled()

  const validEvent: SubmissionEvent = {
    query: "dicty",
    disabled: false,
    isAdmin: false,
  }
  const adminEvent: SubmissionEvent = {
    query: "",
    disabled: true,
    isAdmin: true,
  }
  guardedSubmit(validEvent)
  guardedSubmit(adminEvent)
  expect(submitSpy).toHaveBeenCalledTimes(2)
  expect(submitSpy).toHaveBeenNthCalledWith(1, validEvent)
  expect(submitSpy).toHaveBeenNthCalledWith(2, adminEvent)

  const sequentialSpy = vi.fn<Handler<SubmissionEvent>>()
  const combinedSpy = vi.fn<Handler<SubmissionEvent>>()
  const sequentialGuard = flow(
    when(isEnabled),
    when(hasValidQuery),
  )(sequentialSpy)
  const combinedGuard = when(pipe(isEnabled, Pand(hasValidQuery)))(combinedSpy)

  sequentialGuard(validEvent)
  combinedGuard(validEvent)
  expect(sequentialSpy).toHaveBeenCalledTimes(1)
  expect(combinedSpy).toHaveBeenCalledTimes(1)
})

test("foldHandlers and contramapHandler wire multiple callbacks onto DOM inputs", () => {
  const capturedValues: Array<string> = []
  const analyticsValues: Array<string> = []

  const updateValue: Handler<string> = (value) => {
    capturedValues.push(value)
  }
  const trackSearch: Handler<string> = (value) => {
    analyticsValues.push(value.toUpperCase())
  }

  const handleInputChange = pipe(
    foldHandlers([updateValue, trackSearch]),
    contramapHandler(
      (event: ChangeEvent<HTMLInputElement>) => event.target.value,
    ),
  )

  render(<input aria-label="strain-search" onChange={handleInputChange} />)
  fireEvent.change(screen.getByLabelText("strain-search"), {
    target: { value: " sadA " },
  })

  expect(capturedValues).toEqual([" sadA "])
  expect(analyticsValues).toEqual([" SADA "])
})
