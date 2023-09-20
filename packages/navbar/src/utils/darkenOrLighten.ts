// @flow
import { parseToHsl, toColorString } from "polished"

export const darkenOrLighten = (color: string) => {
  const hsl = parseToHsl(color)
  const newLightnessValue =
    hsl.lightness >= 0.5 ? hsl.lightness - 0.1 : hsl.lightness + 0.1

  return toColorString({ ...hsl, lightness: newLightnessValue })
}
