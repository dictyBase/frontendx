# Step 2: Define Base Config

```json
{
  "$schema": "../../node_modules/oxlint/configuration_schema.json",
  "plugins": [
    "typescript", "unicorn", "react", "react-perf", 
    "next-js", "oxc", "import", "js-doc", 
    "jsx-a11y", "promise", "vitest", "jest"
  ],
  "categories": {
    "correctness": "error",
    "perf": "error", 
    "suspicious": "error"
  },
  "rules": {
    "react-in-jsx-scope": "off"
  }
}
```

**12 plugins** covering TypeScript, React, accessibility, testing, and modern JavaScript best practices.
