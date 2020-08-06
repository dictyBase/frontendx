# Genomepage

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/Genomepage)  
![GitHub action](https://github.com/dictyBase/Genomepage/workflows/Node%20CI/badge.svg)
[![codecov](https://codecov.io/gh/dictyBase/Genomepage/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/Genomepage)  
[![Dependency Status](https://david-dm.org/dictyBase/Genomepage/develop.svg?style=flat-square)](https://david-dm.org/dictyBase/Genomepage/develop)
[![devDependency Status](https://david-dm.org/dictyBase/Genomepage/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictyBase/Genomepage/develop?type=dev)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictyBase/Genomepage)](https://codeclimate.com/github/dictyBase/Genomepage/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictyBase/Genomepage)](https://codeclimate.com/github/dictyBase/Genomepage/issues)
[![Maintainability percentage](https://badgen.net/codeclimate/maintainability-percentage/dictyBase/Genomepage)](https://codeclimate.com/github/dictyBase/Genomepage)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dictyBase/Genomepage)](https://dependabot.com)  
![Issues](https://badgen.net/github/issues/dictyBase/Genomepage)
![Open Issues](https://badgen.net/github/open-issues/dictyBase/Genomepage)
![Closed Issues](https://badgen.net/github/closed-issues/dictyBase/Genomepage)
![Total PRS](https://badgen.net/github/prs/dictyBase/Genomepage)
![Open PRS](https://badgen.net/github/open-prs/dictyBase/Genomepage)
![Closed PRS](https://badgen.net/github/closed-prs/dictyBase/Genomepage)
![Merged PRS](https://badgen.net/github/merged-prs/dictyBase/Genomepage)  
![Commits](https://badgen.net/github/commits/dictyBase/Genomepage/develop)
![Last commit](https://badgen.net/github/last-commit/dictyBase/Genomepage/develop)
![Branches](https://badgen.net/github/branches/dictyBase/Genomepage)
![Tags](https://badgen.net/github/tags/dictyBase/Genomepage)
![GitHub repo size](https://img.shields.io/github/repo-size/dictyBase/Genomepage?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictyBase/Genomepage?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictyBase/Genomepage)](https://codeclimate.com/github/dictyBase/Genomepage/code)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

This is the [Genomepage](https://testdb.dictybase.org/gene/gflB) application to display genomic information at dictyBase.

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

For auth/login purposes:

- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)
- [modware-auth](https://github.com/dictyBase/modware-auth)
- [modware-identity](https://github.com/dictyBase/modware-identity)
- [modware-user](https://github.com/dictyBase/modware-user)

## Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
