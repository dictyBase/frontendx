import { match } from "ts-pattern"

enum Section {
  EXPLORE = "explore",
  RESEARCH = "research",
  COMMUNITY = "community",
  INFORMATION = "information",
}

enum Namespace {
  FRONTPAGE = "frontpage",
  STOCKCENTER = "stockcenter",
}

const matchContentNamespace = (section: string): string =>
  match(section)
    .with(Section.INFORMATION, () => Namespace.STOCKCENTER)
    .otherwise(() => Namespace.FRONTPAGE)

export { matchContentNamespace }
