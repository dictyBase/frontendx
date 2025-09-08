import { test, expect } from "vitest"
import { isPhoneValid } from "../utils/isPhoneValid"

test("Returns false for inputs without digits", () => {
  expect(isPhoneValid("Hello", "US")).toEqual(false)
})

test("Returns false for invalid phone numbers", () => {
  expect(isPhoneValid("000", "US")).toEqual(false)
})

test("Returns true for valid phone numbers", () => {
  expect(isPhoneValid("(630) 530-8440", "US")).toEqual(true)
})
