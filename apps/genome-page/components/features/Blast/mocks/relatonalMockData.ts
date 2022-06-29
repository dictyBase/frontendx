let programToDatabaseMock: { [key: string]: string[] } = {
  "Please Select a Program": [
    "Please Select a Database",
    "D. discoideum Protein sequences - protein",
    "D. discoideum Coding sequences - DNA",
    "D. discoideum Non-coding sequences - DNA",
    "D. discoideum Genomic sequences - DNA",
    "D. discoideum EST sequences - DNA",
    "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
  ],
  "blastn - DNA query to DNA database": [
    "Please Select a Database",
    "D. discoideum Coding sequences - DNA",
    "D. discoideum Non-coding sequences - DNA",
    "D. discoideum Genomic sequences - DNA",
    "D. discoideum EST sequences - DNA",
    "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
  ],
  "blastp - Protein query to protein database": [
    "D. discoideum Protein sequences - protein",
  ],
  "blastx - Translated (6 frames) DNA query to protein database": [
    "D. discoideum Protein sequences - protein",
  ],
  "tblastx - Translated (6 frames) DNA query to translated (6frames) DNA database":
    [
      "Please Select a Database",
      "D. discoideum Coding sequences - DNA",
      "D. discoideum Non-coding sequences - DNA",
      "D. discoideum Genomic sequences - DNA",
      "D. discoideum EST sequences - DNA",
      "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
    ],
  "tblastn - Protein query to DNA (6 frames) DNA database": [
    "Please Select a Database",
    "D. discoideum Coding sequences - DNA",
    "D. discoideum Non-coding sequences - DNA",
    "D. discoideum Genomic sequences - DNA",
    "D. discoideum EST sequences - DNA",
    "D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating contigs - DNA",
  ],
}

export default programToDatabaseMock
