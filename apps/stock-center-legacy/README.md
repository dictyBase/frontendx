# Dicty Stock Center

This project is the front end web application for the Dicty Stock Center (DSC), providing access to Dictyostelium strains, plasmids, and related resources.

## Overview

The Dicty Stock Center application serves as a catalog and ordering system for biological materials related to Dictyostelium research. It allows users to browse, search, and order strains and plasmids, as well as access information about the stock center.

## Technology Stack

- **React**: Core UI library
- **Material-UI**: Component library for consistent styling
- **Apollo Client**: GraphQL client for data fetching
- **React Router**: For application routing
- **Jotai**: State management
- **fp-ts**: Functional programming utilities
- **Vite**: Build tool and development server

## Application Structure

The application is organized into several key areas:

### Pages

- **Home (`/`)**: The main landing page with information about the stock center
- **Strains (`/strains`)**: Catalog of available strains
- **Plasmids (`/plasmids`)**: Catalog of available plasmids
- **Cart (`/cart`)**: Shopping cart for ordering items
- **Order (`/order`)**: Multi-step order form
- **Information Pages (`/information/*)**: Various informational pages about the stock center
- **Phenotypes (`/phenotypes/*)**: Pages related to strain phenotypes

### Features

- **Catalog Browsing**: Browse and search strains and plasmids
- **Shopping Cart**: Add items to cart and manage cart contents
- **Order Processing**: Multi-step form for submitting orders
- **Content Management**: Authorized users can create, edit, and delete content
- **Authentication**: Integration with Logto for user authentication

### Key Components

- **Catalog Components**: Display and interaction with strain and plasmid listings
- **Cart Components**: Shopping cart management
- **Order Form**: Multi-step order submission process
- **Availability Display**: Shows item availability and allows adding to cart
- **EditablePages**: Components for content management by authorized users

## Cart and Order Flow

The application implements a complete e-commerce flow:

1. **Browse Catalog**: Users browse strains or plasmids
2. **Add to Cart**: Available items can be added to the shopping cart
3. **Review Cart**: Users can review and modify cart contents
4. **Checkout Process**:
   - Shipping information
   - Payment information
   - Order review and submission
5. **Order Confirmation**: Confirmation page with order details

## Authorization Levels

The application supports different levels of access:

- **Public**: Catalog browsing and basic information
- **Authenticated**: Order submission capabilities
- **Authorized**: Content management features for users with appropriate roles (e.g., "content-admin")

## State Management

The application uses Jotai for state management, with several key atoms:

- **Cart State**: Manages items in the shopping cart
- **Order State**: Manages the order form data and submission process
- **Content State**: Manages editable content

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
- Component tests with React Testing Library

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
- `@dictybase/ui-dsc`: Stock center-specific UI components
- `@dictybase/hook-dsc`: Custom hooks for stock center functionality
- `@dictybase/data-access`: Data fetching utilities
