import { useState } from "react"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { flow, pipe } from "fp-ts/function"
import { map as Amap, match as Amatch, sort as Asort } from "fp-ts/Array"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { PublicationRow } from "./PublicationRow"
import { ReferencesToolbar } from "./ReferencesToolbar"
import { NoMatchDisplay } from "./NoMatchDisplay"
import { useSearchParameters } from "./useSearchWithRouter"
import { orderFunctions, type OrderFunctionKeys } from "./referenceOrderHelpers"
import { filterPublications } from "./filterPublications"

type Publications = NonNullable<
  ListPublicationsWithGeneQuery["listPublicationsWithGene"]
>

interface Properties {
  publications: Publications
}

const SEARCH_FIELDS = ["title", "author", "gene"]

const ReferencesDataTable = ({ publications }: Properties) => {
  const [order, setOrder] = useState<OrderFunctionKeys>("Newest First")
  const [searchParameters] = useSearchParameters(SEARCH_FIELDS)
  const filtered = filterPublications(publications, searchParameters)
  const filteredAndSorted = pipe(filtered, Asort(orderFunctions[order]))

  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table aria-label="phenotypes-table">
        <TableHead sx={{ backgroundColor: "#e6f2ff" }}>
          <TableRow sx={{ "& > th": { fontWeight: "bold" } }}>
            <TableCell sx={{ minWidth: "70%" }}>
              <ReferencesToolbar
                totalPublicationCount={publications.length}
                filteredPublicationCount={filteredAndSorted.length}
                searchFields={SEARCH_FIELDS}
                order={order}
                setOrder={setOrder}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pipe(
            filteredAndSorted,
            Amatch(
              () => <NoMatchDisplay />,
              flow(
                Amap((publication) => (
                  <PublicationRow
                    publication={publication}
                    key={publication.id}
                  />
                )),
                (p) => <>{p}</>,
              ),
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesDataTable }
