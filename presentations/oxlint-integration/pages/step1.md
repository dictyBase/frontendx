# Step 1: Create Shared Configuration Package

## Package Structure

```
packages/oxlint-config/
├── package.json
├── README.md
└── .oxlintrc.json
```

## Package Definition

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