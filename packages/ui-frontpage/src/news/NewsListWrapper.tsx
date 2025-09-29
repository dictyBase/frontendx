import { FunctionComponent } from "react"
import { Typography } from "@mui/material"
import { NewsListWrapperContainer } from "./NewsListWrapperContainer"
import { NewsListTitleBox } from "./NewsListTitleBox"

const NewsListWrapper: FunctionComponent = ({ children }) => (
  <NewsListWrapperContainer>
    <NewsListTitleBox>
      <Typography variant="h1" align="center" sx={{ marginBottom: 1 }}>
        Dicty Community Resource News
      </Typography>
      <Typography align="center" sx={{ fontStyle: "italic" }}>
        Latest updates from the Dictyostelium research community
      </Typography>
    </NewsListTitleBox>
    {children}
  </NewsListWrapperContainer>
)

export { NewsListWrapper }
