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

   The `oxlint:out` script provides GitHub-formatted output for CI/CD integration

### Step 7: Update Project Configuration Files

**Objective**: Ensure all projects can properly extend the shared configuration.

1. **Update .oxlintrc.json extends path:**
   For applications, update the extends path to correctly reference the shared config:
   ```json
   {
     "extends": ["../../packages/oxlint-config/.oxlintrc.json"]
   }
   ```
## Usage Examples

### Running Oxlint Commands

```bash
# Run oxlint on a specific project
yarn workspace @dictybase/ui-common oxlint
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
