```mermaid
flowchart TD
    A[dicty-frontpage]
    B[auth]
    D[footer]
    DI[dicty-image]
    F[functional]
    G[header]
    UIC[ui-common]
    UIF[ui-frontpage]
    UIU[ui-user]
    I[dicty-graphql-schema]
    J[editor]
    K[navbar]
    ET[editor-toolbar]
    IP[image-plugin]
    FLP[flex-layout-plugin]
    RI[resizable-image]
    PP[persistence-plugin]
    WP[width-table-plugin]
    TP[table-action-plugin]

    A --> B
    A --> UIC
    A --> UIF
    A --> UIU
    A --> J

    B --> D
    B --> G
    B --> K
    B --> UIC

    D --> F

    G --> F
    G --> DI

    UIC --> I
    UIC --> J
    
    J --> ET
    J --> PP
    J --> WP
    J --> TP

    ET --> I
    ET --> IP

    IP --> FLP
    IP --> RI


```


```mermaid
flowchart TD
    A[stock-center]
    B[auth]
    C[data-access]
    D[footer]
    DI[dicty-image]
    E[hook]
    F[hook-dsc]
    G[header]
    H[ui-dsc]
    UIC[ui-common]
    I[dicty-graphql-schema]
    J[editor]
    K[navbar]
    FC[frontpage-components]
    ET[editor-toolbar]
    IP[image-plugin]
    FLP[flex-layout-plugin]
    RI[resizable-image]
    PP[persistence-plugin]
    WP[width-table-plugin]
    TP[table-action-plugin]
    DF[functional]

    A --> C
    A --> B
    A --> E
    A --> F
    A --> H
    H --> FC
    H ---> J
    H --> I
    ET --> IP
    IP --> FLP
    IP --> RI
    J --> PP
    J --> WP
    J --> ET
    J --> TP
    B --> D
    B --> G
    B --> K
    B --> UIC
    G --> DF
    G ---> DI
    D --> DF
```
