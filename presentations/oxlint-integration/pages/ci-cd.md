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
      - name: Install
        run: yarn install --ignore-engines
      - name: Run Oxlint
        run: yarn oxlint:out
```

## CI/CD Benefits

- **Automated linting** on every pull request
- **GitHub-formatted output** for inline code review
