# Step 5: Add to All Projects

## Monorepo-wide Integration

**Objective**: Ensure all packages and applications have access to shared oxlint configuration.

**Add to every package.json:**
```json
{
  "devDependencies": {
    "@dictybase/oxlint-config": "*"
  }
}
```

## Automated Approach

- **37 total projects** (6 apps + 31 packages)
- **Batch operation** to add dependency
- **Exclude** the oxlint-config package itself
- **Consistent** dependency management across monorepo