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
    icon: "🦠",
    title: "Bacterial Strains",
    description: "Find bacterial strains for your experiments",
    href: "/strains?group=bacterial",
  },
  {
    icon: "🏷️",
    title: "GWDI Strains",
    description:
      "Explore strains from the Genome Wide Dictyostelium Insertion Bank",
    href: "/strains?group=gwdi",
  },
  {
    icon: "🧪",
    title: "Plasmid Catalog",
    description: "Explore plasmids for molecular biology research",
    href: "/plasmids",
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
      { label: "Deposit Information", href: "/information/deposit" },
      { label: "Payment Information", href: "/information/payment" },
      { label: "FAQs", href: "/information/faq" },
    ],
  },
  {
    title: "Additional Materials",
    icon: "📚",
    links: [
      {
        label: "Nomenclature Guide",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/research/nomenclature`,
      },
      { label: "Phenotype Ontology", href: "/information/phenotypes" },
      { label: "Useful Links", href: "/information/links" },
      {
        label: "Downloads",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/downloads`,
      },
    ],
  },
  {
    title: "Information",
    icon: "ℹ️",
    links: [
      {
        label: "About dictyBase",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/about`,
      },
      { label: "Contact Us", href: "/contact" },
      {
        label: "Cite Us",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/community/citation`,
      },
    ],
  },
  {
    title: "Community",
    icon: "👥",
    links: [
      {
        label: "Annual Conferences",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/community/conference`,
      },
      {
        label: "Email Forum",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/community/listserv`,
      },
      {
        label: "News",
        href: `${import.meta.env.VITE_APP_FRONTPAGE_URL}/news`,
      },
    ],
  },
]

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Strains", href: "/strains" },
  { label: "Plasmids", href: "/plasmids" },
  { label: "About", href: "/about" },
]
