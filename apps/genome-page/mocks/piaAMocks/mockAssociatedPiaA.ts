import { AssociatedSequences, NameWithLink } from "dicty-graphql-schema"

const mockAssociatedPiaA: AssociatedSequences = {
  genbank_genomic_fragment: {
    name: "AF080675",
    link: "http://www.ncbi.nlm.nih.gov/nuccore/AF080675",
  } as NameWithLink,
  genbank_mrna: {
    name: "AF085194",
    link: "http://www.ncbi.nlm.nih.gov/nuccore/AF085194",
  } as NameWithLink,
  ests: [
    {
      name: "DDB0076691",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0076691",
    },
    {
      name: "DDB0077837",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0077837",
    },
    {
      name: "DDB0074797",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0074797",
    },
    {
      name: "DDB0045682",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0045682",
    },
    {
      name: "DDB0140149",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0140149",
    },
    {
      name: "DDB0043607",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0043607",
    },
  ] as NameWithLink[],
  more_link:
    "http://dictybase.org/db/cgi-bin/more_est.pl?feature_id=179785&gene_name=piaA",
}

export default mockAssociatedPiaA
