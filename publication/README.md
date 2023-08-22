# publication

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/publication)
![GitHub action](https://github.com/dictyBase/publication/workflows/Node%20CI%20Develop/badge.svg)  
[![codecov](https://codecov.io/gh/dictyBase/publication/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/publication)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication)  
![Last commit](https://badgen.net/github/last-commit/dictyBase/publication/develop)  
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)

This is the [Publication](https://dictycr.org/publication/26088819) application to display publication information at dictyBase.

## Cloud Native Development

All dictyBase development is now done with cloud native development in mind. It is expected
that you have your own [Kubernetes](https://kubernetes.io/) cluster running. Documentation
for the cloud deployment process can be found at the [dictyBase Developer Docs](https://dictybase-docker.github.io/developer-docs).

To deploy an application manually, you can leave a `/deploy` comment inside of a pull request
or issue.

## Local Development

In order for this application's login system to work locally, you will need to
configure the list of providers.

- Copy the provided sample [clientConfig.sample.ts](common/utils/clientConfig.sample.ts) file
  to **clientConfig.ts** in the same folder.
- Add any provider names and their corresponding client IDs.
- All providers should have a matching counterpart in the
  [oauthConfig.ts](common/utils/oauthConfig.ts) file. Enter all of the
  configuration parameters for every new provider in that file.

```
$ cp common/utils/oauthConfig.sample.ts common/utils/oauthConfig.ts
```

After setting up the login providers, run `yarn`, to install the dependencies and finally, `yarn dev` to run the server in watch mode.

## Backend Requirements

This app requires the following services to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)

## Application Structure

```
.
common                          # Common features for entire app (that aren't components)
├── @types                      # Typescript type definitions
├── constants                   # Strings or namespaces used in the app
├── hooks                       # Hooks (ex. ApolloClient, Google, etc)
└── utils                       # Application utilities 
components                      # All React components
├── auth                        # Components related to auth
├── errors                      # Components that display errors
└── layout                      # Wrapper/Layout components
pages                           # Next.js router components
├── [id]                        # Pages that have a dynamic id param
└── load
public                          # Static files (images, fonts, etc.)
styles                          # Anything related to styling
__tests__                       # Jest tests
└── mocks                       # Mock data to replicate API calls
```
