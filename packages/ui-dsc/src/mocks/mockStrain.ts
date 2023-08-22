/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
import { Strain, Gene, Publication, Phenotype } from "dicty-graphql-schema"

const mockUser = {
  id: "99999",
  first_name: "Art",
  last_name: "Vandelay",
  email: "art@vandelayindustries.com",
  created_at: 123_456,
  updated_at: 987_654,
  is_active: true,
}

const mockDepositor = {
  id: "878898",
  first_name: "Adrian",
  last_name: "Harwood",
  email: "test@testemail.com",
  created_at: 123_456,
  updated_at: 987_654,
  is_active: true,
}

const availableStrain = {
  type: "strain",
  label: "aarA-",
  id: "DBS0236123",
  names: ["aar-", "aardvark null", "HAD 186", "catenin null"],
  systematic_name: "HAD186",
  characteristics: ["blasticidin resistant", "axenic", "null mutant"],
  summary: "aarA (aardvark) null mutant (β-catenin knock-out)",
  editableSummary: "aarA (aardvark) null mutant (β-catenin knock-out)",
  genotypes: ["axeA2", "axeB2", "axeC2", "aarA-[aarA-KO]", "bsR"],
  genetic_modification: "endogenous insertion",
  mutagenesis_method: "Homologous Recombination",
  species: "Dictyostelium discoideum",
  parent: {
    id: "DBS0350762",
    label: "AX2",
    created_at: 123_456,
    updated_at: 987_654,
    created_by: mockUser,
    updated_by: mockUser,
    depositor: mockUser,
    in_stock: true,
    systematic_name: "tesT",
    species: "abcd",
  },
  depositor: mockDepositor,
  plasmid: "aar-KO (aar cDNA with bsR cassette)",
  dbxrefs: ["11084033"],
  publications: [
    {
      id: "11084033",
      pub_date: "2000-11-17T00:00:00.000Z",
      title:
        "Myosin I phosphorylation is increased by chemotactic stimulation.",
      journal: "The Journal of biological chemistry",
      volume: "276",
      pages: "5235-5239",
      doi: "10.1074/jbc.m008319200",
      authors: [
        {
          last_name: "Gliksman",
        },
        {
          last_name: "Santoyo",
        },
        {
          last_name: "Novak",
        },
        {
          last_name: "Titus",
        },
      ],
    } as Publication,
  ],
  genes: [{ id: "aarA", name: "aarA" } as Gene],
  phenotypes: [],
  in_stock: true,
  created_at: 123_456,
  updated_at: 987_654,
  created_by: mockUser,
  updated_by: mockUser,
} as Strain

const unavailableStrain = {
  type: "strain",
  label: "aarA-",
  id: "DBS0236123",
  names: ["aar-", "aardvark null", "HAD 186", "catenin null"],
  systematic_name: "HAD186",
  characteristics: ["blasticidin resistant", "axenic", "null mutant"],
  summary: "aarA (aardvark) null mutant (β-catenin knock-out)",
  editableSummary: "aarA (aardvark) null mutant (β-catenin knock-out)",
  genotypes: ["axeA2", "axeB2", "axeC2", "aarA-[aarA-KO]", "bsR"],
  genetic_modification: "endogenous insertion",
  mutagenesis_method: "Homologous Recombination",
  species: "Dictyostelium discoideum",
  parent: {
    id: "DBS0350762",
    label: "AX2",
    created_at: 123_456,
    updated_at: 987_654,
    created_by: mockUser,
    updated_by: mockUser,
    depositor: mockUser,
    in_stock: true,
    systematic_name: "tesT",
    species: "abcd",
  },
  depositor: mockDepositor,
  plasmid: "aar-KO (aar cDNA with bsR cassette)",
  dbxrefs: ["11130075"],
  publications: [
    {
      id: "11084033",
      pub_date: "2000-11-17T00:00:00.000Z",
      title:
        "Myosin I phosphorylation is increased by chemotactic stimulation.",
      journal: "The Journal of biological chemistry",
      volume: "276",
      pages: "5235-5239",
      doi: "10.1074/jbc.m008319200",
      authors: [
        {
          last_name: "Gliksman",
        },
        {
          last_name: "Santoyo",
        },
        {
          last_name: "Novak",
        },
        {
          last_name: "Titus",
        },
      ],
    } as Publication,
  ],
  genes: [{ id: "aarA", name: "aarA" } as Gene],
  phenotypes: [],
  in_stock: true,
  created_at: 123_456,
  updated_at: 987_654,
  created_by: mockUser,
  updated_by: mockUser,
} as Strain

