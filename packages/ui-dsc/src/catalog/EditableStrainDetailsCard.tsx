import React, { ReactNode } from "react"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { pipe } from "fp-ts/function"
import { not } from "fp-ts/Predicate"
import { isEmpty as SisEmpty, Ord as SOrd } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
import {
  filter as Afilter,
  map as Amap,
  head as Ahead,
  sort as Asort,
  match as Amatch,
} from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  fromPredicate as OfromPredicate,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
  map as Omap,
  match as Omatch,
} from "fp-ts/Option"
import { StrainQuery, Phenotype } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { fees } from "../fees"
import { StrainDetailsCardHeader } from "./StrainDetailsCardHeader"
import { DetailsListItem } from "./DetailsListItem"
import { EditableStrainPhenotypeList } from "./EditableStrainPhenotypeList"
import { TabPanel } from "./TabPanel"
import { GenotypesDisplay } from "./GenotypesDisplay"
import { AuthorizedStrainText } from "./AuthorizedStrainText"
import { AuthorizedEmptyStrainText } from "./AuthorizedEmptyStrainText"
import {
  EditableStrainList,
  StrainListEditableField,
} from "./EditableStrainList"
import { AuthorizedEmptyStrainList } from "./AuthorizedEmptyStrainList"
import { EditablePublicationList } from "./EditablePublicationList"
import { StrainTextEditableField } from "./EditingStrainText"
import { getDepositorName } from "../utils/getDepositorName"
import { hasUsableName } from "../utils/hasUsableName"
import { DetailsRow } from "../types"

/**
 * Renders an inline-editable text control or a Create button when the field is empty.
 *
 * @param id - Strain ID.
 * @param field - Scalar strain field key.
 * @param value - Current string value of the field.
 * @param displayValue - Optional custom ReactNode to render in read mode.
 * @returns The rendered AuthorizedStrainText or AuthorizedEmptyStrainText element.
 */
const renderEditableTextRow = (
  id: string,
  field: StrainTextEditableField,
  value: string | null | undefined,
  displayValue?: ReactNode,
) =>
  pipe(
    value,
    OfromNullable,
    OflatMap(OfromPredicate(not(SisEmpty))),
    Omatch(
      () => <AuthorizedEmptyStrainText id={id} field={field} />,
      (text) => (
        <AuthorizedStrainText
          id={id}
          field={field}
          text={text}
          displayValue={displayValue}
        />
      ),
    ),
  )

/**
 * Renders an inline-editable chip list or a Create button when the array field is empty.
 *
 * @param id - Strain ID.
 * @param field - Array strain field key.
 * @param values - Current array of strings.
 * @param shouldSort - Whether to sort items alphabetically.
 * @param getItemHref - Optional link generator for each chip item.
 * @returns The rendered EditableStrainList or AuthorizedEmptyStrainList element.
 */
const renderEditableListRow = (
  id: string,
  field: StrainListEditableField,
  values: Array<string> | null | undefined,
  shouldSort: boolean,
  getItemHref?: (item: string) => string,
) =>
  pipe(
    values,
    OfromNullable,
    Omap(Afilter(not(SisEmpty))),
    Omap((items) =>
      pipe(
        shouldSort,
        Bmatch(
          () => items,
          () => pipe(items, Asort(SOrd)),
        ),
      ),
    ),
    OgetOrElse((): Array<string> => []),
    Amatch(
      () => <AuthorizedEmptyStrainList id={id} field={field} />,
      (infoList) => (
        <EditableStrainList
          id={id}
          field={field}
          infoList={infoList}
          getItemHref={getItemHref}
        />
      ),
    ),
  )

/**
 * Renders the Parental Strain row with link display in read mode and inline editing.
 *
 * @param strainId - Strain ID.
 * @param parent - Parent strain object from the query.
 * @returns The rendered Parental Strain control.
 */
