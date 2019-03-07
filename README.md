# dictyBase GraphQL Schema

This repository contains [GraphQL schema](https://graphql.github.io/learn/schema/) for the dictyBase API.

The core [mutation](./mutation.graphql), [query](./query.graphql) and [scalar](./scalar.graphql) files are at root level. The actual [Types](https://graphql.org/learn/schema/#type-system) for our data are located in their own folders.

- [Order](./stock-center/order.graphql)
- [Publication](./publication/publication.graphql)
- [Stock](./stock-center/stock.graphql)
- [User](./user/user.graphql)

The queries, mutations and scalars have to be separated due to the way that `gqlgen` reads the schema. If we feed it `user.graphql` and `order.graphql`, for example, and both of them have a `Query` type, the script won't work. There can only be one unique type of that name.
