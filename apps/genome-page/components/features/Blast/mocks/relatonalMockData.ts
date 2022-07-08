let programToDatabaseMock: { [key: string]: { [key: string]: string[] } } = {
  "Please Select a Program": {
    "Please Select an Organism": [""],
    All: [
      "Please Select a Database",
      "All Protein sequences - protein",
      "All Coding sequences - DNA",
    ],
    "Dictyostelium discoideum": [
      "Please Select a Database",
      "D. discoideum Protein sequences - protein",
      "D. discoideum Coding sequences - DNA",
      "D. discoideum Non-coding sequences - DNA",
      "D. discoideum Genomic sequences - DNA",
      "D. discoideum EST sequences - DNA",
      "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
    ],
    "Dictyostelium fasciculatum": [
      "Please Select a Database",
      "D. fasciculatum Chromosomal DNA - DNA",
      "D. fasciculatum Mitochondrial DNA - DNA",
      "D. fasciculatum Protein sequences - protein",
      "D. fasciculatum Coding sequences - DNA",
    ],
    "Dictyostelium purpureum": [
      "Please Select a Database",
      'D. purpureum Protein sequences (JGI "best proteins" set) - protein',
      'D. purpureum Coding sequences (JGI "best transcripts" set) - DNA',
      "D. purpureum EST sequences - DNA",
      "D. purpureum Chromosomal DNA: 838 contigs - DNA",
    ],
    "Polysphondylium pallidum": [
      "Please Select a Database",
      "P. pallidum Chromosomal DNA - DNA",
      "P. pallidum Mitochondrial DNA - DNA",
      "P. pallidum Protein sequences - protein",
      "P. pallidum Coding sequences - DNA",
    ],
  },
  "blastn - DNA query to DNA database": {
    "Please Select an Organism": [""],
    All: ["All Coding sequences - DNA"],
    "Dictyostelium discoideum": [
      "Please Select a Database",
      "D. discoideum Coding sequences - DNA",
      "D. discoideum Non-coding sequences - DNA",
      "D. discoideum Genomic sequences - DNA",
      "D. discoideum EST sequences - DNA",
      "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
    ],
    "Dictyostelium fasciculatum": [
      "Please Select a Database",
      "D. fasciculatum Chromosomal DNA - DNA",
      "D. fasciculatum Mitochondrial DNA - DNA",
      "D. fasciculatum Coding sequences - DNA",
    ],
    "Dictyostelium purpureum": [
      "Please Select a Database",
      'D. purpureum Coding sequences (JGI "best transcripts" set) - DNA',
      "D. purpureum EST sequences - DNA",
      "D. purpureum Chromosomal DNA: 838 contigs - DNA",
    ],
    "Polysphondylium pallidum": [
      "Please Select a Database",
      "P. pallidum Chromosomal DNA - DNA",
      "P. pallidum Mitochondrial DNA - DNA",
      "P. pallidum Coding sequences - DNA",
    ],
  },
  "blastp - Protein query to protein database": {
    "Please Select an Organism": [""],
    All: ["All Protein sequences - protein"],
    "Dictyostelium discoideum": ["D. discoideum Protein sequences - protein"],
    "Dictyostelium fasciculatum": [
      "D. fasciculatum Protein sequences - protein",
    ],
    "Dictyostelium purpureum": [
      'D. purpureum Protein sequences (JGI "best proteins" set) - protein',
    ],
    "Polysphondylium pallidum": ["P. pallidum Protein sequences - protein"],
  },
  "blastx - Translated (6 frames) DNA query to protein database": {
    "Please Select an Organism": [""],
    All: ["All Protein sequences - protein"],
    "Dictyostelium discoideum": ["D. discoideum Protein sequences - protein"],
    "Dictyostelium fasciculatum": [
      "D. fasciculatum Protein sequences - protein",
    ],
    "Dictyostelium purpureum": [
      'D. purpureum Protein sequences (JGI "best proteins" set) - protein',
    ],
    "Polysphondylium pallidum": ["P. pallidum Protein sequences - protein"],
  },
  "tblastx - Translated (6 frames) DNA query to translated (6 frames) DNA database":
    {
      "Please Select an Organism": [""],
      All: ["All Coding sequences - DNA"],
      "Dictyostelium discoideum": [
        "Please Select a Database",
        "D. discoideum Coding sequences - DNA",
        "D. discoideum Non-coding sequences - DNA",
        "D. discoideum Genomic sequences - DNA",
        "D. discoideum EST sequences - DNA",
        "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
      ],
      "Dictyostelium fasciculatum": [
        "Please Select a Database",
        "D. fasciculatum Chromosomal DNA - DNA",
        "D. fasciculatum Mitochondrial DNA - DNA",
        "D. fasciculatum Coding sequences - DNA",
      ],
      "Dictyostelium purpureum": [
        "Please Select a Database",
        'D. purpureum Coding sequences (JGI "best transcripts" set) - DNA',
        "D. purpureum EST sequences - DNA",
        "D. purpureum Chromosomal DNA: 838 contigs - DNA",
      ],
      "Polysphondylium pallidum": [
        "Please Select a Database",
        "P. pallidum Chromosomal DNA - DNA",
        "P. pallidum Mitochondrial DNA - DNA",
        "P. pallidum Coding sequences - DNA",
      ],
    },
  "tblastn - Protein query to DNA (6 frames) DNA database": {
    "Please Select an Organism": [""],
    All: ["All Coding sequences - DNA"],
    "Dictyostelium discoideum": [
      "Please Select a Database",
      "D. discoideum Coding sequences - DNA",
      "D. discoideum Non-coding sequences - DNA",
      "D. discoideum Genomic sequences - DNA",
      "D. discoideum EST sequences - DNA",
      "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
    ],
    "Dictyostelium fasciculatum": [
      "Please Select a Database",
      "D. fasciculatum Chromosomal DNA - DNA",
      "D. fasciculatum Mitochondrial DNA - DNA",
      "D. fasciculatum Coding sequences - DNA",
    ],
    "Dictyostelium purpureum": [
      "Please Select a Database",
      'D. purpureum Coding sequences (JGI "best transcripts" set) - DNA',
      "D. purpureum EST sequences - DNA",
      "D. purpureum Chromosomal DNA: 838 contigs - DNA",
    ],
    "Polysphondylium pallidum": [
      "Please Select a Database",
      "P. pallidum Chromosomal DNA - DNA",
      "P. pallidum Mitochondrial DNA - DNA",
      "P. pallidum Coding sequences - DNA",
    ],
  },
}

let programOptionsMock: { [key: string]: string[] } = {
  "Please Select a Sequence Type": [
    "Please Select a Program",
    "blastn - DNA query to DNA database",
    "blastp - Protein query to protein database",
    "blastx - Translated (6 frames) DNA query to protein database",
    "tblastx - Translated (6 frames) DNA query to translated (6 frames) DNA database",
    "tblastn - Protein query to DNA (6 frames) DNA database",
  ],
  Protein: [
    "Please Select a Program",
    "blastp - Protein query to protein database",
    "tblastn - Protein query to DNA (6 frames) DNA database",
  ],
  "DNA coding sequence": [
    "Please Select a Program",
    "blastn - DNA query to DNA database",
    "blastx - Translated (6 frames) DNA query to protein database",
    "tblastx - Translated (6 frames) DNA query to translated (6 frames) DNA database",
  ],
  "Genomic DNA": [
    "Please Select a Program",
    "blastn - DNA query to DNA database",
    "blastx - Translated (6 frames) DNA query to protein database",
    "tblastx - Translated (6 frames) DNA query to translated (6 frames) DNA database",
  ],
}

export { programToDatabaseMock, programOptionsMock }
