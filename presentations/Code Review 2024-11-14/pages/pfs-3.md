# parseFormattedStringToDomElements Refactor
 
- The **interleaving** logic is rewritten and separated into a generalized function
- parseFormattedStringToDomElements is moved to from `publication` app to the `@dictybase/ui-common` package
  - can now be shared between `@dictybase/ui-dsc` and `publication`

```mermaid
flowchart LR

A[Publication]
X[parseFormattedStringToDomElements]

A --> X
```
after
```mermaid
flowchart LR

A[Publication]
B[ui-common]
C[ui-dsc]
X[parseFormattedStringToDomElements]

A --> C
B --> C
C --> X
```
