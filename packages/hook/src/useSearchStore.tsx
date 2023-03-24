import { useReducer,useContext, createContext, Dispatch, ReactNode } from "react"

interface State {
  input?: string
  options: string[]
  chips: string[]
  active_chip?: string
  tag: boolean
}

type Action =
  | { type: "set_tag"; payload: boolean }
  | { type: "add_option"; payload: string }
  | { type: "add_options"; payload: string[] }
  | { type: "add_chip_value"; payload: string }
  | { type: "set_active_chip"; payload: string }
  | { type: "set_user_input"; payload: string }

function searchStoreReducer(state: State, action: Action) {
  switch (action.type) {
    case "set_tag":
      return { ...state, tag: action.payload }
    case "add_option":
      return { ...state, options: [...state.options, action.payload] }
    case "add_options":
      return { ...state, options: [...state.options, ...action.payload] }
    case "add_chip_value":
      return { ...state, chips: [...state.chips, ...action.payload] }
    case "set_active_chip":
      return { ...state, active_chip: action.payload }
    case "set_user_input":
      return { ...state, input: action.payload }
    default:
      throw new Error("Unhandled action type")
  }
}

interface SearchStoreContextType {
  state: State
  dispatch: Dispatch<Action>
}

interface SearchStoreProviderProps {
  children: ReactNode
}

const initialState: State = {
  tag: false,
  options: [],
  chips: []
}

const SearchStoreContext = createContext({} as SearchStoreContextType)

export function SearchStoreProvider({ children }: SearchStoreProviderProps) {
  const [state, dispatch] = useReducer(searchStoreReducer, initialState)
  const value = { state, dispatch }
  return (
    <SearchStoreContext.Provider value={value}>
      {children}
    </SearchStoreContext.Provider>
  )
}

export function useSearchStore() {
  const context = useContext(SearchStoreContext)
  if (context === undefined) {
    throw new Error("useSearchStore must be used within SearchStoreProvider")
  }
  return context
}
