## Table of Contents

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

## Code Style

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

- Use functional patterns to transform arrays of data
- Avoid using `null` or `undefined`. Wrap values in an `Option` type from `fp-ts`
- Use `pipe` for function composition
- Use `TaskEither` for async operations with error handling
- Use fp-ts array utilities for immutable transformations

```ts
// Use Option type instead of null/undefined
const getUserName =
  (user: { firstName: string, lastName: string } | null) => 
    pipe(
      user,
      OfromNullable, // Option<{ firstName: string, lastName: string }>
      Omatch(
        () => "No User",
        ({ firstName, lastName }) => `${firstName} ${lastName}`
      )
    )

// Use TaskEither for async operations
const fetchUserData = (id: string) => 
  pipe(
    TEDo,
    TEbind("token", () => getAccessToken()),
    TEbind("user", ({ token }) => fetchUser(id, token)),
    TEmap(({ user }) => user),
    TEmapLeft((error) => handleError(error))
  )

// Use fp-ts array utilities
const uniqueItems = pipe(
  items,
  Aconcat(newItems),
  Auniq(itemEq),
  Afilter((item) => item.isActive)
)
```
## Pattern Matching

The `ts-pattern` library is used for conditional logic, most often for conditionally rendering a component based on the result of a data query: 

```tsx
import { match } from "ts-pattern"

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
- Avoid ternary statements 

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

- Use **Vitest** as the testing framework
- Use **Testing Library** for component testing
- Avoid wrapping tests in `describe` blocks
- Write descriptive test names
- Separate mock data into dedicated files
- Use **Playwright** for E2E tests

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