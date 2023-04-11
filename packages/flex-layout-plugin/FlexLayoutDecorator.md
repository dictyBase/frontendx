```mermaid
flowchart TD
    A[FlexLayoutDecorator Node]
    B[FlexLayout React Component]
    C[FlexRow Container]
    D[contentEditable Paragraph]
    E[function setText]

    A -- decorate method ---> B
    B -- renders ---> C
    C -- contains ---> D
    D -- onInput ---> E
    E --> A


```

## Caveats

-Since the contentEditable `<p>` is a child of `<FlexLayout />`, it is not represented as Lexical `ParagraphNode`. Instead, everything rendered by `<FlexLayout />` is represented as a single `FlexLayoutDecoratorNode`

-Trying to select the `<p>` in `<FlexLayout />` results in a null selection in the editor state

-Any features that rely on `<p>` having an associated ParagraphNode will likely need to be reimplemented somehow
