import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { none, some } from "fp-ts/Option"
import { left, right } from "fp-ts/Either"
import {
  EgetValidFile,
  isValidFile,
  renderError,
  resolveDimensions,
  scaleDimensions,
} from "../components/helpers/imageUploadHelpers"

const FILE_SIZE_LIMIT = 1_000_000

const createMockFile = (
  size: number,
  type = "image/png",
  name = "test.png",
): File => {
  const file = new File(["test content"], name, { type })
  Object.defineProperty(file, "size", { value: size })
  return file
}

const createMockFileList = (...files: File[]): FileList => {
  const fileList = Object.create(FileList.prototype) as FileList
  Object.defineProperty(fileList, "length", { value: files.length })
  files.forEach((file, index) => {
    Object.defineProperty(fileList, index, { value: file })
  })
  fileList[Symbol.iterator] = () => files[Symbol.iterator]()
  return fileList
}

const FILE_LIST_EMPTY_MESSAGE = "File list is empty"

// EgetValidFile

test("EgetValidFile returns Some(Left) when files is null", () => {
  // eslint-disable-next-line unicorn/no-null
  const result = EgetValidFile(null)
  expect(result).toMatchObject(some(left({ message: FILE_LIST_EMPTY_MESSAGE })))
})

test("EgetValidFile returns Some(Left) when FileList is empty", () => {
  const emptyList = createMockFileList()
  const result = EgetValidFile(emptyList)
  expect(result).toMatchObject(some(left({ message: "No file selected" })))
})

test("EgetValidFile returns Some(Left) when file exceeds size limit", () => {
  const oversized = createMockFile(FILE_SIZE_LIMIT + 1)
  const result = EgetValidFile(createMockFileList(oversized))
  expect(result).toMatchObject(
    some(
      left({
        message: "Chosen file size is too large. It must be smaller than 1MB.",
      }),
    ),
  )
})

test("EgetValidFile returns Some(Left) when file has unsupported MIME type", () => {
  const invalid = createMockFile(
    FILE_SIZE_LIMIT * 0.5,
    "application/pdf",
    "doc.pdf",
  )
  const result = EgetValidFile(createMockFileList(invalid))
  expect(result).toMatchObject(
    some(
      left({
        message:
          "Unsupported image format. Please upload APNG, AVIF, GIF, JPEG, PNG, SVG, or WebP.",
      }),
    ),
  )
})

test("EgetValidFile returns Some(Right) for a valid image file", () => {
  const valid = createMockFile(FILE_SIZE_LIMIT * 0.5, "image/png")
  const result = EgetValidFile(createMockFileList(valid))
  expect(result).toMatchObject(some(right({ validFile: valid })))
})

test("EgetValidFile accepts all supported MIME types", () => {
  const types = [
    "image/apng",
    "image/avif",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ]
  types.forEach((type) => {
    const file = createMockFile(
      FILE_SIZE_LIMIT * 0.5,
      type,
      `test.${type.split("/")[1]}`,
    )
    const result = EgetValidFile(createMockFileList(file))
    expect(result).toMatchObject(some(right({ validFile: file })))
  })
})

// isValidFile

test("isValidFile returns false for none", () => {
  expect(isValidFile(none)).toBe(false)
})

test("isValidFile returns true for Some(Right) with a valid file", () => {
  const file = createMockFile(FILE_SIZE_LIMIT * 0.5)
  const state = some(right({ validFile: file }))
  expect(isValidFile(state)).toBe(true)
})

test("isValidFile returns false for Some(Left) with a validity error", () => {
  const state = some(left({ errorType: 0, message: FILE_LIST_EMPTY_MESSAGE }))
  expect(isValidFile(state)).toBe(false)
})

test("isValidFile returns true for Some(Left) with a non-validity error", () => {
  // errorType 2 = UPLOAD_FAILURE, which is not a VALIDITY_ERROR (0)
  const state = some(
    left({ errorType: 2, message: "Could not upload image to server" }),
  )
  expect(isValidFile(state)).toBe(true)
})

// renderError

test("renderError returns an empty fragment for none", () => {
  const { container } = render(<>{renderError(none)}</>)
  expect(container.firstChild).toBeNull()
})

test("renderError renders the error message for Some(Left)", () => {
  const state = some(left({ errorType: 0, message: FILE_LIST_EMPTY_MESSAGE }))
  render(<>{renderError(state)}</>)
  expect(screen.getByText(FILE_LIST_EMPTY_MESSAGE)).toBeInTheDocument()
})

test("renderError returns an empty fragment for Some(Right)", () => {
  const file = createMockFile(FILE_SIZE_LIMIT * 0.5)
  const state = some(right({ validFile: file }))
  const { container } = render(<>{renderError(state)}</>)
  expect(container.firstChild).toBeNull()
})

// scaleDimensions

test("scaleDimensions scales width to baseWidth and adjusts height preserving aspect ratio", () => {
  const result = scaleDimensions({ width: 800, height: 400 }, 400)
  expect(result.width).toBe(400)
  expect(result.height).toBe(200)
})

test("scaleDimensions handles square images (aspect ratio 1:1)", () => {
  const result = scaleDimensions({ width: 500, height: 500 }, 400)
  expect(result.width).toBe(400)
  expect(result.height).toBe(400)
})

test("scaleDimensions handles portrait images", () => {
  const result = scaleDimensions({ width: 200, height: 400 }, 400)
  expect(result.width).toBe(400)
  expect(result.height).toBe(800)
})

// resolveDimensions

test("resolveDimensions resolves with height and width when image loads", async () => {
  let capturedOnload: (() => void) | undefined

  class MockImage {
    naturalHeight = 200

    naturalWidth = 400

    src = ""

    // eslint-disable-next-line class-methods-use-this
    set onload(onload_: () => void) {
      capturedOnload = onload_
    }

    // eslint-disable-next-line class-methods-use-this, no-empty-function
    set onerror(_onerror_: () => void) {}
  }

  vi.stubGlobal("Image", MockImage)

  const promise = resolveDimensions("http://example.com/image.png")
  capturedOnload?.()

  const result = await promise
  expect(result).toEqual({ height: 200, width: 400 })
  vi.unstubAllGlobals()
})
