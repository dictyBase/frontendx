import { Grid, Typography, Divider } from "@mui/material"

const LabeledDivider = ({ label }: { label: string }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    sx={{ marginTop: 1, marginBottom: 2 }}>
    <Grid item>
      <Typography
        variant="h2"
        variantMapping={{ h2: "subtitle1" }}
        sx={{ color: "secondary.dark" }}>
        {label}
      </Typography>
    </Grid>
    <Grid item style={{ flexGrow: 1 }}>
      <Divider
        sx={{
          backgroundColor: "secondary.dark",
          opacity: 0.3,
          height: "2px",
        }}
      />
    </Grid>
  </Grid>
)

export { LabeledDivider }
