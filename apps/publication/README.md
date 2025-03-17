# Publication

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/publication)
![GitHub action](https://github.com/dictyBase/publication/workflows/Node%20CI%20Develop/badge.svg)  
[![codecov](https://codecov.io/gh/dictyBase/publication/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/publication)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication)  
![Last commit](https://badgen.net/github/last-commit/dictyBase/publication/develop)  
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)

This is the [Publication](https://dictycr.org/publication/26088819) application to display publication information at dictyBase.


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
