import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { PlasmidQuery, User } from "dicty-graphql-schema"
import { fees } from "../fees"
import { PlasmidDetailsCardHeader } from "./PlasmidDetailsCardHeader"
import { DetailsListItem } from "./DetailsListItem"
import { useStyles } from "./styles"
import { GenesDisplay } from "./GenesDisplay"
import { PublicationDisplay } from "./PublicationDisplay"
import { getDepositorName } from "../utils/getDepositorName"

const plasmidRowsGenerator = (
  data: PlasmidQuery["plasmid"],
  depositor: string,
  publications: NonNullable<
    NonNullable<PlasmidQuery["plasmid"]>["publications"]
  >,
  genes: JSX.Element,
) => [
  {
    title: "Plasmid Descriptor",
    content: data?.name,
  },
  {
    title: "Plasmid Summary",
    content: data?.summary,
  },
  {
    title: "Associated Gene(s)",
    content: genes,
  },
  {
    title: "Depositor",
    content: depositor,
  },
  {
    title: "Reference(s)",
    content: publications.map((item) => (
      <PublicationDisplay publication={item} key={item.id} />
    )),
  },
]

type Properties = {
  plasmid: NonNullable<PlasmidQuery["plasmid"]>
}

const PlasmidDetailsCard = ({ plasmid }: Properties) => {
  const classes = useStyles()

  const publications = pipe(
    plasmid.publications,
    OfromNullable,
    OgetOrElse(
      () =>
        [] as NonNullable<NonNullable<PlasmidQuery["plasmid"]>["publications"]>,
    ),
  )
  const genes = pipe(
    plasmid.genes,
    OfromNullable,
    OgetOrElse(
      () => [] as NonNullable<NonNullable<PlasmidQuery["plasmid"]>["genes"]>,
    ),
  )
  const summary = pipe(
    plasmid.summary,
    OfromNullable,
    OgetOrElse(() => ""),
  )

  const depositor = plasmid.depositor as User

  const rows = plasmidRowsGenerator(
    plasmid,
    getDepositorName(depositor),
    publications,
    <GenesDisplay genes={genes} />,
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
