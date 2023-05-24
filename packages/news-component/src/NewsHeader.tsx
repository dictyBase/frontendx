/* eslint-disable no-unneeded-ternary  */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import type { ReactChild } from "react"
import { Grid, Typography } from "@material-ui/core"
import CreateButton from "./CreateButton"
import DynamicBreadCrumbs from "./DynamicBreadCrumbs"

type NewsHeaderType = {
  button?: ReactChild
}

const NewsHeader = ({ button }: NewsHeaderType) => (
  <Grid container justifyContent="space-between">
    <Grid item>
      <DynamicBreadCrumbs />
    </Grid>
    <Grid item>
      <Typography gutterBottom align="center" variant="h1">
        Dicty News
      </Typography>
    </Grid>
    <Grid item>{button ? button : <CreateButton show={false} />}</Grid>
  </Grid>
)

export default NewsHeader
