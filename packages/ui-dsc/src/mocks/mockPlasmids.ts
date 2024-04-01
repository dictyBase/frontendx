import { type PlasmidItem } from "../types"

const mockPlasmids: Array<PlasmidItem> = [
    {
      id: "DBP0001090",
      name: "pCpnA-GFP",
      summary: "parent plasmid: pTX-GFP vector (11.2 kb), cpnA cDNA (1.8kb); cpnA cDNA is cloned into the KpnI site of pTX-GFP; the KpnI site of the pTX-GFP plasmid for expression of copines with a GFP tag at the C-terminus.",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001089",
      name: "pGFP-CpnA",
      summary: "parent plasmid: pTX-GFP vector (11.2 kb), cpnA cDNA (1.8kb); cpnA cDNA is cloned into the SacI site of pTX-GFP; The cDNA clones of cpnA were subcloned into the SacI site of the pTX-GFP plasmid for the expression of the copine with a GFP tag at the N-terminus;",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001088",
      name: "pCreCpnCKO",
      summary: "cpnC 5' flanking sequence insert (987 bases); cpnC 3' flanking sequence  (987 bases); pLPBLP (4.45 kb); Primers were used to amplify 5' and 3 flanking cpnC gene flanking sequences from NC4A2 genomic DNA.   CpnC KO 5' forward:   GGT ACC TGT GGT GAT TCT TGT GCA GT  CpnC KO 5' reverse:    AAG CTT TTG GAA ACC TCC TGG ACC TCT  CpnC KO 3' Forward:  GTG GTC CAA CTA ATT TTG CAT CAG  CpnC KO 3' Reverse:   TCG AAT TAC GTC CTG ATG GTG  The  986 bp 5' flanking sequence was cloned into the  KpnI and HindIII sites of the pLP BLP plasmid. The 987 bp 3' flanking sequence bp flanking sequence was cloned into the BamHI and NotI sites of the pL BLP plasmid.",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001087",
      name: "pBSRIICpnAKO",
      summary: "5' flanking cpnA gene sequence (.9 kb), 3' cpnA flanking sequence (1.5 kb); pLPBLP (4.45 kb); The DNA cpnA knockout construct was made by PCR subcloning of the 5' and 3' &#64258;anking sequences of cpnA on either side of the bsr gene into the pBSIIbsr plasmid. A 900-bp fragment upstream of the cpnA gene was PCR ampli&#64257;ed from genomic DNA by use of the following primers: 5'-AAAATTTTAACTTCTTCATCATCATCATCT-3' and 5'-GTGAC CAAAATAACCTT-3'. A 1,500-bp fragment downstream of the cpnA gene was PCR ampli&#64257;ed from genomic DNA by using the following primers: 5'-GG TGTATCAAATGTATCATTAG-3' and 5'-CAAATGGTGGAAGGGCTTACC-3'; The 902 kb 5' flanking sequence was cloned into the KpnI site of the pBSIIbsr plasmid.",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001086",
      name: "pCreCpnAKO",
      summary: "5? flanking cpnA gene sequence (.9 kb), 3? cpnA flanking sequence (1.5 kb); pLPBLP (4.45 kb); The DNA cpnA knockout construct was made by PCR subcloning of the 5? and 3? &#64258;anking sequences of cpnA on either side of the bsr gene into the pBSIIbsr  plasmid. A 900-bp fragment upstream of the cpnA gene was PCR ampli&#64257;ed from genomic DNA by use of the following primers: 5?-AAAATTTTAACTTCTTCATCATCATCATCT-3? and 5?-GTGAC CAAAATAACCTT-3?. A 1,500-bp fragment downstream of the cpnA gene was PCR ampli&#64257;ed from genomic DNA by using the following primers: 5?-GG TGTATCAAATGTATCATTAG-3? and 5?-CAAATGGTGGAAGGGCTTACC-3?;",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001085",
      name: "pLoxNeoIII",
      summary: "Contains G418 cassette and loxP sequence. Made by filling in XbaI site of pLoxNeoI, followed by recloning of the pLoxNeo fragment into pBluescript SK- using the BamHI and HindIII sites. This construct has a greater choice of restriction sites for cloning; total vector length: 5.402 kb",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001084",
      name: "pB17S-EYFP",
      summary: "Vector for expression of proteins with C-terminal EYFP in Dictyostelium. Yellow fluorescence protein under A15 promoter. XhoI/XbaI for YFP exc. Made in C.J. Weijer lab by insertion of EYFP in pB17S of Manstein et al., (Manstein et al., 1995); YFP insert length: ~0.8 kb; total vector length: 6.81 kb",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001083",
      name: "pEcmA-ile-gal",
      summary: "Promoter of ecmA (DDB_G0277853) fused to the unstable lacZ reporter ? the ile-gal construct (Detterbeck et al., 1994); Insert cloned into BamHI/BglII sites but BamHI site destroyed; Can be digested out using XbaI/BglII; insert length: ~2.3 kb insert; total vector length: 11 kb; created by: Harry MacWilliams",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001082",
      name: "p[cdl1a]:cdl1a-YFP",
      summary: "Ddis cdl1a expression construct. D.discoideum cdl1A (DDB_G0286351) expressed from its own promoter and C-terminally fused to enhanced YFP in vector pBS17S-EYFP (prepared in C.J. Weijer lab from pDXAHC (Manstein et al., 1995)). Cdl1A-promoter cloned in with SalI/HindIII and cdl1A-coding sequence cloned in with BamHI/XhoI.; insert lengths: 3.1 kb cdl1A-promoter + 1.8 kb (3?) cdl1A coding; total vector length 11.339 kb",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001081",
      name: "pVac14-KO",
      summary: "Construct used for knockout of DDB_G0289233 (vac14);Inserts cloned into pLPBLP with KpnI/SalI (5' insert) and NdeI/BamHI (3' insert);parental vector: pLPBLP;insert lengths: 1.116 kb (5') + 1.108 kb (3');total vector length: 6.708 kb",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001080",
      name: "pPvio-cdl1-KO",
      summary: "Construct used for knockout of Pvio_g1607 (cdl1);Inserts cloned into pLoxP-NeoIII with KpnI/XhoI (5'    insert) and BamHI/XbaI (3' insert);parental vector: pLoxP-NeoIII;insert lengths: 1.504 kb (5') + 1.851 kb (3'); total vector length: 8.732 kb",
      in_stock: true,
      __typename: "Plasmid"
    },
    {
      id: "DBP0001079",
      name: "pPikfyve-KO",
      summary: "Construct used for knockout of DDB_G0279149 (pikfyve);Inserts cloned into pLPBLP with SalI/HindIII (5' insert) and PstI/BamHI (3' insert);parental vector: pLPBLP;insert lengths: 1.163 kb (5') + 1.238 kb (3');total vector length: 6.911 kb",
      in_stock: true,
      __typename: "Plasmid"
    }
]

export { mockPlasmids }
