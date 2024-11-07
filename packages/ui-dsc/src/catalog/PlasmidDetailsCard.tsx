import { pipe } from "fp-ts/function"
import { Monoid as SMonoid } from "fp-ts/string"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { map as Amap, intercalate as Aintercalate } from "fp-ts/Array"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { PlasmidQuery } from "dicty-graphql-schema"
import { fees } from "../fees"
import { PlasmidDetailsCardHeader } from "./PlasmidDetailsCardHeader"
import { DetailsListItem } from "./DetailsListItem"
import { useStyles } from "./styles"
import { GenesDisplay } from "./GenesDisplay"
import { PublicationDisplay } from "./PublicationDisplay"
import { PlasmidSequenceDisplay } from "./PlasmidSequenceDisplay"
import { getDepositorName } from "../utils/getDepositorName"

const plasmidRowsGenerator = ({
  name,
  summary,
  keywords,
  sequence,
  genes,
  genbank_accession,
  depositor,
  publications,
}: NonNullable<PlasmidQuery["plasmid"]>) => [
  {
    title: "Plasmid Descriptor",
    content: name,
  },
  {
    title: "Plasmid Summary",
    content: summary,
  },
  {
    title: "Key Words",
    content: pipe(
      keywords,
      OfromNullable,
      Omap(Aintercalate(SMonoid)(",")),
      OgetOrElse(() => ""),
    ),
  },
  {
    title: "GenBank Accession Number",
    content: genbank_accession,
  },
  {
    title: "Depositor",
    content: getDepositorName(depositor),
  },
  {
    title: "Associated Gene(s)",
    content: pipe(
      genes,
      OfromNullable,
      OgetOrElse(
        () => [] as NonNullable<NonNullable<PlasmidQuery["plasmid"]>["genes"]>,
      ),
      (g) => <GenesDisplay genes={g} />,
    ),
  },
  {
    title: "Sequence",
    content: pipe(
      sequence,
      OfromNullable,
      Omap((s) => <PlasmidSequenceDisplay sequence={s} />),
      OgetOrElse(() => <></>),
    ),
  },
  {
    title: "Reference(s)",
    content: pipe(
      publications,
      OfromNullable,
      Omap(
        Amap((item) => <PublicationDisplay publication={item} key={item.id} />),
      ),
      OgetOrElse(() => [] as Array<JSX.Element>),
    ),
  },
]

type Properties = {
  plasmid: NonNullable<PlasmidQuery["plasmid"]>
}

const PlasmidDetailsCard = ({ plasmid }: Properties) => {
  const classes = useStyles()

  const summary = pipe(
    plasmid.summary,
    OfromNullable,
    OgetOrElse(() => ""),
  )

  const cartData = {
    __typename: plasmid.__typename as "Plasmid",
    id: plasmid.id,
    name: plasmid.name,
    summary,
    fee: fees.STRAIN_FEE,
    in_stock: plasmid.in_stock,
  }

  const header = <PlasmidDetailsCardHeader cartData={cartData} />
  const rows = plasmidRowsGenerator(plasmid)

  return (
    <Box textAlign="center" mb={3}>
      <Card raised>
        <Grid container>
          <List className={classes.list}>
            <ListItem divider className={classes.cardHeader}>
              {header}
            </ListItem>
            {rows.map((row) => (
              <DetailsListItem
                title={row.title}
                content={row.content}
                key={row.title}
              />
            ))}
          </List>
        </Grid>
      </Card>
    </Box>
  )
}

export { PlasmidDetailsCard }
