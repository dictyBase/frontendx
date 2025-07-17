# Step 4: Application-Specific Configuration

## Extending Base Configuration

**For each application, create `.oxlintrc.json`:**

```json
{
  "extends": ["../../packages/oxlint-config/.oxlintrc.json"]
}
```

## Benefits of Configuration Inheritance

- **Consistency**: All apps use the same base rules
- **Flexibility**: Apps can override specific rules if needed
- **Maintainability**: Update rules in one place
- **Scalability**: Easy to add new applications

Applications can add their own rules while inheriting the shared configuration.