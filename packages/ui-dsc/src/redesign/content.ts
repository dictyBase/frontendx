import type { LinkItem, NavigationItem } from "./types"

export const stats = [
  { number: "12,000+", label: "Strain Accessions" },
  { number: "3,500+", label: "Plasmids" },
  { number: "500+", label: "Bacterial Strains" },
  { number: "24/7", label: "Online Ordering" },
]

export const catalogs = [
  {
    icon: "🧬",
    title: "Strain Catalog",
    description:
      "Browse our extensive collection of Dictyostelium discoideum strains",
    href: "/strains",
  },
  {
    icon: "🧪",
    title: "Plasmid Catalog",
    description: "Explore plasmids for molecular biology research",
    href: "/plasmids",
  },
  {
    icon: "🦠",
    title: "Bacterial Strains",
    description: "Find bacterial strains for your experiments",
    href: "/bacteria",
  },
  {
    icon: "📦",
    title: "Downloads",
    description: "Access forms, protocols, and other resources",
    href: "/downloads",
  },
]

export const infoSections: Array<{
  title: string
  icon?: string
  links: LinkItem[]
}> = [
  {
    title: "Ordering",
    icon: "📦",
    links: [
      { label: "Order Information", href: "/information/order" },
      { label: "Shipping Information", href: "/information/shipping" },
      { label: "Payment Information", href: "/information/payment" },
      { label: "FAQs", href: "/information/faq" },
    ],
  },
  {
    title: "Additional Materials",
    icon: "📚",
    links: [
      { label: "Nomenclature Guide", href: "/information/nomenclature" },
      { label: "Phenotype Ontology", href: "/information/phenotypes" },
      { label: "Useful Links", href: "/information/links" },
    ],
  },
  {
    title: "About",
    icon: "ℹ️",
    links: [
      { label: "About dictyBase", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Cite Us", href: "/cite" },
    ],
  },
  {
    title: "Community",
    icon: "👥",
    links: [
      { label: "Dicty Community", href: "/community" },
      { label: "Events", href: "/events" },
      { label: "Publications", href: "/publications" },
    ],
  },
]

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Strains", href: "/strains" },
  { label: "Plasmids", href: "/plasmids" },
  { label: "About", href: "/about" },
]
