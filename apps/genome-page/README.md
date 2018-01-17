## Master branch
[![Build Status](https://travis-ci.org/dictyBase/Genomepage.svg?branch=master)](https://travis-ci.org/dictyBase/Genomepage)
[![Dependency Status](https://david-dm.org/dictybase/genomepage/master.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/master)
[![devDependency Status](https://david-dm.org/dictybase/genomepage/master/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/master?type=dev)

## Develop branch
[![Build Status](https://travis-ci.org/dictyBase/Genomepage.svg?branch=develop)](https://travis-ci.org/dictyBase/Genomepage)
[![Dependency Status](https://david-dm.org/dictybase/genomepage/develop.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/develop)
[![devDependency Status](https://david-dm.org/dictybase/genomepage/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase/genomepage/develop?type=dev)

## Web application to display genomic information at dictyBase

Turning existing pages like [http://dictybase.org/gene/sadA](http://dictybase.org/gene/sadA) into this:

![alt text](https://github.com/dictyBase/Genomepage/blob/develop/go-page-display.png "Go Page Display mockup")

To run the app, clone the repository then run `npm install` and `npm start`.

# Application Structure

```
.
├── public                      # Index.html and favicon 
├── src                         # Application source code
│   ├── app                     # Application level components
│       ├── layout              # Main app template
│       ├── reducers            # Redux reducers
│       ├── store               # Redux store configuration
│   ├── common                  # Common features for entire app
│       ├── components          # Generic components
│       ├── constants           # Static data (i.e. header, footer links)
│       ├── utils               # Application utilities
│   ├── features                # Main features of application
│       ├── Blast               # Blast Tab components
│       ├── GeneOntology        # Gene Ontology Tab components
│       ├── GeneSummary         # Gene Summary Tab components
│       ├── Orthologs           # Orthologs Tab components
│       ├── ProteinInformation  # Protein Information Tab components
│       ├── Reference           # Reference Tab components
│   ├── index.js                # Application rendering
│   └── Routes.js               # Application route definitions
└──                             # Config files
```

![alt text](https://github.com/dictyBase/Genomepage/blob/develop/genomepage_components.png "Genomepage Component Wireframe")
