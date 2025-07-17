# Step 8: CI/CD Integration

## GitHub Actions Workflow

**`.github/workflows/oxlint.yml`**
```yaml
name: Oxlint
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4
      - name: Run Oxlint
        run: npx --yes oxlint@1.6.0 --format=github --config=apps/dicty-frontpage/.oxlintrc.json
```

## CI/CD Benefits

- **Automated linting** on every pull request
- **GitHub-formatted output** for inline code review
- **Fast execution** with npx (no dependency installation needed)
- **Consistent standards** enforced across all contributions