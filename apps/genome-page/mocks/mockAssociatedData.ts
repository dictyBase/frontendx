import { AssociatedSequences, NameWithLink } from "dicty-graphql-schema"

const mockAssociatedData: AssociatedSequences = {
  genbank_genomic_fragment: {
    name: "AY178767",
    link: "http://www.ncbi.nlm.nih.gov/nuccore/AY178767",
  } as NameWithLink,
  genbank_mrna: undefined,
  ests: [
    {
      name: "DDB0025213",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0025213",
    },
    {
      name: "DDB0029617",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0029617",
    },
    {
      name: "DDB0031643",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0031643",
    },
    {
      name: "DDB0085797",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0085797",
    },
    {
      name: "DDB0032475",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0032475",
    },
    {
      name: "DDB0024552",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0024552",
    },
  ] as NameWithLink[],
  more_link:
    "http://dictybase.org/db/cgi-bin/more_est.pl?feature_id=207301&gene_name=sadA",
}

export default mockAssociatedData
