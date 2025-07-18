import { mockDepositor } from "./mockDepositor"
import { mockGenes } from "./mockGenes"
import { mockPublications } from "./mockPublications"
import { mockPlasmidSequence } from "./mockPlasmidSequence"

const mockPlasmid = {
  id: "DBP0001090",
  name: "pCpnA-GFP",
  summary:
    "parent plasmid: pTX-GFP vector (11.2 kb), cpnA cDNA (1.8kb); cpnA cDNA is cloned into the KpnI site of pTX-GFP; the KpnI site of the pTX-GFP plasmid for expression of copines with a GFP tag at the C-terminus.",
  in_stock: true,
  __typename: "Plasmid" as const,
  depositor: mockDepositor,
  genes: mockGenes,
  genbank_accession: "1234",
  publications: mockPublications,
  sequence: mockPlasmidSequence,
}
export { mockPlasmid }
