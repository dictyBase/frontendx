import React from "react"
import { pipe } from "fp-ts/function"
import {
  Ord as SOrd,
  Monoid as SMonoid,
  isEmpty as SisEmpty,
} from "fp-ts/string"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  flatMap as OflatMap,
} from "fp-ts/Option"
import {
  map as Amap,
  head as Ahead,
  sort as Asort,
  filter as Afilter,
  intercalate as Aintercalate,
} from "fp-ts/Array"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { StrainQuery, Phenotype } from "dicty-graphql-schema"
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

const strainRowsGenerator = ({
  label,
  names,
  summary,
  systematic_name,
  characteristics,
  genetic_modification,
  mutagenesis_method,
  parent,
  plasmid,
  genes,
  genotypes,
  species,
  depositor,
  publications,
}: NonNullable<StrainQuery["strain"]>) => [
  {
    id: 0,
    title: "Strain Descriptor",
    content: label,
  },
  {
    id: 1,
    title: "Strain Names",
    content: pipe(
      names,
      OfromNullable,
      Omap(Asort(SOrd)),
      Omap(Aintercalate(SMonoid)(", ")),
      OgetOrElse(() => ""),
    ),
  },
  {
    id: 2,
    title: "Strain Summary",
    content: summary,
  },
  {
    id: 3,
    title: "Systematic Name",
    content: systematic_name,
  },
  {
    id: 4,
    title: "Strain Characteristics",
    content: pipe(
      characteristics,
      OfromNullable,
      Omap(Asort(SOrd)),
      Omap(Aintercalate(SMonoid)(", ")),
      OgetOrElse(() => ""),
    ),
  },
  {
    id: 5,
    title: "Genetic Modification",
    content: genetic_modification,
  },
  {
    id: 6,
    title: "Mutagenesis Method",
    content: mutagenesis_method,
  },
  {
    id: 7,
    title: "Parental Strain",
    content: pipe(
      parent,
      OfromNullable,
      Omap(({ id, label: parentLabel }) => (
        <Link to={`/strains/${id}`}>{parentLabel}</Link>
      )),
      OgetOrElse(() => <></>),
    ),
  },
  {
    id: 8,
    title: "Plasmid",
    content: plasmid,
  },
  {
    id: 9,
    title: "Associated Gene(s)",
    content: pipe(
      genes,
      OfromNullable,
      Omap(Afilter(({ name }) => !SisEmpty(name))),
      Omap((g) => <GenesDisplay genes={g} />),
      OgetOrElse(() => <></>),
    ),
  },
  {
    id: 10,
    title: "Genotype",
    content: pipe(
      genotypes,
      OfromNullable,
      OflatMap(Ahead),
      Omap((g) => <GenotypesDisplay genotypes={g} />),
      OgetOrElse(() => <></>),
    ),
  },
  { id: 11, title: "Species", content: species },
  {
    id: 12,
    title: "Depositor",
    content: getDepositorName(depositor),
  },
  {
    id: 13,
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
  data: NonNullable<StrainQuery["strain"]>
  tabValue: number
  setTabValue: React.Dispatch<React.SetStateAction<number>>
}

const StrainDetailsCard = ({ data, tabValue, setTabValue }: Properties) => {
  const classes = useStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  const rows = strainRowsGenerator(data)

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