const strainWithPhenotype = {
  type: "strain",
  id: "DBS0350966",
  label: "spaA-",
  names: ["spaA-KO"],
  systematic_name: "DBS0350966",
  summary: "spaA null mutant",
  genotypes: ["axeA2", "axeB2", "axeC2", "spaA-", "[pSpaA-KO]", "bsR"],
  genetic_modification: "endogenous deletion with insertion",
  characteristics: ["blasticidin resistant", "axenic", "null mutant"],
  parent: {
    id: "DBS0235534",
    label: "AX2-214",
    created_at: 123_456,
    updated_at: 987_654,
    created_by: mockUser,
    updated_by: mockUser,
    depositor: mockUser,
    in_stock: true,
    systematic_name: "tesT",
    species: "abcd",
  },
  plasmid: "pSpaA-KO",
  dbxrefs: ["29704004"],
  publications: [],
  depositor: mockDepositor,
  species: "Dictyostelium discoideum",
  mutagenesis_method: "Homologous Recombination",
  phenotypes: [
    {
      phenotype: "abolished sporulation",
      note: "spores are round, do not stain with calcofluor and are not detergent resistant",
      assay: "fruiting body development",
      environment: "on non-nutrient agar",
      publication: {
        id: "11084033",
        pub_date: "2000-11-17T00:00:00.000Z",
        title:
          "Myosin I phosphorylation is increased by chemotactic stimulation.",
        journal: "The Journal of biological chemistry",
        volume: "276",
        pages: "5235-5239",
        doi: "10.1074/jbc.m008319200",
        authors: [
          {
            last_name: "Gliksman",
          },
          {
            last_name: "Santoyo",
          },
          {
            last_name: "Novak",
          },
          {
            last_name: "Titus",
          },
        ],
      },
    } as Phenotype,
  ],
  genes: [{ id: "spaA", name: "spaA" } as Gene],
  in_stock: true,
  created_at: 123_456,
  updated_at: 987_654,
  created_by: mockUser,
  updated_by: mockUser,
} as Strain

const gwdiData = {
  type: "strain",
  id: "DBS0351107",
  label: "gxcAA-",
  names: ["GWDI_409_E_8"],
  systematic_name: "DBS0351107",
  summary:
    "Genome Wide Dictyostelium Insertion bank (GWDI) gxcAA- mutant; insertion at position 6196058, chr 3; used enzyme: Hsp92II",
  editableSummary:
    "Genome Wide Dictyostelium Insertion bank (GWDI) gxcAA- mutant; insertion at position 6196058, chr 3; used enzyme: Hsp92II",
  genotypes: ["axeA1", "axeB1", "axeC1", "gxcAA-", "[bsRcas]", "bsR"],
  genetic_modification: "endogenous insertion",
  characteristics: ["axenic", "null mutant", "blasticidin resistant"],
  parent: {
    id: "DBS0235554",
    label: "AX4",
    created_at: 123_456,
    updated_at: 987_654,
    created_by: mockUser,
    updated_by: mockUser,
    depositor: mockUser,
    in_stock: true,
    systematic_name: "tesT",
    species: "abcd",
  },
  plasmid: "Blasticidin S resistance cassette",
  genes: [{ id: "gxcAA", name: "gxcAA" } as Gene],
  dbxrefs: [],
  depositor: mockDepositor,
  species: "Dictyostelium discoideum",
  mutagenesis_method: "Restriction Enzyme-Mediated Integration",
  phenotypes: [],
  publications: [],
  in_stock: true,
  created_at: 123_456,
  updated_at: 987_654,
  created_by: mockUser,
  updated_by: mockUser,
} as Strain

const catalogAvailableStrain = {
  id: "DBS0351365",
  label: "HL501/X55",
  summary: "heterozygote diploid tester strain; Parents: HL501 and X55",
  species: "Dictyostelium discoideum",
  parent: {
    id: "",
    label: "",
    created_at: 123_456,
    updated_at: 987_654,
    created_by: mockUser,
    updated_by: mockUser,
    depositor: mockUser,
    in_stock: false,
    systematic_name: "",
    species: "",
    __typename: "Strain",
  },
  depositor: mockDepositor,
  plasmid: "",
  dbxrefs: [],
  publications: [],
  genes: [],
  in_stock: true,
  systematic_name: "DL66",
  genotypes: ["cycA/cycA,whiA/+,acrA/+,tsgD12/+,bsgA/+,nagA211/+,manA2/+"],
  mutagenesis_method: "",
  genetic_modification: "",
  names: [],
  characteristics: [],
  phenotypes: [],
  created_at: 123_456,
  updated_at: 987_654,
  created_by: mockUser,
  updated_by: mockUser,
  __typename: "Strain",
} as Strain

export {
  availableStrain,
  unavailableStrain,
  strainWithPhenotype,
  gwdiData,
  catalogAvailableStrain,
}