const renderEditableParentRow = (
  strainId: string,
  parent: NonNullable<StrainQuery["strain"]>["parent"],
) =>
  pipe(
    parent,
    OfromNullable,
    OflatMap(
      OfromPredicate(
        ({ id: parentId, label: parentLabel }) =>
          !SisEmpty(parentLabel) || !SisEmpty(parentId),
      ),
    ),
    Omatch(
      () => <AuthorizedEmptyStrainText id={strainId} field="parent" />,
      ({ id: parentId, label: parentLabel }) => {
        const displayLabel = pipe(
          parentLabel,
          SisEmpty,
          Bmatch(
            () => parentLabel,
            () => parentId,
          ),
        )
        const displayElement = pipe(
          parentId,
          SisEmpty,
          Bmatch(
            () => <Link to={`/strains/${parentId}`}>{displayLabel}</Link>,
            () => <>{displayLabel}</>,
          ),
        )
        return (
          <AuthorizedStrainText
            id={strainId}
            field="parent"
            text={displayLabel}
            displayValue={displayElement}
          />
        )
      },
    ),
  )

/**
 * Renders the Associated Gene(s) row as linked deletable chips with an add control.
 *
 * @param strainId - Strain ID.
 * @param genes - Genes array from the query.
 * @returns The rendered Associated Gene(s) control.
 */
const renderEditableGenesRow = (
  strainId: string,
  genes: NonNullable<StrainQuery["strain"]>["genes"],
) =>
  pipe(
    genes,
    OfromNullable,
    Omap(Afilter(hasUsableName)),
    Omap(Amap(({ name }) => name)),
    OgetOrElse((): Array<string> => []),
    (geneNames) =>
      renderEditableListRow(
        strainId,
        "genes",
        geneNames,
        false,
        (geneName) => `/gene/${geneName}`,
      ),
  )

/**
 * Renders the Genotype row with italicized formatting in read mode and inline text editing.
 *
 * @param strainId - Strain ID.
 * @param genotypes - Genotypes array from the query.
 * @returns The rendered Genotype control.
 */
const renderEditableGenotypeRow = (
  strainId: string,
  genotypes: NonNullable<StrainQuery["strain"]>["genotypes"],
) =>
  pipe(
    genotypes,
    OfromNullable,
    OflatMap(Ahead),
    OflatMap(OfromPredicate(not(SisEmpty))),
    Omatch(
      () => <AuthorizedEmptyStrainText id={strainId} field="genotypes" />,
      (genotype) => (
        <AuthorizedStrainText
          id={strainId}
          field="genotypes"
          text={genotype}
          displayValue={<GenotypesDisplay genotypes={genotype} />}
        />
      ),
    ),
  )

/**
 * Renders the Reference(s) row with publication details, per-item delete chips, and an add control.
 *
 * @param strainId - Strain ID.
 * @param publications - Publications array from the query.
 * @returns The rendered Reference(s) control.
 */
const renderEditablePublicationsRow = (
  strainId: string,
  publications: NonNullable<StrainQuery["strain"]>["publications"],
) =>
  pipe(
    publications,
    OfromNullable,
    OgetOrElse(
      (): NonNullable<NonNullable<StrainQuery["strain"]>["publications"]> => [],
    ),
    Amatch(
      () => <AuthorizedEmptyStrainList id={strainId} field="publications" />,
      (publicationList) => (
        <EditablePublicationList id={strainId} publications={publicationList} />
      ),
    ),
  )

/**
 * Generates the 14 strain detail rows with inline editing controls for authorized users.
 *
 * @param data - Strain query data.
 * @returns Array of DetailsRow items.
 */
