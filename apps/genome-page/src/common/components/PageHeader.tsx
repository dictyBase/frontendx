import React from "react"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

const getHeaderValue = (pathname: string) => {
  const subroute = pathname.split("/").splice(-1).join()

  switch (subroute) {
    case "phenotypes":
      return "Gene Phenotypes"
    case "goannotations":
      return "Gene Ontology Annotations"
    case "references":
      return "References"
    default:
      return "Gene Summary"
  }
}

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
})

type Props = {
  /** Gene name or ID to display */
  gene: string
}

/**
 * Basic page header for all gene pages.
 */

const PageHeader = ({ gene }: Props) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  return (
    <h2 className={classes.header}>
      {getHeaderValue(pathname)} for {gene}
    </h2>
  )
}

export default PageHeader
