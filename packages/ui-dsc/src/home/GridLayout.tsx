import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { Grid } from "@mui/material"

type GridLayoutProperties = {
  children: Array<ReactNode>
  gap?: number
}

const GridLayout = ({ children, gap = 3 }: GridLayoutProperties) => (
  <Grid container spacing={gap}>
    {pipe(
      children,
      Amap((child) => (
        <Grid item lg={3} sm={12} xs={12} sx={{ "> div": { height: "100%" } }}>
          {child}
        </Grid>
      )),
    )}
  </Grid>
)

export { GridLayout }
