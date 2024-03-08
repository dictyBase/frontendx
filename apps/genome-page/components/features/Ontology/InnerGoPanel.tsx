import React from "react"
import Grid from "@material-ui/core/Grid"
import { PanelWrapper } from "components/panels/PanelWrapper"
import Typography from "@material-ui/core/Typography"
import { GoAnnotation } from "dicty-graphql-schema"
import { GoaDisplayTable } from "./Table/GoaDisplayTable"

type Properties = {
  /** GO Annotations */
  data: GoAnnotation[]
}

/**
 * Displays the inside of GO Tab panels
 */

const InnerGoPanel = ({ data }: Properties) => {
  // set variables that represent filtered arrays for use in each row
  const molecular = data.filter((item) => item.type === "molecular_function")
  const biological = data.filter((item) => item.type === "biological_process")
  const cellular = data.filter((item) => item.type === "cellular_component")

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <Typography component="div">
          {molecular.length > 0 && (
            <PanelWrapper title="Molecular Function">
              <GoaDisplayTable data={molecular} />
            </PanelWrapper>
          )}
          {biological.length > 0 && (
            <PanelWrapper title="Biological Process">
              <GoaDisplayTable data={biological} />
            </PanelWrapper>
          )}
          {cellular.length > 0 && (
            <PanelWrapper title="Cellular Component">
              <GoaDisplayTable data={cellular} />
            </PanelWrapper>
          )}
        </Typography>
      </Grid>
    </Grid>
  )
}

export { InnerGoPanel }
