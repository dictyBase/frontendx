import { ProductInformation, GenomicCoordinates } from 'dicty-graphql-schema';

const mockProductInfo: ProductInformation[] = [
  {
    protein_coding_gene: "DDB0185055",
    protein_length: "1,148 aa",
    protein_molecular_weight: "129,527.5 Da",
    more_protein_data: "/gene/DDB_G0277399/protein/DDB0185055",
    genomic_coords: [
      {exon: "3", local_coords: "964 - 1203", chrom_coords: "8028649 - 8028888"} as GenomicCoordinates,
      {exon: "2", local_coords: "388 - 871", chrom_coords: "8028073 - 8028556"} as GenomicCoordinates,
      {exon: "4", local_coords: "1273 - 3702", chrom_coords: "8028958 - 8031387"} as GenomicCoordinates,
      {exon: "1", local_coords: "1 - 293", chrom_coords: "8027686 - 8027978"} as GenomicCoordinates,
    ]
  }
]

export default mockProductInfo
