# Publication

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
![GitHub tag](https://img.shields.io/github/v/tag/dictyBase/publication)
![GitHub action](https://github.com/dictyBase/publication/workflows/Node%20CI%20Develop/badge.svg)  
[![codecov](https://codecov.io/gh/dictyBase/publication/branch/develop/graph/badge.svg)](https://codecov.io/gh/dictyBase/publication)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictyBase/publication)](https://codeclimate.com/github/dictyBase/publication)  
![Last commit](https://badgen.net/github/last-commit/dictyBase/publication/develop)  
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://reporter.nih.gov/project-details/10024726)

This is the [Publication](https://dictycr.org/publication/26088819) application to display publication information at dictyBase.

## Overview

The Publication application provides a clean, user-friendly interface for viewing scientific publications related to Dictyostelium research. It fetches publication data from PubMed and presents it in a structured format.

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **Material-UI**: Component library for consistent styling
- **Apollo Client**: GraphQL client for data fetching
- **fp-ts**: Functional programming utilities
- **Logto**: Authentication provider

## Application Structure

The application is organized into several key areas:

### Pages

- **Publication Details (`/[id]`)**: Displays detailed information about a specific publication
- **Home (`/`)**: Redirects to a default publication
- **Authentication (`/load/auth`, `/callback`)**: Handles user authentication flow

### Features

- **Publication Display**: Shows publication details including title, authors, abstract, and journal information
- **Authentication**: Integration with Logto for user authentication
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Responsive Design**: Adapts to different screen sizes

### Key Components

- **PublicationPage**: Main component for displaying publication details
- **PublicationBody**: Renders the publication content (title, authors, abstract)
- **JournalData**: Displays journal-specific information
- **Authors**: Shows the list of publication authors
- **Abstract**: Renders the publication abstract with formatting

## Authorization Levels

The application supports different levels of access:

- **Public**: All publication content is viewable by all users
- **Authenticated**: Some features may require authentication

## Backend Requirements

This app requires the following services to be running:

- [graphql-server](https://github.com/dictyBase/graphql-server)
- [graphql-authserver](https://github.com/dictyBase/graphql-authserver)

## Development Workflow

### Local Development

For local development with authentication:

1. Configure OAuth providers in the client configuration files
2. Set up the necessary environment variables

## Testing

The application includes:

- Unit tests with Jest
- Component tests with React Testing Library

## Environment Configuration

The application uses environment variables for configuration:

- API endpoints
- Authentication settings
- Google Analytics tracking
- Base paths and URLs

## Getting Started

To start development:

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build
```

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
