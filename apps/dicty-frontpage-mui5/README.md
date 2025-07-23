# dicty-frontpage

This project is the front end web application for [dictyBase](https://www.dictycr.org/), the central resource for Dictyostelid genomics.

## Overview

The dicty-frontpage application serves as the main entry point for users to access dictyBase resources. It is built with React and uses Material-UI for the user interface components.

## Technology Stack

- **React**: Core UI library
- **Material-UI**: Component library for consistent styling
- **Apollo Client**: GraphQL client for data fetching
- **React Router**: For application routing
- **Lexical**: Rich text editor for content management
- **fp-ts**: Functional programming utilities
- **Vite**: Build tool and development server

## Application Structure

The application is organized into several key areas:

### Pages

- **Home (`/`)**: The main landing page featuring news, latest papers, and quick access to resources
- **News (`/news`)**: Displays community news and updates
- **About (`/about`)**: Information about dictyBase
- **Downloads (`/downloads`)**: Access to downloadable resources
- **Papers (`/papers`)**: Latest publications related to Dictyostelium research
- **Content Pages**: Various informational pages organized by section (research, community, explore)

### Features

- **Content Management**: Authorized users can create, edit, and delete content
- **Authentication**: Integration with Logto for user authentication
- **Publications**: Display of latest research papers from PubMed
- **Downloads**: Organized access to downloadable resources
- **Stock Center Integration**: Links to the Dicty Stock Center

### Key Components

- **Front**: Main homepage component with various information widgets
- **Slideshow**: Image carousel featuring Dictyostelium imagery
- **LatestPapers**: Display of recent publications
- **StockCenter**: Quick access to strain and plasmid information
- **EditablePages**: Components for content management by authorized users

## Authorization Levels

The application supports different levels of access:

- **Public**: Content viewable by all users
- **Authorized**: Content management features for users with appropriate roles (e.g., "content-admin")

## Development Workflow

### Content Management

The application uses a content management system with the following workflow:

1. **Create**: Authorized users can create new content pages
2. **Edit**: Content can be modified using the Lexical editor
3. **Delete**: Unwanted content can be removed
4. **View**: Content is displayed to users based on their authorization level

### Routes Structure

- Regular content: `/:section/:name/show` (public view)
- Editable content: `/:section/:name/editable` (authorized view)
- Edit mode: `/:section/:name/edit` (for content editing)

## Testing

The application includes:

- Unit tests with Vitest
- End-to-end tests with Playwright

## Environment Configuration

The application uses environment variables for configuration:

- API endpoints
- Authentication settings
- Feature flags
- Deployment-specific settings

## Getting Started

To start development:

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Start with mock data
yarn dev:mock

# Run tests
yarn test
```

## Related Packages

The application relies on several internal packages:

- `@dictybase/auth`: Authentication utilities
- `@dictybase/editor`: Rich text editor components
- `@dictybase/ui-frontpage`: Reusable UI components
- `@dictybase/data-access`: Data fetching utilities
