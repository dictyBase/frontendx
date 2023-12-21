type LinkProperties = {
  name: string
  to: string
}

const downloadLinks = [
  {
    name: "Phenotype Ontology",
    to: "https://raw.githubusercontent.com/dictyBase/migration-data/master/ontologies/dicty_phenotypes.obo",
  },
  {
    name: "Strain Characteristics",
    to: "https://raw.githubusercontent.com/dictyBase/migration-data/master/ontologies/dicty_strain_characteristics.obo",
  },
  {
    name: "Mutagenesis Methods",
    to: "https://raw.githubusercontent.com/dictyBase/migration-data/master/ontologies/dicty_mutagenesis_method.obo",
  },
  {
    name: "Plasmid Keywords",
    to: "https://raw.githubusercontent.com/dictyBase/migration-data/master/ontologies/dicty_plasmid_keywords.obo",
  },
]

const infoLinks = [
  {
    name: "Order Information",
    to: "/information/order",
  },
  {
    name: "Payment Information",
    to: "/information/payment",
  },
  {
    name: "Deposit Information",
    to: "/information/deposit",
  },
  {
    name: "Shipping Information",
    to: "/information/shipping",
  },
]

const additionalMaterial = {
  name: "Additional Materials",
  to: "/information/additional-materials",
}

const additionalMaterialAuth = {
  name: "Additional Materials",
  to: "/information/additional-materials/editable",
}

const materialsLinks = [
  {
    name: "Strain Catalog",
    to: "/strains",
  },
  {
    name: "Plasmid Catalog",
    to: "/plasmids",
  },
  {
    name: "Bacterial Strains",
    to: "/strains?filter=bacterial",
  },
  {
    name: "GWDI Catalog",
    to: "https://remi-seq.org/home/remi-seq/gwdi-bank/",
  },
  {
    name: "GoldenBraid List",
    to: "https://docs.google.com/spreadsheets/d/1zg50MmBUKZx_AwDJ2-sNcxIvl_Lc1RfC/edit#gid=1498603553",
  },
]

const miscLinks = [
  {
    name: "Contact the DSC",
    to: "/contact",
  },
  {
    name: "DSC FAQ",
    to: "/information/faq",
  },
  {
    name: "Nomenclature Guide",
    to: "https://dictycr.org/research/nomenclature",
  },
  {
    name: "Other Stock Centers",
    to: "/information/other-stock-centers",
  },
]

export {
  downloadLinks,
  infoLinks,
  materialsLinks,
  miscLinks,
  additionalMaterial,
  additionalMaterialAuth,
  type LinkProperties,
}
