# CRITICAL RULES - READ FIRST

These rules are **MANDATORY** and **NON-NEGOTIABLE**:

1. **NEVER** use `null` or `undefined` → **ALWAYS** use `Option` from fp-ts
2. **NEVER** use `async/await` with `try/catch` → **ALWAYS** use `TaskEither` from fp-ts
3. **NEVER** use native array methods (`.map`, `.filter`, `.find`) → **ALWAYS** use fp-ts/Array
4. **NEVER** use ternary operators in functional code → **ALWAYS** use `match` from ts-pattern
5. **NEVER** use function declarations → **ALWAYS** use arrow functions
6. **NEVER** use default exports → **ALWAYS** use named exports
7. **NEVER** use `npm` → **ALWAYS** use `yarn workspace`

## Table of Contents

- [Work Flow](#work-flow)
- [Code Style](#code-style)
- [Import Organization](#import-organization)
- [Naming Conventions](#naming-conventions)
- [Component Structure](#component-structure)
- [TypeScript Patterns](#typescript-patterns)
- [Functional Programming](#functional-programming)
- [Pattern Matching](#pattern-matching)
- [State Management](#state-management)
- [Error Handling](#error-handling)
- [GraphQL and API](#graphql-and-api)
- [Testing](#testing)
- [Performance Patterns](#performance-patterns)
- [File Organization](#file-organization)

## Work Flow

- After a discrete task has been completed that involved any code changes, run verifications before commiting the code.
  - Verfications include:
      - Linting (both with `yarn lint` and `yarn oxlint`)
      - Unit Tests
      - Build
      - E2E Tests (testing for any visual regression when applicable)

- Changes that fundamentally affect the build of an application should be verified by building the docker image, running the container, and running E2E tests against it. Specific task related changes should also be investigated for regression.

## Code Style

- If you find yourself using a literal value >= 3 times, define a constant for it.

- Use arrow function notation 

- Use arrow function expressions when possible

```ts
// Compliant
const foo = () => "bar"

// Non-compliant
const foo = () => {
  
}
```
- Use early returns when possible
```ts
// Compliant
const handleData = (data: Data) => {
  if (!data) handleFalsyData()
  if (!data.isValid()) handleInvalidData()

  doSomething(data)
}

// Non-compliant
const handleData = (data: Data) => {
  if (data && data.isValid()) {
    doSomething(data)
  } else if (!data) {
    handleFalsyData()
  } else if (!data.isValid()) {
    handleInvalidData()
  }
}

```
- Prefer object destructuring

## Import Organization

- Organize imports in a consistent order:
  1. External libraries first
  2. Internal packages second (@dictybase/* packages)
  3. Relative imports last
  4. Group by functionality

```ts
// External libraries
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import { useNavigate } from "react-router-dom"

// Internal packages
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { useContentBySlugQuery } from "dicty-graphql-schema"

// Relative imports
import { ShowView } from "./ShowView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
```

## Naming Conventions

- **PascalCase** for components and types
- **camelCase** for functions, variables, and hooks
- **UPPER_CASE** for constants and environment variables
- **Props types** should end with `Properties`

```ts
// Components and types
type EditableViewProperties = { ... }
const EditableView = () => { ... }

// Functions and hooks
const useAuthorizedUpdate = () => { ... }
const truncateEmail = (email: string) => { ... }

// Constants
const NAMESPACE = "dicty-frontpage"
const MAX_ITEMS = 12
```

## Component Structure

- Use arrow function components (no class components)
- Use named exports over default exports
- Define prop types as TypeScript interfaces/types
- Separate presentation and logic concerns

```tsx
// Define prop types
type MyComponentProperties = {
  title: string
  isActive: boolean
}

// Arrow function component with named export
const MyComponent = ({ title, isActive }: MyComponentProperties) => {
  // Hooks at the top
  const navigate = useNavigate()
  const [state, setState] = useState(false)
  
  // Event handlers
  const handleClick = () => { ... }
  
  // Render
  return <div>...</div>
}

export { MyComponent }
```

## TypeScript Patterns

- Use explicit type definitions for all props, parameters, and return types
- Use type-only imports when applicable
- Use enums for constant values
- Avoid `any` type

```ts
// Type-only imports
import type { StrainCartItem, PlasmidCartItem } from "./types"

// Enums for constants
enum ErrorType {
  MISSING_CONTENT_ID,
  ACCESS_TOKEN_ERROR,
  USER_INFO_ERROR,
}

// Explicit return types
const calculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price, 0)
```

## Functional Programming

**CRITICAL RULES - MUST FOLLOW:**

### 1. NULL/UNDEFINED HANDLING
**NEVER** return or accept `null` or `undefined` in function signatures. **ALWAYS** use `Option` type from `fp-ts`.

```ts
// NON-COMPLIANT - Do NOT do this
const getUser = (id: string): User | null => {
  if (!users[id]) return null
  return users[id]
}

const userName = user ? user.name : "Unknown"

// COMPLIANT - Do this instead
import { Option as O, pipe } from "fp-ts/function"
import * as O from "fp-ts/Option"

const getUser = (id: string): O.Option<User> =>
  pipe(
    users[id],
    O.fromNullable
  )

const userName = pipe(
  getUser(id),
  O.match(
    () => "Unknown",
    (user) => user.name
  )
)
```

### 2. ASYNC OPERATIONS
**NEVER** use raw `async/await` with `try/catch`. **ALWAYS** use `TaskEither` from `fp-ts` for async operations.

```ts
// NON-COMPLIANT - Do NOT do this
const fetchData = async (id: string) => {
  try {
    const token = await getAccessToken()
    const response = await fetch(`/api/data/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

// COMPLIANT - Do this instead
import { TaskEither as TE, pipe } from "fp-ts/function"
import * as TE from "fp-ts/TaskEither"

type FetchError =
  | { type: "TOKEN_ERROR"; message: string }
  | { type: "NETWORK_ERROR"; message: string }
  | { type: "PARSE_ERROR"; message: string }

const fetchData = (id: string): TE.TaskEither<FetchError, Data> =>
  pipe(
    TE.Do,
    TE.bind("token", () => getAccessToken()),
    TE.bind("response", ({ token }) =>
      TE.tryCatch(
        () => fetch(`/api/data/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        (error) => ({
          type: "NETWORK_ERROR" as const,
          message: String(error)
        })
      )
    ),
    TE.bind("data", ({ response }) =>
      TE.tryCatch(
        () => response.json(),
        (error) => ({
          type: "PARSE_ERROR" as const,
          message: String(error)
        })
      )
    ),
    TE.map(({ data }) => data)
  )
```

### 3. FUNCTION COMPOSITION
**ALWAYS** use `pipe` for composing multiple operations. **NEVER** chain operations imperatively.

```ts
// NON-COMPLIANT - Do NOT do this
const result = items.filter(x => x.active)
  .map(x => x.value)
  .reduce((sum, x) => sum + x, 0)

// COMPLIANT - Do this instead
import { pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"

const result = pipe(
  items,
  A.filter((x) => x.active),
  A.map((x) => x.value),
  A.reduce(0, (sum, x) => sum + x)
)
```

### 4. ARRAY TRANSFORMATIONS
**ALWAYS** use fp-ts array utilities (`fp-ts/Array`). **NEVER** use native array methods for transformations.

```ts
// NON-COMPLIANT - Do NOT do this
const activeItems = items.filter(item => item.isActive)
const uniqueIds = [...new Set(items.map(item => item.id))]
const firstActive = items.find(item => item.isActive)

// COMPLIANT - Do this instead
import { pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"
import { Eq } from "fp-ts/Eq"

const activeItems = pipe(
  items,
  A.filter((item) => item.isActive)
)

const idEq: Eq<Item> = {
  equals: (a, b) => a.id === b.id
}

const uniqueItems = pipe(
  items,
  A.uniq(idEq)
)

const firstActive: O.Option<Item> = pipe(
  items,
  A.findFirst((item) => item.isActive)
)
```

### 5. CONDITIONAL LOGIC IN FUNCTIONS
**NEVER** use ternary operators or if/else chains in functional code. **ALWAYS** use `match` from `ts-pattern` or fp-ts pattern matching.

```ts
// NON-COMPLIANT - Do NOT do this
const getStatusMessage = (status: Status) => {
  return status === "loading" ? "Loading..." :
         status === "error" ? "Error occurred" :
         status === "success" ? "Success!" : "Unknown"
}

// COMPLIANT - Do this instead
import { match } from "ts-pattern"

const getStatusMessage = (status: Status) =>
  match(status)
    .with("loading", () => "Loading...")
    .with("error", () => "Error occurred")
    .with("success", () => "Success!")
    .otherwise(() => "Unknown")
```

### 6. COMMON FP-TS IMPORT PATTERNS

```ts
// Standard fp-ts imports for functional programming
import { pipe } from "fp-ts/function"
import * as O from "fp-ts/Option"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as NEA from "fp-ts/NonEmptyArray"
```

### Common Functional Programming Mistakes to Avoid

1. **AVOID: Returning null/undefined** → **USE: Option**
2. **AVOID: Using try/catch with async/await** → **USE: TaskEither**
3. **AVOID: Native array methods (.map, .filter, .find)** → **USE: fp-ts/Array**
4. **AVOID: Ternary operators in functional code** → **USE: pattern matching**
5. **AVOID: Imperative loops (for, while)** → **USE: fp-ts array utilities**
6. **AVOID: Mutating data** → **USE: immutable transformations with pipe**
## Pattern Matching

**CRITICAL:** The `ts-pattern` library is **MANDATORY** for all conditional logic.

### Core Rules

1. **NEVER** use ternary operators (`condition ? a : b`)
2. **NEVER** use if/else chains for conditional rendering
3. **ALWAYS** use `match` from `ts-pattern` for conditional logic
4. **ALWAYS** use `.otherwise()` as the final clause (never omit it)

### Pattern Matching for Component Rendering

Most commonly used for conditionally rendering components based on query results:

```tsx
import { match, P } from "ts-pattern"

// NON-COMPLIANT - Do NOT do this
const Show = () => {
  const result = useContentBySlugQuery({ variables: { slug } })

  if (result.loading) return <FullPageLoadingDisplay />
  if (result.error) return <ErrorPageWrapper error={result.error} />
  if (result.data?.contentBySlug) return <ShowView data={result.data.contentBySlug} />
  return <div>No content</div>
}

// COMPLIANT - Do this instead
const Show = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })

  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <ShowView data={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}
```

### Pattern Matching for Values

```tsx
// NON-COMPLIANT - Do NOT do this
const getStatusColor = (status: Status) => {
  if (status === "success") return "green"
  if (status === "error") return "red"
  if (status === "pending") return "yellow"
  return "gray"
}

// ALSO NON-COMPLIANT - Do NOT do this
const getStatusColor = (status: Status) =>
  status === "success" ? "green" :
  status === "error" ? "red" :
  status === "pending" ? "yellow" : "gray"

// COMPLIANT - Do this instead
const getStatusColor = (status: Status) =>
  match(status)
    .with("success", () => "green")
    .with("error", () => "red")
    .with("pending", () => "yellow")
    .otherwise(() => "gray")
```

### Pattern Matching with P.select for Data Extraction

Use `P.select()` to extract and transform matched data:

```tsx
// Extract specific fields from complex objects
const result = match(apiResponse)
  .with(
    { status: "success", data: P.select() },
    (data) => processData(data)
  )
  .with(
    { status: "error", error: P.select() },
    (error) => handleError(error)
  )
  .otherwise(() => handleUnknown())
```

### Pattern Matching Order

**ALWAYS** order patterns from most specific to least specific:

```tsx
// COMPLIANT - Specific patterns first
return match(result)
  .with({ data: P.select() }, (data) => <Content data={data} />)
  .with({ loading: true }, () => <Loading />)
  .with({ error: P.select() }, (error) => <Error error={error} />)
  .otherwise(() => <Fallback />)
``` 

## State Management

- Use **Jotai atoms** for global state management
- Create **derived atoms** for computed state
- Use **split atoms** for list management
- Keep local UI state with `useState`
- Use **Apollo Client** for server state

```ts
// Base atom
const cartAtom = atom<Cart>(initialCart)

// Derived atom for computed state
const totalPriceAtom = atom(
  (get) => get(cartAtom).items.reduce((sum, item) => sum + item.price, 0)
)

// Write-only atom for actions
const addItemAtom = atom(
  null,
  (get, set, newItem: CartItem) => {
    set(cartAtom, (prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }
)

// Split atom for list management
const itemAtomsAtom = splitAtom(itemsAtom)
```

## Error Handling

- Use typed error objects with specific error types
- Handle errors functionally with `TaskEither`
- Use error wrapper components for consistent UI
- Use pattern matching for error state rendering

```ts
// Typed error objects
type ContentError = {
  errorType: ErrorType
  message: string
}

const userInfoError: ContentError = {
  errorType: ErrorType.USER_INFO_ERROR,
  message: "Could not get user info",
}

// Functional error handling with pattern matching
const handleUpdate = pipe(
  fetchData(),
  TEmapLeft((error) =>
    match(error)
      .with({ errorType: ErrorType.ACCESS_TOKEN_ERROR }, () =>
        handleTokenError(),
      )
      .with({ errorType: ErrorType.USER_INFO_ERROR }, () => handleUserError())
      .otherwise(() => handleGenericError()),
  ),
)
```

## GraphQL and API

- Use **Apollo Client** with code-generated types
- Create custom hooks for queries and mutations
- Handle loading and error states with pattern matching
- Add authorization headers in context

```ts
// Custom hook for authorized mutations
const useAuthorizedUpdate = (contentId: string) => {
  const { getAccessToken } = useLogto()
  const [updateContent] = useUpdateContentMutation()

  return async (content: string) => {
    const token = await getAccessToken()
    return updateContent({
      variables: { input: { id: contentId, content } },
      context: { headers: { Authorization: `Bearer ${token}` } }
    })
  }
}

// Query with pattern matching for state handling
const MyComponent = () => {
  const result = useContentQuery({ variables: { id } })
  
  return match(result)
    .with({ loading: true }, () => <LoadingDisplay />)
    .with({ data: P.select() }, (data) => <ContentView data={data} />)
    .with({ error: P.select() }, (error) => <ErrorDisplay error={error} />)
    .otherwise(() => null)
}
```
## Testing

- Write unit tests for changes in code, where possible.
- Use **Vitest** as the testing framework
- Use **Testing Library** for component testing
- Avoid wrapping tests in `describe` blocks
- Write descriptive test names
- Separate mock data into dedicated files
- Use **Playwright** for E2E tests
- Do not call `expect` conditionally. Prefer type assertions.

```tsx
// Tests at top level, no describe blocks
test("should render its title", () => {
  render(<Link {...properties} />)
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})

test("should have the correct href", () => {
  render(<Link {...properties} />)
  expect(screen.getByRole("link")).toHaveAttribute("href", "google.com")
})

// Descriptive test names
test("returns seconds for recent times", () => {
  const date = new Date(Date.now() - 30 * 1000)
  expect(timeSince(date.toISOString())).toBe("30 seconds")
})

// Component testing with Testing Library
test("should display capacity full message when reaching 12 items", () => {
  render(
    <MemoryRouter>
      <StrainAvailableDisplay cartData={mockCartData} />
    </MemoryRouter>
  )
  expect(screen.getByText(/Add to Cart/)).toBeInTheDocument()
})
```

## Performance Patterns

- Use `React.memo` for expensive components
- Use `useMemo` and `useCallback` appropriately
- Implement code splitting at route level
- Use lazy loading for heavy components

```tsx
// Memoized component
const ExpensiveList = React.memo(({ items }: ListProps) => {
  return items.map(item => <Item key={item.id} {...item} />)
})

// Memoized calculations
const MyComponent = ({ data }: Props) => {
  const processedData = useMemo(
    () => expensiveCalculation(data),
    [data]
  )
  
  const handleClick = useCallback(
    (id: string) => {
      // Handle click
    },
    [dependency]
  )
  
  return <div>...</div>
}

// Route-based code splitting
const LazyComponent = lazy(() => import('./HeavyComponent'))
```

## File Organization

- **Feature-based folder structure** in apps
- **Shared packages** in monorepo for reusability
- Clear separation of concerns:
  - `components/` - React components
  - `hooks/` - Custom hooks
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
  - `constants/` - Constants and configuration
  - `__tests__/` - Test files

```
.
├── apps/
│   ├── dicty-frontpage/
│   │   └── src/
│   │       ├── features/           # Feature-based organization
│   │       │   ├── EditablePages/
│   │       │   ├── Frontpage/
│   │       │   └── Publication/
│   │       ├── common/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   ├── utils/
│   │       │   ├── constants/
│   │       │   └── types/
│   │       └── __tests__/
│   ├── genome-page/
│   └── stock-center/
│
└── packages/                       # Shared packages
    ├── ui-common/
    ├── data-access/
    ├── auth/
    ├── editor/
    ├── navbar/
    ├── footer/
    └── hook/
```
- To run scripts for a specific project, use the command `yarn workspace <project-name> <command>
- Don't use `npm` to manage project dependencies. Use `yarn` instead
