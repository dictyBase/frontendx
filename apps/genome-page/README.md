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

- [genefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/gene)
- [genecachefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/geneids)
- [uniprotcachefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/uniprot)
- [modware-user](https://github.com/dictyBase/modware-user) (used for login)
- [authserver](https://github.com/dictyBase/authserver)

It also relies on the navbar, footer and dashboard JSON files found in the
[migration-data](https://github.com/dictyBase/migration-data) repository. An example
of the necessary environmental variables can be found [here](.env.development).

## Application Structure

This was reconfigured to use the [create-react-app](https://github.com/facebook/create-react-app) structure and philosophy.
Please read their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
for more detailed information.

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
│       ├── components          # Generic components
│       ├── constants           # Static data (i.e. footer, navbar links)
│       ├── utils               # Application utilities
│   ├── features                # Main features of application
│       ├── Authentication      # Authentication-related components
│       ├── Blast               # Blast Tab components
│       ├── MainPage            # Component for the / route, displays example genes
│       ├── Ontology            # Gene Ontology Tab components
│       ├── Orthologs           # Orthologs Tab components
│       ├── ProteinInformation  # Protein Information Tab components
│       ├── Reference           # Reference Tab components
│       ├── Summary             # Gene Summary Tab components
│   ├── images                  # Images used in the application
│   ├── styles                  # Any shared styles for the app
│   └── index.js                # Application rendering
└──                             # Config files
```

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release)
and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit
(`git add ...`), use `npm run cz` and follow the prompts to categorize and provide
more details about your commit. Once complete, push your changes to whatever branch
you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the
release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN`
that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`)
or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically
determine the appropriate version number for your release.

## Further Documentation

More documentation can be found in the [docs](./docs) folder, including mockups,
wireframes and Redux shape of state diagrams.

## Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
