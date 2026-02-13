import { test, expect } from "vitest"
import { isSome, isNone } from "fp-ts/Option"
import {
  fileSizeCheck,
  isValidFile,
  getFileValidationError,
  overFileSizeLimitError,
} from "../components/helpers/fileUploadHelpers"

const FILE_SIZE_LIMIT = 10 * 1024 * 1024

const createMockFile = (size: number, name = "test.pdf"): File => {
  const file = new File(["a".repeat(size)], name, { type: "application/pdf" })
  Object.defineProperty(file, "size", { value: size })
  return file
}

test("fileSizeCheck returns true for file under size limit", () => {
  const file = createMockFile(5 * 1024 * 1024)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(true)
})

test("fileSizeCheck returns true for file exactly at size limit", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(true)
})

test("fileSizeCheck returns false for file over size limit", () => {
  const file = createMockFile(15 * 1024 * 1024)
  const checker = fileSizeCheck(FILE_SIZE_LIMIT)
  expect(checker(file)).toBe(false)
})

test("isValidFile returns true for valid file", () => {
  const file = createMockFile(5 * 1024 * 1024)
  expect(isValidFile(file)).toBe(true)
})

test("isValidFile returns false for oversized file", () => {
  const file = createMockFile(15 * 1024 * 1024)
  expect(isValidFile(file)).toBe(false)
})

test("getFileValidationError returns none for valid file", () => {
  const file = createMockFile(5 * 1024 * 1024)
  const result = getFileValidationError(file)
  expect(isNone(result)).toBe(true)
})

test("getFileValidationError returns error for oversized file", () => {
  const file = createMockFile(15 * 1024 * 1024)
  const result = getFileValidationError(file)
  expect(isSome(result)).toBe(true)
  if (isSome(result)) {
    expect(result.value).toEqual(overFileSizeLimitError)
  }
})

test("getFileValidationError returns none for file at exact limit", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  const result = getFileValidationError(file)
  expect(isNone(result)).toBe(true)
})
