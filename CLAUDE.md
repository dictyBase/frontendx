# Table of Contents

__Coding Conventions__
- [Code Style](#code-style)
- [Functional Programming](#functional-programming)
- [Pattern Matching](#pattern-matching)

# Coding Conventions

## Code Style

- Use arrow function notation 

- Use arrow function expressions when possible
```typescript
// Compliant
const foo = () => "bar"

// Non-compliant
const foo = () => {
  return "bar"
}
```
- Use early returns when possible
```typescript
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

## Functional Programming

- Use functional patterns to transform arrays of data

- Avoid using `null` or `undefined`. Wrap values in an `Option` type from `fp-ts`

```typescript
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

```typescript
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
