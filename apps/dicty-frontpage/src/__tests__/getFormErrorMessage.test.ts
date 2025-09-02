import { test, expect } from "vitest"
import { getFormErrorMessage } from "../common/utils/getFormErrorMessage"
import { FieldError } from "react-hook-form"

test("returns error message when error has message", () => {
  const error: FieldError = {
    type: "required",
    message: "This field is required",
  }
  
  expect(getFormErrorMessage(error)).toBe("This field is required")
})

test("returns empty string when error is undefined", () => {
  expect(getFormErrorMessage(undefined)).toBe("")
})

test("returns empty string when error has no message", () => {
  const error: FieldError = {
    type: "required",
  }
  
  expect(getFormErrorMessage(error)).toBe("")
})

test("returns empty string when error message is null", () => {
  const error: FieldError = {
    type: "required",
    message: null,
  }
  
  expect(getFormErrorMessage(error)).toBe("")
})