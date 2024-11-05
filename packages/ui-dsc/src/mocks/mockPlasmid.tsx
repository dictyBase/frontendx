import { Plasmid } from "dicty-graphql-schema"
import { mockUser } from "./mockUser"
import { mockDepositor } from "./mockDepositor"

const mockPlasmid: Plasmid = {
  id: "DBP0001090",
  name: "pCpnA-GFP",
  summary:
    "parent plasmid: pTX-GFP vector (11.2 kb), cpnA cDNA (1.8kb); cpnA cDNA is cloned into the KpnI site of pTX-GFP; the KpnI site of the pTX-GFP plasmid for expression of copines with a GFP tag at the C-terminus.",
  in_stock: true,
  __typename: "Plasmid",
  created_by: mockUser,
  created_at: 123_456,
  updated_by: mockUser,
  updated_at: 987_654,
  depositor: mockDepositor,
}

export { mockPlasmid }
