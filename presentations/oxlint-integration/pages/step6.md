# Step 6: Update Configuration Files

## Ensure Proper Configuration Inheritance

**Update .oxlintrc.json extends paths:**
```json
{
  "extends": ["../../packages/oxlint-config/.oxlintrc.json"],
  "rules": {
    "eqeqeq": ["error", "smart"]
  }
}
```

## Configuration Strategy

- **Applications**: Always extend shared config
- **Packages**: Optional package-specific configs for special cases
- **Path Resolution**: Correct relative paths from project to config
- **Validation**: Ensure configuration inheritance works properly

**Result**: All projects properly inherit shared linting rules while maintaining flexibility for project-specific overrides.
