# Step 6: Add Scripts to All Projects

## Consistent Command Interface

**Add to every package.json scripts section:**
```json
{
  "scripts": {
    "oxlint": "oxlint src/",
    "oxlint:out": "oxlint src/ --format=github"
  }
}
```

## Script Benefits

- **`oxlint`**: Standard linting for development
- **`oxlint:out`**: GitHub-formatted output for CI/CD
- **Consistency**: Same commands across all projects
- **Integration**: Works alongside existing ESLint scripts

All 37 projects now have identical oxlint commands available.