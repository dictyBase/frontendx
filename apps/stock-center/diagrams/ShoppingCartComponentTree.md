```mermaid
---
title: Cart Component Tree
---

flowchart TD

A[CartHandler]
B[ShoppingCartList]
C[EmptyCart]
D[ShoppingCartItem]
E1[StrainTotalRow]
E2[PlasmidTotalRow]
E3[CumulativeTotalRow]
F[ContinueShoppingCard]

A -->|items| B
A --> C
B -->|items| D
B -->|strainItems| E1
B -->|plasmidItems| E2
B -->|items| E3
B --> F


classDef state fill:#ab3017
classDef unimplemented fill:#6e6c6b

class A,B state
class E2,E3 unimplemented
```
