## Table of Contents

__Coding Conventions__
- [Code Style](#code-style)
- [Import Organization](#import-organization)
- [Naming Conventions](#naming-conventions)
- [Functional Programming](#functional-programming)
- [Pattern Matching](#pattern-matching)
- [State Management](#state-management)
- [Testing](#testing)

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

## Functional Programming

- Use functional patterns to transform arrays of data

- Avoid using `null` or `undefined`. Wrap values in an `Option` type from `fp-ts`

```ts
// Compliant
const getUserName =
  (user: { firstName: string, lastName: string } | null) => 
    pipe(
      data,
      OfromNullable, // Option<{ firstName: string, lastName: string }>
      Omatch(
        () => "No User"
        ({ firstName, lastName }) => `${firstName} ${lastName}`
      )
    )

// Non-compliant
const getUserName =
  (user: { firstName: string, lastName: string } | null) => {
    if (!user) return "No user"
    return `${user.firstName} ${user.lastName}`
}

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


## Testing

Avoid wrapping tests in a `describe` block

```tsx
// Compliant
test("should render its title", () => {
  render(<Link {...properties} />)
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})
test("should have the correct href", () => {
  render(<Link {...properties} />)
  expect(screen.getByRole("link")).toHaveAttribute("href", "google.com")
})

// Non-compliant
describe("Link component", () => {
  test("should render its title", () => {
    render(<Link {...properties} />)
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
  test("should have the correct href", () => {
    render(<Link {...properties} />)
    expect(screen.getByRole("link")).toHaveAttribute("href", "google.com")
  })
})
```
