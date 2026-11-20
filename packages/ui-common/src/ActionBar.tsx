import { FunctionComponent, type ReactElement } from "react"
import { Grid, Box } from "@mui/material"
import { pipe } from "fp-ts/function"
import { mapWithIndex as AmapWithIndex } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"

const ActionBar: FunctionComponent<{
  descriptionElement?: ReactElement
  children: Array<ReactElement> | ReactElement
}> = ({ descriptionElement, children }) => (
  <Grid
    container
    justifyContent="space-between"
    sx={{
      backgroundColor: "#fafafa",
      borderRadius: "2px",
      border: "1px solid #ddd",
      padding: 1,
      width: "100%",
      alignItems: "center",
    }}
    data-testid="info-page-toolbar">
    <Grid item>
      <Box component="span" sx={{ color: "primary.light" }}>
        {descriptionElement}
      </Box>
    </Grid>
    <Grid item>
      <Grid container spacing={1} alignItems="center">
        {pipe(
          children,
          Array.isArray,
          Bmatch(
            () => [
              <Grid item key={0}>
                {children}
              </Grid>,
            ],
            () =>
              pipe(
                children as Array<ReactElement>,
                AmapWithIndex((index, child) => (
                  <Grid item key={index}>
                    {child}
                  </Grid>
                )),
              ),
          ),
        )}
      </Grid>
    </Grid>
  </Grid>
)

export { ActionBar }
