import { FunctionComponent } from "react"
import { NewsListWrapperContainer } from "./NewsListWrapperContainer"
import { NewsListTitleBox } from "./NewsListTitleBox"
import { Typography, Grid } from "@mui/material"
import { NewsListActionBar } from "./NewsListActionBar"

const NewsListWrapperAuth: FunctionComponent = ({ children }) => (
  <NewsListWrapperContainer>
    <NewsListTitleBox >
      <Typography variant="h1" align="center" sx={{ marginBottom: 1 }}>
        Dicty Community Resource News
      </Typography>
      <Typography align="center" sx={{ fontStyle: "italic" }}>
        Latest updates from the Dictyostelium research community
      </Typography>
    </NewsListTitleBox>
    <Grid container direction="row" spacing={2}>
      <Grid item xl={1} lg={1}>
        <NewsListActionBar />
      </Grid>
      <Grid item xl={11} lg={11}>
        {children}
      </Grid>
    </Grid>
  </NewsListWrapperContainer>
)

export { NewsListWrapperAuth }
