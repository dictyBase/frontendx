# dicty-graphql-schema

This repository contains [GraphQL schema](https://graphql.github.io/learn/schema/) and TypeScript typings for the dictyBase API.

All schema, queries and mutations are inside the `src` folder. Separate files are used to offer distinction between the different data models.

> NOTE: The queries, mutations and scalars inside the `schema` folder have to be separated due to the way that `gqlgen` reads the schema. If we feed it `user.graphql` and `order.graphql`, for example, and both of them have a `Query` type, the script won't work. There can only be one unique type of that name.

## Install

The typings can be directly used throughout dictyBase frontend web applications.

`yarn add dictyBase/dicty-graphql-schema`

For a particular version (check tags/release first)  
 `yarn add dictyBase/dicty-graphql-schema#v1.0.0`

## Development Guide

- Clone the `develop` branch of this repository.
- Run `yarn`.
- Create a new branch (i.e. `feature/new-schema`).
- Complete any necessary work.
- Commit any changes. A `husky` hook will run precommit to verify that the schema is valid, and it will auto add any new typings based on these updates.
- When finished, merge to `develop`.

If you are ready to cut a new release, you can then merge into `master`. This
will trigger a GitHub Action that uses `semantic-release` to create a new tag/release
automatically.
