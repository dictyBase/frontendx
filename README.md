# dictyBase GraphQL Schema

This repository contains [GraphQL schema](https://graphql.github.io/learn/schema/) for the dictyBase API.

The queries, mutations and scalars have to be separated due to the way that `gqlgen` reads the schema. If we feed it `user.graphql` and `order.graphql`, for example, and both of them have a `Query` type, the script won't work. There can only be one unique type of that name.
