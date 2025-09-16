import { GeneGeneralInfo } from "dicty-graphql-schema"

/**
 * Reference: http://dictybase.org/gene/piaA
 */
const mockGeneralInfoPiaA: GeneGeneralInfo = {
  id: "DDB_G0277399",
  name_description: [
    "pia = PIAnissimo",
    "rictor = Rapamycin-Insensitive Companion of mTOR",
  ],
  // alt_gene_name: ["DG1117", "amiA", "pia", "rictor"],
  gene_product: "cytosolic regulator of adenylyl cyclase PiaA",
  synonyms: ["Pianissimo, cytosolic regulator of adenylate cyclase"],
  description:
    "required for receptor-mediated activation of adenylyl cyclase; component of the TORC2 (Tor complex 2) with Tor, Lst8, and Rip3 that plays a role in regulation of adenylate cyclase (ACA) and protein kinase B (PKB) activation during aggregation",
}

export { mockGeneralInfoPiaA }
