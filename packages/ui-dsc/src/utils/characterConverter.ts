/**
 * characterConverter is a function to replace any HTML Symbol
 * Entities. All numeric entities are converted via a regular expression.
 * Named entities will need to be manually added over time.
 * https://www.webstandards.org/learn/reference/charts/entities/symbol_entities/index.html
 */

const regex = /&#(\d+);/g

const characterConverter = (string_: string) =>
  string_
    .replaceAll(regex, (_, dec) => String.fromCodePoint(dec))
    .replace("&gamma;", "γ")

export { characterConverter }
