```mermaid
---
title: Cart Total
---

flowchart TD

A[ShoppingCartList]
B[ShoppingCartTotalCard]
C[StrainTotalRow]
D[PlasmidTotalRow]
E[CumulativeTotalRow]

f{ filter items }

A -- items --> B
B -- items --> f
B ---> E
f -- strains items --> C
f -- plasmids items --> D
```
