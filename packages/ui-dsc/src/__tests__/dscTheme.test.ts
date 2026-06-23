import { expect, test } from "vitest"
import { dscHomeTheme } from "../home/dscTheme"

test("dscHomeTheme has correct colors", () => {
  expect(dscHomeTheme.colors.primary).toBe("#004080")
  expect(dscHomeTheme.colors.primaryLight).toBe("#0066cc")
  expect(dscHomeTheme.colors.primaryDark).toBe("#003060")
  expect(dscHomeTheme.colors.warning).toBe("#ffc107")
  expect(dscHomeTheme.colors.warningLight).toBe("#fff3cd")
  expect(dscHomeTheme.colors.textPrimary).toBe("#333")
  expect(dscHomeTheme.colors.textSecondary).toBe("#555")
  expect(dscHomeTheme.colors.textTertiary).toBe("#666")
  expect(dscHomeTheme.colors.background).toBe("#f5f7fa")
  expect(dscHomeTheme.colors.cardBackground).toBe("#ffffff")
})

test("spacing function returns correct values", () => {
  expect(dscHomeTheme.spacing(1)).toBe("8px")
  expect(dscHomeTheme.spacing(2)).toBe("16px")
  expect(dscHomeTheme.spacing(3)).toBe("24px")
  expect(dscHomeTheme.spacing(4)).toBe("32px")
})

test("dscHomeTheme has correct border radius values", () => {
  expect(dscHomeTheme.borderRadius.sm).toBe("4px")
  expect(dscHomeTheme.borderRadius.md).toBe("8px")
  expect(dscHomeTheme.borderRadius.lg).toBe("12px")
})

test("dscHomeTheme has correct shadow values", () => {
  expect(dscHomeTheme.shadows.card).toBe("0 2px 8px rgba(0,0,0,0.08)")
  expect(dscHomeTheme.shadows.cardHover).toBe("0 8px 16px rgba(0,64,128,0.15)")
})

test("dscHomeTheme has correct breakpoint values", () => {
  expect(dscHomeTheme.breakpoints.xs).toBe("0px")
  expect(dscHomeTheme.breakpoints.sm).toBe("640px")
  expect(dscHomeTheme.breakpoints.md).toBe("768px")
  expect(dscHomeTheme.breakpoints.lg).toBe("1024px")
  expect(dscHomeTheme.breakpoints.xl).toBe("1280px")
})

test("dscHomeTheme has correct typography fontFamily", () => {
  expect(dscHomeTheme.typography.fontFamily).toBe(
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  )
})
