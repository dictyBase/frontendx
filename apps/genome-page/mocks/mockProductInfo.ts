import { ProductInformation, GenomicCoordinates } from 'dicty-graphql-schema';

const mockProductInfo: ProductInformation[] = [
  {
    protein_length: "",
    protein_molecular_weight: "",
    more_protein_data: "",
    genomic_coords: [
      {exon: "", local_coords: "", chrom_coords: ""} as GenomicCoordinates
    ]
  }
]

export default mockProductInfo
