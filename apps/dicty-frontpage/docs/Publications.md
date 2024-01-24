# Displaying Latest Publications

There exists a Paper component already that renders the latest papers on the front page. This proposed Paper component will reuse / replace this component.

note: loading and error handling for Paper component is currently omitted

```mermaid
flowchart TD

A[Papers]
B[SinglePaper]
H["useFetchPublication()"]
H1(["fetch XML String"])
H2(["Parse string -> XMLDocument"])
H3(["XMLDocument -> NodeList"])
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

## Data pipe

This diagram lays out the details of data pipe from when it is fetched to when it is transformed to `Array<PublicationItem>`, includes details about error handling

```mermaid
flowchart TD
A["Fetch(RSS_URL)"]
B(["HTTP Response"])
C(["Error String"])
D["ParseResponseToString"]
E(["XMLDocument"])
F(["NodeListOf#60;Element#62;"])
G(["Array#60;Element#62;"])
H(["Array#60;PublicationItem#62;"])

A -->|Runtime Error| C
A --> B
B --->|!200| C
B -->|200| D
D -->|Runtime Error| C
D -->|DOMParser.parseFromString| E
E -->|"querySelectorAll(item)"| F
F -->|Array Spread| G
G -->|Array Map| H
```

### Functional

```mermaid
flowchart TD
F1["RSS_URL"]
F2["createTaskEitherFetch"]
F3(["TaskEither#60;string, Response>"])
F4["parseResponseToString"]
F5(["TaskEither#60;string, string>"])
F6(["XML string"])
F7(["XMLDocument"])
F8(["NodeListOf#60;Element#62;"])
F9(["Array#60;Element#62;"])
F10(["Array#60;PublicationItem#62;"])
F11(["TaskEither#60;string, Array#60;PublicationItem#62;>"])

F1 --> F2
F2 --> |Runtime Error| F3
F2 -->|!200| F3
F2 -->|200| F3
F3 --> F4
F4 --> |Runtime Error| F5
F4 --> |Success| F5
F5 --> |right| F6
subgraph D7["extractPublicationItems"]
F6 -->|DOMParser.parseFromString| F7
F7 -->|"querySelectorAll(item)"| F8
F8 -->|Array Spread| F9
F9 -->|Array Map| F10
end
F10 --> F11
```
