```mermaid
---
title: Order Flow
---

flowchart TD

A["`View Shopping Cart
`"]
A1[With Items]
A2[No Items]
B["`Checkout
`"]
B1[Continue Shopping]
C[Shipping Page]
D[Payment Page]
E[Submit Page]
F[Confirmation Page]
X[Previous]

X -->|/cart| A
A --> A1
A --> A2
A1 -->|/order| B
A1 --> B1
A2 --> B1
B -->  C
C --> D
D --> E
E --> |/order/submited/:id|F

classDef page fill:#ab3017
class A,B,C,D,E,F page
```
