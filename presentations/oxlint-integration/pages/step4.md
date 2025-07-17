# Step 4: Add oxlint Scripts to Projects

## Consistent Command Interface

**Add to package.json scripts section:**
```json
{
  "scripts": {
    "oxlint": "oxlint src/",
    "oxlint:out": "oxlint src/ --format=github"
  }
}
```

## Script Usage

- **`oxlint`**: Standard linting for development
- **`oxlint:out`**: GitHub-formatted output for CI/CD
