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

test("dscHomeTheme has correct border radius values", () => {
  expect(dscHomeTheme.borderRadius.sm).toBe("4px")
  expect(dscHomeTheme.borderRadius.md).toBe("8px")
  expect(dscHomeTheme.borderRadius.lg).toBe("12px")
})

test("dscHomeTheme has correct shadow values", () => {
  expect(dscHomeTheme.shadows.card).toBe("0 2px 8px rgba(0,0,0,0.08)")
  expect(dscHomeTheme.shadows.cardHover).toBe("0 8px 16px rgba(0,64,128,0.15)")
})
