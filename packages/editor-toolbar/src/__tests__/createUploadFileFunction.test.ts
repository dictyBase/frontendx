import { test, expect, vi } from "vitest"
import { isRight, isLeft, type Left, type Right } from "fp-ts/Either"
import { createFileUploadFunction } from "../components/helpers/createUploadFileFunction"
import {
  accessTokenError,
  uploadFailureError,
  type ErrorState,
} from "../components/helpers/fileUploadHelpers"

const createMockFile = (name = "test.pdf"): File =>
  new File(["test content"], name, { type: "application/pdf" })

const testToken = "test-token"

test("returns error when getAccessToken fails", async () => {
  const mockFile = createMockFile()
  const mockMutation = vi.fn()
  const mockGetAccessToken = vi.fn().mockRejectedValue(new Error("Token error"))

  const uploadFunction = createFileUploadFunction(
    mockFile,
    mockMutation,
    mockGetAccessToken,
  )

  const result = await uploadFunction()

  expect(isLeft(result)).toBe(true)
  expect((result as Left<ErrorState>).left).toEqual(accessTokenError)
  expect(mockMutation).not.toHaveBeenCalled()
})

test("returns error when mutation fails", async () => {
  const mockFile = createMockFile()
  const mockMutation = vi.fn().mockRejectedValue(new Error("Upload error"))
  const mockGetAccessToken = vi.fn().mockResolvedValue(testToken)

  const uploadFunction = createFileUploadFunction(
    mockFile,
    mockMutation,
    mockGetAccessToken,
  )

  const result = await uploadFunction()

  expect(isLeft(result)).toBe(true)
  expect((result as Left<ErrorState>).left).toEqual(uploadFailureError)
  expect(mockGetAccessToken).toHaveBeenCalled()
  expect(mockMutation).toHaveBeenCalledWith({
    variables: { file: mockFile },
    context: { headers: { Authorization: "Bearer test-token" } },
  })
})

test("returns error when mutation returns null data", async () => {
  const mockFile = createMockFile()
  // eslint-disable-next-line unicorn/no-null
  const mockMutation = vi.fn().mockResolvedValue({ data: null })
  const mockGetAccessToken = vi.fn().mockResolvedValue(testToken)

  const uploadFunction = createFileUploadFunction(
    mockFile,
    mockMutation,
    mockGetAccessToken,
  )

  const result = await uploadFunction()

  expect(isLeft(result)).toBe(true)
  expect((result as Left<ErrorState>).left).toEqual(uploadFailureError)
})

test("returns url when upload succeeds", async () => {
  const mockFile = createMockFile("document.pdf")
  const mockMutation = vi.fn().mockResolvedValue({
    data: {
      uploadFile: {
        url: "https://storage.example.com/files/document.pdf",
      },
    },
  })
  const mockGetAccessToken = vi.fn().mockResolvedValue(testToken)

  const uploadFunction = createFileUploadFunction(
    mockFile,
    mockMutation,
    mockGetAccessToken,
  )

  const result = await uploadFunction()

  expect(isRight(result)).toBe(true)
  expect(
    (result as Right<{ url: string; token: string; selectedFile: File }>).right
      .url,
  ).toBe("https://storage.example.com/files/document.pdf")
  expect(
    (result as Right<{ url: string; token: string; selectedFile: File }>).right
      .token,
  ).toBe(testToken)
  expect(
    (result as Right<{ url: string; token: string; selectedFile: File }>).right
      .selectedFile,
  ).toBe(mockFile)
  expect(mockGetAccessToken).toHaveBeenCalled()
  expect(mockMutation).toHaveBeenCalledWith({
    variables: { file: mockFile },
    context: { headers: { Authorization: "Bearer test-token" } },
  })
})
