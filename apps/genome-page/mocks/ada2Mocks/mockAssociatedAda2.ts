import { AssociatedSequences, NameWithLink } from "dicty-graphql-schema"

const mockAssociatedAda2: AssociatedSequences = {
  genbank_genomic_fragment: null,
  genbank_mrna: null,
  ests: [
    {
      name: "DDB0117409",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0117409",
    },
    {
      name: "DDB0124331",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0124331",
    },
    {
      name: "DDB0062554",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0062554",
    },
    {
      name: "DDB0073584",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0073584",
    },
    {
      name: "DDB0137164",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0137164",
    },
    {
      name: "DDB0135433",
      link: "http://dictybase.org/db/cgi-bin/feature_page.pl?primary_id=DDB0135433",
    },
  ] as NameWithLink[],
  more_link:
    "http://dictybase.org/db/cgi-bin/more_est.pl?feature_id=186572&gene_name=ada2",
}

export default mockAssociatedAda2
