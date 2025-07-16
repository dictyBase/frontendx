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

This implementation provides a scalable foundation for linting across a monorepo while maintaining flexibility for application-specific requirements.

## Additional Integration Steps

After completing the initial 4-step implementation, the following additional steps were taken to fully integrate oxlint across the entire monorepo:

### Step 5: Add Oxlint Configuration Package to All Projects

**Objective**: Ensure all packages and applications in the monorepo have access to the shared oxlint configuration.

1. **Add dependency to all apps and packages:**
   Add `@dictybase/oxlint-config` as a devDependency to every package.json file in the monorepo:
   ```json
   {
     "devDependencies": {
       "@dictybase/oxlint-config": "*"
     }
   }
   ```

2. **Automated approach:**
   Use a script or batch operation to add the dependency to all apps/* and packages/* directories (excluding the oxlint-config package itself).

### Step 6: Add Oxlint Scripts to All Projects

**Objective**: Provide consistent oxlint commands across all packages and applications.

1. **Add standard oxlint scripts:**
   For each package.json file, add these scripts to the "scripts" section:
   ```json
   {
     "scripts": {
       "oxlint": "oxlint src/",
       "oxlint:out": "oxlint src/ --format=github"
     }
   }
   ```

2. **Script placement:**
   - Place oxlint scripts at the beginning of the scripts section
   - Maintain existing scripts (lint, test, etc.)
   - The `oxlint:out` script provides GitHub-formatted output for CI/CD integration

### Step 7: Update Application Configuration Files

**Objective**: Ensure all applications can properly extend the shared configuration.

1. **Update .oxlintrc.json extends path:**
   For applications, update the extends path to correctly reference the shared config:
   ```json
   {
     "extends": ["../../packages/oxlint-config/.oxlintrc.json"]
   }
   ```

2. **Create configuration files for packages:**
   Some packages may also need their own .oxlintrc.json files if they require specific overrides.

## Updated Usage Examples

### Running Oxlint Commands

**For applications:**
```bash
# Run oxlint on a specific app
yarn workspace dicty-frontpage oxlint
yarn workspace stock-center oxlint

# Run with GitHub formatting
yarn workspace dicty-frontpage oxlint:out
```

**For packages:**
```bash
# Run oxlint on a specific package
yarn workspace @dictybase/ui-common oxlint
yarn workspace @dictybase/auth oxlint

# Run with GitHub formatting
yarn workspace @dictybase/ui-common oxlint:out
```

**From package directories:**
```bash
# Navigate to any package/app and run directly
cd apps/dicty-frontpage
npm run oxlint

cd packages/ui-common  
npm run oxlint
```

### Monorepo-wide Linting

**Run oxlint across all projects:**
```bash
# Using Yarn workspaces (example - adjust based on your package manager)
yarn workspaces foreach run oxlint
```

## Final Project Structure

```
project-root/
├── packages/
│   ├── oxlint-config/
│   │   ├── .oxlintrc.json        # Base configuration
│   │   ├── package.json          # Config package definition
│   │   └── README.md             # Documentation
│   ├── ui-common/
│   │   ├── .oxlintrc.json        # (Optional) Package-specific config
│   │   └── package.json          # Includes oxlint scripts + dependency
│   └── auth/
│       ├── .oxlintrc.json        # (Optional) Package-specific config  
│       └── package.json          # Includes oxlint scripts + dependency
├── apps/
│   ├── dicty-frontpage/
│   │   ├── .oxlintrc.json        # Extends base config
│   │   └── package.json          # Includes oxlint scripts + dependency
│   └── stock-center/
│       ├── .oxlintrc.json        # Extends base config
│       └── package.json          # Includes oxlint scripts + dependency
└── OXLINT_IMPLEMENTATION.md     # This documentation
```

## Integration Verification

After completing all steps, verify the integration by:

1. **Test oxlint runs successfully:**
   ```bash
   cd apps/dicty-frontpage
   npm run oxlint
   ```

2. **Check configuration inheritance:**
   Ensure applications properly extend the shared configuration

3. **Verify GitHub formatting:**
   ```bash
   npm run oxlint:out
   ```

4. **Run across multiple projects:**
   Test that oxlint works consistently across different apps and packages

This comprehensive integration ensures that oxlint is available and consistently configured across the entire monorepo, providing fast linting capabilities alongside the existing ESLint infrastructure.
