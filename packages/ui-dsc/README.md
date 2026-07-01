# @dictybase/ui-dsc

UI components library for the stock center application (DSC). This package contains a comprehensive set of React components designed specifically for the stock-center app.

## Overview

This package provides reusable React components written in TypeScript that handle key features of the stock center application, including:

- **Catalog Management** - Components for displaying and managing strain and plasmid catalogs
- **Shopping Cart** - Cart management and item handling
- **Order Management** - Order processing and tracking components
- **Home Page** - Landing page and featured content components
- **Error Handling** - Error display and error page components
- **Functional Components** - Utility and functional UI components

## Features

- **TypeScript First** - All components are written in TypeScript with full type safety
- **Material-UI Integration** - Built with Material-UI (MUI) v5 for consistent design
- **Form Handling** - React Hook Form integration with form validation
- **GraphQL Support** - Apollo Client integration for data fetching
- **Styling** - Emotion-based styling with tss-react
- **Icons** - FontAwesome icon library support
- **PDF Export** - React PDF Renderer for generating PDF documents
- **Responsive Design** - Mobile-friendly components

## Installation

```bash
yarn add @dictybase/ui-dsc
```

## Usage

Import components from the main index file:

```tsx
import { SomeComponent, AnotherComponent } from '@dictybase/ui-dsc'
```

## Component Organization

- `catalog/` - Catalog listing and detail components
- `cart/` - Shopping cart related components
- `order/` - Order management components
- `home/` - Home page components
- `utils/` - Utility functions and helpers
- `mocks/` - Mock data for testing and development

## Development

### Scripts

```bash
# Run linting
yarn lint
yarn oxlint

# Run tests
yarn test
yarn test:watch

# Generate coverage report
yarn coverage
```

## Dependencies

Key dependencies include:
- React 17.x and React DOM
- Material-UI v5
- Apollo Client
- React Hook Form
- ts-pattern for pattern matching
- fp-ts for functional programming utilities
- @dictybase packages for shared components and utilities

## License

BSD-2-Clause
