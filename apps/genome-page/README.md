# Genomepage

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/genomepage)
![GitHub action](https://github.com/dictyBase/genomepage/workflows/Node%20CI%20Develop/badge.svg)  
[![codecov](https://codecov.io/gh/dictyBase/genomepage/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/genomepage)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictyBase/genomepage)](https://codeclimate.com/github/dictyBase/genomepage)  
![Last commit](https://badgen.net/github/last-commit/dictyBase/genomepage/develop)  
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)

This is the [Genomepage](https://dictycr.org/gene/gflB) web application to display genomic information at dictyBase.

## Cloud Native Development

All dictyBase development is now done with cloud native development in mind. It is expected
that you have your own [Kubernetes](https://kubernetes.io/) cluster running. Documentation
for the cloud deployment process can be found [here](https://github.com/dictyBase/Migration/tree/master/deployment).

The general idea is that after every git commit a new Docker image is built based on that commit,
pushed to Docker Hub, then the corresponding Helm chart is upgraded with that image tag
inside your cluster.

## Local Development

In order for this application to work locally, you will need to configure the list of
login providers.

- Copy the provided sample [clientConfig.sample.ts](src/common/utils/clientConfig.sample.ts) file
  to **clientConfig.ts** in the same folder.
- Add any provider names and their corresponding client IDs.
- All providers should have a matching counterpart in the
  [oauthConfig.ts](src/common/utils/oauthConfig.ts) file. Fill up all of the
  configuration parameters for every new provider in that file.

After setting up the login providers, you can run `yarn install` and `yarn start` as usual.

## Backend Requirements

This app requires the following services to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)

### Mock Server

In case the GraphQL server is unavailable or does not have the queries implemented, you can use the mock server by running the command:

```
yarn start:mock
```

This command makes use of the `NEXT_PUBLIC_MOCK_SERVER` environment variable while in development mode (`DEPLOY_ENV='development'`), which will activate the mock server that will intercept the requests made to the GraphQL server.

To update the data used by the mock server see [`src/mocks/handlers.ts`](https://github.com/dictyBase/genomepage/tree/develop/src/mocks/handlers.ts), and update the query and mock data accordingly.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.erichartline.net/"><img src="https://avatars3.githubusercontent.com/u/13489381?v=4" width="100px;" alt=""/><br /><sub><b>Eric Hartline</b></sub></a><br /><a href="https://github.com/dictyBase/genomepage/issues?q=author%3Awildlifehexagon" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/genomepage/commits?author=wildlifehexagon" title="Code">💻</a> <a href="https://github.com/dictyBase/genomepage/commits?author=wildlifehexagon" title="Documentation">📖</a> <a href="#design-wildlifehexagon" title="Design">🎨</a> <a href="#maintenance-wildlifehexagon" title="Maintenance">🚧</a> <a href="https://github.com/dictyBase/genomepage/commits?author=wildlifehexagon" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://cybersiddhu.github.com/"><img src="https://avatars3.githubusercontent.com/u/48740?v=4" width="100px;" alt=""/><br /><sub><b>Siddhartha Basu</b></sub></a><br /><a href="#maintenance-cybersiddhu" title="Maintenance">🚧</a> <a href="https://github.com/dictyBase/genomepage/issues?q=author%3Acybersiddhu" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/genomepage/commits?author=cybersiddhu" title="Code">💻</a> <a href="#content-cybersiddhu" title="Content">🖋</a> <a href="https://github.com/dictyBase/genomepage/commits?author=cybersiddhu" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Misc badges

![Issues](https://badgen.net/github/issues/dictyBase/genomepage)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/genomepage)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/genomepage)  
![Total PRS](https://badgen.net/github/prs/dictyBase/genomepage)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/genomepage)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/genomepage)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/genomepage)  
![Commits](https://badgen.net/github/commits/dictyBase/genomepage/develop)
![Branches](https://badgen.net/github/branches/dictyBase/genomepage)
![Tags](https://badgen.net/github/tags/dictyBase/genomepage)  
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/genomepage?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/genomepage?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/genomepage)](https://codeclimate.com/github/dictyBase/genomepage/code)
