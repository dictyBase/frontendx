import React from "react"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import {
  Gene,
  StrainQuery,
  Phenotype,
  Publication,
  User,
} from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { fees } from "../fees"
import { StrainDetailsCardHeader } from "./StrainDetailsCardHeader"
import { DetailsListItem } from "./DetailsListItem"
import { StrainPhenotypeList } from "./StrainPhenotypeList"
import { useStyles } from "./styles"
import { TabPanel } from "./TabPanel"
import { GenesDisplay } from "./GenesDisplay"
import { PublicationDisplay } from "./PublicationDisplay"
import { GenotypesDisplay } from "./GenotypesDisplay"
import { getDepositorName } from "../utils/getDepositorName"
import { DetailsRow } from "../types"

const strainRowsGenerator = (
  data: StrainQuery["strain"],
  parent: string | JSX.Element,
  depositor: string,
  publications: Publication[],
  genes: JSX.Element,
  genotypes: JSX.Element,
) => [
  {
    id: 0,
    title: "Strain Descriptor",
    content: data?.label,
  },
  {
    id: 1,
    title: "Strain Names",
    content: data?.names?.slice().sort().join(", "),
  },
  {
    id: 2,
    title: "Strain Summary",
    content: data?.summary,
  },
  {
    id: 3,
    title: "Systematic Name",
    content: data?.systematic_name,
  },
  {
    id: 4,
    title: "Strain Characteristics",
    content: data?.characteristics?.slice().sort().join(", "),
  },
  {
    id: 5,
    title: "Genetic Modification",
    content: data?.genetic_modification,
  },
  {
    id: 6,
    title: "Mutagenesis Method",
    content: data?.mutagenesis_method,
  },
  {
    id: 7,
    title: "Parental Strain",
    content: parent,
  },
  {
    id: 8,
    title: "Plasmid",
    content: data?.plasmid,
  },
  {
    id: 9,
    title: "Associated Gene(s)",
    content: genes,
  },
  {
    id: 10,
    title: "Genotype",
    content: genotypes,
  },
  { id: 11, title: "Species", content: data?.species },
  {
    id: 12,
    title: "Depositor",
    content: depositor,
  },
  {
    id: 13,
    title: "Reference(s)",
    content: publications.map((item) => (
      <PublicationDisplay publication={item} key={item.id} />
    )),
  },
]

type Properties = {
  data: NonNullable<StrainQuery["strain"]>
  tabValue: number
  setTabValue: React.Dispatch<React.SetStateAction<number>>
}

const StrainDetailsCard = ({ data, tabValue, setTabValue }: Properties) => {
  const classes = useStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  const parent = data.parent ? (
    <Link to={`/strains/${data.parent.id}`}>{data.parent.label}</Link>
  ) : (
    ""
  )
  const publications = data.publications as Array<Publication>
  const genes = data.genes as Array<Gene>
  const depositor = data.depositor as User
  const genotypes = data.genotypes as Array<string>

  const rows = strainRowsGenerator(
    data,
    parent,
    getDepositorName(depositor),
    publications,
    <GenesDisplay genes={genes} />,
    <GenotypesDisplay genotypes={genotypes[0] as string} />,
  )

  const cartData = {
    __typename: data.__typename as "Strain",
    id: data.id,
    label: data.label,
    summary: data.summary as string,
    fee: fees.STRAIN_FEE,
    in_stock: data.in_stock,
  }

  const phenotypes = data.phenotypes as Phenotype[]
  const numberPhenotypes = phenotypes.length

  const header = (
    <StrainDetailsCardHeader
      value={tabValue}
      handleChange={handleChange}
      phenotypeLength={numberPhenotypes}
      cartData={cartData}
    />
  )

  return (
    <Box textAlign="center" mb={3}>
      {match(numberPhenotypes)
        .with(
          P.when((c) => c > 0),
          () => header,
        )
        .otherwise(() => (
          <></>
        ))}
      <Card raised>
        <Grid container>
          <List className={classes.list}>
            {match(numberPhenotypes)
              .with(
                P.when((c) => c < 1),
                () => (
                  <ListItem divider className={classes.cardHeader}>
                    {header}
                  </ListItem>
                ),
              )
              .otherwise(() => (
                <></>
              ))}
            <TabPanel value={tabValue} index={0}>
              {rows.map((row: DetailsRow) => (
                <DetailsListItem
                  title={row.title}
                  content={row.content}
                  key={row.id}
                />
              ))}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StrainPhenotypeList phenotypes={phenotypes} />
            </TabPanel>
          </List>
        </Grid>
      </Card>
    </Box>
  )
}

export { StrainDetailsCard }
