import { test, expect } from "vitest"
import { Some, isSome, isNone } from "fp-ts/Option"
import {
  fileSizeCheck,
  mimeTypeCheck,
  isValidFile,
  getFileValidationError,
  overFileSizeLimitError,
  invalidMimeTypeError,
  ErrorState,
  FILE_SIZE_LIMIT,
  IMAGE_MIME_TYPES,
} from "../components/helpers/fileUploadHelpers"

const OVERSIZED = FILE_SIZE_LIMIT * 1.1
const VALID_SIZED = FILE_SIZE_LIMIT * 0.5

const createMockFile = (
  size: number,
  type = "image/png",
  name = "test.png",
): File => {
  const file = new File(["test content"], name, { type })
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

test("mimeTypeCheck returns true for valid image type", () => {
  const file = createMockFile(VALID_SIZED, "image/png")
  const checker = mimeTypeCheck(IMAGE_MIME_TYPES)
  expect(checker(file)).toBe(true)
})

test("mimeTypeCheck returns false for unsupported type", () => {
  const file = createMockFile(VALID_SIZED, "application/pdf")
  const checker = mimeTypeCheck(IMAGE_MIME_TYPES)
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

test("isValidFile returns false for unsupported MIME type", () => {
  const file = createMockFile(VALID_SIZED, "application/pdf")
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

test("getFileValidationError returns error for unsupported MIME type", () => {
  const file = createMockFile(VALID_SIZED, "application/pdf")
  const result = getFileValidationError(file)
  expect(isSome(result)).toBe(true)
  expect((result as Some<ErrorState>).value).toEqual(invalidMimeTypeError)
})

test("getFileValidationError returns none for file at exact limit", () => {
  const file = createMockFile(FILE_SIZE_LIMIT)
  const result = getFileValidationError(file)
  expect(isNone(result)).toBe(true)
})
