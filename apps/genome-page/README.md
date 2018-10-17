## Master branch

[![Build Status](https://travis-ci.org/dictyBase/Genomepage.svg?branch=master)](https://travis-ci.org/dictyBase/Genomepage)
[![Dependency Status](https://david-dm.org/dictybase/genomepage/master.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/master)
[![devDependency Status](https://david-dm.org/dictybase/genomepage/master/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/master?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Develop branch

[![Build Status](https://travis-ci.org/dictyBase/Genomepage.svg?branch=develop)](https://travis-ci.org/dictyBase/Genomepage)
[![Dependency Status](https://david-dm.org/dictybase/genomepage/develop.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/develop)
[![devDependency Status](https://david-dm.org/dictybase/genomepage/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/develop?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Web application to display genomic information at dictyBase

- [Development](#development)
  - [Configuration](#configuration)
    - [Providers](#providers)
    - [Auth server](#auth-server)
    - [API server](#api-server)
    - [Navbar and footer](#navbar-and-footer)
  - [Semantic Versioning](#semantic-versioning)
  - [Running the application(dev version)](#running-the-application-dev-version)
  - [Application Structure](#application-structure)
- [Deployment](#deployment)

# Development

- First clone this repository.
- Next configure the application as described below.

## Configuration

### Providers

- This is the most important part and it is absolutely needed to run the application.
- Copy the provided sample [clientConfig.sample.js](src/utils/clientConfig.sample.js) file
  to **clientConfig.js** in the same folder.
- Then add the provider names and their corresponding client IDs.
- All the providers should have a matching counterpart in the
  [oauthConfig.js](src/common/utils/oauthConfig.js) file. Fill up all the
  configuration parameters for every new provider in that file.
- For each of the provider names, a corresponding login button will be shown
  in the login route. The list of supported buttons are given
  [here](http://fontawesome.io/icons/#brand)

### Auth server

- By default, the application expects it to run on `https://betatoken.dictybase.local`
- The url of the auth server can be configured by **REACT_APP_AUTH_SERVER** environmental variable.
- The binaries for the auth server can be downloaded from its release
  [page](https://github.com/dictyBase/authserver/releases). Download the one that is
  suitable for your OS and make sure you always use the latest one.
- The **REACT_APP_AUTH_SERVER** env variable can also be customized by modifying the
  global variable in the [env](.env.development) file.

### API server

- By default, the application expects it to run on `https://betafunc.dictybase.local`
- The url of the auth server can be configured by **REACT_APP_API_SERVER** environmental variable.
- Kubeless [Node.js](https://github.com/dictybase-playground/kubeless-nodefn) and [Golang](https://github.com/dictybase-playground/kubeless-gofn) functions are currently used and mapped to this URL. All of the `Node.js` functions are necessary to run version 1.0.0 of this application.
- The **REACT_APP_API_SERVER** env variable can also be customize by modifying the
  global variable in the [env](.env.development) file.

### Navbar and Footer

- The application has env variables for `REACT_APP_NAVBAR_JSON` and `REACT_APP_FOOTER_JSON` that are set to
  the corresponding URLs where the JSON data is stored on GitHub.

## Semantic Versioning

This app has been set up to use [semantic-release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli). After adding a new commit (`git add .`), use `npm run cz` and follow the prompts to categorize and provide more details about your commit. Once complete, push your changes to whatever branch you are working on.

When you are ready to push to prod, you can use `semantic-release` to automate the release process:

- Merge your changes into `master`
- Run `npx semantic-release`

**Important:** you MUST have an env variable stored for `GH_TOKEN` or `GITHUB_TOKEN` that contains a GitHub [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You can either pass this in manually when you run the script (i.e. `GH_TOKEN=XXX npx semantic-release`) or you can [store your env variable locally](https://www.schrodinger.com/kb/1842).

This will look at your most recent commits since the last `git tag` and automatically determine the appropriate version number for your release. It also updates the [CHANGELOG](./CHANGELOD.md) documentation.

## Running the application (dev version)

- `npm install`
- `npm start`

## Application Structure

This was reconfigured to use the [create-react-app](https://github.com/facebook/create-react-app) structure and philosophy. Please read their [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) for more detailed information.

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
│       ├── fake-data           # Any fake data needed for placeholder content
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

# Deployment

The application is deployed by [building a Docker
image](https://docs.docker.com/engine/reference/commandline/build/) and running
it through [Kubernetes](https://k8s.io). More detailed information about the deployment process for DSC
and all Dicty software can be found [here](https://github.com/dictyBase/Migration/blob/master/deploy.md).

Starting with version `2.0.0` of the application, the following Kubeless functions need to be deployed as well:

- [genefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/gene)
- [genecachefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/geneids)
- [uniprotcachefn](https://github.com/dictybase-playground/kubeless-nodefn/tree/master/uniprot)

**Important**: make sure you are using the latest versions. Follow the documentation on each of these
pages in order to deploy them.
