# Step 3: Integrate into Applications

## Add Dependency and Script

**1. Add configuration package as dependency:**
```json
{
  "dependencies": {
    "@dictybase/oxlint-config": "*"
  }
}
```

**2. Add oxlint script:**
```json
{
  "scripts": {
    "oxlint": "oxlint src/"
  }
}
```

**3. Create application configuration:**
```json
{
  "extends": ["../../packages/oxlint-config/.oxlintrc.json"]
}
```