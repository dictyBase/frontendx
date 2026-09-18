import { Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Editor } from "@dictybase/editor"
import { teal } from "@mui/material/colors"

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: teal[50],
  color: "#04313f",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}))

type DictyInfoDisplayProperties = {
  content: string
}

const DictyInfoDisplay = ({ content }: DictyInfoDisplayProperties) => (
  <StyledBox>
    <Typography color="secondary" variant="h2">
      Dictyostelium discoideum
    </Typography>
    <Editor initialState={content} />
  </StyledBox>
)

export { DictyInfoDisplay }
