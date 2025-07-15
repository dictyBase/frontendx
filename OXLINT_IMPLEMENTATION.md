# Implementing Oxlint in a Monorepo Project

This documentation outlines the step-by-step process for implementing Oxlint in a JavaScript/TypeScript monorepo project, based on the implementation in the dictyBase frontendx repository.

## Implementation Steps

### Step 1: Create a Shared Oxlint Configuration Package

1. **Create the package directory structure:**
   ```
   packages/oxlint-config/
   ├── package.json
   ├── README.md
   └── src/
       └── index.ts
   ```

2. **Set up package.json:**
   ```json
   {
     "name": "@dictybase/oxlint-config",
     "version": "0.0.0",
     "description": "Oxlint configuration",
     "main": "./src/index.ts",
     "author": "Kevin Tun",
     "license": "BSD-2-Clause",
     "devDependencies": {
       "oxlint": "^1.6.0"
     }
   }
   ```

### Step 2: Configure Oxlint Rules and Plugins

1. **Create `.oxlintrc.json` in the config package:**
   ```json
   {
     "$schema": "../../node_modules/oxlint/configuration_schema.json",
     "plugins": [
       "typescript",
       "unicorn",
       "react",
       "react-perf",
       "next-js",
       "oxc",
       "import",
       "js-doc",
       "jsx-a11y",
       "promise",
       "vitest",
       "jest"
     ],
     "categories": {
       "correctness": "error",
       "perf": "error",
       "suspicious": "error"
     },
     "rules": {
       "react-in-jsx-scope": "off"
     }
   }
   ```

### Step 3: Integrate Oxlint into Applications


1. **Add the configuration package as a dependency:**
   ```json
   {
     "dependencies": {
       "@dictybase/oxlint-config": "*"
     }
   }
   ```

2. **Add oxlint script to package.json:**
   ```json
   {
     "scripts": {
       "oxlint": "oxlint src/"
     }
   }
   ```

### Step 4: Create Application-Specific Configuration


1. **Create `.oxlintrc.json` in each application:**
   ```json
   {
     "extends": ["../../packages/oxlint-config/.oxlintrc.json"]
   }
   ```

## Key Configuration Details

### Plugins Included
- **typescript**: TypeScript-specific linting rules
- **unicorn**: Modern JavaScript best practices
- **react**: React-specific linting rules
- **react-perf**: React performance optimizations
- **next-js**: Next.js framework rules
- **oxc**: Oxc compiler integration
- **import**: ES6+ import/export rules
- **js-doc**: JSDoc comment validation
- **jsx-a11y**: Accessibility rules for JSX
- **promise**: Promise-related rules
- **vitest**: Vitest testing framework rules
- **jest**: Jest testing framework rules

## Benefits of This Implementation

1. **Centralized Configuration**: Single source of truth for linting rules across all applications
2. **Consistency**: All applications use the same linting standards
3. **Maintainability**: Easy to update rules across the entire monorepo
4. **Performance**: Oxlint is significantly faster than ESLint
5. **Extensibility**: Applications can extend the base configuration with specific rules

## Usage

After implementation, you can run oxlint in any application:

```bash
yarn workspace dicty-frontpage oxlint
```

## File Structure Summary

```
project-root/
├── packages/
│   └── oxlint-config/
│       ├── .oxlintrc.json        # Base configuration
│       ├── package.json          # Package definition
│       └── README.md             # Documentation
└── apps/
    └── your-app/
        ├── .oxlintrc.json        # Extends base config
        └── package.json          # Includes oxlint script and dependency
```
