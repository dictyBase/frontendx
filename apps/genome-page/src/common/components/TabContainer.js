// @flow
import React from "react"
import Typography from "@material-ui/core/Typography"

type tabContainerProps = {
  children: any,
}

const TabContainer = (props: tabContainerProps) => (
  <Typography component="div">{props.children}</Typography>
)

export default TabContainer
