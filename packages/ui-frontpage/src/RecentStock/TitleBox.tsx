import { Grid, Typography } from "@mui/material"
import { ReactElement } from "react"

type TitleBoxProperties = {
  icon: ReactElement
  content: string
}

const TitleBox = ({ icon, content }: TitleBoxProperties) => (
  <Grid
    container
    sx={{
      paddingTop: ".75rem",
      paddingBottom: ".75rem",
      paddingLeft: ".75rem",
      paddingRight: ".75rem",
      backgroundColor: "#81b6e8",
      color: "#0a2238",
      columnGap: "0.5rem",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      alignText: "center",
    }}
    justifyContent="center"
    alignItems="center">
    <Grid sx={{ "& svg": { display: "block" } }} item>
      {icon}
    </Grid>
    <Grid item>
      <Typography variant="h2" sx={{ fontWeight: "normal" }}>
        {content}
      </Typography>
    </Grid>
  </Grid>
)

export { TitleBox }
