import { test, expect } from "vitest"
import { Some, isSome, isNone } from "fp-ts/Option"
import {
  fileSizeCheck,
  isValidFile,
  getFileValidationError,
  overFileSizeLimitError,
  ErrorState,
  FILE_SIZE_LIMIT,
} from "../components/helpers/fileUploadHelpers"

const OVERSIZED = FILE_SIZE_LIMIT * 1.1
const VALID_SIZED = FILE_SIZE_LIMIT * 0.5

const createMockFile = (size: number, name = "test.pdf"): File => {
  const file = new File(["test content"], name, { type: "application/pdf" })
  Object.defineProperty(file, "size", { value: size })
  return file
}

test("fileSizeCheck returns true for file under size limit", () => {
  const file = createMockFile(VALID_SIZED)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(true)
})

test("fileSizeCheck returns true for file exactly at size limit", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(true)
})

test("fileSizeCheck returns false for file over size limit", () => {
  const file = createMockFile(OVERSIZED)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(false)
})

test("isValidFile returns true for valid file", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  expect(isValidFile(file)).toBe(true)
})

test("isValidFile returns false for oversized file", () => {
  const file = createMockFile(OVERSIZED)
  expect(isValidFile(file)).toBe(false)
})

test("getFileValidationError returns none for valid file", () => {
  const file = createMockFile(VALID_SIZED)
  const result = getFileValidationError(file)
  expect(isNone(result)).toBe(true)
})

test("getFileValidationError returns error for oversized file", () => {
  const file = createMockFile(OVERSIZED)
  const result = getFileValidationError(file)
  expect(isSome(result)).toBe(true)
  expect((result as Some<ErrorState>).value).toEqual(overFileSizeLimitError)
})

test("getFileValidationError returns none for file at exact limit", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  const result = getFileValidationError(file)
  expect(isNone(result)).toBe(true)
})
