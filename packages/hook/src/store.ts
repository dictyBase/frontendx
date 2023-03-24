import {
  useMemo,
  createContext,
  useContext,
  createElement,
  ReactNode,
} from "react"
import { Reducer, useImmerReducer } from "use-immer"
import { Draft } from "immer"

export interface ReactChildren {
  children: ReactNode
}

interface PayloadAction {
  type: string
  payload?: any
}

/**
 * Object type for managing list of functions keyed by their names. These
 * functions manipulates the global state.
 */
export interface MethodBase {
  [index: string]: (payload?: any) => void
}

/**
 * Type definition for function that receive the state for manipulation.
 */
export interface CreateMethods<State> {
  (state: State): MethodBase
}

export interface WrappedMethods {
  [index: string]: (...payload: any) => void
}

/**
 * Options for {@link useContextProvider}
 */
export interface ContextProviderOptions<State> {
  /**{@link CreateMethods} that receives a mutable state*/
  reducer: CreateMethods<Draft<State>>
  /** initial mutable state */
  initialState: Draft<State>
}

interface CreateStateContextOptions<State> {
  state: Draft<State>
  methods: MethodBase
}

interface FuncWithAnyArgs<T> {
  (...args: any[]): T
}

/**
 * Wrapper for a function that will be restricted to be invoked only once. Any
 * further call to the function will return the result of first invocation.
 */
function once<T>(fn: FuncWithAnyArgs<T>): FuncWithAnyArgs<T> {
  let ran = false
  let ret: T
  return (...args) => {
    if (ran) return ret
    ret = fn(...args)
    ran = true
    return ret
  }
}

const createStateContext = once(
  <State>({ state, methods }: CreateStateContextOptions<State>) => {
    return createContext({ state, methods })
  },
)

/**
 * Provides a higher level hook instead of using [@link
 * https://reactjs.org/docs/hooks-reference.html#usereducer|useReducer]
 * directly. It receives a initial state an object with a list of functions that
 * manipulates the state. It returns the current state and the list of
 * previously passed functions to update the state. The state is managed by
 * [@link https://immerjs.github.io/immer/|immer].
 */
export function useMethods<State>(
  createMethods: CreateMethods<Draft<State>>,
  initialState: Draft<State>,
): [State, WrappedMethods] {
  const reducer = useMemo<Reducer<State, PayloadAction>>(
    () => (draftState: Draft<State>, action: PayloadAction) => {
      return createMethods(draftState)[action.type](...action.payload)
    },
    [createMethods],
  )
  const [state, dispatch] = useImmerReducer(reducer, initialState as State)
  const methods: WrappedMethods = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState))
    return actionTypes.reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload })
      return acc
    }, {} as WrappedMethods)
  }, [createMethods, initialState])
  return [state, methods]
}

/**
 * A {@link useMethods} based store/hook to manage global state in react
 * components. It uses {@link
 * https://reactjs.org/docs/hooks-reference.html#usecontext| react context} to
 * provide a [@link
 * https://reactjs.org/docs/context.html#contextprovider|Provider] component to
 * wrap a react components tree.
 */
export function useContextProvider<State>({
  reducer,
  initialState,
}: ContextProviderOptions<State>) {
  const [state, methods] = useMethods(reducer, initialState)
  const context = createStateContext({ state, methods })
  const provider = ({ children }: ReactChildren) => {
    return createElement(
      context.Provider,
      { value: { state, methods } },
      children,
    )
  }
  return provider
}

/**
 *
 */
export function useStore() {
  const ctx = useContext(createStateContext())
  if (ctx === undefined) {
    throw new Error("context must be used inside a provider")
  }
  return ctx
}
