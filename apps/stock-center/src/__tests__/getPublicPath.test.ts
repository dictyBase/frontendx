import { vi, test, expect, afterEach } from "vitest"
import { getPublicPath } from "../getPublicPath"

/** File path used as the input in the tests below. */
const FILE_PATH = "documents/report.pdf"

/** Expected url when the app is deployed under /stockcenter. */
const EXPECTED_SUB_PATH = "/stockcenter/documents/report.pdf"

/** Expected url when the app is at the document root. */
const EXPECTED_ROOT_PATH = "/documents/report.pdf"

afterEach(() => {
  vi.unstubAllEnvs()
})

test("prefixes the file path with the application basename", () => {
  vi.stubEnv("VITE_APP_BASENAME", "/stockcenter")
  expect(getPublicPath(FILE_PATH)).toBe(EXPECTED_SUB_PATH)
})

test("does not duplicate trailing slashes in the basename", () => {
  vi.stubEnv("VITE_APP_BASENAME", "/stockcenter/")
  expect(getPublicPath(FILE_PATH)).toBe(EXPECTED_SUB_PATH)
})

test("does not duplicate leading slashes in the file path", () => {
  vi.stubEnv("VITE_APP_BASENAME", "/stockcenter")
  expect(getPublicPath(`/${FILE_PATH}`)).toBe(EXPECTED_SUB_PATH)
})

test("returns a root relative path when the application runs at the root", () => {
  vi.stubEnv("VITE_APP_BASENAME", "/")
  expect(getPublicPath(FILE_PATH)).toBe(EXPECTED_ROOT_PATH)
})

test("returns a root relative path when no basename is configured", () => {
  vi.stubEnv("VITE_APP_BASENAME", "")
  expect(getPublicPath(FILE_PATH)).toBe(EXPECTED_ROOT_PATH)
})

test("returns a root relative path when the basename is undefined", () => {
  vi.stubEnv("VITE_APP_BASENAME", undefined)
  expect(getPublicPath(FILE_PATH)).toBe(EXPECTED_ROOT_PATH)
})
