import { ProductInformation, GenomicCoordinates } from "dicty-graphql-schema"

const mockProductInfo: ProductInformation[] = [
  {
    protein_coding_gene: {
      name: "DDB0191090",
      link: "http://dictybase.org/gene/DDB_G0288511/feature/DDB0191090",
    },
    protein_length: "952 aa",
    protein_molecular_weight: "104,673.8 Da",
    more_protein_data:
      "http://dictybase.org/gene/DDB_G0288511/protein/DDB0191090",
    genomic_coords: [
      {
        exon: "1",
        local_coords: "1 - 626",
        chrom_coords: "1641837 - 1641212",
      } as GenomicCoordinates,
      {
        exon: "2",
        local_coords: "705 - 1291",
        chrom_coords: "1641133 - 1640547",
      } as GenomicCoordinates,
      {
        exon: "3",
        local_coords: "1393 - 3038",
        chrom_coords: "1640445 - 1638800",
      } as GenomicCoordinates,
    ],
  },
]

export default mockProductInfo
