import {
  useMethods,
} from "../store"
import { renderHook, act } from "@testing-library/react-hooks"
import "@testing-library/jest-dom"

describe("methods for managing counter state", () => {
  interface CounterState {
    value: number
  }
  const m = new Map()
  beforeAll(() => {
    const createMethods = function (state: CounterState) {
      return {
        increment: () => {
          state.value++
        },
        decrement: () => {
          state.value--
        },
        incrementByAmount: (amount: number) => {
          state.value += amount
        },
      }
    }
    m.set("setupMethods", createMethods)
  })
  beforeEach(() => {
    const initialState: CounterState = { value: 0 }
    const { result } = renderHook(() =>
      useMethods(m.get("setupMethods"), initialState),
    )
    m.set("result", result)
  })
  test("incrementing counter", () => {
    const result = m.get("result")
    const methods = result.current[1]
    expect(result.current[0].value).toBe(0)
    act(() => {
      methods.increment()
    })
    expect(result.current[0].value).toBe(1)
    act(() => {
      methods.increment()
    })
    expect(result.current[0].value).toBe(2)
    act(() => {
      methods.incrementByAmount(10)
    })
    expect(result.current[0].value).toBe(12)
  })
  test("decrementing counter", () => {
    const result = m.get("result")
    const methods = result.current[1]
    act(() => {
      methods.decrement()
    })
    expect(result.current[0].value).toBe(-1)
    act(() => {
      methods.incrementByAmount(10)
    })
    expect(result.current[0].value).toBe(9)
    act(() => {
      methods.decrement()
    })
    expect(result.current[0].value).toBe(8)
  })
})

describe("methods for managing authentication state", () => {
  enum Provider {
    google = "google",
    linkedin = "linkedin",
    orcid = "orcid",
  }

  interface AuthState {
    isAuthenticated: boolean
    token?: string
    user?: string
    provider?: Provider
    error?: any
  }
  const m = new Map()
  beforeAll(() => {
    const createMethods = function (state: AuthState) {
      const methods = new Map()
      methods.set("setAuthentication", (status: boolean) => {
        state.isAuthenticated = status
      })
      methods.set("setToken", (token: string) => {
        state.token = token
      })
      methods.set("setUser", (name: string) => {
        state.user = name
      })
      methods.set("setProvider", (p: Provider) => {
        state.provider = p
      })
      return Object.fromEntries(methods)
    }
    m.set("setupMethods", createMethods)
  })
  beforeEach(() => {
    const initialState: AuthState = {
      isAuthenticated: false,
      error: null,
    }
    const { result } = renderHook(() =>
      useMethods(m.get("setupMethods"), initialState),
    )
    m.set("result", result)
  })
  test("check for authentication status", () => {
    const result = m.get("result")
    const methods = result.current[1]
    expect(result.current[0].isAuthenticated).toBeFalsy()
    act(() => {
      methods.setAuthentication(true)
    })
    expect(result.current[0].isAuthenticated).toBeTruthy()
    act(() => {
      methods.setAuthentication(false)
    })
    expect(result.current[0].isAuthenticated).toBeFalsy()
  })
  test("check for user,provider and token", () => {
    const result = m.get("result")
    const { setToken, setUser, setProvider } = result.current[1]
    expect(result.current[0].token).toBeUndefined()
    expect(result.current[0].user).toBeUndefined()
    expect(result.current[0].provider).toBeUndefined()
    act(() => {
      setToken("token")
    })
    expect(result.current[0].token).toBe("token")
    act(() => {
      setUser("user")
    })
    expect(result.current[0].user).toBe("user")
    act(() => {
      setProvider("provider")
    })
    expect(result.current[0].provider).toBe("provider")
  })
})

