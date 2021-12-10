# publication

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

After setting up the login providers, you can run `yarn` and `yarn dev` as usual.

## Backend Requirements

This app requires the following services to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)

## Application Structure

```
.
├── public                      # Index.html and favicon
├── src                         # Application source code
│   ├── app                     # Application level components
│       ├── actions             # Actions used for the entire app (i.e. footer, navbar)
│       ├── layout              # Main app template
│       ├── reducers            # Redux reducers
│       ├── routes              # React Router routes
│       ├── store               # Redux store configuration
│   ├── common                  # Common features for entire app
│       ├── @types              # Typescript type definitions
│       ├── assets              # Images, fonts, etc.
│       ├── components          # Generic components
│       ├── constants           # Static data (i.e. footer, navbar links)
│       ├── utils               # Application utilities
│   ├── features                # Main features of application
│       ├── Authentication      # Authentication-related components
│       ├── Publication         # All components related to publication retrieval/display
│   └── index.tsx               # Application rendering
└──                             # Config files
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.erichartline.net/"><img src="https://avatars3.githubusercontent.com/u/13489381?v=4" width="100px;" alt=""/><br /><sub><b>Eric Hartline</b></sub></a><br /><a href="https://github.com/dictyBase/publication/issues?q=author%3Awildlifehexagon" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/publication/commits?author=wildlifehexagon" title="Code">💻</a> <a href="https://github.com/dictyBase/publication/commits?author=wildlifehexagon" title="Documentation">📖</a> <a href="#design-wildlifehexagon" title="Design">🎨</a> <a href="#maintenance-wildlifehexagon" title="Maintenance">🚧</a> <a href="https://github.com/dictyBase/publication/commits?author=wildlifehexagon" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://cybersiddhu.github.com/"><img src="https://avatars3.githubusercontent.com/u/48740?v=4" width="100px;" alt=""/><br /><sub><b>Siddhartha Basu</b></sub></a><br /><a href="#maintenance-cybersiddhu" title="Maintenance">🚧</a> <a href="https://github.com/dictyBase/publication/issues?q=author%3Acybersiddhu" title="Bug reports">🐛</a> <a href="https://github.com/dictyBase/publication/commits?author=cybersiddhu" title="Code">💻</a> <a href="#content-cybersiddhu" title="Content">🖋</a> <a href="https://github.com/dictyBase/publication/commits?author=cybersiddhu" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Misc badges

![Issues](https://badgen.net/github/issues/dictyBase/publication)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/publication)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/publication)  
![Total PRS](https://badgen.net/github/prs/dictyBase/publication)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/publication)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/publication)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/publication)  
![Commits](https://badgen.net/github/commits/dictyBase/publication/develop)
![Branches](https://badgen.net/github/branches/dictyBase/publication)
![Tags](https://badgen.net/github/tags/dictyBase/publication)  
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/publication?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/publication?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication/code)
