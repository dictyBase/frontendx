import { NameWithLink } from "dicty-graphql-schema"

const mockProteinInformation = {
  general_info: {
    gene_product: "substrate adhesion molecule",
    dictybase_id: "DDB0191090",
    description:
      "EGF repeat-containing 9 transmembrane molecule involved in substrate adhesion",
    protein_length: "952 aa",
    molecular_weight: "104,673.8 Da",
    aa_composition: {
      name: "View Amino Acid Composition",
      link: "http://dictybase.org/db/cgi-bin/amino_acid_comp.pl?primary_id=DDB0191090",
    },
    subcellular_location:
      "Cell membrane {ECO:0000305}; Multi-pass membrane protein {ECO:0000305}.",
    protein_existence: "Evidence at transcript level",
    note: "*This information was obtained from UniProt manually reviewed record",
  },
  external_links: [
    {
      name: "UniProtKB: Q8I7T3",
      link: "http://www.uniprot.org/entry/?query=Q8I7T3",
    },
    {
      name: "GenBank Protein",
      link: "http://www.ncbi.nlm.nih.gov/protein/EAL63177.1",
    },
  ] as NameWithLink[],
  protein_sequence:
    ">DDB0191090|DDB_G0288511 |Protein|gene: sadA on chromosome: 5 position 1638800 to 1641837\nMKSQKIGSMILLIGILLAIFNFAYSDDDIERFSINPEKPISFTSDQPGFPTSADFPIGSI\nLANSFYSFGGDVNYFQLNISLMEEFSKDGNTGSQATWNQYTSVPVSPISSAVTANRVYTM\nSIGSLNRVKKGDITSMESTDFLNDEKYSSLVTTLNGGVSYGDDVFFLSSKSATGEAVLIH\nINDTATGTFGTSSYDEILLDAAINDPSSITVDSKLGLAFIGDSDGDILVFNMTLKAKIAI\nYSNSSIANLRSSGVVDEERQLLYICGQAGGMNSYITQVDIFHYSATDITLLHSFTILGSL\nCPSAGIDVKGGQLFFSTTTSSGSQLIGTDTSGGNTGSLSENIANTQSVAISVDSITKTIS\nVFYPDSVFYGTFKSICPSDCSGHGECNYGTCVCDHNYQGQGCEEELCLTLNNCTGTDNGK\nCENGFCYCSSEWEGAQCEIRRCKDSCNGYGTCNTANYTCVCDSAHMGETCNELVPPPPCT\nYYTDSESCLSRTTCGWCEVDGLCKEGDRYGPFEGFCRTWFFDTNVETGVIALACIFIAFV\nGILYIIDIGTTVPIDIKRAKDYAEENKSGQFPKATHEEASVLWWRDQRSHKAWTFMDQFQ\nLISLVSHIGVVFPSRFISFTEYLDWSNLGIPLPPSINPPQIWSVPTDWTSNTARTILSMA\nQYENSLGSGDLYLLPNILFWFGLLLGVFLVPLLLAYAIISFMESLIHWKEVVTNRLIHVL\nVRILTFGYIGVLIAASFAMVTPLHDYRIIIPGAIIFVLYGIGLPIAIWFLLAVPEARLHN\nPTFKQRFGCLYVHYKPKTDHRFVVFMFIKRFIMAVIIGILSFKPMTNYPLTGTDLAVPIV\nQVVVIDIALIGYAVLLFIRKPYFDHYQLWLEYLLTAINIVTVSLSLTHIKSPSAAGELIA\nCLIQALALVACIAAYVVAWLQMRSSFIKKVKKYLCCCCKSSKSSGEIDLSKK*",
}

export { mockProteinInformation }
