# publication

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub action](https://github.com/dictyBase/publication/workflows/Node%20CI/badge.svg)
[![Dependency Status](https://david-dm.org/dictyBase/publication/develop.svg?style=flat-square)](https://david-dm.org/dictyBase/publication/develop)
[![devDependency Status](https://david-dm.org/dictyBase/publication/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictyBase/publication/develop?type=dev)
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/publication)  
![Commits](https://badgen.net/github/commits/dictyBase/publication/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/publication/develop)
![Branches](https://badgen.net/github/branches/dictyBase/publication)
![Tags](https://badgen.net/github/tags/dictyBase/publication)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/publication?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/publication?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication/code)  
![Issues](https://badgen.net/github/issues/dictyBase/publication)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/publication)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/publication)
![Total PRS](https://badgen.net/github/prs/dictyBase/publication)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/publication)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/publication)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/publication)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dictyBase/publication)](https://dependabot.com)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

This is the [Publication](https://testdb.dictybase.org/publication/26088819) application to display publication information at dictyBase.

## Cloud Native Development

All dictyBase development is now done with cloud native development in mind. It is expected
that you have your own [Kubernetes](https://kubernetes.io/) cluster running. Documentation
for the cloud deployment process can be found [here](https://github.com/dictyBase/Migration/tree/master/deployment).

The general idea is that after every git commit a new Docker image is built based on that commit,
pushed to Docker Hub, then the corresponding Helm chart is upgraded with that image tag
inside your cluster.

## Local Development

In order for this application's login system to work locally, you will need to
configure the list of providers.

- Copy the provided sample [clientConfig.sample.js](src/common/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
- Add any provider names and their corresponding client IDs.
- All providers should have a matching counterpart in the
  [oauthConfig.js](src/common/utils/oauthConfig.js) file. Fill up all of the
  configuration parameters for every new provider in that file.

After setting up the login providers, you can run `npm install` and `npm start` as usual.
There are also [husky](https://github.com/typicode/husky) scripts set up to run unit tests
on `pre-commit` and run [Skaffold](https://github.com/GoogleContainerTools/skaffold) on `post-commit`.

## Backend Requirements

This app requires the following services to be running:

- [pubfn](https://github.com/dictybase-playground/kubeless-gofn/tree/master/publication)
- [graphql-server](https://github.com/dictyBase/graphql-server)
- [modware-user](https://github.com/dictyBase/modware-user) (used for login)
- [authserver](https://github.com/dictyBase/authserver) (used for login)

It also relies on the navbar, footer and dashboard JSON files found in the
[migration-data](https://github.com/dictyBase/migration-data) repository. An example
of the necessary environmental variables can be found [here](.env.development).

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
│       ├── MainPage            # Component for the / route, displays example genes
│       ├── Publication         # All components related to publication retrieval/display
│   └── index.tsx               # Application rendering
└──                             # Config files
```

## Active Developers

<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