const strainRowsGenerator = (
  data: NonNullable<StrainQuery["strain"]>,
): Array<DetailsRow> => [
  {
    id: 0,
    title: "Strain Descriptor",
    content: renderEditableTextRow(data.id, "label", data.label),
  },
  {
    id: 1,
    title: "Strain Names",
    content: renderEditableListRow(data.id, "names", data.names, true),
  },
  {
    id: 2,
    title: "Strain Summary",
    content: renderEditableTextRow(data.id, "summary", data.summary),
  },
  {
    id: 3,
    title: "Systematic Name",
    content: renderEditableTextRow(
      data.id,
      "systematic_name",
      data.systematic_name,
    ),
  },
  {
    id: 4,
    title: "Strain Characteristics",
    content: renderEditableListRow(
      data.id,
      "characteristics",
      data.characteristics,
      true,
    ),
  },
  {
    id: 5,
    title: "Genetic Modification",
    content: renderEditableTextRow(
      data.id,
      "genetic_modification",
      data.genetic_modification,
    ),
  },
  {
    id: 6,
    title: "Mutagenesis Method",
    content: renderEditableTextRow(
      data.id,
      "mutagenesis_method",
      data.mutagenesis_method,
    ),
  },
  {
    id: 7,
    title: "Parental Strain",
    content: renderEditableParentRow(data.id, data.parent),
  },
  {
    id: 8,
    title: "Plasmid",
    content: renderEditableTextRow(data.id, "plasmid", data.plasmid),
  },
  {
    id: 9,
    title: "Associated Gene(s)",
    content: renderEditableGenesRow(data.id, data.genes),
  },
  {
    id: 10,
    title: "Genotype",
    content: renderEditableGenotypeRow(data.id, data.genotypes),
  },
  {
    id: 11,
    title: "Species",
    content: renderEditableTextRow(data.id, "species", data.species),
  },
  {
    id: 12,
    title: "Depositor",
    content: renderEditableTextRow(
      data.id,
      "depositor",
      getDepositorName(data.depositor),
    ),
  },
  {
    id: 13,
    title: "Reference(s)",
    content: renderEditablePublicationsRow(data.id, data.publications),
  },
]

type Properties = {
  data: NonNullable<StrainQuery["strain"]>
  tabValue: number
  setTabValue: React.Dispatch<React.SetStateAction<number>>
}

/**
 * EditableStrainDetailsCard displays the strain details and phenotypes tabs
 * with inline editing capabilities for authorized users.
 *
 * @param properties - Strain data and active tab state.
 * @returns The rendered EditableStrainDetailsCard component.
 */
const EditableStrainDetailsCard = ({
  data,
  tabValue,
  setTabValue,
}: Properties) => {
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  const rows = strainRowsGenerator(data)

  const cartData = {
    __typename: data.__typename as "Strain",
    id: data.id,
    label: data.label,
    summary: pipe(
      data.summary,
      OfromNullable,
      OgetOrElse(() => ""),
    ),
    fee: fees.STRAIN_FEE,
    in_stock: data.in_stock,
  }

  const phenotypes = pipe(
    data.phenotypes,
    OfromNullable,
    OgetOrElse(
      (): NonNullable<NonNullable<StrainQuery["strain"]>["phenotypes"]> => [],
    ),
  )
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
          <List sx={{ width: "100%", padding: "0px !important" }}>
            {match(numberPhenotypes)
              .with(
                P.when((c) => c < 1),
                () => (
                  <ListItem
                    divider
                    sx={{ color: "#002f5e", paddingRight: "8px" }}>
                    {header}
                  </ListItem>
                ),
              )
              .otherwise(() => (
                <></>
              ))}
            <TabPanel value={tabValue} index={0}>
              {pipe(
                rows,
                Amap((row: DetailsRow) => (
                  <DetailsListItem
                    title={row.title}
                    content={row.content}
                    key={row.id}
                  />
                )),
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <EditableStrainPhenotypeList
                strainId={data.id}
                phenotypes={phenotypes as Array<Phenotype>}
              />
            </TabPanel>
          </List>
        </Grid>
      </Card>
    </Box>
  )
}

export { EditableStrainDetailsCard }
