# Displaying Latest Publications

note: loading and error handling for Paper component is currently omitted

```mermaid
flowchart TD

A[Papers]
B[SinglePaper]
H["useFetchPublication()"]
H1(["fetch XML String"])
H2(["Parse string -> XMLDocument"])
H3(["XML -> NodeList"])
H4(["NodeList -> PublicationItem[]"])
R(["{ data, loading, error }"])

A --> H
A ------->|"single publication item"| B

H --> H1 -->|data| H2 --> H3 --> H4 --> R
H1 -->|error| R --> A


```

## Type

```ts
type PublicationItem = {
  title: string
  link: string
  description: string
  date: string
}
```
