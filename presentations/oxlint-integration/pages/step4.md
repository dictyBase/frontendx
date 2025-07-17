# Step 4: Add oxlint Scripts to Projects

## Consistent Command Interface

**Add to package.json scripts section:**
```json
{
  "scripts": {
    "oxlint": "oxlint src/",
    "oxlint:ci": "oxlint src/ --format=github"
  }
}
```

## Script Usage

- **`oxlint`**: Standard linting for development
- **`oxlint:ci`**: GitHub-formatted output for CI/CD
