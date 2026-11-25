import { vi, test, expect, beforeEach, afterEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { left, right } from "fp-ts/Either"
import { useLogto } from "@logto/react"
import { useUpdateStrainMutation } from "dicty-graphql-schema"
import {
  useAuthorizedUpdateStrain,
  userInfoError,
  accessTokenError,
  updateFailureError,
} from "../catalog/useAuthorizedUpdateStrain"

vi.mock("@logto/react", () => ({
  useLogto: vi.fn(),
}))

vi.mock("dicty-graphql-schema", async () => {
  const actual = await vi.importActual<typeof import("dicty-graphql-schema")>(
    "dicty-graphql-schema",
  )
  return {
    ...actual,
    useUpdateStrainMutation: vi.fn(),
  }
})

const STRAIN_ID = "DBS0236123"
const UPDATED_LABEL = "updated-label"
const MOCK_EMAIL = "curator@dictybase.org"
const MOCK_TOKEN = "mock-access-token"
const MOCK_RESOURCE = "https://content.dictybase.dev/api"

const mockFetchUserInfo = vi.fn()
const mockGetAccessToken = vi.fn()
const mockUpdateStrain = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()

  mockFetchUserInfo.mockResolvedValue({
    email: MOCK_EMAIL,
  })
  mockGetAccessToken.mockResolvedValue(MOCK_TOKEN)
  mockUpdateStrain.mockResolvedValue({
    data: { updateStrain: { id: STRAIN_ID, updated_by: { id: "1" } } },
  })

  vi.mocked(useLogto).mockReturnValue({
    getAccessToken: mockGetAccessToken,
    fetchUserInfo: mockFetchUserInfo,
  } as unknown as ReturnType<typeof useLogto>)

  vi.mocked(useUpdateStrainMutation).mockReturnValue([
    mockUpdateStrain,
  ] as unknown as ReturnType<typeof useUpdateStrainMutation>)

  vi.stubEnv("VITE_APP_LOGTO_API_SECOND_RESOURCE", MOCK_RESOURCE)
})

afterEach(() => {
  vi.unstubAllEnvs()
})

test("updates strain with authorized token and user email", async () => {
  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(
    right({
      data: { updateStrain: { id: STRAIN_ID, updated_by: { id: "1" } } },
    }),
  )
  expect(mockFetchUserInfo).toHaveBeenCalled()
  expect(mockGetAccessToken).toHaveBeenCalledWith(MOCK_RESOURCE)
  expect(mockUpdateStrain).toHaveBeenCalledWith({
    variables: {
      id: STRAIN_ID,
      input: {
        label: UPDATED_LABEL,
        updated_by: MOCK_EMAIL,
      },
    },
    context: { headers: { Authorization: `Bearer ${MOCK_TOKEN}` } },
  })
})

test("returns userInfoError when fetchUserInfo rejects", async () => {
  mockFetchUserInfo.mockRejectedValueOnce(new Error("Auth error"))

  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(left(userInfoError))
  expect(mockUpdateStrain).not.toHaveBeenCalled()
})

test("returns userInfoError when userInfo is undefined", async () => {
  mockFetchUserInfo.mockResolvedValueOnce(undefined)

  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(left(userInfoError))
  expect(mockUpdateStrain).not.toHaveBeenCalled()
})

test("returns userInfoError when userInfo has no email", async () => {
  mockFetchUserInfo.mockResolvedValueOnce({ name: "Curator" })

  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(left(userInfoError))
  expect(mockUpdateStrain).not.toHaveBeenCalled()
})

test("returns accessTokenError when getAccessToken rejects", async () => {
  mockGetAccessToken.mockRejectedValueOnce(new Error("Token error"))

  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(left(accessTokenError))
  expect(mockUpdateStrain).not.toHaveBeenCalled()
})

test("returns updateFailureError when updateStrain mutation rejects", async () => {
  mockUpdateStrain.mockRejectedValueOnce(new Error("GraphQL error"))

  const { result } = renderHook(() => useAuthorizedUpdateStrain())
  const updateResult = await result.current(STRAIN_ID, {
    label: UPDATED_LABEL,
  })()

  expect(updateResult).toEqual(left(updateFailureError))
})
