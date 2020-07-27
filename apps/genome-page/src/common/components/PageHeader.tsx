import React from "react"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

const getHeaderValue = (pathname: string) => {
  const subroute = pathname.split("/").splice(-1).join()

  switch (subroute) {
    case "goannotations":
      return "Gene Ontology Annotations"
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
  /** Gene name to display */
  name: string
}

/**
 * Basic page header for all gene pages.
 */

const PageHeader = ({ name }: Props) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  return (
    <h2 className={classes.header}>
      {getHeaderValue(pathname)} for {name}
    </h2>
  )
}

export default PageHeader
