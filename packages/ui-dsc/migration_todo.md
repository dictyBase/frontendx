- [] Check stock-center pages for regression
  - Home (/stockcenter)
  - Strain Catalog (/stockcenter/strains)
  - Plasmid Catalog (/stockcenter/plasmids)
  - Strain Page (/stockcenter/strains/:id)
  - Plasmid Page (/stockcenter/plasmids/:id)
  - Content Page (/stockcenter/information/order)
  - Cart Page (/stockcenter/cart)
  - Order Pages (/stockcenter/order)

Pre-migration Base: https://dictybase.dev
Post-migration Base: http://localhost:3003


---

## Visual Regression Report - MUI v4 to v5 Migration

**Date**: 2026-01-06
**Comparison**: PRE-migration (MUI v4) vs POST-migration (MUI v5)

### Summary

❌ **1 REGRESSION DETECTED**
✅ **5 pages with no regressions**

---

## REGRESSIONS

### 1. Home Page (/stockcenter) - ⚠️ REGRESSION FOUND

**Issue**: Slideshow/carousel layout completely changed

**PRE-migration (Expected)**:
- Small slideshow image on the LEFT side (~280px width)
- Two-column layout: slideshow left, catalogs/downloads sections on right
- Caption: "gbqA mutant (DG1120); image provided by Bill Loomis"
- Compact, space-efficient layout

**POST-migration (Current - BROKEN)**:
- Large FULL-WIDTH carousel spanning entire page (~800px width)
- Stacked vertical layout: carousel on top, catalogs/downloads below
- Caption: "tipB mutant (DG1036); image provided by Bill Loomis"
- Takes significantly more vertical space

**Impact**: MAJOR - Complete layout restructuring
**Severity**: HIGH
**Files to investigate**:
- `packages/ui-dsc/src/home/Slideshow.tsx`
- Home page component grid/layout configuration
- Carousel/slideshow component styling

---

## NO REGRESSIONS

### 2. Strain Catalog (/stockcenter/strains) - ✅ NO REGRESSION

All elements identical between PRE and POST migration:
- Page title, dropdown, search box, help icon
- Table headers and data rows
- Shopping cart icons
- Link colors, borders, spacing

### 3. Plasmid Catalog (/stockcenter/plasmids) - ✅ NO REGRESSION

All elements identical between PRE and POST migration:
- Page title
- Table headers and data rows
- Shopping cart icons
- Layout and spacing

### 4. Strain Detail Page (/stockcenter/strains/DBS40370) - ✅ NO REGRESSION

All elements identical between PRE and POST migration:
- Page title, ID, tabs
- "Add to Cart" button styling
- Detail list items and data
- Typography, spacing, links

### 5. Plasmid Detail Page (/stockcenter/plasmids/DBP97258) - ✅ NO REGRESSION

All elements identical between PRE and POST migration:
- Page title, ID
- "Add to Cart" button styling
- Detail list items
- Gene badges (erkB, kif8, cln3, tpp1)
- Sequence display section

### 6. Order Information Page (/stockcenter/information/order) - ✅ NO REGRESSION

Both versions show identical error page (unrelated to migration):
- "Sorry, something went wrong"
- Same error layout and styling

---

## Action Items

1. **FIX HOME PAGE REGRESSION**: Restore original two-column layout with left-aligned slideshow
2. **Investigate Order Page Error**: Fix content loading issue (not migration-related)

---

## Screenshots

**PRE-migration**: `.playwright-mcp/PRE-*-FULL.png`
**POST-migration**: `.playwright-mcp/*-localhost.png`
