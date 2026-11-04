import { test, expect } from "vitest"
import { getEntityPresentation } from "../catalog/catalogEntityPresentation"
import { StrainIcon, PlasmidIcon } from "../catalog/CatalogEntityIcons"
import {
  STRAIN_BADGE_COLOR,
  STRAIN_BADGE_BG,
  STRAIN_BADGE_BORDER,
  PLASMID_BADGE_COLOR,
  PLASMID_BADGE_BG,
  PLASMID_BADGE_BORDER,
} from "../catalog/constants"

test("getEntityPresentation returns the strain table badge colours and icon", () => {
  const presentation = getEntityPresentation("Strain")
  expect(presentation.color).toBe(STRAIN_BADGE_COLOR)
  expect(presentation.bg).toBe(STRAIN_BADGE_BG)
  expect(presentation.border).toBe(STRAIN_BADGE_BORDER)
  expect(presentation.Icon).toBe(StrainIcon)
  expect(presentation.label).toBe("Strain")
})

test("getEntityPresentation returns the plasmid table badge colours and icon", () => {
  const presentation = getEntityPresentation("Plasmid")
  expect(presentation.color).toBe(PLASMID_BADGE_COLOR)
  expect(presentation.bg).toBe(PLASMID_BADGE_BG)
  expect(presentation.border).toBe(PLASMID_BADGE_BORDER)
  expect(presentation.Icon).toBe(PlasmidIcon)
  expect(presentation.label).toBe("Plasmid")
})
