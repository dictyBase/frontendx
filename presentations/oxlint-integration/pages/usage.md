# Usage Examples

## Running Oxlint Commands

**For specific applications:**
```bash
yarn workspace dicty-frontpage oxlint
yarn workspace stock-center oxlint:out
```

**For specific packages:**
```bash
yarn workspace @dictybase/ui-common oxlint
yarn workspace @dictybase/auth oxlint:out
```

**From project directories:**
```bash
cd apps/dicty-frontpage
npm run oxlint

cd packages/ui-common  
npm run oxlint:out
```

**Monorepo-wide linting:**
```bash
yarn workspaces foreach run oxlint
```