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
### Migrate and setup for yarn v2
Run it only once, skip this if you have have already done so.
- Make sure you have at least __node version__ `14.17.x`
- Upgrade to or install latest version of yarn.
- Run `yarn set version berry`
- Run `yarn install`.
- __End of migration.__

### Regular development
- Run `yarn install`
- Create a new branch (i.e. `feature/new-schema`).
- Complete any necessary work.
- Run `yarn run compile`. It verify that the schema is valid, and it will auto
  add any new typings based on these updates.
- Commit all changes.
- When finished, merge to `develop`.

If you are ready to cut a new release, you can then merge into `master`. This
will trigger a GitHub Action that uses `semantic-release` to create a new tag/release
automatically.

See https://github.com/semantic-release/commit-analyzer#rules-matching or [`.releaserc.json`](https://github.com/dictyBase/dicty-graphql-schema/blob/develop/.releaserc.json) to learn more about how semantic versioning treats commits with different tags and scopes.
